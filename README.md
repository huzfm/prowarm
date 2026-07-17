# ProWarm India — prowarm.in

Premium marketing site for ProWarm India (underfloor heating solutions). Built with Next.js 16 (App Router, TypeScript, Turbopack), Tailwind CSS v4, Framer Motion + GSAP ScrollTrigger, Lenis smooth scrolling, and MDX for the blog.

## Getting started

```bash
pnpm install
pnpm dev      # http://localhost:3000
pnpm build    # production build
pnpm start    # serve the production build
```

Node 20.9+ required (Next.js 16 minimum).

## Folder structure

```
app/                    Routes (App Router)
  page.tsx              Home — hero, stats, pinned benefits, products, testimonials, blog, CTA
  about/ services/ contact/
  products/             Filterable grid (+ [slug] detail pages, statically generated)
  blog/                 Search/filter/pagination (+ [slug] article pages from MDX)
  layout.tsx            Fonts, metadata, navbar/footer, providers, toaster
  template.tsx          Route-change fade transition
  globals.css           ALL design tokens (Tailwind v4 @theme) + type-scale utilities
  not-found.tsx         Custom 404
  sitemap.ts robots.ts opengraph-image.tsx icon.svg
components/
  layout/               Navbar (glass-on-scroll), footer, newsletter form
  motion/               Reveal/RevealGroup, Counter, Parallax, Magnetic, Marquee
  ui/                   Restyled shadcn-style primitives (button, input, accordion, tabs…)
  home/ about/ services/ contact/ products/ blog/   Page-specific sections
content/blog/*.mdx      Blog posts (frontmatter + MDX body)
lib/
  site.ts               Site config: name, contacts, socials, stats, testimonials, partners
  products.ts           Product catalogue (the "CMS" for products)
  blog.ts               MDX reading, TOC extraction, related posts
```

## Swapping in real content

- **Copy & contact details** — edit `lib/site.ts` (one file: address, phone, socials, stats, testimonials, partner names).
- **Products** — edit `lib/products.ts`. Each product is a typed object (name, price, specs, features, images). Detail pages are generated automatically from the array.
- **Blog posts** — drop a `.mdx` file into `content/blog/`. Frontmatter needs `title`, `excerpt`, `date`, `category`, `tags`, `image`, `imageAlt`, `author{name, role}`. Reading time, TOC, related posts, sitemap entries and static generation all happen automatically.
- **Images** — currently Unsplash URLs. Replace `src` values in `lib/products.ts`, the blog frontmatter, and the hero/section components (`components/home/hero.tsx`, `components/home/benefits-pinned.tsx`, `components/about/team.tsx`, `app/about/page.tsx`). For local files, put them in `public/` and remove the `remotePatterns` entry in `next.config.ts` if unused. A hero **video** can replace the `<Image>` in `components/home/hero.tsx` with a muted, autoplaying `<video>` — the parallax wrapper works unchanged.
- **Forms** — the contact form and newsletter simulate a send (see `components/contact/contact-form.tsx`, `components/layout/newsletter-form.tsx`). Point the marked `// Simulated…` blocks at a route handler, server action, or service like Resend/Formspree.
- **Domain** — `lib/site.ts` `url` drives `metadataBase`, the sitemap and share links.

## Design system

All tokens live in `app/globals.css` under `@theme` (Tailwind v4's CSS-first config — the v4 replacement for `tailwind.config.ts`):

- **Colors** — `copper-*` (accent, #C8763A base), `charcoal-*` (deep warm gray, #1A1A1A), `cream-*` (warm off-white, #FAF7F2). Default Tailwind palette is wiped, so nothing off-brand can creep in.
- **Type** — Fraunces (display serif) + Inter (body) via `next/font`, with `text-display-1/2/3`, `text-eyebrow`, `text-lead` utilities.
- **Radii / shadows / easing** — `rounded-card`, `rounded-field`, `shadow-card`, `shadow-card-hover`, `ease-(--ease-out-quart)`.

## Motion notes

- **Lenis** runs in `components/providers/smooth-scroll.tsx`, synced to GSAP's ticker.
- **GSAP ScrollTrigger** powers the pinned "Why us" section, parallax and the services timeline spine; all inside `gsap.matchMedia()` so they disable for `prefers-reduced-motion` (the pinned section falls back to a stacked list on mobile/reduced motion).
- **Framer Motion** handles entrances, staggers, counters, the magnetic buttons and route fades; `MotionConfig reducedMotion="user"` covers accessibility globally.

## Deployment

Ready for Vercel — no env vars needed. Every route is statically generated at build time.
