# Knockrow Distillers website — build brief

Scaffolded by Claude (Cowork) on 2026-08-17, using the Volpino Next.js build
(`~/Desktop/volpino`) as the base for stack, conventions and design language, per Jonas's brief.
`npm install` and `npx tsc --noEmit` / `npx eslint .` all pass clean as of this commit. A full
`npm run build` could not be verified in the cloud sandbox this was built in (Google Fonts is
network-blocked there) — run it locally once, it should just work.

## What's built
- Next.js App Router + TypeScript + Tailwind v4, same versions as Volpino (Next 16.2.3, React
  19.2.4) so the two projects stay compatible.
- Homepage (`src/app/page.tsx`): full-bleed video hero with a floating logo that fades out on
  scroll (the slim nav bar fades in to replace it), Range section (real product data pulled from
  the live knockrow.com), Story section (placeholder copy), Area section (placeholder images),
  Footer.
- Age-gate (`src/components/AgeGate.tsx`) — matches the "confirm legal drinking age" gate on the
  current knockrow.com. Kept because it's a legal requirement for an AU alcohol brand, not a
  style choice.
- `/pages/enquire` — rebuilt with the same fields as the current site's enquiry form (Name,
  Email, Phone, Enquiry type, Comment). Not wired to actually send anywhere yet.
- Footer, mobile hamburger nav, button/label styling — matches Volpino's design system per your
  request ("footer style that matches that build").

## What I pulled from the live knockrow.com (2026-08-17)
- Products: **Vodka** ($390, 6×700ml, currently sold out), **Maca Da Mia** ($540, 6×700ml,
  sold out), **Knockrow Mixed Case** ($465, 3+3 mixed, sold out). All three showed as sold out
  on the live site at time of writing — worth checking with Matt whether that's intentional.
  Copy for each is in `src/data/products.ts`.
- Enquiry form fields (Name, Email, Phone, Enquiry type, Comment) and intro copy.
- Age-gate copy/behaviour.
- No About/story copy, no visible contact email/phone/address/social links, and no logo/hero
  video file were pulled — see below.

## What I did NOT do without checking with you first
- Did not download the actual hero video, logo file, or product photography off the live
  knockrow.com — downloading files needs your go-ahead first. Say the word and I'll pull them
  as a starting point, though ideally Matt has higher-res originals than whatever's compressed
  for web delivery on the current site.
- Did not touch your GitHub repo (JUSTINAPP/knockrow-website) — these files are sitting in the
  `knockrow-website` folder on your Desktop, not pushed anywhere yet.

## Done since the initial scaffold
- **Hero video** — your "knockrow distillers transitions 1.mov" is in. It was re-encoded from
  .mov to a standard web `.mp4` (H.264, audio stripped since the hero video is muted anyway) at
  `public/videos/hero.mp4` — most browsers won't reliably play QuickTime .mov files, so this
  conversion was needed, not optional polish. `public/images/hero-poster.jpg` is a frame pulled
  from the same clip, used while the video loads.
- **Real logo** — `Logo.tsx` now renders your actual wordmark instead of placeholder text. Your
  source files (`knockrow-logo.png`, `knockrow_logo_transparent_highres.png`) were opaque/black
  only, so I cut proper white-on-transparent and black-on-transparent versions
  (`public/images/knockrow-logo-{white,black}.png` for the wordmark used in the nav/footer/hero,
  `public/images/knockrow-icon-{white,black}.png` for the icon+wordmark lockup used as the
  favicon). The hero now shows the white wordmark floating over the video, per your note.
- Product photography (previous update) and the two items above are done — remaining gaps below.

## Still needed from you / Matt before this looks real
1. **Brand colours & fonts** — I seeded a placeholder palette loosely off the two product labels
   (warm amber, the Maca Da Mia coral/yellow, the Vodka blue) in `src/app/globals.css`. Swap
   these for the real brand palette whenever you have one — everything references the theme
   tokens, not hardcoded hex, so it's a one-file change.
2. **Area / location photography** — 3–5 shots for the "The Area" section
   (`public/images/area/`), currently pointing at files that don't exist.
3. **Story copy** — the current site has no About/story text at all. A couple of paragraphs on
   who Knockrow is and what makes the spirits worth talking about.
4. **Contact details** — no email, phone, address or social links are published on the current
   site. Needed for the footer and enquiry page.
