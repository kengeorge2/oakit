import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Sign In — OAK IT Solutions',
  description: 'Sign in to your OAK IT Solutions dashboard',
};

export default function SigninLayout({ children }: { children: React.ReactNode }) {
  return children;
}
