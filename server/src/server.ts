import express from 'express'
import path from 'node:path'
import { randomUUID } from 'node:crypto'
import type {Response} from 'express'

const newServer = () => {
    const app = express()

    app.use(express.json())
    app.use(express.static(path.join(__dirname, 'static')))

    type Game = {
        id: string
        state: string
        date: string
    }

    /*
        Didn't have time to set up db connection. So storing games
        in memory below.

        Could set up postgres or something similar with a 'games' table
        which would have a structure like:
        | id TEXT (PK) | state TEXT | date TIMESTAMPTZ |

        This would allow you to:
            - Fetch games by ID
            - Fetch games ordered by time (/api/games?order=time)
            - Fetch games that match certain patterns (e.g get me games that were won with diagonals)

        You could use the TicTacToe class here in the backend. 
            (defined in /client/src/game.ts).

        This would allow you to reuse the business logic and do things like
        server-side validation of games.
    */
    let games: Game[] = []
    let sseClients: Response[] = []

    app.post('/api/games', (req, res) => {
        const {state} = req.body

        const game = {
            id: randomUUID(),
            state: state,
            date: new Date().toString(),
        }
        games.push(game)
        
        // Send game to all SSE clients
        sseClients.forEach(client => {
            client.write(`data: ${JSON.stringify(game)}\n\n`)
        })
        
        res.status(201)
        res.send(game)
    })

    app.get('/api/games/stream', (req, res) => {
        console.log('SSE stream endpoint hit')
        
        res.writeHead(200, {
            'Content-Type': 'text/event-stream',
            'Cache-Control': 'no-cache',
            'Connection': 'keep-alive',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Headers': 'Cache-Control'
        })

        res.write('data: {"type": "connected"}\n\n')

        sseClients.push(res)
        console.log(`SSE client connected. Total clients: ${sseClients.length}`)

        req.on('close', () => {
            sseClients = sseClients.filter(client => client !== res)
            console.log(`SSE client disconnected. Total clients: ${sseClients.length}`)
        })
    })

    app.get('/api/games/:id', (req, res) => {
        const game = games.find(g => g.id === req.params.id)
        if (!game) {
            res.sendStatus(404)
            return
        }
        res.send(game)
    })

    app.get('/api/games', (req, res) => {
        res.send(games)
    })

    return app
}

export default newServer

