import type { Metadata, Viewport } from 'next'
import { Bebas_Neue, DM_Sans, Geist_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { SITE_URL, ogMedia } from '@/lib/og'
import './globals.css'

const bebasNeue = Bebas_Neue({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-bebas-neue',
})

const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-dm-sans',
})

const geistMono = Geist_Mono({
  subsets: ['latin'],
  variable: '--font-geist-mono',
})

const og = ogMedia('home', 'Mile A Day — One mile. Every day.')

export const metadata: Metadata = {
  title: 'Mile A Day - Walk or Run a Mile Every Single Day',
  description: 'Build an unbreakable habit. Track your streak, compete with friends, and Go the Extra Mile. Available on iOS and Apple Watch.',
  keywords: ['mile a day', 'running app', 'walking app', 'fitness tracker', 'streak tracker', 'daily mile'],
  openGraph: {
    title: 'Mile A Day - Walk or Run a Mile Every Single Day',
    description: 'Build an unbreakable habit. Track your streak, compete with friends, and Go the Extra Mile.',
    type: 'website',
    siteName: 'Mile A Day',
    locale: 'en_US',
    ...og.openGraph,
  },
  twitter: {
    ...og.twitter,
    title: 'Mile A Day - Walk or Run a Mile Every Single Day',
    description: 'Build an unbreakable habit. Track your streak, compete with friends, and Go the Extra Mile.',
  },
  metadataBase: new URL(SITE_URL),
  icons: {
    icon: '/images/mad-circle-icon.png',
    apple: '/images/mad-circle-icon.png',
  },
}

export const viewport: Viewport = {
  themeColor: '#0a0a0a',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${bebasNeue.variable} ${dmSans.variable} ${geistMono.variable}`}>
      <body className="font-sans antialiased bg-[#0a0a0a] text-[#f5f5f5]">
        {children}
        <Analytics />
      </body>
    </html>
  )
}
