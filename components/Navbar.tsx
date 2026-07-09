'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Logo from '@/components/component/Logo';
import { FiMenu, FiX, FiSun, FiMoon } from 'react-icons/fi';
import { useTheme } from 'next-themes';
import { usePathname } from 'next/navigation';

export const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const pathname = usePathname();
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const isActive = (href: string) => pathname === href;

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-gray-900/95 dark:bg-gray-950/95 backdrop-blur supports-[backdrop-filter]:bg-gray-900/80 dark:supports-[backdrop-filter]:bg-gray-950/80 border-b border-gray-800">
      <div className="container mx-auto px-4 lg:px-6 h-16 flex items-center justify-between">
        <Link href="/">
          <div className="flex items-center">
            <Logo />
            <span className="ml-2 text-lg font-semibold text-gray-50">OAK IT Solutions</span>
          </div>
        </Link>

        <nav className="hidden lg:flex items-center gap-6 text-sm font-medium text-gray-300">
          <Link href="/#services" className="hover:text-white transition-colors">
            Services
          </Link>

          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="hover:text-white transition-colors flex items-center gap-1"
            >
              About
              <svg
                className={`w-3 h-3 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {isDropdownOpen && (
              <ul className="absolute left-0 mt-2 w-48 bg-gray-800 rounded-md shadow-lg z-50 border border-gray-700">
                <li>
                  <Link href="/aboutUs" scroll={false} className="block px-4 py-2 text-gray-300 hover:bg-gray-700 hover:text-white rounded-t-md" onClick={() => setIsDropdownOpen(false)}>
                    About Us
                  </Link>
                </li>
                <li>
                  <Link href="/#testimonials" className="block px-4 py-2 text-gray-300 hover:bg-gray-700 hover:text-white" onClick={() => setIsDropdownOpen(false)}>
                    Testimonials
                  </Link>
                </li>
                <li>
                  <Link href="/#mission" className="block px-4 py-2 text-gray-300 hover:bg-gray-700 hover:text-white" onClick={() => setIsDropdownOpen(false)}>
                    Mission
                  </Link>
                </li>
                <li>
                  <Link href="/#faq" className="block px-4 py-2 text-gray-300 hover:bg-gray-700 hover:text-white rounded-b-md" onClick={() => setIsDropdownOpen(false)}>
                    FAQ
                  </Link>
                </li>
              </ul>
            )}
          </div>

          <Link href="/blog" className="hover:text-white transition-colors">
            Blog
          </Link>
          <Link href="/#contactUs" className="hover:text-white transition-colors">
            Contact
          </Link>
          <Link href="/#servicesPricing" className="hover:text-white transition-colors">
            Pricing
          </Link>
          <Link href="/#full-stack-course" className="hover:text-white transition-colors">
            Bootcamp
          </Link>
        </nav>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className="p-2 text-gray-300 hover:text-white transition-colors"
            aria-label="Toggle dark mode"
          >
            {theme === 'dark' ? <FiSun size={20} /> : <FiMoon size={20} />}
          </button>

          <button
            className="lg:hidden p-2 text-gray-300 hover:text-white transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
        </div>
      </div>

      {isMenuOpen && (
        <div className="lg:hidden w-full bg-gray-900 dark:bg-gray-950 border-t border-gray-800">
          <nav className="container mx-auto px-4 py-4 flex flex-col gap-4 text-sm font-medium text-gray-300">
            <Link href="/#services" className="py-2 hover:text-white transition-colors" onClick={() => setIsMenuOpen(false)}>
              Services
            </Link>

            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="py-2 text-left hover:text-white transition-colors flex items-center gap-1"
            >
              About
              <svg
                className={`w-3 h-3 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {isDropdownOpen && (
              <ul className="pl-4 flex flex-col gap-2 border-l border-gray-700">
                <li>
                  <Link href="/aboutUs" scroll={false} className="block py-1 hover:text-white transition-colors" onClick={() => { setIsDropdownOpen(false); setIsMenuOpen(false); }}>
                    About Us
                  </Link>
                </li>
                <li>
                  <Link href="/#testimonials" className="block py-1 hover:text-white transition-colors" onClick={() => { setIsDropdownOpen(false); setIsMenuOpen(false); }}>
                    Testimonials
                  </Link>
                </li>
                <li>
                  <Link href="/#mission" className="block py-1 hover:text-white transition-colors" onClick={() => { setIsDropdownOpen(false); setIsMenuOpen(false); }}>
                    Mission
                  </Link>
                </li>
                <li>
                  <Link href="/#faq" className="block py-1 hover:text-white transition-colors" onClick={() => { setIsDropdownOpen(false); setIsMenuOpen(false); }}>
                    FAQ
                  </Link>
                </li>
              </ul>
            )}

            <Link href="/blog" className="py-2 hover:text-white transition-colors" onClick={() => setIsMenuOpen(false)}>
              Blog
            </Link>
            <Link href="/#contactUs" className="py-2 hover:text-white transition-colors" onClick={() => setIsMenuOpen(false)}>
              Contact
            </Link>
            <Link href="/#servicesPricing" className="py-2 hover:text-white transition-colors" onClick={() => setIsMenuOpen(false)}>
              Pricing
            </Link>
            <Link href="/#full-stack-course" className="py-2 hover:text-white transition-colors" onClick={() => setIsMenuOpen(false)}>
              Courses
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Navbar;
