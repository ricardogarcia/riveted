# GroundAI Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rebuild the Riveted website's look and feel in the GroundAI design language (video hero, pill nav, marquee, three animated feature cards, editorial testimonial, contact CTA) while keeping Riveted branding, copy, and routes.

**Architecture:** Next.js 16 App Router site. New homepage composed of five client components under `src/components/home/`; global restyle flows through CSS variables in `globals.css` so blog pages update nearly for free. Global floating pill Navbar + dark Footer. Spec: `docs/superpowers/specs/2026-07-01-groundai-redesign-design.md`.

**Tech Stack:** Next.js 16, React 19, TypeScript, Tailwind v4, framer-motion 12, lucide-react (new), `next/font/google`.

## Global Constraints

- All work on branch `feat/groundai-redesign` (create in Task 1; every task commits there).
- **NEVER use `whileInView` with `once: true`** (user's global CLAUDE.md — blank page on back-nav). Always: `const isInView = useInView(ref, { once: true, margin: "0px 0px -40px 0px" })` + `animate={isInView ? visible : hidden}`.
- Fonts: headings/wordmark = Inter Tight (`font-display` utility); accent words = Playfair Display italic (`font-serif italic`); body/buttons = default `font-sans` stack `'SF Pro Rounded', ui-rounded, system-ui, sans-serif`. No other font families.
- Palette: white sections, `#141413` dark surfaces, taupe accents `#887C71` / `#9E948B`, tile gray `#F1F0EF`, quote bg `#7D756E1C`. Riveted gold `#b8942e` must not survive anywhere except blog content prose (which inherits the remapped `--rivet-color`).
- All imagery/video referenced ONLY via the `A` object from `src/lib/assets.ts`.
- Contact target everywhere: `mailto:hello@rivetedinc.com`.
- This repo has **no test framework** (per spec, none is added). Each task's verify cycle is: `npm run build` green + `npm run lint` green. Visual smoke checks happen in Tasks 13 and 15.
- Cubic-bezier easings must be typed tuples: `const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];` (bare `as const` arrays fail framer-motion v12 typings).
- Use `next/image` for raster images in JSX (`<img>` fails `next lint`).

---

### Task 1: Branch, dependency, media assets, and the `A` asset map

**Files:**
- Create: `src/lib/assets.ts`
- Create: `public/media/hero.mp4`, `public/media/hero-poster.jpg`, `public/media/card-style.jpg`, `public/media/testimonial.jpg` (downloaded)
- Modify: `package.json` (lucide-react)

**Interfaces:**
- Produces: `A` object — `import { A } from "@/lib/assets"` with keys `heroVideo`, `heroPoster`, `cardBackground`, `testimonialImage` (all `string` paths under `/media/`). Every later task uses these exact keys.

- [ ] **Step 1: Create branch and install lucide-react**

```bash
git checkout -b feat/groundai-redesign
npm install lucide-react
```

Expected: branch created; `lucide-react` appears in `package.json` dependencies.

- [ ] **Step 2: Download stock media placeholders**

```bash
mkdir -p public/media
# Card 1 background (dark-ish tech desk, license-free Unsplash CDN):
curl -L -o public/media/card-style.jpg "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=1200&q=80"
# Testimonial Block B image (team collaborating):
curl -L -o public/media/testimonial.jpg "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=900&q=80"
# Hero poster (dark circuit board):
curl -L -o public/media/hero-poster.jpg "https://images.unsplash.com/photo-1518770660439-4636190af475?w=1600&q=80"
```

Hero video — try these Pexels candidates **in order**; keep the first that downloads successfully at > 1 MB:

```bash
curl -L -o public/media/hero.mp4 "https://videos.pexels.com/video-files/3129671/3129671-hd_1920_1080_30fps.mp4"
ls -lh public/media/hero.mp4   # expect several MB; if tiny/failed, try next:
curl -L -o public/media/hero.mp4 "https://videos.pexels.com/video-files/2611250/2611250-hd_1920_1080_30fps.mp4"
curl -L -o public/media/hero.mp4 "https://videos.pexels.com/video-files/852421/852421-hd_1920_1080_30fps.mp4"
```

Acceptance criteria for the video (open it and look): dark-toned or abstract mood that white text reads over, ≥ 720p, < 40 MB, loops without a jarring cut. If none of the three qualifies, find a free "abstract dark" video on pexels.com/videos, download its HD mp4 to the same path, and note the source URL in the commit message. All Unsplash/Pexels content is license-free for commercial use without attribution.

- [ ] **Step 3: Verify all four files exist and are non-trivial**

```bash
ls -lh public/media/
```

Expected: 4 files; each jpg > 30 KB, mp4 > 1 MB.

- [ ] **Step 4: Create `src/lib/assets.ts`**

```ts
const BASE = "/media";

export const A = {
  heroVideo: `${BASE}/hero.mp4`,
  heroPoster: `${BASE}/hero-poster.jpg`,
  cardBackground: `${BASE}/card-style.jpg`,
  testimonialImage: `${BASE}/testimonial.jpg`,
} as const;
```

- [ ] **Step 5: Verify build and lint pass**

```bash
npm run build && npm run lint
```

Expected: both green (assets.ts is unused so far — that's fine).

- [ ] **Step 6: Commit**

```bash
git add package.json package-lock.json src/lib/assets.ts public/media
git commit -m "feat: add lucide-react, stock media placeholders, and asset map"
```

---

### Task 2: Fonts and global CSS (the palette flip)

**Files:**
- Modify: `src/app/layout.tsx` (font imports only — lines 1–25 and the `<html>` className)
- Modify: `src/app/globals.css` (full rewrite)

**Interfaces:**
- Produces: CSS variables `--font-inter-tight`, `--font-playfair`; Tailwind utilities `font-display` (Inter Tight), `font-serif` (Playfair Display), default `font-sans` (rounded stack); `.animate-marquee` class; remapped color tokens (`background`, `foreground`, `foreground-light`, `rivet`, `rivet-light`, `border-color`, `border-light`, `background-alt`). All later tasks rely on these utility names.

- [ ] **Step 1: Swap fonts in `src/app/layout.tsx`**

Replace the font import block (currently `DM_Sans, Bebas_Neue, Instrument_Serif`) with:

```tsx
import { Inter_Tight, Playfair_Display } from "next/font/google";

const interTight = Inter_Tight({
  variable: "--font-inter-tight",
  subsets: ["latin"],
  weight: ["400", "500"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400"],
  style: ["italic"],
});
```

And update the `<html>` element:

```tsx
<html
  lang="en"
  className={`${interTight.variable} ${playfair.variable} antialiased`}
>
```

Delete the three old font constant declarations. Touch nothing else in layout.tsx (metadata, GA, Intercom stay).

- [ ] **Step 2: Rewrite `src/app/globals.css`**

Full new content:

```css
@import "tailwindcss";

@theme inline {
  --color-background: var(--background);
  --color-background-alt: var(--background-alt);
  --color-foreground: var(--foreground);
  --color-foreground-light: var(--foreground-light);
  --color-rivet: var(--rivet-color);
  --color-rivet-light: var(--rivet-light-color);
  --color-border-color: var(--border-color);
  --color-border-light: var(--border-light-color);

  --font-sans: 'SF Pro Rounded', ui-rounded, system-ui, sans-serif;
  --font-display: var(--font-inter-tight);
  --font-serif: var(--font-playfair), Georgia, serif;
}

:root {
  --background: #ffffff;
  --background-alt: #f1f0ef;
  --foreground: #141413;
  --foreground-light: #55534e;
  --rivet-color: #887c71;
  --rivet-light-color: #9e948b;
  --border-color: #dbd8d3;
  --border-light-color: #eae8e4;
}

html {
  scroll-behavior: smooth;
}

body {
  background: var(--background);
  color: var(--foreground);
  font-family: 'SF Pro Rounded', ui-rounded, system-ui, sans-serif;
}

::selection {
  background-color: rgba(136, 124, 113, 0.25);
  color: #141413;
}

@keyframes marquee {
  0% { transform: translateX(0); }
  100% { transform: translateX(-50%); }
}

.animate-marquee {
  animation: marquee 35s linear infinite;
}
```

(The old `pulse-glow` keyframes are deleted — only the old homepage used them, and it is replaced in Task 13. Transitional builds don't break: a missing keyframe just means no glow animation.)

- [ ] **Step 3: Verify build and lint**

```bash
npm run build && npm run lint
```

Expected: green. The old homepage will look visually off (new palette under old layout) — expected and temporary.

- [ ] **Step 4: Commit**

```bash
git add src/app/layout.tsx src/app/globals.css
git commit -m "feat: swap to Inter Tight/Playfair fonts and GroundAI palette"
```

---

### Task 3: Navbar — floating pill nav

**Files:**
- Modify: `src/components/Navbar.tsx` (full rewrite)

**Interfaces:**
- Consumes: `font-display` utility (Task 2), lucide-react (Task 1).
- Produces: global fixed header used by `layout.tsx` (already wired — layout imports `Navbar` and renders it; no layout change needed). Links to `/#services`, `/#work`, `/#contact` — sections created in Tasks 8, 11, 12.

- [ ] **Step 1: Rewrite `src/components/Navbar.tsx`**

```tsx
"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

const navLinks = [
  { href: "/#services", label: "Services" },
  { href: "/#work", label: "Work" },
  { href: "/blog", label: "Blog" },
  { href: "/#contact", label: "Contact" },
];

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

export default function Navbar() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <motion.header
      initial={isHome ? { y: "45vh", opacity: 0 } : { opacity: 0 }}
      animate={isHome ? { y: 0, opacity: 1 } : { opacity: 1 }}
      transition={{ duration: 1, ease: EASE }}
      className="fixed top-0 left-0 right-0 z-50 p-6 md:px-12 md:py-8 pointer-events-none"
    >
      <div className="w-full max-w-[1360px] mx-auto flex justify-between items-center relative pointer-events-auto">
        <Link
          href="/"
          className={`font-display text-3xl font-medium ${
            isHome ? "text-white" : "text-foreground"
          }`}
        >
          Riveted
        </Link>

        {/* Desktop pill nav */}
        <motion.nav
          layout
          initial={{ width: 110 }}
          animate={{ width: "auto" }}
          transition={{ duration: 0.8, delay: 1.1, ease: EASE }}
          style={{ willChange: "width" }}
          className="hidden lg:flex bg-black/40 backdrop-blur-lg rounded-3xl items-center overflow-hidden h-[64px] flex-row-reverse"
        >
          <div className="p-1.5 shrink-0">
            <a
              href="mailto:hello@rivetedinc.com"
              className="h-12 px-6 rounded-full bg-white text-black text-xl font-medium flex items-center whitespace-nowrap hover:bg-neutral-100 transition-colors"
            >
              Book a Call
            </a>
          </div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5, duration: 0.5 }}
            className="flex items-center gap-8 pl-8 pr-2 whitespace-nowrap"
          >
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-white text-base opacity-90 hover:opacity-100 transition-opacity"
              >
                {link.label}
              </Link>
            ))}
          </motion.div>
        </motion.nav>

        {/* Mobile toggle + dropdown */}
        <div className="lg:hidden relative">
          <button
            onClick={() => setMobileOpen((o) => !o)}
            aria-label="Toggle menu"
            className="w-12 h-12 rounded-full bg-black/40 backdrop-blur-lg flex items-center justify-center text-white"
          >
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
          <AnimatePresence>
            {mobileOpen && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="absolute top-full right-0 mt-3 w-60 bg-black/70 backdrop-blur-lg rounded-2xl p-4 flex flex-col gap-3"
              >
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className="text-white text-base opacity-90 hover:opacity-100 transition-opacity"
                  >
                    {link.label}
                  </Link>
                ))}
                <a
                  href="mailto:hello@rivetedinc.com"
                  onClick={() => setMobileOpen(false)}
                  className="h-11 rounded-full bg-white text-black text-base font-medium flex items-center justify-center hover:bg-neutral-100 transition-colors"
                >
                  Book a Call
                </a>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.header>
  );
}
```

Note the `pointer-events-none` on the header shell + `pointer-events-auto` on the inner row: the fixed header spans the viewport width but must not block clicks on content beneath its empty middle area.

- [ ] **Step 2: Verify build and lint**

```bash
npm run build && npm run lint
```

Expected: green.

- [ ] **Step 3: Commit**

```bash
git add src/components/Navbar.tsx
git commit -m "feat: replace navbar with floating GroundAI-style pill nav"
```

---

### Task 4: Footer — dark restyle

**Files:**
- Modify: `src/components/Footer.tsx` (full rewrite)

**Interfaces:**
- Consumes: `font-display` utility.
- Produces: nothing consumed by later tasks.

- [ ] **Step 1: Rewrite `src/components/Footer.tsx`**

```tsx
import Link from "next/link";

const footerLinks = [
  { href: "/#services", label: "Services" },
  { href: "/#work", label: "Work" },
  { href: "/blog", label: "Blog" },
  { href: "mailto:hello@rivetedinc.com", label: "Contact" },
];

export default function Footer() {
  return (
    <footer className="bg-[#141413] rounded-t-3xl px-6 md:px-12 py-10">
      <div className="mx-auto max-w-[1360px] flex flex-col sm:flex-row justify-between items-center gap-4">
        <span className="font-display text-xl font-medium text-white">
          Riveted
        </span>
        <ul className="flex flex-wrap justify-center gap-6">
          {footerLinks.map((link) => (
            <li key={link.label}>
              {link.href.startsWith("mailto:") ? (
                <a
                  href={link.href}
                  className="text-white/60 text-sm hover:text-white transition-colors"
                >
                  {link.label}
                </a>
              ) : (
                <Link
                  href={link.href}
                  className="text-white/60 text-sm hover:text-white transition-colors"
                >
                  {link.label}
                </Link>
              )}
            </li>
          ))}
        </ul>
        <p className="text-xs text-white/40">
          &copy; {new Date().getFullYear()} Riveted, Inc. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
```

- [ ] **Step 2: Verify build and lint**

```bash
npm run build && npm run lint
```

Expected: green.

- [ ] **Step 3: Commit**

```bash
git add src/components/Footer.tsx
git commit -m "feat: restyle footer to dark GroundAI language"
```

---

### Task 5: AnimatedWords helper

**Files:**
- Create: `src/components/home/AnimatedWords.tsx`

**Interfaces:**
- Produces: `AnimatedWords` default export. Props: `{ text: string; baseDelay?: number; step?: number; duration?: number; y?: number; active?: boolean; className?: string }`. Defaults: `baseDelay=0, step=0.045, duration=0.5, y=10, active=true`. Renders each word as a `motion.span` with delay `baseDelay + i * step`. Used by Tasks 6 (Hero, always-active), 9 (ChatCard), 10 (AdaptableCard), 11 (Testimonials) — the latter three drive `active` from their own `useInView`.

- [ ] **Step 1: Create `src/components/home/AnimatedWords.tsx`**

```tsx
"use client";

import { motion } from "framer-motion";

interface AnimatedWordsProps {
  text: string;
  baseDelay?: number;
  step?: number;
  duration?: number;
  y?: number;
  active?: boolean;
  className?: string;
}

export default function AnimatedWords({
  text,
  baseDelay = 0,
  step = 0.045,
  duration = 0.5,
  y = 10,
  active = true,
  className,
}: AnimatedWordsProps) {
  return (
    <span className={className}>
      {text.split(" ").map((word, i) => (
        <motion.span
          key={`${word}-${i}`}
          initial={{ opacity: 0, y }}
          animate={active ? { opacity: 1, y: 0 } : { opacity: 0, y }}
          transition={{ delay: baseDelay + i * step, duration, ease: "easeOut" }}
          className="inline-block mr-[0.25em]"
        >
          {word}
        </motion.span>
      ))}
    </span>
  );
}
```

- [ ] **Step 2: Verify build and lint**

```bash
npm run build && npm run lint
```

Expected: green.

- [ ] **Step 3: Commit**

```bash
git add src/components/home/AnimatedWords.tsx
git commit -m "feat: add AnimatedWords word-by-word reveal helper"
```

---

### Task 6: Hero section

**Files:**
- Create: `src/components/home/Hero.tsx`

**Interfaces:**
- Consumes: `A.heroVideo`, `A.heroPoster` (Task 1); `AnimatedWords` (Task 5); `font-display` / `font-serif` utilities (Task 2); `ArrowUpRight` from lucide-react.
- Produces: `Hero` default export (no props). Composed by `page.tsx` in Task 13.

- [ ] **Step 1: Create `src/components/home/Hero.tsx`**

```tsx
"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import AnimatedWords from "./AnimatedWords";
import { A } from "@/lib/assets";

export default function Hero() {
  return (
    <section className="relative min-h-screen w-full text-white flex flex-col justify-between p-6 md:p-12 overflow-hidden bg-[#141413]">
      <video
        src={A.heroVideo}
        poster={A.heroPoster}
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover z-0"
      />
      <div className="absolute inset-0 bg-black/20 z-0" />

      {/* Spacer under the global fixed navbar */}
      <div className="h-[64px]" aria-hidden="true" />

      <div className="w-full max-w-[800px] mx-auto flex flex-col justify-center items-center gap-6 md:gap-8 text-center my-auto z-10 px-4">
        <h1 className="font-display text-white text-[40px] sm:text-[52px] md:text-[64px] font-normal leading-[1.1] md:leading-[1.02]">
          <motion.span
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="block"
          >
            Meet Riveted.
          </motion.span>
          <motion.span
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="block"
          >
            <em className="font-serif italic font-normal">
              Build what&rsquo;s next
            </em>{" "}
            with
          </motion.span>
          <motion.span
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.6 }}
            className="block"
          >
            AI-first engineering
          </motion.span>
        </h1>
        <motion.a
          href="mailto:hello@rivetedinc.com"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.0, duration: 0.5 }}
          className="h-12 md:h-14 px-6 md:px-8 py-3 bg-white rounded-2xl inline-flex justify-center items-center text-black text-lg md:text-xl font-medium hover:bg-neutral-200 transition-colors shadow-lg mt-2 md:mt-0"
        >
          Start your project
        </motion.a>
      </div>

      <footer className="w-full max-w-[1360px] mx-auto flex flex-col md:flex-row justify-between items-start md:items-end gap-6 z-10">
        <p className="w-full md:w-[480px] max-w-prose text-white/80 text-xl leading-[1.25] text-left">
          <AnimatedWords
            baseDelay={1.2}
            text="We build AI-powered websites for small businesses and partner with founders to ship production-grade products — engineering rigor and business sense in everything we do."
          />
        </p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.4, duration: 0.6 }}
          className="flex flex-row flex-wrap lg:flex-col items-center lg:items-end gap-2.5 w-full md:w-auto justify-end"
        >
          <div className="h-[56px] px-5 rounded-2xl border border-white/40 text-white text-xl whitespace-nowrap flex items-center justify-center">
            Websites that win customers
          </div>
          <div className="flex items-center gap-2">
            <div className="w-[56px] h-[56px] rounded-2xl border border-white/40 flex items-center justify-center shrink-0">
              <ArrowUpRight className="w-6 h-6 text-white" />
            </div>
            <div className="h-[56px] px-5 rounded-2xl border border-white/40 text-white text-xl whitespace-nowrap flex items-center justify-center">
              Consulting &amp; Coaching
            </div>
          </div>
        </motion.div>
      </footer>
    </section>
  );
}
```

- [ ] **Step 2: Verify build and lint**

```bash
npm run build && npm run lint
```

Expected: green (component not yet imported anywhere — still type-checked and linted).

- [ ] **Step 3: Commit**

```bash
git add src/components/home/Hero.tsx
git commit -m "feat: add full-viewport video hero"
```

---

### Task 7: TrustedBy marquee

**Files:**
- Create: `src/components/home/TrustedBy.tsx`

**Interfaces:**
- Consumes: `.animate-marquee` (Task 2), `font-display`/`font-serif` utilities.
- Produces: `TrustedBy` default export (no props). Server component (no motion, no state — do NOT add "use client").

- [ ] **Step 1: Create `src/components/home/TrustedBy.tsx`**

```tsx
const brands = [
  "Google",
  "YouTube Ads",
  "LeaseLock",
  "Bend",
  "WeatherFreight",
  "Prima Pave",
  "MIT",
  "Caltech",
];

export default function TrustedBy() {
  return (
    <section className="bg-white pt-16 pb-14 px-[40px]">
      <h2 className="font-display text-center text-3xl md:text-4xl font-medium text-neutral-900 mb-12">
        Trusted by the{" "}
        <em className="font-serif italic font-normal">leading brands</em>
      </h2>
      <div className="relative overflow-hidden">
        <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-white to-transparent z-10" />
        <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-white to-transparent z-10" />
        <div className="flex w-max animate-marquee gap-16">
          {[...brands, ...brands].map((name, i) => (
            <div
              key={`${name}-${i}`}
              className="flex items-center gap-3 shrink-0 opacity-40"
            >
              <span className="font-display text-3xl font-bold text-black whitespace-nowrap">
                {name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Verify build and lint**

```bash
npm run build && npm run lint
```

Expected: green.

- [ ] **Step 3: Commit**

```bash
git add src/components/home/TrustedBy.tsx
git commit -m "feat: add trusted-by text marquee"
```

---

### Task 8: CraftExperiences — section shell + Card 1 (capability carousel)

**Files:**
- Create: `src/components/home/CraftExperiences.tsx`

**Interfaces:**
- Consumes: `A.cardBackground` (Task 1), `font-display`/`font-serif`, lucide `Sparkles`.
- Produces: `CraftExperiences` default export with `id="services"` on the section. Internal components `CardReveal` (props `{ index: number; children: React.ReactNode }`) and `StyleCarouselCard` — Tasks 9 and 10 add `ChatCard` and `AdaptableCard` to THIS file and render them inside `CardReveal index={1}` / `index={2}`.

- [ ] **Step 1: Create `src/components/home/CraftExperiences.tsx`**

```tsx
"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Sparkles } from "lucide-react";
import { A } from "@/lib/assets";

const ITEMS = [
  "SEO-optimized design",
  "24/7 AI lead capture",
  "Smart forms & follow-ups",
  "Conversion-focused copy",
  "Fast AI-powered delivery",
  "Ongoing growth support",
  "Analytics that matter",
];

const PILL_ROW_HEIGHT = 56;
const PILL_GAP = 18;
const ACTIVE_HEIGHT = 80;
const ACTIVE_GAP = 22;

function Pill({ label, isActive }: { label: string; isActive: boolean }) {
  return (
    <motion.div
      layout
      transition={{ type: "spring", stiffness: 260, damping: 28 }}
      className={
        isActive
          ? "w-[calc(100%_-_60px)] mx-[30px] h-[80px] p-[8.5px] bg-white/25 backdrop-blur-xl shadow-xl rounded-full flex items-center gap-[8.5px]"
          : "w-[261px] h-[56px] px-3 bg-white/15 backdrop-blur-md rounded-full border border-white/10 flex items-center gap-[8.5px]"
      }
    >
      <div
        className={`rounded-full bg-white/30 flex items-center justify-center shrink-0 ${
          isActive ? "w-[63px] h-[63px]" : "w-[44px] h-[44px]"
        }`}
      >
        {isActive ? (
          <motion.div
            layoutId={`icon-${label}`}
            className="flex items-center justify-center"
          >
            <Sparkles className="w-7 h-7 text-white" />
          </motion.div>
        ) : (
          <div className="w-full h-full rounded-full bg-white/10" />
        )}
      </div>
      <div className="relative flex-1 h-[44px] text-left ml-1">
        <motion.div
          animate={{ opacity: isActive ? 1 : 0 }}
          transition={{ duration: 0.3 }}
          className="absolute inset-0 flex flex-col justify-center"
        >
          <div className="text-white text-lg font-medium leading-tight">
            {label}
          </div>
          <div className="text-white/70 text-[11px] tracking-[0.15em]">
            RIVETED BUILD
          </div>
        </motion.div>
        <motion.div
          animate={{ opacity: isActive ? 0 : 1 }}
          transition={{ duration: 0.3 }}
          className="absolute inset-0 flex flex-col justify-center gap-1.5"
        >
          <div className="h-2 w-[140px] bg-white/50 rounded-full" />
          <div className="h-2 w-[70px] bg-white/35 rounded-full" />
        </motion.div>
      </div>
    </motion.div>
  );
}

function StyleCarouselCard() {
  const [active, setActive] = useState(2);

  useEffect(() => {
    const id = setInterval(
      () => setActive((a) => (a + 1) % ITEMS.length),
      2800
    );
    return () => clearInterval(id);
  }, []);

  const len = ITEMS.length;
  const half = Math.floor(len / 2);

  return (
    <div className="relative flex-1 h-[585px] rounded-3xl overflow-hidden bg-stone-300">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${A.cardBackground})` }}
      />
      <div className="absolute inset-0 bg-black/10" />
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="relative w-full" style={{ height: ACTIVE_HEIGHT }}>
          {ITEMS.map((label, i) => {
            const diff = ((i - active + len + half) % len) - half;
            const isActive = diff === 0;
            const visible = Math.abs(diff) <= 2;
            const y =
              diff === 0
                ? 0
                : diff < 0
                  ? diff * (PILL_ROW_HEIGHT + PILL_GAP) - ACTIVE_GAP
                  : diff * (PILL_ROW_HEIGHT + PILL_GAP) + ACTIVE_GAP;
            const opacity = !visible ? 0 : Math.abs(diff) === 2 ? 0.55 : 1;
            return (
              <motion.div
                key={label}
                animate={{ y, opacity }}
                transition={{
                  y: { type: "spring", stiffness: 260, damping: 28 },
                  opacity: { ease: "easeInOut", duration: 0.4 },
                }}
                className="absolute left-0 right-0 flex justify-center pointer-events-none"
              >
                <Pill label={label} isActive={isActive} />
              </motion.div>
            );
          })}
        </div>
      </div>
      <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-black/30 to-transparent pointer-events-none" />
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-black/30 to-transparent pointer-events-none" />
    </div>
  );
}

function CardReveal({
  index,
  children,
}: {
  index: number;
  children: React.ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "0px 0px -40px 0px" });
  return (
    <motion.div
      ref={ref}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
      transition={{ delay: index * 0.35, duration: 1.1, ease: "easeOut" }}
      className="flex flex-1"
    >
      {children}
    </motion.div>
  );
}

export default function CraftExperiences() {
  return (
    <section id="services" className="bg-white">
      <div className="max-w-[1360px] mx-auto px-6 md:px-12 pt-16 pb-20">
        <h2 className="font-display text-center text-5xl md:text-6xl font-normal leading-[1.1] mb-12 text-neutral-900">
          <em className="font-serif italic">Craft experiences</em> your
          <br />
          customers will remember
        </h2>
        <div className="flex flex-col lg:flex-row justify-between items-stretch gap-6">
          <CardReveal index={0}>
            <StyleCarouselCard />
          </CardReveal>
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Verify build and lint**

```bash
npm run build && npm run lint
```

Expected: green.

- [ ] **Step 3: Commit**

```bash
git add src/components/home/CraftExperiences.tsx
git commit -m "feat: add CraftExperiences section with capability carousel card"
```

---

### Task 9: CraftExperiences — Card 2 (dark chat card)

**Files:**
- Modify: `src/components/home/CraftExperiences.tsx`

**Interfaces:**
- Consumes: `CardReveal` and file structure from Task 8; `AnimatedWords` (Task 5); `AnimatePresence` from framer-motion.
- Produces: `ChatCard` internal component rendered as the second card.

- [ ] **Step 1: Add imports**

Update the framer-motion import at the top of `CraftExperiences.tsx` and add AnimatedWords:

```tsx
import { AnimatePresence, motion, useInView } from "framer-motion";
import AnimatedWords from "./AnimatedWords";
```

- [ ] **Step 2: Add the `ChatCard` component** (place after `StyleCarouselCard`)

```tsx
function ChatSkeletonRows() {
  return (
    <div className="flex items-start">
      <div className="w-10 h-10 rounded-xl bg-[#FFFFFF54] shrink-0" />
      <div className="ml-[12px] flex-1 flex flex-col gap-[9px] pr-[22px]">
        <div className="h-[6px] w-[31px] bg-[#FFFFFF3D] rounded-full mt-[17px]" />
        <div className="h-[6px] w-[85%] bg-[#FFFFFF3D] rounded-full" />
        <div className="h-[6px] w-[55%] bg-[#FFFFFF3D] rounded-full" />
      </div>
    </div>
  );
}

function ChatCard() {
  const [filled, setFilled] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "0px 0px -40px 0px" });

  useEffect(() => {
    const t = setTimeout(() => setFilled(true), 1100);
    return () => clearTimeout(t);
  }, []);

  return (
    <div
      ref={ref}
      className="relative flex-1 h-[585px] rounded-3xl overflow-hidden bg-[#141413] flex flex-col pt-10 pb-10 justify-between"
    >
      <div className="flex-1 flex flex-col justify-center gap-[10px] mb-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="mx-[58px] h-[108px] rounded-2xl bg-[#FAFAFA14] flex items-start pt-[22px] pl-[22px] relative"
        >
          <ChatSkeletonRows />
        </motion.div>

        <motion.div
          layout
          animate={{ backgroundColor: filled ? "#9E948B" : "#FAFAFA14" }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="mx-[45px] h-[135px] rounded-3xl p-[22px] overflow-hidden relative"
        >
          <AnimatePresence mode="wait">
            {filled ? (
              <motion.div
                key="filled"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5, delay: 0.15 }}
              >
                <div className="flex items-center gap-[12px] h-[44px]">
                  <div className="w-10 h-10 rounded-full bg-[#141413] text-white flex items-center justify-center text-base font-medium shrink-0">
                    M
                  </div>
                  <span className="text-white text-base leading-none">Me</span>
                </div>
                <p className="text-white text-[15px] leading-snug mt-[-9px] ml-[56px]">
                  My website isn&apos;t bringing in leads — can Riveted help?
                </p>
              </motion.div>
            ) : (
              <motion.div
                key="skeleton"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <ChatSkeletonRows />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>

      <div className="flex justify-between items-end pl-[32px] pr-[32px]">
        <div className="w-64 text-white text-4xl leading-10">
          <AnimatedWords
            active={isInView}
            baseDelay={0.5}
            step={0.1}
            duration={0.5}
            y={10}
            text="Engage and delight customers"
          />
        </div>
        <div className="flex items-center shrink-0">
          <div className="w-10 h-10 rounded-full border-2 border-[#141413] bg-[#5F5D4D] text-white flex items-center justify-center text-xl z-30">
            01
          </div>
          <div className="w-10 h-10 rounded-full border-2 border-[#141413] bg-[#252522] text-white/40 flex items-center justify-center text-xl -ml-3 z-20">
            2
          </div>
          <div className="w-10 h-10 rounded-full border-2 border-[#141413] bg-[#252522] text-white/40 flex items-center justify-center text-xl -ml-3 z-10">
            3
          </div>
        </div>
      </div>
    </div>
  );
}
```

- [ ] **Step 3: Render it** — in the default export's card row, after the first `CardReveal`:

```tsx
          <CardReveal index={1}>
            <ChatCard />
          </CardReveal>
```

- [ ] **Step 4: Verify build and lint**

```bash
npm run build && npm run lint
```

Expected: green.

- [ ] **Step 5: Commit**

```bash
git add src/components/home/CraftExperiences.tsx
git commit -m "feat: add morphing chat card to CraftExperiences"
```

---

### Task 10: CraftExperiences — Card 3 (adaptable list)

**Files:**
- Modify: `src/components/home/CraftExperiences.tsx`

**Interfaces:**
- Consumes: `CardReveal`, `AnimatedWords`, existing imports (no new imports needed).
- Produces: `AdaptableCard` internal component rendered as the third card. Completes the section.

- [ ] **Step 1: Add the `AdaptableCard` component** (place after `ChatCard`)

```tsx
const ADAPT_ITEMS = [
  { label: "AI-Powered Websites", color: "#887C71" },
  { label: "Web App Consulting", color: "#9E948B" },
  { label: "Engineering Coaching", color: "#9E948B" },
];

function AdaptableCard() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "0px 0px -40px 0px" });

  return (
    <div
      ref={ref}
      className="relative flex-1 h-[585px] rounded-3xl overflow-hidden flex flex-col px-[33px] pt-[44px] pb-10 bg-[#9E948B]"
    >
      <div className="flex flex-col gap-[26px]">
        <h3 className="font-display text-white text-5xl font-normal leading-[1.05]">
          It&apos;s completely
          <br />
          adaptable.
        </h3>
        <p className="text-white/60 text-lg leading-snug max-w-[340px]">
          <AnimatedWords
            active={isInView}
            baseDelay={0.6}
            step={0.04}
            duration={0.4}
            y={8}
            text="From a lead-generating website to a technical co-founder to hands-on engineering coaching — Riveted meets your business where it is."
          />
        </p>
      </div>
      <div className="mt-auto z-10 relative">
        <div className="flex flex-col gap-[12px]">
          {ADAPT_ITEMS.map((item, idx) => (
            <motion.div
              key={item.label}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{
                delay: 1.1 + idx * 0.18,
                duration: 0.55,
                ease: "easeOut",
              }}
              className="w-full py-[15px] px-[27px] rounded-2xl bg-white flex items-center justify-between"
            >
              <span className="text-lg" style={{ color: item.color }}>
                {item.label}
              </span>
              <svg
                className="w-[22px] h-[22px] text-neutral-400"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2.5}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 4.5v15m7.5-7.5h-15"
                />
              </svg>
            </motion.div>
          ))}
        </div>
        <div
          className="pointer-events-none absolute inset-x-0 -bottom-10 h-[140px] -mx-4 z-20"
          style={{
            background:
              "linear-gradient(to top, rgba(158,148,139,1) 0%, rgba(158,148,139,1) 35%, rgba(158,148,139,0.7) 65%, rgba(158,148,139,0) 80%)",
          }}
        />
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Render it** — after the second `CardReveal`:

```tsx
          <CardReveal index={2}>
            <AdaptableCard />
          </CardReveal>
```

- [ ] **Step 3: Verify build and lint**

```bash
npm run build && npm run lint
```

Expected: green.

- [ ] **Step 4: Commit**

```bash
git add src/components/home/CraftExperiences.tsx
git commit -m "feat: add adaptable list card, completing CraftExperiences"
```

---

### Task 11: Testimonials section

**Files:**
- Create: `src/components/home/Testimonials.tsx`

**Interfaces:**
- Consumes: `A.testimonialImage` (Task 1), `AnimatedWords` (Task 5), `next/image`, `font-serif`/`font-display`.
- Produces: `Testimonials` default export with `id="work"` on the section.

- [ ] **Step 1: Create `src/components/home/Testimonials.tsx`**

```tsx
"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import AnimatedWords from "./AnimatedWords";
import { A } from "@/lib/assets";

const QUOTE =
  "We went from a site that just existed to one that converts every day. Riveted understood exactly what our business needed — and delivered it fast.";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

export default function Testimonials() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "0px 0px -40px 0px" });

  return (
    <section id="work" className="bg-white">
      <div className="max-w-[1360px] mx-auto px-6 md:px-10 py-20">
        <motion.div
          ref={ref}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          transition={{ staggerChildren: 0.18 }}
          className="flex flex-col lg:flex-row justify-between items-stretch gap-8 lg:gap-[25px]"
        >
          <div className="flex flex-col lg:flex-row gap-[25px] items-stretch">
            {/* Block A */}
            <motion.div
              variants={fadeUp}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="flex flex-row lg:flex-col justify-between lg:h-full lg:min-h-[447px] gap-4 lg:gap-8 items-center lg:items-start"
            >
              <div className="flex flex-col gap-6 flex-1 lg:flex-none">
                <h3 className="text-3xl text-black leading-tight max-w-[260px]">
                  <span className="font-medium">Riveted</span>{" "}
                  <em className="font-serif italic">changed our website</em>
                </h3>
                <div className="hidden lg:flex items-center gap-2">
                  <div className="w-8 h-2 bg-black rounded-full" />
                  <div className="w-2 h-2 bg-stone-300 rounded-full" />
                  <div className="w-2 h-2 bg-stone-300 rounded-full" />
                </div>
              </div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ delay: 0.3, duration: 0.5, ease: "easeOut" }}
                className="self-start"
              >
                <Link
                  href="/blog"
                  className="inline-block bg-black text-white px-7 py-3 rounded-2xl text-xl font-medium hover:bg-neutral-800 transition-colors whitespace-nowrap"
                >
                  Read More
                </Link>
              </motion.div>
            </motion.div>

            {/* Block B */}
            <motion.div
              variants={fadeUp}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="flex flex-col gap-3 w-full lg:w-[282px]"
            >
              <div className="w-full h-[280px] lg:h-[351px] rounded-2xl overflow-hidden relative">
                <Image
                  src={A.testimonialImage}
                  alt="The Prima Pave team collaborating"
                  fill
                  sizes="(min-width: 1024px) 282px, 100vw"
                  className="object-cover"
                />
              </div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ delay: 0.4, duration: 0.55, ease: "easeOut" }}
                className="w-full h-24 rounded-2xl flex items-center justify-center gap-3 bg-[#F1F0EF]"
              >
                <span className="font-display text-3xl font-bold text-black">
                  Prima Pave
                </span>
              </motion.div>
            </motion.div>
          </div>

          {/* Right quote card */}
          <motion.div
            variants={fadeUp}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="max-w-[748px] flex-1 p-10 rounded-2xl flex flex-col justify-between gap-10 bg-[#7D756E1C]"
          >
            <p className="text-3xl leading-10 text-black">
              <AnimatedWords
                active={isInView}
                baseDelay={0.4}
                step={0.04}
                duration={0.35}
                y={6}
                text={QUOTE}
              />
            </p>
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
              transition={{ delay: 0.6, duration: 0.6, ease: "easeOut" }}
              className="flex flex-col gap-1"
            >
              <span className="font-serif italic text-xl text-black">
                Marco Marano,
              </span>
              <span className="text-xl text-black/50">Founder, Prima Pave</span>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Verify build and lint**

```bash
npm run build && npm run lint
```

Expected: green.

- [ ] **Step 3: Commit**

```bash
git add src/components/home/Testimonials.tsx
git commit -m "feat: add testimonials section"
```

---

### Task 12: ContactCta section

**Files:**
- Create: `src/components/home/ContactCta.tsx`

**Interfaces:**
- Consumes: `font-display`/`font-serif` utilities.
- Produces: `ContactCta` default export with `id="contact"` on the section.

- [ ] **Step 1: Create `src/components/home/ContactCta.tsx`**

```tsx
"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

export default function ContactCta() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "0px 0px -40px 0px" });

  return (
    <section id="contact" className="bg-white px-6 md:px-12 pb-20">
      <motion.div
        ref={ref}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="max-w-[1360px] mx-auto bg-[#141413] rounded-3xl px-8 py-16 md:px-16 md:py-24 text-center"
      >
        <h2 className="font-display text-white text-4xl md:text-6xl font-normal leading-[1.1] mb-6">
          Ready to be <em className="font-serif italic">riveted?</em>
        </h2>
        <p className="text-white/60 text-lg md:text-xl max-w-[520px] mx-auto mb-10 leading-relaxed">
          Whether you need a website that generates leads or a partner to build
          your AI product — let&apos;s talk. Free consultation, no obligations.
        </p>
        <a
          href="mailto:hello@rivetedinc.com"
          className="h-12 md:h-14 px-6 md:px-8 bg-white rounded-2xl inline-flex justify-center items-center text-black text-lg md:text-xl font-medium hover:bg-neutral-200 transition-colors"
        >
          hello@rivetedinc.com
        </a>
      </motion.div>
    </section>
  );
}
```

- [ ] **Step 2: Verify build and lint**

```bash
npm run build && npm run lint
```

Expected: green.

- [ ] **Step 3: Commit**

```bash
git add src/components/home/ContactCta.tsx
git commit -m "feat: add contact CTA section"
```

---

### Task 13: Assemble the new homepage, delete the old one

**Files:**
- Modify: `src/app/page.tsx` (full rewrite)
- Create: `src/components/MotionProvider.tsx`
- Modify: `src/app/layout.tsx` (wrap `{children}` in MotionProvider)
- Delete: `src/components/SectionDivider.tsx` (orphaned — only the old page.tsx imports it; verify with grep before deleting)

**Interfaces:**
- Consumes: all five home components (Tasks 6–12).
- Produces: the live homepage; `MotionProvider` default export (props `{ children: React.ReactNode }`) honoring `prefers-reduced-motion` site-wide.

- [ ] **Step 0: Create `src/components/MotionProvider.tsx`** (spec requirement: reduced-motion users get content without transform entrances — `MotionConfig reducedMotion="user"` disables transform animations while opacity fades still complete, so nothing stays hidden)

```tsx
"use client";

