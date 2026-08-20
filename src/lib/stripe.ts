import Stripe from 'stripe'

// NEEDS FROM YOU: STRIPE_SECRET_KEY isn't set yet — see .env.local.example.
// Until it is, isStripeConfigured is false and /api/checkout returns a clear
// "not configured" error instead of crashing, so the rest of the site (and
// the build) keeps working with no key present. Use a *test mode* secret key
// (starts with sk_test_) to try the checkout flow end to end before ever
// switching to a live key.
export const isStripeConfigured = Boolean(process.env.STRIPE_SECRET_KEY)

let _stripe: Stripe | null = null

export function getStripe(): Stripe {
  if (!process.env.STRIPE_SECRET_KEY) {
    throw new Error('STRIPE_SECRET_KEY is not set — see .env.local.example')
  }
  if (!_stripe) {
    _stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
      apiVersion: '2025-08-27.basil',
    })
  }
  return _stripe
}
