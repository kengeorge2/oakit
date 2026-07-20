'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/features/auth/auth-provider';
import { getDashboard } from '@/lib/api';
import PageContainer from '@/components/layout/page-container';

export default function DashboardPage() {
  const { user } = useAuth();
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getDashboard()
      .then(setData)
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <PageContainer pageTitle="Dashboard" pageDescription="Loading..."><div className="animate-pulse space-y-4"><div className="h-32 rounded-lg bg-muted" /><div className="grid grid-cols-3 gap-4">{[1,2,3].map(i => <div key={i} className="h-24 rounded-lg bg-muted" />)}</div></div></PageContainer>;
  }

  const sub = data?.subscription;
  const stats = data?.stats;

  return (
    <PageContainer pageTitle="Dashboard" pageDescription={`Welcome back, ${user?.name || 'there'}`}>
      <div className="space-y-6">
        {sub && (
          <div className="rounded-lg border bg-card p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold">{sub.plan?.name} Plan</h3>
                <p className="text-sm text-muted-foreground capitalize">Status: {sub.status}</p>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold">${sub.amount}</p>
                <p className="text-sm text-muted-foreground">/{sub.billing_cycle}</p>
              </div>
            </div>
            {sub.trial_ends_at && sub.status === 'trialing' && (
              <p className="mt-2 text-sm text-amber-600">
                Trial ends {new Date(sub.trial_ends_at).toLocaleDateString()} ({sub.days_until_renewal} days remaining)
              </p>
            )}
          </div>
        )}

        <div className="grid gap-4 md:grid-cols-3">
          <div className="rounded-lg border bg-card p-6 shadow-sm">
            <p className="text-sm text-muted-foreground">Subscribed Services</p>
            <p className="text-3xl font-bold">{stats?.subscribed_services || 0}</p>
          </div>
          <div className="rounded-lg border bg-card p-6 shadow-sm">
            <p className="text-sm text-muted-foreground">Open Tickets</p>
            <p className="text-3xl font-bold">{stats?.open_tickets || 0}</p>
          </div>
          <div className="rounded-lg border bg-card p-6 shadow-sm">
            <p className="text-sm text-muted-foreground">Total Tickets</p>
            <p className="text-3xl font-bold">{stats?.total_tickets || 0}</p>
          </div>
        </div>

        {data?.recent_tickets?.length > 0 && (
          <div className="rounded-lg border bg-card p-6 shadow-sm">
            <h3 className="mb-4 text-lg font-semibold">Recent Tickets</h3>
            <div className="space-y-3">
              {data.recent_tickets.map((ticket: any) => (
                <div key={ticket.id} className="flex items-center justify-between rounded-md border p-3">
                  <div>
                    <p className="font-medium">{ticket.ticket_number} — {ticket.subject}</p>
                    <p className="text-sm text-muted-foreground capitalize">{ticket.priority} priority</p>
                  </div>
                  <span className={`rounded-full px-2 py-1 text-xs font-medium ${
                    ticket.status === 'open' ? 'bg-blue-100 text-blue-700' :
                    ticket.status === 'in_progress' ? 'bg-yellow-100 text-yellow-700' :
                    'bg-green-100 text-green-700'
                  }`}>{ticket.status}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </PageContainer>
  );
}
