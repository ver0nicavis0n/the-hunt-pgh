import { SaleType, ListingStatus } from '@/types'

export const STRIPE_COLORS: Record<SaleType, string> = {
  estate_sale: '#0028A0',
  garage_sale: '#0047FF',
  flea_market: '#5C8AFF',
  auction: '#A8C0FF',
}

export const CATEGORY_ICONS: Record<SaleType, string> = {
  estate_sale: '🏠',
  garage_sale: '🚗',
  flea_market: '🛍',
  auction: '🔨',
}

export const CATEGORY_LABELS: Record<SaleType, string> = {
  estate_sale: 'Estate Sale',
  garage_sale: 'Garage Sale',
  flea_market: 'Flea Market',
  auction: 'Auction',
}

export const STATUS_CONFIG: Record<ListingStatus, { label: string; className: string }> = {
  live: { label: 'Happening Now', className: 'pill-now' },
  ending_soon: { label: 'Ending Soon', className: 'pill-soon' },
  upcoming: { label: 'Coming Up', className: 'pill-up' },
  ended: { label: 'Ended', className: 'pill-ended' },
}

export function formatDate(dateStr: string): string {
  const date = new Date(dateStr)
  return date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })
}

export function formatDateRange(start: string, end: string): string {
  const s = new Date(start)
  const e = new Date(end)
  if (s.toDateString() === e.toDateString()) return formatDate(start)
  return `${formatDate(start)} – ${formatDate(end)}`
}