import { MotionConfig } from "framer-motion";

export default function MotionProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
```

Then in `src/app/layout.tsx`, import it and change the main wrapper:

```tsx
import MotionProvider from "@/components/MotionProvider";
```

```tsx
<MotionProvider>
  <Navbar />
  <main className="flex-1">{children}</main>
  <Footer />
</MotionProvider>
```

(Navbar/Footer stay exactly where they are — only wrapped.)

- [ ] **Step 1: Rewrite `src/app/page.tsx`**

```tsx
import Hero from "@/components/home/Hero";
import TrustedBy from "@/components/home/TrustedBy";
import CraftExperiences from "@/components/home/CraftExperiences";
import Testimonials from "@/components/home/Testimonials";
import ContactCta from "@/components/home/ContactCta";

export default function Home() {
  return (
    <>
      <Hero />
      <TrustedBy />
      <CraftExperiences />
      <Testimonials />
      <ContactCta />
    </>
  );
}
```

- [ ] **Step 2: Delete the orphaned SectionDivider**

```bash
grep -rn "SectionDivider" src/   # expect: only src/components/SectionDivider.tsx itself
rm src/components/SectionDivider.tsx
```

Do NOT delete `FadeIn.tsx` — blog components use it.

- [ ] **Step 3: Verify build and lint**

```bash
npm run build && npm run lint
```

Expected: green.

- [ ] **Step 4: Visual smoke check**

```bash
npm run dev
```

Open http://localhost:3000 and verify, at ~1440px and ~390px widths:
- Video hero plays, headline staggers in, pill nav expands top-right (desktop) / round toggle works (mobile).
- Marquee scrolls; three cards animate in on scroll (carousel cycles, chat bubble morphs after ~1.1s, list rows stagger).
- Testimonial and dark CTA render; `#services`, `#work`, `#contact` anchors scroll from nav links.
Stop the dev server afterward.

