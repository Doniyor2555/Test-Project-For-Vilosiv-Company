import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import ToastProvider from './providers/toastProvider'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Todo-App',
  description: 'Todo app prisma + mongodb',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ToastProvider/>
        {children}
        </body>
    </html>
  )
}
