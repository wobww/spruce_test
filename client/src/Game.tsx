import React, { useState, useEffect } from "react"
import { TicTacToeGame } from "./tictactoe"
import { Board } from "./Board"

const saveGameToServer = async (gameState: string) => {
  try {
    await fetch('/api/games', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ state: gameState }),
    })
  } catch (error) {
    console.error('Failed to save game:', error)
  }
}

export const Game = () => {
  const [board, setBoard] = useState<string>(new TicTacToeGame().toString())

  const game = new TicTacToeGame(board)
  const finished = game.isFinished()

  useEffect(() => {
    if (finished.finished) {
      saveGameToServer(game.toString())
    }
  }, [finished.finished, game])
    
  const handleClick = (i: number, j: number) => {
    game.place(i, j)
    setBoard(game.toString())
  }

  const reset = () => setBoard(new TicTacToeGame().toString())

  return (
    <Board 
      game={game}
      finished={finished}
      onCellClick={handleClick}
      onReset={reset}
    />
  )
}
