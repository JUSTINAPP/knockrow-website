type LogoVariant = 'light' | 'dark'

// Real Knockrow wordmark, derived from the source files you dropped in
// public/images (knockrow-logo.png). Pre-cut into white-on-transparent and
// black-on-transparent so it drops onto any background without extra work.
const SOURCES: Record<LogoVariant, string> = {
  light: '/images/knockrow-logo-white.png',
  dark: '/images/knockrow-logo-black.png',
}

export default function Logo({
  className = 'h-6 w-auto',
  variant = 'light',
}: {
  className?: string
  variant?: LogoVariant
}) {
  // Plain <img> on purpose: this renders at many different fixed heights
  // across the site (nav, footer, hero, age gate) and next/image's required
  // intrinsic sizing doesn't fit that usage well for a small decorative mark.
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={SOURCES[variant]} alt="Knockrow Distillers" className={className} />
  )
}
