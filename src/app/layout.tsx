import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { cn } from '@/lib/utils'
import { Toaster } from '@/components/ui/sonner'
import AuthProvider from '@/providers/Auth/AuthProvider'
import { ThemeProvider } from '@/providers/ThemeProvider'
import ProfileProvider from '@/providers/ProfileProvider'
import Navigation from '@/components/Navigation'

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
      <body className={cn(inter.className,"dark:bg-zinc-950 bg-white")}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <AuthProvider>
            <ProfileProvider>
              <Navigation/>
              {children}
              <Toaster richColors closeButton />
            </ProfileProvider>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
