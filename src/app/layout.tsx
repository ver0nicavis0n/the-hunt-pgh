import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Pittsburgh Estate Sales, Garage Sales & Flea Markets | The Hunt',
  description: 'Find estate sales, garage sales, flea markets and auctions happening this weekend in Pittsburgh. Updated daily.',
  keywords: 'estate sales Pittsburgh, garage sales Pittsburgh, flea markets Pittsburgh, thrift shops Pittsburgh',
  openGraph: {
    title: 'Pittsburgh Estate Sales, Garage Sales & Flea Markets | The Hunt',
    description: 'Find estate sales, garage sales, flea markets and auctions happening this weekend in Pittsburgh. Updated daily.',
    type: 'website',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
