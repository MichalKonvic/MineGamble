import PrivateRoute from '@/components/PrivateRoute'
import GameProvider from '@/providers/GameProvider'
import React, { FC, PropsWithChildren } from 'react'

const layout:FC<PropsWithChildren> = ({children}) => {
  return (
    <PrivateRoute>
      <GameProvider>
        {children}
      </GameProvider>
    </PrivateRoute>
  )
}

export default layout