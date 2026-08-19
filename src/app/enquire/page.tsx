import type { Metadata } from 'next'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import PageHero from '@/components/PageHero'
import InfoCard from '@/components/InfoCard'
import EnquireForm from '@/components/EnquireForm'

export const metadata: Metadata = {
  title: 'Enquire',
}

// Visual structure for the enquire page — was previously just a bare heading
// + form on white. Now follows the same PageHero + two-column pattern as
// Volpino's /contact page (src/app/contact/page.tsx over there), retokened
// to Knockrow. Left column deliberately doesn't invent an address/phone/
// hours the way Volpino's does — none of that is published anywhere yet
// (see BUILD_BRIEF.md #4), so it sticks to what's actually true: the three
// enquiry categories and a link out to Instagram. Swap in real contact
// details there whenever Matt has them.
export default function EnquirePage() {
  return (
    <>
      <Nav />
      <main>
        <PageHero
          eyebrow="Get In Touch"
          title="Enquire"
          subtitle="We read every message ourselves"
          image="/images/area/duck-creek-macadamias.jpg"
        />

        <section className="bg-white py-[56px] md:py-[80px]">
          <div className="max-w-7xl mx-auto px-6 md:px-[60px]">
            <div className="md:grid md:grid-cols-2 md:gap-16">
              {/* Left: info */}
              <div>
                <p className="text-[10px] tracking-[0.2em] uppercase text-amber-dark font-sans font-normal mb-[10px]">
                  Before You Write
                </p>
                <h2 className="font-display font-light text-[34px] md:text-[42px] text-ink leading-[1.05] mb-6 tracking-[0.01em]">
                  Product, wholesale, or just curious
                </h2>
                <p className="text-[14px] leading-[1.8] text-ink-soft font-sans font-light mb-8 max-w-md">
                  Knockrow&apos;s a small operation, run by people who also make the vodka, so
                  give us a few days to get back to you. Pick whichever of these is closest to
                  what you&apos;re after when you fill in the form.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
                  <InfoCard
                    label="Product Enquiries"
                    value="Questions about the range, ingredients, or where to find a bottle."
                  />
                  <InfoCard
                    label="Wholesale & Stockists"
                    value="Bars, bottle shops and restaurants wanting to stock Knockrow."
                  />
                  <InfoCard
                    label="General"
                    value="Anything else, including press and collaborations."
                  />
                  <InfoCard
                    label="Follow Along"
                    value={
                      // TODO: swap in the real Instagram handle once Matt confirms it
                      <a href="#" target="_blank" rel="noopener noreferrer" className="hover:text-amber-dark transition-colors">
                        Find Knockrow on Instagram
                      </a>
                    }
                  />
                </div>
              </div>

              {/* Right: form */}
              <div className="mt-12 md:mt-0">
                <p className="text-[10px] tracking-[0.2em] uppercase text-amber-dark font-sans font-normal mb-[10px]">
                  Send A Message
                </p>
                <h2 className="font-display font-light text-[34px] md:text-[42px] text-ink leading-[1.05] mb-2 tracking-[0.01em]">
                  Get in touch
                </h2>
                <p className="font-display italic font-light text-[18px] text-ink-soft mb-8">
                  Send us a note and we&apos;ll reply as soon as we can
                </p>
                <EnquireForm />
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
