'use client'

import React from 'react';
import Link from 'next/link';
import Logo from './Logo';
import dynamic from 'next/dynamic';

interface NavbarProps {
  className?: string;
}

const Navbar: React.FC<NavbarProps> = ({ className }) => {
  return (
    <header
      className={`px-4 lg:px-6 h-14 flex items-center bg-gray-900 text-gray-50 dark:bg-gray-950 dark:text-gray-50 ${className}`}
    >
      <Link className="flex items-center justify-center" href="#">
         <Logo  / > 
        <span className="ml-2 text-lg font-semibold">IT Solutions</span>
      </Link> 
      <nav className="ml-auto flex gap-4 sm:gap-6">
        <Link
          className="text-sm font-medium hover:underline underline-offset-4"
          href="#"
        >
          Services
        </Link>
        <Link
          className="text-sm font-medium hover:underline underline-offset-4"
          href="#"
        >
          About
        </Link>
        <Link
          className="text-sm font-medium hover:underline underline-offset-4"
          href="#"
        >
          Blog
        </Link>
        <Link
          className="text-sm font-medium hover:underline underline-offset-4"
          href="#"
        >
          Contact
        </Link>
        <Link
          className="text-sm font-medium hover:underline underline-offset-4"
          href="#"
        >
          Pricing
        </Link>
      </nav>
    </header>
  );
};

export default Navbar;
