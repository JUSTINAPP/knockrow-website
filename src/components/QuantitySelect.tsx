'use client'

import { useEffect, useRef, useState } from 'react'

type Option<T extends string> = { value: T; label: string }

// A fully custom dropdown, not a native <select>. Native selects can't have
// their open popup restyled by CSS at all — that's what was showing up as a
// mismatched "mini popup" in different colours (browser/OS default styling
// bleeding through). Building the open state out of plain HTML means it
// looks identical, closed or open, on every browser.
export default function QuantitySelect<T extends string>({
  value,
  onChange,
  options,
}: {
  value: T
  onChange: (value: T) => void
  options: readonly Option<T>[]
}) {
  const [open, setOpen] = useState(false)
  const rootRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!open) return
    function handlePointerDown(e: MouseEvent) {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) setOpen(false)
    }
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') setOpen(false)
    }
    document.addEventListener('mousedown', handlePointerDown)
    document.addEventListener('keydown', handleKeyDown)
    return () => {
      document.removeEventListener('mousedown', handlePointerDown)
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [open])

  const selected = options.find((o) => o.value === value) ?? options[0]

  return (
    <div ref={rootRef} className="relative">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-haspopup="listbox"
        aria-expanded={open}
        className="w-full flex items-center justify-between gap-3 bg-white border border-ink/12 rounded-[3px] pl-3 pr-3 py-[9px] text-[12px] text-ink font-sans font-light focus:outline-none focus:border-amber-dark transition-colors"
      >
        <span>{selected.label}</span>
        <svg
          width="10"
          height="6"
          viewBox="0 0 10 6"
          fill="none"
          aria-hidden="true"
          className={`shrink-0 text-ink-soft transition-transform duration-150 ${open ? 'rotate-180' : ''}`}
        >
          <path d="M1 1l4 4 4-4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      {open && (
        <ul
          role="listbox"
          className="absolute left-0 right-0 top-full mt-[6px] bg-white border border-ink/12 rounded-[3px] shadow-[0_8px_20px_rgba(28,26,23,0.12)] overflow-hidden z-20"
        >
          {options.map((o) => (
            <li key={o.value} role="option" aria-selected={o.value === value}>
              <button
                type="button"
                onClick={() => {
                  onChange(o.value)
                  setOpen(false)
                }}
                className={`w-full text-left px-3 py-[9px] text-[12px] font-sans font-light transition-colors ${
                  o.value === value ? 'bg-sand/70 text-ink' : 'text-ink hover:bg-sand/40'
                }`}
              >
                {o.label}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
