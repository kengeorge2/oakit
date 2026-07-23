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
  const [scrolled, setScrolled] = useState(false);
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

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isActive = (href: string) => pathname === href;

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-gray-950/80 backdrop-blur-xl border-b border-white/[0.08] shadow-lg shadow-black/20'
          : 'bg-gray-950/60 backdrop-blur-md border-b border-transparent'
      }`}
    >
      <div className="container mx-auto px-4 lg:px-6 h-16 flex items-center justify-between">
        <Link href="/">
          <div className="flex items-center">
            <Logo />
            <span className="ml-2 text-lg font-semibold text-gray-50">OAK IT Solutions</span>
          </div>
        </Link>

        <nav className="hidden lg:flex items-center gap-6 text-sm font-medium text-gray-300">
          <Link href="/#services" className="hover:text-white transition-colors duration-200">
            Services
          </Link>
          <Link href="/products" className={`hover:text-white transition-colors duration-200 ${isActive('/products') ? 'text-white' : ''}`}>
            Products
          </Link>

          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="hover:text-white transition-colors duration-200 flex items-center gap-1"
            >
              About
              <svg
                className={`w-3 h-3 transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {isDropdownOpen && (
              <ul className="absolute left-0 mt-2 w-48 bg-gray-800/95 backdrop-blur-xl rounded-lg shadow-xl z-50 border border-white/[0.08] overflow-hidden">
                <li>
                  <Link href="/about-us" scroll={false} className="block px-4 py-2.5 text-gray-300 hover:bg-white/[0.06] hover:text-white transition-colors" onClick={() => setIsDropdownOpen(false)}>
                    About Us
                  </Link>
                </li>
                <li>
                  <Link href="/about-us/company-profile" className="block px-4 py-2.5 text-gray-300 hover:bg-white/[0.06] hover:text-white transition-colors" onClick={() => setIsDropdownOpen(false)}>
                    Company Profile
                  </Link>
                </li>
                <li>
                  <Link href="/#testimonials" className="block px-4 py-2.5 text-gray-300 hover:bg-white/[0.06] hover:text-white transition-colors" onClick={() => setIsDropdownOpen(false)}>
                    Testimonials
                  </Link>
                </li>
                <li>
                  <Link href="/#mission" className="block px-4 py-2.5 text-gray-300 hover:bg-white/[0.06] hover:text-white transition-colors" onClick={() => setIsDropdownOpen(false)}>
                    Mission
                  </Link>
                </li>
                <li>
                  <Link href="/#faq" className="block px-4 py-2.5 text-gray-300 hover:bg-white/[0.06] hover:text-white transition-colors" onClick={() => setIsDropdownOpen(false)}>
                    FAQ
                  </Link>
                </li>
              </ul>
            )}
          </div>

          <Link href="/blog" className="hover:text-white transition-colors duration-200">
            Blog
          </Link>
          <Link href="/#contactUs" className="hover:text-white transition-colors duration-200">
            Contact
          </Link>
          <Link href="/#servicesPricing" className="hover:text-white transition-colors duration-200">
            Pricing
          </Link>
          <Link href="/#full-stack-course" className="hover:text-white transition-colors duration-200">
            Bootcamp
          </Link>
        </nav>

        <div className="flex items-center gap-3">
          <Link href="/auth/signin" className="hidden lg:inline-flex text-sm font-medium text-gray-300 hover:text-white transition-colors duration-200">
            Sign In
          </Link>
          <Link href="/auth/signup?plan=regular" className="hidden lg:inline-flex items-center justify-center rounded-lg bg-gradient-to-r from-purple-500 to-blue-500 px-4 py-2 text-sm font-semibold text-white hover:from-purple-600 hover:to-blue-600 transition-all duration-200 btn-glow">
            Get Started
          </Link>
          <button
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className="p-2 text-gray-300 hover:text-white transition-colors duration-200"
            aria-label="Toggle dark mode"
          >
            {theme === 'dark' ? <FiSun size={20} /> : <FiMoon size={20} />}
          </button>

          <button
            className="lg:hidden p-2 text-gray-300 hover:text-white transition-colors duration-200"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
        </div>
      </div>

      {isMenuOpen && (
        <div className="lg:hidden w-full bg-gray-950/95 backdrop-blur-xl border-t border-white/[0.08]">
          <nav className="container mx-auto px-4 py-4 flex flex-col gap-4 text-sm font-medium text-gray-300">
            <Link href="/#services" className="py-2 hover:text-white transition-colors" onClick={() => setIsMenuOpen(false)}>
              Services
            </Link>
            <Link href="/products" className="py-2 hover:text-white transition-colors" onClick={() => setIsMenuOpen(false)}>
              Products
            </Link>

            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="py-2 text-left hover:text-white transition-colors flex items-center gap-1"
            >
              About
              <svg
                className={`w-3 h-3 transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {isDropdownOpen && (
              <ul className="pl-4 flex flex-col gap-2 border-l border-white/[0.1]">
                <li>
                  <Link href="/about-us" scroll={false} className="block py-1 hover:text-white transition-colors" onClick={() => { setIsDropdownOpen(false); setIsMenuOpen(false); }}>
                    About Us
                  </Link>
                </li>
                <li>
                  <Link href="/about-us/company-profile" className="block py-1 hover:text-white transition-colors" onClick={() => { setIsDropdownOpen(false); setIsMenuOpen(false); }}>
                    Company Profile
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
            <div className="flex gap-3 pt-2 border-t border-white/[0.08]">
              <Link href="/auth/signin" className="flex-1 text-center py-2 border border-white/[0.1] rounded-lg hover:bg-white/[0.06] transition-colors" onClick={() => setIsMenuOpen(false)}>
                Sign In
              </Link>
              <Link href="/auth/signup?plan=regular" className="flex-1 text-center py-2 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg hover:from-purple-600 hover:to-blue-600 text-white transition-all" onClick={() => setIsMenuOpen(false)}>
                Get Started
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Navbar;
