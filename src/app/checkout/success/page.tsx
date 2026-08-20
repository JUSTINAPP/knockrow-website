import type { Metadata } from 'next'
import Link from 'next/link'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'Order Confirmed',
}

export default function CheckoutSuccessPage() {
  return (
    <>
      <Nav />
      <main className="max-w-2xl mx-auto px-6 md:px-[60px] py-[80px] md:py-[110px] text-center">
        <p className="text-[10px] tracking-[0.2em] uppercase text-amber-dark font-sans font-normal mb-[10px]">
          Order Confirmed
        </p>
        <h1 className="font-display font-light text-[34px] md:text-[44px] text-ink leading-[1.1] mb-4 tracking-[0.01em]">
          Thanks for the order
        </h1>
        <p className="text-[14px] leading-[1.8] text-ink-soft font-sans font-light mb-9 max-w-xl mx-auto">
          Your payment went through. A receipt is on its way from Stripe, and we&apos;ll be in
          touch with shipping details shortly.
        </p>
        <Link
          href="/"
          className="inline-block bg-ink text-cream px-8 py-[14px] rounded-[3px] text-[11px] tracking-[0.14em] uppercase font-sans font-normal hover:bg-ink/90 transition-colors"
        >
          Back to Knockrow
        </Link>
      </main>
      <Footer />
    </>
  )
}
