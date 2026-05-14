# MA (間) — Japan Lifestyle Platform

A cinematic Japan lifestyle platform focused on atmosphere, feelings, and real experiences.
Not a travel guide. A feeling, honestly shared.

## Stack

- **Next.js 16** — App Router, TypeScript strict
- **Tailwind CSS v4** — design tokens via `@theme`, no JS config
- **next-intl v4** — EN / JA localization (`/en/...` and `/ja/...`)
- **next-mdx-remote v6** — RSC-native MDX for literary essays
- **Framer Motion** — scroll-triggered cinematic animations
- **Vercel** — zero-config deployment

## Local Development

```bash
npm install
npm run dev
# → http://localhost:3000  (redirects to /en)
```

## Build

```bash
npm run build   # production build
npm run lint    # ESLint (must be clean before deploying)
npx tsc --noEmit  # TypeScript check
```

## Deploy to Vercel

### Option A — Vercel Dashboard (recommended)

1. Push this branch to GitHub
2. Go to [vercel.com/new](https://vercel.com/new)
3. Import the repository
4. Vercel auto-detects Next.js — no configuration needed
5. Click **Deploy**

The `vercel.json` in the root is already configured.

### Option B — Vercel CLI

```bash
npm i -g vercel
vercel login
vercel --prod
```

### Environment Variables

No environment variables are required for the base deployment.
All content is file-based (MDX in `src/content/`).

## Project Structure

```
src/
  app/
    [locale]/           # EN + JA route group
      layout.tsx        # NavBar + Footer wrapper
      page.tsx          # Home
      cities/[slug]/    # City portrait (tokyo, kyoto, osaka)
      moments/          # Essay index
      moments/[slug]/   # Individual essay
      about/            # Manifesto
    globals.css         # Full design system
    layout.tsx          # Root layout + Google Fonts
  components/
    layout/             # NavBar, Footer
    cards/              # CityCard, MomentCard
    content/            # PullQuote, MDXContent
    motion/             # FadeIn, RevealText, StaggerChildren
    ui/                 # Button, Tag, ScrollIndicator
  lib/
    cities.ts           # City data + palette definitions
    content.ts          # MDX file loader (gray-matter + reading-time)
    types.ts            # Shared TypeScript types
  i18n/
    routing.ts          # next-intl locale config
    request.ts          # next-intl server config
  content/moments/      # MDX essays (add new ones here)
  proxy.ts              # next-intl locale routing (Next.js 16)
messages/
  en.json               # English strings
  ja.json               # Japanese strings
```

## Adding Content

### New moment essay

Create `src/content/moments/your-slug.mdx`:

```mdx
---
title: "Your Title"
city: "tokyo"          # tokyo | kyoto | osaka
date: "2024-12-01"
excerpt: "One sentence that captures the feeling."
imageUrl: "https://images.unsplash.com/photo-...?w=1400&q=80"
imageAlt: "Description of the image"
tags: ["tag1", "tag2"]
---

Your literary essay here...
```

The page auto-generates at `/en/moments/your-slug`.

## Cities

Each city has a distinct emotional identity:

| City | Palette | Feeling |
|------|---------|---------|
| Tokyo | Indigo → Crimson | Electric and lonely |
| Kyoto | Moss → Gold | Quiet and nostalgic |
| Osaka | Earth → Orange | Warm and energetic |
