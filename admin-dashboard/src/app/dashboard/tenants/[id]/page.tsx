'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { getTenant, suspendTenant, activateTenant, cancelTenant, impersonateTenant } from '@/lib/api';
import PageContainer from '@/components/layout/page-container';
import { safeFormatDate, formatMoney } from '@/lib/format';

export default function TenantDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const [tenant, setTenant] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [actionLoading, setActionLoading] = useState('');

  useEffect(() => {
    getTenant(id as string)
      .then(setTenant)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [id]);

  const handleAction = async (action: string) => {
    setActionLoading(action);
    try {
      if (action === 'suspend') await suspendTenant(id as string);
      else if (action === 'activate') await activateTenant(id as string);
      else if (action === 'cancel') await cancelTenant(id as string);
      else if (action === 'impersonate') {
        const result = await impersonateTenant(id as string);
        if (result?.redirect_url) window.open(result.redirect_url, '_blank');
      }
      // Refresh tenant data
      const updated = await getTenant(id as string);
      setTenant(updated);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setActionLoading('');
    }
  };

  if (loading) return <PageContainer pageTitle="Tenant"><div className="animate-pulse h-64 rounded-lg bg-gray-800" /></PageContainer>;
  if (!tenant) return <PageContainer pageTitle="Tenant"><p className="text-red-400">Tenant not found.</p></PageContainer>;

  const sub = tenant.subscription;

  return (
    <PageContainer
      pageTitle={tenant.name}
      pageDescription={`Tenant: ${tenant.slug}`}
      pageHeaderAction={
        <div className="flex gap-2">
          {tenant.status === 'active' && (
            <button onClick={() => handleAction('suspend')} disabled={!!actionLoading}
              className="rounded-lg bg-yellow-600 px-3 py-1.5 text-sm text-white hover:bg-yellow-500 disabled:opacity-50">
              Suspend
            </button>
          )}
          {tenant.status === 'suspended' && (
            <button onClick={() => handleAction('activate')} disabled={!!actionLoading}
              className="rounded-lg bg-green-600 px-3 py-1.5 text-sm text-white hover:bg-green-500 disabled:opacity-50">
              Activate
            </button>
          )}
          {tenant.status !== 'cancelled' && (
            <button onClick={() => handleAction('cancel')} disabled={!!actionLoading}
              className="rounded-lg bg-red-600 px-3 py-1.5 text-sm text-white hover:bg-red-500 disabled:opacity-50">
              Cancel
            </button>
          )}
          <button onClick={() => handleAction('impersonate')} disabled={!!actionLoading}
            className="rounded-lg bg-blue-600 px-3 py-1.5 text-sm text-white hover:bg-blue-500 disabled:opacity-50">
            Impersonate
          </button>
        </div>
      }
    >
      {error && <div className="rounded-md bg-red-900/20 p-3 text-sm text-red-400 mb-4">{error}</div>}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Tenant Info */}
        <div className="rounded-lg border border-gray-800 bg-gray-900 p-6">
          <h3 className="text-lg font-semibold text-white mb-4">Tenant Info</h3>
          <div className="space-y-3 text-sm">
            <div className="flex justify-between"><span className="text-gray-400">Name</span><span className="text-white">{tenant.name}</span></div>
            <div className="flex justify-between"><span className="text-gray-400">Slug</span><span className="text-white font-mono">{tenant.slug}</span></div>
            <div className="flex justify-between"><span className="text-gray-400">Status</span><span className={`px-2 py-0.5 rounded text-xs font-medium ${tenant.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'}`}>{tenant.status}</span></div>
            <div className="flex justify-between"><span className="text-gray-400">Business</span><span className="text-white">{tenant.business_name || '—'}</span></div>
            <div className="flex justify-between"><span className="text-gray-400">Created</span><span className="text-white">{safeFormatDate(tenant.created_at)}</span></div>
          </div>
        </div>

        {/* Subscription */}
        <div className="rounded-lg border border-gray-800 bg-gray-900 p-6">
          <h3 className="text-lg font-semibold text-white mb-4">Subscription</h3>
          {sub ? (
            <div className="space-y-3 text-sm">
              <div className="flex justify-between"><span className="text-gray-400">Plan</span><span className="text-white">{sub.plan?.name || '—'}</span></div>
              <div className="flex justify-between"><span className="text-gray-400">Status</span><span className="text-white">{sub.status}</span></div>
              <div className="flex justify-between"><span className="text-gray-400">Amount</span><span className="text-white">{formatMoney(Number(sub.amount) || 0, sub.currency || 'USD')}</span></div>
              <div className="flex justify-between"><span className="text-gray-400">Cycle</span><span className="text-white capitalize">{sub.billing_cycle || '—'}</span></div>
            </div>
          ) : (
            <p className="text-gray-400 text-sm">No active subscription.</p>
          )}
        </div>

        {/* Stats */}
        <div className="rounded-lg border border-gray-800 bg-gray-900 p-6">
          <h3 className="text-lg font-semibold text-white mb-4">Activity</h3>
          <div className="space-y-3 text-sm">
            <div className="flex justify-between"><span className="text-gray-400">Support Tickets</span><span className="text-white">{tenant.support_tickets_count || 0}</span></div>
            <div className="flex justify-between"><span className="text-gray-400">Payments</span><span className="text-white">{tenant.payment_transactions_count || 0}</span></div>
          </div>
        </div>
      </div>
    </PageContainer>
  );
}
