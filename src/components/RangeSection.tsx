import { getDisplayProducts } from '@/lib/products'
import ProductCard from './ProductCard'

// Products come from Sanity when it's connected (NEXT_PUBLIC_SANITY_PROJECT_ID
// set — see src/lib/sanity.ts), otherwise from the static catalogue in
// src/data/products.ts. Either way this component doesn't need to know which;
// getDisplayProducts() in src/lib/products.ts handles the fallback. Display
// order is driven by the `order` field in Sanity, or array order in the
// static file (currently Maca Da Mia first, Vodka second, per client
// feedback).
//
// Ecommerce next steps (per client feedback): the quantity dropdown in
// ProductCard.tsx is still presentation-only for the 1/2 bottle tiers, but
// the 6-bottle case now has a real "Buy" button wired to /api/checkout
// (Stripe). It won't actually charge anything until STRIPE_SECRET_KEY is
// set — see .env.local.example.
export default async function RangeSection() {
  const products = await getDisplayProducts()

  return (
    <section id="range" className="bg-cream py-[56px] md:py-[80px]">
      <div className="max-w-7xl mx-auto px-6 md:px-[60px]">
        <p className="text-[10px] tracking-[0.2em] uppercase text-amber-dark font-sans font-normal mb-[10px]">
          The Range
        </p>
        <h2 className="font-display font-light text-[34px] md:text-[44px] text-ink leading-[1.1] mb-10 tracking-[0.01em]">
          Small batch, distilled on the coast
        </h2>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((p) => (
            <ProductCard key={p.slug} product={p} />
          ))}
        </div>
      </div>
    </section>
  )
}
