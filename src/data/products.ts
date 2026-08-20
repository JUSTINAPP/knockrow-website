// Static fallback catalogue. Update copy/pricing/stock here if there's no
// Sanity project connected yet — see src/lib/sanity.ts and
// src/components/RangeSection.tsx, which fetch from Sanity first and only
// fall back to this file when NEXT_PUBLIC_SANITY_PROJECT_ID isn't set (or
// the fetch fails). Once Sanity's connected, edit products in the Studio
// at /studio instead — this file stops being read.

export type Product = {
  slug: string
  name: string
  tagline: string
  description: string
  price: string
  /** Price in cents (AUD) — what the Stripe checkout session actually charges. */
  priceCents: number
  size: string
  /** Whether this product offers a "1 Bottle" tier at all — false for the Mixed Case, which only comes in 2 or 6. */
  hasSingleBottleTier: boolean
  /** Shown for the "1 Bottle" tier (only relevant if hasSingleBottleTier is true). */
  image: string
  /** Shown for the "2 Bottles" tier. Undefined shows a grey placeholder box until a real photo exists. */
  twoBottleImage?: string
  /** Shown for the "6 Bottle Case" tier — the only tier that's actually priced/buyable right now. */
  caseImage?: string
  soldOut: boolean
}

export const products: Product[] = [
  {
    slug: 'maca-da-mia',
    name: 'Maca Da Mia',
    tagline: 'Drink neat, on the rocks, or a specialty Maca Martini.',
    description:
      'A beautiful macadamia-infused vodka, the flavour drawn from steeping whole macadamias rather than an essence. Warm, nutty and smooth. Built for sipping neat or shaking into a Maca Martini.',
    price: '$540.00',
    priceCents: 54000,
    size: '6 x 700ml case',
    hasSingleBottleTier: true,
    image: '/images/products/macadamia.png',
    twoBottleImage: '/images/products/macadamia-two.png',
    caseImage: '/images/products/macadamia-six.png',
    soldOut: true,
  },
  {
    slug: 'vodka',
    name: 'Vodka',
    tagline: 'Very smooth, very clean, dangerously easy to drink.',
    description:
      'Our signature vodka. The hearts cut by taste rather than a fixed point on the proof chart, filtered just enough to stay clean without stripping it flat. No burn on the way down, real weight in the glass.',
    price: '$390.00',
    priceCents: 39000,
    size: '6 x 700ml case',
    hasSingleBottleTier: true,
    image: '/images/products/vodka-de1.png',
    twoBottleImage: '/images/products/vodka-two.png',
    caseImage: '/images/products/vodka-six.png',
    soldOut: true,
  },
  {
    slug: 'twin-pack',
    name: 'Knockrow Mixed Case',
    tagline: 'Clean and very smooth. The full range in one case.',
    description:
      'The introductory bundle: three Vodka and three Maca Da Mia, side by side, so you can taste the whole range.',
    price: '$465.00',
    priceCents: 46500,
    size: '3 x Vodka + 3 x Maca Da Mia (6 x 700ml)',
    // No single-bottle tier for the mixed case — it only ever comes as a pair or a full case.
    hasSingleBottleTier: false,
    // The existing default shot already shows one of each bottle, so it doubles as the "2 Bottles" image.
    image: '/images/products/mixed-case.png',
    caseImage: '/images/products/mixed-case-six.png',
    soldOut: true,
  },
]
