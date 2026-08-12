import React from 'react';

interface PageContainerProps {
  children: React.ReactNode;
  pageTitle?: string;
  pageDescription?: string;
  pageHeaderAction?: React.ReactNode;
}

export default function PageContainer({ children, pageTitle, pageDescription, pageHeaderAction }: PageContainerProps) {
  return (
    <div className="p-6 space-y-4">
      {(pageTitle || pageHeaderAction) && (
        <div className="flex items-center justify-between">
          <div>
            {pageTitle && <h1 className="text-2xl font-bold">{pageTitle}</h1>}
            {pageDescription && <p className="text-muted-foreground text-sm">{pageDescription}</p>}
          </div>
          {pageHeaderAction}
        </div>
      )}
      {children}
    </div>
  );
}
