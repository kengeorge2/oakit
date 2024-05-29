//'use client';

// Navbar.tsx

/*
import React, { useState } from 'react';
import Link from 'next/link';
import Logo from '@/components/component/Logo';
import { FiMenu, FiX } from 'react-icons/fi';

interface NavbarProps {
    className?: string;
}

export const Navbar: React.FC<NavbarProps> = ({ className }) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    return (
        <header>
            <div className={`px-4 lg:px-6 py-3 flex items-center justify-between bg-gray-900 text-gray-50 dark:bg-gray-950 dark:text-gray-50 ${className}`}>
                <Link href="/">
                    <div className="flex items-center">
                        <Logo />
                        <span className="ml-2 text-lg font-semibold">OAK IT Solutions</span>
                    </div>
                </Link>
                <nav className={`${isMenuOpen ? 'absolute top-14 left-0 w-full bg-gray-900 dark:bg-gray-950 p-4 z-10' : 'hidden lg:block lg:static lg:w-auto lg:p-0'}`}>
                    <ul className="flex flex-col lg:flex-row lg:gap-4 sm:gap-6 text-sm font-medium">
                        <li>
                            <Link href="#services" className="block py-2 hover:underline underline-offset-4">
                                Services
                            </Link>
                        </li>
                        <li className="relative">
                            <button onClick={toggleDropdown} className="block py-2 hover:underline underline-offset-4">
                                About
                            </button>
                            {isDropdownOpen && (
                                <ul className="absolute left-0 mt-2 w-48 bg-gradient-to-r from-lime-400 to-blue-400 rounded-md shadow-lg z-20">
                                    <li>
                                        <Link href="#about-us" className="block px-4 py-2 text-white hover:bg-lime-500 rounded-t-md">About Us</Link>
                                    </li>
                                    <li>
                                        <Link href="#testimonials" className="block px-4 py-2 text-white hover:bg-lime-500">Testimonial</Link>
                                    </li>
                                    <li>
                                        <Link href="#mission" className="block px-4 py-2 text-white hover:bg-lime-500">Mission</Link>
                                    </li>
                                    <li>
                                        <Link href="#faq" className="block px-4 py-2 text-white hover:bg-lime-500 rounded-b-md">FAQ</Link>
                                    </li>
                                </ul>
                            )}
                        </li>
                        <li>
                            <Link href="#blog" className="block py-2 hover:underline underline-offset-4">
                                Blog
                            </Link>
                        </li>
                        <li>
                            <Link href="#contact" className="block py-2 hover:underline underline-offset-4">
                                Contact
                            </Link>
                        </li>
                        <li>
                            <Link href="#pricing" className="block py-2 hover:underline underline-offset-4">
                                Pricing
                            </Link>
                        </li>
                    </ul>
                </nav>
                <button className="lg:hidden text-gray-50 hover:text-gray-400 focus:outline-none" onClick={toggleMenu}>
                    {isMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
                </button>
            </div>
        </header>
    );
};

export default Navbar;


//'use client';

// Navbar.tsx

import React, { useState } from 'react';
import Link from 'next/link';
import Logo from '@/components/component/Logo';
import { FiMenu, FiX } from 'react-icons/fi';

interface NavbarProps {
    className?: string;
}

export const Navbar: React.FC<NavbarProps> = ({ className }) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    return (
        <header>
            <div className={`px-4 lg:px-6 py-3 flex items-center justify-between bg-gray-900 text-gray-50 dark:bg-gray-950 dark:text-gray-50 ${className}`}>
                <Link href="/">
                    <div className="flex items-center">
                        <Logo />
                        <span className="ml-2 text-lg font-semibold">OAK IT Solutions</span>
                    </div>
                </Link>
                <nav className={`${isMenuOpen ? 'absolute top-14 left-0 w-full bg-gray-900 dark:bg-gray-950 p-4 z-10' : 'hidden lg:block lg:static lg:w-auto lg:p-0'}`}>
                    <ul className="flex flex-col lg:flex-row lg:gap-4 sm:gap-6 text-sm font-medium">
                        <li>
                            <Link href="#services" className="block py-2 hover:underline underline-offset-4">
                                Services
                            </Link>
                        </li>
                        <li className="relative">
                            <button onClick={toggleDropdown} className="block py-2 hover:underline underline-offset-4">
                                About
                            </button>
                            {isDropdownOpen && (
                                <ul className="absolute left-0 mt-2 w-48 bg-gradient-to-r from-lime-400 to-blue-400 rounded-md shadow-lg z-20">
                                    <li>
                                        <Link href="#about-us" className="block px-4 py-2 text-white hover:bg-lime-500 rounded-t-md">About Us</Link>
                                    </li>
                                    <li>
                                        <Link href="#testimonials" className="block px-4 py-2 text-white hover:bg-lime-500">Testimonial</Link>
                                    </li>
                                    <li>
                                        <Link href="#mission" className="block px-4 py-2 text-white hover:bg-lime-500">Mission</Link>
                                    </li>
                                    <li>
                                        <Link href="#faq" className="block px-4 py-2 text-white hover:bg-lime-500 rounded-b-md">FAQ</Link>
                                    </li>
                                </ul>
                            )}
                        </li>
                        <li>
                            <Link href="#blog" className="block py-2 hover:underline underline-offset-4">
                                Blog
                            </Link>
                        </li>
                        <li>
                            <Link href="#contact" className="block py-2 hover:underline underline-offset-4">
                                Contact
                            </Link>
                        </li>
                        <li>
                            <Link href="#servicesPricing" className="block py-2 hover:underline underline-offset-4">
                                Pricing
                            </Link>
                        </li>
                        <li>
                            <Link href="#full-stack-course" className="block py-2 hover:underline underline-offset-4">
                                Become a Full Stack Developer
                            </Link>
                        </li>
                    </ul>
                </nav>
                <button className="lg:hidden text-gray-50 hover:text-gray-400 focus:outline-none" onClick={toggleMenu}>
                    {isMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
                </button>
            </div>
        </header>
    );
};

export default Navbar;



// Navbar.tsx

//'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Logo from '@/components/component/Logo';
import { FiMenu, FiX } from 'react-icons/fi';

interface NavbarProps {
    className?: string;
}

export const Navbar: React.FC<NavbarProps> = ({ className }) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    return (
        <header className="z-60 relative">
            <div className={`px-4 lg:px-6 py-3 flex items-center justify-between bg-gray-900 text-gray-50 dark:bg-gray-950 dark:text-gray-50 ${className}`}>
                <Link href="/">
                    <div className="flex items-center">
                        <Logo />
                        <span className="ml-2 text-lg font-semibold">OAK IT Solutions</span>
                    </div>
                </Link>
                <nav className={`${isMenuOpen ? 'absolute top-14 left-0 w-full bg-gray-900 dark:bg-gray-950 p-4 z-10' : 'hidden lg:block lg:static lg:w-auto lg:p-0'}`}>
                    <ul className="flex flex-col lg:flex-row lg:gap-4 sm:gap-6 text-sm font-medium">
                        <li>
                            <Link href="#services" className="block py-2 hover:underline underline-offset-4">
                                Services
                            </Link>
                        </li>
                        <li className="relative">
                            <button onClick={toggleDropdown} className="block py-2 hover:underline underline-offset-4">
                                About
                            </button>
                            {isDropdownOpen && (
                                <ul className="absolute left-0 mt-2 w-48 bg-gradient-to-r from-lime-400 to-blue-400 rounded-md shadow-lg z-20">
                                    <li>
                                        <Link href="/aboutUs" className="block px-4 py-2 text-white hover:bg-lime-500 rounded-t-md">About Us</Link>
                                    </li>
                                    <li>
                                        <Link href="#testimonials" className="block px-4 py-2 text-white hover:bg-lime-500">Testimonial</Link>
                                    </li>
                                    <li>
                                        <Link href="#mission" className="block px-4 py-2 text-white hover:bg-lime-500">Mission</Link>
                                    </li>
                                    <li>
                                        <Link href="#faq" className="block px-4 py-2 text-white hover:bg-lime-500 rounded-b-md">FAQ</Link>
                                    </li>
                                </ul>
                            )}
                        </li>
                        <li>
                            <Link href="#blog" className="block py-2 hover:underline underline-offset-4">
                                Blog
                            </Link>
                        </li>
                        <li>
                            <Link href="#contactUs" className="block py-2 hover:underline underline-offset-4">
                                Contact
                            </Link>
                        </li>
                        <li>
                            <Link href="#servicesPricing" className="block py-2 hover:underline underline-offset-4">
                                Pricing
                            </Link>
                        </li>
                        <li>
                            <Link href="#full-stack-course" className="block py-2 hover:underline underline-offset-4">
                                Become a Full Stack Developer
                            </Link>
                        </li>
                    </ul>
                </nav>
                <button className="lg:hidden text-gray-50 hover:text-gray-400 focus:outline-none" onClick={toggleMenu}>
                    {isMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
                </button>
            </div>
        </header>
    );
};

export default Navbar;
 */

