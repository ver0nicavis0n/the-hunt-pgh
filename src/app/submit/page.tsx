'use client'
import { useState } from 'react'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import { supabase } from '@/lib/supabase'

const NEIGHBORHOODS = [
  'Bloomfield', 'East Liberty', 'Fox Chapel', 'Greenfield', 'Highland Park',
  'Lawrenceville', 'Mt. Lebanon', 'Mt. Washington', 'Oakland', 'Penn Hills',
  'Point Breeze', 'Shadyside', 'Squirrel Hill', 'South Side', 'Strip District',
  'Swissvale', 'Wilkinsburg', 'Other',
]

const TYPES = [
  { value: 'estate_sale', label: 'Estate Sale' },
  { value: 'garage_sale', label: 'Garage Sale' },
  { value: 'flea_market', label: 'Flea Market' },
  { value: 'auction', label: 'Auction' },
]

const labelStyle: React.CSSProperties = {
  fontFamily: '"DM Mono", monospace', fontSize: '0.48rem',
  letterSpacing: '0.18em', textTransform: 'uppercase',
  color: 'var(--ink-faint)', display: 'block', marginBottom: '0.4rem',
}

const inputStyle: React.CSSProperties = {
  width: '100%', padding: '0.6rem 0.75rem',
  fontFamily: '"DM Sans", sans-serif', fontSize: '0.9rem',
  color: 'var(--ink)', background: 'var(--paper)',
  border: '1px solid var(--border)', borderRadius: 2,
  outline: 'none', boxSizing: 'border-box',
}

const fieldStyle: React.CSSProperties = { display: 'flex', flexDirection: 'column', gap: '0.25rem' }

