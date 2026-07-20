import React from 'react';

export function InfobarProvider({ children }: { children: React.ReactNode; defaultOpen?: boolean }) {
  return <>{children}</>;
}
