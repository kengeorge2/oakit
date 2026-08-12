'use client';

import { useEffect, useState, useCallback, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { useAuth } from '@/features/auth/auth-provider';
import { getPlans, getSubscriptions, getSupportedCurrencies, detectCurrency, checkout, changePlan } from '@/lib/api';
import { formatMoney, getPersistedCurrency, setPersistedCurrency } from '@/lib/format';
import PageContainer from '@/components/layout/page-container';

interface Plan {
  id: string;
  name: string;
  slug: string;
  description: string;
  price_monthly: string;
  price_yearly: string;
  features: string[];
  is_popular: boolean;
}

interface CurrencyInfo {
  symbol: string;
  name: string;
  country: string;
}

function CheckoutContent() {
  const { user } = useAuth();
  const searchParams = useSearchParams();
  const preselectedPlan = searchParams.get('plan') || '';

  const [subscriptions, setSubscriptions] = useState<any[]>([]);
  const [plans, setPlans] = useState<Plan[]>([]);
  const [currencies, setCurrencies] = useState<Record<string, CurrencyInfo>>({});
  const [currency, setCurrency] = useState('USD');
  const [selectedPlanId, setSelectedPlanId] = useState('');
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly');
  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState('');

  // Load subscriptions, plans, supported currencies
  useEffect(() => {
    Promise.all([
      getSubscriptions(),
      getPlans(),
      getSupportedCurrencies(),
      detectCurrency(),
    ])
      .then(([subsData, plansData, currencyData, detected]) => {
        const subs = subsData?.data || (Array.isArray(subsData) ? subsData : []);
        setSubscriptions(subs);
        setPlans(plansData || []);

        const currencyMap = currencyData?.currencies || {};
        setCurrencies(currencyMap);

        // Currency priority: persisted choice > detected > USD
        const persisted = getPersistedCurrency();
        const detectedCode = detected?.currency;
        const finalCurrency = persisted && currencyMap[persisted]
          ? persisted
          : (detectedCode && currencyMap[detectedCode] ? detectedCode : 'USD');
        setCurrency(finalCurrency);
        setPersistedCurrency(finalCurrency);
      })
      .catch(() => setError('Failed to load checkout data'))
      .finally(() => setLoading(false));
  }, []);

  // Preselect plan: query param > existing subscription plan > first available
  useEffect(() => {
    if (!plans.length) return;
    const activeSub = subscriptions.find((s) => ['active', 'trialing'].includes(s.status));
    let match: Plan | undefined;

    if (preselectedPlan) {
      match = plans.find((p) => p.slug.includes(preselectedPlan) || p.id === preselectedPlan);
    }
    if (!match && activeSub?.plan) {
      match = plans.find((p) => p.id === activeSub.plan.id || p.name === activeSub.plan.name);
    }
    if (!match) {
      match = plans.find((p) => p.slug !== 'oakit-advanced');
    }
    if (match) setSelectedPlanId(match.id);
  }, [plans, subscriptions, preselectedPlan]);

  const selectedPlan = plans.find((p) => p.id === selectedPlanId);
  const price = selectedPlan
    ? parseFloat(billingCycle === 'yearly' ? selectedPlan.price_yearly : selectedPlan.price_monthly)
    : 0;
  const currencyInfo = currencies[currency];

  const handleCheckout = async () => {
    if (!selectedPlan || !price) return;
    setProcessing(true);
    setError('');

    try {
      // Find the user's active subscription (created at registration)
      let subscription = subscriptions.find((s) => ['active', 'trialing'].includes(s.status));

      // If no subscription exists, we cannot checkout yet — the registration
      // flow creates the initial subscription. Surface a clear message.
      if (!subscription) {
        setError('No active subscription found. Please contact support to activate your plan.');
        setProcessing(false);
        return;
      }

      // If the selected plan differs from the subscription's plan, change it first
      if (selectedPlan.id !== subscription.plan?.id) {
        await changePlan(subscription.id, {
          plan_id: selectedPlan.id,
          billing_cycle: billingCycle,
        });
        subscription = { ...subscription, plan: { ...subscription.plan, id: selectedPlan.id } };
      }

      const result = await checkout({
        subscription_id: subscription.id,
        billing_cycle: billingCycle,
        currency,
      });

      if (result?.checkout_url) {
        window.location.href = result.checkout_url;
        return;
      }
      // No redirect URL — subscription processed directly
      setError('Payment processed. Check your subscriptions page.');
      setProcessing(false);
    } catch (err: any) {
      setError(err.message || 'Checkout failed. Please try again.');
      setProcessing(false);
    }
  };

  const handleCurrencyChange = (code: string) => {
    setCurrency(code);
    setPersistedCurrency(code);
  };

  if (loading) {
    return (
      <PageContainer pageTitle="Checkout" pageDescription="Loading...">
        <div className="animate-pulse h-64 rounded-lg bg-muted" />
      </PageContainer>
    );
  }

  return (
    <PageContainer pageTitle="Checkout" pageDescription="Select your plan and complete your subscription">
      <div className="mx-auto max-w-2xl space-y-6">
        {error && (
          <div className="rounded-md bg-red-900/20 p-3 text-sm text-red-400">{error}</div>
        )}

        {/* Currency selector */}
        <div className="flex items-center justify-between rounded-lg border bg-card p-4">
          <div>
            <p className="text-sm font-medium">Display currency</p>
            <p className="text-xs text-muted-foreground">
              {currencyInfo ? `${currencyInfo.name} (${currencyInfo.country})` : 'Prices shown in your selected currency'}
            </p>
          </div>
          <select
            value={currency}
            onChange={(e) => handleCurrencyChange(e.target.value)}
            className="rounded-md border bg-background px-3 py-2 text-sm"
          >
            {Object.entries(currencies).map(([code, info]) => (
              <option key={code} value={code}>
                {info.symbol} {info.name} ({code})
              </option>
            ))}
          </select>
        </div>

        {/* Plan selection */}
        <div className="space-y-3">
          <h2 className="text-lg font-semibold">Select Plan</h2>
          <div className="grid gap-3 sm:grid-cols-2">
            {plans
              .filter((p) => p.slug !== 'oakit-advanced')
              .map((plan) => {
                const monthly = parseFloat(plan.price_monthly);
                const isSelected = selectedPlanId === plan.id;
                return (
                  <button
                    key={plan.id}
                    onClick={() => setSelectedPlanId(plan.id)}
                    className={`rounded-lg border p-4 text-left transition ${
                      isSelected
                        ? 'border-blue-500 bg-blue-500/5 ring-1 ring-blue-500'
                        : 'border-gray-700 hover:border-gray-500'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <h3 className="font-medium">{plan.name}</h3>
                      {plan.is_popular && (
                        <span className="rounded-full bg-blue-500/20 px-2 py-0.5 text-xs text-blue-400">
                          Popular
                        </span>
                      )}
                    </div>
                    <p className="mt-1 text-sm text-muted-foreground">{plan.description}</p>
                    <p className="mt-3 text-xl font-bold">
                      {formatMoney(monthly, 'USD', '$', 0)}
                      <span className="text-sm font-normal text-muted-foreground">/month</span>
                    </p>
                  </button>
                );
              })}
          </div>
        </div>

        {/* Billing cycle */}
        {selectedPlan && (
          <div className="space-y-3">
            <h2 className="text-lg font-semibold">Billing Cycle</h2>
            <div className="grid grid-cols-2 gap-3">
              {(['monthly', 'yearly'] as const).map((cycle) => {
                const cycleAmount = parseFloat(
                  cycle === 'yearly' ? selectedPlan.price_yearly : selectedPlan.price_monthly
                );
                const isSelected = billingCycle === cycle;
                return (
                  <button
                    key={cycle}
                    onClick={() => setBillingCycle(cycle)}
                    className={`rounded-lg border p-4 text-center transition ${
                      isSelected
                        ? 'border-blue-500 bg-blue-500/5 ring-1 ring-blue-500'
                        : 'border-gray-700 hover:border-gray-500'
                    }`}
                  >
                    <p className="font-medium capitalize">{cycle}</p>
                    <p className="mt-1 text-lg font-bold">
                      {formatMoney(cycleAmount, 'USD', '$', 0)}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {cycle === 'yearly' ? 'Save ~20%' : '/month'}
                    </p>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Summary & CTA */}
        {selectedPlan && price > 0 && (
          <div className="space-y-4 rounded-lg border bg-card p-6">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Plan</span>
              <span className="font-medium">{selectedPlan.name}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Cycle</span>
              <span className="font-medium capitalize">{billingCycle}</span>
            </div>
            <div className="flex justify-between text-lg font-bold">
              <span>Total (USD)</span>
              <span>{formatMoney(price, 'USD', '$', 0)}</span>
            </div>
            {currency !== 'USD' && (
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>In {currency}</span>
                <span>Converted at payment</span>
              </div>
            )}
            <button
              onClick={handleCheckout}
              disabled={processing}
              className="w-full rounded-lg bg-blue-600 py-3 font-medium text-white hover:bg-blue-500 disabled:opacity-50"
            >
              {processing ? 'Processing...' : 'Subscribe Now'}
            </button>
            <p className="text-center text-xs text-muted-foreground">
              Secure checkout via PayPal. You can change or cancel your plan anytime.
            </p>
          </div>
        )}

        {!selectedPlanId && (
          <p className="text-center text-muted-foreground">Select a plan above to continue.</p>
        )}
      </div>
    </PageContainer>
  );
}

export default function CheckoutPage() {
  return (
    <Suspense>
      <CheckoutContent />
    </Suspense>
  );
}
