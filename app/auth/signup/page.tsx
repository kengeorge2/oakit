'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';

function SignupForm() {
  const searchParams = useSearchParams();
  const planParam = searchParams.get('plan') || 'regular';

  const [plans, setPlans] = useState<any[]>([]);
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
    company_name: '',
    company_phone: '',
    plan_id: '',
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://posapp.oakitsolutionsandsupplies.com/api/v1/client';

  useEffect(() => {
    fetch(`${API_URL}/plans`)
      .then((res) => res.json())
      .then((data) => {
        setPlans(data);
        const selected = data.find((p: any) => p.slug === `oakit-${planParam}`);
        if (selected) setForm((prev) => ({ ...prev, plan_id: selected.id }));
      })
      .catch(() => {});
  }, [planParam, API_URL]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (form.password !== form.password_confirmation) {
      setError('Passwords do not match');
      return;
    }
    setIsLoading(true);
    try {
      const res = await fetch(`${API_URL}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Registration failed');

      localStorage.setItem('auth_token', data.token);
      window.location.href = 'https://dashboard.oakitsolutionsandsupplies.com/dashboard';
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const update = (field: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
    setForm((prev) => ({ ...prev, [field]: e.target.value }));

  const selectedPlan = plans.find((p) => p.id === form.plan_id);

  return (
    <form onSubmit={handleSubmit} className="space-y-4 rounded-lg border border-gray-800 bg-gray-900 p-6 shadow-sm">
      {error && (
        <div className="rounded-md bg-red-500/10 p-3 text-sm text-red-400">{error}</div>
      )}

      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-300" htmlFor="name">Full Name</label>
        <input id="name" type="text" value={form.name} onChange={update('name')} required
          className="flex h-10 w-full rounded-md border border-gray-700 bg-gray-800 px-3 py-2 text-sm text-white" />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-300" htmlFor="email">Email</label>
        <input id="email" type="email" value={form.email} onChange={update('email')} required
          className="flex h-10 w-full rounded-md border border-gray-700 bg-gray-800 px-3 py-2 text-sm text-white" />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-300" htmlFor="company_name">Company Name</label>
        <input id="company_name" type="text" value={form.company_name} onChange={update('company_name')}
          className="flex h-10 w-full rounded-md border border-gray-700 bg-gray-800 px-3 py-2 text-sm text-white" />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-300" htmlFor="company_phone">Company Phone</label>
        <input id="company_phone" type="tel" value={form.company_phone} onChange={update('company_phone')}
          className="flex h-10 w-full rounded-md border border-gray-700 bg-gray-800 px-3 py-2 text-sm text-white" />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-300" htmlFor="plan_id">Select Plan</label>
        <select id="plan_id" value={form.plan_id} onChange={update('plan_id')} required
          className="flex h-10 w-full rounded-md border border-gray-700 bg-gray-800 px-3 py-2 text-sm text-white">
          <option value="">Choose a plan</option>
          {plans.map((p) => (
            <option key={p.id} value={p.id}>
              {p.name} — ${p.price_monthly}/mo{p.price_yearly > 0 ? ` ($${p.price_yearly}/yr)` : ''}
            </option>
          ))}
        </select>
      </div>

      {selectedPlan && (
        <div className="rounded-md bg-blue-500/10 p-3 text-sm text-blue-400">
          <p className="font-medium">{selectedPlan.name} Plan</p>
          <p>{selectedPlan.description}</p>
          {selectedPlan.features && (
            <ul className="mt-2 space-y-1">
              {selectedPlan.features.slice(0, 3).map((f: string, i: number) => (
                <li key={i}>✓ {f}</li>
              ))}
            </ul>
          )}
        </div>
      )}

      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-300" htmlFor="password">Password</label>
        <input id="password" type="password" value={form.password} onChange={update('password')} required minLength={8}
          className="flex h-10 w-full rounded-md border border-gray-700 bg-gray-800 px-3 py-2 text-sm text-white" />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-300" htmlFor="password_confirmation">Confirm Password</label>
        <input id="password_confirmation" type="password" value={form.password_confirmation} onChange={update('password_confirmation')} required minLength={8}
          className="flex h-10 w-full rounded-md border border-gray-700 bg-gray-800 px-3 py-2 text-sm text-white" />
      </div>

      <button type="submit" disabled={isLoading}
        className="flex h-10 w-full items-center justify-center rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 disabled:opacity-50">
        {isLoading ? 'Creating account...' : 'Create Account'}
      </button>
    </form>
  );
}

export default function SignupPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-950 p-4">
      <div className="w-full max-w-md space-y-6">
        <div className="text-center">
          <Link href="/" className="text-2xl font-bold text-white">OAK IT Solutions</Link>
          <p className="text-gray-400 mt-2">Create your account</p>
        </div>

        <Suspense fallback={<div className="text-center text-gray-400">Loading plans...</div>}>
          <SignupForm />
        </Suspense>

        <p className="text-center text-sm text-gray-400">
          Already have an account?{' '}
          <Link href="/auth/signin" className="text-blue-400 hover:underline">Sign in</Link>
        </p>
      </div>
    </div>
  );
}
