import Image from 'next/image'

interface PageHeroProps {
  eyebrow: string
  title: string
  subtitle?: string
  image?: string
}

// Ported from Volpino's PageHero, retokened to Knockrow's palette/fonts.
// Used for interior pages (like /enquire) that don't have the video hero.
export default function PageHero({ eyebrow, title, subtitle, image }: PageHeroProps) {
  return (
    <div className="relative overflow-hidden bg-ink">
      {image && (
        <Image
          src={image}
          alt=""
          fill
          priority
          className="object-cover object-center"
          sizes="100vw"
          aria-hidden="true"
        />
      )}

      <div
        className={`absolute inset-0 ${
          image ? 'bg-gradient-to-b from-ink/60 via-ink/55 to-ink/80' : 'bg-ink'
        }`}
      />

      <div className="relative z-10 pt-[52px] pb-[44px] px-6 md:pt-[72px] md:pb-[60px] md:px-[60px]">
        <p className="text-[10px] tracking-[0.22em] uppercase text-cream/55 font-sans font-normal mb-[10px]">
          {eyebrow}
        </p>
        <h1 className="font-display font-light text-[44px] md:text-[64px] leading-[1] tracking-[0.02em] text-cream mb-[10px]">
          {title}
        </h1>
        {subtitle && (
          <p className="font-display italic font-light text-[18px] md:text-[20px] text-cream/85">
            {subtitle}
          </p>
        )}
      </div>
    </div>
  )
}
