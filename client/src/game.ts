export type XorO = 'X' | 'O'

export type Board = (XorO | undefined)[][]

export type EndState = {
    finished: boolean
    winner?: XorO
}

export class TicTacToeGame {
    board: Board
    turn: XorO

    constructor() {
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
}
