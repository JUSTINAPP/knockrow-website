// Pulled from the live knockrow.com (Shopify) store on 2026-08-17.
// Update copy/pricing/stock here — this file is the single source of truth
// for the Range section, no CMS needed for a catalogue this small.

export type Product = {
  slug: string
  name: string
  tagline: string
  description: string
  price: string
  size: string
  image: string
  soldOut: boolean
}

export const products: Product[] = [
  {
    slug: 'vodka',
    name: 'Vodka',
    tagline: 'Very smooth, very clean, dangerously easy to drink.',
    description:
      'Our signature vodka — distilled and filtered for a clean, smooth finish that holds its own against the top shelf.',
    price: '$390.00',
    size: '6 x 700ml case',
    image: '/images/products/vodka.png',
    soldOut: true,
  },
  {
    slug: 'maca-da-mia',
    name: 'Maca Da Mia',
    tagline: 'Drink neat, on the rocks, or a specialty Maca Martini.',
    description:
      'A beautiful macadamia-infused vodka — warm, nutty and smooth. Built for sipping neat or shaking into a Maca Martini.',
    price: '$540.00',
    size: '6 x 700ml case',
    image: '/images/products/maca-da-mia.png',
    soldOut: true,
  },
  {
    slug: 'twin-pack',
    name: 'Knockrow Mixed Case',
    tagline: 'Clean and very smooth — the full range in one case.',
    description:
      'The introductory bundle: three Vodka and three Maca Da Mia, side by side, so you can taste the whole range.',
    price: '$465.00',
    size: '3 x Vodka + 3 x Maca Da Mia (6 x 700ml)',
    image: '/images/products/mixed-case.jpg',
    soldOut: true,
  },
]
