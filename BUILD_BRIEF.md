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

## Still needed from you / Matt before this looks real
1. **Hero video** — drop the file at `public/videos/hero.mp4`, plus a still frame at
   `public/images/hero-poster.jpg` for the loading fallback.
2. **Real logo** — ideally an SVG (like Volpino's `src/components/Logo.tsx`). Right now
   `Logo.tsx` renders a plain text placeholder wordmark.
3. **Brand colours & fonts** — I seeded a placeholder palette loosely off the two product labels
   (warm amber, the Maca Da Mia coral/yellow, the Vodka blue) in `src/app/globals.css`. Swap
   these for the real brand palette whenever you have one — everything references the theme
   tokens, not hardcoded hex, so it's a one-file change.
4. **Product photography** — I used the macadamia bottle photo and the relit vodka shot from
   earlier in our conversation as placeholders (`public/images/products/`). No image exists yet
   for the Mixed Case product.
5. **Area / location photography** — 3–5 shots for the "The Area" section
   (`public/images/area/`), currently pointing at files that don't exist.
6. **Story copy** — the current site has no About/story text at all. A couple of paragraphs on
   who Knockrow is and what makes the spirits worth talking about.
7. **Contact details** — no email, phone, address or social links are published on the current
   site. Needed for the footer and enquiry page.
8. **Enquiry form delivery** — the form currently just shows a placeholder message on submit.
   Volpino sends its forms through Resend (`volpino/src/app/actions/contact.ts` is the pattern
   to copy); wiring this up needs a Resend API key (or whichever provider you'd rather use).
9. **Domain** — confirm knockrow.com is what points at the new Vercel deployment once it's ready
   to go live, and when Matt wants that cutover to happen.

## Next steps to get this live
1. `cd ~/Desktop/knockrow-website && npm install && npm run dev` to preview locally.
2. Drop in real assets/content from the list above as they come in — everything's already wired
   up to slot them in without touching component code.
3. `git init`, commit, and push to `github.com/JUSTINAPP/knockrow-website`.
4. Import the repo into Vercel, connect the domain once Matt's happy with a preview.
