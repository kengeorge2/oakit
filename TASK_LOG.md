# OAK IT Client Dashboard — Integration Task Log

## Date: July 18-24, 2026

---

## What Was Built

Full SaaS client dashboard system for OAK IT Solutions customers. When users subscribe to IT services (Basic/Regular/Advanced), they get access to a dashboard to manage subscriptions, view services, create support tickets, and manage their account. Admin can manage all client users, services, and subscriptions.

---

## Architecture

```
┌─────────────────────────┐     ┌──────────────────────────────┐     ┌─────────────────────────┐
│  OAK IT Website         │     │  ClassicPOS Laravel API      │     │  Client Dashboard       │
│  (Vercel)               │────▶│  (Docker)                    │◀────│  (Docker)               │
│                         │     │                              │     │                         │
│  oakitsolutionsandsupplies.com  │  posapp.oakitsolutionsandsupplies.com  │  dashboard.oakitsolutionsandsupplies.com  │
│  - Marketing pages      │     │  - 31 client API endpoints │     │  - Subscription view    │
│  - Signup/Signin        │     │  - Auth + email verification │     │  - Service management   │
│  - Pricing CTAs         │     │  - Plans, services, tickets  │     │  - Support tickets      │
│  - Email via Resend     │     │  - PostgreSQL (landlord DB)  │     │  - Billing, profile     │
└─────────────────────────┘     └──────────────────────────────┘     └─────────────────────────┘
```

---

## Database (PostgreSQL — landlord DB: `classicpos_landlord`)

### New Tables

| Table | Purpose |
|-------|---------|
| `client_users` | Client accounts (name, email, password, company_name, company_phone, email_verified_at) |
| `email_verifications` | Email verification tokens (token, expires_at, used_at) |
| `oakit_services` | 13 IT services (slug, title, features, benefits) |
| `oakit_plan_services` | Which services each plan includes (pivot) |

### Modified Tables

| Table | Change |
|-------|--------|
| `subscription_plans` | Added `type` column (`pos` or `oakit`) |
| `tenant_subscriptions` | Added `client_user_id` column, made `tenant_id` and `ends_at` nullable |

### Seeded Data

| Data | Count |
|------|-------|
| OAK IT Plans | 3 (Basic $700/mo, Regular $1,500/mo, Advanced custom) |
| OAK IT Services | 13 (Automation, AI, Database, Cybersecurity, etc.) |
| Plan-Service Links | Basic=5 services, Regular=13, Advanced=13 |

---

## API Endpoints (Laravel — `routes/client.php`)

### Public (no auth)
| Method | Endpoint | Purpose |
|--------|----------|---------|
| POST | `/api/v1/client/auth/register` | Create account (returns verification_required) |
| POST | `/api/v1/client/auth/login` | Login (blocks unverified) |
| POST | `/api/v1/client/auth/generate-verification-token` | Generate email verification token |
| POST | `/api/v1/client/auth/verify-email` | Verify email with token |
| POST | `/api/v1/client/auth/forgot-password` | Send password reset email |
| POST | `/api/v1/client/auth/reset-password` | Reset password with token |
| GET | `/api/v1/client/plans` | List OAK IT plans |
| GET | `/api/v1/client/services` | List all OAK IT services |

### Protected (auth:sanctum + client middleware)
| Method | Endpoint | Purpose |
|--------|----------|---------|
| GET | `/api/v1/client/auth/me` | Current user profile |
| PUT | `/api/v1/client/auth/profile` | Update profile |
| PUT | `/api/v1/client/auth/change-password` | Change password |
| POST | `/api/v1/client/auth/logout` | Logout |
| GET | `/api/v1/client/dashboard` | Dashboard overview stats |
| GET | `/api/v1/client/subscriptions` | List subscriptions |
| GET | `/api/v1/client/subscriptions/{id}` | Subscription detail |
| GET | `/api/v1/client/services/subscribed` | Client's subscribed services |
| GET | `/api/v1/client/tickets` | List support tickets |
| POST | `/api/v1/client/tickets` | Create support ticket |
| GET | `/api/v1/client/tickets/{id}` | Ticket detail |
| POST | `/api/v1/client/tickets/{id}/reply` | Reply to ticket |
| POST | `/api/v1/client/tickets/{id}/close` | Close ticket |
| POST | `/api/v1/client/tickets/{id}/reopen` | Reopen ticket |
| PUT | `/api/v1/client/subscriptions/{id}/change-plan` | Change subscription plan |
| POST | `/api/v1/client/subscriptions/{id}/cancel` | Cancel subscription |
| GET | `/api/v1/client/billing` | Billing history |
| POST | `/api/v1/client/billing/checkout` | Create PayPal checkout |
| POST | `/api/v1/client/billing/paypal/capture/{orderId}` | Capture PayPal payment |
| GET | `/api/v1/client/billing/status/{orderId}` | Check payment status |
| GET | `/api/v1/client/billing/invoice/{transactionId}` | Get invoice data |

