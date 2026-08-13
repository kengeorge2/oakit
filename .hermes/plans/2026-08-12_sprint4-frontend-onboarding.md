# Sprint 4 — Frontend Onboarding Funnel Implementation Plan

> **For Hermes:** Use subagent-driven-development skill to implement this plan task-by-task.

**Goal:** Complete the SaaS onboarding funnel — from marketing CTA through registration, verification, plan checkout, and first-login wizard — in the oakit Next.js monorepo (marketing site + client dashboard).

**Architecture:** Two Next.js 14 App Router apps in one repo. Marketing site (`app/`) drives signups via CTA links to the client dashboard (`client-dashboard/`). Sprint 4 adds: token-based auth handoff, checkout flow, central currency formatting, onboarding wizard, marketing fixes, global error handling, and E2E tests.

**Tech Stack:** Next.js 14, React 18, TypeScript, Tailwind CSS 3, shadcn/ui, Playwright (E2E), existing API at `posapp.oakitsolutionsandsupplies.com/api/v1/client`

---

## Pre-Sprint: Environment & Dependencies

### Task 0.1: Verify dev environment

**Objective:** Ensure the oakit project builds and dev server runs.

**Files:**
- `client-dashboard/package.json` (read-only)
- `package.json` (read-only)

**Steps:**
1. `cd /home/apps/codebases/kilo/kilo/oakit && npm run build` — verify marketing site builds
2. `cd client-dashboard && npm run build` — verify dashboard builds
3. Note any build errors; fix before proceeding

**Commit:** None (verification only)

---

## F-1: Auth Handoff — `?token=&redirect=`

### Task 1.1: Add token-based auto-login to AuthProvider

**Objective:** When the URL contains `?token=xxx&redirect=/path`, store the token, fetch the user, and redirect — enabling email verification handoff and post-registration auto-login.

**Files:**
- Modify: `client-dashboard/src/features/auth/auth-provider.tsx`

**Step 1: Add token extraction in useEffect**

In the existing `useEffect` that runs on mount (line ~95), add URL param handling BEFORE the existing localStorage check:

```typescript
useEffect(() => {
  if (mountedRef.current) return;
  mountedRef.current = true;

  // F-1: Token handoff from URL (email verification, post-registration)
  const urlParams = new URLSearchParams(window.location.search);
  const urlToken = urlParams.get('token');
  const redirectPath = urlParams.get('redirect') || '/dashboard';

  if (urlToken) {
    localStorage.setItem('auth_token', urlToken);
    setToken(urlToken);
    // Clean URL (remove token from address bar)
    window.history.replaceState({}, '', window.location.pathname);
    fetchUser(urlToken).then((ok) => {
      if (ok) router.push(redirectPath);
      setIsLoading(false);
    }).catch(() => {
      router.push('/auth/login');
      setIsLoading(false);
    });
    return;
  }

  // Existing localStorage / cookie logic...
  const storedToken = localStorage.getItem('auth_token');
  // ...rest unchanged
}, [fetchUser, router]);
```

**Step 2: Verify**

1. Start dashboard dev server: `cd client-dashboard && npm run dev`
2. Navigate to `http://localhost:3000/dashboard?token=fake&redirect=/dashboard`
3. Expected: token stored, fetch fails, redirected to `/auth/login`

**Step 3: Commit**

```bash
git add client-dashboard/src/features/auth/auth-provider.tsx
git commit -m "feat(f1): auth handoff — consume ?token=&redirect= in AuthProvider"
```

---

### Task 1.2: Create `/auth/verify` page in dashboard

**Objective:** A dedicated verify page that accepts `?token=` and shows a success/error state, then redirects.

**Files:**
- Create: `client-dashboard/src/app/auth/verify/page.tsx`

**Step 1: Create the verify page**

