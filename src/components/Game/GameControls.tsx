"use client";
import { useGame } from '@/providers/GameProvider';
import React from 'react'
import { Card } from '../ui/card';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import SettingsControls from './SettingsControls';
import ActionControls from './ActionControls';

const GameControls = () => {
    const {game,isLoading} = useGame();
  return (
    <div className='flex flex-col gap-2'>
      <SettingsControls />
      <ActionControls/>
    </div>
  )
}

export default GameControls