# Sprint 5 — Admin Panel & Revenue Validation Implementation Plan

> **For Hermes:** Use subagent-driven-development skill to implement this plan task-by-task.

**Goal:** Build the SaaS admin dashboard UI that connects to the existing 17+ admin API controllers, and validate revenue data accuracy.

**Architecture:** New Next.js 16 app (`admin-dashboard/`) in the oakit repo — mirrors the `client-dashboard/` pattern. Auth via admin login (`/v1/admin/auth/login`). All API calls go through `posapp.oakitsolutionsandsupplies.com/api/v1/admin/*` with Bearer token + XSRF. The backend admin API is already fully implemented (17 controllers, 50+ routes).

**Tech Stack:** Next.js 16, React 19, TypeScript, Tailwind CSS 4, existing admin API

---

## Pre-Sprint: Environment & API Verification

### Task 0.1: Verify admin API endpoints respond correctly

**Objective:** Confirm all admin API routes are live and return expected shapes.

**Steps:**
1. `curl` the admin health endpoint: `https://posapp.oakitsolutionsandsupplies.com/api/v1/admin/health`
2. Check that admin login works: `POST /api/v1/admin/auth/login` with super-admin credentials
3. Verify tenant list returns data: `GET /api/v1/admin/tenants` with Bearer token
4. Verify revenue dashboard: `GET /api/v1/admin/dashboard`
5. Verify audit logs: `GET /api/v1/admin/audit-logs`

**Commit:** None (verification only)

---

## Admin Panel: Auth & Layout

### Task 1.1: Create admin-dashboard app scaffold

**Objective:** Scaffold a new Next.js 16 app in `admin-dashboard/` with Tailwind 4, auth provider, and sidebar layout.

**Files:**
- Create: `admin-dashboard/` (Next.js 16 + React 19 + Tailwind 4)
- Create: `admin-dashboard/src/app/layout.tsx`
- Create: `admin-dashboard/src/features/auth/auth-provider.tsx`
- Create: `admin-dashboard/src/components/layout/sidebar.tsx`
- Create: `admin-dashboard/src/lib/api.ts`
- Create: `admin-dashboard/src/lib/format.ts` (reuse from client-dashboard)
- Create: `admin-dashboard/src/app/auth/login/page.tsx`
- Create: `admin-dashboard/src/app/dashboard/layout.tsx`
- Create: `admin-dashboard/src/app/dashboard/page.tsx`

**Step 1:** Scaffold Next.js app:
```bash
cd /home/apps/codebases/kilo/kilo/oakit
npx create-next-app@latest admin-dashboard --typescript --tailwind --app --no-src-dir --no-eslint --import-alias "@/*"
```

**Step 2:** Create admin auth provider (same pattern as client-dashboard but uses `/v1/admin/*` endpoints):
- `login(email, password)` → POST `/api/v1/admin/auth/login`
- `fetchUser()` → GET `/api/v1/admin/auth/me`
- `logout()` → POST `/api/v1/admin/auth/logout`

**Step 3:** Create admin API client (`lib/api.ts`):
- `apiFetch<T>(path, options)` with Bearer token + XSRF headers
- Global 401/419 interceptor (redirect to `/auth/login`)
- All admin endpoints: tenants, dashboard, subscriptions, revenue, commissions, audit-logs, settings, agents, client-users, tickets

**Step 4:** Create sidebar with nav items:
- Dashboard, Tenants, Client Users, Subscriptions, Agents, Commissions, Audit Logs, Settings, Health

**Step 5:** Create admin login page (same pattern as client-dashboard login)

**Step 6:** Verify: `npm run build` compiles, all routes exist

**Step 7:** Commit

```bash
git add admin-dashboard/
git commit -m "feat(s5): admin dashboard scaffold — auth provider, API client, sidebar, login page"
```

---

### Task 1.2: Create admin dashboard page (revenue metrics)

**Objective:** Build the admin dashboard showing MRR, ARR, tenant stats, and revenue trends.

