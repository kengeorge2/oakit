
'use client'; 




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

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
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
            <nav
                className={`${isMenuOpen
                        ? 'absolute top-14 left-0 w-full bg-gray-900 dark:bg-gray-950 p-4 z-10'
                        : 'hidden lg:block lg:static lg:w-auto lg:p-0'}`}
            >
                <ul className="flex flex-col lg:flex-row lg:gap-4 sm:gap-6 text-sm font-medium">
                    <li>
                        <Link href="#" className="block py-2 hover:underline underline-offset-4">
                            Services
                        </Link>
                    </li>
                    <li>
                        <Link href="#" className="block py-2 hover:underline underline-offset-4">
                            About
                        </Link>
                    </li>
                    <li>
                        <Link href="#" className="block py-2 hover:underline underline-offset-4">
                            Blog
                        </Link>
                    </li>
                    <li>
                        <Link href="#" className="block py-2 hover:underline underline-offset-4">
                            Contact
                        </Link>
                    </li>
                    <li>
                        <Link href="#" className="block py-2 hover:underline underline-offset-4">
                            Pricing
                        </Link>
                    </li>
                </ul>
            </nav>
            <button
                className="lg:hidden text-gray-50 hover:text-gray-400 focus:outline-none"
                onClick={toggleMenu}
            >
                {isMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
            </button>
            </div>
        </header>
    );
};

export default Navbar;