'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Logo from '@/components/component/Logo';
import { FiMenu, FiX } from 'react-icons/fi';

interface NavbarProps {
    className?: string;
}

export const Navbar: React.FC<NavbarProps> = ({ className }) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    return (
        <header className="fixed top-0 left-0 w-full z-50">
            <div className={`px-4 lg:px-6 py-3 flex items-center justify-between bg-gray-900 text-gray-50 dark:bg-gray-950 dark:text-gray-50 ${className}`}>
                <Link href="/">
                    <div className="flex items-center">
                        <Logo />
                        <span className="ml-2 text-lg font-semibold">OAK IT Solutions</span>
                    </div>
                </Link>
                <nav className={`${isMenuOpen ? 'absolute top-14 left-0 w-full bg-gray-900 dark:bg-gray-950 p-4 z-10' : 'hidden lg:block lg:static lg:w-auto lg:p-0'}`}>
                    <ul className="flex flex-col lg:flex-row lg:gap-4 sm:gap-6 text-sm font-medium">
                        <li>
                            <Link href="/#services" className="block py-2 hover:underline underline-offset-4">
                                Services
                            </Link>
                        </li>
                        <li className="relative">
                            <button onClick={toggleDropdown} className="block py-2 hover:underline underline-offset-4">
                                About
                            </button>
                            {isDropdownOpen && (
                                <ul className="absolute left-0 mt-2 w-48 bg-gradient-to-r from-lime-400 to-blue-400 rounded-md shadow-lg z-20">
                                    <li>
                                        <Link href="/aboutUs" scroll={false} className="block px-4 py-2 text-white hover:bg-lime-500 rounded-t-md">About Us</Link>
                                    </li>
                                    <li>
                                        <Link href="/#testimonials" className="block px-4 py-2 text-white hover:bg-lime-500">Testimonial</Link>
                                    </li>
                                    <li>
                                        <Link href="/#mission" className="block px-4 py-2 text-white hover:bg-lime-500">Mission</Link>
                                    </li>
                                    <li>
                                        <Link href="/#faq" className="block px-4 py-2 text-white hover:bg-lime-500 rounded-b-md">FAQ</Link>
                                    </li>
                                </ul>
                            )}
                        </li>
                        <li>
                            <Link href="/#blog" className="block py-2 hover:underline underline-offset-4">
                                Blog
                            </Link>
                        </li>
                        <li>
                            <Link href="/#contactUs" className="block py-2 hover:underline underline-offset-4">
                                Contact
                            </Link>
                        </li>
                        <li>
                            <Link href="/#servicesPricing" className="block py-2 hover:underline underline-offset-4">
                                Pricing
                            </Link>
                        </li>
                        <li>
                            <Link href="/#full-stack-course" className="block py-2 hover:underline underline-offset-4">
                                Become a Full Stack Developer
                            </Link>
                        </li>
                    </ul>
                </nav>
                <button className="lg:hidden text-gray-50 hover:text-gray-400 focus:outline-none" onClick={toggleMenu}>
                    {isMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
                </button>
            </div>
        </header>
    );
};

export default Navbar;
