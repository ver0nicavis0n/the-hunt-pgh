'use client'
import { useState, useEffect } from 'react'
import Nav from '@/components/Nav'
import Hero from '@/components/Hero'
import Ticker from '@/components/Ticker'
import ListingsGrid from '@/components/ListingsGrid'
import Footer from '@/components/Footer'
import Loader from '@/components/Loader'

export default function Home() {
  const [loading, setLoading] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    const alreadySeen = sessionStorage.getItem('loaderShown')
    if (!alreadySeen) setLoading(true)
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <>
      {loading && <Loader onDone={() => {
        sessionStorage.setItem('loaderShown', '1')
        setLoading(false)
      }} />}
      <div style={{ opacity: loading ? 0 : 1, transition: 'opacity 0.4s ease' }}>
        <Nav />
        <Hero />
        <Ticker />
        <ListingsGrid />
        <Footer />
      </div>
    </>
  )
}
