'use client'
import { useState, useMemo } from 'react'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import GetDirectionsButton from '@/components/GetDirectionsButton'

type ShopType = 'thrift' | 'vintage' | 'antique' | 'consignment' | 'charity'

interface Shop {
  id: string
  name: string
  type: ShopType
  neighborhood: string
  address: string
  hours: string | null
  description: string | null
  lat: number | null
  lng: number | null
}

const SEED_SHOPS: Shop[] = [
  {
    id: '1',
    name: 'Goodwill of Southwestern PA — Strip District',
    type: 'charity',
    neighborhood: 'Strip District',
    address: '2000 Smallman St, Pittsburgh, PA 15222',
    hours: 'Mon–Sat 9am–8pm, Sun 10am–6pm',
    description: 'Large-format Goodwill with a wide selection of clothing, furniture, and housewares.',
    lat: 40.4490, lng: -79.9770,
  },
  {
    id: '2',
    name: 'St. Vincent de Paul — Garfield',
    type: 'charity',
    neighborhood: 'Garfield',
    address: '1600 Penn Ave, Pittsburgh, PA 15206',
    hours: 'Mon–Sat 9am–5pm',
    description: 'Community thrift shop benefiting the Society of St. Vincent de Paul.',
    lat: 40.4620, lng: -79.9480,
  },
  {
    id: '3',
    name: 'Red White & Blue Thrift Store',
    type: 'thrift',
    neighborhood: 'Hazelwood',
    address: '4717 Hazelwood Ave, Pittsburgh, PA 15207',
    hours: 'Mon–Sat 9am–6pm, Sun 11am–5pm',
    description: 'No-frills, pound-by-the-bag thrift warehouse with constant new stock.',
    lat: 40.4090, lng: -79.9380,
  },
  {
    id: '4',
    name: 'Holy Redeemer Church Thrift Shop',
    type: 'charity',
    neighborhood: 'Lawrenceville',
    address: '3428 Butler St, Pittsburgh, PA 15201',
    hours: 'Fri 10am–2pm, Sat 9am–1pm',
    description: 'Small church-run shop with well-priced housewares, books, and clothing.',
    lat: 40.4660, lng: -79.9590,
  },
  {
    id: '5',
    name: 'Avalon Exchange',
    type: 'vintage',
    neighborhood: 'Oakland',
    address: '323 Atwood St, Pittsburgh, PA 15213',
    hours: 'Mon–Sat 11am–7pm, Sun 12pm–6pm',
    description: 'Curated buy-sell-trade shop specializing in vintage and contemporary clothing.',
    lat: 40.4390, lng: -79.9600,
  },
  {
    id: '6',
    name: 'Zebra Lounge',
    type: 'vintage',
    neighborhood: 'Bloomfield',
    address: '4524 Liberty Ave, Pittsburgh, PA 15224',
    hours: 'Thu–Sun 12pm–6pm',
    description: 'Eclectic vintage shop with a strong selection of clothing, accessories, and oddities.',
    lat: 40.4640, lng: -79.9510,
  },
  {
    id: '7',
    name: 'Pittsburgh Antique Mall',
    type: 'antique',
    neighborhood: 'East Liberty',
    address: '6415 Penn Ave, Pittsburgh, PA 15206',
    hours: 'Wed–Sun 11am–5pm',
    description: 'Multi-dealer antique mall spanning furniture, art, jewelry, and collectibles.',
    lat: 40.4620, lng: -79.9260,
  },
  {
    id: '8',
    name: 'Retro Den',
    type: 'vintage',
    neighborhood: 'Lawrenceville',
    address: '3608 Butler St, Pittsburgh, PA 15201',
    hours: 'Wed–Sun 11am–6pm',
    description: 'Mid-century furniture, vintage homewares, and decorative objects.',
    lat: 40.4670, lng: -79.9560,
  },
  {
    id: '9',
    name: 'Consign Pittsburgh',
    type: 'consignment',
    neighborhood: 'Shadyside',
    address: '5520 Walnut St, Pittsburgh, PA 15232',
    hours: 'Tue–Sat 11am–6pm',
    description: 'Upscale consignment boutique with gently used designer clothing and accessories.',
    lat: 40.4540, lng: -79.9270,
  },
  {
    id: '10',
    name: 'Carnegie Antique Mall',
    type: 'antique',
    neighborhood: 'Carnegie',
    address: '27 W Main St, Carnegie, PA 15106',
    hours: 'Mon–Sat 10am–5pm, Sun 12pm–4pm',
    description: 'Two floors of antiques and collectibles from dozens of local dealers.',
    lat: 40.4020, lng: -80.0850,
  },
]

const TYPE_CONFIG: Record<ShopType, { label: string; color: string; bg: string }> = {
  charity:     { label: 'Charity',     color: '#0028A0', bg: 'rgba(0,40,160,0.07)' },
  thrift:      { label: 'Thrift',      color: '#0047FF', bg: 'rgba(0,71,255,0.07)' },
  vintage:     { label: 'Vintage',     color: '#7C3AED', bg: 'rgba(124,58,237,0.07)' },
  antique:     { label: 'Antique',     color: '#B45309', bg: 'rgba(180,83,9,0.07)'  },
  consignment: { label: 'Consignment', color: '#065F46', bg: 'rgba(6,95,70,0.07)'   },
}

