import { products as staticProducts } from '@/data/products'
import { getSanityProducts, urlForImage } from './sanity'

// Shape RangeSection/ProductCard actually render — same fields whether they
// came from Sanity (images resolved to CDN URLs) or the static fallback
// (images already local /public paths).
export type DisplayProduct = {
  slug: string
  name: string
  tagline: string
  price: string
  priceCents: number
  size: string
  hasSingleBottleTier: boolean
  image: string
  twoBottleImage?: string
  caseImage?: string
  soldOut: boolean
}

export async function getDisplayProducts(): Promise<DisplayProduct[]> {
  const sanityProducts = await getSanityProducts()

  if (sanityProducts && sanityProducts.length > 0) {
    return sanityProducts.map((p) => ({
      slug: p.slug,
      name: p.name,
      tagline: p.tagline,
      price: p.price,
      priceCents: p.priceCents,
      size: p.size,
      hasSingleBottleTier: p.hasSingleBottleTier,
      image: urlForImage(p.image).width(1200).height(1600).fit('crop').url(),
      twoBottleImage: p.twoBottleImage
        ? urlForImage(p.twoBottleImage).width(1200).height(1600).fit('crop').url()
        : undefined,
      caseImage: p.caseImage
        ? urlForImage(p.caseImage).width(1200).height(1600).fit('crop').url()
        : undefined,
      soldOut: p.soldOut,
    }))
  }

  // No Sanity project connected yet (or the fetch failed) — use the static
  // catalogue in src/data/products.ts instead.
  return staticProducts
}
