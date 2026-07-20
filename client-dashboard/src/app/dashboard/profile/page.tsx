'use client';

import { useState } from 'react';
import { useAuth } from '@/features/auth/auth-provider';
import { updateProfile, changePassword } from '@/lib/api';
import PageContainer from '@/components/layout/page-container';

export default function ProfilePage() {
  const { user } = useAuth();
  const [profileForm, setProfileForm] = useState({
    name: user?.name || '',
    company_name: user?.company_name || '',
    company_phone: user?.company_phone || '',
  });
  const [passwordForm, setPasswordForm] = useState({
    current_password: '',
    password: '',
    password_confirmation: '',
  });
  const [profileMsg, setProfileMsg] = useState('');
  const [passwordMsg, setPasswordMsg] = useState('');
  const [saving, setSaving] = useState(false);

  const handleProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setProfileMsg('');
    try {
      await updateProfile(profileForm);
      setProfileMsg('Profile updated successfully.');
    } catch (err: any) {
      setProfileMsg(err.message);
    } finally {
      setSaving(false);
    }
  };

  const handlePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setPasswordMsg('');
    if (passwordForm.password !== passwordForm.password_confirmation) {
      setPasswordMsg('Passwords do not match.');
      setSaving(false);
      return;
    }
    try {
      await changePassword(passwordForm);
      setPasswordMsg('Password changed successfully.');
      setPasswordForm({ current_password: '', password: '', password_confirmation: '' });
    } catch (err: any) {
      setPasswordMsg(err.message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <PageContainer pageTitle="Profile" pageDescription="Manage your account settings">
      <div className="space-y-6">
        <form onSubmit={handleProfile} className="rounded-lg border bg-card p-6 shadow-sm space-y-4">
          <h3 className="text-lg font-semibold">Profile Information</h3>
          {profileMsg && <p className="text-sm text-muted-foreground">{profileMsg}</p>}
          <div className="space-y-2">
            <label className="text-sm font-medium">Name</label>
            <input value={profileForm.name} onChange={(e) => setProfileForm({ ...profileForm, name: e.target.value })}
              className="flex h-10 w-full rounded-md border bg-background px-3 py-2 text-sm" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Email</label>
            <input value={user?.email || ''} disabled
              className="flex h-10 w-full rounded-md border bg-background px-3 py-2 text-sm opacity-50" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Company Name</label>
              <input value={profileForm.company_name} onChange={(e) => setProfileForm({ ...profileForm, company_name: e.target.value })}
                className="flex h-10 w-full rounded-md border bg-background px-3 py-2 text-sm" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Company Phone</label>
              <input value={profileForm.company_phone} onChange={(e) => setProfileForm({ ...profileForm, company_phone: e.target.value })}
                className="flex h-10 w-full rounded-md border bg-background px-3 py-2 text-sm" />
            </div>
          </div>
          <button type="submit" disabled={saving}
            className="flex h-10 items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 disabled:opacity-50">
            {saving ? 'Saving...' : 'Save Changes'}
          </button>
        </form>

        <form onSubmit={handlePassword} className="rounded-lg border bg-card p-6 shadow-sm space-y-4">
          <h3 className="text-lg font-semibold">Change Password</h3>
          {passwordMsg && <p className="text-sm text-muted-foreground">{passwordMsg}</p>}
          <div className="space-y-2">
            <label className="text-sm font-medium">Current Password</label>
            <input type="password" value={passwordForm.current_password} onChange={(e) => setPasswordForm({ ...passwordForm, current_password: e.target.value })} required
              className="flex h-10 w-full rounded-md border bg-background px-3 py-2 text-sm" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">New Password</label>
            <input type="password" value={passwordForm.password} onChange={(e) => setPasswordForm({ ...passwordForm, password: e.target.value })} required minLength={8}
              className="flex h-10 w-full rounded-md border bg-background px-3 py-2 text-sm" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Confirm New Password</label>
            <input type="password" value={passwordForm.password_confirmation} onChange={(e) => setPasswordForm({ ...passwordForm, password_confirmation: e.target.value })} required minLength={8}
              className="flex h-10 w-full rounded-md border bg-background px-3 py-2 text-sm" />
          </div>
          <button type="submit" disabled={saving}
            className="flex h-10 items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 disabled:opacity-50">
            {saving ? 'Changing...' : 'Change Password'}
          </button>
        </form>
      </div>
    </PageContainer>
  );
}
