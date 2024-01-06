import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Head from 'next/head'
import { cn } from '@/lib/utils'
import Script from 'next/script'
import { Toaster } from '@/components/ui/sonner'
import AuthProvider from '@/providers/Auth/AuthProvider'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Mines Gamble',
  description: 'Mines Gamble is a game where you can win money by playing minesweeper.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className='dark'>
      <Script src='/ThemeLoader.js'/>
      <body className={cn(inter.className,"dark:bg-zinc-950 bg-white")}>
          <AuthProvider>
            {children}
            <Toaster richColors closeButton />
          </AuthProvider>
      </body>
    </html>
  )
}
