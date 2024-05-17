// components/Logo.tsx
import React from 'react';
import Image from 'next/image';


/*
interface LogoProps {
  width?: number;
  height?: number;
  className?: string;
}

const Logo: React.FC<LogoProps> = ({ width = 250, height = 74, className = '' }) => {
  return (
    
        <div className={`flex items-center ${className}`}>
      
        <Image
          src="/images/Logo.png"
          alt="Company Logo"
          //width={width}
          //height={height}
          layout="responsive"
          //priority

          fill
          style={{ objectFit: 'contain' }}
        />
        </div>
        
    
  );
};

export default Logo;




const Logo: React.FC = () => {
  return (
    <div className="w-full h-auto max-w-[150px] md:max-w-[150px] lg:max-w-[180px] rounded-full overflow-hidden">
      {/* Logo image }
      <Image
        src="/images/Logo.png"
        alt="Your Logo"
        width={150}
        height={54}
        layout="responsive" // Ensures responsive sizing
        objectFit="cover" // Crops to fit container
      />
    </div>
  );
};

export default Logo;

*/


/*const Logo: React.FC = () => {
  return (
    <div className="relative w-full h-auto flex justify-center items-center">
     // {/* Overlay with a slight opacity }
      //<div className="absolute inset-0 bg-gray-700 opacity-20 rounded-full" />
      //{/* Logo image with border *}
      /*<Image
        src="/images/Logo.png"
        alt="Your Logo"
        width={70} // Adjust as needed
        height={30} // Adjust as needed
        objectFit="cover" // Crops to fit container
        className="rounded-full border-4 border-white" // Add border
      />
    </div>
  );
};

export default Logo;
*/


const Logo: React.FC = () => {
  return (
    <div className="relative w-full h-auto flex justify-center items-center">
      {/* Overlay with a slight opacity */}
      <div className="absolute inset-0 bg-gray-700 opacity-20 rounded-full" />
      {/* Logo image with border and gradient */}
      <Image
        src="/images/Logo.png" // Adjust path as needed
        alt="Your Logo"
        width={60} // Adjust as needed
        height={30} // Adjust as needed
        objectFit="cover" // Crops to fit container
        className="rounded-full border-4 border-transparent" // Remove white border
        style={{
          boxShadow: `inset 0 0 0 4px rgba(0, 255, 127, 0.5), 0 0 0 8px rgba(0, 0, 255, 0.3)`,
        }}
      />
    </div>
  );
};

export default Logo;
