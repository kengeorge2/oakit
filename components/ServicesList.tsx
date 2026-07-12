import React from 'react';
import Link from 'next/link';
import { services } from '@/lib/services';

const ServicesList = () => {
  return (
    <section className="w-full py-8 md:py-16 lg:py-24 bg-gray-100 dark:bg-gray-800" id="services">
      <div className="w-full py-8 md:py-16 lg:py-24 dark:bg-gray-800 container mx-auto px-4 py-8 md:px-6 text-white">
        <h1 className="text-3xl font-bold mb-4 text-center text-black">IT Services Offered</h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {services.map((service) => {
            const Icon = service.icon;
            return (
              <Link
                key={service.slug}
                href={`/services/${service.slug}`}
                className="bg-gray-700 rounded-lg p-4 hover:bg-gray-600 hover:scale-[1.02] transition-all duration-200 group"
              >
                <div className="flex items-center gap-2 mb-2">
                  <Icon className="w-5 h-5 text-blue-400 group-hover:text-blue-300" />
                  <h2 className="text-xl font-semibold bg-black text-white px-4 py-2 rounded-md flex-1">
                    {service.title}
                  </h2>
                </div>
                <ul className="list-disc list-inside text-gray-300">
                  {service.features.slice(0, 3).map((feature, i) => (
                    <li key={i}>{feature}</li>
                  ))}
                </ul>
                <span className="inline-block mt-3 text-blue-400 text-sm group-hover:text-blue-300">
                  Learn more &rarr;
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ServicesList;
