'use client'

import { useEffect, useSyncExternalStore } from 'react'
import Logo from './Logo'

const STORAGE_KEY = 'kr_age_verified'

function subscribe(callback: () => void) {
  window.addEventListener('storage', callback)
  return () => window.removeEventListener('storage', callback)
}

function getSnapshot() {
  return window.localStorage.getItem(STORAGE_KEY) === 'true'
}

// Always render "not verified" on the server / first paint — the real value
// (from localStorage) is only knowable in the browser. useSyncExternalStore
// re-renders once the real snapshot is read after hydration, so returning
// visitors see the gate flash briefly rather than not at all.
function getServerSnapshot() {
  return false
}

// Mirrors the age-gate on the current knockrow.com (Shopify) site:
// "Please confirm you are of legal drinking age in your location to enter
// Knockrow Distillery." Required for a distillery site selling alcohol in
// Australia — keep this even though the rest of the current site is being
// rebuilt from scratch.
export default function AgeGate() {
  const verified = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)

  useEffect(() => {
    document.body.classList.toggle('no-scroll', !verified)
    return () => document.body.classList.remove('no-scroll')
  }, [verified])

  if (verified) return null

  return (
    <div className="fixed inset-0 z-[100] bg-ink flex items-center justify-center px-6">
      <div className="max-w-sm w-full text-center">
        <Logo className="h-8 w-auto mx-auto mb-8" variant="light" />
        <p className="text-[11px] tracking-[0.18em] uppercase text-cream/50 font-sans font-light mb-3">
          Please Confirm
        </p>
        <h1 className="font-display italic font-light text-[26px] text-cream leading-[1.3] mb-9">
          Are you of legal drinking age in your location?
        </h1>
        <div className="flex flex-col gap-3">
          <button
            onClick={() => {
              window.localStorage.setItem(STORAGE_KEY, 'true')
              // storage events only fire in *other* tabs — dispatch one
              // manually so this tab's useSyncExternalStore picks it up too.
              window.dispatchEvent(new StorageEvent('storage'))
            }}
            className="bg-amber text-ink py-[14px] rounded-[3px] text-[11px] tracking-[0.14em] uppercase font-sans font-normal hover:bg-amber-dark transition-colors"
          >
            Yes, enter site
          </button>
          <a
            href="https://www.responsibledrinking.org"
            className="border border-cream/25 text-cream/70 py-[13px] rounded-[3px] text-[11px] tracking-[0.14em] uppercase font-sans font-normal hover:bg-cream/5 transition-colors"
          >
            No, take me away
          </a>
        </div>
      </div>
    </div>
  )
}