**Files:**
- Modify: `admin-dashboard/src/app/dashboard/page.tsx`

**Step 1:** Fetch dashboard data from `GET /api/v1/admin/dashboard`

**Step 2:** Render:
- Tenant stats cards (total, active, trialing, suspended, cancelled)
- MRR with growth % (vs last month)
- Revenue this month / this year
- Active subscriptions count
- Open tickets count
- Pending commissions total
- Currency selector (for MRR conversion)

**Step 3:** Add a revenue trend mini-chart (optional — use recharts if available, otherwise simple bar)

**Step 4:** Verify: `npm run build`

**Step 5:** Commit

```bash
git add admin-dashboard/src/app/dashboard/page.tsx
git commit -m "feat(s5): admin dashboard — MRR, tenant stats, revenue metrics"
```

---

## Admin Panel: Tenant Management

### Task 2.1: Tenants list page

**Objective:** List all tenants with search, status filter, pagination.

**Files:**
- Create: `admin-dashboard/src/app/dashboard/tenants/page.tsx`
- Create: `admin-dashboard/src/app/dashboard/tenants/[id]/page.tsx`

**Step 1:** Create tenants list with:
- Search bar (name/slug)
- Status filter dropdown (active/trialing/suspended/cancelled)
- Table: name, slug, status, plan, created_at, actions
- Pagination
- Action buttons: View, Suspend, Activate, Cancel

**Step 2:** Create tenant detail page:
- Tenant info (name, slug, business_name, status)
- Subscription details (plan, status, amount, billing_cycle)
- Payment history
- Support tickets count
- Actions: Edit, Suspend/Activate/Cancel, Impersonate

**Step 3:** Verify: `npm run build`

**Step 4:** Commit

```bash
git add admin-dashboard/src/app/dashboard/tenants/
git commit -m "feat(s5): admin tenants list + detail page with actions"
```

---

### Task 2.2: Create tenant (admin creates new tenant)

**Objective:** Form to create a new tenant via `POST /api/v1/admin/tenants`.

**Files:**
- Create: `admin-dashboard/src/app/dashboard/tenants/new/page.tsx`

**Step 1:** Create form with fields: name, email, password, business_name, phone, plan (dropdown)

**Step 2:** On submit, call `POST /api/v1/admin/tenants` with validated data

**Step 3:** Show success/error feedback, redirect to tenant list

**Step 4:** Verify: `npm run build`

**Step 5:** Commit

```bash
git add admin-dashboard/src/app/dashboard/tenants/new/
git commit -m "feat(s5): create tenant form — admin can provision new tenants"
```

---

## Admin Panel: Subscription & Revenue Management

### Task 3.1: Subscriptions list page

**Objective:** List all subscriptions with plan details, status, and actions.

**Files:**
- Create: `admin-dashboard/src/app/dashboard/subscriptions/page.tsx`

**Step 1:** Fetch from `GET /api/v1/admin/subscriptions`

**Step 2:** Table: tenant name, plan, status, amount, billing_cycle, currency, created_at, actions

**Step 3:** Actions: Change plan, Cancel

**Step 4:** Commit

```bash
git add admin-dashboard/src/app/dashboard/subscriptions/
git commit -m "feat(s5): admin subscriptions list with change-plan/cancel actions"
```

---

### Task 3.2: Revenue analytics page

**Objective:** Dedicated revenue page with MRR, ARR, churn, LTV, trend, and by-plan breakdown.

**Files:**
- Create: `admin-dashboard/src/app/dashboard/revenue/page.tsx`

**Step 1:** Fetch from multiple endpoints: `/revenue/summary`, `/revenue/mrr`, `/revenue/arr`, `/revenue/churn`, `/revenue/ltv`, `/revenue/trend`, `/revenue/by-plan`

**Step 2:** Render:
- MRR/ARR cards with currency conversion
- Churn rate
- LTV
- Revenue trend (monthly bar chart)
- Revenue by plan (table or chart)

**Step 3:** Verify accuracy: compare MRR calculation (Subscription.sum('price_monthly')) vs actual PaymentTransaction sums

