import Nav from '@/components/Nav'
import Footer from '@/components/Footer'

const TIERS = [
  {
    name: 'Starter',
    price: 'Free',
    period: '',
    description: 'Get discovered. No cost, no commitment.',
    features: [
      'Auto-imported listing',
      'Basic sale details & address',
      'Appear in search results',
      'Source link back to your site',
    ],
    cta: 'Claim Your Listing',
    ctaHref: '#claim',
    highlight: false,
  },
  {
    name: 'Featured',
    price: '$49',
    period: '/mo',
    description: 'Stand out with a premium placement.',
    features: [
      'Everything in Starter',
      '★ Featured badge on listing',
      'Priority placement in results',
      'Photo gallery (up to 8 images)',
      'Custom description',
    ],
    cta: 'Get Featured',
    ctaHref: 'mailto:hello@thehuntpgh.com?subject=Featured Listing',
    highlight: true,
  },
  {
    name: 'Premium',
    price: '$99',
    period: '/mo',
    description: 'Maximum visibility for high-volume sellers.',
    features: [
      'Everything in Featured',
      '◆ Premium badge on listing',
      'Top of all search results',
      'Unlimited photos',
      'Ticker feature placement',
      'Weekly digest inclusion',
    ],
    cta: 'Go Premium',
    ctaHref: 'mailto:hello@thehuntpgh.com?subject=Premium Listing',
    highlight: false,
  },
]