5. **Enquiry form delivery** — the form currently just shows a placeholder message on submit.
   Volpino sends its forms through Resend (`volpino/src/app/actions/contact.ts` is the pattern
   to copy); wiring this up needs a Resend API key (or whichever provider you'd rather use).
6. **Domain** — confirm knockrow.com is what points at the new Vercel deployment once it's ready
   to go live, and when Matt wants that cutover to happen.

## Next steps to get this live
1. `cd ~/Desktop/knockrow-website && npm install && npm run dev` to preview locally.
2. Drop in real assets/content from the list above as they come in — everything's already wired
   up to slot them in without touching component code.
3. `git init`, commit, and push to `github.com/JUSTINAPP/knockrow-website`.
4. Import the repo into Vercel, connect the domain once Matt's happy with a preview.

## Ecommerce (added this update, per client feedback)
Client feedback: Maca Da Mia now shows first (Vodka second — done in `src/data/products.ts`),
each product card has a quantity dropdown (1 Bottle / 2 Bottles / 6 Bottle Case — done in
`src/components/ProductCard.tsx`), and the plan going forward is a **fully custom** ecommerce
build: Sanity for the product catalogue, Stripe for checkout. Deliberately not Shopify headless,
even though Matt already has a working Shopify store — that was the other option, weighed and
turned down.

**What's built, structurally, but not yet switched on:**
- **Sanity** — schema for a `product` document type at `sanity/schemaTypes/product.ts` (name,
  slug, tagline, description, price, priceCents, size, hasSingleBottleTier, image,
  twoBottleImage, caseImage, soldOut, order). Studio lives at `/studio` once connected.
  `src/lib/sanity.ts` fetches products from Sanity *if* `NEXT_PUBLIC_SANITY_PROJECT_ID` is set,
  otherwise returns `null` and the site falls back to the static catalogue in
  `src/data/products.ts` — nothing breaks either way.
- **Stripe** — `src/app/api/checkout/route.ts` creates a Checkout Session for a product's
  6-bottle case (the only tier that's real right now) using inline pricing, no Stripe Dashboard
  setup required beyond the account + API key. `src/components/ProductCard.tsx` has a working
  "Buy Now" button that calls it. Success/cancel land on `/checkout/success` and
  `/checkout/cancel`. Until `STRIPE_SECRET_KEY` is set, clicking Buy Now shows "Stripe is not
  configured yet" instead of erroring.
- **Per-tier product photos** — the quantity dropdown now drives which photo shows: the "1
  Bottle" image, a "2 Bottles" image (grey "Photo coming soon" box until one exists, since
  neither Vodka nor Maca Da Mia has one yet), or the "6 Bottle Case" image. The Mixed Case has no
  single-bottle tier (`hasSingleBottleTier: false` on that product), so its dropdown only offers
  2 Bottles (using its existing default photo, which already shows one of each bottle) and 6
  Bottle Case. 1 & 2 bottle quantities are still hardcoded as unavailable/unbuyable in
  `ProductCard.tsx` — that's presentation only, not driven by real stock or pricing yet. Worth
  revisiting once single/double bottles actually have prices.
- Removed the old hover-to-reveal-the-case-photo behaviour entirely — it lived in the same card
  as the quantity dropdown, so opening the dropdown counted as "hovering" and the photo would get
  stuck on the case shot regardless of the selected quantity. That's what looked like a slow or
  broken dropdown; it wasn't actually a state bug, the two mechanisms were just fighting each
  other over the same image.

**What you (Jonas/Matt) need to do — I can't do these for you:**
1. **Sanity**: run `npx sanity init` in this folder. It'll prompt a login and let you create a
   new project — keep it separate from your other client's Sanity account/org. Add the products
   in the Studio (`/studio` once deployed, or `npm run dev` then visit `/studio` locally) using
   the same three products as a starting point. Then set `NEXT_PUBLIC_SANITY_PROJECT_ID` (and
   `NEXT_PUBLIC_SANITY_DATASET` if not `production`) in `.env.local` and in Vercel's project
   settings. See `.env.local.example`.
2. **Stripe**: create the account (you mentioned suggesting this to Matt already). Grab a
   *test-mode* secret key from the Stripe dashboard (`sk_test_...`) first — test the whole buy
   flow with Stripe's test card numbers before ever touching a live key. Set `STRIPE_SECRET_KEY`
   in `.env.local` and Vercel. Swap to a live key (`sk_live_...`) only once you're ready to take
   real payments.
3. Once both are set in Vercel's environment variables, redeploy — no code changes needed, the
   fallback behaviour switches over automatically.
