const TICKER_ITEMS = [
  { label: '🏠 Fox Chapel Estate — Sat & Sun', href: '/sale/1' },
  { label: '🚗 Shadyside 3-Family Sale — Sun Only', href: '/sale/3' },
  { label: '🛍 South Side Flea — Sat Mar 9', href: '/sale/4' },
  { label: '🔨 Lawrenceville Auction — Ends Sunday', href: '/sale/5' },
  { label: '🏠 Mt. Lebanon Tudor — Sat & Sun', href: '/sale/6' },
  { label: '🚗 Squirrel Hill Moving Sale — Sat', href: '/sale/2' },
  { label: '🛍 Hartwood Acres Antique Market — Sun', href: '/' },
  { label: '🔨 MaxSold Online — Closes Tonight', href: '/' },
]

export default function Ticker() {
  const doubled = [...TICKER_ITEMS, ...TICKER_ITEMS]

  return (
    <div style={{
      borderBottom: '1px solid var(--border)',
      background: 'var(--paper)',
      overflow: 'hidden', padding: '0.65rem 0',
    }}>
      <div className="ticker-track">
        {doubled.map((item, i) => (
          <a key={i} href={item.href} style={{
            fontFamily: '"DM Mono", monospace', fontSize: '0.6rem',
            letterSpacing: '0.1em', textTransform: 'uppercase',
            color: 'var(--ink-light)', padding: '0 2.5rem',
            display: 'inline-flex', alignItems: 'center', gap: '2.5rem',
            textDecoration: 'none', cursor: 'pointer',
          }}
          onMouseEnter={e => (e.currentTarget.style.color = 'var(--blue)')}
          onMouseLeave={e => (e.currentTarget.style.color = 'var(--ink-light)')}
          >
            {item.label}
            <span style={{ color: 'var(--border-strong)' }}>·</span>
          </a>
        ))}
      </div>
    </div>
  )
}
