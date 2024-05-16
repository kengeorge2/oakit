// components/Logo.tsx
'use client'
import Image from 'next/image';
import { useEffect, useState } from 'react';
import Link from 'next/link';


const Logo = () => {
  const [width, setWidth] = useState(window.innerWidth);
  const [showButton, setShowButton] = useState(false);

  const updateWidth = () => {
    setWidth(window.innerWidth);
  };

  useEffect(() => {
    window.addEventListener('resize', updateWidth);
    updateWidth();

    const handleScroll = () => {
      if (window.scrollY >= 400 && window.innerWidth < 768) {
        setShowButton(true);
      } else {
        setShowButton(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('resize', updateWidth);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <>
      <Link href="/">
        <a>
          <Image
            src="/images/Logo.png"
            alt="Company Logo"
            width={width < 1024? 150 : 250}
            height={width < 1024? 45 : 74}
            className="relative"
          />
        </a>
      </Link>
      {showButton && (
        <button className="h-12 rounded-lg bg-white font-bold px-5">Menu</button>
      )}
    </>
  );
};

export default Logo;
