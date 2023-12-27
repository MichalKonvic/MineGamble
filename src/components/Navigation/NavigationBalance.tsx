import { useProfile } from '@/providers/ProfileProvider'
import React from 'react'

const NavigationBalance = () => {
    const {profile,isLoading} = useProfile();
  return (
    <>
        {isLoading ? (
            <p className='bg-zinc-200 h-6 w-12 rounded-full animate-pulse dark:bg-zinc-800'></p>
        ) :(
            <p className='text-sm leading-none'>{profile?.balance?.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}</p>
        )}
    </>
    )
}

export default NavigationBalance