- [ ] **Step 5: Commit**

```bash
git add src/app/page.tsx src/app/layout.tsx src/components/MotionProvider.tsx
git rm src/components/SectionDivider.tsx
git commit -m "feat: assemble GroundAI-style homepage, remove old sections"
```

---

### Task 14: Blog restyle touch-ups

**Files:**
- Modify: `src/components/BlogPostCard.tsx:26,40`
- Modify: `src/app/blog/page.tsx:38`
- Modify: `src/app/blog/[slug]/page.tsx:109`

**Interfaces:**
- Consumes: `font-display` utility. Blog otherwise inherits the Task 2 palette automatically.

- [ ] **Step 1: Update `src/components/BlogPostCard.tsx`**

Line 26 — round the card corners (`rounded-lg` → `rounded-2xl`):

```tsx
<div className="border border-border-light rounded-2xl p-6 sm:p-8 transition-all duration-300 hover:border-border-color hover:shadow-[0_4px_24px_rgba(0,0,0,0.04)]">
```

Line 40 — swap the dead Instrument Serif var for Inter Tight:

```tsx
<h2 className="font-display text-[1.4rem] sm:text-[1.6rem] text-foreground mb-3 font-normal group-hover:text-rivet transition-colors">
```

- [ ] **Step 2: Update `src/app/blog/page.tsx` line 38** (listing h1):

