import { NextRequest, NextResponse } from 'next/server'
import { getDisplayProducts } from '@/lib/products'
import { getStripe, isStripeConfigured } from '@/lib/stripe'

// Creates a Stripe Checkout session for one product's 6-bottle case (the
// only tier that's actually sellable right now — see ProductCard.tsx for
// the 1/2 bottle "not available" logic). Uses inline price_data rather than
// pre-created Stripe Price IDs, so nothing needs to be set up in the Stripe
// dashboard beyond the account itself and an API key.
//
// NEEDS FROM YOU: this 501s with a clear message until STRIPE_SECRET_KEY is
// set (test key to start — see .env.local.example). Nothing here can charge
// a card without that key existing.
export async function POST(request: NextRequest) {
  if (!isStripeConfigured) {
    return NextResponse.json(
      { error: 'Stripe is not configured yet. Add STRIPE_SECRET_KEY to try checkout.' },
      { status: 501 }
    )
  }

  const body = await request.json().catch(() => null)
  const slug = typeof body?.slug === 'string' ? body.slug : null
  if (!slug) {
    return NextResponse.json({ error: 'Missing product slug.' }, { status: 400 })
  }

  const products = await getDisplayProducts()
  const product = products.find((p) => p.slug === slug)
  if (!product) {
    return NextResponse.json({ error: 'Unknown product.' }, { status: 404 })
  }

  const origin = request.headers.get('origin') || process.env.NEXT_PUBLIC_SITE_URL || ''

  try {
    const session = await getStripe().checkout.sessions.create({
      mode: 'payment',
      line_items: [
        {
          quantity: 1,
          price_data: {
            currency: 'aud',
            unit_amount: product.priceCents,
            product_data: {
              name: `${product.name}, ${product.size}`,
              images: product.image.startsWith('http') ? [product.image] : undefined,
            },
          },
        },
      ],
      success_url: `${origin}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/checkout/cancel`,
    })

    return NextResponse.json({ url: session.url })
  } catch (err) {
    console.error('Stripe checkout session creation failed:', err)
    return NextResponse.json({ error: 'Could not start checkout. Try again shortly.' }, { status: 500 })
  }
}
