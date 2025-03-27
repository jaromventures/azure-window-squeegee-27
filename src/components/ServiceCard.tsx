
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';

interface ServiceCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  imageSrc: string;
  link: string;
  className?: string;
}

const ServiceCard: React.FC<ServiceCardProps> = ({
  title,
  description,
  icon,
  imageSrc,
  link,
  className
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      className={cn(
        'relative rounded-2xl overflow-hidden group h-full flex flex-col tahoe-shadow transition-all duration-300',
        className
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ y: -8 }}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <div 
          className="absolute inset-0 bg-cover bg-center transition-transform duration-500 ease-in-out"
          style={{ 
            backgroundImage: `url(${imageSrc})`,
            transform: isHovered ? 'scale(1.05)' : 'scale(1)',
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-tahoe-dark/60 to-tahoe-dark/90" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col justify-between h-full p-6 text-white">
        <div>
          <div className="mb-4 text-tahoe-medium">{icon}</div>
          <h3 className="text-2xl font-semibold mb-3">{title}</h3>
          <p className="text-white/80 mb-6">{description}</p>
        </div>
        
        <Button 
          asChild
          variant="outline" 
          className="mt-auto border-white/30 bg-transparent text-white hover:bg-white/10 hover:border-white transition-all duration-300"
        >
          <Link to={link}>Learn More</Link>
        </Button>
      </div>
    </motion.div>
  );
};

export default ServiceCard;
