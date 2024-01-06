import { useGame } from '@/providers/GameProvider';
import React, { FC, PropsWithChildren, useEffect } from 'react'
import GameField from './GameField';
import GameControls from './GameControls';
import router from 'next/router';
import { useRouter } from 'next/navigation';

interface Props {
    gameId?:number;
}

const Game:FC<Props> = ({gameId}) => {
    useGame(gameId)
  return (
    <div className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col md:flex-row gap-2'>
        <GameField />
        <GameControls />
    </div>
  )
}

export default Game