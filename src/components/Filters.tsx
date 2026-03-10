'use client'

interface FiltersProps {
  activeTypes: string[]
  dateFilter: string
  customDateStart: string
  customDateEnd: string
  auctionMode: string
  activeNeighborhood: string
  onTypeToggle: (t: string) => void
  onDateFilterChange: (f: string) => void
  onCustomDateChange: (start: string, end: string) => void
  onAuctionModeChange: (m: string) => void
  onNeighborhoodChange: (n: string) => void
  onClearAll: () => void
  totalCount: number
  view: 'grid' | 'map'
  onViewChange: (v: 'grid' | 'map') => void
}

const TYPES = [
  { value: 'estate_sale', label: '🏠 Estate Sales' },
  { value: 'garage_sale', label: '🚗 Garage Sales' },
  { value: 'flea_market', label: '🛍 Flea Markets' },
  { value: 'auction', label: '🔨 Auctions' },
  { value: 'venue', label: '🏪 Venues' },
  { value: 'shop', label: '🏬 Shops' },
]

const DATE_QUICK = [
  { value: 'today', label: 'Today' },
  { value: 'weekend', label: 'This Weekend' },
  { value: 'week', label: 'This Week' },
]

const NEIGHBORHOODS = [
  '', 'Fox Chapel', 'Shadyside', 'Squirrel Hill', 'Lawrenceville',
  'Mt. Lebanon', 'South Side', 'Bloomfield', 'Strip District',
  'Oakland', 'North Side', 'East End',
]

