# Riveted, Inc. — Website

AI-powered websites and web app consulting. Built with Next.js, Tailwind CSS, and Framer Motion.

## Tech Stack

- **Next.js 16** (App Router)
- **React 19**
- **Tailwind CSS v4**
- **Framer Motion** for scroll animations
- **TypeScript**

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Deploying to Railway

1. Push this repo to GitHub.
2. Create a new project on [Railway](https://railway.com) and connect your repo.
3. Railway auto-detects Next.js and builds using the standalone output.
4. Set any environment variables from `.env.example` if needed.
5. Deploy — Railway handles the rest.

## Project Structure

```
src/
├── app/
│   ├── layout.tsx       # Root layout with metadata
│   ├── page.tsx         # Homepage
│   └── globals.css      # Theme variables & Tailwind
└── components/
    ├── FadeIn.tsx        # Scroll animation wrapper (Framer Motion)
    ├── Navbar.tsx        # Fixed navigation
    ├── Footer.tsx        # Site footer
    └── SectionDivider.tsx # Decorative section divider
```
