'use client'

import Link from 'next/link'
import { useState } from 'react'
import Logo from './Logo'
import { useHeroFade } from '@/lib/useHeroFade'

const links = [
  { href: '/#range', label: 'Range' },
  { href: '/#story', label: 'Our Story' },
  { href: '/#area', label: 'The Area' },
  { href: '/pages/enquire', label: 'Enquire' },
]

// Slim utility bar, transparent over the hero and solidifying (dark bg +
// small logo fading in) as the big floating hero logo fades out. On pages
// without a Hero (e.g. /pages/enquire) it just renders solid from the start.
export default function Nav({ overHero = false }: { overHero?: boolean }) {
  const [open, setOpen] = useState(false)
  const heroProgress = useHeroFade()
  const progress = overHero ? heroProgress : 1

  return (
    <>
      <nav
        className="fixed top-0 left-0 right-0 z-50 transition-colors duration-150"
        style={{ backgroundColor: `rgba(28, 26, 23, ${progress * 0.97})` }}
      >
        <div className="max-w-7xl mx-auto px-[22px] md:px-10 h-[62px] md:h-[68px] flex items-center justify-between">
          <Link
            href="/"
            aria-label="Knockrow Distillers home"
            onClick={() => setOpen(false)}
            className="transition-opacity duration-150"
            style={{ opacity: overHero ? progress : 1 }}
          >
            <Logo className="h-[20px] md:h-[24px] w-auto" variant="light" />
          </Link>

          <div className="hidden md:flex gap-7 items-center">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="text-cream/70 text-[11px] tracking-[0.14em] uppercase font-sans font-light hover:text-cream transition-colors"
              >
                {l.label}
              </Link>
            ))}
          </div>

          <button
            onClick={() => setOpen(!open)}
            className="flex flex-col justify-center gap-[5px] cursor-pointer md:hidden w-6 h-6"
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            aria-controls="mobile-nav"
          >
            <span className={`w-5 h-px bg-cream/80 block transition-transform origin-center ${open ? 'translate-y-[6px] rotate-45' : ''}`} />
            <span className={`w-5 h-px bg-cream/80 block transition-opacity ${open ? 'opacity-0' : ''}`} />
            <span className={`w-5 h-px bg-cream/80 block transition-transform origin-center ${open ? '-translate-y-[6px] -rotate-45' : ''}`} />
          </button>
        </div>
      </nav>

      {/* Mobile drawer */}
      <div
        id="mobile-nav"
        className={`fixed inset-0 top-[62px] bg-ink z-40 flex flex-col pt-6 pb-8 px-8 md:hidden transition-opacity duration-200 ${
          open ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        {links.map((l) => (
          <Link
            key={l.href}
            href={l.href}
            onClick={() => setOpen(false)}
            className="text-cream/75 text-[13px] tracking-[0.14em] uppercase font-sans font-light py-4 border-b border-cream/10 hover:text-cream transition-colors"
          >
            {l.label}
          </Link>
        ))}
      </div>

      {/* Spacer so page content doesn't sit under the fixed bar on non-hero pages */}
      {!overHero && <div className="h-[62px] md:h-[68px]" aria-hidden="true" />}
    </>
  )
}