```tsx
'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/features/auth/auth-provider';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';

export default function VerifyPage() {
  const { fetchUser } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const [message, setMessage] = useState('');

  useEffect(() => {
    const token = searchParams.get('token');
    if (!token) {
      setStatus('error');
      setMessage('No verification token provided.');
      return;
    }

    // Store token and fetch user
    localStorage.setItem('auth_token', token);
    fetchUser(token)
      .then((ok) => {
        if (ok) {
          setStatus('success');
          setMessage('Email verified! Redirecting to your dashboard...');
          setTimeout(() => router.push('/dashboard'), 2000);
        } else {
          setStatus('error');
          setMessage('Invalid or expired verification link.');
        }
      })
      .catch(() => {
        setStatus('error');
        setMessage('Verification failed. Please try again or contact support.');
      });
  }, [searchParams, fetchUser, router]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4">
      <div className="w-full max-w-md space-y-6 text-center">
        <h1 className="text-2xl font-bold">OAK IT Solutions</h1>
        {status === 'loading' && (
          <div className="space-y-3">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto"></div>
            <p className="text-muted-foreground">Verifying your email...</p>
          </div>
        )}
        {status === 'success' && (
          <div className="rounded-lg border bg-green-500/10 p-6 text-green-400">
            <p>{message}</p>
          </div>
        )}
        {status === 'error' && (
          <div className="space-y-4">
            <div className="rounded-lg border bg-destructive/10 p-6 text-destructive">
              <p>{message}</p>
            </div>
            <Link href="/auth/login" className="text-primary hover:underline">
              Go to Login
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
```

**Step 2: Verify**

1. Navigate to `http://localhost:3000/auth/verify?token=fake`
2. Expected: shows "Verifying..." then "Invalid or expired" error state

**Step 3: Commit**

```bash
git add client-dashboard/src/app/auth/verify/page.tsx
git commit -m "feat(f1): add /auth/verify page for email verification handoff"
```

---

## F-2: Checkout/Payment Page

### Task 2.1: Create checkout page structure

**Objective:** Build a multi-step checkout page: plan selection → billing cycle → currency → payment gateway → confirm.

**Files:**
- Create: `client-dashboard/src/app/dashboard/checkout/page.tsx`

**Step 1: Create checkout page**

