import { Listing } from '@/types'
import { STRIPE_COLORS, CATEGORY_ICONS, STATUS_CONFIG, formatDateRange } from '@/lib/utils'

interface CardProps {
  listing: Listing
  featured?: boolean
  premium?: boolean
}

export default function ListingCard({ listing, featured, premium }: CardProps) {
  const stripeColor = STRIPE_COLORS[listing.type]
  const icon = CATEGORY_ICONS[listing.type]
  const statusConfig = STATUS_CONFIG[listing.status]

  return (
    <a href={`/sale/${listing.id}`} style={{
      background: featured ? 'linear-gradient(160deg, #FDFCFA 0%, #F0F4FF 100%)' : 'var(--white)',
      border: `1px solid ${featured ? 'rgba(92,138,255,0.25)' : 'var(--border)'}`,
      borderRadius: 3,
      overflow: 'hidden',
      transition: 'transform 0.18s, box-shadow 0.18s',
      cursor: 'pointer',
      position: 'relative',
      display: 'block',
      textDecoration: 'none',
    }}
    onMouseEnter={e => {
      const el = e.currentTarget as HTMLAnchorElement
      el.style.transform = 'translateY(-4px)'
      el.style.boxShadow = '0 12px 32px rgba(20,20,18,0.09)'
    }}
    onMouseLeave={e => {
      const el = e.currentTarget as HTMLAnchorElement
      el.style.transform = 'translateY(0)'
      el.style.boxShadow = 'none'
    }}>
      {/* Type stripe */}
      <div style={{ height: 3, background: stripeColor }} />

      <div style={{ padding: '1.1rem 1.2rem' }}>
        {/* Badge row */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem' }}>
          {featured && (
            <span style={{
              fontFamily: '"DM Mono", monospace', fontSize: '0.48rem',
              letterSpacing: '0.14em', textTransform: 'uppercase',
              padding: '0.18rem 0.45rem', borderRadius: 2,
              background: 'rgba(0,71,255,0.08)', color: 'var(--blue)',
            }}>★ Featured</span>
          )}
          {premium && (
            <span style={{
              fontFamily: '"DM Mono", monospace', fontSize: '0.48rem',
              letterSpacing: '0.14em', textTransform: 'uppercase',
              padding: '0.18rem 0.45rem', borderRadius: 2,
              background: 'rgba(0,40,160,0.1)', color: '#0028A0',
            }}>◆ Premium</span>
          )}
          <span className={`pill ${statusConfig.className}`}>{statusConfig.label}</span>
        </div>

        {/* Icon + title */}
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem', marginBottom: '0.6rem' }}>
          <span style={{ fontSize: '0.95rem', flexShrink: 0, marginTop: 1 }}>{icon}</span>
          <h3 style={{
            fontFamily: '"Archivo Black", sans-serif',
            fontSize: '0.88rem', letterSpacing: '-0.02em',
            lineHeight: 1.2, color: 'var(--ink)',
          }}>{listing.title}</h3>
        </div>

        {/* Meta */}
        <div style={{
          fontFamily: '"DM Mono", monospace', fontSize: '0.5rem',
          letterSpacing: '0.07em', color: 'var(--ink-faint)', lineHeight: 1.8,
        }}>
          <div>📍 {listing.neighborhood}, {listing.city}</div>
          <div>📅 {formatDateRange(listing.start_date, listing.end_date)}</div>
          {listing.company && <div>🏢 {listing.company}</div>}
        </div>
      </div>

      {/* Footer */}
      <div style={{
        padding: '0.6rem 1.2rem',
        borderTop: '1px solid var(--border)',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      }}>
        <span style={{
          fontFamily: '"DM Mono", monospace', fontSize: '0.44rem',
          letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--ink-faint)',
        }}>{listing.source}</span>
        <span style={{
          fontFamily: '"DM Mono", monospace', fontSize: '0.5rem',
          letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--blue)',
        }}>View →</span>
      </div>
    </a>
  )
}
