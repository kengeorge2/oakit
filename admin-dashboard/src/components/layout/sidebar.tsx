'use client';

import { useAuth } from '@/features/auth/auth-provider';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Sidebar() {
  const { user, logout } = useAuth();
  const pathname = usePathname();

  const navItems = [
    { label: 'Dashboard', href: '/dashboard' },
    { label: 'Tenants', href: '/dashboard/tenants' },
    { label: 'Client Users', href: '/dashboard/client-users' },
    { label: 'Subscriptions', href: '/dashboard/subscriptions' },
    { label: 'Agents', href: '/dashboard/agents' },
    { label: 'Commissions', href: '/dashboard/commissions' },
    { label: 'Tickets', href: '/dashboard/tickets' },
    { label: 'Audit Logs', href: '/dashboard/audit-logs' },
    { label: 'Settings', href: '/dashboard/settings' },
    { label: 'Health', href: '/dashboard/health' },
  ];

  return (
    <aside className="w-64 bg-gray-900 border-r border-gray-800 min-h-screen p-4 flex flex-col">
      <div className="mb-8">
        <Link href="/dashboard" className="text-lg font-bold text-white">OAK IT Admin</Link>
      </div>
      <nav className="flex-1 space-y-1">
        {navItems.map((item) => {
          const isActive = item.href === '/dashboard'
            ? pathname === '/dashboard'
            : pathname.startsWith(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`block px-3 py-2 rounded-md text-sm transition-colors ${
                isActive
                  ? 'bg-gray-800 text-white font-medium'
                  : 'text-gray-400 hover:bg-gray-800 hover:text-white'
              }`}
            >
              {item.label}
            </Link>
          );
        })}
      </nav>
      <div className="border-t border-gray-800 pt-4 mt-4">
        <p className="text-xs text-white font-medium truncate">{user?.name}</p>
        <p className="text-xs text-gray-500 truncate">{user?.email}</p>
        <button onClick={logout} className="mt-2 text-xs text-red-400 hover:text-red-300">Sign Out</button>
      </div>
    </aside>
  );
}
