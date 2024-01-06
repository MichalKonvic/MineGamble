"use client"
import React, { FC, useEffect } from 'react'
import { useGame } from '@/providers/GameProvider'
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Game from '@/components/Game/Game';

const Page:FC = () => {
  return (
    <div>
        <Game />
    </div>
  )
}

export default Page