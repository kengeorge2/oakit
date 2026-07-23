import React from 'react';
import Link from 'next/link';
import { services } from '@/lib/services';
import Reveal from '@/components/Reveal';

const ServicesList = () => {
  return (
    <section className="w-full py-8 md:py-16 lg:py-24 section-dark grid-overlay" id="services">
      <div className="w-full container mx-auto px-4 sm:px-6 lg:px-8 py-8 md:px-6">
        <Reveal>
          <div className="space-y-3 text-center mb-12">
            <span className="section-label">02 — IT Services</span>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-gray-900 dark:text-white">
              IT Services Offered
            </h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-[600px] mx-auto">
              Comprehensive technology solutions tailored to your business needs.
            </p>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {services.map((service, idx) => {
            const Icon = service.icon;
            return (
              <Reveal key={service.slug} delay={(idx % 4) as 0 | 1 | 2 | 3}>
                <Link
                  href={`/services/${service.slug}`}
                  className="accent-bar block rounded-lg p-5 bg-white dark:bg-white/[0.04] border border-gray-200 dark:border-white/[0.06] hover:bg-gray-50 dark:hover:bg-white/[0.07] hover:border-gray-300 dark:hover:border-white/[0.12] hover:-translate-y-1 hover:shadow-lg hover:shadow-purple-500/5 transition-all duration-300 group"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className="p-2 rounded-md bg-purple-100 dark:bg-purple-500/10 group-hover:bg-purple-200 dark:group-hover:bg-purple-500/20 transition-colors duration-300">
                      <Icon className="w-5 h-5 text-purple-600 dark:text-purple-400 group-hover:text-purple-700 dark:group-hover:text-purple-300 transition-colors" />
                    </div>
                    <h2 className="text-lg font-semibold text-gray-900 dark:text-white flex-1">
                      {service.title}
                    </h2>
                  </div>
                  <ul className="space-y-1 text-sm text-gray-600 dark:text-gray-400">
                    {service.features.slice(0, 3).map((feature, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="text-blue-500 dark:text-blue-400 mt-1 text-xs">●</span>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <span className="inline-block mt-4 text-purple-600 dark:text-purple-400 text-sm font-medium group-hover:text-purple-700 dark:group-hover:text-purple-300 transition-colors">
                    Learn more →
                  </span>
                </Link>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ServicesList;
