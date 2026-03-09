'use client'
import { useEffect, useRef, useState } from 'react'
import { Listing } from '@/types'
import { STRIPE_COLORS, CATEGORY_ICONS, STATUS_CONFIG, formatDateRange } from '@/lib/utils'

interface MapViewProps {
  listings: Listing[]
}

export default function MapView({ listings }: MapViewProps) {
  const mapRef = useRef<HTMLDivElement>(null)
  const [selected, setSelected] = useState<Listing | null>(null)
  const [mapReady, setMapReady] = useState(false)

  useEffect(() => {
    // Dynamically load Leaflet
    if (typeof window === 'undefined') return
    if ((window as any).L) { setMapReady(true); return }

    const link = document.createElement('link')
    link.rel = 'stylesheet'
    link.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css'
    document.head.appendChild(link)

    const script = document.createElement('script')
    script.src = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js'
    script.onload = () => setMapReady(true)
    document.head.appendChild(script)
  }, [])

  useEffect(() => {
    if (!mapReady || !mapRef.current) return
    const L = (window as any).L

    // Clear any existing map
    if ((mapRef.current as any)._leaflet_id) {
      (mapRef.current as any)._leaflet_id = null
      mapRef.current.innerHTML = ''
    }

    const map = L.map(mapRef.current).setView([40.4406, -79.9959], 12)

    L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
      attribution: '© OpenStreetMap © CARTO',
      subdomains: 'abcd', maxZoom: 19,
    }).addTo(map)

    listings.forEach(listing => {
      if (!listing.lat || !listing.lng) return
      const color = STRIPE_COLORS[listing.type]
      const icon = CATEGORY_ICONS[listing.type]

      const markerIcon = L.divIcon({
        html: `<div style="
          width:32px;height:32px;border-radius:50%;
          background:${color};border:2.5px solid white;
          box-shadow:0 2px 8px rgba(0,0,0,0.2);
          display:flex;align-items:center;justify-content:center;
          font-size:14px;cursor:pointer;
        ">${icon}</div>`,
        className: '',
        iconSize: [32, 32],
        iconAnchor: [16, 16],
      })

      const marker = L.marker([listing.lat, listing.lng], { icon: markerIcon })
      marker.addTo(map)
      marker.on('click', () => setSelected(listing))
    })

    return () => { try { map.remove() } catch(e) {} }
  }, [mapReady, listings])

  return (
    <div style={{ position: 'relative', height: 620, borderRadius: 3, overflow: 'hidden', border: '1px solid var(--border)' }}>
      {!mapReady && (
        <div style={{
          position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center',
          background: 'var(--off-white)', zIndex: 10,
          fontFamily: '"DM Mono", monospace', fontSize: '0.6rem',
          letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--ink-faint)',
        }}>Loading map...</div>
      )}

      <div ref={mapRef} style={{ width: '100%', height: '100%' }} />

      {/* Selected listing popup */}
      {selected && (
        <div style={{
          position: 'absolute', bottom: 16, left: '50%', transform: 'translateX(-50%)',
          zIndex: 1000, background: 'var(--white)', border: '1px solid var(--border)',
          borderRadius: 3, padding: '1rem 1.2rem', minWidth: 300, maxWidth: 380,
          boxShadow: '0 8px 24px rgba(20,20,18,0.12)',
        }}>
          {/* Type stripe */}
          <div style={{ height: 3, background: STRIPE_COLORS[selected.type], margin: '-1rem -1.2rem 0.85rem', borderRadius: '3px 3px 0 0' }} />

          <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '0.75rem' }}>
            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.4rem' }}>
                <span>{CATEGORY_ICONS[selected.type]}</span>
                <span className={`pill ${STATUS_CONFIG[selected.status].className}`}>{STATUS_CONFIG[selected.status].label}</span>
              </div>
              <div style={{
                fontFamily: '"Archivo Black", sans-serif', fontSize: '0.88rem',
                letterSpacing: '-0.02em', lineHeight: 1.2, color: 'var(--ink)', marginBottom: '0.5rem',
              }}>{selected.title}</div>
              <div style={{
                fontFamily: '"DM Mono", monospace', fontSize: '0.48rem',
                letterSpacing: '0.07em', color: 'var(--ink-faint)', lineHeight: 1.8,
              }}>
                <div>📍 {selected.neighborhood}</div>
                <div>📅 {formatDateRange(selected.start_date, selected.end_date)}</div>
              </div>
            </div>
            <button onClick={() => setSelected(null)} style={{
              background: 'none', border: 'none', cursor: 'pointer',
              color: 'var(--ink-faint)', fontSize: '1rem', flexShrink: 0,
            }}>✕</button>
          </div>

          <a href={`/sale/${selected.id}`} style={{
            display: 'block', marginTop: '0.75rem', textAlign: 'center',
            padding: '0.5rem', background: 'var(--ink)', color: '#fff', borderRadius: 2,
            fontFamily: '"DM Mono", monospace', fontSize: '0.52rem',
            letterSpacing: '0.12em', textTransform: 'uppercase', textDecoration: 'none',
          }}>View Sale Details →</a>
        </div>
      )}

      {/* Legend */}
      <div style={{
        position: 'absolute', top: 12, right: 12, zIndex: 1000,
        background: 'var(--white)', border: '1px solid var(--border)',
        borderRadius: 3, padding: '0.6rem 0.8rem',
        display: 'flex', flexDirection: 'column', gap: '0.35rem',
      }}>
        {[
          { label: 'Estate', color: '#0028A0', icon: '🏠' },
          { label: 'Garage', color: '#0047FF', icon: '🚗' },
          { label: 'Flea', color: '#5C8AFF', icon: '🛍' },
          { label: 'Auction', color: '#A8C0FF', icon: '🔨' },
        ].map(item => (
          <div key={item.label} style={{
            display: 'flex', alignItems: 'center', gap: '0.4rem',
            fontFamily: '"DM Mono", monospace', fontSize: '0.48rem',
            letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--ink-faint)',
          }}>
            <div style={{ width: 10, height: 10, borderRadius: '50%', background: item.color, flexShrink: 0 }} />
            {item.label}
          </div>
        ))}
      </div>
    </div>
  )
}
