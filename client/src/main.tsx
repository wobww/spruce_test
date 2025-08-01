import React, { useState } from 'react'
import { TicTacToeGame } from './game'


export const Main = () => {
  const [board, setBoard] = useState<string>(new TicTacToeGame().toString())


  const game = new TicTacToeGame(board)
  const finished = game.isFinished()
    
  const handleClick = (i: number, j: number) => {
      game.place(i, j)
      setBoard(game.toString())
  }

  const reset = () => setBoard(new TicTacToeGame().toString())

  return <div className='flex flex-col mt-10 items-center gap-10'>
    <div className='font-bold text-2xl'>Tic Tac Toe</div>
    <div className='flex flex-col gap-1'>
      {game.board.map((row, i) => <div key={`row-${i}`} className='flex gap-1'>
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
