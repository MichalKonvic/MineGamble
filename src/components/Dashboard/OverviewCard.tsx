import React, { ComponentProps, FC } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import { TStat } from './types';

interface Props {
    title:string|number;
    value: string|number;
    stats?: TStat[];
    icon: React.ReactNode;
    isLoading?: boolean;
}

const STAT_COLORS = {
    good: 'text-green-600',
    bad: 'text-red-600',
    neutral: 'text-muted-foreground'
}

const OverviewCard:FC<ComponentProps<"div"> & Props> = ({title,icon,value,stats,className, isLoading}) => {
  return (
    <Card className={className}>
        {isLoading ? (
          <>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-base font-medium">
                {title}
              </CardTitle>
              <div className="flex items-center space-x-2">
                {icon}
              </div>
            </CardHeader>
            <CardContent className='flex flex-col gap-3'>
              <div className="h-8 w-28 rounded-full animate-pulse bg-zinc-200 dark:bg-zinc-800"></div>
              <div className="space-x-2 h-4 w-40 rounded-full animate-pulse bg-zinc-200 dark:bg-zinc-800"></div>
            </CardContent>
          </>
        ) :(
        <>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-base font-medium">
                {title}
              </CardTitle>
              <div className="flex items-center space-x-2">
                {icon}
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{value}</div>
              {
                  stats && <div className="flex flex-row items-center gap-2 space-x-2">
                      {stats.map((stat,i) => {
                          const color = STAT_COLORS[stat.type];
                          return <p key={i} className={`text-sm ${color}`} >{stat.value}</p>
                      })}
                  </div>
              }
            </CardContent>
          </>
        )}
    </Card>
  )
}

export default OverviewCard