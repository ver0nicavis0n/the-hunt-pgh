'use client'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import GetDirectionsButton from '@/components/GetDirectionsButton'

interface Venue {
  id: string
  name: string
  neighborhood: string
  address: string
  schedulePattern: string
  upcomingDates: string[]
  description: string
  website: string | null
  lat: number | null
  lng: number | null
}

// Returns upcoming occurrences of a given weekday (0=Sun … 6=Sat) within the next 90 days
function nextOccurrences(dayOfWeek: number, count: number, weekOfMonth?: number): string[] {
  const results: string[] = []
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  const d = new Date(today)
  let checked = 0
  while (results.length < count && checked < 180) {
    d.setDate(d.getDate() + 1)
    checked++
    if (d.getDay() !== dayOfWeek) continue
    if (weekOfMonth != null) {
      const week = Math.ceil(d.getDate() / 7)
      if (week !== weekOfMonth) continue
    }
    results.push(d.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' }))
  }
  return results
}

const SEED_VENUES: Venue[] = [
  {
    id: '1',
    name: 'South Side Flea',
    neighborhood: 'South Side',
    address: '2700 E Carson St, Pittsburgh, PA 15203',
    schedulePattern: 'Second Saturday of every month',
    upcomingDates: nextOccurrences(6, 3, 2),
    description: 'Indoor flea market on Carson Street with vintage clothing, antiques, handmade goods, and local vendors. One of Pittsburgh\'s most popular recurring markets.',
    website: 'https://southsideflea.com',
    lat: 40.4283, lng: -79.9763,
  },
  {
    id: '2',
    name: 'Trader Jack\'s Flea Market',
    neighborhood: 'North Shore',
    address: '1 Allegheny Ave, Pittsburgh, PA 15212',
    schedulePattern: 'Saturdays and Sundays, April through November',
    upcomingDates: nextOccurrences(6, 3),
    description: 'Beloved outdoor flea market on the North Shore running rain or shine since the 1960s. Hundreds of vendors selling antiques, collectibles, clothing, and produce.',
    website: null,
    lat: 40.4474, lng: -80.0078,
  },
  {
    id: '3',
    name: 'Hartwood Acres Antique Market',
    neighborhood: 'Hampton Township',
    address: '200 Hartwood Acres Park Rd, Allison Park, PA 15101',
    schedulePattern: 'Select Sundays, May through October',
    upcomingDates: nextOccurrences(0, 3),
    description: 'Large outdoor antique and flea market on Allegheny County park grounds. Draws dealers from across the region with quality antiques, art, and vintage finds.',
    website: null,
    lat: 40.5830, lng: -79.9560,
  },
  {
    id: '4',
    name: 'Pittsburgh Antique & Flea Market',
    neighborhood: 'Perrysville',
    address: '3700 Perrysville Ave, Pittsburgh, PA 15214',
    schedulePattern: 'Every Saturday, year-round',
    upcomingDates: nextOccurrences(6, 3),
    description: 'Weekly indoor/outdoor antique and collectibles market open year-round. A reliable Saturday destination for dealers and hunters alike.',
    website: null,
    lat: 40.4820, lng: -80.0110,
  },
  {
    id: '5',
    name: 'Lawrenceville Antique Collective Pop-Up',
    neighborhood: 'Lawrenceville',
    address: '4901 Butler St, Pittsburgh, PA 15201',
    schedulePattern: 'Last Sunday of every month',
    upcomingDates: nextOccurrences(0, 3),
    description: 'Monthly pop-up market in Upper Lawrenceville featuring rotating dealers selling mid-century furniture, vintage clothing, ceramics, and local art.',
    website: null,
    lat: 40.4720, lng: -79.9470,
  },
  {
    id: '6',
    name: 'East End Makers Market',
    neighborhood: 'East Liberty',
    address: '6507 Penn Ave, Pittsburgh, PA 15206',
    schedulePattern: 'First Saturday of every month',
    upcomingDates: nextOccurrences(6, 3, 1),
    description: 'Curated indoor market blending vintage finds with handmade goods from local makers. Strong emphasis on quality and sustainability.',
    website: null,
    lat: 40.4625, lng: -79.9255,
  },
]

export default function VenuesPage() {
  return (
    <>
      <Nav />
      <div style={{ paddingTop: 80 }}>
        <div style={{ height: 4, background: '#5C8AFF' }} />

        {/* Header */}
        <div style={{ maxWidth: 1100, margin: '0 auto', padding: '3rem 2rem 2rem' }}>
          <div style={{
            fontFamily: '"DM Mono", monospace', fontSize: '0.5rem',
            letterSpacing: '0.2em', textTransform: 'uppercase',
            color: 'var(--ink-faint)', marginBottom: '0.75rem',
          }}>Venues</div>
          <h1 style={{
            fontFamily: '"Archivo Black", sans-serif',
            fontSize: 'clamp(1.6rem, 3.5vw, 2.4rem)',
            letterSpacing: '-0.03em', lineHeight: 1.1,
            color: 'var(--ink)', marginBottom: '0.5rem',
          }}>Recurring Markets & Flea Venues</h1>
          <p style={{
            fontSize: '0.9rem', color: 'var(--ink-light)', lineHeight: 1.6,
            maxWidth: 540,
          }}>
            Pittsburgh venues that host regular sales, flea markets, and antique fairs throughout the year.
          </p>
        </div>

        {/* Cards */}
        <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 2rem 5rem' }}>
          <div style={{
            fontFamily: '"DM Mono", monospace', fontSize: '0.5rem',
            letterSpacing: '0.14em', textTransform: 'uppercase',
            color: 'var(--ink-faint)', marginBottom: '1.25rem',
          }}>{SEED_VENUES.length} venues</div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {SEED_VENUES.map(venue => (
              <div key={venue.id} style={{
                background: 'var(--white)', border: '1px solid var(--border)',
                borderRadius: 3, overflow: 'hidden',
              }}>
                <div style={{ height: 3, background: '#5C8AFF' }} />
                <div style={{
                  padding: '1.5rem 1.75rem',
                  display: 'grid',
                  gridTemplateColumns: '1fr auto',
                  gap: '1.5rem',
                  alignItems: 'start',
                }}>
                  <div>
                    {/* Name + neighborhood */}
                    <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.75rem', flexWrap: 'wrap', marginBottom: '0.4rem' }}>
                      <h2 style={{
                        fontFamily: '"Archivo Black", sans-serif', fontSize: '1.05rem',
                        letterSpacing: '-0.02em', color: 'var(--ink)', lineHeight: 1.2,
                      }}>{venue.name}</h2>
                      <span style={{
                        fontFamily: '"DM Mono", monospace', fontSize: '0.46rem',
                        letterSpacing: '0.12em', textTransform: 'uppercase',
                        color: 'var(--ink-faint)',
                      }}>📍 {venue.neighborhood}</span>
                    </div>

                    {/* Schedule pattern */}
                    <div style={{
                      display: 'inline-flex', alignItems: 'center', gap: '0.4rem',
                      fontFamily: '"DM Mono", monospace', fontSize: '0.48rem',
                      letterSpacing: '0.1em', textTransform: 'uppercase',
                      color: 'var(--blue)', marginBottom: '0.75rem',
                    }}>
                      🗓 {venue.schedulePattern}
                    </div>

                    {/* Description */}
                    <p style={{
                      fontSize: '0.85rem', color: 'var(--ink-light)',
                      lineHeight: 1.65, margin: '0 0 1rem',
                      maxWidth: 580,
                    }}>{venue.description}</p>

                    {/* Directions + website */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
                      <GetDirectionsButton address={venue.address} lat={venue.lat} lng={venue.lng} />
                      {venue.website && (
                        <a href={venue.website} target="_blank" rel="noopener noreferrer" style={{
                          fontFamily: '"DM Mono", monospace', fontSize: '0.5rem',
                          letterSpacing: '0.1em', textTransform: 'uppercase',
                          color: 'var(--blue)', textDecoration: 'none',
                          borderBottom: '1px solid var(--blue)', paddingBottom: 1,
                        }}>Website ↗</a>
                      )}
                    </div>
                  </div>

                  {/* Upcoming dates */}
                  {venue.upcomingDates.length > 0 && (
                    <div style={{
                      background: 'var(--paper)', border: '1px solid var(--border)',
                      borderRadius: 3, padding: '0.9rem 1rem', minWidth: 160,
                      flexShrink: 0,
                    }}>
                      <div style={{
                        fontFamily: '"DM Mono", monospace', fontSize: '0.44rem',
                        letterSpacing: '0.16em', textTransform: 'uppercase',
                        color: 'var(--ink-faint)', marginBottom: '0.6rem',
                      }}>Upcoming</div>
                      {venue.upcomingDates.map(date => (
                        <div key={date} style={{
                          fontFamily: '"DM Mono", monospace', fontSize: '0.52rem',
                          letterSpacing: '0.06em', color: 'var(--ink)',
                          lineHeight: 1.9,
                        }}>{date}</div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}
