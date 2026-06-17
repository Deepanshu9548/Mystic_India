
import React, { useEffect } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Hero from '@/components/sections/Hero';
import About from '@/components/sections/About';
import Gallery from '@/components/sections/Gallery';
import Experience from '@/components/sections/Experience';
import Contact from '@/components/sections/Contact';
import States from '@/components/sections/States';
import Cuisine from '@/components/sections/Cuisine';
import Reviews from '@/components/sections/Reviews';
import { useTheme } from '@/components/theme/ThemeProvider';
import useMobile from '@/hooks/use-mobile';
import { HomeStarsCanvas } from '@/components/ui/StarBackground';
import { useScrollToTop } from '@/hooks/useScrollToTop';

const Index: React.FC = () => {
  const { theme } = useTheme();
  const isMobile = useMobile();
  
  // Use the scrollToTop hook with scrollOnMount set to true
  useScrollToTop(true);
  
  useEffect(() => {
    // Priority loading for homepage - set highest priority for FCP
    document.documentElement.setAttribute('data-priority', 'high');
    
    // Smooth scroll to hash on page load
    if (window.location.hash) {
      const element = document.querySelector(window.location.hash);
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    }
    
    // Disable overscroll on mobile
    if (isMobile) {
      document.body.classList.add('overflow-hidden');
      return () => {
        document.body.classList.remove('overflow-hidden');
        document.documentElement.removeAttribute('data-priority');
      };
    }
    
    return () => {
      document.documentElement.removeAttribute('data-priority');
    };
  }, [isMobile]);

  return (
    <div className={`min-h-screen relative ${isMobile ? 'mobile-view' : ''}`}>
      {/* Star Background */}
      <HomeStarsCanvas />
      
      {/* Abstract backgrounds for light mode only */}
      {theme === 'light' && (
        <>
          <div className="fixed top-0 right-0 w-96 h-96 bg-indigo-100 rounded-full filter blur-3xl opacity-20 -translate-y-1/2 translate-x-1/2 z-[-1]"></div>
          <div className="fixed bottom-0 left-0 w-96 h-96 bg-purple-200 rounded-full filter blur-3xl opacity-20 translate-y-1/2 -translate-x-1/2 z-[-1]"></div>
          <div className="fixed inset-0 z-[-1] opacity-10 pointer-events-none" style={{backgroundImage: 'url("https://images.unsplash.com/photo-1552083974-186346191183?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fGFic3RyYWN0fGVufDB8fDB8fHww")'}}></div>
        </>
      )}
      
      {/* Dark mode accent elements */}
      {theme === 'dark' && (
        <>
          <div className="fixed top-1/4 right-1/4 w-96 h-96 bg-purple-900 rounded-full filter blur-3xl opacity-10 z-[-1]"></div>
          <div className="fixed bottom-1/4 left-1/4 w-96 h-96 bg-indigo-900 rounded-full filter blur-3xl opacity-10 z-[-1]"></div>
        </>
      )}
      
      <Navbar />
      <main className={isMobile ? "mobile-snap-container hardware-accelerated" : ""}>
        <div className={isMobile ? "mobile-snap-item" : ""}>
          <Hero />
        </div>
        
        {/* Add translucent background layer to content sections */}
        <div className="relative">
          <div className="absolute inset-0 bg-white/70 dark:bg-black/50 backdrop-blur-sm"></div>
          <div className="relative z-10">
            <div className={isMobile ? "mobile-snap-item" : ""}>
              <About />
            </div>
            <div className={isMobile ? "mobile-snap-item" : ""}>
              <States />
            </div>
            <div className={isMobile ? "mobile-snap-item" : ""}>
              <Gallery />
            </div>
            <div className={isMobile ? "mobile-snap-item" : ""}>
              <Cuisine />
            </div>
            <div className={isMobile ? "mobile-snap-item" : ""}>
              <Experience />
            </div>
            <div className={isMobile ? "mobile-snap-item" : ""}>
              <Reviews />
            </div>
            <div className={isMobile ? "mobile-snap-item" : ""}>
              <Contact />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Index;
