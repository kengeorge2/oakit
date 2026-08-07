# AGENTS.md — OAK IT Solutions Marketing Website

## Project

Marketing site for OAK IT Solutions (Kampala, Uganda). Next.js 14 App Router, TypeScript, Tailwind CSS 3, shadcn/ui (default style, slate theme).

**Live:** https://oakitsolutionsandsupplies.com · **Blog:** blog.oakitsolutionsandsupplies.com · **Dashboard:** dashboard.oakitsolutionsandsupplies.com · **API:** posapp.oakitsolutionsandsupplies.com

---

## Commands

```bash
npm run dev        # dev server (localhost:3000)
npm run build      # production build
npm run lint       # ESLint
bun install        # install (bun.lock present; npm also works)
```

No test framework is configured. No CI pipeline in this repo.

---

## Architecture

- `app/` — Next.js App Router pages. All pages are **server components** unless they need client interactivity.
- `components/` — Reusable UI. shadcn/ui components live in `components/ui/`.
- `lib/` — Server-side logic only (Ghost CMS client, Resend email, pricing/config, services).
- `scripts/` — One-off CLI scripts (blog content push). Run with Node, not browser.
- `client-dashboard/` — **Separate Next.js app** (auth subscriptions/tickets). Excluded from this tsconfig; developed independently.

---

## Routes

| Route | File | Notes |
|---|---|---|
| `/` | `app/page.tsx` | Hero → Pricing → Services → Testimonials → Blog → Mission → FAQ → Bootcamp → Contact |
| `/products` | `app/products/page.tsx` | ClassicPOS, QuizApp, Blog |
| `/about-us` | `app/about-us/page.tsx` | Company info |
| `/blog` | `app/blog/page.tsx` | Ghost CMS listing |
| `/blog/[slug]` | `app/blog/[slug]/page.tsx` | Individual post (DOMPurify-sanitized) |
| `/backend-stack` | `app/backend-stack/page.tsx` | Bootcamp curriculum |
| `/frontend-stack` | `app/frontend-stack/page.tsx` | Bootcamp curriculum |
| `/fullstack-learn-more` | `app/fullstack-learn-more/page.tsx` | Fullstack bootcamp |
| `/services/[slug]` | `app/services/[slug]/page.tsx` | Dynamic service detail (13 services) |

Legacy URLs (`/aboutUs`, `/Backendstack`, etc.) 301-redirect to the canonical kebab-case routes in `next.config.mjs`.

---

## Key Files

| File | Purpose |
|---|---|
| `app/layout.tsx` | Root layout — ThemeProvider (dark/light, default dark), Navbar, Footer, ToastProvider |
| `app/globals.css` | Tailwind base + custom section/card/animation classes |
| `components/ContactUs.tsx` | Contact form (client component) — submits to `/api/contact` |
| `components/ServicesPricing.tsx` | 3-tier pricing with monthly/annual toggle |
| `components/ServicesList.tsx` | 13-service grid with Lucide icons |
| `components/ToastProvider.tsx` | Client wrapper around Sonner Toaster (fixes hydration) |
| `lib/ghost.ts` | Ghost Content API client with in-memory cache (1h fresh / 24h stale) |
| `lib/email.ts` | Resend email: admin notification + user auto-reply |
| `lib/pricing.ts` | Pricing config — edit to change tiers/features |
| `lib/services.ts` | Service config — edit to add/change services |
| `app/api/contact/route.ts` | POST handler: validation, honeypot, rate limit (5/h per IP), Resend |
| `app/sitemap.ts` | Dynamic sitemap from services + Ghost posts |
| `scripts/push-blog-content.js` | Push blog posts to Ghost Admin API |

---

## Data Sources (non-obvious)

**Ghost CMS** — Blog posts and pages come from `@tryghost/content-api` (Content API v5). Key env vars in `.env.local`:
- `GHOST_URL` — Ghost instance URL
- `GHOST_CONTENT_KEY` — Content API key (26-char hex). **No `NEXT_PUBLIC_` prefix** — this is server-only.

**Resend** — Contact form emails. Key env vars:
- `RESEND_API_KEY`
- `CONTACT_EMAIL_TO` — comma-separated admin addresses
- `CONTACT_EMAIL_FROM` — from address (must be a verified domain in Resend)

**DOMPurify** — Ghost HTML blog content is sanitized with `isomorphic-dompurify` before rendering via `dangerouslySetInnerHTML`. Do not remove the sanitize call.

---

## Tailwind / Styling Conventions

- Dark mode via `next-themes` with `darkMode: ["class"]` in `tailwind.config.ts`.
- Custom section classes: `.section-dark`, `.section-dark-alt`, `.section-dark-bootcamp`, `.grid-overlay`, `.card-glass`, `.pricing-card`, `.btn-glow`, `.rv` (scroll reveal).
- `@apply` used heavily in `globals.css` for custom component classes.
- Icon library: `lucide-react`. All services in `lib/services.ts` reference Lucide icons.

---

## Contact Form Gotchas

1. **Honeypot field** — `honeypot` field in the form JSON is silently accepted (bots fill it). Real submissions omit it.
2. **Rate limiting** — 5 requests per hour per IP, in-memory Map. Clears on server restart.
3. **Admin email is non-fatal** — if `sendAdminNotification` fails, the user still sees success. Only `sendUserAutoReply` failure returns 500.
4. **Resend free tier** — `CONTACT_EMAIL_TO` must include the email used to sign up for Resend. Unverified recipient addresses will bounce.

---

## Blog Content Management

Blog posts are created via `scripts/push-blog-content.js` using the Ghost **Admin API** (`@tryghost/admin-api`, devDependency only). The script reads HTML from `blog-content/` and pushes to Ghost. To add a new post:
1. Write the HTML file in `blog-content/`
2. Add an entry to the `posts` array in the script
3. Run the script

The Content API (server-side only) reads posts at runtime with caching.

---

## Service Pages

13 services defined in `lib/services.ts`. Each gets an auto-generated detail page at `/services/[slug]`. To add a service:
1. Add entry to `services` array in `lib/services.ts` (slug, title, icon from lucide-react, features, benefits, CTA)
2. The page and sitemap update automatically — no new file needed.

---

## Pricing

3 tiers in `lib/pricing.ts`: Basic (UGX 700k/mo), Regular (UGX 1,500k/mo), Advanced (quote-only). Annual pricing has ~17% discount. Edit the config to change prices/features.

---

## Environment

Required vars (see `.env.local`):
```
GHOST_URL=https://blog.oakitsolutionsandsupplies.com
GHOST_CONTENT_KEY=<26-char hex>
RESEND_API_KEY=re_<key>
CONTACT_EMAIL_TO=admin1@example.com,admin2@example.com
CONTACT_EMAIL_FROM=website-form@notifications.oakitsolutionsandsupplies.com
NEXT_PUBLIC_API_URL=https://posapp.oakitsolutionsandsupplies.com/api/v1/client
```

---

## Remaining Known Issues

- `NEXT_PUBLIC_GHOST_CONTENT_KEY` — already fixed (now server-only `GHOST_CONTENT_KEY`)
- **Resend domain verification** — `notifications.oakitsolutionsandsupplies.com` verified in Resend; `CONTACT_EMAIL_FROM` must use this verified domain
- **Footer social links** — Twitter/LinkedIn/GitHub hrefs are `#`
- **Hardcoded production URLs** — scattered across components; extract to env vars when feasible
- **Loading states** — no `loading.tsx` on blog or service pages
- **client-dashboard** — admin Vue/Next.js pages for user and service management are missing (API exists)