export default function SubmitPage() {
  const [form, setForm] = useState({
    title: '', type: 'estate_sale', address: '', neighborhood: '',
    start_date: '', end_date: '', start_time: '', end_time: '',
    description: '', contact_email: '', source_url: '',
  })
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState<string | null>(null)

  function set(field: string, value: string) {
    setForm(f => ({ ...f, [field]: value }))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSubmitting(true)
    setError(null)

    const payload = {
      title: form.title.trim(),
      type: form.type,
      status: 'upcoming',
      address: form.address.trim(),
      neighborhood: form.neighborhood,
      city: 'Pittsburgh',
      state: 'PA',
      start_date: form.start_date,
      end_date: form.end_date,
      start_time: form.start_time || null,
      end_time: form.end_time || null,
      description: form.description.trim() || null,
      source_url: form.source_url.trim() || null,
      source: 'User Submission',
      verified: false,
      featured_tier: null,
      address_hidden: false,
      address_release_time: null,
      images: null,
      lat: null,
      lng: null,
      payment_methods: null,
      entry_info: null,
      pricing_notes: null,
      parking_info: null,
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { error: sbError } = await (supabase as any).from('listings').insert([payload])

    if (sbError) {
      setError('Something went wrong. Please try again or email us directly.')
    } else {
      setSubmitted(true)
    }
    setSubmitting(false)
  }

  return (
    <>
      <Nav />
      <div style={{ paddingTop: 80 }}>
        <div style={{ maxWidth: 640, margin: '0 auto', padding: '4rem 2rem' }}>
          <div style={{ marginBottom: '2.5rem' }}>
            <div style={{
              fontFamily: '"DM Mono", monospace', fontSize: '0.5rem',
              letterSpacing: '0.2em', textTransform: 'uppercase',
              color: 'var(--ink-faint)', marginBottom: '0.75rem',
            }}>Submit a Sale</div>
            <h1 style={{
              fontFamily: '"Archivo Black", sans-serif',
              fontSize: 'clamp(1.6rem, 3vw, 2.2rem)',
              letterSpacing: '-0.02em', lineHeight: 1.1, marginBottom: '1rem',
            }}>List your sale</h1>
            <p style={{ fontSize: '0.9rem', color: 'var(--ink-light)', lineHeight: 1.65 }}>
              Submit your estate sale, garage sale, flea market, or auction to The Hunt.
              Listings are reviewed before going live — usually within 24 hours.
            </p>
          </div>

          {submitted ? (
            <div style={{
              padding: '2rem', background: 'var(--paper)',
              border: '1px solid var(--border)', borderRadius: 3,
              textAlign: 'center',
            }}>
              <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>✓</div>
              <div style={{
                fontFamily: '"Archivo Black", sans-serif', fontSize: '1.1rem',
                marginBottom: '0.75rem',
              }}>Listing submitted</div>
              <p style={{ fontSize: '0.85rem', color: 'var(--ink-light)', lineHeight: 1.6 }}>
                We&apos;ll review it and have it live within 24 hours. Thanks for contributing to The Hunt!
              </p>
              <a href="/" style={{
                display: 'inline-block', marginTop: '1.5rem',
                fontFamily: '"DM Mono", monospace', fontSize: '0.5rem',
                letterSpacing: '0.12em', textTransform: 'uppercase',
                color: 'var(--blue)', textDecoration: 'none',
              }}>← Back to all sales</a>
            </div>
          ) : (
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <div style={fieldStyle}>
                <label style={labelStyle}>Sale Title *</label>
                <input
                  required
                  value={form.title}
                  onChange={e => set('title', e.target.value)}
                  placeholder="e.g. Squirrel Hill Estate Sale — Furniture & Art"
                  style={inputStyle}
                />
              </div>

              <div style={fieldStyle}>
                <label style={labelStyle}>Type *</label>
                <select
                  required
                  value={form.type}
                  onChange={e => set('type', e.target.value)}
                  style={inputStyle}
                >
                  {TYPES.map(t => (
                    <option key={t.value} value={t.value}>{t.label}</option>
                  ))}
                </select>
              </div>

              <div style={fieldStyle}>
                <label style={labelStyle}>Address *</label>
                <input
                  required
                  value={form.address}
                  onChange={e => set('address', e.target.value)}
                  placeholder="123 Main St"
                  style={inputStyle}
                />
              </div>

              <div style={fieldStyle}>
                <label style={labelStyle}>Neighborhood *</label>
                <select
                  required
                  value={form.neighborhood}
                  onChange={e => set('neighborhood', e.target.value)}
                  style={inputStyle}
                >
                  <option value="">Select a neighborhood</option>
                  {NEIGHBORHOODS.map(n => (
                    <option key={n} value={n}>{n}</option>
                  ))}
                </select>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div style={fieldStyle}>
                  <label style={labelStyle}>Start Date *</label>
                  <input
                    required type="date"
                    value={form.start_date}
                    onChange={e => set('start_date', e.target.value)}
                    style={inputStyle}
                  />
                </div>
                <div style={fieldStyle}>
                  <label style={labelStyle}>End Date *</label>
                  <input
                    required type="date"
                    value={form.end_date}
                    onChange={e => set('end_date', e.target.value)}
                    style={inputStyle}
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div style={fieldStyle}>
                  <label style={labelStyle}>Start Time</label>
                  <input
                    type="time"
                    value={form.start_time}
                    onChange={e => set('start_time', e.target.value)}
                    style={inputStyle}
                  />
                </div>
                <div style={fieldStyle}>
                  <label style={labelStyle}>End Time</label>
                  <input
                    type="time"
                    value={form.end_time}
                    onChange={e => set('end_time', e.target.value)}
                    style={inputStyle}
                  />
                </div>
              </div>

              <div style={fieldStyle}>
                <label style={labelStyle}>Description</label>
                <textarea
                  rows={4}
                  value={form.description}
                  onChange={e => set('description', e.target.value)}
                  placeholder="What's for sale? Any highlights, special items, or entry details?"
                  style={{ ...inputStyle, resize: 'vertical', lineHeight: 1.6 }}
                />
              </div>

              <div style={fieldStyle}>
                <label style={labelStyle}>Original Listing URL</label>
                <input
                  type="url"
                  value={form.source_url}
                  onChange={e => set('source_url', e.target.value)}
                  placeholder="https://estatesales.net/..."
                  style={inputStyle}
                />
              </div>

              <div style={{ borderTop: '1px solid var(--border)', paddingTop: '1.5rem' }}>
                <div style={fieldStyle}>
                  <label style={labelStyle}>Contact Email * <span style={{ textTransform: 'none', letterSpacing: 0 }}>(not shown publicly)</span></label>
                  <input
                    required type="email"
                    value={form.contact_email}
                    onChange={e => set('contact_email', e.target.value)}
                    placeholder="you@example.com"
                    style={inputStyle}
                  />
                </div>
              </div>

              {error && (
                <div style={{
                  padding: '0.75rem 1rem',
                  background: 'rgba(200, 50, 50, 0.08)',
                  border: '1px solid rgba(200, 50, 50, 0.2)',
                  borderRadius: 2,
                  fontFamily: '"DM Mono", monospace', fontSize: '0.5rem',
                  letterSpacing: '0.08em', color: 'var(--ink)',
                }}>{error}</div>
              )}

              <button
                type="submit"
                disabled={submitting}
                style={{
                  fontFamily: '"DM Mono", monospace', fontSize: '0.55rem',
                  letterSpacing: '0.14em', textTransform: 'uppercase',
                  padding: '0.85rem 2rem', background: 'var(--ink)',
                  color: '#fff', border: 'none', borderRadius: 2,
                  cursor: submitting ? 'not-allowed' : 'pointer',
                  opacity: submitting ? 0.6 : 1, alignSelf: 'flex-start',
                  minHeight: 44,
                }}
              >
                {submitting ? 'Submitting...' : 'Submit Listing'}
              </button>
            </form>
          )}
        </div>
      </div>
      <Footer />
    </>
  )
}
