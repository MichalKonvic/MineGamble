"use client";
import { useAuth } from '@/providers/Auth/AuthProvider';
import { useRouter } from 'next/navigation'
import React, { FC, PropsWithChildren } from 'react'
import Loader from './Loader';
interface Props {
    redirect?: string;
}
const PublicRoute:FC<PropsWithChildren<Props>> = ({children,redirect="/"}) => {
    const router = useRouter();
    const {session,isLoading} = useAuth();
  return (
    <>
        {isLoading ? <Loader/> : session ? router.push(redirect) : children}
    </>
  )
}

export default PublicRoute