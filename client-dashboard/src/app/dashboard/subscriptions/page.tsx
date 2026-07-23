'use client';

import { useEffect, useState } from 'react';
import { getSubscriptions, getPlans, changePlan, cancelSubscription } from '@/lib/api';
import PageContainer from '@/components/layout/page-container';

export default function SubscriptionsPage() {
  const [subscriptions, setSubscriptions] = useState<any[]>([]);
  const [plans, setPlans] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const [showChangePlan, setShowChangePlan] = useState(false);
  const [selectedSub, setSelectedSub] = useState<any>(null);
  const [newPlanId, setNewPlanId] = useState('');
  const [newCycle, setNewCycle] = useState('monthly');
  const [changing, setChanging] = useState(false);

  const [showCancelConfirm, setShowCancelConfirm] = useState(false);
  const [cancelling, setCancelling] = useState(false);

  const loadData = async () => {
    try {
      const [subs, plns] = await Promise.all([getSubscriptions(), getPlans()]);
      setSubscriptions(subs?.data || (Array.isArray(subs) ? subs : []));
      setPlans(plns || []);
    } catch (err: any) {
      setError(err.message || 'Failed to load subscriptions');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { loadData(); }, []);

  const handleChangePlan = async () => {
    if (!selectedSub || !newPlanId) return;
    setChanging(true);
    setError('');
    try {
      await changePlan(selectedSub.id, { plan_id: newPlanId, billing_cycle: newCycle });
      setSuccess('Plan changed successfully!');
      setShowChangePlan(false);
      setSelectedSub(null);
      await loadData();
      setTimeout(() => setSuccess(''), 3000);
    } catch (err: any) {
      setError(err.message || 'Failed to change plan');
    } finally {
      setChanging(false);
    }
  };

  const handleCancel = async () => {
    if (!selectedSub) return;
    setCancelling(true);
    setError('');
    try {
      await cancelSubscription(selectedSub.id);
      setSuccess('Subscription cancelled.');
      setShowCancelConfirm(false);
      setSelectedSub(null);
      await loadData();
      setTimeout(() => setSuccess(''), 3000);
    } catch (err: any) {
      setError(err.message || 'Failed to cancel subscription');
    } finally {
      setCancelling(false);
    }
  };

  const openChangePlan = (sub: any) => {
    setSelectedSub(sub);
    setNewPlanId(sub.plan?.id || '');
    setNewCycle(sub.billing_cycle || 'monthly');
    setShowChangePlan(true);
  };

  const openCancelConfirm = (sub: any) => {
    setSelectedSub(sub);
    setShowCancelConfirm(true);
  };

  if (loading) {
    return (
      <PageContainer pageTitle="My Plan" pageDescription="Loading...">
        <div className="animate-pulse space-y-4">
          {[1, 2].map((i) => (
            <div key={i} className="h-32 rounded-lg bg-muted" />
          ))}
        </div>
      </PageContainer>
    );
  }

  return (
    <PageContainer pageTitle="My Plan" pageDescription="View and manage your subscriptions">
      <div className="space-y-4">
        {error && (
          <div className="rounded-md bg-destructive/10 p-3 text-sm text-destructive">{error}</div>
        )}
        {success && (
          <div className="rounded-md bg-green-50 p-3 text-sm text-green-700">{success}</div>
        )}

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
                  <p className="text-sm text-muted-foreground">/{sub.billing_cycle === 'yearly' ? 'year' : 'month'}</p>
                </div>
              </div>

              <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-muted-foreground">Start Date</p>
                  <p className="font-medium">{sub.starts_at ? new Date(sub.starts_at).toLocaleDateString() : 'N/A'}</p>
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
                      <span key={s.id} className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                        {s.title}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {(sub.status === 'active' || sub.status === 'trialing') && (
                <div className="mt-4 flex gap-2 border-t pt-4">
                  <button
                    onClick={() => openChangePlan(sub)}
                    className="rounded-md border px-4 py-2 text-sm font-medium hover:bg-accent"
                  >
                    Change Plan
                  </button>
                  <button
                    onClick={() => openCancelConfirm(sub)}
                    className="rounded-md border border-red-300 px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-50"
                  >
                    Cancel Subscription
                  </button>
                </div>
              )}
            </div>
          ))
        )}

        {showChangePlan && selectedSub && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
            <div className="w-full max-w-md rounded-lg bg-card p-6 shadow-xl">
              <h3 className="text-lg font-semibold mb-4">Change Plan</h3>

              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Select New Plan</label>
                  <select
                    value={newPlanId}
                    onChange={(e) => setNewPlanId(e.target.value)}
                    className="flex h-10 w-full rounded-md border bg-background px-3 py-2 text-sm"
                  >
                    {plans.map((p) => (
                      <option key={p.id} value={p.id}>
                        {p.name} — ${p.price_monthly}/mo
                      </option>
                    ))}
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Billing Cycle</label>
                  <select
                    value={newCycle}
                    onChange={(e) => setNewCycle(e.target.value)}
                    className="flex h-10 w-full rounded-md border bg-background px-3 py-2 text-sm"
                  >
                    <option value="monthly">Monthly</option>
                    <option value="yearly">Yearly</option>
                  </select>
                </div>
              </div>

              <div className="mt-6 flex justify-end gap-2">
                <button
                  onClick={() => { setShowChangePlan(false); setSelectedSub(null); }}
                  className="rounded-md border px-4 py-2 text-sm font-medium hover:bg-accent"
                >
                  Cancel
                </button>
                <button
                  onClick={handleChangePlan}
                  disabled={changing || !newPlanId}
                  className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 disabled:opacity-50"
                >
                  {changing ? 'Changing...' : 'Confirm Change'}
                </button>
              </div>
            </div>
          </div>
        )}

        {showCancelConfirm && selectedSub && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
            <div className="w-full max-w-md rounded-lg bg-card p-6 shadow-xl">
              <h3 className="text-lg font-semibold mb-2">Cancel Subscription</h3>
              <p className="text-sm text-muted-foreground mb-6">
                Are you sure you want to cancel your <strong>{selectedSub.plan?.name}</strong> subscription?
                You will lose access to all included services at the end of the current billing period.
              </p>

              <div className="flex justify-end gap-2">
                <button
                  onClick={() => { setShowCancelConfirm(false); setSelectedSub(null); }}
                  className="rounded-md border px-4 py-2 text-sm font-medium hover:bg-accent"
                >
                  Keep Subscription
                </button>
                <button
                  onClick={handleCancel}
                  disabled={cancelling}
                  className="rounded-md bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700 disabled:opacity-50"
                >
                  {cancelling ? 'Cancelling...' : 'Yes, Cancel'}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </PageContainer>
  );
}
