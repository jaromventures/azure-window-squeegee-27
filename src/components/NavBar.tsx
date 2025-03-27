
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

  const activeNavClass = "relative text-tahoe-dark font-medium before:absolute before:bottom-0 before:left-0 before:w-full before:h-0.5 before:bg-tahoe";
  const inactiveNavClass = "text-gray-600 hover:text-tahoe-dark transition-colors";

  return (
    <header 
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out',
        isScrolled ? 'glass py-3 tahoe-shadow' : 'py-5 bg-transparent'
      )}
    >
      <div className="container mx-auto flex justify-between items-center px-4 md:px-6">
        <Link to="/" className="z-10">
          <Logo color={isScrolled || isMobileMenuOpen ? 'dark' : 'white'} />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-8 items-center">
          {navLinks.map((link, index) => (
            <React.Fragment key={link.name}>
              {link.name === 'Book Now' ? (
                <Button
                  asChild
                  className="bg-tahoe hover:bg-tahoe-deep transition-all duration-300"
                >
                  <Link to={link.path} className="font-medium">
                    {link.name}
                  </Link>
                </Button>
              ) : (
                <Link
                  to={link.path}
                  className={cn(
                    'relative py-2 transition-colors duration-300',
                    location.pathname === link.path ? activeNavClass : inactiveNavClass
                  )}
                >
                  {link.name}
                  {location.pathname === link.path && (
                    <motion.div 
                      layoutId="nav-underline"
                      className="absolute -bottom-1 left-0 w-full h-0.5 bg-tahoe"
                      transition={{ duration: 0.3 }}
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
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 top-0 glass-dark md:hidden z-0 flex flex-col justify-center"
            >
              <div className="flex flex-col items-center space-y-6 p-6 mt-16">
                {navLinks.map((link) => (
                  <Link
                    key={link.name}
                    to={link.path}
                    className={cn(
                      'text-white text-xl font-light py-2 px-4 flex items-center gap-2',
                      location.pathname === link.path && 'text-tahoe-medium font-normal'
                    )}
                  >
                    {link.icon}
                    {link.name}
                  </Link>
                ))}
                <Button
                  asChild
                  size="lg"
                  className="mt-6 w-full max-w-xs bg-tahoe hover:bg-tahoe-deep"
                >
                  <Link to="/booking">Book Now</Link>
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
};

export default NavBar;