```tsx
'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { useAuth } from '@/features/auth/auth-provider';
import { getPlans, detectCurrency, getCurrencyPricing, checkout } from '@/lib/api';
import { formatMoney } from '@/lib/format';
import PageContainer from '@/components/layout/page-container';

interface Plan {
  id: string;
  name: string;
  slug: string;
  description: string;
  features: string[];
  pricing: {
    monthly: { usd: number; converted: number; formatted: string };
    yearly: { usd: number; converted: number; formatted: string };
  };
  is_popular: boolean;
}

export default function CheckoutPage() {
  const { user } = useAuth();
  const searchParams = useSearchParams();
  const preselectedPlan = searchParams.get('plan') || '';

  const [plans, setPlans] = useState<Plan[]>([]);
  const [currency, setCurrency] = useState('USD');
  const [selectedPlanId, setSelectedPlanId] = useState('');
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly');
  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    Promise.all([getPlans(), detectCurrency()])
      .then(([plansData, currencyData]) => {
        setPlans(Array.isArray(plansData) ? plansData : []);
        if (currencyData?.currency) setCurrency(currencyData.currency);
      })
      .catch(() => setError('Failed to load plans'))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    if (preselectedPlan && plans.length) {
      const match = plans.find(p => p.slug.includes(preselectedPlan) || p.id === preselectedPlan);
      if (match) setSelectedPlanId(match.id);
    }
  }, [preselectedPlan, plans]);

  const selectedPlan = plans.find(p => p.id === selectedPlanId);
  const price = selectedPlan?.pricing?.[billingCycle];

  const handleCheckout = async () => {
    if (!selectedPlanId || !price) return;
    setProcessing(true);
    setError('');
    try {
      const result = await checkout({
        subscription_id: selectedPlanId,
        billing_cycle: billingCycle,
        currency,
      });
      if (result?.checkout_url) window.location.href = result.checkout_url;
    } catch (err: any) {
      setError(err.message || 'Checkout failed');
    } finally {
      setProcessing(false);
    }
  };

  if (loading) {
    return <PageContainer pageTitle="Checkout" pageDescription="Loading..."><div className="animate-pulse h-64 rounded-lg bg-muted" /></PageContainer>;
  }

  return (
    <PageContainer pageTitle="Checkout" pageDescription="Complete your subscription">
      <div className="max-w-2xl mx-auto space-y-6">
        {error && <div className="rounded-md bg-destructive/10 p-3 text-sm text-destructive">{error}</div>}

        {/* Plan Selection */}
        <div className="space-y-3">
          <h2 className="text-lg font-semibold">Select Plan</h2>
          <div className="grid gap-3">
            {plans.filter(p => p.slug !== 'oakit-advanced').map((plan) => (
              <button
                key={plan.id}
                onClick={() => setSelectedPlanId(plan.id)}
                className={`rounded-lg border p-4 text-left transition ${
                  selectedPlanId === plan.id ? 'border-primary bg-primary/5' : 'border-gray-700 hover:border-gray-500'
                }`}
              >
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="font-medium">{plan.name}</h3>
                    <p className="text-sm text-muted-foreground">{plan.description}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-bold">{plan.pricing?.monthly?.formatted || 'N/A'}</p>
                    <p className="text-xs text-muted-foreground">/month</p>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Billing Cycle */}
        {selectedPlan && (
          <div className="space-y-3">
            <h2 className="text-lg font-semibold">Billing Cycle</h2>
            <div className="grid grid-cols-2 gap-3">
              {(['monthly', 'yearly'] as const).map((cycle) => {
                const cyclePrice = selectedPlan.pricing?.[cycle];
                return (
                  <button
                    key={cycle}
                    onClick={() => setBillingCycle(cycle)}
                    className={`rounded-lg border p-4 text-center transition ${
                      billingCycle === cycle ? 'border-primary bg-primary/5' : 'border-gray-700 hover:border-gray-500'
                    }`}
                  >
                    <p className="font-medium capitalize">{cycle}</p>
                    <p className="text-lg font-bold">{cyclePrice?.formatted || 'N/A'}</p>
                    {cycle === 'yearly' && <p className="text-xs text-green-400">Save ~20%</p>}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Summary & CTA */}
        {selectedPlan && price && (
          <div className="rounded-lg border bg-card p-6 space-y-4">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Plan</span>
              <span className="font-medium">{selectedPlan.name}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Cycle</span>
              <span className="font-medium capitalize">{billingCycle}</span>
            </div>
            <div className="flex justify-between text-lg font-bold border-t pt-4">
              <span>Total</span>
              <span>{price.formatted}</span>
            </div>
            <button
              onClick={handleCheckout}
              disabled={processing}
              className="w-full rounded-lg bg-primary py-3 text-primary-foreground font-medium hover:bg-primary/90 disabled:opacity-50"
            >
              {processing ? 'Processing...' : 'Subscribe Now'}
            </button>
          </div>
        )}
      </div>
    </PageContainer>
  );
}
```

**Step 2: Verify**

1. Navigate to `http://localhost:3000/dashboard/checkout?plan=regular`
2. Expected: plans load, regular pre-selected, billing cycle toggle works

**Step 3: Commit**

```bash
git add client-dashboard/src/app/dashboard/checkout/page.tsx
git commit -m "feat(f2): checkout page — plan selection, billing cycle, currency-aware pricing"
```

---

### Task 2.2: Wire Subscribe CTAs from marketing site and dashboard

**Objective:** Update pricing card CTAs to link to the checkout page instead of `/auth/signup`.

**Files:**
- Modify: `lib/pricing.ts` (CTA href in `apiTierToDisplayTier` and static tiers)

**Step 1: Update CTA links**

In `lib/pricing.ts`, function `apiTierToDisplayTier` (line ~68):
```typescript
// Before:
href: normalizedId === 'advanced' ? '/#contactUs' : '/auth/signup?plan=' + normalizedId,
// After:
href: normalizedId === 'advanced' ? '/#contactUs' : 'https://dashboard.oakitsolutionsandsupplies.com/dashboard/checkout?plan=' + normalizedId,
```

