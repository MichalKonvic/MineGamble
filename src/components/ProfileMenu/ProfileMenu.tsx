import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import React from 'react'
import { Button } from '../ui/button'
import { DropdownMenuShortcut } from '../ui/dropdown-menu'
import { Avatar, AvatarFallback } from '../ui/avatar'
import { useAuth } from '@/providers/Auth/AuthProvider'
import ProfileLabel from './ProfileLabel'
import BalanceLabel from './BalanceLabel'

const ProfileMenu = () => {
    const {session,logout} = useAuth();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative w-10 h-10 rounded-full">
          <Avatar className="h-10 w-10 flex justify-center items-center border">
            <AvatarFallback>
                {session?.user?.email?.charAt(0).toUpperCase()}
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <ProfileLabel/>
        </DropdownMenuLabel>
        <BalanceLabel/>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>
            Deposit
          </DropdownMenuItem>
          <DropdownMenuItem>
            History
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={logout}>
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default ProfileMenu