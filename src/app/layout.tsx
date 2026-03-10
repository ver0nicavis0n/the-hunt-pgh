import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Pittsburgh Estate Sales, Garage Sales & Flea Markets | The Hunt',
  description: 'Find estate sales, garage sales, flea markets and auctions happening this weekend in Pittsburgh. Updated daily.',
  keywords: 'estate sales Pittsburgh, garage sales Pittsburgh, flea markets Pittsburgh, thrift shops Pittsburgh',
  manifest: '/manifest.json',
  openGraph: {
    title: 'Pittsburgh Estate Sales, Garage Sales & Flea Markets | The Hunt',
    description: 'Find estate sales, garage sales, flea markets and auctions happening this weekend in Pittsburgh. Updated daily.',
    type: 'website',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta name="theme-color" content="#141412" />
      </head>
      <body>{children}</body>
    </html>
  )
}