In `lib/pricing.ts`, static `pricingTiers` (lines 27, 45):
```typescript
// Before:
cta: { label: 'Get Started', href: '/auth/signup?plan=basic', variant: 'default' },
// After:
cta: { label: 'Get Started', href: 'https://dashboard.oakitsolutionsandsupplies.com/dashboard/checkout?plan=basic', variant: 'default' },
```

**Step 2: Verify**

1. `npm run build` — no errors
2. Pricing cards link to dashboard checkout

**Step 3: Commit**

```bash
git add lib/pricing.ts
git commit -m "feat(f2): wire Subscribe CTAs to dashboard checkout page"
```

---

## F-3: Central `formatMoney` Module

### Task 3.1: Create formatMoney utility

**Objective:** A single `formatMoney(amount, currency?, symbol?)` function used everywhere.

**Files:**
- Modify: `client-dashboard/src/lib/format.ts`

**Step 1: Add formatMoney**

```typescript
// Add to existing format.ts (after safeFormatDateTime)

/**
 * Format a monetary amount with proper currency symbol and locale formatting.
 * @param amount - The numeric amount
 * @param currency - ISO currency code (e.g. 'USD', 'UGX'). Defaults to 'USD'.
 * @param symbol - Optional currency symbol override (e.g. 'USh'). If omitted, uses Intl.
 * @param decimals - Decimal places. Defaults to 2.
 */
export function formatMoney(
  amount: number,
  currency: string = 'USD',
  symbol?: string,
  decimals: number = 2,
): string {
  if (symbol) {
    return `${symbol}${amount.toLocaleString(undefined, {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
    })}`;
  }
  try {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency,
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
    }).format(amount);
  } catch {
    return `${currency} ${amount.toLocaleString(undefined, {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
    })}`;
  }
}
```

**Step 2: Verify**

1. TypeScript compiles: `cd client-dashboard && npx tsc --noEmit`

**Step 3: Commit**

```bash
git add client-dashboard/src/lib/format.ts
git commit -m "feat(f3): add central formatMoney utility to lib/format.ts"
```

---

### Task 3.2: Replace hardcoded currency formatting across dashboard

**Objective:** Replace all inline `$` formatting and local `formatCurrency` functions with `formatMoney`.

**Files:**
- Modify: `client-dashboard/src/app/dashboard/page.tsx` (line 59: `${sub.amount}`)
- Modify: `client-dashboard/src/app/dashboard/billing/page.tsx` (local `formatCurrency` at line 50)
- Modify: `client-dashboard/src/app/dashboard/subscriptions/page.tsx` (inline currency formatting)

**Step 1: Update dashboard/page.tsx**

Replace line 59:
```tsx
// Before:
<p className="text-2xl font-bold">${sub.amount}</p>
// After (import formatMoney at top):
<p className="text-2xl font-bold">{formatMoney(sub.amount, sub.currency || 'USD')}</p>
```

**Step 2: Update billing/page.tsx**

Remove the local `formatCurrency` function (lines 50-55) and replace all calls with `formatMoney`.

**Step 3: Update subscriptions/page.tsx**

Find inline currency formatting and replace with `formatMoney`.

**Step 4: Verify**

1. `cd client-dashboard && npx tsc --noEmit`
2. `npm run build`
3. No hardcoded `$` in dashboard pages (grep to confirm)

**Step 5: Commit**

```bash
git add client-dashboard/src/app/dashboard/page.tsx \
        client-dashboard/src/app/dashboard/billing/page.tsx \
        client-dashboard/src/app/dashboard/subscriptions/page.tsx
git commit -m "feat(f3): replace hardcoded currency formatting with formatMoney across dashboard"
```

---

### Task 3.3: Persist currency choice to localStorage

**Objective:** When a user selects a currency, save it and reuse on next visit.

**Files:**
- Modify: `client-dashboard/src/lib/format.ts` (add get/set helpers)
- Modify: `client-dashboard/src/app/dashboard/billing/page.tsx` (use persisted currency)
- Modify: `client-dashboard/src/app/dashboard/subscriptions/page.tsx` (use persisted currency)

**Step 1: Add localStorage helpers to format.ts**

