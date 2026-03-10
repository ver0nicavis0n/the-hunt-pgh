'use client'
import { useState } from 'react'

export default function Nav() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <nav style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 200,
      background: 'rgba(250,250,248,0.92)', backdropFilter: 'blur(12px)',
      borderBottom: '1px solid var(--border)',
    }}>
      <div style={{
        maxWidth: 1280, margin: '0 auto', padding: '0 2rem',
        height: 56, display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      }}>
        {/* Logo */}
        <a href="/" style={{
          fontFamily: '"Archivo Black", sans-serif', fontSize: '1.2rem',
          letterSpacing: '-0.02em', color: 'var(--ink)', textDecoration: 'none',
          display: 'flex', alignItems: 'baseline', gap: '0.5rem',
        }}>
          The Hunt
          <span style={{
            fontFamily: '"DM Mono", monospace', fontSize: '0.55rem',
            letterSpacing: '0.18em', textTransform: 'uppercase',
            color: 'var(--ink-faint)', border: '1px solid var(--border-strong)',
            padding: '0.12rem 0.4rem', borderRadius: 2,
          }}>Pittsburgh</span>
        </a>

        {/* Links */}
        <ul style={{
          display: 'flex', alignItems: 'center', gap: '1.75rem',
          listStyle: 'none',
        }} className="nav-links-desktop">
          {[
            { label: 'Sales', href: '/' },
            { label: 'Shops', href: '/shops' },
            { label: 'Venues', href: '/venues' },
            { label: 'Map', href: '/?view=map' },
          ].map(link => (
            <li key={link.label}>
              <a href={link.href} style={{
                fontSize: '0.8rem', color: 'var(--ink-light)',
                textDecoration: 'none', letterSpacing: '0.01em',
              }}>{link.label}</a>
            </li>
          ))}
          <li>
            <a href="#alerts" style={{
              fontFamily: '"DM Mono", monospace', fontSize: '0.6rem',
              letterSpacing: '0.12em', textTransform: 'uppercase',
              padding: '0.45rem 1.1rem', background: 'var(--ink)',
              color: '#fff', borderRadius: 2, textDecoration: 'none',
            }}>Get Alerts</a>
          </li>
        </ul>
      </div>
    </nav>
  )
}
