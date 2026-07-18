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
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [step, setStep] = useState<'form' | 'verify-sent'>('form');

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

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!form.name.trim() || form.name.trim().length < 2) {
      newErrors.name = 'Full name is required (min 2 characters)';
    }

    if (!form.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!form.company_name.trim() || form.company_name.trim().length < 2) {
      newErrors.company_name = 'Company name is required';
    }

    if (!form.company_phone.trim() || form.company_phone.trim().length < 7) {
      newErrors.company_phone = 'Valid phone number is required (min 7 characters)';
    }

    if (!form.plan_id) {
      newErrors.plan_id = 'Please select a plan';
    }

    if (!form.password) {
      newErrors.password = 'Password is required';
    } else if (form.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    }

    if (!form.password_confirmation) {
      newErrors.password_confirmation = 'Please confirm your password';
    } else if (form.password !== form.password_confirmation) {
      newErrors.password_confirmation = 'Passwords do not match';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!validate()) return;

    setIsLoading(true);
    try {
      const res = await fetch(`${API_URL}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();

      if (!res.ok) {
        if (data.error?.details) {
          const serverErrors: Record<string, string> = {};
          for (const [field, msgs] of Object.entries(data.error.details)) {
            serverErrors[field] = (msgs as string[])[0];
          }
          setErrors(serverErrors);
          setError('Please fix the errors below');
        } else if (data.errors) {
          const serverErrors: Record<string, string> = {};
          for (const [field, msgs] of Object.entries(data.errors)) {
            serverErrors[field] = (msgs as string[])[0];
          }
          setErrors(serverErrors);
          setError('Please fix the errors below');
        } else {
          const msg = typeof data.error === 'string' ? data.error : data.error?.message || data.message || 'Registration failed';
          setError(msg);
        }
        return;
      }

      setStep('verify-sent');

      fetch('/api/auth/send-verification', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: form.email }),
      }).catch(() => {});

    } catch (err: any) {
      setError(err.message || 'Something went wrong');
    } finally {
      setIsLoading(false);
    }
  };

  const update = (field: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: '' }));
  };

  const selectedPlan = plans.find((p) => p.id === form.plan_id);

  if (step === 'verify-sent') {
    return (
      <div className="rounded-lg border border-gray-800 bg-gray-900 p-8 shadow-sm text-center space-y-4">
        <div className="rounded-full h-16 w-16 bg-green-500/20 flex items-center justify-center mx-auto">
          <svg className="w-8 h-8 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h2 className="text-xl font-bold text-white">Account Created!</h2>
        <p className="text-gray-400">
          Your OAK IT Solutions account has been created successfully.
        </p>
        <p className="text-gray-400">
          We&apos;ve sent a verification link to<br />
          <span className="text-white font-medium">{form.email}</span>
        </p>
        <p className="text-gray-500 text-sm">
          Click the link in the email to verify your account and access the dashboard.
          The link expires in 24 hours.
        </p>
        <p className="text-gray-600 text-xs">
          Don&apos;t forget to check your spam/junk folder if you don&apos;t see the email.
        </p>
        <div className="pt-4 space-y-2">
          <button
            onClick={() => {
              fetch('/api/auth/send-verification', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email: form.email }),
              });
            }}
            className="text-blue-400 hover:underline text-sm"
          >
            Didn&apos;t receive it? Resend email
          </button>
          <div>
            <Link href="/auth/signin" className="text-gray-500 hover:text-gray-300 text-sm">
              Back to Sign In
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 rounded-lg border border-gray-800 bg-gray-900 p-6 shadow-sm">
      {error && (
        <div className="rounded-md bg-red-500/10 p-3 text-sm text-red-400">{error}</div>
      )}

      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-300" htmlFor="name">
          Full Name <span className="text-red-400">*</span>
        </label>
        <input id="name" type="text" value={form.name} onChange={update('name')}
          className={`flex h-10 w-full rounded-md border bg-gray-800 px-3 py-2 text-sm text-white ${errors.name ? 'border-red-500' : 'border-gray-700'}`}
          placeholder="e.g. John Doe" />
        {errors.name && <p className="text-xs text-red-400">{errors.name}</p>}
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-300" htmlFor="email">
          Email <span className="text-red-400">*</span>
        </label>
        <input id="email" type="email" autoComplete="username" value={form.email} onChange={update('email')}
          className={`flex h-10 w-full rounded-md border bg-gray-800 px-3 py-2 text-sm text-white ${errors.email ? 'border-red-500' : 'border-gray-700'}`}
          placeholder="you@company.com" />
        {errors.email && <p className="text-xs text-red-400">{errors.email}</p>}
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-300" htmlFor="company_name">
          Company Name <span className="text-red-400">*</span>
        </label>
        <input id="company_name" type="text" value={form.company_name} onChange={update('company_name')}
          className={`flex h-10 w-full rounded-md border bg-gray-800 px-3 py-2 text-sm text-white ${errors.company_name ? 'border-red-500' : 'border-gray-700'}`}
          placeholder="e.g. Acme Corp" />
        {errors.company_name && <p className="text-xs text-red-400">{errors.company_name}</p>}
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-300" htmlFor="company_phone">
          Company Phone <span className="text-red-400">*</span>
        </label>
        <input id="company_phone" type="tel" value={form.company_phone} onChange={update('company_phone')}
          className={`flex h-10 w-full rounded-md border bg-gray-800 px-3 py-2 text-sm text-white ${errors.company_phone ? 'border-red-500' : 'border-gray-700'}`}
          placeholder="e.g. +256 704 302335" />
        {errors.company_phone && <p className="text-xs text-red-400">{errors.company_phone}</p>}
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-300" htmlFor="plan_id">
          Select Plan <span className="text-red-400">*</span>
        </label>
        <select id="plan_id" value={form.plan_id} onChange={update('plan_id')}
          className={`flex h-10 w-full rounded-md border bg-gray-800 px-3 py-2 text-sm text-white ${errors.plan_id ? 'border-red-500' : 'border-gray-700'}`}>
          <option value="">Choose a plan</option>
          {plans.map((p) => (
            <option key={p.id} value={p.id}>
              {p.name} — ${p.price_monthly}/mo{p.price_yearly > 0 ? ` ($${p.price_yearly}/yr)` : ''}
            </option>
          ))}
        </select>
        {errors.plan_id && <p className="text-xs text-red-400">{errors.plan_id}</p>}
      </div>

      {selectedPlan && (
        <div className="rounded-md bg-blue-500/10 p-3 text-sm text-blue-400">
          <p className="font-medium">{selectedPlan.name} Plan — ${selectedPlan.price_monthly}/mo</p>
          <p className="text-blue-300/70">{selectedPlan.description}</p>
          {selectedPlan.features && (
            <ul className="mt-2 space-y-1">
              {selectedPlan.features.slice(0, 4).map((f: string, i: number) => (
                <li key={i}>✓ {f}</li>
              ))}
            </ul>
          )}
        </div>
      )}

      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-300" htmlFor="password">
          Password <span className="text-red-400">*</span>
        </label>
        <input id="password" type="password" autoComplete="new-password" value={form.password} onChange={update('password')}
          className={`flex h-10 w-full rounded-md border bg-gray-800 px-3 py-2 text-sm text-white ${errors.password ? 'border-red-500' : 'border-gray-700'}`}
          placeholder="Min 8 characters" />
        {errors.password && <p className="text-xs text-red-400">{errors.password}</p>}
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-300" htmlFor="password_confirmation">
          Confirm Password <span className="text-red-400">*</span>
        </label>
        <input id="password_confirmation" type="password" autoComplete="new-password" value={form.password_confirmation} onChange={update('password_confirmation')}
          className={`flex h-10 w-full rounded-md border bg-gray-800 px-3 py-2 text-sm text-white ${errors.password_confirmation ? 'border-red-500' : 'border-gray-700'}`}
          placeholder="Re-enter password" />
        {errors.password_confirmation && <p className="text-xs text-red-400">{errors.password_confirmation}</p>}
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