```typescript
const CURRENCY_STORAGE_KEY = 'oakit_currency';

export function getPersistedCurrency(): string | null {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem(CURRENCY_STORAGE_KEY);
}

export function setPersistedCurrency(currency: string): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(CURRENCY_STORAGE_KEY, currency);
}
```

**Step 2: Use in billing and subscriptions pages**

In `useEffect` for currency loading, check localStorage first. When currency changes, call `setPersistedCurrency(newCurrency)`.

**Step 3: Commit**

```bash
git add client-dashboard/src/lib/format.ts \
        client-dashboard/src/app/dashboard/billing/page.tsx \
        client-dashboard/src/app/dashboard/subscriptions/page.tsx
git commit -m "feat(f3): persist currency choice to localStorage"
```

---

## F-4: Onboarding Wizard

### Task 4.1: Create onboarding wizard component

**Objective:** A multi-step wizard shown after first login: confirm company → currency/country → plan+services → optional first ticket.

**Files:**
- Create: `client-dashboard/src/components/onboarding/wizard.tsx`
- Create: `client-dashboard/src/components/onboarding/step-company.tsx`
- Create: `client-dashboard/src/components/onboarding/step-currency.tsx`
- Create: `client-dashboard/src/components/onboarding/step-plan.tsx`
- Create: `client-dashboard/src/components/onboarding/step-ticket.tsx`

Each step component follows the same pattern — a small form that calls `onNext(data)`.

**Step 1:** Create the wizard shell with progress indicator, step routing, and skip/back navigation.

**Step 2:** Create individual step components (company, currency, plan, ticket).

**Step 3:** Verify: `npx tsc --noEmit` and `npm run build`

**Step 4: Commit**

```bash
git add client-dashboard/src/components/onboarding/
git commit -m "feat(f4): onboarding wizard — company, currency, plan, optional ticket"
```

---

### Task 4.2: Integrate wizard into dashboard layout

**Objective:** Show the wizard after first login (when `onboarding_completed` is false).

**Files:**
- Modify: `client-dashboard/src/app/dashboard/layout.tsx`
- Modify: `client-dashboard/src/features/auth/auth-provider.tsx` (add `onboarding_completed` to User interface)

**Step 1:** Add `onboarding_completed?: boolean` to User interface.

**Step 2:** In dashboard layout, show `<OnboardingWizard>` when `user.onboarding_completed === false`.

**Step 3:** Verify: `npx tsc --noEmit` and `npm run build`

**Step 4: Commit**

```bash
git add client-dashboard/src/app/dashboard/layout.tsx \
        client-dashboard/src/features/auth/auth-provider.tsx
git commit -m "feat(f4): integrate onboarding wizard into dashboard layout"
```

---

## F-5: Marketing Fixes

### Task 5.1: Fix `#pricing` anchor

**Objective:** Ensure the pricing section has `id="pricing"` so `#pricing` links work.

**Files:**
- Modify: `components/ServicesPricing.tsx`

**Step 1:** Add `id="pricing"` to the root `<section>` of ServicesPricing.

**Step 2:** Verify: `grep -n 'id="pricing"' components/ServicesPricing.tsx`

**Step 3: Commit**

```bash
git add components/ServicesPricing.tsx
git commit -m "fix(f5): add id='pricing' to pricing section for anchor links"
```

---

### Task 5.2: Mark service catalog as static

**Objective:** Document that `lib/services.ts` is static and API integration is deferred.

**Files:**
- Modify: `lib/services.ts`

**Step 1:** Add header comment explaining static nature.

**Step 2: Commit**

```bash
git add lib/services.ts
git commit -m "docs(f5): document service catalog as static, API integration deferred"
```

---

### Task 5.3: Add desktop download section

**Objective:** Add a "Download ClassicPOS Desktop" section with GitHub Releases links.

**Files:**
- Create: `components/DesktopDownload.tsx`
- Modify: `app/page.tsx` (add component)

**Step 1:** Create DesktopDownload component with Windows (.exe) and Linux (.deb) download buttons.

**Step 2:** Add to landing page after `<Faq />`.

**Step 3: Commit**

```bash
git add components/DesktopDownload.tsx app/page.tsx
git commit -m "feat(f5): add desktop download section with GitHub Releases links"
```

