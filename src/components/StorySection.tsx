// NEEDS FROM YOU: the current knockrow.com has no About/story copy at all —
// this section is a structural placeholder. Send through 2-3 paragraphs on
// Knockrow's story (who, where, why, how it's made) and I'll drop it straight
// in here.
export default function StorySection() {
  return (
    <section id="story" className="bg-white py-[56px] md:py-[80px]">
      <div className="max-w-7xl mx-auto px-6 md:px-[60px]">
        <p className="text-[10px] tracking-[0.2em] uppercase text-amber-dark font-sans font-normal mb-[10px]">
          Our Story
        </p>
        <h2 className="font-display font-light text-[34px] md:text-[44px] text-ink leading-[1.1] mb-5 tracking-[0.01em]">
          [Placeholder — real story copy needed]
        </h2>
        <p className="text-[14px] leading-[1.8] text-ink-soft font-sans font-light max-w-2xl">
          Placeholder text: a couple of paragraphs on who Knockrow is, where the distillery is
          based, and what makes the spirits worth talking about. Replace this with the real
          story once Matt sends it through — everything else on the page is already wired up
          to sit around it.
        </p>
      </div>
    </section>
  )
}
