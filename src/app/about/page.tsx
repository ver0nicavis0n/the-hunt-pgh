import Nav from '@/components/Nav'
import Footer from '@/components/Footer'

export default function AboutPage() {
  return (
    <>
      <Nav />
      <div style={{ paddingTop: 80 }}>
        <div style={{ height: 4, background: '#5C8AFF' }} />
        <div style={{ maxWidth: 680, margin: '0 auto', padding: '4rem 2rem 6rem' }}>

          <div style={{
            fontFamily: '"DM Mono", monospace', fontSize: '0.5rem',
            letterSpacing: '0.2em', textTransform: 'uppercase',
            color: 'var(--ink-faint)', marginBottom: '1rem',
          }}>About</div>

          <h1 style={{
            fontFamily: '"Archivo Black", sans-serif',
            fontSize: 'clamp(1.8rem, 4vw, 2.6rem)',
            letterSpacing: '-0.03em', lineHeight: 1.1,
            color: 'var(--ink)', marginBottom: '2.5rem',
          }}>Pittsburgh&apos;s secondhand sale aggregator.</h1>

          <div style={{ borderTop: '1px solid var(--border)', paddingTop: '2rem', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <p style={{ fontSize: '0.95rem', lineHeight: 1.75, color: 'var(--ink-light)' }}>
              The Hunt pulls together estate sales, garage sales, flea markets, and auctions from across
              Pittsburgh into one place — so you spend less time searching and more time shopping.
            </p>
            <p style={{ fontSize: '0.95rem', lineHeight: 1.75, color: 'var(--ink-light)' }}>
              We aggregate listings from EstateSales.net, MaxSold, Craigslist, and venue calendars, then
              filter and organize them so you can find what&apos;s happening this weekend by neighborhood,
              type, or status.
            </p>
            <p style={{ fontSize: '0.95rem', lineHeight: 1.75, color: 'var(--ink-light)' }}>
              The Hunt is an independent project. We&apos;re not affiliated with any estate sale company,
              auction house, or thrift chain.
            </p>
          </div>

          <div style={{
            marginTop: '3rem', paddingTop: '2rem',
            borderTop: '1px solid var(--border)',
            display: 'flex', flexDirection: 'column', gap: '0.75rem',
          }}>
            <div style={{
              fontFamily: '"DM Mono", monospace', fontSize: '0.48rem',
              letterSpacing: '0.18em', textTransform: 'uppercase',
              color: 'var(--ink-faint)',
            }}>Get in touch</div>
            <a href="mailto:hello@thehuntpgh.com" style={{
              fontSize: '0.9rem', color: 'var(--blue)', textDecoration: 'none',
            }}>hello@thehuntpgh.com</a>
          </div>

          <div style={{
            marginTop: '3rem', display: 'flex', gap: '1.5rem', flexWrap: 'wrap',
          }}>
            <a href="/" style={{
              fontFamily: '"DM Mono", monospace', fontSize: '0.5rem',
              letterSpacing: '0.12em', textTransform: 'uppercase',
              color: 'var(--ink-faint)', textDecoration: 'none',
            }}>← Browse Sales</a>
            <a href="/for-businesses" style={{
              fontFamily: '"DM Mono", monospace', fontSize: '0.5rem',
              letterSpacing: '0.12em', textTransform: 'uppercase',
              color: 'var(--blue)', textDecoration: 'none',
            }}>For Businesses →</a>
          </div>

        </div>
      </div>
      <Footer />
    </>
  )
}
