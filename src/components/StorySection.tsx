import EnquireForm from './EnquireForm'

// Draft copy — a starting point built from what's actually true about Knockrow
// (the real NSW locality, not a marketing invention): it's a speck on the
// Pacific Highway between Ballina and Byron Bay, pop. ~190, better known for
// the macadamia tourist stop up the road than for anything else. Deliberately
// avoids the usual "nestled in the rolling hinterland" provenance script.
// Matt should treat this as a rough draft to sand down or replace outright.
//
// Enquiry form lives alongside the story now so someone reading about the
// place can ask a question without leaving the page — same EnquireForm
// component used on /enquire, just dropped in here too.
export default function StorySection() {
  return (
    <section id="story" className="bg-white py-[56px] md:py-[80px]">
      <div className="max-w-7xl mx-auto px-6 md:px-[60px]">
        <div className="grid lg:grid-cols-[1.3fr_1fr] gap-12 lg:gap-16 items-start">
          <div>
            <p className="text-[10px] tracking-[0.2em] uppercase text-amber-dark font-sans font-normal mb-[10px]">
              Our Story
            </p>
            <h2 className="font-display font-light text-[34px] md:text-[44px] text-ink leading-[1.1] mb-5 tracking-[0.01em]">
              Population: about 190
            </h2>
            <div className="text-[14px] leading-[1.8] text-ink-soft font-sans font-light max-w-2xl space-y-5">
              <p>
                Knockrow isn&apos;t a place most people have heard of, and if they have, it&apos;s
                probably because of the macadamia tourist stop up the road, not us. It&apos;s a
                bend in the highway between Ballina and Byron Bay, home to a couple of hundred
                people, a lot of macadamia trees, and, as of recently, a shed that makes vodka.
              </p>
              <p>
                We could talk about ancient soil and coastal microclimates and the particular
                quality of light through a macadamia canopy down at Duck Creek. All of it&apos;s
                true. None of it&apos;s really the point. The point is that good macadamias grow
                here, and someone eventually worked out what to do with the ones that don&apos;t
                make the cut for eating.
              </p>
              <p>
                So this isn&apos;t a heritage brand with a founding myth. It&apos;s a small batch
                of very clean vodka, one version of it steeped in local macadamias, made without
                much ceremony by people who live five minutes from where the nuts are grown.
                Drink it however you like. We&apos;re not precious about that either.
              </p>
            </div>
          </div>

          <div className="bg-sand/40 rounded-[6px] p-7 md:p-9">
            <p className="text-[10px] tracking-[0.2em] uppercase text-amber-dark font-sans font-normal mb-[10px]">
              Get In Touch
            </p>
            <h3 className="font-display font-light text-[24px] text-ink leading-[1.15] mb-3 tracking-[0.01em]">
              Enquire
            </h3>
            <p className="text-[13px] leading-[1.7] text-ink-soft font-sans font-light mb-6">
              Product, wholesale or just curious. Send a note and we&apos;ll get back to you.
            </p>
            <EnquireForm />
          </div>
        </div>
      </div>
    </section>
  )
}
