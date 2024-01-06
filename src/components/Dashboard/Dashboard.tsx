import GamesProvider, { useGames } from '@/providers/GamesProvider'
import React, { useEffect, useMemo } from 'react'
import DashboardOverviewCards from './DashboardOverviewCards'
import { Button } from '../ui/button'
import { DataTable } from '../GamesTable/data-table'
import { StateToStatus, TGame, columns } from '../GamesTable/columns'
import { formatTimeElapsed } from '@/lib/utils'
import DashboardTable from './DashboardTable'
import Link from 'next/link'

const Dashboard = () => {

  return (
    <GamesProvider>
      <div className='flex-1 space-y-4 p-8 pt-6'>
          <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
          <div className='pt-2'>
            <Button>
              <Link href='/app/game/new'>
              New game
              </Link>
            </Button>
          </div>
          <DashboardOverviewCards/>
          <DashboardTable/>
      </div>
    </GamesProvider>
  )
}

export default Dashboard