import { SaleType, ListingStatus, Listing } from '@/types'

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

export function getLiveStatus(listing: Listing): ListingStatus {
  const now = new Date()
  // Treat dates as local midnight to avoid timezone shifts
  const [sy, sm, sd] = listing.start_date.split('-').map(Number)
  const [ey, em, ed] = listing.end_date.split('-').map(Number)
  const startMidnight = new Date(sy, sm - 1, sd, 0, 0, 0)
  const endMidnight = new Date(ey, em - 1, ed, 0, 0, 0)

  // Parse end_time (e.g. "4:00 PM") into hours/minutes
  let endHour = 23, endMin = 59
  if (listing.end_time) {
    const match = listing.end_time.match(/^(\d+):(\d+)\s*(AM|PM)$/i)
    if (match) {
      endHour = parseInt(match[1])
      endMin = parseInt(match[2])
      const period = match[3].toUpperCase()
      if (period === 'PM' && endHour !== 12) endHour += 12
      if (period === 'AM' && endHour === 12) endHour = 0
    }
  }
  const endDateTime = new Date(ey, em - 1, ed, endHour, endMin, 0)

  if (now > endDateTime) return 'ended'

  const twoHoursBefore = new Date(endDateTime.getTime() - 2 * 60 * 60 * 1000)
  const todayMidnight = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0, 0, 0)

  if (todayMidnight.getTime() === endMidnight.getTime() && now >= twoHoursBefore) return 'ending_soon'
  if (now >= startMidnight && now <= endDateTime) return 'live'
  return 'upcoming'
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
