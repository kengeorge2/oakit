'use client';

import { useEffect, useState } from 'react';
import { getSubscriptions } from '@/lib/api';
import PageContainer from '@/components/layout/page-container';

export default function SubscriptionsPage() {
  const [subscriptions, setSubscriptions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getSubscriptions()
      .then(setSubscriptions)
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <PageContainer pageTitle="My Plan" pageDescription="Loading..."><div className="animate-pulse space-y-4">{[1,2].map(i => <div key={i} className="h-32 rounded-lg bg-muted" />)}</div></PageContainer>;
  }

  return (
    <PageContainer pageTitle="My Plan" pageDescription="View your subscriptions and plan details">
      <div className="space-y-4">
        {subscriptions.length === 0 ? (
          <div className="rounded-lg border bg-card p-12 text-center shadow-sm">
            <p className="text-muted-foreground">No subscriptions yet.</p>
          </div>
        ) : (
          subscriptions.map((sub) => (
            <div key={sub.id} className="rounded-lg border bg-card p-6 shadow-sm">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-lg font-semibold">{sub.plan?.name}</h3>
                  <p className="text-sm text-muted-foreground capitalize">Billing: {sub.billing_cycle}</p>
                  <p className="text-sm text-muted-foreground capitalize">Status: {sub.status}</p>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold">${sub.amount}</p>
                  <p className="text-sm text-muted-foreground">/month</p>
                </div>
              </div>
              <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-muted-foreground">Start Date</p>
                  <p className="font-medium">{new Date(sub.starts_at).toLocaleDateString()}</p>
                </div>
                {sub.ends_at && (
                  <div>
                    <p className="text-muted-foreground">End Date</p>
                    <p className="font-medium">{new Date(sub.ends_at).toLocaleDateString()}</p>
                  </div>
                )}
                {sub.trial_ends_at && (
                  <div>
                    <p className="text-muted-foreground">Trial Ends</p>
                    <p className="font-medium">{new Date(sub.trial_ends_at).toLocaleDateString()}</p>
                  </div>
                )}
              </div>
              {sub.plan?.oakit_services && sub.plan.oakit_services.length > 0 && (
                <div className="mt-4">
                  <p className="mb-2 text-sm font-medium">Included Services</p>
                  <div className="flex flex-wrap gap-2">
                    {sub.plan.oakit_services.map((s: any) => (
                      <span key={s.id} className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">{s.title}</span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </PageContainer>
  );
}
