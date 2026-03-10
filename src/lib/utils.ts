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

function parseTimeStr(timeStr: string | null, defaultHour = 23, defaultMin = 59): { hour: number; min: number } {
  if (!timeStr) return { hour: defaultHour, min: defaultMin }
  const s = timeStr.trim()
  // 12-hour: "4:00 PM", "4:00PM", "4 PM"
  const m12 = s.match(/^(\d{1,2})(?::(\d{2}))?\s*(AM|PM)$/i)
  if (m12) {
    let hour = parseInt(m12[1], 10)
    const min = m12[2] ? parseInt(m12[2], 10) : 0
    const period = m12[3].toUpperCase()
    if (period === 'PM' && hour !== 12) hour += 12
    if (period === 'AM' && hour === 12) hour = 0
    return { hour, min }
  }
  // 24-hour: "16:00", "16:00:00"
  const m24 = s.match(/^(\d{1,2}):(\d{2})/)
  if (m24) return { hour: parseInt(m24[1], 10), min: parseInt(m24[2], 10) }
  return { hour: defaultHour, min: defaultMin }
}

export function getLiveStatus(listing: Listing): ListingStatus {
  const now = new Date()
  const [sy, sm, sd] = listing.start_date.split('-').map(Number)
  const [ey, em, ed] = listing.end_date.split('-').map(Number)
  const startMidnight = new Date(sy, sm - 1, sd, 0, 0, 0)
  const endMidnight = new Date(ey, em - 1, ed, 0, 0, 0)

  const { hour: endHour, min: endMin } = parseTimeStr(listing.end_time, 23, 59)
  const endDateTime = new Date(ey, em - 1, ed, endHour, endMin, 0)

  // Definitively over (past final day's closing time)
  if (now > endDateTime) return 'ended'

  const todayMidnight = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0, 0, 0)
  const twoHoursBefore = new Date(endDateTime.getTime() - 2 * 60 * 60 * 1000)

  // Today is the final day
  if (todayMidnight.getTime() === endMidnight.getTime()) {
    if (now >= twoHoursBefore) return 'ending_soon'
    return 'live'
  }

  // Before the sale opens at all
  if (now < startMidnight) return 'upcoming'

  // Within the date range — check if today's session has already closed
  const todayClose = new Date(
    now.getFullYear(), now.getMonth(), now.getDate(), endHour, endMin, 0
  )
  if (now > todayClose) return 'ended'

  return 'live'
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
