'use client'

import { useState } from 'react'
import Image from 'next/image'
import type { DisplayProduct } from '@/lib/products'
import QuantitySelect from './QuantitySelect'

// Per client feedback: quantity should be a dropdown (1 bottle / 2 bottles /
// 6 bottle case), and single/double bottles aren't sellable yet — only the
// case is real, priced stock. Selecting 1 or 2 swaps the price row for a
// "Not available at this time" message. The 6-bottle case now has a real
// "Buy" button that creates a Stripe Checkout session via /api/checkout —
// see src/lib/stripe.ts for what's needed to make that actually charge a
// card (it 501s with a clear message until STRIPE_SECRET_KEY is set).
const quantityOptions = [
  { value: '1', label: '1 Bottle' },
  { value: '2', label: '2 Bottles' },
  { value: '6', label: '6 Bottle Case' },
] as const

type Quantity = (typeof quantityOptions)[number]['value']

export default function ProductCard({ product: p }: { product: DisplayProduct }) {
  const [qty, setQty] = useState<Quantity>('6')
  const [buying, setBuying] = useState(false)
  const [buyError, setBuyError] = useState<string | null>(null)
  const available = qty === '6'

  async function handleBuy() {
    setBuying(true)
    setBuyError(null)
    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ slug: p.slug }),
      })
      const data = await res.json()
      if (!res.ok || !data.url) {
        setBuyError(data.error || 'Could not start checkout.')
        setBuying(false)
        return
      }
      window.location.href = data.url
    } catch {
      setBuyError('Could not reach checkout. Try again shortly.')
      setBuying(false)
    }
  }

  return (
    <div className="group" tabIndex={p.caseImage ? 0 : undefined}>
      <div className="relative aspect-[3/4] bg-sand rounded-[6px] overflow-hidden mb-4">
        <Image
          src={p.image}
          alt={p.name}
          fill
          className={`object-cover transition-opacity duration-300 ${
            p.caseImage ? 'group-hover:opacity-0 group-focus-within:opacity-0' : ''
          }`}
          sizes="(max-width: 768px) 100vw, 400px"
        />
        {p.caseImage && (
          <Image
            src={p.caseImage}
            alt={`${p.name}, full case of 6`}
            fill
            className="object-cover opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-within:opacity-100"
            sizes="(max-width: 768px) 100vw, 400px"
          />
        )}
        {p.soldOut && (
          <span className="absolute top-3 right-3 bg-ink/85 text-cream text-[9px] tracking-[0.12em] uppercase font-sans px-[10px] py-[5px] rounded-[3px]">
            Sold Out
          </span>
        )}
      </div>
      <h3 className="font-display font-normal text-[22px] text-ink mb-1">{p.name}</h3>
      <p className="text-[13px] text-ink-soft font-sans font-light leading-[1.6] mb-3">
        {p.tagline}
      </p>

      <div className="mb-3">
        <QuantitySelect
          value={qty}
          onChange={(v) => {
            setQty(v)
            setBuyError(null)
          }}
          options={quantityOptions}
        />
      </div>

      {available ? (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-[12px] text-ink-soft font-sans font-light">{p.size}</span>
            <span className="text-[14px] text-ink font-sans font-normal">{p.price}</span>
          </div>
          <button
            type="button"
            onClick={handleBuy}
            disabled={buying}
            className="w-full bg-ink text-cream py-[12px] rounded-[3px] text-[11px] tracking-[0.14em] uppercase font-sans font-normal hover:bg-ink/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {buying ? 'Redirecting…' : 'Buy Now'}
          </button>
          {buyError && (
            <p className="text-[11px] text-ink-soft/70 font-sans font-light italic">{buyError}</p>
          )}
        </div>
      ) : (
        <p className="text-[12px] text-ink-soft/70 font-sans font-light italic">
          Not available at this time
        </p>
      )}
    </div>
  )
}
