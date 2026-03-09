import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'The Hunt — Pittsburgh',
  description: 'Estate sales, garage sales, flea markets & vintage shops in Pittsburgh. All in one place.',
  keywords: 'estate sales Pittsburgh, garage sales Pittsburgh, flea markets Pittsburgh, thrift shops Pittsburgh',
  openGraph: {
    title: 'The Hunt — Pittsburgh',
    description: 'Estate sales, garage sales, flea markets & vintage shops in Pittsburgh.',
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
