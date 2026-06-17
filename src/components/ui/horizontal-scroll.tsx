
import React, { useState, useRef, useCallback, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import useMobile from '@/hooks/use-mobile';
import { cn } from '@/lib/utils';

interface HorizontalScrollProps {
  children: React.ReactNode;
  className?: string;
  itemClassName?: string;
  showControls?: boolean;
}

const HorizontalScroll: React.FC<HorizontalScrollProps> = ({
  children,
  className,
  showControls = true,
}) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const isMobile = useMobile();
  const scrollCheckTimerRef = useRef<number | null>(null);

  // Debounced scroll check to prevent too many state updates
  const checkScrollButtons = useCallback(() => {
    if (scrollCheckTimerRef.current) {
      window.clearTimeout(scrollCheckTimerRef.current);
    }
    
    scrollCheckTimerRef.current = window.setTimeout(() => {
      if (!scrollRef.current) return;
      
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      const newCanScrollLeft = scrollLeft > 5;
      const newCanScrollRight = scrollLeft < scrollWidth - clientWidth - 5;
      
      setCanScrollLeft(newCanScrollLeft);
      setCanScrollRight(newCanScrollRight);
      
      scrollCheckTimerRef.current = null;
    }, 100);
  }, []);

  const scroll = useCallback((direction: 'left' | 'right') => {
    if (!scrollRef.current) return;
    
    const scrollAmount = scrollRef.current.clientWidth * 0.8;
    scrollRef.current.scrollTo({
      left: scrollRef.current.scrollLeft + (direction === 'left' ? -scrollAmount : scrollAmount),
      behavior: 'smooth',
    });
  }, []);

  useEffect(() => {
    // Initialize scroll state
    if (scrollRef.current) {
      checkScrollButtons();
    }
    
    // Cleanup
    return () => {
      if (scrollCheckTimerRef.current) {
        window.clearTimeout(scrollCheckTimerRef.current);
      }
    };
  }, [checkScrollButtons]);
  
  // Apply hardware acceleration to the scrolling container
  const containerClass = "hardware-accelerated will-change-scroll scrollbar-hide";

  return (
    <div className={cn("relative group", className)}>
      {showControls && !isMobile && canScrollLeft && (
        <Button
          variant="outline"
          size="icon"
          className="absolute left-0 top-1/2 -translate-y-1/2 z-10 opacity-80 hover:opacity-100 bg-background/80 backdrop-blur-sm hardware-accelerated"
          onClick={() => scroll('left')}
        >
          <ChevronLeft className="h-4 w-4" />
          <span className="sr-only">Scroll left</span>
        </Button>
      )}
      
      <div 
        ref={scrollRef}
        className={cn(
          "overflow-x-auto pb-4 snap-x snap-mandatory",
          containerClass
        )}
        onScroll={checkScrollButtons}
      >
        <div className="flex space-x-4 px-4">
          {children}
        </div>
      </div>
      
      {showControls && !isMobile && canScrollRight && (
        <Button
          variant="outline"
          size="icon"
          className="absolute right-0 top-1/2 -translate-y-1/2 z-10 opacity-80 hover:opacity-100 bg-background/80 backdrop-blur-sm hardware-accelerated"
          onClick={() => scroll('right')}
        >
          <ChevronRight className="h-4 w-4" />
          <span className="sr-only">Scroll right</span>
        </Button>
      )}
    </div>
  );
};

export default React.memo(HorizontalScroll);
