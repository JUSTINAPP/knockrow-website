import type { Metadata } from 'next'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import EnquireForm from '@/components/EnquireForm'

export const metadata: Metadata = {
  title: 'Enquire',
}

// Fields match the live knockrow.com enquiry form (Name, Email, Phone,
// Enquiry type, Comment). NEEDS FROM YOU: the form currently only logs to
// the console — it isn't wired to actually send anywhere yet. Volpino sends
// its forms through Resend (see volpino/src/app/actions/contact.ts); once
// you've got a Resend API key (or another provider you prefer) I can wire
// this the same way.
export default function EnquirePage() {
  return (
    <>
      <Nav />
      <main className="max-w-2xl mx-auto px-6 md:px-[60px] py-[56px] md:py-[80px]">
        <p className="text-[10px] tracking-[0.2em] uppercase text-amber-dark font-sans font-normal mb-[10px]">
          Get In Touch
        </p>
        <h1 className="font-display font-light text-[34px] md:text-[44px] text-ink leading-[1.1] mb-4 tracking-[0.01em]">
          Enquire
        </h1>
        <p className="text-[14px] leading-[1.8] text-ink-soft font-sans font-light mb-9 max-w-xl">
          If you&apos;d like to know more about Knockrow Distillers or have a product, wholesale
          or general enquiry, send us a note with your details and we&apos;ll get back to you
          shortly.
        </p>
        <EnquireForm />
      </main>
      <Footer />
    </>
  )
}