---

## F-6: Landing Page Registration

### Task 6.1: Wire Hero CTA to dashboard registration

**Objective:** Hero CTA links to dashboard auth/register.

**Files:**
- Modify: `components/Hero.tsx`

**Step 1:** Update primary CTA href to `https://dashboard.oakitsolutionsandsupplies.com/auth/register?plan=regular`

**Step 2: Commit**

```bash
git add components/Hero.tsx
git commit -m "feat(f6): wire Hero CTA to dashboard registration"
```

---

## F-7: Global Error Interceptor

### Task 7.1: Add global 401/419 interceptor + XSRF consistency

**Objective:** Intercept all API responses for 401 (redirect to login) and 419 (session expired). Ensure XSRF header on all auth requests.

**Files:**
- Modify: `client-dashboard/src/lib/api.ts` (add 401/419 handling in `apiFetch`)
- Modify: `client-dashboard/src/features/auth/auth-provider.tsx` (add XSRF to login/register/logout)

**Step 1:** In `apiFetch`, add 401 → localStorage clear + redirect to `/auth/login`. Add 419 → same with session expired message.

**Step 2:** In auth-provider login/register/logout, add XSRF token header extraction.

**Step 3: Commit**

```bash
git add client-dashboard/src/lib/api.ts \
        client-dashboard/src/features/auth/auth-provider.tsx
git commit -m "feat(f7): global 401/419 interceptor + XSRF header consistency"
```

---

## F-8: E2E Tests

### Task 8.1: Set up Playwright

**Objective:** Install and configure Playwright for E2E testing.

**Files:**
- Modify: `client-dashboard/package.json`
- Create: `client-dashboard/playwright.config.ts`
- Create: `client-dashboard/tests/auth.spec.ts`

**Step 1:** `npm install -D @playwright/test && npx playwright install chromium`

**Step 2:** Create playwright.config.ts and skeleton auth tests.

**Step 3: Commit**

```bash
git add client-dashboard/package.json client-dashboard/playwright.config.ts client-dashboard/tests/
git commit -m "test(f8): set up Playwright E2E with auth + checkout skeleton tests"
```

---

### Task 8.2: Add currency E2E tests

**Objective:** Test currency formatting works end-to-end.

**Files:**
- Create: `client-dashboard/tests/currency.spec.ts`

**Step 1:** Create test that verifies formatMoney handles USD correctly.

**Step 2: Commit**

```bash
git add client-dashboard/tests/currency.spec.ts
git commit -m "test(f8): add currency E2E tests"
```

---

## File Change Summary

| Task | Files Created | Files Modified |
|---|---|---|
| F-1 | `auth/verify/page.tsx` | `auth-provider.tsx` |
| F-2 | `dashboard/checkout/page.tsx` | `pricing.ts` |
| F-3 | — | `format.ts`, `dashboard/page.tsx`, `billing/page.tsx`, `subscriptions/page.tsx` |
| F-4 | `onboarding/{wizard,step-*.tsx}` | `dashboard/layout.tsx`, `auth-provider.tsx` |
| F-5 | `DesktopDownload.tsx` | `ServicesPricing.tsx`, `services.ts`, `Hero.tsx`, `app/page.tsx` |
| F-6 | — | `Hero.tsx` |
| F-7 | — | `api.ts`, `auth-provider.tsx` |
| F-8 | `playwright.config.ts`, `tests/*.spec.ts` | `package.json` |

## Risks & Open Questions

1. **Backend API readiness:** The checkout API endpoint (`/billing/checkout`) needs to return a `checkout_url` or create the subscription directly.
2. **Onboarding flag:** The `onboarding_completed` field needs to exist on the User model in the backend. Sprint 3's S3.3 added onboarding tracking — confirm it's exposed in `/auth/me`.
3. **GitHub Releases:** Download links point to `github.com/kengeorge2/oakit/releases` — verify this repo has releases.
4. **Playwright in CI:** No CI pipeline exists (per AGENTS.md). Tests run locally only.
5. **No test framework previously:** This is the first test setup in the oakit repo.
