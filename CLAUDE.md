# Knockrow Distillers — build notes for Claude Code

This project was scaffolded by Claude (Cowork) as a starting point, following the same
conventions as the Volpino build (`~/Desktop/volpino`) so the two codebases stay easy to work
across. Read `BUILD_BRIEF.md` for the full context and outstanding-items checklist before
making changes.

## Stack
Next.js 16 (App Router) + TypeScript + Tailwind v4 + React 19. No CMS — content lives directly
in code (`src/data/products.ts`, the section components) since this is a small, rarely-changing
site. Deployed via Vercel, same as Volpino.

## Conventions carried over from Volpino
- Tailwind theme tokens defined via `@theme inline` in `src/app/globals.css` (`--color-*`,
  `--font-*`), referenced as Tailwind classes (`bg-ink`, `text-amber`, `font-display`, etc.) —
  not raw hex/arbitrary values.
- Two Google Fonts loaded via `next/font/google` in `src/app/layout.tsx`: a serif italic display
  face and a light, uppercase-tracked sans for labels/body. Currently Cormorant + Jost
  (Volpino's pairing) as a placeholder — swap if Knockrow gets real brand fonts.
- Buttons/pills: `rounded-[3px]`, uppercase, `tracking-[0.12em]` to `tracking-[0.2em]`, small
  (10–11px) label text — matches Volpino's button/label system.
- Footer: dark band, logo + tagline, link grid, social pills, address/copyright line at the
  bottom, border-top divider.
- Mobile nav: hamburger button that toggles a full-screen dark drawer (`src/components/Nav.tsx`)
  — same interaction as Volpino, no separate bottom tab bar (was asked about, decided against
  for this brand — revisit if wanted).

## What's different from Volpino (new pattern, built fresh)
The homepage hero is new: a full-bleed video (`src/components/Hero.tsx`) with the logo floating
centered on top, which fades out as you scroll (`src/lib/useHeroFade.ts`). The slim utility nav
bar fades **in** at the same rate so there's exactly one logo on screen at any scroll position,
never both or neither. Volpino's hero is a static image slideshow with an always-solid nav bar —
don't copy that pattern back here, this one is intentionally different per the brief.

## Auto-deploy
Volpino's AGENTS.md has the local Claude Code auto-commit and push after every change. Whether
you want that same behaviour here is your call — it isn't set up in this repo yet, add an
AGENTS.md if you want it.

## Before you build further
Check `BUILD_BRIEF.md` — several sections are structurally wired up but waiting on real content
(hero video, logo file, area photography, story copy, contact details, third product image).
Grep the codebase for `TODO` and `NEEDS FROM YOU` to find every placeholder.
