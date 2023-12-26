"use client";
import React from 'react'
import ProfileMenu from './ProfileMenu/ProfileMenu'
import ThemeSelect from './ThemeSelect'
import { useProfile } from '@/providers/ProfileProvider';

const Navigation = () => {
  const {profile} = useProfile();
  return (
    <div className='sticky top-0 w-full flex items-center justify-between px-2 py-1.5 z-50 border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60'>
        <p className='text-xl font-bold'>Konvic.</p>
        <div className='flex gap-4 items-center'>
            <ThemeSelect/>
            {
                profile && (
                  <>
                    <p className='text-sm leading-none'>$ {profile?.balance}</p>
                    <ProfileMenu/>
                  </>

                )
            }
        </div>
    </div>
  )
}

export default Navigation