import { createClient } from 'next-sanity'
import imageUrlBuilder from '@sanity/image-url'
import type { Image as SanityImage } from 'sanity'

// NEEDS FROM YOU: NEXT_PUBLIC_SANITY_PROJECT_ID isn't set anywhere yet — see
// .env.local.example. Until it is, `isSanityConfigured` is false and every
// fetch below returns null, so callers fall back to the static data in
// src/data/products.ts instead of crashing. Once you've run `sanity init`
// and set the env vars (locally + in Vercel), products start coming from
// the Studio automatically, no code changes needed.
export const isSanityConfigured = Boolean(process.env.NEXT_PUBLIC_SANITY_PROJECT_ID)

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2025-01-01',
  useCdn: true,
})

const builder = imageUrlBuilder(client)

export function urlForImage(source: SanityImage) {
  return builder.image(source)
}

export type SanityProduct = {
  _id: string
  slug: string
  name: string
  tagline: string
  description: string
  price: string
  priceCents: number
  size: string
  image: SanityImage
  caseImage?: SanityImage
  soldOut: boolean
  order: number
}

export async function getSanityProducts(): Promise<SanityProduct[] | null> {
  if (!isSanityConfigured) return null
  try {
    return await client.fetch(
      `*[_type == "product"] | order(order asc) {
        _id,
        "slug": slug.current,
        name,
        tagline,
        description,
        price,
        priceCents,
        size,
        image,
        caseImage,
        soldOut,
        order
      }`
    )
  } catch (err) {
    // Sanity project ID set but unreachable/misconfigured — fail soft to the
    // static fallback rather than taking the whole Range section down.
    console.error('Sanity product fetch failed, falling back to static data:', err)
    return null
  }
}
