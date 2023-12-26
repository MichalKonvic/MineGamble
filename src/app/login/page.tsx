"use client";
import LoginCard from '@/components/Login/LoginCard';
import PublicRoute from '@/components/PublicRoute';
import React from 'react'
const LoginPage = () => {
  return (
    <PublicRoute>
      <div className='w-full h-screen flex justify-center items-center'>
          <LoginCard/>
      </div>
    </PublicRoute>
  )
}

export default LoginPage