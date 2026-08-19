import Link from 'next/link'
import Logo from './Logo'

const footerLinks = [
  { href: '/#range', label: 'Range' },
  { href: '/#story', label: 'Our Story' },
  { href: '/#area', label: 'The Area' },
  { href: '/enquire', label: 'Enquire' },
]

// Styled to match the Volpino footer (dark band, logo + tagline, link grid,
// social pills, address/contact line) per your request. Swap the copy below
// once Matt confirms the real contact details — none were listed on the
// current knockrow.com beyond the enquiry form.
export default function Footer() {
  return (
    <footer className="bg-ink text-cream">
      <div className="max-w-7xl mx-auto px-6 md:px-[60px] pt-10 pb-7 md:pt-[52px] md:pb-9">
        <Logo className="h-[22px] md:h-[26px] w-auto opacity-90 mb-[6px]" variant="light" />
        <p className="font-display italic font-light text-[15px] text-cream/40 mb-[26px]">
          Small batch spirits, distilled on the coast
        </p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-6">
          {footerLinks.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="text-[12px] text-cream/50 font-sans font-light py-[3px] hover:text-cream/80 transition-colors"
            >
              {l.label}
            </Link>
          ))}
        </div>

        {/* TODO: confirm real social handles — leaving structure in place */}
        <div className="flex gap-[10px] mb-[26px]">
          <a
            href="#"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-cream/6 border border-cream/12 text-cream/55 px-[14px] py-[7px] rounded-[3px] text-[10px] tracking-[0.1em] uppercase font-sans transition-all duration-200 hover:bg-cream hover:text-ink hover:border-cream"
          >
            Instagram
          </a>
        </div>

        <div className="pt-[18px] border-t border-cream/7">
          <p className="text-[11px] text-cream/25 font-sans font-light leading-[1.7]">
            {/* TODO: replace with Knockrow's real address / phone / email — not published on current site */}
            Knockrow Distillers ·{' '}
            <Link href="/enquire" className="hover:text-cream/45 transition-colors">
              Enquire
            </Link>
            <br />© {new Date().getFullYear()} Knockrow Distillers. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
