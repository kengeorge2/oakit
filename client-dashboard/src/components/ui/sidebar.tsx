import React from 'react';

export function SidebarProvider({ children, defaultOpen }: { children: React.ReactNode; defaultOpen?: boolean }) {
  return <>{children}</>;
}

export function SidebarInset({ children }: { children: React.ReactNode }) {
  return <div className="flex-1">{children}</div>;
}
