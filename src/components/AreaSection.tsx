import Image from 'next/image'

// Placeholder set — Jonas's real shots of the Knockrow area, dropped in as a
// starting point. Swap/reorder any time; nothing else needs to change.
const areaImages = [
  { src: '/images/area/duck-creek-macadamias.jpg', alt: 'An old fig tree above the macadamia rows at Duck Creek' },
  { src: '/images/area/macadamia-tree-alley.jpg', alt: 'A row of macadamia trees, Duck Creek' },
  { src: '/images/area/macadamias-at-duck-creek.jpg', alt: 'Macadamias still on the tree, not long before harvest' },
  { src: '/images/area/photo0jpg.jpg', alt: 'A swimming hole in the hinterland behind Knockrow' },
]

export default function AreaSection() {
  return (
    <section id="area" className="bg-ink py-[56px] md:py-[80px]">
      <div className="max-w-7xl mx-auto px-6 md:px-[60px]">
        <p className="text-[10px] tracking-[0.2em] uppercase text-amber font-sans font-normal mb-[10px]">
          Where We&apos;re From
        </p>
        <h2 className="font-display font-light text-[34px] md:text-[44px] text-cream leading-[1.1] mb-10 tracking-[0.01em]">
          The area
        </h2>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {areaImages.map((img) => (
            <div key={img.src} className="relative aspect-[4/5] rounded-[6px] overflow-hidden bg-cream/5">
              <Image
                src={img.src}
                alt={img.alt}
                fill
                className="object-cover"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
