
import { useState, useEffect, useCallback } from "react";

const MOBILE_BREAKPOINT = 768;

export default function useMobile() {
  const [isMobile, setIsMobile] = useState<boolean | undefined>(undefined);

  const handleResize = useCallback(() => {
    setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
  }, []);

  useEffect(() => {
    // Set initial value
    handleResize();
    
    // Use matchMedia for better performance
    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`);
    
    // Modern browsers
    if (mql.addEventListener) {
      mql.addEventListener("change", handleResize);
      return () => mql.removeEventListener("change", handleResize);
    } 
    // Older browsers
    else if (mql.addListener) {
      mql.addListener(handleResize);
      return () => mql.removeListener(handleResize);
    }
    
    // Fallback
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [handleResize]);

  return !!isMobile;
}
