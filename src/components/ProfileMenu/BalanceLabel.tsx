"use client";
import { useProfile } from '@/providers/ProfileProvider';
import { createClient } from '@/services/supabase/client';
import { DropdownMenuLabel } from '@radix-ui/react-dropdown-menu';
import { RealtimePostgresUpdatePayload } from '@supabase/supabase-js';
import React, { useCallback, useEffect, useState } from 'react'
import { toast } from 'sonner';



const BalanceLabel = () => {
    const {isLoading,profile} = useProfile();


  return (
    <div className='h-8 w-full items-center px-2 flex justify-between'>
        {isLoading ? (
            <div className='animate-pulse bg-zinc-200 dark:bg-zinc-800 w-full h-5 rounded-full'>
            
            </div>
        ):(
            <>
                <p className='text-sm leading-none'>Balance:</p>
                <p className="text-sm leading-none text-muted-foreground">$ {profile?.balance}</p>
            </>
        )}
    </div>
  )
}

export default BalanceLabel