import { useGame } from '@/providers/GameProvider'
import React,{FC, useEffect, useMemo, useState} from 'react'
import { CellType, CellTypes } from './types';
import GameCellContent from './GameCellContent';
interface Props {
    index:number
}

const baseStyle = "w-16 h-16 md:w-24 md:h-24 border border-zinc-300 dark:border-zinc-700 rounded-md flex justify-center items-center";

const GameCell:FC<Props> = ({index}) => {
    const {game,isLoading} = useGame();
    const [waitingForReveal,setWaitingForReveal] = useState(false);
    const buttonType:CellType = useMemo(() => {
        if(isLoading) return CellTypes["hidden"];
        if(game?.mine_indexes?.indexes.includes(index)) return CellTypes["mine"];
        if(game?.revealed_indexes?.includes(index)) return CellTypes["nonMineCell"];
        if(game?.finished) return CellTypes["nonMineCell"];
        return CellTypes["hidden"];
    },[game,isLoading,index]);
    const handleClick = () => {
        if(isLoading) return;
        if(buttonType != CellTypes["hidden"]) return;
        if(game!.finished) return;
        if(!waitingForReveal) {
            game!.pick(index);
            setWaitingForReveal(true);
            setTimeout(() => {
                setWaitingForReveal(false);
            }, 1000);
        }
    }
    useEffect(() => {
        if(isLoading) return;
        if(game?.finished && waitingForReveal) {
            setWaitingForReveal(false);
        };
        if(game?.revealed_indexes?.includes(index) && waitingForReveal) {
            setWaitingForReveal(false);
        }
    },[game,isLoading,waitingForReveal, index])
  return (
        <td>
            {(waitingForReveal) ? (
                <div className={`${baseStyle} animate-pulse`}>
                    <svg className="animate-spin h-6 w-6 text-zinc-700 dark:text-zinc-300" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                </div>
            ): (
                <div className={`${baseStyle} ${buttonType == "hidden" ? "bg-zinc-100 dark:bg-zinc-900": buttonType == "mine"? "bg-red-500/30" : "bg-green-500/30"}`} onClick={handleClick}>
                    <GameCellContent buttonType={buttonType} />
                </div>
            )}
        </td>
  )
}

export default GameCell