```tsx
<h1 className="font-display text-[clamp(2rem,4vw,3rem)] text-foreground font-normal leading-tight">
```

- [ ] **Step 3: Update `src/app/blog/[slug]/page.tsx` line 109** (post h1):

```tsx
<h1 className="font-display text-[clamp(2rem,4vw,3rem)] text-foreground font-normal leading-tight mb-5">
```

- [ ] **Step 4: Confirm no other references to removed font vars**

```bash
grep -rn "instrument-serif\|dm-sans\|bebas" src/
```

Expected: no matches. If any appear (e.g., inside BlogContent_* files), replace `var(--font-instrument-serif)` usages with the `font-display` utility the same way as above.

- [ ] **Step 5: Verify build and lint**

```bash
npm run build && npm run lint
```

Expected: green.

- [ ] **Step 6: Commit**

```bash
git add src/components/BlogPostCard.tsx src/app/blog/page.tsx "src/app/blog/[slug]/page.tsx"
git commit -m "feat: restyle blog typography to match redesign"
```

---

### Task 15: Final verification pass

**Files:** none (verification only; fix-forward if issues found).

- [ ] **Step 1: Full build + lint from clean state**

```bash
rm -rf .next && npm run build && npm run lint
```

Expected: green.

- [ ] **Step 2: Visual smoke check — all routes, both widths**

```bash
npm run dev
```

Check at ~1440px and ~390px:
1. `/` — full flow per Task 13's checklist.
2. `/blog` — cards restyled, navbar wordmark is dark, pill nav readable on white.
3. One post (e.g., `/blog/api-first-development-workflow`) — prose legible, accent color is taupe (no gold anywhere).

- [ ] **Step 3: Back-navigation regression check** (the reason for the useInView rule)

On `/`, scroll to the bottom → click Blog → browser Back. Expected: all homepage sections visible at the restored scroll position — nothing stuck invisible.

- [ ] **Step 4: Gold sweep**

```bash
grep -rn "b8942e\|d4ad3a" src/
```

Expected: no matches.

- [ ] **Step 5: Commit any fixes**

If Steps 1–4 surfaced fixes, commit them:

```bash
git add -A && git commit -m "fix: final verification fixes for redesign"
```

If nothing needed fixing, no commit — the branch is complete and ready for merge/PR review.
