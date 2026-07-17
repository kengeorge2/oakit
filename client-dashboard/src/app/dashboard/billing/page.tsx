'use client';

import { useEffect, useState } from 'react';
import { getBilling } from '@/lib/api';
import PageContainer from '@/components/layout/page-container';

export default function BillingPage() {
  const [billing, setBilling] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getBilling().then(setBilling).catch(() => {}).finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <PageContainer pageTitle="Billing" pageDescription="Loading..."><div className="animate-pulse space-y-4">{[1,2,3].map(i => <div key={i} className="h-16 rounded-lg bg-muted" />)}</div></PageContainer>;
  }

  return (
    <PageContainer pageTitle="Billing" pageDescription="View your payment history and invoices">
      <div className="space-y-4">
        {!billing?.data?.length ? (
          <div className="rounded-lg border bg-card p-12 text-center shadow-sm">
            <p className="text-muted-foreground">No payment history yet.</p>
          </div>
        ) : (
          <div className="rounded-lg border bg-card shadow-sm overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="border-b bg-muted/50">
                  <th className="px-4 py-3 text-left text-sm font-medium">Date</th>
                  <th className="px-4 py-3 text-left text-sm font-medium">Amount</th>
                  <th className="px-4 py-3 text-left text-sm font-medium">Status</th>
                  <th className="px-4 py-3 text-left text-sm font-medium">Method</th>
                </tr>
              </thead>
              <tbody>
                {billing.data.map((txn: any) => (
                  <tr key={txn.id} className="border-b last:border-0">
                    <td className="px-4 py-3 text-sm">{new Date(txn.created_at).toLocaleDateString()}</td>
                    <td className="px-4 py-3 text-sm font-medium">${txn.amount}</td>
                    <td className="px-4 py-3">
                      <span className={`rounded-full px-2 py-1 text-xs font-medium ${
                        txn.status === 'completed' ? 'bg-green-100 text-green-700' :
                        txn.status === 'pending' ? 'bg-yellow-100 text-yellow-700' :
                        'bg-red-100 text-red-700'
                      }`}>{txn.status}</span>
                    </td>
                    <td className="px-4 py-3 text-sm text-muted-foreground capitalize">{txn.payment_method || 'N/A'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </PageContainer>
  );
}