### Webhook (no auth — called by PayPal)
| Method | Endpoint | Purpose |
|--------|----------|---------|
| POST | `/api/v1/client/billing/paypal/webhook` | PayPal webhook (with signature verification) |
| GET | `/api/v1/client/billing/paypal/callback` | PayPal return URL redirect |

---

## Files Created/Modified

### Laravel Backend (`D:\kilo\poslavalel`)

**New files:**
- `backend/database/migrations/landlord/2026_07_15_000001_create_oakit_services_table.php`
- `backend/database/migrations/landlord/2026_07_15_000002_create_client_users_table.php`
- `backend/database/migrations/landlord/2026_07_15_000003_add_oakit_type_to_subscription_plans_table.php`
- `backend/database/migrations/landlord/2026_07_18_000001_add_client_user_id_to_tenant_subscriptions_table.php`
- `backend/database/migrations/landlord/2026_07_18_000002_make_tenant_id_nullable_and_add_client_user_id.php`
- `backend/database/migrations/landlord/2026_07_18_000003_make_ends_at_nullable_in_tenant_subscriptions.php`
- `backend/database/migrations/landlord/2026_07_19_000001_create_email_verifications_table.php`
- `backend/app/Models/Landlord/ClientUser.php`
- `backend/app/Models/Landlord/OakitService.php`
- `backend/app/Models/Landlord/OakitPlanService.php`
- `backend/app/Models/Landlord/EmailVerification.php`
- `backend/app/Http/Middleware/EnsureClientUser.php`
- `backend/app/Http/Controllers/Api/V1/Client/ClientAuthController.php`
- `backend/app/Http/Controllers/Api/V1/Client/ClientDashboardController.php`
- `backend/app/Http/Controllers/Api/V1/Client/ClientSubscriptionController.php`
- `backend/app/Http/Controllers/Api/V1/Client/ClientServiceController.php`
- `backend/app/Http/Controllers/Api/V1/Client/ClientTicketController.php`
- `backend/app/Http/Controllers/Api/V1/Client/ClientBillingController.php`
- `backend/routes/client.php`
- `backend/database/seeders/OakItSeeder.php`

**Modified files:**
- `backend/app/Models/Landlord/Subscription.php` — added `client_user_id` fillable + `clientUser()` relationship
- `backend/app/Models/Landlord/SubscriptionPlan.php` — added `type` fillable + `oakitServices()` relationship
- `backend/app/Http/Middleware/TenantResolution.php` — skip client routes
- `backend/bootstrap/app.php` — registered client routes + `client` middleware alias
- `backend/database/seeders/DatabaseSeeder.php` — added OakItSeeder
- `docker-compose.yml` — added client-dashboard service (port 3004), added DB credentials, added CORS domain

### OAK IT Website (`D:\kilo\oakit`)

**New files:**
- `app/auth/signup/page.tsx` — Signup form with 7 required fields + plan pre-selection
- `app/auth/signup/layout.tsx` — Metadata
- `app/auth/signin/page.tsx` — Login with verification_required handling
- `app/auth/signin/layout.tsx` — Metadata
- `app/auth/verify/page.tsx` — Email verification page
- `app/auth/verify/layout.tsx` — Metadata
- `app/api/auth/send-verification/route.ts` — Gets token from Laravel, sends email via Resend
- `app/api/auth/verify-email/route.ts` — Proxies verify to Laravel

