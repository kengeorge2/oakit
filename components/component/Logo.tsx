// components/Logo.tsx
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface LogoProps {
  width?: number;
  height?: number;
  className?: string;
}

const Logo: React.FC<LogoProps> = ({ width = 250, height = 74, className = '' }) => {
  return (
    <Link href="/">
     <div className={`flex items-center ${className}`}>
        <Image
          src="/images/Logo.png"
          alt="Company Logo"
          width={width}
          height={height}
          layout="responsive"
          priority
        />
      </div>
    </Link>
  );
};

export default Logo;
