import React, { useState } from 'react'
import { XorO } from './types'


export const Main = () => {
  const [board, setBoard] = useState<(XorO | undefined)[][]>([
    [undefined, undefined, undefined],
    [undefined, undefined, undefined],
    [undefined, undefined, undefined]
  ])

  const [turn, setTurn] = useState<XorO>('X')

  const handleClick = (i: number, j: number) => {
      if (board[i][j]) {
          return
      }
      const newBoard = [...board]
      newBoard[i] = [...newBoard[i]]
      newBoard[i][j] = turn
      setBoard(newBoard)
      setTurn(turn === 'X' ? 'O' : 'X')
  }

  const reset = () => setBoard([
      [undefined, undefined, undefined],
      [undefined, undefined, undefined],
      [undefined, undefined, undefined]
  ])

  const isGameFinished = () => {
      const winningStates = [
          // horizontal
          [board[0][0], board[0][1], board[0][2]],
          [board[1][0], board[1][1], board[1][2]],
          [board[2][0], board[2][1], board[2][2]],

          // vertical
          [board[0][0], board[1][0], board[2][0]],
          [board[0][1], board[1][1], board[2][1]],
          [board[0][2], board[1][2], board[2][2]],

          // diagonal
          [board[0][0], board[1][1], board[2][2]],
          [board[2][0], board[1][1], board[0][2]],
      ]

      const won = winningStates.find((state) => state.every(x => 
            x !== undefined && x === state[0])
      )
      if (won) {
          return {finished: true, winner: won[0]}
      }

      const draw = board.every(row => row.every(cell => cell !== undefined))
      if (draw) {
          return {finished: true, winner: null}
      }

      return {finished: false}
  }

  const finished = isGameFinished()

  return <div className='flex flex-col mt-10 items-center gap-10'>
    <div className='font-bold text-2xl'>Tic Tac Toe</div>
    <div className='flex flex-col gap-1'>
      {board.map((row, i) => <div key={`row-${i}`} className='flex gap-1'>
        {row.map((column, j) => 
                 <button key={`cell-${i}-${j}`} 
                    className='border-2 border-gray-900 w-10 h-10 items-center justify-center text-2xl font-bold flex'
                    onClick={() => handleClick(i, j)}
                    disabled={finished.finished}
                 >
          {column}
        </button>)}
      </div>)}
    </div>
    {finished.finished && (
    <div className='flex-col items-center'>
        <p className="text-center">{finished.winner ? `${finished.winner} wins!` : "It's a draw!"}</p>
        <button className="rounded py-1 px-2 text-sm bg-green-700 text-white" onClick={() => reset()}>Play again</button>
    </div>
    )}
    </div>
}
