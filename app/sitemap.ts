import { MetadataRoute } from 'next';
import { services } from '@/lib/services';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://oakitsolutionsandsupplies.com';

  const servicePages = services.map((s) => ({
    url: `${baseUrl}/services/${s.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  return [
    { url: baseUrl, lastModified: new Date(), changeFrequency: 'monthly', priority: 1 },
    { url: `${baseUrl}/products`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.9 },
    { url: `${baseUrl}/aboutUs`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/blog`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 },
    { url: `${baseUrl}/Backendstack`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    { url: `${baseUrl}/Frontendstack`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    { url: `${baseUrl}/Fullstacklearnmore`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    ...servicePages,
  ];
}
