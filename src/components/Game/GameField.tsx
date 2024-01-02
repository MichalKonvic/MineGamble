import React, { FC } from 'react'
import GameCell from './GameCell';
import { useGame } from '@/providers/GameProvider';
import { Card } from '../ui/card';

const GameField:FC = () => {
    const {game,isLoading} = useGame();
    const size = game?.size;
  return (
    <div className='w-96 h-96 md:w-[520px] md:h-[512px] flex items-center justify-center'>
        {game ? (<table className="w-fit h-fit border-spacing-1 border-separate">
            <tbody>
                <>
                {
                    [...Array(size)].map((_,x) => {
                        return (
                            <tr key={x}>
                                {
                                    [...Array(size)].map((_,y) => {
                                        const index = size! * x + y;
                                        return (
                                            <GameCell key={y} index={index} />
                                        )
                                    })
                                }
                            </tr>
                        )
                    })
                }
                </>
            </tbody>  
        </table>):
        (<Card className='w-96 h-96 md:w-[520px] md:h-[512px] flex flex-col gap-4 items-center justify-center'>
            <svg className="animate-spin h-8 w-8 text-zinc-700 dark:text-zinc-300" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <p className='text-sm'>Waiting for new game</p>
        </Card>)
    }
    </div>
  )
}

export default GameField