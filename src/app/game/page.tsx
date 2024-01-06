"use client"
import React, { FC, useEffect } from 'react'
import { useGame } from '@/providers/GameProvider'
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const Page:FC = () => {
  const {createGame,game,isLoading} = useGame();
  useEffect(() => {
   console.log(game?.id);
  },[game])
  return (
    <div>
        {isLoading && <div>Loading...</div>}
        {!isLoading && <div>{JSON.stringify(game,null,4)}</div>}
        <Button onClick={() => {
          createGame(5,5,5);
        }}>Create Game</Button>
        <Button onClick={() => {
          game?.pickRandom();
        }}>Pick Random</Button>
        <Button onClick={() => {
          game?.checkout();
        }}>Checkout</Button>
        <Input type='number' onChange={(e) => {
          game?.pick(parseInt(e.target.value));
        }}/>
    </div>
  )
}

export default Page