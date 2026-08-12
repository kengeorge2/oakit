'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createTenant, getPlans } from '@/lib/api';
import PageContainer from '@/components/layout/page-container';
import { useEffect } from 'react';

export default function NewTenantPage() {
  const router = useRouter();
  const [plans, setPlans] = useState<any[]>([]);
  const [form, setForm] = useState({ name: '', email: '', password: '', password_confirmation: '', business_name: '', phone: '', plan: '' });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getPlans().then((data) => setPlans(Array.isArray(data) ? data : [])).catch(() => {});
  }, []);

  const update = (field: string, value: string) => setForm((prev) => ({ ...prev, [field]: value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    setError('');
    setLoading(true);
    try {
      await createTenant(form);
      router.push('/dashboard/tenants');
    } catch (err: any) {
      const msg = err.message || 'Failed to create tenant';
      if (msg.includes('validation')) {
        setError('Validation failed. Please check your input.');
      } else {
        setError(msg);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <PageContainer pageTitle="Create Tenant" pageDescription="Provision a new tenant">
      <div className="max-w-lg">
        {error && <div className="rounded-md bg-red-900/20 p-3 text-sm text-red-400 mb-4">{error}</div>}

        <form onSubmit={handleSubmit} className="space-y-4 rounded-lg border border-gray-800 bg-gray-900 p-6">
          {[
            { field: 'name', label: 'Tenant Name', type: 'text', required: true },
            { field: 'email', label: 'Admin Email', type: 'email', required: true },
            { field: 'password', label: 'Password', type: 'password', required: true },
            { field: 'password_confirmation', label: 'Confirm Password', type: 'password', required: true },
            { field: 'business_name', label: 'Business Name', type: 'text' },
            { field: 'phone', label: 'Phone', type: 'text' },
          ].map(({ field, label, type, required }) => (
            <div key={field}>
              <label className="block text-sm font-medium text-gray-300 mb-1">{label}{required && ' *'}</label>
              <input type={type} value={(form as any)[field]} onChange={(e) => update(field, e.target.value)} required={required}
                className="w-full rounded-md border border-gray-700 bg-gray-800 px-3 py-2 text-sm text-white placeholder-gray-500" />
            </div>
          ))}

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">Plan</label>
            <select value={form.plan} onChange={(e) => update('plan', e.target.value)}
              className="w-full rounded-md border border-gray-700 bg-gray-800 px-3 py-2 text-sm text-white">
              <option value="">No plan</option>
              {plans.filter((p: any) => p.type === 'oakit').map((p: any) => (
                <option key={p.id} value={p.slug}>{p.name}</option>
              ))}
            </select>
          </div>

          <button type="submit" disabled={loading}
            className="w-full rounded-lg bg-blue-600 py-2.5 text-sm font-medium text-white hover:bg-blue-500 disabled:opacity-50">
            {loading ? 'Creating...' : 'Create Tenant'}
          </button>
        </form>
      </div>
    </PageContainer>
  );
}
