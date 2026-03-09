'use client'
import { useState, useMemo } from 'react'
import { Listing } from '@/types'
import ListingCard from './ListingCard'
import Filters from './Filters'
import MapView from './MapView'
import { STRIPE_COLORS } from '@/lib/utils'

const SEED_LISTINGS: Listing[] = [
  {
    id: '1', title: 'Fox Chapel Tudor Estate — Fine Furniture, Art & Collectibles',
    type: 'estate_sale', status: 'live', featured_tier: 'featured',
    address: '123 Fox Chapel Rd', neighborhood: 'Fox Chapel', city: 'Pittsburgh', state: 'PA', zip: '15238',
    address_hidden: false, address_release_time: null,
    start_date: '2026-03-09', end_date: '2026-03-10', start_time: '9:00 AM', end_time: '4:00 PM',
    company: 'Reynolds Estate Co.', description: null, images: null, source: 'EstateSales.net', source_url: null,
    payment_methods: 'Cash, Credit Card', entry_info: 'Sign-in sheet', pricing_notes: '50% off Sunday',
    parking_info: 'Street parking available', lat: 40.5428, lng: -79.8975,
    created_at: new Date().toISOString(), updated_at: new Date().toISOString(),
  },
  {
    id: '2', title: 'Squirrel Hill Mid-Century Ranch Cleanout',
    type: 'estate_sale', status: 'live', featured_tier: null,
    address: '456 Beacon St', neighborhood: 'Squirrel Hill', city: 'Pittsburgh', state: 'PA', zip: '15217',
    address_hidden: false, address_release_time: null,
    start_date: '2026-03-09', end_date: '2026-03-09', start_time: '8:00 AM', end_time: '3:00 PM',
    company: 'Pittsburgh Estate Sales', description: null, images: null, source: 'EstateSales.net', source_url: null,
    payment_methods: 'Cash only', entry_info: null, pricing_notes: null, parking_info: null,
    lat: 40.4376, lng: -79.9228, created_at: new Date().toISOString(), updated_at: new Date().toISOString(),
  },
  {
    id: '3', title: 'Shadyside 3-Family Moving Sale — Books, Records & Furniture',
    type: 'garage_sale', status: 'upcoming', featured_tier: null,
    address: '789 Ellsworth Ave', neighborhood: 'Shadyside', city: 'Pittsburgh', state: 'PA', zip: '15232',
    address_hidden: false, address_release_time: null,
    start_date: '2026-03-10', end_date: '2026-03-10', start_time: '7:00 AM', end_time: '2:00 PM',
    company: null, description: null, images: null, source: 'Craigslist', source_url: null,
    payment_methods: 'Cash', entry_info: null, pricing_notes: null, parking_info: null,
    lat: 40.4520, lng: -79.9304, created_at: new Date().toISOString(), updated_at: new Date().toISOString(),
  },
  {
    id: '4', title: 'South Side Flea — Monthly Indoor Market',
    type: 'flea_market', status: 'live', featured_tier: null,
    address: '2700 E Carson St', neighborhood: 'South Side', city: 'Pittsburgh', state: 'PA', zip: '15203',
    address_hidden: false, address_release_time: null,
    start_date: '2026-03-09', end_date: '2026-03-09', start_time: '10:00 AM', end_time: '4:00 PM',
    company: 'South Side Flea', description: null, images: null, source: 'Venue', source_url: null,
    payment_methods: null, entry_info: null, pricing_notes: null, parking_info: null,
    lat: 40.4283, lng: -79.9763, created_at: new Date().toISOString(), updated_at: new Date().toISOString(),
  },
  {
    id: '5', title: 'Lawrenceville Antique Auction — Online + In-Person Pickup',
    type: 'auction', status: 'ending_soon', featured_tier: null,
    address: '100 Butler St', neighborhood: 'Lawrenceville', city: 'Pittsburgh', state: 'PA', zip: '15201',
    address_hidden: false, address_release_time: null,
    start_date: '2026-03-08', end_date: '2026-03-10', start_time: '9:00 AM', end_time: '5:00 PM',
    company: null, description: null, images: null, source: 'MaxSold', source_url: null,
    payment_methods: 'Credit Card', entry_info: null, pricing_notes: null, parking_info: null,
    lat: 40.4650, lng: -79.9600, created_at: new Date().toISOString(), updated_at: new Date().toISOString(),
  },
  {
    id: '6', title: 'Mt. Lebanon Tudor Home — Antiques & Fine China',
    type: 'estate_sale', status: 'upcoming', featured_tier: null,
    address: '55 Cochran Rd', neighborhood: 'Mt. Lebanon', city: 'Pittsburgh', state: 'PA', zip: '15228',
    address_hidden: true, address_release_time: '2026-03-09T08:00:00',
    start_date: '2026-03-09', end_date: '2026-03-10', start_time: '9:00 AM', end_time: '4:00 PM',
    company: 'Steel City Estates', description: null, images: null, source: 'EstateSales.net', source_url: null,
    payment_methods: 'Cash, Venmo', entry_info: 'Numbered tickets', pricing_notes: null, parking_info: null,
    lat: 40.3736, lng: -80.0470, created_at: new Date().toISOString(), updated_at: new Date().toISOString(),
  },
]

