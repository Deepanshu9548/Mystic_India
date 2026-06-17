
import React, { createContext, useContext, useEffect, useState } from 'react';

type Theme = 'light' | 'dark';

type ThemeContextType = {
  theme: Theme;
  setTheme: (theme: Theme) => void;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>(() => {
    // Check for saved theme preference or system preference
    if (typeof window !== 'undefined') {
      const savedTheme = localStorage.getItem('theme') as Theme;
      if (savedTheme) return savedTheme;
      
      // Check system preference
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }
    
    return 'light'; // Default theme
  });

  useEffect(() => {
    // Update localStorage and document class when theme changes
    if (typeof window !== 'undefined') {
      localStorage.setItem('theme', theme);
      const root = window.document.documentElement;
      
      root.classList.remove('light', 'dark');
      root.classList.add(theme);
      
      // Apply theme-specific styles
      if (theme === 'dark') {
        // Apply dark theme styles
        document.body.style.background = 'linear-gradient(to right, #2c003e, #1b0033, #000428)';
        document.body.style.background = '';
        document.body.style.backgroundImage = "url('https://r4.wallpaperflare.com/wallpaper/684/422/438/abstract-3d-digital-art-stu-ballinger-wallpaper-2b965cfd43817fe9f584cbf97d1cfc40.jpg')";
        document.body.style.backgroundSize = 'cover';
        document.body.style.backgroundAttachment = 'fixed';
        document.body.style.backgroundPosition = 'center';
        document.body.style.backgroundRepeat = 'no-repeat';
        document.body.style.backgroundBlendMode = 'soft-light';
        
        // Initialize all videos with proper settings for dark mode
        initializeVideos();
      } else {
        // Reset to light theme styles
        document.body.style.background = 'linear-gradient(to right, #00c853, #00bcd4, #ff9800)';
        document.body.style.background = '';
        document.body.style.backgroundImage = "url('https://r4.wallpaperflare.com/wallpaper/952/786/491/nature-landscape-forest-river-wallpaper-36399499392b36fdd6e46796616d6c0d.jpg')";
        document.body.style.backgroundSize = 'cover';
        document.body.style.backgroundAttachment = 'fixed';
        document.body.style.backgroundPosition = 'center';
        document.body.style.backgroundRepeat = 'no-repeat';
        document.body.style.backgroundBlendMode = '';
        
        // Still initialize videos for light mode
        initializeVideos();
      }
    }
  }, [theme]);

  // Helper function to initialize videos with proper settings
  const initializeVideos = () => {
    setTimeout(() => {
      const videos = document.querySelectorAll('video');
      videos.forEach(video => {
        // Set video properties
        video.autoplay = true;
        video.muted = true;
        video.loop = true;
        video.playsInline = true;
        
        // Force video to play with high quality
        if (video.dataset.src) {
          video.src = video.dataset.src;
        }
        
        // Play video and handle errors
        video.play().catch(e => {
          console.warn("Auto-play was prevented. Will try after user interaction.", e);
          
          // Setup event listeners to play after user interaction
          const playVideoOnInteraction = () => {
            video.play().catch(err => console.error("Video play failed:", err));
            
            // Remove event listeners after first interaction
            document.removeEventListener('click', playVideoOnInteraction);
            document.removeEventListener('touchstart', playVideoOnInteraction);
            document.removeEventListener('scroll', playVideoOnInteraction);
          };
          
          document.addEventListener('click', playVideoOnInteraction, { once: true });
          document.addEventListener('touchstart', playVideoOnInteraction, { once: true });
          document.addEventListener('scroll', playVideoOnInteraction, { once: true });
        });
        
        // Set video overlay based on theme
        const parent = video.parentElement;
        const overlay = parent?.querySelector('.video-overlay') as HTMLElement | null;
        if (overlay) {
          overlay.style.backgroundColor = theme === 'dark' 
            ? 'rgba(10, 9, 32, 0.5)' 
            : 'rgba(0, 0, 0, 0.3)';
        }
      });
    }, 100);
  };

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
