'use client'

import Logo from './Logo'
import { useHeroFade } from '@/lib/useHeroFade'

// Full-bleed video hero with the logo floating centered on top of it.
// As you scroll down, the logo fades out (see useHeroFade) — the slim
// utility nav in Nav.tsx fades in at the same rate so there's always
// exactly one logo on screen, never both/neither.
//
// NEEDS FROM YOU: drop the real hero video at public/videos/hero.mp4
// (and a poster frame at public/images/hero-poster.jpg for the instant
// the video loads and as the mobile-data fallback).
export default function Hero() {
  const progress = useHeroFade()
  const logoOpacity = 1 - progress

  return (
    <section className="relative h-[100svh] min-h-[560px] overflow-hidden bg-ink">
      <video
        className="absolute inset-0 h-full w-full object-cover"
        autoPlay
        muted
        loop
        playsInline
        poster="/images/hero-poster.jpg"
      >
        <source src="/videos/hero.mp4" type="video/mp4" />
      </video>

      <div className="absolute inset-0 bg-gradient-to-b from-ink/50 via-ink/20 to-ink/70" />

      <div
        className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center transition-opacity duration-150"
        style={{ opacity: logoOpacity, pointerEvents: logoOpacity < 0.05 ? 'none' : 'auto' }}
      >
        <Logo className="h-10 md:h-14 w-auto mb-5" variant="light" />
        <p className="font-display italic font-light text-[18px] md:text-[22px] tracking-[0.04em] text-cream/85">
          Small batch spirits, distilled on the coast
        </p>
      </div>

      {/* Scroll cue */}
      <div
        className="absolute bottom-7 left-1/2 -translate-x-1/2 transition-opacity duration-150"
        style={{ opacity: logoOpacity }}
      >
        <div className="w-[18px] h-[28px] rounded-full border border-cream/40 flex items-start justify-center pt-[6px]">
          <div className="w-[3px] h-[6px] rounded-full bg-cream/70" />
        </div>
      </div>
    </section>
  )
}
