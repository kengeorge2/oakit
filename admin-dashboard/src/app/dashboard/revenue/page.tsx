'use client';

import { useEffect, useState } from 'react';
import { getRevenueSummary, getRevenueMrr, getRevenueChurn, getRevenueLtv, getRevenueByPlan } from '@/lib/api';
import PageContainer from '@/components/layout/page-container';
import { formatMoney } from '@/lib/format';

export default function RevenuePage() {
  const [summary, setSummary] = useState<any>(null);
  const [mrr, setMrr] = useState<any>(null);
  const [churn, setChurn] = useState<any>(null);
  const [ltv, setLtv] = useState<any>(null);
  const [byPlan, setByPlan] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    Promise.all([getRevenueSummary(), getRevenueMrr(), getRevenueChurn(), getRevenueLtv(), getRevenueByPlan()])
      .then(([sum, m, ch, l, bp]) => {
        setSummary(sum);
        setMrr(m);
        setChurn(ch);
        setLtv(l);
        setByPlan(Array.isArray(bp) ? bp : bp?.data || []);
      })
      .catch((err) => setError(err.message || 'Failed to load'))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <PageContainer pageTitle="Revenue Analytics" pageDescription="Loading..."><div className="animate-pulse h-64 rounded-lg bg-gray-800" /></PageContainer>;
  }

  return (
    <PageContainer pageTitle="Revenue Analytics" pageDescription="MRR, ARR, churn, LTV, and plan breakdown">
      {error && <div className="rounded-md bg-red-900/20 p-3 text-sm text-red-400">{error}</div>}

      {/* MRR / ARR Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        {[
          { label: 'MRR', value: mrr?.mrr || 0, sub: `${mrr?.growth || 0}% growth`, color: 'text-blue-400' },
          { label: 'ARR', value: (mrr?.mrr || 0) * 12, sub: 'Annualized', color: 'text-purple-400' },
          { label: 'Churn Rate', value: null, sub: `${churn?.churn_rate || 0}%`, color: 'text-red-400' },
          { label: 'Avg LTV', value: ltv?.avg_ltv || 0, sub: `Over ${ltv?.avg_lifetime_months || 0} months`, color: 'text-green-400' },
        ].map((card) => (
          <div key={card.label} className="rounded-lg border border-gray-800 bg-gray-900 p-4">
            <p className="text-sm text-gray-400">{card.label}</p>
            <p className={`text-2xl font-bold ${card.color}`}>
              {card.value !== null ? formatMoney(card.value, 'USD') : card.sub}
            </p>
            {card.value !== null && <p className="text-xs text-gray-500">{card.sub}</p>}
          </div>
        ))}
      </div>

      {/* Revenue Summary */}
      {summary && (
        <div className="rounded-lg border border-gray-800 bg-gray-900 p-6 mb-6">
          <h3 className="text-lg font-semibold text-white mb-4">Payment Summary</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {Array.isArray(summary) && summary.map((s: any) => (
              <div key={s.status} className="text-center">
                <p className="text-sm text-gray-400 capitalize">{s.status}</p>
                <p className="text-xl font-bold text-white">{s.count}</p>
                <p className="text-sm text-gray-400">{formatMoney(s.total_amount, 'USD')}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Revenue by Plan */}
      {byPlan.length > 0 && (
        <div className="rounded-lg border border-gray-800 bg-gray-900 p-6">
          <h3 className="text-lg font-semibold text-white mb-4">Revenue by Plan</h3>
          <div className="rounded-lg border border-gray-800 overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-800 bg-gray-800/50">
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-300">Plan</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-300">Subscriptions</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-300">MRR</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-300">Revenue</th>
                </tr>
              </thead>
              <tbody>
                {byPlan.map((p: any, i: number) => (
                  <tr key={i} className="border-b border-gray-800 last:border-0">
                    <td className="px-4 py-3 text-sm text-white">{p.plan_name || p.name || '—'}</td>
                    <td className="px-4 py-3 text-sm text-gray-400">{p.subscription_count || p.count || 0}</td>
                    <td className="px-4 py-3 text-sm text-blue-400">{formatMoney(p.mrr || p.monthly_revenue || 0, 'USD')}</td>
                    <td className="px-4 py-3 text-sm text-white">{formatMoney(p.total_revenue || p.revenue || 0, 'USD')}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </PageContainer>
  );
}
