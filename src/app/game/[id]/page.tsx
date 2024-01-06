"use client";
import Game from '@/components/Game/Game';
import { useGame } from '@/providers/GameProvider'
import { useRouter } from 'next/navigation';
import React, { FC, useEffect } from 'react'
interface Props {
    params: {
        id: number;
    }
}
const Page:FC<Props> = ({params}) => {
  const router = useRouter();
  if(isNaN(Number(params.id))) router.push('/game');
  return (
      <Game gameId={Number(params.id)} />
  )
}

export default Page