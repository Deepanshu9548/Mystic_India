
import React, { useEffect, useRef, useState } from 'react';
import { Loader2 } from 'lucide-react';

interface VirtualizedListProps<T> {
  items: T[];
  renderItem: (item: T, index: number) => React.ReactNode;
  itemHeight: number;
  overscan?: number;
  className?: string;
  loadingMessage?: string;
}

function VirtualizedList<T>({
  items,
  renderItem,
  itemHeight,
  overscan = 5,
  className = "",
  loadingMessage = "Loading items..."
}: VirtualizedListProps<T>) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [visibleRange, setVisibleRange] = useState({ start: 0, end: 20 });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 100);
    
    return () => clearTimeout(timer);
  }, [items]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleScroll = () => {
      const { scrollTop, clientHeight } = container;
      const start = Math.max(0, Math.floor(scrollTop / itemHeight) - overscan);
      const end = Math.min(
        items.length,
        Math.ceil((scrollTop + clientHeight) / itemHeight) + overscan
      );
      
      setVisibleRange({ start, end });
    };

    // Initialize visible range
    handleScroll();

    container.addEventListener('scroll', handleScroll);
    return () => container.removeEventListener('scroll', handleScroll);
  }, [items, itemHeight, overscan]);

  // Render only visible items for better performance
  const visibleItems = items.slice(visibleRange.start, visibleRange.end);
  
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="h-8 w-8 animate-spin text-spice-500" />
        <span className="ml-2">{loadingMessage}</span>
      </div>
    );
  }

  return (
    <div 
      ref={containerRef}
      className={`overflow-auto ${className}`}
      style={{ 
        height: '100%',
        position: 'relative',
        willChange: 'transform'
      }}
    >
      <div style={{ height: items.length * itemHeight, position: 'relative' }}>
        {visibleItems.map((item, idx) => {
          const actualIndex = visibleRange.start + idx;
          return (
            <div
              key={actualIndex}
              style={{
                position: 'absolute',
                top: (visibleRange.start + idx) * itemHeight,
                height: itemHeight,
                width: '100%'
              }}
            >
              {renderItem(item, actualIndex)}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default VirtualizedList;
