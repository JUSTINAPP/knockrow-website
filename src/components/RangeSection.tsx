import Image from 'next/image'
import { products } from '@/data/products'

// NEEDS FROM YOU: real product photography at the paths listed in
// src/data/products.ts (public/images/products/*.jpg). Using the two bottle
// shots you already sent me as a starting point is fine for now.
export default function RangeSection() {
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
            <div key={p.slug} className="group">
              <div className="relative aspect-[3/4] bg-sand rounded-[6px] overflow-hidden mb-4">
                <Image
                  src={p.image}
                  alt={p.name}
                  fill
                  className="object-contain p-6 transition-transform duration-300 group-hover:scale-[1.03]"
                  sizes="(max-width: 768px) 100vw, 400px"
                />
                {p.soldOut && (
                  <span className="absolute top-3 right-3 bg-ink/85 text-cream text-[9px] tracking-[0.12em] uppercase font-sans px-[10px] py-[5px] rounded-[3px]">
                    Sold Out
                  </span>
                )}
              </div>
              <h3 className="font-display font-normal text-[22px] text-ink mb-1">{p.name}</h3>
              <p className="text-[13px] text-ink-soft font-sans font-light leading-[1.6] mb-2">
                {p.tagline}
              </p>
              <div className="flex items-center justify-between">
                <span className="text-[12px] text-ink-soft font-sans font-light">{p.size}</span>
                <span className="text-[14px] text-ink font-sans font-normal">{p.price}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
