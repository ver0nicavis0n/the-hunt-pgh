'use client'
import { useEffect, useState } from 'react'

export default function Loader({ onDone }: { onDone: () => void }) {
  useEffect(() => {
    const timer = setTimeout(onDone, 4200)
    return () => clearTimeout(timer)
  }, [onDone])

  const pins = [
    { top: '28%', left: '58%', color: '#0028A0', delay: '0.6s' },
    { top: '65%', left: '35%', color: '#0047FF', delay: '1.3s' },
    { top: '38%', left: '25%', color: '#5C8AFF', delay: '2.0s' },
    { top: '72%', left: '68%', color: '#A8C0FF', delay: '2.7s' },
    { top: '52%', left: '72%', color: '#0028A0', delay: '3.4s' },
  ]

  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 9999,
      background: 'var(--off-white)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      flexDirection: 'column', gap: '2.5rem',
    }}>
      {/* Radar */}
      <div style={{ position: 'relative', width: 180, height: 180,
        animation: 'rise 0.5s ease 0.1s both' }}>
        {/* Rings */}
        {[60, 110, 160].map(size => (
          <div key={size} style={{
            position: 'absolute', borderRadius: '50%',
            border: '1px solid rgba(20,20,18,0.12)',
            width: size, height: size,
            top: '50%', left: '50%',
            transform: 'translate(-50%, -50%)',
          }} />
        ))}
        {/* Crosshairs */}
        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 160, height: 160 }}>
          <div style={{ position: 'absolute', width: 1, height: '100%', left: '50%', background: 'rgba(20,20,18,0.08)', transform: 'translateX(-50%)' }} />
          <div style={{ position: 'absolute', height: 1, width: '100%', top: '50%', background: 'rgba(20,20,18,0.08)', transform: 'translateY(-50%)' }} />
        </div>
        {/* Sweep */}
        <div style={{
          position: 'absolute', top: '50%', left: '50%',
          width: 80, height: 80, transformOrigin: '0 0',
          animation: 'sweep 2.4s linear infinite',
        }}>
          <div style={{
            position: 'absolute', top: 0, left: 0, width: 80, height: 1.5,
            background: 'linear-gradient(90deg, transparent, #0047FF)',
            transformOrigin: 'left center',
          }} />
        </div>
        {/* Sweep fade */}
        <div style={{
          position: 'absolute', top: '50%', left: '50%',
          width: 80, height: 80, transformOrigin: '0 0',
          borderRadius: '0 0 100% 0',
          background: 'conic-gradient(from -45deg, transparent, rgba(0,71,255,0.07) 45deg, transparent 90deg)',
          animation: 'sweep 2.4s linear infinite',
        }} />
        {/* Center dot */}
        <div style={{
          position: 'absolute', top: '50%', left: '50%',
          width: 5, height: 5, borderRadius: '50%',
          background: 'var(--ink)', transform: 'translate(-50%, -50%)', zIndex: 3,
        }} />
        {/* Pins */}
        {pins.map((pin, i) => (
          <div key={i} style={{
            position: 'absolute', width: 7, height: 7, borderRadius: '50%',
            background: pin.color, top: pin.top, left: pin.left,
            transform: 'translate(-50%, -50%)', opacity: 0, zIndex: 2,
            animation: `pop 0.3s ease ${pin.delay} forwards`,
          }} />
        ))}
      </div>

      {/* Wordmark */}
      <div style={{
        fontFamily: '"Archivo Black", sans-serif', fontSize: '2rem',
        letterSpacing: '-0.04em', color: 'var(--ink)',
        animation: 'rise 0.5s ease 0.25s both',
      }}>the hunt</div>

      {/* Status */}
      <div style={{
        fontFamily: '"DM Mono", monospace', fontSize: '0.55rem',
        letterSpacing: '0.2em', textTransform: 'uppercase',
        color: 'var(--ink-faint)', display: 'flex', alignItems: 'center', gap: '0.5rem',
        marginTop: '-1.5rem', animation: 'rise 0.5s ease 0.35s both',
      }}>
        <div style={{ width: 5, height: 5, borderRadius: '50%', background: '#0047FF', animation: 'blink 1.2s ease-in-out infinite' }} />
        Scanning Pittsburgh
      </div>

      {/* Progress bar */}
      <div style={{
        width: 180, height: 2, background: 'var(--border)', borderRadius: 1,
        overflow: 'hidden', marginTop: '-1rem',
        animation: 'rise 0.5s ease 0.4s both',
      }}>
        <div style={{
          height: '100%', background: '#0047FF', borderRadius: 1,
          animation: 'progress 4s ease-in-out forwards',
        }} />
      </div>

      {/* Legend */}
      <div style={{
        display: 'flex', gap: '1.25rem', opacity: 0,
        animation: 'fadein 0.5s ease 3.8s forwards',
      }}>
        {[
          { label: 'Estate', color: '#0028A0' },
          { label: 'Garage', color: '#0047FF' },
          { label: 'Flea', color: '#5C8AFF' },
          { label: 'Auction', color: '#A8C0FF' },
        ].map(item => (
          <div key={item.label} style={{
            display: 'flex', alignItems: 'center', gap: '0.35rem',
            fontFamily: '"DM Mono", monospace', fontSize: '0.5rem',
            letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--ink-faint)',
          }}>
            <div style={{ width: 6, height: 6, borderRadius: '50%', background: item.color }} />
            {item.label}
          </div>
        ))}
      </div>
    </div>
  )
}
