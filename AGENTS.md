# AGENTS.md — OAK IT Solutions Website

## Project Overview

Marketing website for **OAK IT Solutions and Supplies Ltd.**, an IT services company based in Kampala, Uganda. Built with Next.js 14 (App Router), TypeScript, Tailwind CSS, and shadcn/ui.

**Live URL:** https://oakitsolutionsandsupplies.com
**Blog URL:** https://blog.oakitsolutionsandsupplies.com
**Dashboard URL:** https://dashboard.oakitsolutionsandsupplies.com
**API URL:** https://posapp.oakitsolutionsandsupplies.com

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 14.2.35 (App Router) |
| Language | TypeScript 5 |
| UI | React 18, shadcn/ui (Radix UI) |
| Styling | Tailwind CSS 3.4.1 |
| Theming | next-themes (dark/light mode) |
| Icons | lucide-react |
| Email | Resend |
| Toast | Sonner |
| CMS/Blog | Ghost Content API (`@tryghost/content-api`) |

---

## Development Commands

```bash
npm run dev        # Start dev server (localhost:3000)
npm run build      # Production build
npm run lint       # ESLint check
```

---

## Routes

| Route | File | Description |
|---|---|---|
| `/` | `app/page.tsx` | Homepage — Hero, Pricing, Services, Testimonials, Blog, Mission, FAQ, Bootcamp, Contact |
| `/products` | `app/products/page.tsx` | Product showcase (ClassicPOS, QuizApp, Blog) |
| `/aboutUs` | `app/aboutUs/page.tsx` | Company info, history, milestones |
| `/blog` | `app/blog/page.tsx` | Blog listing (Ghost CMS) |
| `/blog/[slug]` | `app/blog/[slug]/page.tsx` | Individual blog post |
| `/Backendstack` | `app/Backendstack/page.tsx` | Backend track curriculum |
| `/Frontendstack` | `app/Frontendstack/page.tsx` | Frontend track curriculum |
| `/Fullstacklearnmore` | `app/Fullstacklearnmore/page.tsx` | Full-stack bootcamp details |
| `/services/[slug]` | `app/services/[slug]/page.tsx` | Service detail page (13 services) |
| `/api/contact` | `app/api/contact/route.ts` | Contact form API endpoint |

---

## Completed Work

### Commit 9895627 — Initial Gap Fixes (14 items)
- [x] Converted raw `**Markdown**` syntax to `<strong>` HTML in 3 bootcamp pages
- [x] Removed invalid `text-red` HTML attribute from ServicesPricing
- [x] Added missing `<ul>` wrapper around `<li>` elements in About page
- [x] Fixed invalid Tailwind class `dark:hover:bg-gray-750` → `dark:hover:bg-gray-700` in FAQ
- [x] Contact form now has loading state, success/error feedback, and mailto submission
- [x] "Get Quote" button in Advanced pricing card now links to contact section
- [x] Added `metadata` exports to 5 pages: About, Backendstack, Frontendstack, Fullstacklearnmore
- [x] Removed 80+ lines of dead/commented-out code from Logo.tsx
- [x] Deleted unused `Logo.module.css`
- [x] Removed 13 "Add more items here" placeholder comments from ServicesList
- [x] Removed `console.log` from ContactUs production code
- [x] Converted 3 bootcamp pages from client to server components
- [x] Standardized contact address between About page and Footer

### Commit 4adbefe — Contact Form Resend, Data-Driven Pricing, Service Pages
- [x] Created API route `/api/contact` with validation, honeypot spam protection, IP rate limiting
- [x] Integrated Resend for admin notification + user auto-reply emails
- [x] Added Sonner toast notifications for form feedback
- [x] Created `lib/pricing.ts` config with 3-tier pricing (Basic/Regular/Advanced)
- [x] Monthly/annual billing toggle with ~17% savings badge
- [x] Feature comparison checklist with Lucide Check icons
- [x] Pricing FAQ accordion below cards
- [x] Created `lib/services.ts` with 13 service categories + Lucide icons
- [x] Updated `ServicesList.tsx` with icons and links to detail pages
- [x] Created `/services/[slug]` detail pages (13 routes)
- [x] Updated sitemap with all service URLs

