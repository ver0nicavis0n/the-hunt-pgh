'use client'
import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import { Listing } from '@/types'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import GetDirectionsButton from '@/components/GetDirectionsButton'
import { STRIPE_COLORS, CATEGORY_ICONS, CATEGORY_LABELS, STATUS_CONFIG, formatDateRange, getLiveStatus } from '@/lib/utils'

const SEED_LISTINGS: Listing[] = [
  {
    id: '1', title: 'Fox Chapel Tudor Estate — Fine Furniture, Art & Collectibles',
    type: 'estate_sale', status: 'live', featured_tier: 'featured',
    address: '123 Fox Chapel Rd', neighborhood: 'Fox Chapel', city: 'Pittsburgh', state: 'PA', zip: '15238',
    address_hidden: false, address_release_time: null,
    start_date: '2026-03-09', end_date: '2026-03-10', start_time: '9:00 AM', end_time: '4:00 PM',
    company: 'Reynolds Estate Co.', description: 'A stunning Tudor estate sale featuring fine furniture, original artwork, and rare collectibles accumulated over decades.',
    images: null, source: 'EstateSales.net', source_url: null,
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
    company: 'Pittsburgh Estate Sales', description: 'Mid-century modern furniture, vintage records, and household items from a Squirrel Hill ranch home.',
    images: null, source: 'EstateSales.net', source_url: null,
    payment_methods: 'Cash only', entry_info: null, pricing_notes: null, parking_info: null,
    lat: 40.4376, lng: -79.9228, created_at: new Date().toISOString(), updated_at: new Date().toISOString(),
  },
  {
    id: '3', title: 'Shadyside 3-Family Moving Sale — Books, Records & Furniture',
    type: 'garage_sale', status: 'upcoming', featured_tier: null,
    address: '789 Ellsworth Ave', neighborhood: 'Shadyside', city: 'Pittsburgh', state: 'PA', zip: '15232',
    address_hidden: false, address_release_time: null,
    start_date: '2026-03-10', end_date: '2026-03-10', start_time: '7:00 AM', end_time: '2:00 PM',
    company: null, description: 'Three families combining for one massive moving sale. Books, vinyl records, furniture, clothing, and more.',
    images: null, source: 'Craigslist', source_url: null,
    payment_methods: 'Cash', entry_info: null, pricing_notes: null, parking_info: null,
    lat: 40.4520, lng: -79.9304, created_at: new Date().toISOString(), updated_at: new Date().toISOString(),
  },
  {
    id: '4', title: 'South Side Flea — Monthly Indoor Market',
    type: 'flea_market', status: 'live', featured_tier: null,
    address: '2700 E Carson St', neighborhood: 'South Side', city: 'Pittsburgh', state: 'PA', zip: '15203',
    address_hidden: false, address_release_time: null,
    start_date: '2026-03-09', end_date: '2026-03-09', start_time: '10:00 AM', end_time: '4:00 PM',
    company: 'South Side Flea', description: 'Monthly indoor flea market on Carson Street. Vintage clothing, antiques, handmade goods, and local vendors.',
    images: null, source: 'Venue', source_url: null,
    payment_methods: null, entry_info: null, pricing_notes: null, parking_info: null,
    lat: 40.4283, lng: -79.9763, created_at: new Date().toISOString(), updated_at: new Date().toISOString(),
  },
  {
    id: '5', title: 'Lawrenceville Antique Auction — Online + In-Person Pickup',
    type: 'auction', status: 'ending_soon', featured_tier: null,
    address: '100 Butler St', neighborhood: 'Lawrenceville', city: 'Pittsburgh', state: 'PA', zip: '15201',
    address_hidden: false, address_release_time: null,
    start_date: '2026-03-08', end_date: '2026-03-10', start_time: '9:00 AM', end_time: '5:00 PM',
    company: null, description: 'Online auction with in-person pickup in Lawrenceville. Antiques, furniture, jewelry, and estate items.',
    images: null, source: 'MaxSold', source_url: null,
    payment_methods: 'Credit Card', entry_info: null, pricing_notes: null, parking_info: null,
    lat: 40.4650, lng: -79.9600, created_at: new Date().toISOString(), updated_at: new Date().toISOString(),
  },
  {
    id: '6', title: 'Mt. Lebanon Tudor Home — Antiques & Fine China',
    type: 'estate_sale', status: 'upcoming', featured_tier: null,
    address: '55 Cochran Rd', neighborhood: 'Mt. Lebanon', city: 'Pittsburgh', state: 'PA', zip: '15228',
    address_hidden: true, address_release_time: '2026-03-09T08:00:00',
    start_date: '2026-03-09', end_date: '2026-03-10', start_time: '9:00 AM', end_time: '4:00 PM',
    company: 'Steel City Estates', description: 'Elegant Mt. Lebanon Tudor with antiques, fine china, silver, and period furniture. Numbered tickets required.',
    images: null, source: 'EstateSales.net', source_url: null,
    payment_methods: 'Cash, Venmo', entry_info: 'Numbered tickets', pricing_notes: null, parking_info: null,
    lat: 40.3736, lng: -80.0470, created_at: new Date().toISOString(), updated_at: new Date().toISOString(),
  },
]