export default function Filters({
  activeTypes, dateFilter, customDateStart, customDateEnd, auctionMode,
  activeNeighborhood, onTypeToggle, onDateFilterChange, onCustomDateChange,
  onAuctionModeChange, onNeighborhoodChange, onClearAll,
  totalCount, view, onViewChange,
}: FiltersProps) {
  const labelStyle = {
    fontFamily: '"DM Mono", monospace', fontSize: '0.52rem',
    letterSpacing: '0.18em', textTransform: 'uppercase' as const,
    color: 'var(--ink-faint)', marginBottom: '0.75rem', display: 'block',
  }

  const hasFilters = activeTypes.length > 0 || dateFilter !== '' || activeNeighborhood !== '' || auctionMode !== ''

  const Checkbox = ({ checked, label, onToggle }: { checked: boolean; label: string; onToggle: () => void }) => (
    <div onClick={onToggle} style={{
      display: 'flex', alignItems: 'center', gap: '0.6rem',
      padding: '0.4rem 0', cursor: 'pointer',
    }}>
      <div style={{
        width: 14, height: 14, borderRadius: 2, flexShrink: 0,
        border: checked ? 'none' : '1.5px solid var(--border-strong)',
        background: checked ? '#0047FF' : 'transparent',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        transition: 'all 0.12s',
      }}>
        {checked && (
          <svg width="9" height="7" viewBox="0 0 9 7" fill="none">
            <path d="M1 3.5L3.5 6L8 1" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        )}
      </div>
      <span style={{
        fontFamily: '"DM Sans", sans-serif', fontSize: '0.82rem',
        color: checked ? 'var(--ink)' : 'var(--ink-light)',
        fontWeight: checked ? 500 : 400,
        transition: 'color 0.12s',
      }}>{label}</span>
    </div>
  )

  const showAuctionMode = activeTypes.includes('auction')

  return (
    <aside style={{ width: 210, flexShrink: 0, paddingTop: '0.5rem' }}>
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
        <div>
          <div style={{
            fontFamily: '"Archivo Black", sans-serif', fontSize: '1.6rem',
            letterSpacing: '-0.03em', color: 'var(--ink)', lineHeight: 1, marginBottom: '0.2rem',
          }}>{totalCount}</div>
          <div style={{
            fontFamily: '"DM Mono", monospace', fontSize: '0.5rem',
            letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--ink-faint)',
          }}>Sales Found</div>
        </div>
        <div style={{ display: 'flex', border: '1px solid var(--border)', borderRadius: 3, overflow: 'hidden', marginTop: '0.25rem' }}>
          {(['grid', 'map'] as const).map(v => (
            <button key={v} onClick={() => onViewChange(v)} style={{
              padding: '0.35rem 0.65rem',
              fontFamily: '"DM Mono", monospace', fontSize: '0.48rem',
              letterSpacing: '0.1em', textTransform: 'uppercase',
              border: 'none', cursor: 'pointer',
              background: view === v ? 'var(--ink)' : 'transparent',
              color: view === v ? '#fff' : 'var(--ink-faint)',
              transition: 'all 0.12s',
            }}>
              {v === 'grid' ? '⊞' : '◎'} {v}
            </button>
          ))}
        </div>
      </div>

      <div style={{ borderBottom: '1px solid var(--border)', marginBottom: '1.75rem', paddingBottom: '1rem', minHeight: 20 }}>
        {hasFilters && (
          <button onClick={onClearAll} style={{
            fontFamily: '"DM Mono", monospace', fontSize: '0.5rem',
            letterSpacing: '0.12em', textTransform: 'uppercase',
            color: '#0047FF', background: 'none', border: 'none', cursor: 'pointer', padding: 0,
          }}>✕ Clear all filters</button>
        )}
      </div>

      {/* Type */}
      <div style={{ marginBottom: '2rem' }}>
        <span style={labelStyle}>Type</span>
        {TYPES.map(t => (
          <div key={t.value}>
            <Checkbox
              checked={activeTypes.includes(t.value)}
              label={t.label}
              onToggle={() => onTypeToggle(t.value)}
            />
            {/* Auction sub-filter */}
            {t.value === 'auction' && showAuctionMode && (
              <div style={{ marginLeft: '1.4rem', marginTop: '0.25rem', marginBottom: '0.25rem', display: 'flex', gap: '0.4rem' }}>
                {[{ value: '', label: 'All' }, { value: 'online', label: 'Online' }, { value: 'inperson', label: 'In-Person' }].map(opt => (
                  <button key={opt.value} onClick={() => onAuctionModeChange(opt.value)} style={{
                    fontFamily: '"DM Mono", monospace', fontSize: '0.42rem',
                    letterSpacing: '0.1em', textTransform: 'uppercase',
                    padding: '0.2rem 0.5rem', borderRadius: 2, border: 'none', cursor: 'pointer',
                    background: auctionMode === opt.value ? 'var(--ink)' : 'var(--paper)',
                    color: auctionMode === opt.value ? '#fff' : 'var(--ink-faint)',
                    transition: 'all 0.12s',
                  }}>{opt.label}</button>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* When */}
      <div style={{ marginBottom: '2rem' }}>
        <span style={labelStyle}>When</span>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', marginBottom: '0.9rem' }}>
          {DATE_QUICK.map(q => (
            <button key={q.value} onClick={() => onDateFilterChange(dateFilter === q.value ? '' : q.value)} style={{
              fontFamily: '"DM Mono", monospace', fontSize: '0.44rem',
              letterSpacing: '0.1em', textTransform: 'uppercase',
              padding: '0.28rem 0.6rem', borderRadius: 2, border: 'none', cursor: 'pointer',
              background: dateFilter === q.value ? 'var(--ink)' : 'var(--paper)',
              color: dateFilter === q.value ? '#fff' : 'var(--ink-faint)',
              transition: 'all 0.12s',
            }}>{q.label}</button>
          ))}
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
          <div>
            <div style={{ fontFamily: '"DM Mono", monospace', fontSize: '0.42rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--ink-faint)', marginBottom: '0.25rem' }}>From</div>
            <input
              type="date"
              value={customDateStart}
              onChange={e => {
                onCustomDateChange(e.target.value, customDateEnd)
                if (e.target.value) onDateFilterChange('custom')
              }}
              style={{
                width: '100%', fontFamily: '"DM Mono", monospace', fontSize: '0.6rem',
                padding: '0.35rem 0.5rem', border: '1px solid var(--border)',
                borderRadius: 2, background: 'var(--white)', color: 'var(--ink)',
                outline: 'none',
              }}
            />
          </div>
          <div>
            <div style={{ fontFamily: '"DM Mono", monospace', fontSize: '0.42rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--ink-faint)', marginBottom: '0.25rem' }}>To</div>
            <input
              type="date"
              value={customDateEnd}
              onChange={e => {
                onCustomDateChange(customDateStart, e.target.value)
                if (e.target.value) onDateFilterChange('custom')
              }}
              style={{
                width: '100%', fontFamily: '"DM Mono", monospace', fontSize: '0.6rem',
                padding: '0.35rem 0.5rem', border: '1px solid var(--border)',
                borderRadius: 2, background: 'var(--white)', color: 'var(--ink)',
                outline: 'none',
              }}
            />
          </div>
        </div>
      </div>

      {/* Neighborhood */}
      <div>
        <span style={labelStyle}>Neighborhood</span>
        {NEIGHBORHOODS.map(n => (
          <div key={n} onClick={() => onNeighborhoodChange(n === activeNeighborhood ? '' : n)} style={{
            padding: '0.4rem 0', cursor: 'pointer',
            fontFamily: '"DM Sans", sans-serif', fontSize: '0.82rem',
            color: activeNeighborhood === n ? '#0047FF' : 'var(--ink-light)',
            fontWeight: activeNeighborhood === n ? 500 : 400,
          }}>{n || 'All Neighborhoods'}</div>
        ))}
      </div>
    </aside>
  )
}