**Modified files:**
- `lib/pricing.ts` — Basic/Regular CTAs link to `/auth/signup?plan=...`
- `components/ServicesPricing.tsx` — Advanced stays as contact form

### Client Dashboard (Docker — `D:\kilo\oakit\client-dashboard`)

**Built from `next-shadcn-dashboard-starter` template. Key files:**
- `src/features/auth/auth-provider.tsx` — Sanctum token auth, exposes `fetchUser` in context
- `src/lib/api.ts` — API client for all 31 endpoints
- `src/app/dashboard/page.tsx` — Overview (subscription, stats, recent tickets)
- `src/app/dashboard/subscriptions/page.tsx` — View subscriptions + Change Plan modal + Cancel confirmation
- `src/app/dashboard/services/page.tsx` — Active services + available services with upgrade CTA
- `src/app/dashboard/tickets/page.tsx` — Tickets CRUD + close/reopen + inline error display
- `src/app/dashboard/billing/page.tsx` — Payment history + invoice modal with tax breakdown
- `src/app/dashboard/profile/page.tsx` — Profile edit + password change
- `src/app/auth/login/page.tsx` — Login with forgot password link
- `src/app/auth/register/page.tsx` — Registration with plan selector
- `src/app/auth/forgot-password/page.tsx` — **NEW** — Email input → reset link sent
- `src/app/auth/reset-password/page.tsx` — **NEW** — Token+email from URL → new password form
- `src/components/layout/sidebar.tsx` — Active route highlighting with `usePathname()`
- `src/components/layout/page-container.tsx` — Reusable page wrapper with title/description/action

---

## Deployment

| Component | Where | URL |
|-----------|-------|-----|
| OAK IT Website | Vercel | `oakitsolutionsandsupplies.com` |
| Client Dashboard | Docker + Cloudflare Tunnel | `dashboard.oakitsolutionsandsupplies.com` → `localhost:3004` |
| Laravel API | Docker + Cloudflare Tunnel | `posapp.oakitsolutionsandsupplies.com` |
| PostgreSQL | Docker | `localhost:15444` (host) / `5444` (container) |

### Cloudflare Tunnel Routes
| Hostname | Service |
|----------|---------|
| `dashboard.oakitsolutionsandsupplies.com` | `http://localhost:3004` |
| `posapp.oakitsolutionsandsupplies.com` | `https://127.0.0.1:9099` |
| `pos.oakitsolutionsandsupplies.com` | `http://localhost:3002` |
| `blog.oakitsolutionsandsupplies.com` | `http://localhost:2368` |

---

## Bugs Fixed During Development

1. **Duplicate `BelongsToMany` import** in `SubscriptionPlan.php` — removed duplicate
2. **Route cache stale** — routes not loading, cleared with `php artisan route:clear`
3. **Missing DB credentials** in docker-compose — `DB_USERNAME`, `DB_PASSWORD`, `DB_DATABASE` not passed to container
4. **ClientUser extended wrong parent** — was `User` (tenant model), fixed to `Authenticatable` (base auth model)
5. **Validation using wrong DB** — `unique:client_users` hitting tenant DB, fixed with `unique:landlord.client_users`
6. **`tenant_id` NOT NULL** — `tenant_subscriptions` required tenant_id, made nullable for client users
7. **`ends_at` NOT NULL** — subscription required end date, made nullable + added `ends_at` to registration
8. **TenantResolution intercepting client routes** — added skip for `/v1/client` paths
9. **Vercel build failing** — `client-dashboard/` folder inside oakit repo caused TypeScript errors, removed
10. **`useSearchParams` without Suspense** — Next.js 14 requires Suspense boundary, wrapped in Suspense
11. **CORS missing oakitsolutionsandsupplies.com** — browser blocked plans fetch, added to CORS allowed origins
12. **Laravel error response format** — frontend expected string, got nested object `{"error":{"details":{...}}}`, fixed parsing
13. **React crash rendering object** — `setError(data.error)` where error was object, now extracts message string
14. **Billing page always empty** — Checked `billing?.data` but API returns `{transactions: [...]}`, fixed to `billing?.transactions`
15. **Subscriptions page crash** — Expected plain array but API returns Laravel paginated `{data: [...]}`, fixed with fallback
16. **Auth redirect 404** — Redirected to `/auth/sign-in` (non-existent), fixed to `/auth/login`
17. **Tailwind CSS v4 build failure** — Missing `postcss.config.mjs` + outdated `@tailwind` directives, fixed with `@import "tailwindcss"`
18. **Missing `public/` directory** — Docker build failed without it, created empty directory
19. **`fetchUser` type mismatch** — Auth context declared `() => Promise<boolean>` but function takes optional token param, fixed type
20. **`useSearchParams` without Suspense** — Reset-password page needed Suspense boundary, wrapped in `<Suspense>`
21. **Dead template code blocking build** — ~40 unused files with broken imports (missing UI modules), deleted all

