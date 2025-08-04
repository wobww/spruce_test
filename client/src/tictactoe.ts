export type XorO = 'X' | 'O'

export type Board = (XorO | undefined)[][]

export type EndState = {
    finished: boolean
    winner?: XorO
}

/*
    Having the TicTacToe game defined here is nice as it
    separates the business logic of the TicTacToe game
    from the UI layer.

    The string representation as defined here can be used
    to store the game state in the backend.
*/
export class TicTacToeGame {
    board: Board
    turn: XorO

    constructor(board?: Board | string) {
        if (typeof board === 'string') {
            this.board = this.toBoard(board)
            this.turn = this.calcTurn() 
            return
        }
        if (typeof board === 'object') {
            this.board = board
            this.turn = this.calcTurn()
            return
        }
        this.board = [
            [undefined,undefined,undefined],
            [undefined,undefined,undefined],
            [undefined,undefined,undefined]
        ]
        this.turn = 'X'
    }

    place(x: number, y: number) {
        if (this.board[x][y] !== undefined) {
            return
        }
        this.board[x][y] = this.turn
        this.turn = this.turn === 'X' ? 'O' : 'X' 
    }

    isFinished(): EndState {
      const winningStates = [
          // horizontal
          [this.board[0][0], this.board[0][1], this.board[0][2]],
          [this.board[1][0], this.board[1][1], this.board[1][2]],
          [this.board[2][0], this.board[2][1], this.board[2][2]],

          // vertical
          [this.board[0][0], this.board[1][0], this.board[2][0]],
          [this.board[0][1], this.board[1][1], this.board[2][1]],
          [this.board[0][2], this.board[1][2], this.board[2][2]],

          // diagonal
          [this.board[0][0], this.board[1][1], this.board[2][2]],
          [this.board[2][0], this.board[1][1], this.board[0][2]],
      ]

      const won = winningStates.find((state) => state.every(x => 
            x !== undefined && x === state[0])
      )
      if (won) {
          return {finished: true, winner: won[0]}
      }

      const draw = this.board.every(row => row.every(cell => cell !== undefined))
      if (draw) {
          return {finished: true}
      }

      return {finished: false}
    }

    calcTurn(): XorO {
        // count undefined to work out whose turn it is
        const blanks = this.board.flat().reduce(
            (total, cell) => cell ? total + 1 : total, 0)
        return blanks % 2 === 0 ? 'X' : 'O'
    }

    toString(): string {
        return this.board.flat().reduce((str, cell) => cell ? str += cell : str += '?', '')
    }

    toBoard(str: string): Board {
        if (str.length !== 9) {
            throw new Error(`invalid TicTacToe game string: ${str}`)
        }
        
        let board: Board = []

        for (let i = 0; i<str.length; i++) {
            const c = str[i]

            if (!['X', 'O', '?'].includes(c)) {
                throw new Error(`invalid TicTacToe game string: ${str}`)
            }
            
            let cell: XorO | undefined 
            switch (c) {
                case 'X':
                    cell = 'X'
                break
                case 'O':
                    cell = 'O'
                break 
                case '?':
                    cell = undefined
                break
                default:
                    throw new Error(`invalid TicTacToe game string: ${str}`)
            }

            if (i % 3 === 0) {
                board = [...board, [cell]]
            } else {
                board[board.length-1].push(cell)
            }
        }
        return board
    }
}