### Commit 9895627 — Contact Form Email Fixes
- [x] Fixed Resend lazy initialization (build was crashing without env var)
- [x] Added detailed server-side logging for debugging email delivery
- [x] Made admin email non-fatal (user still sees success if admin email fails)
- [x] Fixed React hydration error (#418/#423) by extracting Toaster to client wrapper
- [x] Changed `CONTACT_EMAIL_TO` to working email (Resend free tier restriction)

### Commit c2172cc — Ghost Blog Caching
- [x] Added in-memory cache layer with stale-while-revalidate pattern in `lib/ghost.ts`
- [x] Cache TTL: 1 hour fresh, 24 hours stale fallback
- [x] Added `revalidate = 3600` to homepage and Blog component
- [x] Blog pages now resilient to Ghost downtime

### Blog Content (via Ghost Admin API)
- [x] Created 3 full blog posts with ~900-1100 words each:
  - How Cloud-Based Accounting is Revolutionizing SME Financial Management
  - Top 5 Technology Challenges Facing Small Businesses in Uganda
  - Why Every Retail Business Needs a Modern POS System in 2026
- [x] Each post has SEO meta titles/descriptions, proper tags, CTAs

### Final Cleanup
- [x] Fixed invalid Tailwind class `hover:bg-gray-750` → `hover:bg-gray-700` in ServicesPricing FAQ
- [x] Added blog posts to sitemap (dynamic from Ghost API)
- [x] Removed unused files: `vercel.svg`, `next.svg`, `placeholder.svg`, `placeholder-avatar.jpg`
- [x] Removed unused shadcn/ui components: `input.tsx`, `label.tsx`, `textarea.tsx`
- [x] Moved `@tryghost/admin-api` to devDependencies

### Commit e5c275d — Client Dashboard CRUD Completion (July 24, 2026)
- [x] Fixed billing page data path (`billing?.transactions`)
- [x] Fixed subscriptions page array access (`subscriptions?.data`)
- [x] Fixed auth redirect (`/auth/sign-in` → `/auth/login`)
- [x] Added ticket close/reopen buttons + inline error display
- [x] Added subscription Change Plan modal + Cancel confirmation dialog
- [x] Added invoice modal with tax breakdown (subtotal, VAT 18%, total) + print
- [x] Rendered available services section with "Upgrade" CTA
- [x] Added active route highlighting in sidebar
- [x] Added "Forgot password?" link + `/auth/forgot-password` + `/auth/reset-password` pages
- [x] Removed 100ms `setTimeout` hack from auth provider
- [x] Added proper error handling across all pages
- [x] Removed ~40 dead template files (overview charts, nav components, hooks, types, UI stubs)
- [x] Fixed Tailwind CSS v4 PostCSS config
- [x] Added PayPal webhook signature verification
- [x] Removed raw token from forgotPassword API response

---

## Way Forward — Remaining Items

### High Priority
- [x] ~~**API Key Security** — `NEXT_PUBLIC_GHOST_CONTENT_KEY` is exposed to the browser. Move to server-only env var (remove `NEXT_PUBLIC_` prefix).~~ **Still open — needs attention**
- [x] ~~**Blog HTML Sanitization** — `dangerouslySetInnerHTML` for Ghost content has no sanitization. Add DOMPurify or equivalent.~~ **Still open — needs attention**
- [x] ~~**Resend Domain Verification** — Contact form uses `onboarding@resend.dev`. Verify `oakitsolutionsandsupplies.com` domain in Resend dashboard to send from `info@` address.~~ **Still open — emails not delivering**

### Medium Priority
- [ ] **Footer Social Links** — Twitter/X, LinkedIn, GitHub icons link to `#`. Update with real company social URLs when available.
- [ ] **Route Naming** — Inconsistent conventions: `aboutUs` (camelCase), `Backendstack` (PascalCase), `Fullstacklearnmore` (no separators). Standardize to kebab-case.
- [ ] **Loading States** — Add `loading.tsx` files for routes with server-side data fetching (blog pages).
- [ ] **Hardcoded URLs** — Production URLs are hardcoded in 10+ files. Extract to environment variables.
- [ ] **Missing Metadata** — No OpenGraph images configured for any pages.

### Low Priority
- [ ] **README.md** — Still the default create-next-app boilerplate. Replace with project-specific documentation.
- [ ] **`getTags()` in lib/ghost.ts** — Exported but never imported anywhere.
- [ ] **ServicesList Content** — Each service category shows only 3 items. Add more items as content becomes available.
- [ ] **Services CMS Migration** — Move services config from `lib/services.ts` to Ghost CMS for admin-editable content.

### New Items (discovered July 24, 2026)
- [ ] **Admin Vue Pages** — Client user management + OAK IT service management pages missing from POS Vue SPA (API exists, frontend doesn't)
- [ ] **Resend Email Delivery** — Verification emails not arriving. Domain `notifications.oakitsolutionsandsupplies.com` verified in Resend but from address may need updating in Vercel env vars
- [ ] **PayPal Live Config** — Currently using sandbox credentials; need to switch to live for production

---

## Environment Variables

```
NEXT_PUBLIC_GHOST_CONTENT_KEY=...   # Ghost CMS API key (currently exposed to client)
RESEND_API_KEY=re_...               # Resend API for contact form emails
CONTACT_EMAIL_TO=kengeorge2@yahoo.com  # Temp: Resend free tier can only send to signup email
CONTACT_EMAIL_FROM=Contact Form <onboarding@resend.dev>
```

Ghost API URL fallback: `https://blog.oakitsolutionsandsupplies.com`

---

## Key Files

| File | Purpose |
|---|---|
| `app/layout.tsx` | Root layout — Navbar, Footer, ThemeProvider, metadata, ToastProvider |
| `components/Navbar.tsx` | Fixed top nav, mobile hamburger, dark mode toggle |
| `components/Footer.tsx` | 4-column footer with nav, products, contact, social |
| `components/ContactUs.tsx` | Contact form with Resend API, honeypot, toast notifications |
| `components/ServicesPricing.tsx` | Data-driven pricing cards with monthly/annual toggle |
| `components/ServicesList.tsx` | 13-category grid with icons, links to detail pages |
| `components/ToastProvider.tsx` | Client wrapper for Sonner Toaster |
| `lib/ghost.ts` | Ghost CMS API client with stale-while-revalidate caching |
| `lib/email.ts` | Resend email templates (admin notification + auto-reply) |
| `lib/pricing.ts` | Pricing config (3 tiers, features, FAQ) |
| `lib/services.ts` | Service categories config (13 services with icons) |
| `lib/utils.ts` | `cn()` utility (clsx + tailwind-merge) |
| `app/api/contact/route.ts` | Contact form API with validation, rate limiting, honeypot |
| `app/services/[slug]/page.tsx` | Dynamic service detail pages |
| `app/sitemap.ts` | Dynamic sitemap with services + blog posts |
| `scripts/push-blog-content.js` | Ghost Admin API script for blog content management |
