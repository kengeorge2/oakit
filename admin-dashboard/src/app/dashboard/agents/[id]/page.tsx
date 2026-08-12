'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { getAgentPerformance } from '@/lib/api';
import PageContainer from '@/components/layout/page-container';
import { formatMoney } from '@/lib/format';

export default function AgentDetailPage() {
  const { id } = useParams();
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    getAgentPerformance(id as string)
      .then(setData)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <PageContainer pageTitle="Agent Performance"><div className="animate-pulse h-64 rounded-lg bg-gray-800" /></PageContainer>;
  if (error) return <PageContainer pageTitle="Agent Performance"><p className="text-red-400">{error}</p></PageContainer>;

  return (
    <PageContainer pageTitle="Agent Performance" pageDescription={`Performance metrics for agent`}>
      {data ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { label: 'Total Referrals', value: data.total_referrals || 0 },
            { label: 'Active Referrals', value: data.active_referrals || 0 },
            { label: 'Total Earnings', value: formatMoney(data.total_earnings || 0, 'USD') },
          ].map((card) => (
            <div key={card.label} className="rounded-lg border border-gray-800 bg-gray-900 p-4">
              <p className="text-sm text-gray-400">{card.label}</p>
              <p className="text-2xl font-bold text-white">{card.value}</p>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-400">No performance data available.</p>
      )}
    </PageContainer>
  );
}
