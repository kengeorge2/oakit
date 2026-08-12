'use client';

import { useEffect, useState } from 'react';
import { getAuditLogs, exportAuditLogs } from '@/lib/api';
import PageContainer from '@/components/layout/page-container';
import { safeFormatDateTime } from '@/lib/format';

export default function AuditLogsPage() {
  const [logs, setLogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [actionGroup, setActionGroup] = useState('');
  const [userType, setUserType] = useState('');
  const [search, setSearch] = useState('');
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [page, setPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);

  const loadLogs = async (p = 1) => {
    setLoading(true);
    try {
      const params = new URLSearchParams({ page: String(p), per_page: '50' });
      if (actionGroup) params.set('action_group', actionGroup);
      if (userType) params.set('user_type', userType);
      if (search) params.set('search', search);
      if (from) params.set('from', from);
      if (to) params.set('to', to);
      const data = await getAuditLogs(params.toString());
      setLogs(data?.data || []);
      setLastPage(data?.last_page || 1);
      setPage(data?.current_page || 1);
    } catch (err: any) {
      setError(err.message || 'Failed to load');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { loadLogs(); }, []);

  const handleExport = async () => {
    try {
      const params = new URLSearchParams();
      if (actionGroup) params.set('action_group', actionGroup);
      if (userType) params.set('user_type', userType);
      if (from) params.set('from', from);
      if (to) params.set('to', to);
      const blob = await exportAuditLogs(params.toString());
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `audit-log-${new Date().toISOString().slice(0, 10)}.csv`;
      a.click();
      URL.revokeObjectURL(url);
    } catch (err: any) {
      setError(err.message || 'Export failed');
    }
  };

  return (
    <PageContainer
      pageTitle="Audit Logs"
      pageDescription="System activity audit trail"
      pageHeaderAction={
        <button onClick={handleExport} className="rounded-lg bg-gray-700 px-4 py-2 text-sm font-medium text-white hover:bg-gray-600">
          Export CSV
        </button>
      }
    >
      {error && <div className="rounded-md bg-red-900/20 p-3 text-sm text-red-400">{error}</div>}

      {/* Filters */}
      <div className="flex flex-wrap gap-3 mb-4">
        <input value={search} onChange={(e) => setSearch(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && loadLogs(1)}
          placeholder="Search actions..." className="flex-1 min-w-[200px] rounded-md border border-gray-700 bg-gray-800 px-3 py-2 text-sm text-white" />
        <select value={actionGroup} onChange={(e) => setActionGroup(e.target.value)}
          className="rounded-md border border-gray-700 bg-gray-800 px-3 py-2 text-sm text-white">
          <option value="">All Actions</option>
          <option value="tenant">Tenant</option>
          <option value="commission">Commission</option>
          <option value="settings">Settings</option>
          <option value="license">License</option>
        </select>
        <select value={userType} onChange={(e) => setUserType(e.target.value)}
          className="rounded-md border border-gray-700 bg-gray-800 px-3 py-2 text-sm text-white">
          <option value="">All Users</option>
          <option value="admin">Admin</option>
          <option value="system">System</option>
        </select>
        <input type="date" value={from} onChange={(e) => setFrom(e.target.value)}
          className="rounded-md border border-gray-700 bg-gray-800 px-3 py-2 text-sm text-white" />
        <input type="date" value={to} onChange={(e) => setTo(e.target.value)}
          className="rounded-md border border-gray-700 bg-gray-800 px-3 py-2 text-sm text-white" />
        <button onClick={() => loadLogs(1)} className="rounded-md bg-blue-600 px-4 py-2 text-sm text-white hover:bg-blue-500">
          Filter
        </button>
      </div>

      {loading ? (
        <div className="animate-pulse space-y-3">
          {[1, 2, 3, 4, 5].map((i) => <div key={i} className="h-12 rounded-lg bg-gray-800" />)}
        </div>
      ) : logs.length === 0 ? (
        <div className="rounded-lg border border-gray-800 bg-gray-900 p-12 text-center">
          <p className="text-gray-400">No audit logs found.</p>
        </div>
      ) : (
        <div className="rounded-lg border border-gray-800 bg-gray-900 overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-800 bg-gray-800/50">
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-300">User</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-300">Action</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-300">Subject</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-300">IP</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-300">Time</th>
              </tr>
            </thead>
            <tbody>
              {logs.map((log: any) => (
                <tr key={log.id} className="border-b border-gray-800 last:border-0 hover:bg-gray-800/30">
                  <td className="px-4 py-3 text-sm text-white">{log.user_name || log.user_email || 'System'}</td>
                  <td className="px-4 py-3 text-sm text-blue-400 font-mono">{log.action}</td>
                  <td className="px-4 py-3 text-sm text-gray-400 max-w-xs truncate">{log.subject_description || '—'}</td>
                  <td className="px-4 py-3 text-sm text-gray-500 font-mono">{log.ip_address || '—'}</td>
                  <td className="px-4 py-3 text-sm text-gray-400">{safeFormatDateTime(log.created_at)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {lastPage > 1 && (
        <div className="flex justify-center gap-2 mt-4">
          {Array.from({ length: Math.min(lastPage, 10) }, (_, i) => i + 1).map((p) => (
            <button key={p} onClick={() => loadLogs(p)}
              className={`rounded px-3 py-1 text-sm ${p === page ? 'bg-blue-600 text-white' : 'bg-gray-800 text-gray-400 hover:bg-gray-700'}`}>
              {p}
            </button>
          ))}
        </div>
      )}
    </PageContainer>
  );
}
