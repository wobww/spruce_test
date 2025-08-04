import React from 'react'
import { TicTacToeGame, EndState } from './tictactoe'

type BoardProps = {
  game: TicTacToeGame
  finished: EndState
  onCellClick: (i: number, j: number) => void
  onReset: () => void
}

export const Board = ({ game, finished, onCellClick, onReset }: BoardProps) => {
  return (
    <>
      <div className='flex flex-col gap-1'>
        {game.board.map((row, i) => (
          <div key={`row-${i}`} className='flex gap-1'>
            {row.map((column, j) => 
              <button 
                key={`cell-${i}-${j}`} 
                className='border-2 border-gray-900 w-10 h-10 items-center justify-center text-2xl font-bold flex'
                onClick={() => onCellClick(i, j)}
                disabled={finished.finished}
              >
                {column}
              </button>
            )}
          </div>
        ))}
      </div>
      {finished.finished && (
        <div className='flex-col items-center'>
          <p className="text-center">
            {finished.winner ? `${finished.winner} wins!` : "It's a draw!"}
          </p>
          <button 
            className="rounded py-1 px-2 text-sm bg-green-700 text-white" 
            onClick={onReset}
          >
            Play again
          </button>
        </div>
      )}
    </>
  )
}
