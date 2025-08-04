import React from "react"
import { Game } from './Game'
import { GameHistory } from './GameHistory'


export const Main = () => {

  return (
    <div className='flex min-h-screen'>
      <main className='flex-1 flex flex-col mt-10 items-center gap-10'>
        <h1 className='font-bold text-2xl'>Tic Tac Toe</h1>
        <Game/>
      </main>
      <aside className='w-30 p-6 bg-gray-50 border-r'>
        <GameHistory />
      </aside>
    </div>
  )
}
