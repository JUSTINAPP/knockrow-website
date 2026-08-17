'use client'

import { useState } from 'react'

const inputClasses =
  'w-full bg-white border border-ink/12 rounded-[3px] px-4 py-[12px] text-[14px] text-ink font-sans font-light focus:outline-none focus:border-amber-dark transition-colors'

export default function EnquireForm() {
  const [status, setStatus] = useState<'idle' | 'submitted'>('idle')

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        // TODO: wire to a real send-email action once there's an email
        // provider (see Volpino's Resend-based contact action for the pattern).
        setStatus('submitted')
      }}
      className="space-y-4"
    >
      <input required name="name" placeholder="Name" className={inputClasses} />
      <input required type="email" name="email" placeholder="Email" className={inputClasses} />
      <input name="phone" placeholder="Phone number" className={inputClasses} />
      <select name="enquiryType" defaultValue="" required className={inputClasses}>
        <option value="" disabled>
          Enquiry type
        </option>
        <option value="product">Product enquiry</option>
        <option value="wholesale">Wholesale enquiry</option>
        <option value="general">General enquiry</option>
      </select>
      <textarea required name="comment" placeholder="Comment" rows={5} className={inputClasses} />

      <button
        type="submit"
        className="w-full bg-ink text-cream py-[14px] rounded-[3px] text-[11px] tracking-[0.14em] uppercase font-sans font-normal hover:bg-ink/90 transition-colors"
      >
        Send
      </button>

      {status === 'submitted' && (
        <p className="text-[13px] text-amber-dark font-sans font-light pt-2">
          Form isn&apos;t wired to send anywhere yet — this is a placeholder until email delivery
          is set up.
        </p>
      )}
    </form>
  )
}
