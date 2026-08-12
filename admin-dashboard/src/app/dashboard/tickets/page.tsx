'use client';

import { useEffect, useState } from 'react';
import { getTickets } from '@/lib/api';
import PageContainer from '@/components/layout/page-container';
import { safeFormatDate } from '@/lib/format';

export default function TicketsPage() {
  const [tickets, setTickets] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    getTickets()
      .then((data) => setTickets(data?.data || (Array.isArray(data) ? data : [])))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  const statusColor = (s: string) => {
    const map: Record<string, string> = {
      open: 'bg-green-100 text-green-700',
      in_progress: 'bg-blue-100 text-blue-700',
      waiting_reply: 'bg-yellow-100 text-yellow-700',
      resolved: 'bg-gray-100 text-gray-700',
      closed: 'bg-gray-100 text-gray-500',
    };
    return map[s] || 'bg-gray-100 text-gray-700';
  };

  return (
    <PageContainer pageTitle="Support Tickets" pageDescription="Manage support tickets">
      {error && <div className="rounded-md bg-red-900/20 p-3 text-sm text-red-400">{error}</div>}

      {loading ? (
        <div className="animate-pulse space-y-3">
          {[1, 2, 3].map((i) => <div key={i} className="h-16 rounded-lg bg-gray-800" />)}
        </div>
      ) : tickets.length === 0 ? (
        <div className="rounded-lg border border-gray-800 bg-gray-900 p-12 text-center">
          <p className="text-gray-400">No tickets found.</p>
        </div>
      ) : (
        <div className="rounded-lg border border-gray-800 bg-gray-900 overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-800 bg-gray-800/50">
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-300">Subject</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-300">Status</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-300">Priority</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-300">Created</th>
              </tr>
            </thead>
            <tbody>
              {tickets.map((t: any) => (
                <tr key={t.id} className="border-b border-gray-800 last:border-0 hover:bg-gray-800/30">
                  <td className="px-4 py-3 text-sm text-white">{t.subject}</td>
                  <td className="px-4 py-3">
                    <span className={`rounded-full px-2 py-1 text-xs font-medium ${statusColor(t.status)}`}>{t.status}</span>
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-400 capitalize">{t.priority || '—'}</td>
                  <td className="px-4 py-3 text-sm text-gray-400">{safeFormatDate(t.created_at)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </PageContainer>
  );
}
