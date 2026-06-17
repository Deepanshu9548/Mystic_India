
import React, { useState } from 'react';
import useImageLazyLoad from '../hooks/useImageLazyLoad';
import { RefreshCcw } from 'lucide-react';
import { cn } from '@/lib/utils';

interface StateCardProps {
  state: {
    name: string;
    image: string;
  };
}

const StateCard: React.FC<StateCardProps> = ({ state }) => {
  const [retryCount, setRetryCount] = useState(0);
  const { imageSrc, imageRef, isLoaded, onLoad, onError } = useImageLazyLoad(
    state.image,
    '/images/placeholder.jpg',
    {
      immediate: true,
      priority: true,
      threshold: 0.01,
      rootMargin: '500px'
    }
  );

  const handleRetryLoad = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setRetryCount(prev => prev + 1);
    // Force reload image by adding timestamp query param
    const newSrc = state.image.includes('?') 
      ? `${state.image}&retry=${Date.now()}` 
      : `${state.image}?retry=${Date.now()}`;
    
    if (imageRef && imageRef.current) {
      imageRef.current.src = newSrc;
    }
  };

  return (
    <div className="state-card">
      <div className="state-image-container relative">
        {!isLoaded ? (
          <div className="image-placeholder flex items-center justify-center bg-gray-100 dark:bg-gray-800 rounded-lg h-48">
            <div className="h-6 w-6 border-2 border-spice-500 border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : (
          <div className="relative group">
            <img 
              ref={imageRef}
              src={`${imageSrc}${retryCount > 0 ? `?retry=${retryCount}` : ''}`}
              alt={state.name} 
              className="state-image w-full h-full object-cover rounded-lg"
              loading="eager"
              onLoad={onLoad}
              onError={onError}
            />
            
            {/* Retry button - similar to cuisine/culture pages */}
            <button 
              onClick={handleRetryLoad}
              className={cn(
                "absolute top-2 right-2 p-2 rounded-full bg-black/30 backdrop-blur-sm hover:bg-black/50 transition-all",
                "opacity-0 group-hover:opacity-100 focus:opacity-100"
              )}
              aria-label="Reload image"
            >
              <RefreshCcw className="h-4 w-4 text-white" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default StateCard; 
