import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Thrift Stores & Vintage Shops in Pittsburgh | The Hunt',
  description: 'Browse thrift stores, vintage shops, antique dealers, and consignment boutiques in Pittsburgh. Find secondhand stores open near you.',
  openGraph: {
    title: 'Thrift Stores & Vintage Shops in Pittsburgh | The Hunt',
    description: 'Browse thrift stores, vintage shops, antique dealers, and consignment boutiques in Pittsburgh.',
    type: 'website',
  },
}

export default function ShopsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
