import  { FC } from 'react'
import { useGame } from '../providers/GameProvider';

interface Props{
    index: number;
}

const MineButton:FC<Props> = ({index}) => {
    const {controls:{pick},revealedFields,mines}  = useGame();
    const handleClick = () => {
        pick(index);
    };
    const isRevealed = revealedFields.includes(index);
    const isMine = mines.includes(index);
  return (
    <button onClick={handleClick} className='text-center duration-300 hover:bg-slate-800 px-2 pb-[10px] pt-[8px] m-2'>
        {isRevealed ? isMine ? '💣': '💵' : '🟩'}
    </button>
  )
}

export default MineButton