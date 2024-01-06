import React, { FC } from 'react'
import { CellType, CellTypes } from './types';
import { Bomb, CircleDollarSign, HelpCircle } from 'lucide-react';

interface Props {
    buttonType: CellType;
}

const GameCellContent:FC<Props> = ({buttonType}) => {

    if(buttonType === CellTypes["mine"]) {
        return (
            <Bomb className='text-red-500' />
        )
    }
    if(buttonType === CellTypes["nonMineCell"]) {
        return (
            <CircleDollarSign className='text-green-500' />
        )
    }
  return (
    <HelpCircle className='text-zinc-500' />
  )
}

export default GameCellContent