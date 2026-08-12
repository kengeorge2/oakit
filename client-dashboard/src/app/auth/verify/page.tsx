'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/features/auth/auth-provider';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Suspense } from 'react';

function VerifyContent() {
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
            <p className="text-gray-400">Verifying your email...</p>
          </div>
        )}
        {status === 'success' && (
          <div className="rounded-lg border border-green-800 bg-green-900/20 p-6 text-green-400">
            <p>{message}</p>
          </div>
        )}
        {status === 'error' && (
          <div className="space-y-4">
            <div className="rounded-lg border border-red-800 bg-red-900/20 p-6 text-red-400">
              <p>{message}</p>
            </div>
            <Link href="/auth/login" className="text-blue-500 hover:underline">
              Go to Login
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

export default function VerifyPage() {
  return (
    <Suspense>
      <VerifyContent />
    </Suspense>
  );
}