---

## Environment Variables

### OAK IT Website (Vercel)
```
NEXT_PUBLIC_API_URL=https://posapp.oakitsolutionsandsupplies.com/api/v1/client
RESEND_API_KEY=re_...
CONTACT_EMAIL_FROM=OAK IT Solutions <onboarding@resend.dev>
```

### Client Dashboard (Docker)
```
NEXT_PUBLIC_API_URL=https://posapp.oakitsolutionsandsupplies.com/api/v1/client
```

### Laravel Backend (Docker)
```
DB_CONNECTION=pgsql
DB_HOST=db
DB_PORT=5444
DB_DATABASE=classicpos
DB_USERNAME=classicpos
DB_PASSWORD=secret
CORS_ALLOWED_ORIGINS=https://posapp.oakitsolutionsandsupplies.com,https://pos.oakitsolutionsandsupplies.com,https://dashboard.oakitsolutionsandsupplies.com
```

---

## How to Restart Services

```bash
# Restart everything
cd D:\kilo\poslavalel
docker compose up -d --force-recreate

# Restart just the client dashboard
docker compose up -d --force-recreate client-dashboard

# Restart just the Laravel app
docker compose up -d --force-recreate app

# Clear Laravel caches
docker exec classicpos-app php artisan route:clear
docker exec classicpos-app php artisan config:clear
docker exec classicpos-app php artisan cache:clear
```

---

## Phase 1-5 Complete (July 22, 2026)

### Phase 1: Bug Fixes
- Fixed `sender_type` enum — added `'client'` to CHECK constraint
- Fixed `client_user_id` not in SupportTicket fillable
- Fixed billing controller to return subscription data
- Added `client_user_id`, `tax_amount`, `tax_percent`, `subtotal` to payment_transactions
- Created `password_resets` table

### Phase 2: Client CRUD
- Added ticket close/reopen endpoints
- Added forgot password with Resend email
- Added subscription change-plan and cancel
- Expanded billing to show subscriptions + transactions

### Phase 3: PayPal Integration
- Client checkout endpoint (creates PayPal order)
- PayPal callback handler (activates subscription on success)
- PayPal capture endpoint
- PayPal webhook handler
- Invoice endpoint with tax breakdown

### Phase 4+5: Admin Management
- Client User CRUD (list, view, update, suspend, activate, delete)
- Assign custom subscription with status, amount, notes
- OAK IT Service CRUD
- Plan-service mapping management

### Phase 6: Dashboard CRUD Completion (July 24, 2026)

**Critical bug fixes:**
- Fixed billing page data path (`billing?.transactions`)
- Fixed subscriptions page array access (`subscriptions?.data`)
- Fixed auth redirect (`/auth/sign-in` → `/auth/login`)

**Feature completion:**
- Tickets: added close/reopen buttons, replaced `alert()` with inline error/success display
- Subscriptions: added Change Plan modal (plan selector + billing cycle toggle) + Cancel confirmation dialog
- Billing: added invoice modal with tax breakdown (subtotal, VAT 18%, total) + print button
- Services: rendered available services section with "Upgrade" CTA for non-subscribed services
- Sidebar: active route highlighting with `usePathname()`
- Login: added "Forgot password?" link
- New pages: `/auth/forgot-password` + `/auth/reset-password` (with Suspense boundary)
- Auth provider: removed 100ms `setTimeout` hack, exposed `fetchUser` in context
- Profile: shows "Email cannot be changed" hint, refreshes user data after save
- All pages: replaced silent `.catch(() => {})` with proper error state display

