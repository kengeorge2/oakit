// components/Footer.tsx
import React from 'react';
import Link from 'next/link';
import Logo from '@/components/component/Logo';

const Footer: React.FC = () => {
  return (
    <footer className="w-full bg-gray-900 text-gray-50 py-8">
      <div className="container mx-auto px-4 md:px-6 flex flex-col md:flex-row items-center justify-between">
        <div className="flex items-center gap-2">
          <Logo className="h-6 w-6" />
          <span className="text-lg font-semibold">OAK IT Solutions</span>
        </div>
        <nav className="flex flex-col sm:flex-row gap-4 sm:gap-6 mt-4 md:mt-0">
          <Link
            className="text-sm font-medium hover:underline underline-offset-4"
            href="#"
          >
            Privacy Policy
          </Link>
          <Link
            className="text-sm font-medium hover:underline underline-offset-4"
            href="#"
          >
            Pricing
          </Link>
          <Link
            className="text-sm font-medium hover:underline underline-offset-4"
            href="#"
          >
            Terms of Service
          </Link>
          <Link
            className="text-sm font-medium hover:underline underline-offset-4"
            href="#"
          >
            Contact Us
          </Link>
        </nav>
        <div className="space-y-2 mt-4 md:mt-0 text-center md:text-left">
          <h3 className="text-lg font-semibold">Location</h3>
          <p>Central Road, Komamboga Total Bahai, UG, Kampala</p>
          <p>Phone: (256) 704 302 335</p>
          <p>Email: info@oakitsolutionsandsupplies.com</p>
          <p className="text-sm">Copyright © 2024 OAK IT Solutions and Supplies Ltd. All rights reserved.
      </p>
        </div>
      </div>
      
    </footer>
  );
};

export default Footer;
