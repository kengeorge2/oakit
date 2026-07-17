import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Sign Up — OAK IT Solutions',
  description: 'Create your OAK IT Solutions account and get started with our IT services',
};

export default function SignupLayout({ children }: { children: React.ReactNode }) {
  return children;
}
