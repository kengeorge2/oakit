'use client';

import { useEffect, useState } from 'react';
import { getSettings, updateSettings } from '@/lib/api';
import PageContainer from '@/components/layout/page-container';

export default function SettingsPage() {
  const [settings, setSettings] = useState<Record<string, any[]>>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [saving, setSaving] = useState(false);
  const [editedKeys, setEditedKeys] = useState<Record<string, string>>({});

  useEffect(() => {
    getSettings()
      .then((data) => {
        setSettings(data || {});
        // Initialize edited values
        const initial: Record<string, string> = {};
        Object.values(data || {}).flat().forEach((s: any) => {
          initial[s.key] = String(s.value ?? '');
        });
        setEditedKeys(initial);
      })
      .catch((err) => setError(err.message || 'Failed to load'))
      .finally(() => setLoading(false));
  }, []);

  const handleChange = (key: string, value: string) => {
    setEditedKeys((prev) => ({ ...prev, [key]: value }));
  };

  const handleSave = async () => {
    setSaving(true);
    setError('');
    setSuccess('');
    try {
      const settingsPayload = Object.entries(editedKeys).map(([key, value]) => ({ key, value }));
      await updateSettings(settingsPayload);
      setSuccess('Settings saved successfully.');
      setTimeout(() => setSuccess(''), 3000);
    } catch (err: any) {
      setError(err.message || 'Failed to save');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <PageContainer pageTitle="Settings" pageDescription="Loading..."><div className="animate-pulse h-64 rounded-lg bg-gray-800" /></PageContainer>;
  }

  return (
    <PageContainer
      pageTitle="Platform Settings"
      pageDescription="Configure platform-wide settings"
      pageHeaderAction={
        <button onClick={handleSave} disabled={saving}
          className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-500 disabled:opacity-50">
          {saving ? 'Saving...' : 'Save Changes'}
        </button>
      }
    >
      {error && <div className="rounded-md bg-red-900/20 p-3 text-sm text-red-400">{error}</div>}
      {success && <div className="rounded-md bg-green-900/20 p-3 text-sm text-green-400">{success}</div>}

      <div className="space-y-8">
        {Object.entries(settings).map(([group, items]) => (
          <div key={group} className="rounded-lg border border-gray-800 bg-gray-900 p-6">
            <h3 className="text-lg font-semibold text-white mb-4 capitalize">{group.replace(/_/g, ' ')}</h3>
            <div className="space-y-4">
              {items.map((item: any) => (
                <div key={item.key} className="flex flex-col sm:flex-row sm:items-center gap-2">
                  <label className="flex-1 text-sm text-gray-300">
                    {item.description || item.key}
                    <span className="block text-xs text-gray-500 font-mono">{item.key}</span>
                  </label>
                  {item.type === 'boolean' ? (
                    <select
                      value={editedKeys[item.key] || ''}
                      onChange={(e) => handleChange(item.key, e.target.value)}
                      className="rounded-md border border-gray-700 bg-gray-800 px-3 py-2 text-sm text-white w-48"
                    >
                      <option value="true">True</option>
                      <option value="false">False</option>
                    </select>
                  ) : item.type === 'json' ? (
                    <textarea
                      value={editedKeys[item.key] || ''}
                      onChange={(e) => handleChange(item.key, e.target.value)}
                      rows={3}
                      className="rounded-md border border-gray-700 bg-gray-800 px-3 py-2 text-sm text-white font-mono w-full sm:w-96"
                    />
                  ) : (
                    <input
                      value={editedKeys[item.key] || ''}
                      onChange={(e) => handleChange(item.key, e.target.value)}
                      className="rounded-md border border-gray-700 bg-gray-800 px-3 py-2 text-sm text-white w-full sm:w-96"
                    />
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </PageContainer>
  );
}
