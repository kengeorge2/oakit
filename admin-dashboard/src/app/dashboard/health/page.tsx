'use client';

import { useEffect, useState } from 'react';
import { getHealth } from '@/lib/api';
import PageContainer from '@/components/layout/page-container';

export default function HealthPage() {
  const [health, setHealth] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    getHealth()
      .then(setHealth)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <PageContainer pageTitle="System Health"><div className="animate-pulse h-64 rounded-lg bg-gray-800" /></PageContainer>;

  return (
    <PageContainer pageTitle="System Health" pageDescription="Platform system status">
      {error && <div className="rounded-md bg-red-900/20 p-3 text-sm text-red-400 mb-4">{error}</div>}

      {health ? (
        <div className="rounded-lg border border-gray-800 bg-gray-900 p-6">
          <pre className="text-sm text-gray-300 whitespace-pre-wrap">{JSON.stringify(health, null, 2)}</pre>
        </div>
      ) : (
        <div className="rounded-lg border border-gray-800 bg-gray-900 p-12 text-center">
          <p className="text-gray-400">Unable to fetch health status.</p>
        </div>
      )}
    </PageContainer>
  );
}
