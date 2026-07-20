import type { Metadata } from 'next';
import '../styles/globals.css';
import { AuthProvider } from '@/features/auth/auth-provider';

export const metadata: Metadata = {
  title: 'OAK IT Solutions — Client Dashboard',
  description: 'Manage your OAK IT services and subscriptions',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-gray-950 text-gray-100 min-h-screen">
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
