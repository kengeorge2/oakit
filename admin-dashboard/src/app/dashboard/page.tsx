'use client';

import { useEffect, useState } from 'react';
import { getDashboard } from '@/lib/api';
import { formatMoney } from '@/lib/format';
import PageContainer from '@/components/layout/page-container';

interface DashboardData {
  tenants: {
    total: number;
    active: number;
    trialing: number;
    suspended: number;
    cancelled: number;
  };
  mrr: number;
  mrr_growth: number;
  revenue_this_month: number;
  revenue_this_year: number;
  active_subscriptions: number;
  open_tickets: number;
  pending_commissions: number;
}

export default function DashboardPage() {
  const [data, setData] = useState<DashboardData | null>(null);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getDashboard()
      .then(setData)
      .catch((err) => setError(err.message))
      .finally(() => setIsLoading(false));
  }, []);

  if (isLoading) {
    return (
      <PageContainer pageTitle="Dashboard">
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
        </div>
      </PageContainer>
    );
  }

  if (error) {
    return (
      <PageContainer pageTitle="Dashboard">
        <div className="rounded-md bg-destructive/10 p-4 text-sm text-destructive">{error}</div>
      </PageContainer>
    );
  }

  return (
    <PageContainer pageTitle="Admin Dashboard" pageDescription="Platform overview and key metrics">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Tenants */}
        <div className="rounded-lg border border-gray-800 bg-gray-900 p-4">
          <h3 className="text-sm font-medium text-gray-400">Total Tenants</h3>
          <p className="text-2xl font-bold mt-1">{data?.tenants?.total ?? 0}</p>
          <div className="mt-2 flex gap-3 text-xs text-gray-500">
            <span>Active: {data?.tenants?.active ?? 0}</span>
            <span>Trial: {data?.tenants?.trialing ?? 0}</span>
          </div>
          <div className="mt-1 flex gap-3 text-xs text-gray-500">
            <span>Suspended: {data?.tenants?.suspended ?? 0}</span>
            <span>Cancelled: {data?.tenants?.cancelled ?? 0}</span>
          </div>
        </div>

        {/* MRR */}
        <div className="rounded-lg border border-gray-800 bg-gray-900 p-4">
          <h3 className="text-sm font-medium text-gray-400">Monthly Recurring Revenue</h3>
          <p className="text-2xl font-bold mt-1">{formatMoney(data?.mrr ?? 0)}</p>
          <p className="text-xs text-gray-500 mt-1">
            Growth: {(data?.mrr_growth ?? 0) > 0 ? '+' : ''}{(data?.mrr_growth ?? 0).toFixed(1)}%
          </p>
        </div>

        {/* Revenue */}
        <div className="rounded-lg border border-gray-800 bg-gray-900 p-4">
          <h3 className="text-sm font-medium text-gray-400">Revenue</h3>
          <p className="text-2xl font-bold mt-1">{formatMoney(data?.revenue_this_month ?? 0)}</p>
          <p className="text-xs text-gray-500 mt-1">This month</p>
          <p className="text-sm font-medium mt-2">{formatMoney(data?.revenue_this_year ?? 0)}</p>
          <p className="text-xs text-gray-500">This year</p>
        </div>

        {/* Subscriptions */}
        <div className="rounded-lg border border-gray-800 bg-gray-900 p-4">
          <h3 className="text-sm font-medium text-gray-400">Active Subscriptions</h3>
          <p className="text-2xl font-bold mt-1">{data?.active_subscriptions ?? 0}</p>
        </div>

        {/* Tickets */}
        <div className="rounded-lg border border-gray-800 bg-gray-900 p-4">
          <h3 className="text-sm font-medium text-gray-400">Open Tickets</h3>
          <p className="text-2xl font-bold mt-1">{data?.open_tickets ?? 0}</p>
        </div>

        {/* Commissions */}
        <div className="rounded-lg border border-gray-800 bg-gray-900 p-4">
          <h3 className="text-sm font-medium text-gray-400">Pending Commissions</h3>
          <p className="text-2xl font-bold mt-1">{data?.pending_commissions ?? 0}</p>
        </div>
      </div>
    </PageContainer>
  );
}
