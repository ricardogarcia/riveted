# Riveted Website Redesign — GroundAI Design Language

**Date:** 2026-07-01
**Status:** Approved

## Summary

Rebuild the Riveted website's look and feel using the "GroundAI" reference design (full-bleed video hero, floating pill nav, marquee logo strip, three animated feature cards, editorial testimonial layout, word-by-word text reveals) while keeping all Riveted branding, copy, services, and routes. The GroundAI reference spec's layout, spacing, animation timings, easings, and spring parameters are followed exactly; only content, imagery, and framework idioms change.

## Decisions (validated with user)

1. **Intent:** Riveted content, GroundAI style. No GroundAI branding or interior-design copy.
2. **Scope:** Whole site — homepage rebuilt, blog listing/post pages, Navbar, and Footer restyled to match. Blog article content untouched.
3. **Hero media:** License-free stock video (dark, abstract/tech mood, e.g., Pexels/Coverr), downloaded and committed to `public/media/`. Not hotlinked from qclay.design.
4. **Visual style:** Adopt the GroundAI aesthetic fully. Inter Tight headings, Playfair Display italic accents, rounded system sans body. White sections, near-black `#141413` cards, warm taupe accents. Riveted's gold (`#b8942e`) is retired.
5. **Content mapping:** Condense the homepage into the GroundAI structure plus a final contact CTA. Bridge diagram, detailed service tracks, bio block, Intercom mockup section, and WeatherFreight case study are cut (WeatherFreight and Prima Pave survive in the marquee/testimonial).
6. **Card fidelity:** Faithful port of all three feature-card animation mechanics (rotating pill carousel, morphing chat bubble, staggered list) with Riveted content.

## Architecture & Tech

- **Framework:** Next.js 16 App Router (unchanged). TanStack Start specifics from the reference translate to Next idioms: `src/app/page.tsx` (not `src/routes/index.tsx`), `metadata` export (not `head()`), `next/font` (not stylesheet links).
- **Dependencies:** add `lucide-react`. `framer-motion`, `tailwindcss@4`, React 19 already present.
- **Fonts:**
  - Inter Tight (400, 500) via `next/font/google` — headings, wordmark.
  - Playfair Display (400 italic) via `next/font/google` — accent words.
  - Body/buttons: CSS stack `'SF Pro Rounded', ui-rounded, system-ui, sans-serif` (no download).
  - DM Sans, Bebas Neue, Instrument Serif removed. Satoshi not used (no logo art in marquee).
- **Assets — `src/lib/assets.ts`:** exports a single `A` object (per the reference pattern) whose values point to local `/public/media/` files:
  - `A.heroVideo` → `/media/hero.mp4` (stock, license-free, committed)
  - `A.heroPoster` → `/media/hero-poster.jpg` (first-frame poster)
  - `A.cardBackground` → `/media/card-style.jpg` (stock image for Card 1)
  - `A.testimonialImage` → `/media/testimonial.jpg` (stock image for Testimonials Block B)
  - No avatar/logo image files — monograms and lucide icons instead.
- **Global CSS (`globals.css`):** restyle via the existing CSS variables so blog pages inherit the new look with minimal edits:
  - `--background: #ffffff`, `--background-alt: #F1F0EF`, `--foreground: #141413`, `--foreground-light: rgba(20,20,19,0.6)`
  - `--rivet-color: #887C71`, `--rivet-light-color: #9E948B` (accent = warm taupe)
  - Border variables shifted to warm neutrals.
  - Font variables remapped: `--font-sans` → rounded stack, `--font-display` → Inter Tight, `--font-serif` → Playfair Display.
  - Append marquee keyframes: `@keyframes marquee { 0% { transform: translateX(0) } 100% { transform: translateX(-50%) } }` and `.animate-marquee { animation: marquee 35s linear infinite; }`
- **Scroll-animation rule (deviation from reference spec):** the user's global CLAUDE.md forbids `whileInView` + `once: true` in Next.js (blank page on back navigation). Every `whileInView` in the reference is implemented as `useInView(ref, { once: true, margin: ... })` + `animate={isInView ? visible : hidden}`. Identical visuals, back-nav safe. This applies to all components below.
- **Reduced motion:** use framer-motion's `useReducedMotion` where cheap; content must be readable with animations suppressed.

## Homepage (`src/app/page.tsx`)

Composes, in order: `Hero`, `TrustedBy`, `CraftExperiences`, `Testimonials`, `ContactCta` — all under `src/components/home/`. A shared `AnimatedWords` helper (word-by-word reveal: each word a motion.span, delay = base + i×0.045, duration 0.5 easeOut, inline-block mr-[0.25em]) lives in `src/components/home/AnimatedWords.tsx`.

### 1. Hero — full viewport, video background

