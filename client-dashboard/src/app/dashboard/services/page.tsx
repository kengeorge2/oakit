'use client';

import { useEffect, useState } from 'react';
import { getSubscribedServices, getServices } from '@/lib/api';
import PageContainer from '@/components/layout/page-container';

export default function ServicesPage() {
  const [subscribed, setSubscribed] = useState<any[]>([]);
  const [allServices, setAllServices] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    Promise.all([getSubscribedServices(), getServices()])
      .then(([sub, all]) => {
        setSubscribed(Array.isArray(sub) ? sub : []);
        setAllServices(Array.isArray(all) ? all : []);
      })
      .catch((err) => setError(err.message || 'Failed to load services'))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <PageContainer pageTitle="Services" pageDescription="Loading...">
        <div className="animate-pulse grid grid-cols-3 gap-4">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="h-40 rounded-lg bg-muted" />
          ))}
        </div>
      </PageContainer>
    );
  }

  const subscribedIds = new Set(subscribed.map((s: any) => s.id));
  const availableServices = allServices.filter((s: any) => !subscribedIds.has(s.id));

  return (
    <PageContainer pageTitle="Services" pageDescription="Your subscribed IT services">
      <div className="space-y-6">
        {error && (
          <div className="rounded-md bg-destructive/10 p-3 text-sm text-destructive">{error}</div>
        )}

        {subscribed.length > 0 && (
          <div>
            <h3 className="mb-3 text-lg font-semibold">Active Services</h3>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {subscribed.map((service) => (
                <div key={service.id} className="rounded-lg border bg-card p-5 shadow-sm">
                  <div className="flex items-center gap-2">
                    <h4 className="font-semibold">{service.title}</h4>
                    <span className="rounded-full bg-green-100 px-2 py-0.5 text-xs font-medium text-green-700">Active</span>
                  </div>
                  <p className="mt-1 text-sm text-muted-foreground">{service.description}</p>
                  {service.features && (
                    <ul className="mt-3 space-y-1">
                      {service.features.slice(0, 3).map((f: string, i: number) => (
                        <li key={i} className="flex items-start gap-2 text-xs text-muted-foreground">
                          <span className="mt-0.5 text-green-500">✓</span> {f}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {subscribed.length === 0 && (
          <div className="rounded-lg border bg-card p-12 text-center shadow-sm">
            <p className="text-muted-foreground mb-2">You have no active services yet.</p>
            <a href="/dashboard/subscriptions" className="text-sm text-primary hover:underline">
              Subscribe to a plan to get started →
            </a>
          </div>
        )}

        {availableServices.length > 0 && (
          <div>
            <h3 className="mb-3 text-lg font-semibold">Available Services</h3>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {availableServices.map((service) => (
                <div key={service.id} className="rounded-lg border bg-card p-5 shadow-sm opacity-75">
                  <h4 className="font-semibold">{service.title}</h4>
                  <p className="mt-1 text-sm text-muted-foreground">{service.description}</p>
                  {service.features && (
                    <ul className="mt-3 space-y-1">
                      {service.features.slice(0, 3).map((f: string, i: number) => (
                        <li key={i} className="flex items-start gap-2 text-xs text-muted-foreground">
                          <span className="mt-0.5 text-gray-400">○</span> {f}
                        </li>
                      ))}
                    </ul>
                  )}
                  <a
                    href="https://oakitsolutionsandsupplies.com/#pricing"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-3 inline-block text-sm text-primary hover:underline"
                  >
                    Upgrade to access →
                  </a>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </PageContainer>
  );
}