**Backend security fixes:**
- PayPal webhook: added signature verification via `$this->paypal->verifyWebhook()`
- Forgot password: removed raw token from API response (was line 303)

**Dead code cleanup:**
- Removed ~40 unused template files (overview charts, nav components, hooks, types, UI stubs)
- Fixed Tailwind CSS v4 PostCSS config (`postcss.config.mjs` + `globals.css`)
- Added `formatBytes` utility for `file-uploader.tsx` compatibility (later deleted as dead code)
- Created `public/` directory for Docker build

---

## Known Issues

### Email Delivery (Resend)
- Verification emails not delivering from sandbox address
- User needs to verify domain in Resend dashboard and update Vercel env vars
- Workaround: Admin can manually verify users

### React Hydration Warnings (#418, #423)
- Console warnings on page load — cosmetic only, doesn't break functionality

---

## Testing Checklist

### Signup Flow
- [ ] `https://oakitsolutionsandsupplies.com` → Pricing → "Get Started" on Basic → goes to `/auth/signup?plan=basic`
- [ ] Plans dropdown shows Basic ($700), Regular ($1,500), Advanced
- [ ] All 7 fields required, validation errors shown inline
- [ ] After submit → "Check Your Email" screen with verification link

### Email Verification
- [ ] Verification email received (via Resend) — OR admin verifies manually:
  ```php
  docker exec classicpos-app php artisan tinker
  DB::connection('landlord')->table('client_users')->where('email','user@email.com')->update(['email_verified_at'=>now()]);
  ```
- [ ] Click link → `/auth/verify?token=xxx` → verified → redirected to dashboard

### Login Flow
- [ ] Login at `/auth/login` → blocked if unverified → "Resend verification email" option
- [ ] Login with wrong password → shows error message
- [ ] Login rate limited after 5 failed attempts → shows "try again in X minutes"
- [ ] "Forgot password?" link visible on login page → goes to `/auth/forgot-password`
- [ ] Enter email → "If an account exists, a reset link has been sent"
- [ ] Reset link → `/auth/reset-password?token=xxx&email=xxx` → set new password → redirect to login

### Dashboard Overview
- [ ] Dashboard shows current plan name, status, amount
- [ ] Stats cards: Subscribed Services, Open Tickets, Total Tickets
- [ ] Recent tickets list with status badges
- [ ] No subscription → shows "View plans and subscribe" link

### Services Page
- [ ] Active services shown with "Active" badge and features list
- [ ] Available services shown with "Upgrade to access" CTA
- [ ] No services → "Subscribe to a plan to get started" link

### Tickets (CRUD)
- [ ] Create ticket → subject, description, priority, category → appears in list
- [ ] Click ticket → shows full message thread
- [ ] Reply to ticket → message appears in thread
- [ ] Close ticket → status changes to "closed", system message added
- [ ] Reopen ticket → status changes to "open", system message added
- [ ] Closed ticket → reply box hidden, "reopen" button shown
- [ ] Error messages shown inline (not `alert()`)

### Subscriptions (CRUD)
- [ ] Shows plan name, billing cycle, status, amount, dates
- [ ] "Change Plan" button → modal with plan selector + billing cycle toggle
- [ ] Confirm change → plan updates, modal closes, success message shown
- [ ] "Cancel Subscription" button → confirmation dialog with warning
- [ ] Confirm cancel → subscription cancelled, status updated
- [ ] Active/trialing subscriptions show action buttons; cancelled don't

### Billing (CRUD)
- [ ] Payment history table with date, description, amount, tax, total, status, method
- [ ] "View Invoice" button on completed transactions → invoice modal
- [ ] Invoice shows: company info, client info, plan, dates, line items, subtotal, VAT (18%), total
- [ ] Print Invoice button works
- [ ] Pending/failed transactions don't show invoice button

### Profile
- [ ] Edit name, company name, company phone → "Profile updated successfully"
- [ ] Email field disabled with "Email cannot be changed" hint
- [ ] Change password → current password + new password + confirm → success message
- [ ] Wrong current password → error shown

### Logout
- [ ] Logout → clears token, redirects to `/auth/login`

### Sidebar Navigation
- [ ] Current page highlighted in sidebar
- [ ] All 6 nav items work: Dashboard, My Plan, Services, Tickets, Billing, Profile