export default function ListingsGrid({ serverListings }: { serverListings?: Listing[] }) {
  const listings = serverListings?.length ? serverListings : SEED_LISTINGS
  const [activeTypes, setActiveTypes] = useState<string[]>([])
  const [activeStatuses, setActiveStatuses] = useState<string[]>([])
  const [activeNeighborhood, setActiveNeighborhood] = useState('')
  const [view, setView] = useState<'grid' | 'map'>('grid')

  function toggleType(t: string) {
    setActiveTypes(prev => prev.includes(t) ? prev.filter(x => x !== t) : [...prev, t])
  }
  function toggleStatus(s: string) {
    setActiveStatuses(prev => prev.includes(s) ? prev.filter(x => x !== s) : [...prev, s])
  }
  function clearAll() {
    setActiveTypes([])
    setActiveStatuses([])
    setActiveNeighborhood('')
  }

  const filtered = useMemo(() => listings.filter(l => {
    if (activeTypes.length > 0 && !activeTypes.includes(l.type)) return false
    if (activeStatuses.length > 0 && !activeStatuses.includes(l.status)) return false
    if (activeNeighborhood && l.neighborhood !== activeNeighborhood) return false
    return true
  }), [listings, activeTypes, activeStatuses, activeNeighborhood])

  const featured = filtered.filter(l => l.featured_tier === 'featured' || l.featured_tier === 'premium')
  const regular = filtered.filter(l => !l.featured_tier)

  return (
    <div style={{ maxWidth: 1280, margin: '0 auto', padding: '3rem 2rem', display: 'flex', gap: '3rem', alignItems: 'flex-start' }}>
      <Filters
        activeTypes={activeTypes}
        activeStatuses={activeStatuses}
        activeNeighborhood={activeNeighborhood}
        onTypeToggle={toggleType}
        onStatusToggle={toggleStatus}
        onNeighborhoodChange={setActiveNeighborhood}
        onClearAll={clearAll}
        totalCount={filtered.length}
        view={view}
        onViewChange={setView}
      />

      <div style={{ flex: 1, minWidth: 0 }}>
        {view === 'map' ? (
          <MapView listings={filtered} />
        ) : (
          <>
            {/* Featured */}
            {featured.length > 0 && (
              <div style={{ marginBottom: '2.5rem' }}>
                <div style={{
                  fontFamily: '"DM Mono", monospace', fontSize: '0.55rem',
                  letterSpacing: '0.2em', textTransform: 'uppercase',
                  color: 'var(--ink-faint)', marginBottom: '1rem',
                  display: 'flex', alignItems: 'center', gap: '0.75rem',
                }}>
                  <span style={{ width: 20, height: 1, background: 'var(--ink-faint)', display: 'inline-block' }} />
                  Featured Listings
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1rem' }}>
                  {featured.map(l => (
                    <ListingCard key={l.id} listing={l} featured={l.featured_tier === 'featured'} premium={l.featured_tier === 'premium'} />
                  ))}
                </div>
              </div>
            )}

            {/* All listings */}
            <div style={{
              fontFamily: '"DM Mono", monospace', fontSize: '0.55rem',
              letterSpacing: '0.2em', textTransform: 'uppercase',
              color: 'var(--ink-faint)', marginBottom: '1rem',
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <span style={{ width: 20, height: 1, background: 'var(--ink-faint)', display: 'inline-block' }} />
                All Sales
              </span>
              <span>{regular.length} results</span>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1rem' }}>
              {regular.map(l => <ListingCard key={l.id} listing={l} />)}
            </div>

            {filtered.length === 0 && (
              <div style={{
                textAlign: 'center', padding: '4rem 2rem',
                fontFamily: '"DM Mono", monospace', fontSize: '0.65rem',
                letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--ink-faint)',
              }}>No sales match these filters.</div>
            )}
          </>
        )}
      </div>
    </div>
  )
}