**Step 4:** Commit

```bash
git add admin-dashboard/src/app/dashboard/revenue/
git commit -m "feat(s5): revenue analytics page — MRR, ARR, churn, LTV, trend, by-plan"
```

---

## Admin Panel: Commissions & Agents

### Task 4.1: Commissions page

**Objective:** List commissions with approve/pay actions, show summary.

**Files:**
- Create: `admin-dashboard/src/app/dashboard/commissions/page.tsx`

**Step 1:** Fetch from `GET /api/v1/admin/commissions` + `GET /api/v1/admin/commissions/summary`

**Step 2:** Summary cards: total_pending, total_cleared, total_paid

**Step 3:** Table: agent name, tenant, amount, status, created_at, actions

**Step 4:** Actions: Approve (pending→cleared), Pay (pending/cleared→paid)

**Step 5:** Commit

```bash
git add admin-dashboard/src/app/dashboard/commissions/
git commit -m "feat(s5): commissions page — list, approve, pay with summary cards"
```

---

### Task 4.2: Agents page

**Objective:** List agents with performance data.

**Files:**
- Create: `admin-dashboard/src/app/dashboard/agents/page.tsx`
- Create: `admin-dashboard/src/app/dashboard/agents/[id]/page.tsx`

**Step 1:** List agents with name, email, referral_code, status

**Step 2:** Detail page with performance endpoint: `GET /api/v1/admin/agents/{id}/performance`

**Step 3:** Commit

```bash
git add admin-dashboard/src/app/dashboard/agents/
git commit -m "feat(s5): agents list + performance detail page"
```

---

## Admin Panel: Audit Logs & Settings

### Task 5.1: Audit logs page

**Objective:** List audit logs with filters and CSV export.

**Files:**
- Create: `admin-dashboard/src/app/dashboard/audit-logs/page.tsx`

**Step 1:** Fetch from `GET /api/v1/admin/audit-logs`

**Step 2:** Filters: action_group, user_type, search, date range (from/to)

**Step 3:** Table: user_name, user_type, action, subject_description, ip_address, timestamp

**Step 4:** Export button: `GET /api/v1/admin/audit-logs/export` → download CSV

**Step 5:** Commit

```bash
git add admin-dashboard/src/app/dashboard/audit-logs/
git commit -m "feat(s5): audit logs page — filters, search, CSV export"
```

---

### Task 5.2: Platform settings page

**Objective:** Edit platform settings (grouped key-value pairs).

**Files:**
- Create: `admin-dashboard/src/app/dashboard/settings/page.tsx`

**Step 1:** Fetch from `GET /api/v1/admin/settings`

**Step 2:** Render grouped settings (each group is a section with key-value inputs)

**Step 3:** Save: `PUT /api/v1/admin/settings` with changed values

**Step 4:** Commit

```bash
git add admin-dashboard/src/app/dashboard/settings/
git commit -m "feat(s5): platform settings page — grouped key-value editor"
```

---

## Admin Panel: Client Users & Tickets

### Task 6.1: Client users page

**Objective:** List client users with manage/suspend/activate actions.

**Files:**
- Create: `admin-dashboard/src/app/dashboard/client-users/page.tsx`

**Step 1:** Fetch from `GET /api/v1/admin/client-users`

**Step 2:** Table: name, email, company, status, subscription, created_at

**Step 3:** Actions: View, Suspend, Activate, Assign subscription

**Step 4:** Commit

---

### Task 6.2: Support tickets page

**Objective:** List and manage support tickets.

**Files:**
- Create: `admin-dashboard/src/app/dashboard/tickets/page.tsx`

**Step 1:** Fetch from `GET /api/v1/admin/tickets`

**Step 2:** Table: subject, client, status, priority, assigned_to, created_at

**Step 3:** Actions: Assign, Reply, Update status

**Step 4:** Commit

---

## Admin Panel: Desktop Licenses (S5.5)

### Task 7.1: Add desktop license admin routes

**Objective:** Add admin routes for desktop license management (list, revoke, offline-activation).

