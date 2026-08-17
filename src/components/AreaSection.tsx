import Image from 'next/image'

// NEEDS FROM YOU: photos of the area/distillery — drop 3–5 landscape shots
// at public/images/area/*.jpg and list them below. Placeholders point at
// files that don't exist yet, so this section will show broken images
// until real photos are added.
const areaImages = [
  '/images/area/area-1.jpg',
  '/images/area/area-2.jpg',
  '/images/area/area-3.jpg',
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

        <div className="grid sm:grid-cols-3 gap-4">
          {areaImages.map((src) => (
            <div key={src} className="relative aspect-[4/5] rounded-[6px] overflow-hidden bg-cream/5">
              <Image src={src} alt="" fill className="object-cover" sizes="(max-width: 768px) 100vw, 33vw" />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
