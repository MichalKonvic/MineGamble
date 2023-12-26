import { useAuth } from '@/providers/Auth/AuthProvider';
import React from 'react'

const ProfileLabel = () => {
    const {session} = useAuth();
  return (
    <div className="flex flex-col space-y-1 gap-2">
        <p className="text-base font-medium leading-none">{session?.user?.email}</p>
  </div>
  )
}

export default ProfileLabel