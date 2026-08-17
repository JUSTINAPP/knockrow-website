'use client'

import { useEffect, useState } from 'react'

// Tracks scroll progress through the hero section as a 0→1 value.
// 0 = at the very top (hero logo fully visible, top nav fully transparent).
// 1 = scrolled past ~70% of the viewport height (hero logo gone, top nav solid).
// Shared by Hero.tsx (fades the big floating logo out) and Nav.tsx (fades
// the slim sticky bar in) so the two stay perfectly in sync.
export function useHeroFade() {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const fadeDistance = () => window.innerHeight * 0.7

    const onScroll = () => {
      const p = Math.min(1, Math.max(0, window.scrollY / fadeDistance()))
      setProgress(p)
    }

    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [])

  return progress
}
