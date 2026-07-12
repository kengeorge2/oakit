# AGENTS.md — OAK IT Solutions Website

## Project Overview

Marketing website for **OAK IT Solutions and Supplies Ltd.**, an IT services company based in Kampala, Uganda. Built with Next.js 14 (App Router), TypeScript, Tailwind CSS, and shadcn/ui.

**Live URL:** https://oakitsolutionsandsupplies.com
**Blog URL:** https://blog.oakitsolutionsandsupplies.com

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 14.2.35 (App Router) |
| Language | TypeScript 5 |
| UI | React 18, shadcn/ui (Radix UI) |
| Styling | Tailwind CSS 3.4.1 |
| Theming | next-themes (dark/light mode) |
| Icons | react-icons |
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

---

## Completed Work (Commit 9895627)

All 14 identified gaps have been patched:

### Visual Bugs Fixed
- [x] Converted raw `**Markdown**` syntax to `<strong>` HTML in 3 bootcamp pages
- [x] Removed invalid `text-red` HTML attribute from ServicesPricing
- [x] Added missing `<ul>` wrapper around `<li>` elements in About page
- [x] Fixed invalid Tailwind class `dark:hover:bg-gray-750` → `dark:hover:bg-gray-700` in FAQ

### Functionality
- [x] Contact form now has loading state, success/error feedback, and mailto submission
- [x] "Get Quote" button in Advanced pricing card now links to contact section

### SEO
- [x] Added `metadata` exports to 5 pages: About, Backendstack, Frontendstack, Fullstacklearnmore, Products (already had)

### Code Quality
- [x] Removed 80+ lines of dead/commented-out code from Logo.tsx
- [x] Deleted unused `Logo.module.css`
- [x] Removed 13 "Add more items here" placeholder comments from ServicesList
- [x] Removed `console.log` from ContactUs production code
- [x] Converted 3 bootcamp pages from client to server components
- [x] Standardized contact address between About page and Footer

---

## Way Forward — Remaining Items

### High Priority
- [ ] **Contact Form Backend** — Current implementation uses `mailto:` fallback. Add a real API route or integrate with a service (Formspree, Resend, SendGrid) for server-side email delivery.
- [ ] **API Key Security** — `NEXT_PUBLIC_GHOST_CONTENT_KEY` is exposed to the browser. Move to server-only env var (remove `NEXT_PUBLIC_` prefix).
- [ ] **Blog HTML Sanitization** — `dangerouslySetInnerHTML` for Ghost content has no sanitization. Add DOMPurify or equivalent.

### Medium Priority
- [ ] **Footer Social Links** — Twitter/X, LinkedIn, GitHub icons link to `#`. Update with real company social URLs when available.
- [ ] **Route Naming** — Inconsistent conventions: `aboutUs` (camelCase), `Backendstack` (PascalCase), `Fullstacklearnmore` (no separators). Standardize to kebab-case: `about-us`, `backend-stack`, `frontend-stack`, `fullstack-learn-more`.
- [ ] **Loading States** — Add `loading.tsx` files for routes with server-side data fetching (blog pages).
- [ ] **Hardcoded URLs** — Production URLs (`oakitsolutionsandsupplies.com`, Zoho form URL) are hardcoded in 10+ files. Extract to environment variables.
- [ ] **Missing Metadata** — Individual blog post pages use `generateMetadata` (fine), but no OpenGraph images are configured.

### Low Priority
- [ ] **README.md** — Still the default create-next-app boilerplate. Replace with project-specific documentation.
- [ ] **Unused shadcn/ui Components** — `input.tsx`, `label.tsx`, `textarea.tsx` exist but are unused (ContactUs defines its own inline versions).
- [ ] **`getTags()` in lib/ghost.ts** — Exported but never imported anywhere.
- [ ] **ServicesList Content** — Each service category shows only 3 items with placeholder comments removed. Add more items as content becomes available.

---

## Environment Variables

```
NEXT_PUBLIC_GHOST_CONTENT_KEY=...   # Ghost CMS API key (currently exposed to client)
```

Ghost API URL fallback: `https://blog.oakitsolutionsandsupplies.com`

---

## Key Files

| File | Purpose |
|---|---|
| `app/layout.tsx` | Root layout — Navbar, Footer, ThemeProvider, metadata |
| `components/Navbar.tsx` | Fixed top nav, mobile hamburger, dark mode toggle |
| `components/Footer.tsx` | 4-column footer with nav, products, contact, social |
| `components/ContactUs.tsx` | Contact form with validation and mailto submission |
| `components/ServicesPricing.tsx` | 3-tier pricing cards (Basic/Regular/Advanced) |
| `components/ServicesList.tsx` | 13-category grid of IT services |
| `lib/ghost.ts` | Ghost CMS API client with error handling |
| `lib/utils.ts` | `cn()` utility (clsx + tailwind-merge) |
