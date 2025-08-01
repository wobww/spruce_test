import request from "supertest"
import newServer from "./server"
import {describe, test, expect} from '@jest/globals';

/*
    This is an example of how I like to do testing.

    Testing at the API level gives you good bang for your buck. 

    It's not too much test code, but it covers a large area and acts as
    authoritative documentation for how the API should behave. 

    When you have the db integrated, gives you confidence that the 
    system works as a whole.
*/
describe("/api/games", () => {
    test("should create a game", async () => {
        const server = newServer()

        const response = await request(server)
            .post("/api/games")
            .send({state: 'XOX??????'})

        expect(response.statusCode).toEqual(201)
        expect(response.body.state).toEqual('XOX??????')
        expect(typeof response.body.id === 'string').toBeTruthy()
    })

    test("should get game by id", async () => {
        const server = newServer()
        const postResp = await request(server)
            .post("/api/games")
            .send({state: 'XOX??????'})

        const game = postResp.body

        const getResp = await request(server)
            .get(`/api/games/${game.id}`)

        expect(getResp.statusCode).toEqual(200)
        expect(getResp.body).toStrictEqual(game)
    })

    test("should return not found", async () => {
        const server = newServer()
        const getResp = await request(server)
            .get(`/api/games/not-found`)

        expect(getResp.statusCode).toEqual(404)
    })

    test("should get games", async () => {
        const server = newServer()

        const post1Resp = await request(server)
            .post("/api/games")
            .send({state: 'XOX??????'})

        const post2Resp = await request(server)
            .post("/api/games")
            .send({state: 'XOX??????'})

        const getResp = await request(server)
            .get('/api/games')

        expect(getResp.statusCode).toEqual(200)
        expect(getResp.body.length).toBe(2)
        expect(getResp.body[0]).toStrictEqual(post1Resp.body)
        expect(getResp.body[1]).toStrictEqual(post2Resp.body)
    })
})

