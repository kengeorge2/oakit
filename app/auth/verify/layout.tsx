import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Verify Email — OAK IT Solutions',
  description: 'Verify your email address to activate your OAK IT Solutions account',
};

export default function VerifyLayout({ children }: { children: React.ReactNode }) {
  return children;
}