- Section: `relative min-h-screen w-full text-white flex flex-col justify-between p-6 md:p-12 overflow-hidden`, dark fallback background color behind the video.
- Background: `A.heroVideo` (`autoPlay muted loop playsInline`, `poster={A.heroPoster}`, absolute inset-0 object-cover z-0) + `bg-black/20` overlay.
- **No in-hero header** — the global floating Navbar (see Chrome) provides it, including the reference's entrance animation.
- Center content (max-w-[800px], centered): h1 in Inter Tight, `text-[40px] sm:text-[52px] md:text-[64px]`, three staggered motion.span lines (delays 0.3/0.5/0.7, duration 0.6, y:12→0):
  1. "Meet Riveted."
  2. *"Build what's next"* (Playfair italic) + " with" (Inter Tight)
  3. "AI-first engineering"
- CTA button (delay 1.0): white rounded-2xl pill, rounded-sans, label **"Start your project"**, links to `mailto:hello@rivetedinc.com`.
- Hero footer: left column `AnimatedWords` (baseDelay 1.2), text: "We build AI-powered websites for small businesses and partner with founders to ship production-grade products — engineering rigor and business sense in everything we do."
- Right column (delay 1.4): bordered pill "Websites that win customers"; row with 56×56 bordered square containing lucide `ArrowUpRight` + pill "Consulting & Coaching".

### 2. TrustedBy — white marquee (`src/components/home/TrustedBy.tsx`)

- `section bg-white pt-16 pb-14 px-[40px]`.
- h2 centered, Inter Tight: "Trusted by the " + Playfair italic *"leading brands"*.
- Marquee: overflow-hidden wrapper, white edge gradients (w-16) left/right, inner `flex w-max animate-marquee gap-16` rendering the brand list twice.
- Brands (text-only, Inter Tight bold `text-3xl`, `opacity-40`, no logo files): Google, YouTube Ads, LeaseLock, Bend, WeatherFreight, Prima Pave, MIT, Caltech.

### 3. CraftExperiences — three animated cards (`src/components/home/CraftExperiences.tsx`)

- Container max-w-[1360px], heading centered Inter Tight `text-5xl md:text-6xl`: Playfair italic *"Craft experiences"* + " your" + line break + "customers will remember".
- Three cards in `flex flex-col lg:flex-row gap-6`, each entering with fade-up (y:40→0, delay i×0.35, duration 1.1 easeOut) via useInView.
- All cards `h-[585px] rounded-3xl overflow-hidden flex-1`.

**Card 1 — capability carousel** (bg image `A.cardBackground`, `bg-black/10` overlay):
- Vertical looping pill carousel per reference constants: PILL_ROW_HEIGHT=56, PILL_GAP=18, ACTIVE_HEIGHT=80, ACTIVE_GAP=22; active starts at 2, advances every 2800 ms; diff/y/opacity math and spring (260/28) exactly as the reference; top/bottom `black/30→transparent` h-24 gradients.
- ITEMS (Riveted capabilities): "SEO-optimized design", "24/7 AI lead capture", "Smart forms & follow-ups", "Conversion-focused copy", "Fast AI-powered delivery", "Ongoing growth support", "Analytics that matter".
- Pill: inactive `w-[261px] h-[56px]` glass pill with skeleton bars; active `w-[calc(100%-60px)] h-[80px]` glass pill, left circle contains a lucide `Sparkles` glyph (layoutId per label), label + caption **"RIVETED BUILD"** (`text-[11px] tracking-[0.15em] text-white/70`).

**Card 2 — dark chat card** (`bg-[#141413]`, `flex flex-col pt-10 pb-10 justify-between`):
- Top: static skeleton bubble (per reference geometry) + MorphBubble whose background animates `#FAFAFA14 → #9E948B` after 1100 ms; content cross-fades from skeleton to a filled message: monogram circle "M" + "Me", paragraph *"My website isn't bringing in leads — can Riveted help?"* (rounded sans, `text-[15px]`).
- Bottom row: left — word-by-word "Engage and delight customers" (`text-4xl`, rounded sans, delay 0.5 + i×0.1); right — overlapping step circles "01" (`bg-[#5F5D4D]`, z-30), "2", "3" (`bg-[#252522] text-white/40`, -ml-3).

**Card 3 — adaptable list** (`backgroundColor #9E948B`, `px-[33px] pt-[44px] pb-10`):
- h3 Inter Tight `text-5xl`: "It's completely" + line break + "adaptable."
- Word-by-word paragraph (`text-white/60 text-lg`, delay 0.6 + i×0.04): "From a lead-generating website to a technical co-founder to hands-on engineering coaching — Riveted meets your business where it is."
- Bottom list (staggered fade-up, delay 1.1 + idx×0.18): white rounded-2xl rows — **"AI-Powered Websites"** (label color `#887C71`), **"Web App Consulting"** (`#9E948B`), **"Engineering Coaching"** (`#9E948B`) — each with the inline SVG plus icon (`M12 4.5v15m7.5-7.5h-15`, stroke 2.5, rounded caps).
- Bottom gradient overlay: `rgba(158,148,139)` fade per reference stops (1 @ 0%, 1 @ 35%, 0.7 @ 65%, 0 @ 80%).

### 4. Testimonials (`src/components/home/Testimonials.tsx`)

