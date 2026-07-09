import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Products | OAK IT Solutions',
  description: 'Explore our software products — ClassicPOS point of sale system, QuizApp interactive quiz platform, and our tech blog.',
  openGraph: {
    title: 'Our Products | OAK IT Solutions',
    description: 'Cloud-based POS, quiz platform, and tech insights from OAK IT Solutions.',
  },
};

const products = [
  {
    name: 'ClassicPOS',
    tagline: 'Cloud-based Point of Sale System',
    description: 'A modern, full-featured POS system designed for retail businesses. Manage inventory, process sales, generate EFRIS-compliant receipts, and run multi-branch operations — all from one platform.',
    features: [
      'Real-time inventory management',
      'EFRIS fiscal receipt integration',
      'Multi-branch support',
      'Offline mode with auto-sync',
      'Role-based access control',
      'Sales analytics & reporting',
      'Barcode scanning support',
      'Cloud-based with mobile access',
    ],
    demoUrl: 'https://pos.oakitsolutionsandsupplies.com/',
    icon: (
      <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5m.75-9l3-3 2.148 2.148A12.061 12.061 0 0116.5 7.605" />
      </svg>
    ),
    gradient: 'from-purple-500 to-blue-500',
    borderColor: 'border-purple-500',
    status: 'Live',
  },
  {
    name: 'QuizApp',
    tagline: 'Interactive Quiz Platform',
    description: 'An engaging quiz platform built for education and training. Create custom quizzes, track learner progress, and run timed assessments with real-time leaderboards.',
    features: [
      'Custom quiz creation',
      'Timed assessments',
      'Real-time leaderboards',
      'Progress tracking & analytics',
      'Mobile-friendly interface',
      'Multiple question types',
      'Instant feedback & scoring',
      'Shareable quiz links',
    ],
    demoUrl: 'https://quizapp.oakitsolutionsandsupplies.com/',
    icon: (
      <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 00-2.455 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z" />
      </svg>
    ),
    gradient: 'from-lime-500 to-blue-500',
    borderColor: 'border-lime-500',
    status: 'Live',
  },
  {
    name: 'Blog',
    tagline: 'Tech Insights & Company News',
    description: 'Our blog features the latest articles on technology trends, IT best practices, tutorials, and updates from OAK IT Solutions. Stay informed and inspired.',
    features: [
      'Latest tech articles',
      'Industry insights & trends',
      'How-to tutorials',
      'Company news & updates',
      'POS & business tips',
      'Searchable archive',
      'RSS feed available',
      'Newsletter subscription',
    ],
    demoUrl: 'https://blog.oakitsolutionsandsupplies.com/',
    icon: (
      <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
      </svg>
    ),
    gradient: 'from-blue-500 to-purple-500',
    borderColor: 'border-blue-500',
    status: 'Live',
  },
];

export default function ProductsPage() {
  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-20">
      {/* Hero */}
      <section className="w-full py-12 md:py-20 bg-gray-900 dark:bg-gray-950 text-gray-50">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <div className="inline-block rounded-lg bg-gray-800 px-3 py-1 text-sm text-gray-300 mb-4">
            Our Products
          </div>
          <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl mb-4">
            Software Built for{' '}
            <span className="bg-gradient-to-r from-purple-500 to-lime-500 text-transparent bg-clip-text">
              Real Businesses
            </span>
          </h1>
          <p className="max-w-[600px] mx-auto text-gray-400 md:text-lg">
            From point-of-sale to education, we build practical software solutions
            that solve real problems for businesses in Uganda and beyond.
          </p>
        </div>
      </section>

      {/* Products Grid */}
      <section className="w-full py-12 md:py-20">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
            {products.map((product) => (
              <div
                key={product.name}
                className={`relative rounded-xl bg-white dark:bg-gray-800 border ${product.borderColor} overflow-hidden shadow-lg hover:shadow-xl transition-shadow`}
              >
                {/* Header */}
                <div className={`p-6 bg-gradient-to-r ${product.gradient} bg-opacity-10`}>
                  <div className="flex items-center justify-between mb-4">
                    <div className="text-white">{product.icon}</div>
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-green-500/20 px-2.5 py-0.5 text-xs font-medium text-green-400">
                      <span className="h-1.5 w-1.5 rounded-full bg-green-400" />
                      {product.status}
                    </span>
                  </div>
                  <h2 className="text-2xl font-bold text-white">{product.name}</h2>
                  <p className="text-sm text-white/80 mt-1">{product.tagline}</p>
                </div>

                {/* Body */}
                <div className="p-6">
                  <p className="text-gray-600 dark:text-gray-400 text-sm mb-6">
                    {product.description}
                  </p>

                  <div className="mb-6">
                    <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100 mb-3">
                      Key Features
                    </h3>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {product.features.map((feature) => (
                        <li
                          key={feature}
                          className="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-400"
                        >
                          <svg
                            className="w-4 h-4 mt-0.5 text-green-500 shrink-0"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            strokeWidth={2}
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                          </svg>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-3">
                    <a
                      href={product.demoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`flex-1 inline-flex items-center justify-center rounded-md bg-gradient-to-r ${product.gradient} px-4 py-2.5 text-sm font-medium text-white shadow hover:opacity-90 transition-opacity`}
                    >
                      Live Demo
                      <svg className="w-4 h-4 ml-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="w-full py-12 md:py-16 bg-gray-100 dark:bg-gray-800">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <h2 className="text-2xl font-bold tracking-tight sm:text-3xl mb-4">
            Interested in Our Products?
          </h2>
          <p className="max-w-[500px] mx-auto text-gray-500 dark:text-gray-400 mb-8">
            Get in touch to learn more about our solutions, request a demo, or discuss custom development for your business.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/#contactUs"
              className="inline-flex items-center justify-center rounded-md bg-gray-900 dark:bg-gray-50 px-6 py-3 text-sm font-medium text-gray-50 dark:text-gray-900 hover:bg-gray-700 dark:hover:bg-gray-200 transition-colors"
            >
              Contact Us
            </Link>
            <Link
              href="/#servicesPricing"
              className="inline-flex items-center justify-center rounded-md border border-gray-900 dark:border-gray-50 px-6 py-3 text-sm font-medium text-gray-900 dark:text-gray-50 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              View Pricing
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