const TYPE_FILTERS: { value: ShopType | ''; label: string }[] = [
  { value: '', label: 'All' },
  { value: 'charity', label: 'Charity' },
  { value: 'thrift', label: 'Thrift' },
  { value: 'vintage', label: 'Vintage' },
  { value: 'antique', label: 'Antique' },
  { value: 'consignment', label: 'Consignment' },
]

export default function ShopsPage() {
  const [activeType, setActiveType] = useState<ShopType | ''>('')

  const filtered = useMemo(() =>
    activeType ? SEED_SHOPS.filter(s => s.type === activeType) : SEED_SHOPS,
    [activeType]
  )

  return (
    <>
      <Nav />
      <div style={{ paddingTop: 80 }}>
        <div style={{ height: 4, background: '#7C3AED' }} />

        {/* Header */}
        <div style={{ maxWidth: 1100, margin: '0 auto', padding: '3rem 2rem 2rem' }}>
          <div style={{
            fontFamily: '"DM Mono", monospace', fontSize: '0.5rem',
            letterSpacing: '0.2em', textTransform: 'uppercase',
            color: 'var(--ink-faint)', marginBottom: '0.75rem',
          }}>Shops</div>
          <h1 style={{
            fontFamily: '"Archivo Black", sans-serif',
            fontSize: 'clamp(1.6rem, 3.5vw, 2.4rem)',
            letterSpacing: '-0.03em', lineHeight: 1.1,
            color: 'var(--ink)', marginBottom: '0.5rem',
          }}>Pittsburgh Secondhand Stores</h1>
          <p style={{
            fontSize: '0.9rem', color: 'var(--ink-light)', lineHeight: 1.6,
            maxWidth: 520, marginBottom: '2rem',
          }}>
            Permanent shops — thrift, vintage, antique, consignment, and charity stores open year-round.
          </p>

          {/* Type filter pills */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
            {TYPE_FILTERS.map(f => (
              <button key={f.value} onClick={() => setActiveType(f.value)} style={{
                fontFamily: '"DM Mono", monospace', fontSize: '0.48rem',
                letterSpacing: '0.12em', textTransform: 'uppercase',
                padding: '0.35rem 0.85rem', borderRadius: 2, border: 'none', cursor: 'pointer',
                background: activeType === f.value ? 'var(--ink)' : 'var(--paper)',
                color: activeType === f.value ? '#fff' : 'var(--ink-faint)',
                transition: 'all 0.12s',
              }}>{f.label}</button>
            ))}
          </div>
        </div>

        {/* Grid */}
        <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 2rem 5rem' }}>
          <div style={{
            fontFamily: '"DM Mono", monospace', fontSize: '0.5rem',
            letterSpacing: '0.14em', textTransform: 'uppercase',
            color: 'var(--ink-faint)', marginBottom: '1.25rem',
          }}>{filtered.length} {filtered.length === 1 ? 'shop' : 'shops'}</div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
            gap: '1rem',
          }}>
            {filtered.map(shop => {
              const tc = TYPE_CONFIG[shop.type]
              return (
                <div key={shop.id} style={{
                  background: 'var(--white)', border: '1px solid var(--border)',
                  borderRadius: 3, overflow: 'hidden',
                  display: 'flex', flexDirection: 'column',
                }}>
                  <div style={{ height: 3, background: tc.color }} />
                  <div style={{ padding: '1.1rem 1.2rem', flex: 1, display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>

                    {/* Type badge */}
                    <div>
                      <span style={{
                        fontFamily: '"DM Mono", monospace', fontSize: '0.44rem',
                        letterSpacing: '0.14em', textTransform: 'uppercase',
                        padding: '0.18rem 0.5rem', borderRadius: 20,
                        background: tc.bg, color: tc.color,
                      }}>{tc.label}</span>
                    </div>

                    {/* Name */}
                    <div style={{
                      fontFamily: '"Archivo Black", sans-serif', fontSize: '0.92rem',
                      letterSpacing: '-0.02em', lineHeight: 1.2, color: 'var(--ink)',
                    }}>{shop.name}</div>

                    {/* Neighborhood + address */}
                    <div style={{
                      fontFamily: '"DM Mono", monospace', fontSize: '0.48rem',
                      letterSpacing: '0.07em', color: 'var(--ink-faint)', lineHeight: 1.8,
                    }}>
                      <div>📍 {shop.neighborhood}</div>
                      {shop.hours && <div>🕐 {shop.hours}</div>}
                    </div>

                    {/* Description */}
                    {shop.description && (
                      <p style={{
                        fontSize: '0.78rem', color: 'var(--ink-light)',
                        lineHeight: 1.55, margin: 0, flex: 1,
                      }}>{shop.description}</p>
                    )}
                  </div>

                  {/* Footer */}
                  <div style={{
                    padding: '0.75rem 1.2rem',
                    borderTop: '1px solid var(--border)',
                  }}>
                    <GetDirectionsButton address={shop.address} lat={shop.lat} lng={shop.lng} />
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}
