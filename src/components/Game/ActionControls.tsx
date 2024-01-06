"use client";
import { Input } from '../ui/input'
import React from 'react'
import { Button } from '../ui/button'
import { Card } from '../ui/card'
import { useGame } from '@/providers/GameProvider';

const SettingsControls = () => {
    const {game,isLoading} = useGame();
    if(game?.finished || !game) return null;
  return (
    <Card className='p-4 flex gap-4 h-fit flex-col md:w-56 lg:w-72'>
        <h1>Win: {game.winning.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}</h1>
        <Button onClick={game.pickRandom} variant={"secondary"}>Pick Random</Button>
        <Button onClick={game.checkout} variant={"default"}>Checkout</Button>
    </Card>
  )
}

export default SettingsControls