
import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { cn } from '@/lib/utils';

interface ParallaxSectionProps {
  children: React.ReactNode;
  className?: string;
  speed?: number;
  direction?: 'up' | 'down';
  priority?: boolean;
  skeleton?: React.ReactNode;
}

const ParallaxSection: React.FC<ParallaxSectionProps> = ({
  children,
  className,
  speed = 0.1,
  direction = 'up',
  priority = false,
  skeleton,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });
  const [isContentLoaded, setIsContentLoaded] = useState<boolean>(priority);

  // Load content immediately
  useEffect(() => {
    if (!priority) {
      // Reduced timeout to 0ms for immediate loading
      setIsContentLoaded(true);
    }
  }, [priority]);

  const factor = direction === 'up' ? -1 : 1;
  const y = useTransform(scrollYProgress, [0, 1], [0, 200 * speed * factor]);

  return (
    <div 
      ref={ref} 
      className={cn('overflow-hidden relative', className)}
    >
      <motion.div
        style={{ y }}
      >
        {isContentLoaded ? children : skeleton || children}
      </motion.div>
    </div>
  );
};

export default ParallaxSection;
