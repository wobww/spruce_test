import React, { useState, useEffect } from 'react'
import { TicTacToeGame } from './tictactoe'

type Game = {
  id: string
  state: string
  date: string
}

export const GameHistory = () => {
  const [games, setGames] = useState<Game[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchGames = async () => {
      try {
        const response = await fetch('/api/games')
        const gamesData = await response.json()
        setGames(gamesData)
      } catch (error) {
        console.error('Failed to fetch games:', error)
      } finally {
        setLoading(false)
      }
    }

    const eventSource = new EventSource('/api/games/stream')
    
    eventSource.onmessage = (event) => {
      const data = JSON.parse(event.data)
      if (data.type === 'connected') {
        console.log('connected to game stream')
        return
      }
      
      setGames(prevGames => [data, ...prevGames])
    }

    eventSource.onerror = (error) => {
      console.error('SSE error:', error)
    }

    fetchGames()

    return () => {
      eventSource.close()
    }
  }, [])

  return (
    <aside className="mt-8">
      <h2 className="text-xl font-bold mb-4 text-center">Game History</h2>
      {loading && <p>Loading games...</p>}
      {!loading && games.length === 0 && <p>No games played yet</p>}
      {!loading && games.length > 0 && (
        <ol className="space-y-2">
          {games.map((game) => {
            const ticTacToe = new TicTacToeGame(game.state)
            const finished = ticTacToe.isFinished()
            const formattedTime = new Date(game.date).toLocaleString()
            
            return (
              <li key={game.id}>
                    <div className="border rounded p-3 bg-white">
                      <p className="font-semibold">
                          {finished.winner ? `${finished.winner} wins!` : "Draw"}
                      </p>
                    </div>
                  <small className="text-xs text-gray-600">
                    <time dateTime={game.date}>{formattedTime}</time>
                  </small>
              </li>
            )
          })}
        </ol>
      )}
    </aside>
  )
}
