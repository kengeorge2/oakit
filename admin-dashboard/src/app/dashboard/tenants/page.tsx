'use client';

import { useEffect, useState } from 'react';
import { getTenants } from '@/lib/api';
import PageContainer from '@/components/layout/page-container';
import { safeFormatDate } from '@/lib/format';
import Link from 'next/link';

interface Tenant {
  id: string;
  name: string;
  slug: string;
  status: string;
  business_name: string | null;
  created_at: string;
  subscription?: { plan?: { name: string }; status: string } | null;
}

export default function TenantsPage() {
  const [tenants, setTenants] = useState<Tenant[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [page, setPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);

  const loadTenants = async (p = 1) => {
    setLoading(true);
    try {
      const params = new URLSearchParams({ page: String(p), per_page: '15' });
      if (search) params.set('search', search);
      if (statusFilter) params.set('status', statusFilter);
      const data = await getTenants(params.toString());
      setTenants(data?.data || []);
      setLastPage(data?.last_page || 1);
      setPage(data?.current_page || 1);
    } catch (err: any) {
      setError(err.message || 'Failed to load tenants');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { loadTenants(); }, []);

  const handleSearch = () => { loadTenants(1); };

  const statusColor = (s: string) => {
    const map: Record<string, string> = {
      active: 'bg-green-100 text-green-700',
      trialing: 'bg-blue-100 text-blue-700',
      suspended: 'bg-yellow-100 text-yellow-700',
      cancelled: 'bg-red-100 text-red-700',
    };
    return map[s] || 'bg-gray-100 text-gray-700';
  };

  return (
    <PageContainer
      pageTitle="Tenants"
      pageDescription="Manage all tenants"
      pageHeaderAction={
        <Link href="/dashboard/tenants/new" className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-500">
          + Create Tenant
        </Link>
      }
    >
      {error && <div className="rounded-md bg-red-900/20 p-3 text-sm text-red-400">{error}</div>}

      {/* Filters */}
      <div className="flex gap-3 mb-4">
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
          placeholder="Search tenants..."
          className="flex-1 rounded-md border border-gray-700 bg-gray-800 px-3 py-2 text-sm text-white"
        />
        <select
          value={statusFilter}
          onChange={(e) => { setStatusFilter(e.target.value); }}
          className="rounded-md border border-gray-700 bg-gray-800 px-3 py-2 text-sm text-white"
        >
          <option value="">All Status</option>
          <option value="active">Active</option>
          <option value="trialing">Trialing</option>
          <option value="suspended">Suspended</option>
          <option value="cancelled">Cancelled</option>
        </select>
        <button onClick={handleSearch} className="rounded-md bg-gray-700 px-4 py-2 text-sm text-white hover:bg-gray-600">
          Search
        </button>
      </div>

      {loading ? (
        <div className="animate-pulse space-y-3">
          {[1, 2, 3, 4, 5].map((i) => <div key={i} className="h-16 rounded-lg bg-gray-800" />)}
        </div>
      ) : tenants.length === 0 ? (
        <div className="rounded-lg border border-gray-800 bg-gray-900 p-12 text-center">
          <p className="text-gray-400">No tenants found.</p>
        </div>
      ) : (
        <div className="rounded-lg border border-gray-800 bg-gray-900 overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-800 bg-gray-800/50">
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-300">Name</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-300">Slug</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-300">Status</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-300">Plan</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-300">Created</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-300">Actions</th>
              </tr>
            </thead>
            <tbody>
              {tenants.map((t) => (
                <tr key={t.id} className="border-b border-gray-800 last:border-0 hover:bg-gray-800/30">
                  <td className="px-4 py-3 text-sm text-white font-medium">{t.name}</td>
                  <td className="px-4 py-3 text-sm text-gray-400">{t.slug}</td>
                  <td className="px-4 py-3">
                    <span className={`rounded-full px-2 py-1 text-xs font-medium ${statusColor(t.status)}`}>
                      {t.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-400">{t.subscription?.plan?.name || '—'}</td>
                  <td className="px-4 py-3 text-sm text-gray-400">{safeFormatDate(t.created_at)}</td>
                  <td className="px-4 py-3">
                    <Link href={`/dashboard/tenants/${t.id}`} className="text-sm text-blue-400 hover:underline">
                      View
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Pagination */}
      {lastPage > 1 && (
        <div className="flex justify-center gap-2 mt-4">
          {Array.from({ length: lastPage }, (_, i) => i + 1).map((p) => (
            <button
              key={p}
              onClick={() => loadTenants(p)}
              className={`rounded px-3 py-1 text-sm ${p === page ? 'bg-blue-600 text-white' : 'bg-gray-800 text-gray-400 hover:bg-gray-700'}`}
            >
              {p}
            </button>
          ))}
        </div>
      )}
    </PageContainer>
  );
}
