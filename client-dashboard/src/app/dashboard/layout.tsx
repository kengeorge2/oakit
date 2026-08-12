'use client';

import { useState } from 'react';
import { useAuth } from '@/features/auth/auth-provider';
import Sidebar from '@/components/layout/sidebar';
import OnboardingWizard from '@/components/onboarding/wizard';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { isLoading, isAuthenticated, user, fetchUser } = useAuth();
  const [showOnboarding, setShowOnboarding] = useState(false);

  if (isLoading) {
    return <div className="flex items-center justify-center min-h-screen"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div></div>;
  }

  if (!isAuthenticated) return null;

  // Show onboarding for new users (onboarding_completed === false)
  const needsOnboarding = !!user && user.onboarding_completed === false;

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="flex-1 p-6">
        {children}
        {(showOnboarding || needsOnboarding) && (
          <OnboardingWizard
            onComplete={() => {
              setShowOnboarding(false);
              fetchUser(); // Refresh user data to get onboarding_completed=true
            }}
          />
        )}
      </main>
    </div>
  );
}
