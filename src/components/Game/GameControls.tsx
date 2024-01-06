"use client";
import React from 'react'
import SettingsControls from './SettingsControls';
import ActionControls from './ActionControls';

const GameControls = () => {
  return (
    <div className='flex w-96 flex-col gap-2'>
      <SettingsControls />
      <ActionControls/>
    </div>
  )
}

export default GameControls