'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/features/auth/auth-provider';
import { getDashboard } from '@/lib/api';

export default function DashboardPage() {
  const { user } = useAuth();
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    getDashboard()
      .then(setData)
      .catch((err) => setError(err.message || 'Failed to load dashboard'))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="animate-pulse space-y-4">
        <div className="h-32 rounded-lg bg-gray-800" />
        <div className="grid grid-cols-3 gap-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-24 rounded-lg bg-gray-800" />
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="space-y-4">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <div className="rounded-md bg-destructive/10 p-3 text-sm text-destructive">{error}</div>
      </div>
    );
  }

  const sub = data?.subscription;
  const stats = data?.stats;

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Dashboard</h1>
      <p className="text-gray-400">Welcome back, {user?.name || 'there'}</p>

      {sub && (
        <div className="rounded-lg border border-gray-800 bg-gray-900 p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold">{sub.plan?.name} Plan</h3>
              <p className="text-sm text-gray-400 capitalize">Status: {sub.status}</p>
            </div>
            <div className="text-right">
              <p className="text-2xl font-bold">${sub.amount}</p>
              <p className="text-sm text-gray-400">/{sub.billing_cycle === 'yearly' ? 'year' : 'month'}</p>
            </div>
          </div>
          {sub.trial_ends_at && sub.status === 'trialing' && (
            <p className="mt-2 text-sm text-amber-500">
              Trial ends {new Date(sub.trial_ends_at).toLocaleDateString()}
            </p>
          )}
        </div>
      )}

      {!sub && (
        <div className="rounded-lg border border-gray-800 bg-gray-900 p-6 text-center">
          <p className="text-gray-400 mb-2">No active subscription</p>
          <a href="https://oakitsolutionsandsupplies.com/#pricing" target="_blank" rel="noopener noreferrer"
            className="text-sm text-primary hover:underline">
            View plans and subscribe →
          </a>
        </div>
      )}

      <div className="grid gap-4 md:grid-cols-3">
        <div className="rounded-lg border border-gray-800 bg-gray-900 p-6">
          <p className="text-sm text-gray-400">Subscribed Services</p>
          <p className="text-3xl font-bold">{stats?.subscribed_services || 0}</p>
        </div>
        <div className="rounded-lg border border-gray-800 bg-gray-900 p-6">
          <p className="text-sm text-gray-400">Open Tickets</p>
          <p className="text-3xl font-bold">{stats?.open_tickets || 0}</p>
        </div>
        <div className="rounded-lg border border-gray-800 bg-gray-900 p-6">
          <p className="text-sm text-gray-400">Total Tickets</p>
          <p className="text-3xl font-bold">{stats?.total_tickets || 0}</p>
        </div>
      </div>

      {data?.recent_tickets?.length > 0 && (
        <div className="rounded-lg border border-gray-800 bg-gray-900 p-6">
          <h3 className="mb-4 text-lg font-semibold">Recent Tickets</h3>
          <div className="space-y-3">
            {data.recent_tickets.map((ticket: any) => (
              <div key={ticket.id} className="flex items-center justify-between rounded-md border border-gray-700 p-3">
                <div>
                  <p className="font-medium">{ticket.ticket_number} — {ticket.subject}</p>
                  <p className="text-sm text-gray-400">{ticket.priority} priority</p>
                </div>
                <span className={`rounded-full px-2 py-1 text-xs font-medium ${
                  ticket.status === 'open' ? 'bg-blue-900 text-blue-300' :
                  ticket.status === 'in_progress' ? 'bg-yellow-900 text-yellow-300' :
                  ticket.status === 'waiting_reply' ? 'bg-purple-900 text-purple-300' :
                  'bg-green-900 text-green-300'
                }`}>{ticket.status}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
