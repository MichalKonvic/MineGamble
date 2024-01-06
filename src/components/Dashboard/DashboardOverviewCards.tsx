import React, { useMemo } from 'react'
import OverviewCard from './OverviewCard'
import { BarChart, DollarSign, LineChart } from 'lucide-react'
import { useGames } from '@/providers/GamesProvider'

const DashboardOverviewCards = () => {
  const {isLoading,games} = useGames();
  const totalWagered = useMemo(() => {
    if(isLoading) return "$0.00";
    const wageredNumber = games?.reduce((acc,game) => {
      if(game.state === "cancelled") return acc;
      return acc + game.bet;
    },0)!;
    return wageredNumber?.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
  },[games,isLoading]);
  const averageBet = useMemo(() => {
    if(isLoading) return "$0.00";
    const averageSum = games?.reduce((acc,game) => {
      if(game.state === "cancelled") return acc;
      return acc + game.bet;
    },0) || 0;
    const average = averageSum /( games?.length || 0) || 0;
    return average?.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
  },[games,isLoading]);
  const totalGames = useMemo(() => {
    if(isLoading) return 0;
    return games?.length || 0;
  },[games,isLoading]);
  const winLoseRatio = useMemo(() => {
    if(isLoading) return "0/0";
    const wins = games?.filter(game => game.state === 'win') || [];
    const losses = games?.filter(game => game.state === 'lose') || [];
    const checkout = games?.filter(game => game.state === 'checkout') || [];
    return `${wins.length}/${losses.length}/${checkout.length}`;
  },[games,isLoading])
  return (
    <div className="grid  gap-4 md:grid-cols-2 lg:grid-cols-3">
        <OverviewCard isLoading={isLoading} title="Total wagered" value={totalWagered} icon={<DollarSign className='text-muted-foreground' />}/>
        <OverviewCard isLoading={isLoading} title="Average bet" value={averageBet} icon={<LineChart className='text-muted-foreground' />}/>
        <OverviewCard isLoading={isLoading} title="Total Games" value={totalGames} stats={[
            {value: `${winLoseRatio} - W/L/Checkout`, type: "neutral"}
        ]} icon={<BarChart className='text-muted-foreground'/>}/>
    </div>
  )
}

export default DashboardOverviewCards