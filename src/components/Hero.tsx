'use client'
import { useState } from 'react'
import { supabase } from '@/lib/supabase'

export default function Hero() {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!email) return
    setLoading(true)
    await supabase.from('newsletter').insert({ email })
    setSubmitted(true)
    setLoading(false)
  }

  return (
    <section style={{
      paddingTop: 56, background: 'var(--white)',
      borderBottom: '1px solid var(--border)',
    }}>
      <div style={{
        maxWidth: 1280, margin: '0 auto', padding: '5rem 2rem 4rem',
        display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', alignItems: 'center',
      }}>
        {/* Left: Headline */}
        <div>
          <p style={{
            fontFamily: '"DM Mono", monospace', fontSize: '0.6rem',
            letterSpacing: '0.22em', textTransform: 'uppercase',
            color: 'var(--ink-faint)', marginBottom: '1.5rem',
            display: 'flex', alignItems: 'center', gap: '0.75rem',
          }}>
            <span style={{ width: 24, height: 1, background: 'var(--ink-faint)', display: 'inline-block' }} />
            Pittsburgh · Weekend Sales
          </p>
          <h1 style={{
            fontFamily: '"Archivo Black", sans-serif',
            fontSize: 'clamp(3rem, 6vw, 5.5rem)',
            lineHeight: 0.9, letterSpacing: '-0.04em',
            color: 'var(--ink)', marginBottom: '1.5rem',
          }}>
            The hunt<br />
            in Pittsburgh<br />
            <span style={{ color: 'var(--blue)' }}>starts here.</span>
          </h1>
          <p style={{
            fontSize: '1rem', color: 'var(--ink-light)',
            lineHeight: 1.65, maxWidth: 380, marginBottom: '2.5rem',
          }}>
            Estate sales, garage sales, flea markets & vintage shops — all in one place. Updated daily.
          </p>

          {/* Email capture */}
          {submitted ? (
            <div style={{
              fontFamily: '"DM Mono", monospace', fontSize: '0.65rem',
              letterSpacing: '0.12em', textTransform: 'uppercase',
              color: 'var(--blue)', display: 'flex', alignItems: 'center', gap: '0.5rem',
            }}>
              <span style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--blue)', display: 'inline-block' }} />
              You&apos;re on the list. See you this weekend.
            </div>
          ) : (
            <form onSubmit={handleSubmit} style={{ display: 'flex', gap: '0', maxWidth: 400 }}>
              <input
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
                style={{
                  flex: 1, padding: '0.75rem 1rem',
                  border: '1px solid var(--border-strong)', borderRight: 'none',
                  borderRadius: '2px 0 0 2px', fontSize: '0.85rem',
                  fontFamily: '"DM Sans", sans-serif', background: 'var(--white)',
                  outline: 'none', color: 'var(--ink)',
                }}
              />
              <button type="submit" disabled={loading} style={{
                padding: '0.75rem 1.25rem',
                background: 'var(--blue)', color: '#fff',
                border: 'none', borderRadius: '0 2px 2px 0',
                fontFamily: '"DM Mono", monospace', fontSize: '0.6rem',
                letterSpacing: '0.12em', textTransform: 'uppercase',
                cursor: 'pointer', whiteSpace: 'nowrap',
              }}>
                {loading ? '...' : 'Get Alerts →'}
              </button>
            </form>
          )}
        </div>

        {/* Right: Stats */}
        <div style={{
          display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem',
        }}>
          {[
            { num: '46+', label: 'Sales This Weekend' },
            { num: '$0', label: 'To Browse — Always Free' },
            { num: '12', label: 'Neighborhoods Covered' },
            { num: '6', label: 'Sources Aggregated' },
          ].map(stat => (
            <div key={stat.label} style={{
              background: 'var(--off-white)', border: '1px solid var(--border)',
              borderRadius: 3, padding: '1.5rem',
            }}>
              <div style={{
                fontFamily: '"Archivo Black", sans-serif',
                fontSize: '2.5rem', letterSpacing: '-0.04em',
                lineHeight: 1, color: 'var(--ink)', marginBottom: '0.35rem',
              }}>{stat.num}</div>
              <div style={{
                fontFamily: '"DM Mono", monospace', fontSize: '0.52rem',
                letterSpacing: '0.14em', textTransform: 'uppercase',
                color: 'var(--ink-faint)',
              }}>{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
