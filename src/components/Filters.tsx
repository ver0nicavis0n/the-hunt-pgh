'use client'

interface FiltersProps {
  activeTypes: string[]
  activeStatuses: string[]
  activeNeighborhood: string
  onTypeToggle: (t: string) => void
  onStatusToggle: (s: string) => void
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
]

const STATUSES = [
  { value: 'live', label: 'Happening Now' },
  { value: 'upcoming', label: 'Coming Up' },
  { value: 'ending_soon', label: 'Ending Soon' },
]

const NEIGHBORHOODS = [
  '', 'Fox Chapel', 'Shadyside', 'Squirrel Hill', 'Lawrenceville',
  'Mt. Lebanon', 'South Side', 'Bloomfield', 'Strip District',
  'Oakland', 'North Side', 'East End',
]

export default function Filters({
  activeTypes, activeStatuses, activeNeighborhood,
  onTypeToggle, onStatusToggle, onNeighborhoodChange, onClearAll,
  totalCount, view, onViewChange,
}: FiltersProps) {
  const labelStyle = {
    fontFamily: '"DM Mono", monospace', fontSize: '0.52rem',
    letterSpacing: '0.18em', textTransform: 'uppercase' as const,
    color: 'var(--ink-faint)', marginBottom: '0.75rem', display: 'block',
  }

  const hasFilters = activeTypes.length > 0 || activeStatuses.length > 0 || activeNeighborhood !== ''

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

      <div style={{ marginBottom: '2rem' }}>
        <span style={labelStyle}>Type</span>
        {TYPES.map(t => (
          <Checkbox key={t.value} checked={activeTypes.includes(t.value)} label={t.label} onToggle={() => onTypeToggle(t.value)} />
        ))}
      </div>

      <div style={{ marginBottom: '2rem' }}>
        <span style={labelStyle}>When</span>
        {STATUSES.map(s => (
          <Checkbox key={s.value} checked={activeStatuses.includes(s.value)} label={s.label} onToggle={() => onStatusToggle(s.value)} />
        ))}
      </div>

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
