'use client';

import { useState, useEffect, Suspense } from 'react';
import { useAuth } from '@/features/auth/auth-provider';
import { getPlans, detectCurrency, getSupportedCurrencies } from '@/lib/api';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';

export default function RegisterPage() {
  return (
    <Suspense>
      <RegisterContent />
    </Suspense>
  );
}

function RegisterContent() {
  const { register } = useAuth();
  const searchParams = useSearchParams();
  const initialPlan = searchParams.get('plan') || '';

  const [plans, setPlans] = useState<any[]>([]);
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
    business_name: '',
    business_type: 'bar_restaurant',
    location: '',
    timezone: 'Africa/Nairobi',
    plan: initialPlan,
    billing_cycle: 'monthly',
    currency: 'USD',
    country: '',
    referral_code: '',
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    getPlans().then((data: any[]) => {
      setPlans(data);
      // Auto-select plan from URL param
      if (initialPlan && data.length) {
        const match = data.find((p: any) =>
          p.slug?.includes(initialPlan) ||
          p.name?.toLowerCase().includes(initialPlan)
        );
        if (match) setForm((prev: any) => ({ ...prev, plan: match.slug || match.name.toLowerCase() }));
      }
    }).catch(() => {});

    // Detect currency
    detectCurrency().then((data: any) => {
      if (data?.currency) {
        setForm((prev: any) => ({ ...prev, currency: data.currency }));
        if (data.currency_info?.country) {
          setForm((prev: any) => ({ ...prev, country: data.currency_info.country }));
        }
      }
    }).catch(() => {});
  }, [initialPlan]);

  const update = (field: string, value: string) => setForm((prev) => ({ ...prev, [field]: value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (form.password !== form.password_confirmation) {
      setError('Passwords do not match');
      return;
    }
    setIsLoading(true);
    try {
      // Map plan slug to the plan value the backend expects
      const submitData = {
        ...form,
        plan: form.plan || undefined,
        billing_cycle: form.billing_cycle || undefined,
      };
      await register(submitData);
    } catch (err: any) {
      setError(err.message || 'Registration failed');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-950 p-4">
      <div className="w-full max-w-lg space-y-6">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white">OAK IT Solutions</h1>
          <p className="mt-2 text-gray-400">Create your merchant account</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 rounded-lg border border-gray-800 bg-gray-900 p-6 shadow-sm">
          {error && (
            <div className="rounded-md bg-red-900/20 p-3 text-sm text-red-400">{error}</div>
          )}

          {/* Account */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-300" htmlFor="name">Full Name *</label>
            <input id="name" type="text" value={form.name} onChange={(e) => update('name', e.target.value)}
              required className="flex h-10 w-full rounded-md border border-gray-700 bg-gray-800 px-3 py-2 text-sm text-white" placeholder="John Doe" />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-300" htmlFor="email">Email *</label>
            <input id="email" type="email" value={form.email} onChange={(e) => update('email', e.target.value)}
              required className="flex h-10 w-full rounded-md border border-gray-700 bg-gray-800 px-3 py-2 text-sm text-white" placeholder="you@company.com" />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300" htmlFor="password">Password *</label>
              <input id="password" type="password" value={form.password} onChange={(e) => update('password', e.target.value)}
                required minLength={8} className="flex h-10 w-full rounded-md border border-gray-700 bg-gray-800 px-3 py-2 text-sm text-white" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300" htmlFor="password_confirmation">Confirm *</label>
              <input id="password_confirmation" type="password" value={form.password_confirmation} onChange={(e) => update('password_confirmation', e.target.value)}
                required className="flex h-10 w-full rounded-md border border-gray-700 bg-gray-800 px-3 py-2 text-sm text-white" />
            </div>
          </div>

          {/* Business */}
          <hr className="border-gray-800" />
          <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">Business Details</p>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-300" htmlFor="business_name">Business Name *</label>
            <input id="business_name" type="text" value={form.business_name} onChange={(e) => update('business_name', e.target.value)}
              required className="flex h-10 w-full rounded-md border border-gray-700 bg-gray-800 px-3 py-2 text-sm text-white" placeholder="My Business Ltd" />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300" htmlFor="business_type">Business Type *</label>
              <select id="business_type" value={form.business_type} onChange={(e) => update('business_type', e.target.value)}
                className="flex h-10 w-full rounded-md border border-gray-700 bg-gray-800 px-3 py-2 text-sm text-white">
                <option value="bar_restaurant">Bar / Restaurant</option>
                <option value="retail">Retail</option>
                <option value="service">Service</option>
                <option value="pharmacy">Pharmacy</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300" htmlFor="location">Location *</label>
              <input id="location" type="text" value={form.location} onChange={(e) => update('location', e.target.value)}
                required className="flex h-10 w-full rounded-md border border-gray-700 bg-gray-800 px-3 py-2 text-sm text-white" placeholder="Kampala, Uganda" />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300" htmlFor="timezone">Timezone *</label>
              <select id="timezone" value={form.timezone} onChange={(e) => update('timezone', e.target.value)}
                className="flex h-10 w-full rounded-md border border-gray-700 bg-gray-800 px-3 py-2 text-sm text-white">
                <option value="Africa/Nairobi">East Africa (EAT)</option>
                <option value="Africa/Lagos">West Africa (WAT)</option>
                <option value="Africa/Johannesburg">South Africa (SAST)</option>
                <option value="Africa/Cairo">Egypt (EET)</option>
                <option value="Europe/London">UK (GMT)</option>
                <option value="America/New_York">US Eastern</option>
                <option value="America/Chicago">US Central</option>
                <option value="America/Los_Angeles">US Pacific</option>
                <option value="Asia/Dubai">Dubai (GST)</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300" htmlFor="currency">Currency *</label>
              <select id="currency" value={form.currency} onChange={(e) => update('currency', e.target.value)}
                className="flex h-10 w-full rounded-md border border-gray-700 bg-gray-800 px-3 py-2 text-sm text-white">
                <option value="USD">USD ($)</option>
                <option value="UGX">UGX (USh)</option>
                <option value="KES">KES (KSh)</option>
                <option value="NGN">NGN (₦)</option>
                <option value="GBP">GBP (£)</option>
                <option value="EUR">EUR (€)</option>
              </select>
            </div>
          </div>

          {/* Plan & Billing */}
          <hr className="border-gray-800" />
          <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">Plan & Billing</p>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-300" htmlFor="plan">Plan *</label>
            <select id="plan" value={form.plan} onChange={(e) => update('plan', e.target.value)}
              className="flex h-10 w-full rounded-md border border-gray-700 bg-gray-800 px-3 py-2 text-sm text-white">
              <option value="">Choose a plan...</option>
              {plans.filter((p: any) => p.is_active && p.slug !== 'oakit-advanced').map((p: any) => (
                <option key={p.id} value={p.slug || p.name.toLowerCase()}>{p.name} — ${p.price_monthly}/mo</option>
              ))}
            </select>
          </div>

          {/* Selected plan summary */}
          {form.plan && plans.length > 0 && (() => {
            const selected = plans.find((p: any) => (p.slug || p.name?.toLowerCase()) === form.plan);
            if (!selected) return null;
            return (
              <div key="plan-summary" className="rounded-lg border border-blue-800/50 bg-blue-900/20 p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-white">{selected.name}</h3>
                  <span className="text-lg font-bold text-blue-400">
                    ${'{'}selected.price_monthly{'}'}/mo
                  </span>
                </div>
                {selected.features && selected.features.length > 0 && (
                  <ul className="space-y-1">
                    {selected.features.map((f: string, i: number) => (
                      <li key={i} className="flex items-center gap-2 text-sm text-gray-300">
                        <span className="text-green-400">✓</span> {f}
                      </li>
                    ))}
                  </ul>
                )}
                <p className="text-xs text-gray-500">
                  {selected.max_branches} branch(es), {selected.max_users_per_branch} users/branch
                </p>
              </div>
            );
          })()}

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300" htmlFor="billing_cycle">Billing Cycle *</label>
              <select id="billing_cycle" value={form.billing_cycle} onChange={(e) => update('billing_cycle', e.target.value)}
                className="flex h-10 w-full rounded-md border border-gray-700 bg-gray-800 px-3 py-2 text-sm text-white">
                <option value="monthly">Monthly</option>
                <option value="annual">Annual (save ~20%)</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300" htmlFor="referral_code">Referral Code</label>
              <input id="referral_code" type="text" value={form.referral_code} onChange={(e) => update('referral_code', e.target.value)}
                className="flex h-10 w-full rounded-md border border-gray-700 bg-gray-800 px-3 py-2 text-sm text-white" placeholder="Optional" />
            </div>
          </div>

          <button type="submit" disabled={isLoading || !form.plan}
            className="w-full rounded-lg bg-blue-600 py-2.5 text-sm font-medium text-white hover:bg-blue-500 disabled:opacity-50 mt-4">
            {isLoading ? 'Creating Account...' : 'Create Account'}
          </button>

          <p className="text-center text-sm text-gray-400">
            Already have an account? <Link href="/auth/login" className="text-blue-400 hover:underline">Sign in</Link>
          </p>
        </form>
      </div>
    </div>
  );
}
