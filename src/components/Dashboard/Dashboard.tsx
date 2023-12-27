import GamesProvider from '@/providers/GamesProvider'
import React from 'react'
import DashboardOverviewCards from './DashboardOverviewCards'
import { Button } from '../ui/button'

const Dashboard = () => {
  return (
    <GamesProvider>
      <div className='flex-1 space-y-4 p-8 pt-6'>
          <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
          <div className='pt-2'>
            <Button>New game</Button>
          </div>
          <DashboardOverviewCards/>
      </div>
    </GamesProvider>
  )
}

export default Dashboard