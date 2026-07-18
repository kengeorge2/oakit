'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';

function VerifyForm() {
  const searchParams = useSearchParams();
  const token = searchParams.get('token');

  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const [message, setMessage] = useState('');
  const [tokenData, setTokenData] = useState<any>(null);

  useEffect(() => {
    if (!token) {
      setStatus('error');
      setMessage('No verification token provided. Please check your email for the correct link.');
      return;
    }

    fetch('/api/auth/verify-email', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ token }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          setStatus('error');
          setMessage(data.error);
        } else {
          setStatus('success');
          setMessage('Email verified successfully! Redirecting to dashboard...');
          setTokenData(data);
          localStorage.setItem('auth_token', data.token);
          setTimeout(() => {
            window.location.href = 'https://dashboard.oakitsolutionsandsupplies.com/dashboard';
          }, 2000);
        }
      })
      .catch(() => {
        setStatus('error');
        setMessage('Something went wrong. Please try again.');
      });
  }, [token]);

  return (
    <div className="w-full max-w-md space-y-6">
      <div className="text-center">
        <Link href="/" className="text-2xl font-bold text-white">OAK IT Solutions</Link>
        <p className="text-gray-400 mt-2">Email Verification</p>
      </div>

      <div className="rounded-lg border border-gray-800 bg-gray-900 p-6 shadow-sm text-center">
        {status === 'loading' && (
          <div className="space-y-4">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
            <p className="text-gray-300">Verifying your email...</p>
          </div>
        )}

        {status === 'success' && (
          <div className="space-y-4">
            <div className="rounded-full h-12 w-12 bg-green-500/20 flex items-center justify-center mx-auto">
              <svg className="w-6 h-6 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <p className="text-green-400 font-medium">{message}</p>
          </div>
        )}

        {status === 'error' && (
          <div className="space-y-4">
            <div className="rounded-full h-12 w-12 bg-red-500/20 flex items-center justify-center mx-auto">
              <svg className="w-6 h-6 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </div>
            <p className="text-red-400">{message}</p>
            <Link href="/auth/signup" className="inline-block text-blue-400 hover:underline mt-2">
              Create a new account
            </Link>
          </div>
        )}
      </div>

      <p className="text-center text-sm text-gray-400">
        <Link href="/auth/signin" className="text-blue-400 hover:underline">Back to Sign In</Link>
      </p>
    </div>
  );
}

export default function VerifyPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-950 p-4">
      <Suspense fallback={<div className="text-center text-gray-400">Loading...</div>}>
        <VerifyForm />
      </Suspense>
    </div>
  );
}
