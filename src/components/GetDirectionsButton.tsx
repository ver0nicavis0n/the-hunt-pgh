'use client'

interface GetDirectionsButtonProps {
  address: string
  lat: number | null
  lng: number | null
  label?: string
}

export default function GetDirectionsButton({
  address, lat, lng, label = 'Get Directions',
}: GetDirectionsButtonProps) {
  function handleClick() {
    const destination = (lat != null && lng != null)
      ? `${lat},${lng}`
      : encodeURIComponent(address)

    const ua = navigator.userAgent
    const isApple = /iPad|iPhone|iPod|Macintosh/i.test(ua)
    const isMobile = /iPhone|iPod|iPad|Android/i.test(ua)

    const url = isApple
      ? `https://maps.apple.com/?daddr=${destination}`
      : `https://www.google.com/maps/dir/?api=1&destination=${destination}`

    if (isMobile) {
      window.location.href = url
    } else {
      window.open(url, '_blank', 'noopener,noreferrer')
    }
  }

  return (
    <button
      onClick={handleClick}
      style={{
        display: 'inline-flex', alignItems: 'center', gap: '0.45rem',
        minHeight: 44, padding: '0 1.1rem',
        background: 'var(--ink)', color: '#fff',
        border: 'none', borderRadius: 2, cursor: 'pointer',
        fontFamily: '"DM Mono", monospace', fontSize: '0.52rem',
        letterSpacing: '0.12em', textTransform: 'uppercase',
        whiteSpace: 'nowrap',
      }}
    >
      📍 {label}
    </button>
  )
}
