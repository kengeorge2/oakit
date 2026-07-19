'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function SigninPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [verificationRequired, setVerificationRequired] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://posapp.oakitsolutionsandsupplies.com/api/v1/client';

  const extractError = (data: any): string => {
    if (typeof data.error === 'string') return data.error;
    if (data.error?.message) return data.error.message;
    if (data.message) return data.message;
    return 'Login failed';
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setVerificationRequired(false);
    setIsLoading(true);
    try {
      const res = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();

      if (!res.ok) {
        if (data.verification_required) {
          setVerificationRequired(true);
          return;
        }
        throw new Error(extractError(data));
      }

      localStorage.setItem('auth_token', data.token);
      window.location.href = 'https://dashboard.oakitsolutionsandsupplies.com/dashboard';
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const resendVerification = async () => {
    try {
      await fetch('/api/auth/send-verification', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
    } catch {}
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-950 p-4">
      <div className="w-full max-w-md space-y-6">
        <div className="text-center">
          <Link href="/" className="text-2xl font-bold text-white">OAK IT Solutions</Link>
          <p className="text-gray-400 mt-2">Sign in to your dashboard</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 rounded-lg border border-gray-800 bg-gray-900 p-6 shadow-sm">
          {error && (
            <div className="rounded-md bg-red-500/10 p-3 text-sm text-red-400">{error}</div>
          )}

          {verificationRequired && (
            <div className="rounded-md bg-yellow-500/10 p-3 text-sm text-yellow-400">
              <p className="font-medium">Email not verified</p>
              <p className="mt-1">Please check your email for the verification link.</p>
              <button type="button" onClick={resendVerification} className="mt-2 text-yellow-300 underline hover:text-yellow-200">
                Resend verification email
              </button>
            </div>
          )}

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-300" htmlFor="email">Email</label>
            <input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required
              className="flex h-10 w-full rounded-md border border-gray-700 bg-gray-800 px-3 py-2 text-sm text-white"
              placeholder="you@company.com" />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-300" htmlFor="password">Password</label>
            <input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required
              className="flex h-10 w-full rounded-md border border-gray-700 bg-gray-800 px-3 py-2 text-sm text-white"
              placeholder="Your password" />
          </div>

          <button type="submit" disabled={isLoading}
            className="flex h-10 w-full items-center justify-center rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 disabled:opacity-50">
            {isLoading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>

        <p className="text-center text-sm text-gray-400">
          Don&apos;t have an account?{' '}
          <Link href="/auth/signup" className="text-blue-400 hover:underline">Sign up</Link>
        </p>
      </div>
    </div>
  );
}
