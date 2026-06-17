
import React, { useState, useCallback } from 'react';
import ScrollReveal from '../ui/ScrollReveal';
import { ChevronLeft, ChevronRight, X, Download } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../theme/ThemeProvider';
import HorizontalScroll from '../ui/horizontal-scroll';
import useMobile from '@/hooks/use-mobile';
import LazyImage from '../ui/lazy-image';

type ImageType = {
  id: number;
  url: string;
  alt: string;
  location: string;
};

const Gallery: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<ImageType | null>(null);
  const { theme } = useTheme();
  const isMobile = useMobile();

  const images: ImageType[] = [
    {
      id: 1,
      url: "https://previews.123rf.com/images/realityimages/realityimages1801/realityimages180100012/92968704-carvings-on-wall-veeranarayana-temple-chennakeshava-temple-complex-belur-karnataka-india.jpg",
      alt: "Ancient Indian temple with intricate carvings",
      location: "Karnataka",
    },
    {
      id: 2,
      url: "https://plus.unsplash.com/premium_photo-1664304095595-e428558e8161?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8aG9saXxlbnwwfHwwfHx8MQ%3D%3D",
      alt: "Colorful Holi festival celebration",
      location: "Uttar Pradesh",
    },
    {
      id: 3,
      url: "https://serenademagazine.com/content/images/size/w1200/wp-content/uploads/2023/07/dvhb-9-w4aagpxc.webp",
      alt: "Traditional Kathakali dancer with elaborate makeup",
      location: "Kerala",
    },
    {
      id: 4,
      url: "https://www.agoda.com/wp-content/uploads/2024/03/Taj-Mahal-at-sunset-Agra-India.jpg",
      alt: "Majestic Taj Mahal at sunrise",
      location: "Agra",
    },
    {
      id: 5,
      url: "https://www.shaadidukaan.com/vogue/wp-content/uploads/2019/07/rajasthani-wedding.jpg",
      alt: "Traditional Indian wedding ceremony",
      location: "Rajasthan",
    },
    {
      id: 6,
      url: "https://www.skywaytour.com/media/gallery/2023-09-26-09-33-42-keralabackwaters.jpg",
      alt: "Boat riding through Kerala's backwaters",
      location: "Kerala",
    },
  ];

  const openLightbox = useCallback((image: ImageType) => {
    setSelectedImage(image);
    document.body.style.overflow = 'hidden';
  }, []);

  const closeLightbox = useCallback(() => {
    setSelectedImage(null);
    document.body.style.overflow = 'auto';
  }, []);

  const navigateImage = useCallback((direction: 'next' | 'prev') => {
    if (!selectedImage) return;
    
    const currentIndex = images.findIndex(img => img.id === selectedImage.id);
    let newIndex;
    
    if (direction === 'next') {
      newIndex = (currentIndex + 1) % images.length;
    } else {
      newIndex = (currentIndex - 1 + images.length) % images.length;
    }
    
    setSelectedImage(images[newIndex]);
  }, [selectedImage, images]);

  const downloadImage = useCallback((url: string, filename: string) => {
    const link = document.createElement('a');
    link.href = url;
    link.download = `mystic-india-${filename.toLowerCase().replace(/\s+/g, '-')}.jpg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }, []);

  return (
    <section id="gallery" className="py-24 px-6 section-gallery relative overflow-hidden">
      <div className="absolute inset-12 rounded-3xl bg-white/40 dark:bg-white/10 backdrop-blur-sm border border-white/50 dark:border-white/30 z-0"></div>
      {/* Abstract backgrounds */}
      {theme === 'light' && (
        <>
          <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-spice-100 filter blur-3xl opacity-30 z-0"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 rounded-full bg-indigo-100 filter blur-3xl opacity-30 z-0"></div>
        </>
      )}
      
      {theme === 'dark' && (
        <>
          <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-purple-900/30 filter blur-3xl opacity-30 z-0"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 rounded-full bg-blue-900/30 filter blur-3xl opacity-30 z-0"></div>
        </>
      )}
      
      <div className="container mx-auto relative z-10">
        {/* Section Header - Using immediate animation with no delay */}
        <ScrollReveal delay={0} priority={true}>
          <div className="text-center mb-16">
            <p className="subtitle mb-3">Visual Stories</p>
            <h2 className="section-title after:left-1/2 after:-translate-x-1/2">Capturing India's Essence</h2>
          </div>
        </ScrollReveal>

        {/* Gallery Grid */}
        {isMobile ? (
          <HorizontalScroll>
            {images.map((image) => (
              <div key={image.id} className="min-w-[90%] snap-start mobile-snap-x-item">
                <ImageCard 
                  image={image} 
                  theme={theme} 
                  openLightbox={openLightbox} 
                />
              </div>
            ))}
          </HorizontalScroll>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
            {images.map((image, index) => (
              <ScrollReveal key={image.id} delay={0} priority={true} className="h-full">
                <ImageCard 
                  image={image} 
                  theme={theme} 
                  openLightbox={openLightbox} 
                />
              </ScrollReveal>
            ))}
          </div>
        )}

        {/* Lightbox */}
        <AnimatePresence>
          {selectedImage && (
            <motion.div 
              className="fixed inset-0 bg-black/90 dark:bg-black/80 z-50 flex items-center justify-center p-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeLightbox}
            >
              <button 
                className="absolute top-5 right-5 text-white hover:text-pink-500 transition-colors"
                onClick={closeLightbox}
              >
                <X size={32} />
              </button>
              
              <button 
                className="absolute left-5 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors text-white"
                onClick={() => navigateImage('prev')}
              >
                <ChevronLeft size={24} />
              </button>
              
              <motion.div 
                className="max-w-4xl max-h-full"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: "spring", damping: 25 }}
                onClick={(e) => e.stopPropagation()}
              >
                <img 
                  src={selectedImage.url} 
                  alt={selectedImage.alt} 
                  className="max-w-full max-h-[80vh] object-contain"
                />
                <div className="mt-4 text-white flex justify-between items-center">
                  <div className="text-left">
                    <h3 className="text-xl font-medium">{selectedImage.alt}</h3>
                    <p className="text-white/70 mt-1">{selectedImage.location}</p>
                  </div>
                  <motion.button 
                    className={`px-4 py-2 rounded-md flex items-center transition-colors ${theme === 'dark' ? 'bg-purple-700 hover:bg-purple-800' : 'bg-spice-500 hover:bg-spice-600'}`}
                    onClick={() => downloadImage(selectedImage.url, selectedImage.alt)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Download size={16} className="mr-2" />
                    Download
                  </motion.button>
                </div>
              </motion.div>
              
              <button 
                className="absolute right-5 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors text-white"
                onClick={() => navigateImage('next')}
              >
                <ChevronRight size={24} />
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

const ImageCard = React.memo(({ 
  image, 
  theme, 
  openLightbox 
}: { 
  image: ImageType; 
  theme: string;
  openLightbox: (image: ImageType) => void;
}) => {
  return (
    <motion.div 
      className={`image-card h-full ${theme === 'dark' ? 'bg-black/10 shadow-lg dark:shadow-black/50 border border-white/5' : 'bg-white shadow-md border border-mystic-100'} rounded-lg overflow-hidden cursor-pointer hardware-accelerated`}
      onClick={() => openLightbox(image)}
      whileHover={{ y: -5, scale: 1.02, transition: { duration: 0.2 } }}
    >
      <div className="relative h-64 overflow-hidden">
        <LazyImage 
          src={image.url} 
          alt={image.alt}
          priority={true}
          immediate={true}
          className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 hover:opacity-100 transition-opacity flex items-end p-4">
          <span className="text-white font-medium">{image.location}</span>
        </div>
      </div>
      <div className="p-4">
        <span className="text-xs uppercase tracking-wider font-medium text-foreground dark:text-gray-300">
          {image.location}
        </span>
        <h3 className="text-lg font-medium mt-1">{image.alt}</h3>
      </div>
    </motion.div>
  );
});

ImageCard.displayName = 'ImageCard';

export default Gallery;