**Files:**
- Modify: `routes/admin.php`
- Create: `app/Http/Controllers/Api/V1/Admin/DesktopLicenseAdminController.php`

**Step 1:** Create DesktopLicenseAdminController with:
- `index()` — list licenses with filters (status, client, date range)
- `show($id)` — get license details
- `revoke($id)` — revoke a license
- `offlineActivation($id)` — generate offline activation token

**Step 2:** Add routes to admin.php:
```php
Route::get('desktop-licenses', [DesktopLicenseAdminController::class, 'index']);
Route::get('desktop-licenses/{license}', [DesktopLicenseAdminController::class, 'show']);
Route::post('desktop-licenses/{license}/revoke', [DesktopLicenseAdminController::class, 'revoke']);
Route::post('desktop-licenses/{license}/offline-activation', [DesktopLicenseAdminController::class, 'offlineActivation']);
```

**Step 3:** Verify: `php artisan route:list --path=admin/desktop`

**Step 4:** Commit

```bash
git add routes/admin.php app/Http/Controllers/Api/V1/Admin/DesktopLicenseAdminController.php
git commit -m "feat(s5): desktop license admin routes — list, show, revoke, offline-activation"
```

---

### Task 7.2: Desktop licenses admin page

**Objective:** Admin UI for desktop license management.

**Files:**
- Create: `admin-dashboard/src/app/dashboard/desktop-licenses/page.tsx`

**Step 1:** List licenses with filters (status, client, date)

**Step 2:** Actions: View details, Revoke, Generate offline activation

**Step 3:** Commit

---

## Post-Sprint: Verification & Deploy

### Task 8.1: Full build verification

**Objective:** Both the admin dashboard and marketing site build without errors.

**Steps:**
1. `cd admin-dashboard && npm run build`
2. `cd .. && npm run build` (marketing site)
3. Fix any TypeScript/build errors

---

### Task 8.2: Revenue accuracy validation

**Objective:** Verify the revenue calculations in RevenueController match actual data.

**Steps:**
1. Run `GET /api/v1/admin/dashboard` against live data
2. Manually verify MRR = sum of active subscription plan prices
3. Verify revenue_this_month = sum of successful PaymentTransactions this month
4. Verify churn rate calculation
5. Document any discrepancies

---

### Task 8.3: Plan doc update

**Objective:** Update `oakit-ecosystem-mvp-plan.md` with Sprint 5 results.

---

## File Change Summary

| Task | Files Created | Files Modified |
|---|---|---|
| S5 scaffold | `admin-dashboard/` (15+ files) | — |
| S5 tenants | `tenants/page.tsx`, `tenants/[id]/page.tsx`, `tenants/new/page.tsx` | — |
| S5 subscriptions | `subscriptions/page.tsx` | — |
| S5 revenue | `revenue/page.tsx` | — |
| S5 commissions | `commissions/page.tsx` | — |
| S5 agents | `agents/page.tsx`, `agents/[id]/page.tsx` | — |
| S5 audit logs | `audit-logs/page.tsx` | — |
| S5 settings | `settings/page.tsx` | — |
| S5 client users | `client-users/page.tsx` | — |
| S5 tickets | `tickets/page.tsx` | — |
| S5.5 desktop | `desktop-licenses/page.tsx` | `routes/admin.php`, new controller |

## Risks & Open Questions

1. **Admin auth:** The admin uses `auth:sanctum` + `super_admin` middleware. Need to verify the login flow works with the existing `AdminUser` model and Sanctum tokens.
2. **Desktop license model:** `DesktopLicense` model exists in `app/Models/` (classicpos DB), not landlord. Need to check if admin queries should use the main DB connection.
3. **Revenue accuracy:** The plan says "once subscription unification lands" — need to verify that `client_user_id` on subscriptions is properly populated for SaaS clients (vs old tenant-based subscriptions).
4. **No test framework in oakit:** The admin dashboard will have no tests initially (matches existing pattern). Playwright tests could be added in a future sprint.
