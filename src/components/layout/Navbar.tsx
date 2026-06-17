
import React, { useState, useEffect, useCallback } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { Menu, X, User } from 'lucide-react';
import { Logo } from '../ui/Logo';
import { ThemeToggle } from '../theme/ThemeToggle';
import useMobile from '@/hooks/use-mobile';
import { useAuth } from '@/context/AuthContext';
import { useScrollToTop } from '@/hooks/useScrollToTop';
import { motion, AnimatePresence } from 'framer-motion';

type BaseNavItem = {
  name: string;
  path: string;
};

type NavItemWithIcon = BaseNavItem & {
  icon: React.FC<{ className?: string }>;
};

type NavItem = BaseNavItem | NavItemWithIcon;

const hasIcon = (item: NavItem): item is NavItemWithIcon => {
  return 'icon' in item;
};

const Navbar: React.FC = () => {
  const location = useLocation();
  const isMobile = useMobile();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const isHome = location.pathname === '/';
  const { isAuthenticated } = useAuth();
  const scrollToTop = useScrollToTop();

  const handleScroll = useCallback(() => {
    setIsScrolled(window.scrollY > 20);
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  const toggleMobileMenu = useCallback(() => {
    setMobileMenuOpen(!mobileMenuOpen);
  }, [mobileMenuOpen]);

  const getNavItems = (): NavItem[] => {
    const baseItems: NavItem[] = [
      { name: 'States', path: '/states' },
      { name: 'Cuisine', path: '/cuisine' },
      { name: 'Culture', path: '/culture' },
    ];
    
    if (isAuthenticated) {
      return [...baseItems, { name: 'Profile', path: '/profile', icon: User }];
    } else {
      return [...baseItems, { name: 'Login', path: '/login' }];
    }
  };

  const navItems = getNavItems();

  const handleNavigation = useCallback(() => {
    setMobileMenuOpen(false);
    scrollToTop();
  }, [scrollToTop]);

  return (
    <header
      className={`fixed top-4 left-0 right-0 flex justify-center items-center z-40 transition-all duration-700 ease-out rounded-full shadow-lg backdrop-blur-md border border-white/30 dark:border-white/30 hardware-accelerated ${
        isScrolled || !isHome
          ? 'py-2.5 bg-white/60 dark:bg-black/60 md:w-[50%] mx-auto'
          : 'py-4 bg-transparent md:w-[90%] mx-auto'
      }`}
    >
      <nav className="container mx-auto px-6 flex justify-between items-center">
        <Link to="/" className="z-10" onClick={handleNavigation}>
          <Logo className="h-10 w-auto" />
        </Link>

        {!isMobile && (
          <div className="flex items-center space-x-1">
            {navItems.map((item) => (
              <div key={item.name}>
                <Link
                  to={item.path}
                  onClick={handleNavigation}
                  className={`nav-item transition-colors duration-500 ease-in-out ${
                    location.pathname === item.path ? 'text-spice-500 font-semibold' : 'hover:text-spice-400'
                  } ${hasIcon(item) ? 'flex items-center' : ''}`}
                >
                  {hasIcon(item) && <item.icon className="mr-1 h-4 w-4" />}
                  {item.name}
                </Link>
              </div>
            ))}

            <div className="ml-4">
              <ThemeToggle />
            </div>
          </div>
        )}

        {isMobile && (
          <div className="flex items-center">
            <ThemeToggle />
            <button
              className="ml-2 p-2 text-foreground"
              onClick={toggleMobileMenu}
              aria-label="Toggle mobile menu"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        )}
      </nav>

      <AnimatePresence>
        {isMobile && mobileMenuOpen && (
          <motion.div 
            className="fixed inset-0 top-16 z-50 bg-background/95 backdrop-blur-md"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
          >
            <div className="container mx-auto px-6 py-8 flex flex-col items-center">
              {navItems.map((item) => (
                <motion.div 
                  key={item.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                >
                  <Link
                    to={item.path}
                    onClick={handleNavigation}
                    className={`py-3 text-lg font-medium hover:text-spice-500 transition-colors flex items-center ${
                      location.pathname === item.path ? 'text-spice-500' : 'text-foreground'
                    }`}
                  >
                    {hasIcon(item) && <item.icon className="mr-2 h-5 w-5" />}
                    {item.name}
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
