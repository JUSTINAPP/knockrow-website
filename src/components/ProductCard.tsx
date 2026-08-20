'use client'

import { useState } from 'react'
import Image from 'next/image'
import type { DisplayProduct } from '@/lib/products'
import QuantitySelect from './QuantitySelect'

// Per client feedback: quantity is a dropdown, and the product photo now
// tracks whichever tier is selected (1 / 2 / 6 bottles) instead of the old
// hover-to-reveal-the-case-shot behaviour. That hover mechanic lived inside
// the same card as this dropdown, so opening the dropdown counted as
// "hovering" and the photo would get stuck on the case shot regardless of
// what was actually selected — that's what looked like a slow/broken
// dropdown. Driving the photo purely off `qty` fixes that.
//
// Only the 6-bottle case is real, priced stock right now — 1 & 2 show "Not
// available at this time" and no Buy button. The Mixed Case has no
// single-bottle tier at all (hasSingleBottleTier: false), so its dropdown
// only offers 2 Bottles / 6 Bottle Case.
type Quantity = '1' | '2' | '6'

const ALL_TIERS: { value: Quantity; label: string }[] = [
  { value: '1', label: '1 Bottle' },
  { value: '2', label: '2 Bottles' },
  { value: '6', label: '6 Bottle Case' },
]

function tierImage(p: DisplayProduct, qty: Quantity): string | null {
  if (qty === '6') return p.caseImage ?? p.image
  if (qty === '2') return p.hasSingleBottleTier ? (p.twoBottleImage ?? null) : p.image
  return p.image // qty === '1', only reachable when hasSingleBottleTier is true
}

export default function ProductCard({ product: p }: { product: DisplayProduct }) {
  const options = p.hasSingleBottleTier ? ALL_TIERS : ALL_TIERS.filter((t) => t.value !== '1')

  const [qty, setQty] = useState<Quantity>('6')
  const [buying, setBuying] = useState(false)
  const [buyError, setBuyError] = useState<string | null>(null)
  const available = qty === '6'
  const image = tierImage(p, qty)

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
    <div>
      <div className="relative aspect-[3/4] bg-sand rounded-[6px] overflow-hidden mb-4">
        {image ? (
          <Image
            key={image}
            src={image}
            alt={p.name}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 400px"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center bg-ink/8">
            <span className="text-[11px] tracking-[0.1em] uppercase text-ink-soft/60 font-sans font-normal">
              Photo coming soon
            </span>
          </div>
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
          options={options}
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
