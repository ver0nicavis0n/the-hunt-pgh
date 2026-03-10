export default function Footer() {
  return (
    <footer style={{ background: 'var(--ink)', marginTop: '5rem' }}>
      {/* Top footer */}
      <div style={{
        maxWidth: 1280, margin: '0 auto', padding: '4rem 2rem 3rem',
        display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', gap: '2rem',
        borderBottom: '1px solid rgba(255,255,255,0.08)',
      }}>
        {/* Brand */}
        <div>
          <div style={{
            fontFamily: '"Archivo Black", sans-serif', fontSize: '1.1rem',
            letterSpacing: '-0.02em', color: '#FAFAF8', marginBottom: '0.75rem',
          }}>The Hunt</div>
          <div style={{
            fontFamily: '"DM Mono", monospace', fontSize: '0.52rem',
            letterSpacing: '0.14em', textTransform: 'uppercase',
            color: 'rgba(250,250,248,0.35)', lineHeight: 1.8,
          }}>
            Pittsburgh&apos;s secondhand<br />sale aggregator.
          </div>
        </div>

        {/* Explore */}
        <div>
          <div style={{
            fontFamily: '"DM Mono", monospace', fontSize: '0.5rem',
            letterSpacing: '0.2em', textTransform: 'uppercase',
            color: 'rgba(250,250,248,0.35)', marginBottom: '1rem',
          }}>Explore</div>
          {[
            { label: 'Estate Sales', href: '/?type=estate_sale' },
            { label: 'Garage Sales', href: '/?type=garage_sale' },
            { label: 'Flea Markets', href: '/?type=flea_market' },
            { label: 'Auctions', href: '/?type=auction' },
            { label: 'Shops', href: '/for-businesses' },
            { label: 'Venues', href: '/for-businesses' },
          ].map(link => (
            <a key={link.label} href={link.href} style={{
              display: 'block', fontFamily: '"DM Sans", sans-serif',
              fontSize: '0.8rem', color: 'rgba(250,250,248,0.6)',
              textDecoration: 'none', marginBottom: '0.5rem',
              transition: 'color 0.12s',
            }}>{link.label}</a>
          ))}
        </div>

        {/* The Hunt */}
        <div>
          <div style={{
            fontFamily: '"DM Mono", monospace', fontSize: '0.5rem',
            letterSpacing: '0.2em', textTransform: 'uppercase',
            color: 'rgba(250,250,248,0.35)', marginBottom: '1rem',
          }}>The Hunt</div>
          {[
            { label: 'About', href: '/about' },
            { label: 'For Businesses', href: '/for-businesses' },
            { label: 'Newsletter', href: '/#alerts' },
            { label: 'Map View', href: '/?view=map' },
          ].map(link => (
            <a key={link.label} href={link.href} style={{
              display: 'block', fontFamily: '"DM Sans", sans-serif',
              fontSize: '0.8rem', color: 'rgba(250,250,248,0.6)',
              textDecoration: 'none', marginBottom: '0.5rem',
            }}>{link.label}</a>
          ))}
        </div>

        {/* Newsletter */}
        <div>
          <div style={{
            fontFamily: '"DM Mono", monospace', fontSize: '0.5rem',
            letterSpacing: '0.2em', textTransform: 'uppercase',
            color: 'rgba(250,250,248,0.35)', marginBottom: '1rem',
          }}>Weekly Digest</div>
          <div style={{
            fontSize: '0.8rem', color: 'rgba(250,250,248,0.6)',
            lineHeight: 1.6, marginBottom: '1rem',
          }}>Best sales this weekend, every Friday morning.</div>
          <a href="#alerts" style={{
            fontFamily: '"DM Mono", monospace', fontSize: '0.55rem',
            letterSpacing: '0.12em', textTransform: 'uppercase',
            color: 'var(--blue)', textDecoration: 'none',
            borderBottom: '1px solid var(--blue)', paddingBottom: 2,
          }}>Subscribe Free →</a>
        </div>
      </div>

      {/* Big wordmark */}
      <div style={{
        overflow: 'hidden', padding: '2rem 2rem 0',
        position: 'relative',
      }}>
        <div style={{
          fontFamily: '"Archivo Black", sans-serif',
          fontSize: 'clamp(6rem, 18vw, 14rem)',
          letterSpacing: '-0.04em', lineHeight: 0.82,
          color: 'rgba(250,250,248,0.92)',
          whiteSpace: 'nowrap', userSelect: 'none',
          transform: 'translateY(12px)',
        }}>the hunt</div>
        {/* Pink rule */}
        <div style={{ height: 3, background: 'var(--blue)', marginTop: -3, position: 'relative', zIndex: 2 }} />
      </div>

      {/* Legal */}
      <div style={{
        maxWidth: 1280, margin: '0 auto', padding: '1rem 2rem',
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
      }}>
        <div style={{
          fontFamily: '"DM Mono", monospace', fontSize: '0.48rem',
          letterSpacing: '0.1em', color: 'rgba(250,250,248,0.2)',
        }}>© 2026 The Hunt · Pittsburgh, PA</div>
        <div style={{
          fontFamily: '"DM Mono", monospace', fontSize: '0.48rem',
          letterSpacing: '0.1em', color: 'rgba(250,250,248,0.2)',
          maxWidth: 460, textAlign: 'right',
        }}>Listing info is aggregated from third-party sources and may not be fully accurate. Always verify details with the original listing before visiting.</div>
      </div>
    </footer>
  )
}
