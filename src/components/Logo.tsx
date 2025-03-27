
import React from 'react';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

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
    <motion.div 
      className={cn('flex items-center gap-3', className)}
      whileHover={{ scale: 1.03 }}
      transition={{ duration: 0.3 }}
    >
      <div className={cn('relative', sizeClasses[size])}>
        {/* Squeegee + Lake Tahoe Outline Logo */}
        <svg 
          viewBox="0 0 48 48" 
          className={cn('h-full w-auto', colorClasses[color])}
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Lake Tahoe Outline */}
          <motion.path 
            d="M24 44C35.0457 44 44 35.0457 44 24C44 12.9543 35.0457 4 24 4C12.9543 4 4 12.9543 4 24C4 35.0457 12.9543 44 24 44Z" 
            stroke="currentColor" 
            strokeWidth="2" 
            fill="none"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1, ease: "easeInOut" }}
          />
          <motion.path 
            d="M12 16C12 16 14 18 17 18C20 18 22 16 22 16C22 16 24 18 27 18C30 18 32 16 32 16C32 16 34 18 37 18C40 18 42 16 42 16" 
            stroke="currentColor" 
            strokeWidth="2" 
            fill="none"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1, delay: 0.5, ease: "easeInOut" }}
          />
          
          {/* Squeegee */}
          <motion.rect 
            x="14" 
            y="22" 
            width="20" 
            height="4" 
            rx="1" 
            fill="currentColor"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: 1, ease: "easeOut" }}
          />
          <motion.path 
            d="M18 26L16 36" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.6, delay: 1.1, ease: "easeInOut" }}
          />
          <motion.path 
            d="M30 26L32 36" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.6, delay: 1.1, ease: "easeInOut" }}
          />
          <motion.rect 
            x="15" 
            y="34" 
            width="18" 
            height="2" 
            rx="1" 
            fill="currentColor"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: 1.2, ease: "easeOut" }}
          />
        </svg>
      </div>
      
      {withText && (
        <motion.div 
          className={cn('flex flex-col leading-none', colorClasses[color])}
          initial={{ opacity: 0, x: -5 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <span className="font-bold tracking-tight text-sm md:text-base">Big Blue</span>
          <span className="font-light text-xs md:text-sm">Window Cleaning</span>
        </motion.div>
      )}
    </motion.div>
  );
};

export default Logo;
