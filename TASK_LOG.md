# OAK IT Client Dashboard — Integration Task Log

## Date: July 18-22, 2026

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
│  - Marketing pages      │     │  - 19 client API endpoints   │     │  - Subscription view    │
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
| GET | `/api/v1/client/billing` | Billing history |

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
- `src/features/auth/auth-provider.tsx` — Sanctum token auth
- `src/lib/api.ts` — API client for all endpoints
- `src/config/nav-config.ts` — Dashboard navigation
- `src/app/dashboard/page.tsx` — Overview
- `src/app/dashboard/subscriptions/page.tsx` — Subscriptions
- `src/app/dashboard/services/page.tsx` — Services
- `src/app/dashboard/tickets/page.tsx` — Support tickets
- `src/app/dashboard/billing/page.tsx` — Billing
- `src/app/dashboard/profile/page.tsx` — Profile
- `src/components/layout/app-sidebar.tsx` — Sidebar navigation

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

- [ ] `https://oakitsolutionsandsupplies.com` → Pricing → "Get Started" on Basic → goes to `/auth/signup?plan=basic`
- [ ] Plans dropdown shows Basic ($700), Regular ($1,500), Advanced
- [ ] All 7 fields required, validation errors shown inline
- [ ] After submit → "Check Your Email" screen
- [ ] Verification email received (via Resend)
- [ ] Click link → `/auth/verify?token=xxx` → verified → redirected to dashboard
- [ ] Login at `/auth/signin` → blocked if unverified → resend option
- [ ] Dashboard shows subscription, services, tickets, billing
- [ ] Create ticket → appears in list
- [ ] Profile update works
- [ ] Logout works