- White section, max-w-[1360px], staggered container (staggerChildren 0.18) with fadeUp variants, converted to useInView.
- **Block A:** h3 `text-3xl` — "Riveted " (medium, rounded sans) + Playfair italic *"changed our website"*; dot indicator (one long black + two stone dots, desktop only); black pill button **"Read More"** → `/blog`.
- **Block B** (`lg:w-[282px]`): image tile `h-[280px] lg:h-[351px] rounded-2xl` using a second committed stock image, `A.testimonialImage` → `/media/testimonial.jpg`; below it a `#F1F0EF` tile (`h-24 rounded-2xl`) reading **"Prima Pave"** (Inter Tight bold `text-3xl`).
- **Right quote card** (`backgroundColor #7D756E1C`, `p-10 rounded-2xl`, max-w-[748px]): word-by-word quote (`text-3xl leading-10`, delay 0.4 + i×0.04): *"We went from a site that just existed to one that converts every day. Riveted understood exactly what our business needed — and delivered it fast."* Attribution: Playfair italic "Marco Marano," + `text-black/50` "Founder, Prima Pave".

### 5. ContactCta (`src/components/home/ContactCta.tsx`) — new section, same language

- White section wrapping a `#141413` rounded-3xl panel (max-w-[1360px], generous padding).
- Heading Inter Tight, large: "Ready to be " + Playfair italic *"riveted?"*
- Sub-line (rounded sans, white/60): "Whether you need a website that generates leads or a partner to build your AI product — let's talk. Free consultation, no obligations."
- White pill button: **hello@rivetedinc.com** (`mailto:`).
- Keeps `id="contact"` so existing `/#contact` links keep working.

## Site Chrome

### Navbar (`src/components/Navbar.tsx`, rewritten)

- Fixed top, transparent bar; left wordmark **"Riveted"** (Inter Tight, medium); right the GroundAI pill nav: `bg-black/40 backdrop-blur-lg rounded-3xl h-[64px]`, width animates 110 → auto (0.8 s, delay 1.1, ease [0.22,1,0.36,1]), links fade in at delay 1.5 — links: **Services** (`/#services` → CraftExperiences section id), **Work** (`/#work` → Testimonials section id), **Blog** (`/blog`), **Contact** (`/#contact`) — plus white pill **"Book a Call"** → `mailto:hello@rivetedinc.com`.
- Entrance: on `/` the header plays the reference animation (rise from y:"45vh", opacity 0→1, 1 s); on other routes a simple fade.
- Wordmark color adapts by route (`usePathname`): white on `/` (over video), `#141413` elsewhere. The dark pill nav works on both.
- Mobile (`lg:hidden`): round `bg-black/40` toggle with lucide Menu/X; AnimatePresence dropdown `w-60 bg-black/70 backdrop-blur-lg rounded-2xl` with the same links + white Login-style "Book a Call" pill.
- Section anchors: CraftExperiences gets `id="services"`, Testimonials `id="work"`, ContactCta `id="contact"`. Old anchors (`#approach`, `#smb`, `#consulting`, `#coaching`) disappear with their sections; Footer links updated to match.

### Footer (`src/components/Footer.tsx`, restyled)

- `#141413` background, `rounded-t-3xl`, white wordmark (Inter Tight), `white/60` links (Services, Work, Blog, Contact), `white/40` copyright. Same single-row responsive structure as today.

## Blog

- Inherits the new palette/typography through the remapped CSS variables — most classes (`text-rivet`, `bg-background`, `font-serif`) restyle automatically.
- Light touch-ups: `BlogPostCard` → `rounded-2xl` cards, Inter Tight titles; blog listing and post headers → Inter Tight with Playfair italic accents. The five `BlogContent_*` components are not edited.
- `SectionDivider` and `FadeIn` are deleted only if these changes orphan them: at implementation time, grep for remaining imports and delete only true orphans (blog components may still import `FadeIn`).

## Metadata & Scripts

- `layout.tsx` metadata stays Riveted (existing title/description/OG/keywords). GroundAI meta text from the reference is **not** used.
- Google Analytics and Intercom scripts untouched.

## Out of Scope

- No new routes or pages. No backend. No design-token system. No changes to blog article content. No custom video production (stock placeholder, swappable later).

## Error Handling & Resilience

- Video: `poster` image + dark section background so a failed/slow video still yields a legible hero; video is muted/inline so autoplay policies are satisfied.
- All animations run client-side with no network dependencies; missing media degrades to solid backgrounds.
- `prefers-reduced-motion`: content visible without entrance animation.

## Verification

No test infrastructure exists in this repo and the change is purely presentational, so no unit-test suite is added. Each implementation phase verifies with:

1. `npm run build` green (type-check included).
2. `npm run lint` green.
3. Visual smoke check on the dev server: `/`, `/blog`, one blog post — desktop (~1440px) and mobile (~390px) widths.
4. Back-navigation check: scroll deep on `/`, navigate to `/blog`, go back — no blank/invisible sections (validates the useInView rule).

## Git Workflow

Work happens on `feat/groundai-redesign`, branched from `main`, per the user's global git workflow rule. Conventional commits (`feat:`, `refactor:` …).
