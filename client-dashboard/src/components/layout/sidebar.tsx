'use client';

import { useAuth } from '@/features/auth/auth-provider';
import Link from 'next/link';

export default function Sidebar() {
  const { user, logout } = useAuth();

  const navItems = [
    { label: 'Dashboard', href: '/dashboard' },
    { label: 'My Plan', href: '/dashboard/subscriptions' },
    { label: 'Services', href: '/dashboard/services' },
    { label: 'Tickets', href: '/dashboard/tickets' },
    { label: 'Billing', href: '/dashboard/billing' },
    { label: 'Profile', href: '/dashboard/profile' },
  ];

  return (
    <aside className="w-64 bg-gray-900 border-r border-gray-800 min-h-screen p-4 flex flex-col">
      <div className="mb-8">
        <Link href="/dashboard" className="text-lg font-bold text-white">OAK IT</Link>
      </div>
      <nav className="flex-1 space-y-1">
        {navItems.map((item) => (
          <Link key={item.href} href={item.href}
            className="block px-3 py-2 rounded-md text-sm text-gray-400 hover:bg-gray-800 hover:text-white transition-colors">
            {item.label}
          </Link>
        ))}
      </nav>
      <div className="border-t border-gray-800 pt-4 mt-4">
        <p className="text-xs text-gray-500 truncate">{user?.email}</p>
        <button onClick={logout} className="mt-2 text-xs text-red-400 hover:text-red-300">Sign Out</button>
      </div>
    </aside>
  );
}
