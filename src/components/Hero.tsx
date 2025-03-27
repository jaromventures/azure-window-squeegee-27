
import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

interface HeroProps {
  title?: string;
  subtitle?: string;
  showCta?: boolean;
  backgroundImage?: string;
  isHome?: boolean;
}

const Hero: React.FC<HeroProps> = ({
  title = "Crystal Clear Views, Every Time",
  subtitle = "Professional window cleaning services in Lake Tahoe for residential and commercial properties",
  showCta = true,
  backgroundImage = "/lovable-uploads/17befe3f-3bca-4571-a21a-7a146a7b455d.png",
  isHome = true,
}) => {
  const parallaxRef = useRef<HTMLDivElement>(null);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
      if (parallaxRef.current) {
        parallaxRef.current.style.transform = `translateY(${window.scrollY * 0.4}px)`;
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
    }
  };

  return (
    <section className="relative w-full h-screen overflow-hidden">
      {/* Background image with parallax effect */}
      <div 
        ref={parallaxRef} 
        className="absolute inset-0 w-full h-full"
        style={{
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          transform: 'translateY(0px)',
        }}
      />
      
      {/* Overlay gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-transparent" />
      
      {/* Content container */}
      <div className="relative h-full flex flex-col justify-center items-center text-center px-6 md:px-12 z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-4xl mx-auto backdrop-blur-sm bg-white/10 p-8 md:p-12 rounded-3xl border border-white/20"
        >
          <motion.h1 
            variants={itemVariants}
            className="text-4xl md:text-5xl lg:text-7xl font-bold text-white mb-6 tracking-tight"
          >
            {title}
          </motion.h1>
          
          <motion.p 
            variants={itemVariants}
            className="text-lg md:text-xl text-white/90 mb-8 max-w-2xl mx-auto font-light"
          >
            {subtitle}
          </motion.p>
          
          {showCta && (
            <motion.div 
              variants={itemVariants}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Button 
                asChild
                size="lg" 
                className="apple-button bg-tahoe/90 backdrop-blur-sm hover:bg-tahoe text-white border-tahoe/20 text-lg shadow-apple-blue"
              >
                <Link to="/booking">Book Now</Link>
              </Button>
              <Button 
                asChild
                variant="outline" 
                size="lg" 
                className="border-white/50 bg-white/10 backdrop-blur-sm text-white hover:bg-white/20 text-lg font-medium transition-all duration-300"
              >
                <Link to="/services">Our Services</Link>
              </Button>
            </motion.div>
          )}
        </motion.div>
        
        {/* Scroll indicator for home page */}
        {isHome && (
          <motion.div 
            className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: scrollY > 20 ? 0 : 1 }}
            transition={{ delay: 1.5, duration: 0.5 }}
          >
            <p className="text-white/80 text-sm mb-2 font-light">Scroll to explore</p>
            <motion.div 
              className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center p-1"
              initial={{ y: 0 }}
              animate={{ y: [0, 10, 0] }}
              transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
            >
              <motion.div className="w-1.5 h-1.5 bg-white rounded-full" />
            </motion.div>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default Hero;
