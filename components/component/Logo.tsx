// components/Logo.tsx
import React from 'react';
import Image from 'next/image';

const Logo: React.FC = () => {
  return (
    <div className="relative w-full h-auto flex justify-center items-center">
      <div className="absolute inset-0 bg-gray-700 opacity-20 rounded-full" />
      <Image
        src="/images/Logo.png"
        alt="OAK IT Solutions Logo"
        width={60}
        height={30}
        className="rounded-full border-4 border-transparent"
        style={{
          boxShadow: `inset 0 0 0 4px rgba(0, 255, 127, 0.5), 0 0 0 8px rgba(0, 0, 255, 0.3)`,
        }}
      />
    </div>
  );
};

export default Logo;
