'use client';

import { useEffect, useState } from 'react';
import { getDesktopLicenses } from '@/lib/api';
import PageContainer from '@/components/layout/page-container';
import { safeFormatDate } from '@/lib/format';

export default function DesktopLicensesPage() {
  const [licenses, setLicenses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    getDesktopLicenses()
      .then((data) => setLicenses(data?.data || (Array.isArray(data) ? data : [])))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  const statusColor = (s: string) => {
    const map: Record<string, string> = {
      active: 'bg-green-100 text-green-700',
      pending: 'bg-yellow-100 text-yellow-700',
      expired: 'bg-orange-100 text-orange-700',
      revoked: 'bg-red-100 text-red-700',
      voided: 'bg-gray-100 text-gray-500',
    };
    return map[s] || 'bg-gray-100 text-gray-700';
  };

  return (
    <PageContainer pageTitle="Desktop Licenses" pageDescription="ClassicPOS desktop license management">
      {error && <div className="rounded-md bg-red-900/20 p-3 text-sm text-red-400">{error}</div>}

      {loading ? (
        <div className="animate-pulse space-y-3">
          {[1, 2, 3].map((i) => <div key={i} className="h-16 rounded-lg bg-gray-800" />)}
        </div>
      ) : licenses.length === 0 ? (
        <div className="rounded-lg border border-gray-800 bg-gray-900 p-12 text-center">
          <p className="text-gray-400">No desktop licenses found.</p>
        </div>
      ) : (
        <div className="rounded-lg border border-gray-800 bg-gray-900 overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-800 bg-gray-800/50">
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-300">Business</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-300">Email</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-300">Plan</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-300">Status</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-300">Activated</th>
              </tr>
            </thead>
            <tbody>
              {licenses.map((l: any) => (
                <tr key={l.id} className="border-b border-gray-800 last:border-0 hover:bg-gray-800/30">
                  <td className="px-4 py-3 text-sm text-white">{l.business_name || '—'}</td>
                  <td className="px-4 py-3 text-sm text-gray-400">{l.email}</td>
                  <td className="px-4 py-3 text-sm text-gray-400 capitalize">{l.plan || '—'}</td>
                  <td className="px-4 py-3">
                    <span className={`rounded-full px-2 py-1 text-xs font-medium ${statusColor(l.status)}`}>{l.status}</span>
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-400">{safeFormatDate(l.activated_at)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </PageContainer>
  );
}
