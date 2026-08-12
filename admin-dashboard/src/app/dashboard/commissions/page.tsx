'use client';

import { useEffect, useState, useCallback } from 'react';
import { getCommissions, getCommissionsSummary, approveCommission, payCommission } from '@/lib/api';
import PageContainer from '@/components/layout/page-container';
import { safeFormatDate, formatMoney } from '@/lib/format';

export default function CommissionsPage() {
  const [commissions, setCommissions] = useState<any[]>([]);
  const [summary, setSummary] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [actionLoading, setActionLoading] = useState<string | null>(null);

  const loadData = useCallback(async () => {
    setLoading(true);
    try {
      const [list, sum] = await Promise.all([getCommissions(), getCommissionsSummary()]);
      setCommissions(list?.data || (Array.isArray(list) ? list : []));
      setSummary(sum);
    } catch (err: any) {
      setError(err.message || 'Failed to load');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { loadData(); }, [loadData]);

  const handleApprove = async (id: string) => {
    setActionLoading(id);
    try {
      await approveCommission(id);
      await loadData();
    } catch (err: any) {
      setError(err.message || 'Approve failed');
    } finally {
      setActionLoading(null);
    }
  };

  const handlePay = async (id: string) => {
    setActionLoading(id);
    try {
      await payCommission(id);
      await loadData();
    } catch (err: any) {
      setError(err.message || 'Pay failed');
    } finally {
      setActionLoading(null);
    }
  };

  const statusColor = (s: string) => {
    const map: Record<string, string> = { pending: 'bg-yellow-100 text-yellow-700', cleared: 'bg-blue-100 text-blue-700', paid: 'bg-green-100 text-green-700' };
    return map[s] || 'bg-gray-100 text-gray-700';
  };

  return (
    <PageContainer pageTitle="Commissions" pageDescription="Agent commission management">
      {error && <div className="rounded-md bg-red-900/20 p-3 text-sm text-red-400">{error}</div>}

      {/* Summary Cards */}
      {summary && (
        <div className="grid grid-cols-3 gap-4 mb-6">
          {[
            { label: 'Pending', value: summary.total_pending, color: 'text-yellow-400' },
            { label: 'Cleared', value: summary.total_cleared, color: 'text-blue-400' },
            { label: 'Paid', value: summary.total_paid, color: 'text-green-400' },
          ].map((card) => (
            <div key={card.label} className="rounded-lg border border-gray-800 bg-gray-900 p-4">
              <p className="text-sm text-gray-400">{card.label}</p>
              <p className={`text-2xl font-bold ${card.color}`}>{formatMoney(card.value, 'USD')}</p>
            </div>
          ))}
        </div>
      )}

      {loading ? (
        <div className="animate-pulse space-y-3">
          {[1, 2, 3].map((i) => <div key={i} className="h-16 rounded-lg bg-gray-800" />)}
        </div>
      ) : commissions.length === 0 ? (
        <div className="rounded-lg border border-gray-800 bg-gray-900 p-12 text-center">
          <p className="text-gray-400">No commissions found.</p>
        </div>
      ) : (
        <div className="rounded-lg border border-gray-800 bg-gray-900 overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-800 bg-gray-800/50">
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-300">Agent</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-300">Amount</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-300">Status</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-300">Date</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-300">Actions</th>
              </tr>
            </thead>
            <tbody>
              {commissions.map((c: any) => (
                <tr key={c.id} className="border-b border-gray-800 last:border-0 hover:bg-gray-800/30">
                  <td className="px-4 py-3 text-sm text-white">{c.agent?.name || '—'}</td>
                  <td className="px-4 py-3 text-sm text-white font-medium">{formatMoney(c.amount, 'USD')}</td>
                  <td className="px-4 py-3">
                    <span className={`rounded-full px-2 py-1 text-xs font-medium ${statusColor(c.status)}`}>{c.status}</span>
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-400">{safeFormatDate(c.created_at)}</td>
                  <td className="px-4 py-3 flex gap-2">
                    {c.status === 'pending' && (
                      <button onClick={() => handleApprove(c.id)} disabled={actionLoading === c.id}
                        className="text-sm text-blue-400 hover:underline disabled:opacity-50">
                        {actionLoading === c.id ? '...' : 'Approve'}
                      </button>
                    )}
                    {(c.status === 'pending' || c.status === 'cleared') && (
                      <button onClick={() => handlePay(c.id)} disabled={actionLoading === c.id}
                        className="text-sm text-green-400 hover:underline disabled:opacity-50">
                        {actionLoading === c.id ? '...' : 'Pay'}
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </PageContainer>
  );
}
