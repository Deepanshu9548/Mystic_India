
import { useCallback, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * Hook to scroll to the top of the page either on navigation change or when called manually
 * @param scrollOnMount Whether to scroll to top when the component mounts
 * @returns A function that can be called to scroll to the top
 */
export const useScrollToTop = (scrollOnMount = false) => {
  const { pathname } = useLocation();
  
  // Scroll to top on pathname change if component is already mounted
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }, [pathname]);
  
  // Scroll to top on mount if requested
  useEffect(() => {
    if (scrollOnMount) {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    }
  }, [scrollOnMount]);
  
  // Return function to manually scroll to top
  return useCallback(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }, []);
}; 
