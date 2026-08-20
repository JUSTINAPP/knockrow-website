import type { Metadata } from 'next'
import Link from 'next/link'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'Checkout Cancelled',
}

export default function CheckoutCancelPage() {
  return (
    <>
      <Nav />
      <main className="max-w-2xl mx-auto px-6 md:px-[60px] py-[80px] md:py-[110px] text-center">
        <p className="text-[10px] tracking-[0.2em] uppercase text-amber-dark font-sans font-normal mb-[10px]">
          Checkout Cancelled
        </p>
        <h1 className="font-display font-light text-[34px] md:text-[44px] text-ink leading-[1.1] mb-4 tracking-[0.01em]">
          No charge was made
        </h1>
        <p className="text-[14px] leading-[1.8] text-ink-soft font-sans font-light mb-9 max-w-xl mx-auto">
          You cancelled before paying, nothing was charged. Head back to the range whenever
          you&apos;re ready.
        </p>
        <Link
          href="/#range"
          className="inline-block bg-ink text-cream px-8 py-[14px] rounded-[3px] text-[11px] tracking-[0.14em] uppercase font-sans font-normal hover:bg-ink/90 transition-colors"
        >
          Back to the range
        </Link>
      </main>
      <Footer />
    </>
  )
}
