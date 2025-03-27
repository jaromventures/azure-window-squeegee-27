
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import Logo from './Logo';
import { Menu, X, Home, Calendar, Info, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';

const NavBar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    // Close mobile menu when route changes
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { name: 'Home', path: '/', icon: <Home className="h-4 w-4" /> },
    { name: 'Services', path: '/services', icon: <Info className="h-4 w-4" /> },
    { name: 'Book Now', path: '/booking', icon: <Calendar className="h-4 w-4" /> },
    { name: 'Contact', path: '/contact', icon: <Phone className="h-4 w-4" /> },
  ];

  return (
    <header 
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-in-out',
        isScrolled ? 'glass py-3 backdrop-blur-xl bg-white/80 border-b border-white/20' : 'py-5 bg-transparent'
      )}
    >
      <div className="container mx-auto flex justify-between items-center px-4 md:px-8">
        <Link to="/" className="z-10">
          <Logo color={isScrolled || isMobileMenuOpen ? 'dark' : 'white'} />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-10 items-center">
          {navLinks.map((link, index) => (
            <React.Fragment key={link.name}>
              {link.name === 'Book Now' ? (
                <Button
                  asChild
                  className="apple-button bg-tahoe/90 hover:bg-tahoe text-white border-tahoe/20 shadow-apple-blue"
                >
                  <Link to={link.path} className="font-medium">
                    {link.name}
                  </Link>
                </Button>
              ) : (
                <Link
                  to={link.path}
                  className={cn(
                    'relative py-2 transition-colors duration-300 font-medium',
                    isScrolled 
                      ? (location.pathname === link.path ? 'text-tahoe-dark' : 'text-gray-600 hover:text-tahoe-dark')
                      : (location.pathname === link.path ? 'text-white' : 'text-white/80 hover:text-white')
                  )}
                >
                  {link.name}
                  {location.pathname === link.path && (
                    <motion.div 
                      layoutId="nav-underline"
                      className={`absolute -bottom-1 left-0 w-full h-0.5 ${isScrolled ? 'bg-tahoe' : 'bg-white'}`}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                    />
                  )}
                </Link>
              )}
            </React.Fragment>
          ))}
        </nav>

        {/* Mobile Menu Toggle */}
        <button 
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="md:hidden z-10 p-2 text-tahoe-dark"
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </button>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, backdropFilter: 'blur(0px)' }}
              animate={{ opacity: 1, backdropFilter: 'blur(20px)' }}
              exit={{ opacity: 0, backdropFilter: 'blur(0px)' }}
              transition={{ duration: 0.4 }}
              className="fixed inset-0 top-0 bg-black/50 md:hidden z-0 flex flex-col justify-center"
            >
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.3, delay: 0.1 }}
                className="flex flex-col items-center space-y-6 p-6 mt-16 backdrop-blur-xl bg-white/10 mx-6 rounded-3xl border border-white/20"
              >
                {navLinks.map((link, index) => (
                  <motion.div
                    key={link.name}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.1 + index * 0.1 }}
                  >
                    <Link
                      to={link.path}
                      className={cn(
                        'text-white text-xl font-light py-2 px-4 flex items-center gap-2',
                        location.pathname === link.path && 'text-tahoe-medium font-normal'
                      )}
                    >
                      {link.icon}
                      {link.name}
                    </Link>
                  </motion.div>
                ))}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.5 }}
                  className="mt-4 w-full"
                >
                  <Button
                    asChild
                    size="lg"
                    className="apple-button bg-tahoe/90 hover:bg-tahoe text-white border-tahoe/20 w-full shadow-apple-blue"
                  >
                    <Link to="/booking">Book Now</Link>
                  </Button>
                </motion.div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
};

export default NavBar;
