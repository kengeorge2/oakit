'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';

function extractError(data: any): string {
  if (typeof data.error === 'string') return data.error;
  if (data.error?.message) return data.error.message;
  if (data.message) return data.message;
  return 'An unexpected error occurred';
}

function VerifyForm() {
  const searchParams = useSearchParams();
  const token = searchParams.get('token');

  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const [message, setMessage] = useState('');

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
        if (!data.success) {
          setStatus('error');
          const errMsg = extractError(data);
          if (errMsg.includes('already used') || errMsg.includes('already been used')) {
            setMessage('This verification link has already been used. Please sign in to access your account.');
          } else if (errMsg.includes('expired')) {
            setMessage('This verification link has expired. Please request a new one from the sign-in page.');
          } else {
            setMessage(errMsg);
          }
        } else {
          setStatus('success');
          setMessage('Email verified successfully! Redirecting to dashboard...');
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
            <div className="pt-2 space-y-2">
              <Link href="/auth/signin" className="inline-block text-blue-400 hover:underline">
                Go to Sign In
              </Link>
              <div>
                <Link href="/auth/signup" className="text-gray-500 hover:text-gray-300 text-sm">
                  Create a new account
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
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
