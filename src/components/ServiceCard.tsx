
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { ArrowRight } from 'lucide-react';

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
        'relative rounded-3xl overflow-hidden group h-full flex flex-col shadow-apple transition-all duration-500',
        className,
        isHovered ? 'shadow-apple-hover' : ''
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ y: -8, transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] } }}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <motion.div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${imageSrc})` }}
          animate={{ 
            scale: isHovered ? 1.05 : 1,
          }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-tahoe-dark/60 to-tahoe-dark/90 backdrop-filter backdrop-blur-[2px]" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col justify-between h-full p-8 text-white">
        <div>
          <motion.div 
            className="mb-5 text-tahoe-medium"
            animate={{ 
              scale: isHovered ? 1.1 : 1,
              y: isHovered ? -5 : 0
            }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          >
            {icon}
          </motion.div>
          <motion.h3 
            className="text-2xl font-semibold mb-3 tracking-tight"
            animate={{ y: isHovered ? -2 : 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          >
            {title}
          </motion.h3>
          <motion.p 
            className="text-white/80 mb-6 font-light"
            animate={{ y: isHovered ? -2 : 0, opacity: isHovered ? 1 : 0.8 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          >
            {description}
          </motion.p>
        </div>
        
        <motion.div
          animate={{ y: isHovered ? -5 : 0, opacity: isHovered ? 1 : 0.9 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        >
          <Button 
            asChild
            variant="outline" 
            className="mt-auto border-white/30 bg-transparent text-white hover:bg-white/10 hover:border-white transition-all duration-300 group"
          >
            <Link to={link} className="flex items-center gap-1">
              Learn More 
              <ArrowRight className="h-4 w-4 transform group-hover:translate-x-1 transition-transform duration-300" />
            </Link>
          </Button>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default ServiceCard;
