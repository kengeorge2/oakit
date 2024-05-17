import React from 'react';
import Link from 'next/link'; // Assuming you're using Next.js

const Hero: React.FC = () => {
  return (
    
    <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-gray-900 text-gray-50 dark:bg-gray-950 dark:text-gray-50">
      {/* Full width container */}
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col items-center space-y-4 text-center">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none bg-gradient-to-r from-purple-500 to-lime-500 via-blue-500 text-transparent bg-clip-text">
              Elevate Your Business with the Best IT Solutions
            </h1>
            <p className="mx-auto max-w-[700px] text-gray-300 md:text-xl dark:text-gray-400">
              Our team of experts provides tailored IT solutions to help your business thrive in the digital age.
            </p>
          </div>
          <div className="space-x-4">
            <Link
              href="#"
              className="inline-flex h-9 items-center justify-center rounded-md bg-gradient-to-r from-purple-500 to-blue-500 px-4 py-2 text-sm font-medium text-gray-50 shadow transition-colors hover:bg-gradient-to-r hover:from-purple-600 hover:to-blue-600 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-50/90 dark:focus-visible:ring-gray-300 border-4 border-lime-500 hover:border-8 hover:border-lime-600 transition-all duration-300 ease-in-out"
            >
              Get Started
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
