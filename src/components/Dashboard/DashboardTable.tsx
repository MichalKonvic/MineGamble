import { formatTimeElapsed } from '@/lib/utils';
import { useGames } from '@/providers/GamesProvider';
import React, { useMemo } from 'react'
import { TGame, StateToStatus, columns } from '../GamesTable/columns';
import { DataTable } from '../GamesTable/data-table';

const DashboardTable = () => {
    const {games} = useGames();
    const data = useMemo<TGame[]>(() => games?.map((val) => {
      const bet = val.bet;
      const won = val.winning;
      const date = new Date(val.created_at);
      return {
        status: StateToStatus[val.state],
        bet,
        won,
        date
      }
    }) || [], [games])
  return (
    <DataTable columns={columns} data={data} />
  )
}

export default DashboardTable