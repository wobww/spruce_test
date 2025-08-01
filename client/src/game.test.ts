import {TicTacToeGame} from './game'

/*
    Here we are testing the business logic of the TicTacToe game.

    This defends against any future developers accidentally breaking
    the game. It also aids in new development because you can make
    changes safely knowing that as long as the tests pass, you haven't
    broken anything.
*/
test('should start with empty board', () => {
    const game = new TicTacToeGame()
    const expected = [
        [undefined,undefined,undefined],
        [undefined,undefined,undefined],
        [undefined,undefined,undefined],
    ]
    expect(game.board).toStrictEqual(expected)
})

test('should start with X turn', () => {
    const game = new TicTacToeGame()
    expect(game.turn).toBe('X')
})

test('should place', () => {
    const game = new TicTacToeGame()
    game.place(0, 0)

    expect(game.board[0][0]).toBe('X')
    expect(game.turn).toBe('O')
})

test('should not allow invalid place', () => {
    const game = new TicTacToeGame()
    
    expect(() => game.place(10,10)).toThrow()
    expect(() => game.place(-1,-10)).toThrow()
})

test('should ignore placement on already placed', () => {
    const game = new TicTacToeGame()
    game.place(0, 0)
    game.place(0, 0)

    expect(game.board[0][0]).toBe('X')
    expect(game.turn).toBe('O')
})

test('should return not finished', () => {
    const game = new TicTacToeGame()
    game.place(0, 0)

    const finished = game.isFinished()
    expect(finished.finished).toBe(false)
})

test('should find winner', () => {
    const game = new TicTacToeGame()
    game.place(0, 0)
    game.place(1, 0)
    game.place(0, 1)
    game.place(1, 2)
    game.place(0, 2)

    const finished = game.isFinished()
    expect(finished.finished).toBe(true)
    expect(finished.winner).toBe('X')
})

test('should find draw', () => {
    const game = new TicTacToeGame()
    game.place(0, 0)
    game.place(0, 1)
    game.place(0, 2)
    game.place(1, 1)
    game.place(1, 0)
    game.place(1, 2)
    game.place(2, 1)
    game.place(2, 0)
    game.place(2, 2)

    const finished = game.isFinished()
    expect(finished.finished).toBe(true)
    expect(finished.winner).toBeUndefined()
})

test('should find correct turn', () => {
    const game1 = new TicTacToeGame([
        [undefined,'X',undefined],
        [undefined,'O',undefined],
        [undefined,'X',undefined],
    ])
    const game2 = new TicTacToeGame([
        [undefined,'X',undefined],
        [undefined,'O',undefined],
        [undefined,'X','O'],
    ])
    expect(game1.turn).toBe('O')
    expect(game2.turn).toBe('X')
})

test('should reduce board to string', () => {
    const game1 = new TicTacToeGame([
        [undefined,'X',undefined],
        [undefined,'O',undefined],
        [undefined,'X',undefined],
    ])
    const game2 = new TicTacToeGame([
        [undefined,'X',undefined],
        [undefined,'O',undefined],
        [undefined,'X','O'],
    ])
    expect(game1.toString()).toBe('?X??O??X?')
    expect(game2.toString()).toBe('?X??O??XO')
})

test('should allow strings in constructor', () => {
    const game = new TicTacToeGame('?X??O??X?')

    expect(game.board).toStrictEqual([
        [undefined,'X',undefined],
        [undefined,'O',undefined],
        [undefined,'X',undefined],
    ])
    expect(game.turn).toBe('O')
})

test('should error on invalid strings', () => {
    expect(() => new TicTacToeGame('')).toThrow()
    expect(() => new TicTacToeGame('ABC123')).toThrow()
    expect(() => new TicTacToeGame('?X??O??X?X')).toThrow()
})

