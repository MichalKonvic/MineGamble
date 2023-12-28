import { useGame } from '@/providers/GameProvider'
import React, { FC } from 'react'

const page:FC = () => {
  const {createGame,game} = useGame();
  console.log(game)
  return (
    <div>
        
    </div>
  )
}

export default page