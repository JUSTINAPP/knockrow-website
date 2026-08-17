// PLACEHOLDER wordmark. Replace with the real Knockrow logo (ideally an SVG,
// like Volpino's src/components/Logo.tsx) as soon as Matt supplies brand
// assets. Keeping it as a component (rather than an <img>) means every part
// of the site that renders the logo updates in one place once you swap it.

export default function Logo({
  className = 'h-6 w-auto',
  variant = 'light',
}: {
  className?: string
  variant?: 'light' | 'dark'
}) {
  const color = variant === 'light' ? '#FAF7F2' : '#1C1A17'
  return (
    <svg
      viewBox="0 0 240 32"
      className={className}
      aria-label="Knockrow Distillers"
      role="img"
    >
      <text
        x="0"
        y="24"
        fontFamily="var(--font-display), serif"
        fontStyle="italic"
        fontWeight="400"
        fontSize="26"
        letterSpacing="0.5"
        fill={color}
      >
        Knockrow
      </text>
    </svg>
  )
}
