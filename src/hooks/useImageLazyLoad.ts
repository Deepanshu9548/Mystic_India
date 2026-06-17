
import { useState, useEffect, useCallback, useRef } from 'react';
import { useLocation } from 'react-router-dom';

interface UseImageLazyLoadOptions {
  threshold?: number;
  rootMargin?: string;
  immediate?: boolean;
  priority?: boolean;
}

const useImageLazyLoad = (
  src: string, 
  placeholderSrc: string = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1 1'%3E%3C/svg%3E",
  options: UseImageLazyLoadOptions = {}
) => {
  const [imageSrc, setImageSrc] = useState(options.priority || options.immediate ? src : placeholderSrc);
  const imageRef = useRef<HTMLImageElement>(null);
  const [isLoaded, setIsLoaded] = useState(options.priority || false);
  const [hasError, setHasError] = useState(false);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const isMounted = useRef(true);
  const location = useLocation();
  
  // Check if we're on the home page or state pages
  const isHomePage = location.pathname === '/';
  const isStatePage = location.pathname.includes('/state/');

  // If on home page, state page or immediate option is true, skip lazy loading
  const skipLazyLoad = isHomePage || isStatePage || options.immediate === true || options.priority === true;

  // Optimize threshold and rootMargin based on page type
  const { 
    threshold = isStatePage ? 0.01 : 0.1, 
    rootMargin = isStatePage ? '500px' : '200px' 
  } = options;

  const onLoad = useCallback((e?: React.SyntheticEvent<HTMLImageElement>) => {
    if (isMounted.current) {
      setIsLoaded(true);
    }
  }, []);

  const onError = useCallback((e?: React.SyntheticEvent<HTMLImageElement>) => {
    if (isMounted.current) {
      setIsLoaded(false);
      setHasError(true);
      setImageSrc(placeholderSrc);
      console.error("Failed to load image:", src);
    }
  }, [placeholderSrc, src]);

  // Immediately load priority images or on home/state pages
  useEffect(() => {
    if (skipLazyLoad && !isLoaded && !hasError) {
      const img = new Image();
      img.src = src;
      img.onload = () => {
        if (isMounted.current) {
          setImageSrc(src);
          setIsLoaded(true);
        }
      };
      img.onerror = () => {
        if (isMounted.current) {
          onError();
        }
      };
    }
  }, [skipLazyLoad, src, isLoaded, hasError, onError]);

  // Handle fallback for failed images
  useEffect(() => {
    if (hasError) {
      // Try with a different strategy if the image fails to load
      let fallbackSrc = src;
      
      if (src.includes('unsplash')) {
        // If an Unsplash image fails, try a different source
        fallbackSrc = src.replace(
          /unsplash\.com\/.*/, 
          `picsum.photos/${Math.floor(800 + Math.random() * 400)}/${Math.floor(600 + Math.random() * 200)}`
        );
      } else if (src.includes('images.') || src.includes('previews.') || src.includes('shutterstock')) {
        // General fallback for any image URL
        fallbackSrc = `https://picsum.photos/800/600?random=${Math.floor(Math.random() * 1000)}`;
      }
      
      if (fallbackSrc !== src) {
        // Create an image element to preload the fallback
        const img = new Image();
        img.src = fallbackSrc;
        img.onload = () => {
          if (isMounted.current) {
            setImageSrc(fallbackSrc);
            setHasError(false);
          }
        };
      }
    }
  }, [hasError, src]);

  useEffect(() => {
    let didCancel = false;

    // Skip intersection observer for home page content and priority images
    if (skipLazyLoad) {
      setImageSrc(src);
      return;
    }

    if (imageRef.current && !isLoaded) {
      // Cleanup previous observer
      if (observerRef.current) {
        observerRef.current.disconnect();
      }

      if ('IntersectionObserver' in window) {
        observerRef.current = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              // When image is visible in the viewport
              if (
                !didCancel &&
                (entry.intersectionRatio > 0 || entry.isIntersecting)
              ) {
                // Create new image to preload
                const img = new Image();
                img.src = src;
                img.onload = () => {
                  if (!didCancel) {
                    setImageSrc(src);
                  }
                };
                
                // Fix for type mismatch - use proper event type
                img.onerror = () => {
                  if (!didCancel) {
                    onError();
                  }
                };
                
                // Stop watching once the entry is detected
                if (observerRef.current && imageRef.current) {
                  observerRef.current.unobserve(imageRef.current);
                }
              }
            });
          },
          {
            threshold,
            rootMargin, // Increased to start loading earlier
          }
        );
        observerRef.current.observe(imageRef.current);
      } else {
        // Fallback for browsers that don't support IntersectionObserver
        setImageSrc(src);
      }
    }

    return () => {
      didCancel = true;
      if (observerRef.current && imageRef.current) {
        observerRef.current.unobserve(imageRef.current);
        observerRef.current.disconnect();
      }
    };
  }, [src, isLoaded, threshold, rootMargin, onError, skipLazyLoad]);

  useEffect(() => {
    return () => {
      isMounted.current = false;
    };
  }, []);

  return { imageSrc, imageRef, isLoaded, onLoad, onError };
};

export default useImageLazyLoad;
