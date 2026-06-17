
import React, { useRef, useState, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import { cn } from '@/lib/utils';
import { fadeIn, slideIn, scaleIn } from '@/lib/animations';

interface ScrollRevealProps {
  children: React.ReactNode;
  className?: string;
  threshold?: number;
  delay?: number;
  animation?: 'fade-in' | 'fade-in-right' | 'fade-in-left' | 'slide-up' | 'scale-in';
  skeleton?: React.ReactNode;
  priority?: boolean; // For high priority content
}

const ScrollReveal: React.FC<ScrollRevealProps> = ({
  children,
  className,
  threshold = 0.1,
  delay = 0,
  animation = 'fade-in',
  skeleton,
  priority = false,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: threshold });
  const [isContentLoaded, setIsContentLoaded] = useState<boolean>(priority);

  useEffect(() => {
    if (!priority) {
      // Reduced timeout to 0ms for immediate loading
      setIsContentLoaded(true);
    }
  }, [priority]);

  const getVariants = () => {
    // Minimize animation delay to ensure quick loading
    const minDelay = delay * 0.05; // Reduce delay to 5% of original
    
    switch (animation) {
      case 'fade-in-right':
        return fadeIn('right', minDelay);
      case 'fade-in-left':
        return fadeIn('left', minDelay);
      case 'slide-up':
        return slideIn('up', minDelay);
      case 'scale-in':
        return scaleIn(minDelay);
      default:
        return fadeIn('up', minDelay);
    }
  };

  return (
    <motion.div
      ref={ref}
      initial={priority ? "visible" : "hidden"}
      animate={isInView ? "visible" : "hidden"}
      variants={getVariants()}
      className={cn("relative", className)}
      style={{ willChange: 'opacity, transform' }}
    >
      {isContentLoaded ? children : skeleton || children}
    </motion.div>
  );
};

export default ScrollReveal;
