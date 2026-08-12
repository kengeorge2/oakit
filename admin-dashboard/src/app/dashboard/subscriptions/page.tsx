'use client';

import { useEffect, useState } from 'react';
import { getSubscriptions as getAdminSubscriptions } from '@/lib/api';
import PageContainer from '@/components/layout/page-container';
import { safeFormatDate, formatMoney } from '@/lib/format';

export default function SubscriptionsPage() {
  const [subs, setSubs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    getAdminSubscriptions()
      .then((data) => setSubs(data?.data || (Array.isArray(data) ? data : [])))
      .catch((err) => setError(err.message || 'Failed to load'))
      .finally(() => setLoading(false));
  }, []);

  const statusColor = (s: string) => {
    const map: Record<string, string> = {
      active: 'bg-green-100 text-green-700',
      trialing: 'bg-blue-100 text-blue-700',
      cancelled: 'bg-red-100 text-red-700',
      past_due: 'bg-yellow-100 text-yellow-700',
    };
    return map[s] || 'bg-gray-100 text-gray-700';
  };

  return (
    <PageContainer pageTitle="Subscriptions" pageDescription="All platform subscriptions">
      {error && <div className="rounded-md bg-red-900/20 p-3 text-sm text-red-400">{error}</div>}

      {loading ? (
        <div className="animate-pulse space-y-3">
          {[1, 2, 3].map((i) => <div key={i} className="h-16 rounded-lg bg-gray-800" />)}
        </div>
      ) : subs.length === 0 ? (
        <div className="rounded-lg border border-gray-800 bg-gray-900 p-12 text-center">
          <p className="text-gray-400">No subscriptions found.</p>
        </div>
      ) : (
        <div className="rounded-lg border border-gray-800 bg-gray-900 overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-800 bg-gray-800/50">
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-300">Plan</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-300">Status</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-300">Amount</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-300">Cycle</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-300">Currency</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-300">Created</th>
              </tr>
            </thead>
            <tbody>
              {subs.map((s: any) => (
                <tr key={s.id} className="border-b border-gray-800 last:border-0 hover:bg-gray-800/30">
                  <td className="px-4 py-3 text-sm text-white">{s.plan?.name || '—'}</td>
                  <td className="px-4 py-3">
                    <span className={`rounded-full px-2 py-1 text-xs font-medium ${statusColor(s.status)}`}>
                      {s.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-sm text-white font-medium">
                    {formatMoney(Number(s.amount) || 0, s.currency || 'USD')}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-400 capitalize">{s.billing_cycle || '—'}</td>
                  <td className="px-4 py-3 text-sm text-gray-400">{s.currency || 'USD'}</td>
                  <td className="px-4 py-3 text-sm text-gray-400">{safeFormatDate(s.created_at)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </PageContainer>
  );
}
