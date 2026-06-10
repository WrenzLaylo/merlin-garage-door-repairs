# Merlin Garage Door Repairs — project guide

Marketing site for a Melbourne Merlin garage-door-opener repair business (a brand of AGG Doors).
Stack: **Vite + React 18 + TypeScript + Tailwind**. Single long-form landing page composed from
section components in `src/components/sections`, with `src/components/layout` (Navbar/Footer) and
`src/components/ui` (ScrollReveal, MobileCTA, etc.). Content/config lives in `src/constants.ts` and
`public/network-config.json`.

## Commands
- `npm run dev` — local dev server
- `npm run typecheck` — `tsc --noEmit` (must stay clean)
- `npm run build` — production build + zips `dist/` into `releases/`
- `npm run gen:icons` — regenerate favicons + social cards (sharp, no key)
- `npm run gen:images` — regenerate photographic assets via OpenAI (fallback; needs key)

## Brand system (light theme — matches merlinrepairs.com)
Tokens are defined in `tailwind.config.ts`; do not hard-code hex in components — use the tokens.
- Surfaces: `canvas #F9FAFB` (page), `surface #FFFFFF` (cards/header). Footer is light too.
- Text: `ink #111` (headings/strong), `muted #444` (body). Borders: `line #D1D5DB`.
- **Primary = brand green** `#66C42B` (`brand` / `brand-dark` / `brand-deep` for small text on white / `brand-tint`).
- **Accent = orange** `#E64833` (`accent` / `accent-dark` / `accent-tint`) — reserved for emergency / 24·7 CTAs.
- Review stars: `gold #FFB400`. Fonts: Montserrat (display) + Inter (body).
- Buttons: `.btn-primary` (green), `.btn-accent` (orange emergency), `.btn-secondary` (outline) — in `globals.css`.
- Accessibility: small green/orange text must use `brand-deep` / `accent-dark` (the bright shades fail AA on white).

## Image workflow (Claude Code builds, Hermes generates)
**Division of labor:** Claude Code owns code/layout/styling/SEO/build. Hermes (`image_gen`) owns
photographic asset generation. Favicons/social cards are NOT AI — they rasterize from vector art.

1. **Claude Code:** never hotlink external image URLs in final code. Every photographic image the site
   needs is declared in **`public/assets/image-requests.json`** with: `filename`, `path` (the exact file
   the site already loads, e.g. `public/hero-bg.webp`), `purpose`, `aspect_ratio`, `width`, `height`,
   `format`, `where_used`, `alt_text`, and a `prompt`. Until real assets exist, use CSS gradients/placeholders.
   Keep prompts realistic, clean, high-trust, non-cheesy — no text, no logos, no fake brand marks.
2. **Hermes:** *"Read `public/assets/image-requests.json`, generate every image to its exact `path`,
   then stop."* It overwrites the files the site already references, so no code changes are needed.
3. **Claude Code:** polish layout/responsive sizing/alt text around the real images, then `npm run build`.

Rules: only reference image files that actually exist — never claim an image was generated when it wasn't.
The OpenAI script (`npm run gen:images`) is a keyed fallback that reads the **same manifest**, so the two
generators never drift.

### Icons & social cards
`npm run gen:icons` (`scripts/gen-favicons.mjs`) rasterizes `public/favicon-source.png` (falling back to
`public/favicon-mark.svg`) into the favicon set, PWA icons, `site-logo.png`, and the `og-image`/`twitter-card`.
Re-run it whenever the logo/mark changes.

## Verify before done
`npm run typecheck` clean · `npm run build` succeeds · visually walk every section for contrast
(no invisible text on white) · confirm green primary / orange emergency / gold stars / Montserrat headings.
