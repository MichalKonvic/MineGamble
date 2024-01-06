"use client"
import { useGame } from '@/providers/GameProvider';
import React, { FC, PropsWithChildren, useEffect } from 'react'
import GameField from './GameField';
import GameControls from './GameControls';

interface Props {
    gameId?:number;
}

const Game:FC<Props> = ({gameId}) => {
    useGame(gameId)
  return (
    <div className='w-full justify-center items-center md:mt-40 flex flex-col md:flex-row gap-2'>
        <GameField />
        <GameControls />
    </div>
  )
}

export default Game