export default function SalePage() {
  const params = useParams()
  const id = params.id as string
  const [listing, setListing] = useState<Listing | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchListing() {
      const { data } = await supabase.from('listings').select('*').eq('id', id).single()
      if (data) {
        setListing(data)
      } else {
        const seed = SEED_LISTINGS.find(l => l.id === id)
        setListing(seed || null)
      }
      setLoading(false)
    }
    fetchListing()
  }, [id])

  if (loading) {
    return (
      <>
        <Nav />
        <div style={{ paddingTop: 120, textAlign: 'center', fontFamily: '"DM Mono", monospace', fontSize: '0.65rem', letterSpacing: '0.14em', color: 'var(--ink-faint)' }}>
          Loading...
        </div>
      </>
    )
  }

  if (!listing) {
    return (
      <>
        <Nav />
        <div style={{ paddingTop: 120, textAlign: 'center', maxWidth: 600, margin: '0 auto', padding: '120px 2rem' }}>
          <div style={{ fontFamily: '"Archivo Black", sans-serif', fontSize: '1.5rem', marginBottom: '1rem' }}>Sale not found</div>
          <a href="/" style={{ fontFamily: '"DM Mono", monospace', fontSize: '0.6rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--blue)' }}>← Back to all sales</a>
        </div>
        <Footer />
      </>
    )
  }

  const stripeColor = STRIPE_COLORS[listing.type]
  const icon = CATEGORY_ICONS[listing.type]
  const categoryLabel = CATEGORY_LABELS[listing.type]
  const statusConfig = STATUS_CONFIG[getLiveStatus(listing)]

  return (
    <>
      <Nav />
      <div style={{ paddingTop: 80 }}>
        <div style={{ height: 4, background: stripeColor }} />
        <div style={{ maxWidth: 860, margin: '0 auto', padding: '3rem 2rem' }}>

          <a href="/" style={{
            fontFamily: '"DM Mono", monospace', fontSize: '0.55rem',
            letterSpacing: '0.12em', textTransform: 'uppercase',
            color: 'var(--ink-faint)', textDecoration: 'none',
            display: 'inline-flex', alignItems: 'center', gap: '0.4rem',
            marginBottom: '2rem',
          }}>← All Sales</a>

          <div style={{ marginBottom: '2rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
              <span className={`pill ${statusConfig.className}`}>{statusConfig.label}</span>
              <span style={{
                fontFamily: '"DM Mono", monospace', fontSize: '0.5rem',
                letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--ink-faint)',
              }}>{categoryLabel}</span>
            </div>
            <h1 style={{
              fontFamily: '"Archivo Black", sans-serif', fontSize: 'clamp(1.4rem, 3vw, 2rem)',
              letterSpacing: '-0.02em', lineHeight: 1.15, color: 'var(--ink)', marginBottom: '0.75rem',
            }}>
              {icon} {listing.title}
            </h1>
            {listing.company && (
              <div style={{ fontFamily: '"DM Sans", sans-serif', fontSize: '0.9rem', color: 'var(--ink-light)' }}>
                By {listing.company}
              </div>
            )}
          </div>

          {listing.images && listing.images.length > 0 ? (
            <div style={{ marginBottom: '2rem' }}>
              <div style={{
                display: 'grid',
                gridTemplateColumns: listing.images.length === 1 ? '1fr' : 'repeat(auto-fill, minmax(220px, 1fr))',
                gap: '0.75rem',
              }}>
                {listing.images.map((src, i) => (
                  <div key={i} style={{
                    aspectRatio: listing.images!.length === 1 ? '16/7' : '4/3',
                    overflow: 'hidden',
                    borderRadius: 3,
                    border: '1px solid var(--border)',
                    background: 'var(--paper)',
                  }}>
                    <img
                      src={src}
                      alt={`${listing.title} — photo ${i + 1}`}
                      style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                    />
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div style={{
              height: 220,
              borderRadius: 3,
              border: '1px solid var(--border)',
              background: `color-mix(in srgb, ${stripeColor} 10%, var(--paper))`,
              display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
              gap: '0.6rem', marginBottom: '2rem',
            }}>
              <span style={{ fontSize: '4rem', lineHeight: 1 }}>{icon}</span>
              <span style={{
                fontFamily: '"DM Mono", monospace', fontSize: '0.5rem',
                letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--ink-faint)',
              }}>{categoryLabel}</span>
            </div>
          )}

          <div style={{
            display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
            gap: '1.5rem', marginBottom: '2.5rem', padding: '1.5rem',
            background: 'var(--paper)', border: '1px solid var(--border)', borderRadius: 3,
          }}>
            <div>
              <div style={{ fontFamily: '"DM Mono", monospace', fontSize: '0.45rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--ink-faint)', marginBottom: '0.35rem' }}>Dates</div>
              <div style={{ fontSize: '0.85rem', color: 'var(--ink)' }}>{formatDateRange(listing.start_date, listing.end_date)}</div>
            </div>
            <div>
              <div style={{ fontFamily: '"DM Mono", monospace', fontSize: '0.45rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--ink-faint)', marginBottom: '0.35rem' }}>Hours</div>
              <div style={{ fontSize: '0.85rem', color: 'var(--ink)' }}>{listing.start_time} – {listing.end_time}</div>
            </div>
            <div>
              <div style={{ fontFamily: '"DM Mono", monospace', fontSize: '0.45rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--ink-faint)', marginBottom: '0.35rem' }}>Location</div>
              <div style={{ fontSize: '0.85rem', color: 'var(--ink)' }}>
                {listing.address_hidden ? `${listing.neighborhood}, ${listing.city}` : listing.address}
              </div>
              <div style={{ fontSize: '0.75rem', color: 'var(--ink-faint)', marginBottom: listing.address_hidden ? 0 : '0.6rem' }}>{listing.neighborhood}, {listing.city}</div>
              {!listing.address_hidden && (
                <GetDirectionsButton address={listing.address} lat={listing.lat} lng={listing.lng} />
              )}
            </div>
            {listing.payment_methods && (
              <div>
                <div style={{ fontFamily: '"DM Mono", monospace', fontSize: '0.45rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--ink-faint)', marginBottom: '0.35rem' }}>Payment</div>
                <div style={{ fontSize: '0.85rem', color: 'var(--ink)' }}>{listing.payment_methods}</div>
              </div>
            )}
            {listing.entry_info && (
              <div>
                <div style={{ fontFamily: '"DM Mono", monospace', fontSize: '0.45rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--ink-faint)', marginBottom: '0.35rem' }}>Entry</div>
                <div style={{ fontSize: '0.85rem', color: 'var(--ink)' }}>{listing.entry_info}</div>
              </div>
            )}
            {listing.pricing_notes && (
              <div>
                <div style={{ fontFamily: '"DM Mono", monospace', fontSize: '0.45rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--ink-faint)', marginBottom: '0.35rem' }}>Pricing</div>
                <div style={{ fontSize: '0.85rem', color: 'var(--ink)' }}>{listing.pricing_notes}</div>
              </div>
            )}
            {listing.parking_info && (
              <div>
                <div style={{ fontFamily: '"DM Mono", monospace', fontSize: '0.45rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--ink-faint)', marginBottom: '0.35rem' }}>Parking</div>
                <div style={{ fontSize: '0.85rem', color: 'var(--ink)' }}>{listing.parking_info}</div>
              </div>
            )}
            <div>
              <div style={{ fontFamily: '"DM Mono", monospace', fontSize: '0.45rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--ink-faint)', marginBottom: '0.35rem' }}>Source</div>
              <div style={{ fontSize: '0.85rem', color: 'var(--ink)' }}>
                {listing.source_url
                  ? <a href={listing.source_url} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--blue)', textDecoration: 'none' }}>{listing.source} ↗</a>
                  : listing.source}
              </div>
            </div>
          </div>

          <div style={{
            marginBottom: '2rem', padding: '0.75rem 1rem',
            background: 'rgba(200, 150, 0, 0.07)', border: '1px solid rgba(200, 150, 0, 0.2)',
            borderRadius: 3,
            fontFamily: '"DM Mono", monospace', fontSize: '0.48rem',
            letterSpacing: '0.08em', lineHeight: 1.65, color: 'var(--ink-light)',
          }}>
            Info sourced from {listing.source}. Details may have changed —{' '}
            {listing.source_url
              ? <><a href={listing.source_url} target="_blank" rel="noopener noreferrer" style={{ color: 'inherit', textDecoration: 'underline' }}>check the original listing</a> before visiting.</>
              : 'always check the original listing before visiting.'
            }
          </div>

          {listing.description && (
            <div style={{ marginBottom: '2.5rem' }}>
              <div style={{ fontFamily: '"DM Mono", monospace', fontSize: '0.5rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--ink-faint)', marginBottom: '0.75rem' }}>About this sale</div>
              <p style={{ fontSize: '0.95rem', lineHeight: 1.7, color: 'var(--ink-light)' }}>{listing.description}</p>
            </div>
          )}

          {listing.source_url && (
            <a href={listing.source_url} target="_blank" rel="noopener noreferrer" style={{
              display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
              fontFamily: '"DM Mono", monospace', fontSize: '0.55rem',
              letterSpacing: '0.12em', textTransform: 'uppercase',
              padding: '0.75rem 1.5rem', background: 'var(--ink)',
              color: '#fff', borderRadius: 2, textDecoration: 'none',
            }}>
              View Original Listing ↗
            </a>
          )}
        </div>
      </div>
      <Footer />
    </>
  )
}