export default function ForBusinessesPage() {
  return (
    <>
      <Nav />
      <div style={{ paddingTop: 80 }}>
        <div style={{ height: 4, background: '#0028A0' }} />

        {/* Hero */}
        <div style={{ maxWidth: 860, margin: '0 auto', padding: '4rem 2rem 3rem' }}>
          <div style={{
            fontFamily: '"DM Mono", monospace', fontSize: '0.5rem',
            letterSpacing: '0.2em', textTransform: 'uppercase',
            color: 'var(--ink-faint)', marginBottom: '1rem',
          }}>For Businesses</div>
          <h1 style={{
            fontFamily: '"Archivo Black", sans-serif',
            fontSize: 'clamp(1.8rem, 4vw, 2.8rem)',
            letterSpacing: '-0.03em', lineHeight: 1.1,
            color: 'var(--ink)', marginBottom: '1rem',
          }}>Reach Pittsburgh's most dedicated secondhand shoppers.</h1>
          <p style={{
            fontSize: '1rem', lineHeight: 1.7,
            color: 'var(--ink-light)', maxWidth: 580,
          }}>
            The Hunt aggregates estate sales, garage sales, flea markets, and auctions across Pittsburgh.
            If you run sales, we're already listing you — claim your listing to take control.
          </p>
        </div>

        {/* Claim listing section */}
        <div id="claim" style={{
          maxWidth: 860, margin: '0 auto', padding: '0 2rem 4rem',
        }}>
          <div style={{
            background: 'var(--paper)', border: '1px solid var(--border)',
            borderRadius: 4, padding: '2.5rem',
            display: 'grid', gridTemplateColumns: '1fr auto',
            gap: '2rem', alignItems: 'center',
          }}>
            <div>
              <div style={{
                fontFamily: '"DM Mono", monospace', fontSize: '0.48rem',
                letterSpacing: '0.18em', textTransform: 'uppercase',
                color: 'var(--ink-faint)', marginBottom: '0.6rem',
              }}>Already listed?</div>
              <h2 style={{
                fontFamily: '"Archivo Black", sans-serif', fontSize: '1.25rem',
                letterSpacing: '-0.02em', color: 'var(--ink)', marginBottom: '0.6rem',
              }}>Claim your auto-imported listing.</h2>
              <p style={{
                fontSize: '0.875rem', lineHeight: 1.65, color: 'var(--ink-light)',
                maxWidth: 480,
              }}>
                We automatically import sales from EstateSales.net, MaxSold, Craigslist, and venue sites.
                If your sale is already on The Hunt, you can claim it to add photos, edit details,
                set your entry info, and upgrade to a featured placement — all from one place.
              </p>
              <div style={{
                marginTop: '1rem', fontFamily: '"DM Mono", monospace',
                fontSize: '0.5rem', letterSpacing: '0.12em',
                textTransform: 'uppercase', color: 'var(--ink-faint)',
              }}>
                Search for your listing →{' '}
                <a href="/" style={{ color: 'var(--blue)', textDecoration: 'none' }}>Browse all sales</a>
              </div>
            </div>
            <a href="mailto:hello@thehuntpgh.com?subject=Claim My Listing" style={{
              fontFamily: '"DM Mono", monospace', fontSize: '0.55rem',
              letterSpacing: '0.12em', textTransform: 'uppercase',
              padding: '0.8rem 1.5rem', background: 'var(--ink)',
              color: '#fff', borderRadius: 2, textDecoration: 'none',
              whiteSpace: 'nowrap', flexShrink: 0,
            }}>
              Claim Listing →
            </a>
          </div>
        </div>

        {/* Pricing tiers */}
        <div style={{ background: 'var(--off-white)', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)' }}>
          <div style={{ maxWidth: 1040, margin: '0 auto', padding: '4rem 2rem' }}>
            <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
              <div style={{
                fontFamily: '"DM Mono", monospace', fontSize: '0.5rem',
                letterSpacing: '0.2em', textTransform: 'uppercase',
                color: 'var(--ink-faint)', marginBottom: '0.75rem',
              }}>Pricing</div>
              <h2 style={{
                fontFamily: '"Archivo Black", sans-serif', fontSize: 'clamp(1.4rem, 3vw, 2rem)',
                letterSpacing: '-0.02em', color: 'var(--ink)',
              }}>Simple, transparent plans.</h2>
            </div>

            <div style={{
              display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
              gap: '1.25rem',
            }}>
              {TIERS.map(tier => (
                <div key={tier.name} style={{
                  background: tier.highlight ? 'var(--ink)' : 'var(--white)',
                  border: tier.highlight ? '1px solid var(--ink)' : '1px solid var(--border)',
                  borderRadius: 4, padding: '2rem',
                  display: 'flex', flexDirection: 'column',
                  position: 'relative', overflow: 'hidden',
                }}>
                  {tier.highlight && (
                    <div style={{
                      position: 'absolute', top: 0, left: 0, right: 0,
                      height: 3, background: 'var(--blue)',
                    }} />
                  )}

                  <div style={{
                    fontFamily: '"DM Mono", monospace', fontSize: '0.5rem',
                    letterSpacing: '0.18em', textTransform: 'uppercase',
                    color: tier.highlight ? 'rgba(250,250,248,0.45)' : 'var(--ink-faint)',
                    marginBottom: '0.5rem',
                  }}>{tier.name}</div>

                  <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.2rem', marginBottom: '0.5rem' }}>
                    <span style={{
                      fontFamily: '"Archivo Black", sans-serif', fontSize: '2rem',
                      letterSpacing: '-0.03em',
                      color: tier.highlight ? '#FAFAF8' : 'var(--ink)',
                    }}>{tier.price}</span>
                    {tier.period && (
                      <span style={{
                        fontFamily: '"DM Mono", monospace', fontSize: '0.55rem',
                        color: tier.highlight ? 'rgba(250,250,248,0.4)' : 'var(--ink-faint)',
                      }}>{tier.period}</span>
                    )}
                  </div>

                  <p style={{
                    fontSize: '0.82rem', lineHeight: 1.5,
                    color: tier.highlight ? 'rgba(250,250,248,0.65)' : 'var(--ink-light)',
                    marginBottom: '1.5rem',
                  }}>{tier.description}</p>

                  <ul style={{ listStyle: 'none', marginBottom: '2rem', flex: 1 }}>
                    {tier.features.map(f => (
                      <li key={f} style={{
                        display: 'flex', alignItems: 'flex-start', gap: '0.6rem',
                        fontSize: '0.82rem', lineHeight: 1.5,
                        color: tier.highlight ? 'rgba(250,250,248,0.75)' : 'var(--ink-light)',
                        marginBottom: '0.5rem',
                      }}>
                        <span style={{
                          color: tier.highlight ? 'var(--blue)' : 'var(--blue)',
                          flexShrink: 0, marginTop: 2,
                        }}>✓</span>
                        {f}
                      </li>
                    ))}
                  </ul>

                  <a href={tier.ctaHref} style={{
                    fontFamily: '"DM Mono", monospace', fontSize: '0.55rem',
                    letterSpacing: '0.12em', textTransform: 'uppercase',
                    padding: '0.75rem 1.25rem', borderRadius: 2,
                    textDecoration: 'none', textAlign: 'center',
                    background: tier.highlight ? 'var(--blue)' : 'transparent',
                    color: tier.highlight ? '#fff' : 'var(--ink)',
                    border: tier.highlight ? '1px solid var(--blue)' : '1px solid var(--border-strong)',
                  }}>{tier.cta} →</a>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom CTA */}
        <div style={{ maxWidth: 860, margin: '0 auto', padding: '4rem 2rem', textAlign: 'center' }}>
          <div style={{
            fontFamily: '"DM Mono", monospace', fontSize: '0.5rem',
            letterSpacing: '0.18em', textTransform: 'uppercase',
            color: 'var(--ink-faint)', marginBottom: '0.75rem',
          }}>Questions?</div>
          <p style={{ fontSize: '0.9rem', color: 'var(--ink-light)', marginBottom: '1.25rem' }}>
            Reach out and we&apos;ll get you set up.
          </p>
          <a href="mailto:hello@thehuntpgh.com" style={{
            fontFamily: '"DM Mono", monospace', fontSize: '0.55rem',
            letterSpacing: '0.12em', textTransform: 'uppercase',
            color: 'var(--blue)', textDecoration: 'none',
            borderBottom: '1px solid var(--blue)', paddingBottom: 2,
          }}>hello@thehuntpgh.com →</a>
        </div>
      </div>
      <Footer />
    </>
  )
}
