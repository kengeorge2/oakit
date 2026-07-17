'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/features/auth/auth-provider';
import { getPlans } from '@/lib/api';
import Link from 'next/link';

export default function RegisterPage() {
  const { register } = useAuth();
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

  useEffect(() => {
    getPlans().then(setPlans).catch(() => {});
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (form.password !== form.password_confirmation) {
      setError('Passwords do not match');
      return;
    }
    setIsLoading(true);
    try {
      await register(form);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const update = (field: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
    setForm((prev) => ({ ...prev, [field]: e.target.value }));

  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4">
      <div className="w-full max-w-md space-y-6">
        <div className="text-center">
          <h1 className="text-2xl font-bold">OAK IT Solutions</h1>
          <p className="text-muted-foreground mt-2">Create your account</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 rounded-lg border bg-card p-6 shadow-sm">
          {error && (
            <div className="rounded-md bg-destructive/10 p-3 text-sm text-destructive">{error}</div>
          )}

          <div className="space-y-2">
            <label className="text-sm font-medium" htmlFor="name">Full Name</label>
            <input id="name" type="text" value={form.name} onChange={update('name')} required
              className="flex h-10 w-full rounded-md border bg-background px-3 py-2 text-sm" />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium" htmlFor="email">Email</label>
            <input id="email" type="email" value={form.email} onChange={update('email')} required
              className="flex h-10 w-full rounded-md border bg-background px-3 py-2 text-sm" />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium" htmlFor="company_name">Company Name</label>
            <input id="company_name" type="text" value={form.company_name} onChange={update('company_name')}
              className="flex h-10 w-full rounded-md border bg-background px-3 py-2 text-sm" />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium" htmlFor="company_phone">Company Phone</label>
            <input id="company_phone" type="tel" value={form.company_phone} onChange={update('company_phone')}
              className="flex h-10 w-full rounded-md border bg-background px-3 py-2 text-sm" />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium" htmlFor="plan_id">Select Plan</label>
            <select id="plan_id" value={form.plan_id} onChange={update('plan_id')} required
              className="flex h-10 w-full rounded-md border bg-background px-3 py-2 text-sm">
              <option value="">Choose a plan</option>
              {plans.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.name} — ${p.price_monthly}/mo{p.price_yearly > 0 ? ` ($${p.price_yearly}/yr)` : ''}
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium" htmlFor="password">Password</label>
            <input id="password" type="password" value={form.password} onChange={update('password')} required minLength={8}
              className="flex h-10 w-full rounded-md border bg-background px-3 py-2 text-sm" />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium" htmlFor="password_confirmation">Confirm Password</label>
            <input id="password_confirmation" type="password" value={form.password_confirmation} onChange={update('password_confirmation')} required minLength={8}
              className="flex h-10 w-full rounded-md border bg-background px-3 py-2 text-sm" />
          </div>

          <button type="submit" disabled={isLoading}
            className="flex h-10 w-full items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 disabled:opacity-50">
            {isLoading ? 'Creating account...' : 'Create Account'}
          </button>
        </form>

        <p className="text-center text-sm text-muted-foreground">
          Already have an account?{' '}
          <Link href="/auth/login" className="text-primary hover:underline">Sign in</Link>
        </p>
      </div>
    </div>
  );
}
