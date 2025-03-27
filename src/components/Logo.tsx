
import React from 'react';
import { cn } from '@/lib/utils';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  color?: 'light' | 'dark' | 'white';
  withText?: boolean;
}

const Logo: React.FC<LogoProps> = ({ 
  className, 
  size = 'md', 
  color = 'dark',
  withText = true 
}) => {
  const sizeClasses = {
    sm: 'h-8',
    md: 'h-10',
    lg: 'h-12'
  };

  const colorClasses = {
    light: 'text-tahoe',
    dark: 'text-tahoe-dark',
    white: 'text-white'
  };

  return (
    <div className={cn('flex items-center gap-2', className)}>
      <div className={cn('relative', sizeClasses[size])}>
        {/* Squeegee + Lake Tahoe Outline Logo */}
        <svg 
          viewBox="0 0 48 48" 
          className={cn('h-full w-auto', colorClasses[color])}
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Lake Tahoe Outline */}
          <path 
            d="M24 44C35.0457 44 44 35.0457 44 24C44 12.9543 35.0457 4 24 4C12.9543 4 4 12.9543 4 24C4 35.0457 12.9543 44 24 44Z" 
            stroke="currentColor" 
            strokeWidth="2" 
            fill="none"
          />
          <path 
            d="M12 16C12 16 14 18 17 18C20 18 22 16 22 16C22 16 24 18 27 18C30 18 32 16 32 16C32 16 34 18 37 18C40 18 42 16 42 16" 
            stroke="currentColor" 
            strokeWidth="2" 
            fill="none"
          />
          
          {/* Squeegee */}
          <rect 
            x="14" 
            y="22" 
            width="20" 
            height="4" 
            rx="1" 
            fill="currentColor" 
          />
          <path 
            d="M18 26L16 36" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
          />
          <path 
            d="M30 26L32 36" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
          />
          <rect 
            x="15" 
            y="34" 
            width="18" 
            height="2" 
            rx="1" 
            fill="currentColor" 
          />
        </svg>
      </div>
      
      {withText && (
        <div className={cn('flex flex-col leading-none', colorClasses[color])}>
          <span className="font-bold tracking-tight text-sm md:text-base">Big Blue</span>
          <span className="font-light text-xs md:text-sm">Window Cleaning</span>
        </div>
      )}
    </div>
  );
};

export default Logo;
