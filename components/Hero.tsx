import React from 'react';
import Link from 'next/link';

const Hero: React.FC = () => {
  return (
    <section className="relative w-full py-16 md:py-28 lg:py-36 xl:py-48 section-dark grid-overlay overflow-hidden">
      {/* Decorative glow orbs */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-purple-500/8 dark:bg-purple-500/8 blur-[120px] pointer-events-none animate-pulse-glow" />
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] rounded-full bg-blue-500/6 dark:bg-blue-500/6 blur-[100px] pointer-events-none" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col items-center space-y-6 text-center max-w-4xl mx-auto">
          <div className="space-y-4 animate-fade-in-up">
            <div className="section-label mx-auto w-fit">
              OAK IT Solutions &amp; Supplies Ltd
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tighter bg-gradient-to-r from-purple-500 via-blue-500 to-lime-500 text-transparent bg-clip-text">
              Best Outsourcing IT Solutions
            </h1>
            <p className="mx-auto max-w-[700px] text-gray-600 dark:text-gray-300 text-base sm:text-lg md:text-xl leading-relaxed">
              Elevate Your Business with the Best IT Solutions. Our team of experts provides tailored IT solutions to help your business thrive in the digital age.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 pt-4 animate-fade-in-up" style={{ animationDelay: '0.15s' }}>
            <Link
              href="/auth/signup?plan=regular"
              className="btn-glow inline-flex h-12 items-center justify-center rounded-lg bg-gradient-to-r from-purple-500 to-blue-500 px-8 py-3 text-sm font-semibold text-white shadow-lg shadow-purple-500/20 border-4 border-lime-500 hover:border-lime-400 transition-all duration-300"
            >
              Get Started
            </Link>
            <Link
              href="/#servicesPricing"
              className="inline-flex h-12 items-center justify-center rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-100/80 dark:bg-white/5 backdrop-blur-sm px-8 py-3 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-white/10 hover:text-gray-900 dark:hover:text-white hover:border-gray-400 dark:hover:border-gray-500 transition-all duration-300"
            >
              View Plans
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
