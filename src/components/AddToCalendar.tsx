'use client'
import { useState, useRef, useEffect } from 'react'

interface Props {
  title: string
  startDate: string
  endDate: string
  startTime: string | null
  endTime: string | null
  address: string
  description: string | null
  url: string
}

function parseTime(timeStr: string | null, defaultH: number): { h: number; m: number } {
  if (!timeStr) return { h: defaultH, m: 0 }
  const s = timeStr.trim()
  const m12 = s.match(/^(\d{1,2})(?::(\d{2}))?\s*(AM|PM)$/i)
  if (m12) {
    let h = parseInt(m12[1], 10)
    const min = m12[2] ? parseInt(m12[2], 10) : 0
    const period = m12[3].toUpperCase()
    if (period === 'PM' && h !== 12) h += 12
    if (period === 'AM' && h === 12) h = 0
    return { h, m: min }
  }
  const m24 = s.match(/^(\d{1,2}):(\d{2})/)
  if (m24) return { h: parseInt(m24[1], 10), m: parseInt(m24[2], 10) }
  return { h: defaultH, m: 0 }
}

function toCompact(date: string, time: string | null, defaultH: number): string {
  const { h, m } = parseTime(time, defaultH)
  const [y, mo, d] = date.split('-')
  return `${y}${mo}${d}T${String(h).padStart(2, '0')}${String(m).padStart(2, '0')}00`
}

function toIso(date: string, time: string | null, defaultH: number): string {
  const { h, m } = parseTime(time, defaultH)
  const [y, mo, d] = date.split('-')
  return `${y}-${mo}-${d}T${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}:00`
}

export default function AddToCalendar({ title, startDate, endDate, startTime, endTime, address, description, url }: Props) {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  const start = toCompact(startDate, startTime, 9)
  const end = toCompact(endDate, endTime, 17)
  const desc = [description, `More info: ${url}`].filter(Boolean).join('\n\n')

  const googleUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(title)}&dates=${start}/${end}&details=${encodeURIComponent(desc)}&location=${encodeURIComponent(address)}`

  const outlookUrl = `https://outlook.live.com/calendar/0/deeplink/compose?subject=${encodeURIComponent(title)}&startdt=${toIso(startDate, startTime, 9)}&enddt=${toIso(endDate, endTime, 17)}&body=${encodeURIComponent(desc)}&location=${encodeURIComponent(address)}`

  function downloadIcs() {
    const ics = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//The Hunt Pittsburgh//EN',
      'BEGIN:VEVENT',
      `SUMMARY:${title}`,
      `DTSTART:${start}`,
      `DTEND:${end}`,
      `LOCATION:${address}`,
      `DESCRIPTION:${desc.replace(/\n/g, '\\n')}`,
      `URL:${url}`,
      'END:VEVENT',
      'END:VCALENDAR',
    ].join('\r\n')

    const blob = new Blob([ics], { type: 'text/calendar' })
    const a = document.createElement('a')
    a.href = URL.createObjectURL(blob)
    a.download = `${title.replace(/[^a-z0-9]/gi, '-').toLowerCase()}.ics`
    a.click()
    URL.revokeObjectURL(a.href)
    setOpen(false)
  }

  const btnStyle: React.CSSProperties = {
    display: 'block', width: '100%', textAlign: 'left',
    fontFamily: '"DM Mono", monospace', fontSize: '0.5rem',
    letterSpacing: '0.12em', textTransform: 'uppercase',
    padding: '0.55rem 0.75rem', background: 'none', border: 'none',
    color: 'var(--ink)', cursor: 'pointer', whiteSpace: 'nowrap',
  }

  return (
    <div ref={ref} style={{ position: 'relative', display: 'inline-block' }}>
      <button
        onClick={() => setOpen(o => !o)}
        style={{
          fontFamily: '"DM Mono", monospace', fontSize: '0.5rem',
          letterSpacing: '0.12em', textTransform: 'uppercase',
          padding: '0.5rem 0.75rem', background: 'var(--paper)',
          border: '1px solid var(--border)', borderRadius: 2,
          color: 'var(--ink)', cursor: 'pointer', minHeight: 36,
          display: 'inline-flex', alignItems: 'center', gap: '0.35rem',
        }}
      >
        📅 Add to Calendar
      </button>
      {open && (
        <div style={{
          position: 'absolute', top: 'calc(100% + 4px)', left: 0,
          background: 'var(--paper)', border: '1px solid var(--border)',
          borderRadius: 2, boxShadow: '0 4px 16px rgba(0,0,0,0.1)',
          zIndex: 100, minWidth: 160,
        }}>
          <a
            href={googleUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setOpen(false)}
            style={{ ...btnStyle, textDecoration: 'none' }}
          >
            Google Calendar
          </a>
          <button onClick={downloadIcs} style={btnStyle}>
            Apple / iCal
          </button>
          <a
            href={outlookUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setOpen(false)}
            style={{ ...btnStyle, textDecoration: 'none' }}
          >
            Outlook
          </a>
        </div>
      )}
    </div>
  )
}
