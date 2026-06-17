
import React, { useState, useEffect } from 'react';
import { MapPin, Users, Compass, Clock } from 'lucide-react';
import ScrollReveal from '../ui/ScrollReveal';
import SectionHeader from '../ui/SectionHeader';
import { motion, AnimatePresence } from 'framer-motion';
import useMobile from '@/hooks/use-mobile';

// Cultural images from the Culture page
const culturalImages = [
  "https://images.unsplash.com/photo-1621787084849-ed98731b3071?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGluZGlhbiUyMGN1bHR1cmV8ZW58MHx8MHx8fDA%3D",
  "https://plus.unsplash.com/premium_photo-1691030925304-ef49180577d2?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjV8fGluZGlhbiUyMGN1bHR1cmV8ZW58MHx8MHx8fDA%3D",
  "https://images.unsplash.com/photo-1616884950055-861aeb5eb380?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NTJ8fGluZGlhbiUyMGN1bHR1cmV8ZW58MHx8MHx8fDA%3D",
  "https://images.unsplash.com/photo-1655275719356-579e6b58e13f?q=80&w=3132&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1566959621395-9200c65ba74b?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8aW5kaWFuJTIwaGVyaXRhZ2V8ZW58MHx8MHx8fDA%3D",
  "https://plus.unsplash.com/premium_photo-1697730411164-ed2cb32a7e87?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NTd8fGluZGlhbiUyMGhpc3Rvcnl8ZW58MHx8MHx8fDA%3D"
];

const FeatureItem: React.FC<{
  icon: React.ReactNode;
  title: string;
  description: string;
  delay?: number;
}> = ({ icon, title, description, delay = 5 }) => (
  <ScrollReveal animation="fade-in-left" delay={delay}>
    <motion.div 
      className="flex items-start"
      whileHover={{ x: 5 }}
      transition={{ type: "spring", stiffness: 400, damping: 10 }}
    >
      <div className="w-12 h-12 rounded-full bg-spice-50 flex items-center justify-center mr-4 shrink-0">
        {icon}
      </div>
      <div>
        <h4 className="font-medium mb-2">{title}</h4>
        <p className="text-sm text-foreground/70">{description}</p>
      </div>
    </motion.div>
  </ScrollReveal>
);

const About: React.FC = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const isMobile = useMobile();

  useEffect(() => {
    // Change image every 5 seconds
    const interval = setInterval(() => {
      setCurrentImageIndex(prevIndex => 
        prevIndex === culturalImages.length - 1 ? 0 : prevIndex + 1
      );
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  const featureItems = [
    {
      icon: <MapPin className="text-spice-500" size={22} />,
      title: "Curated Destinations",
      description: "Handpicked locations that showcase India's diversity",
      delay: 10
    },
    {
      icon: <Users className="text-spice-500" size={22} />,
      title: "Local Experiences",
      description: "Connect with communities and traditional cultures",
      delay: 20
    },
    {
      icon: <Compass className="text-spice-500" size={22} />,
      title: "Expert Guidance",
      description: "Knowledgeable guides who bring stories to life",
      delay: 30
    },
    {
      icon: <Clock className="text-spice-500" size={22} />,
      title: "Mindful Travel",
      description: "Sustainable practices that respect people and places",
      delay: 40
    }
  ];

  return (
    <section id="about" className="py-24 px-6">
      <div className="container mx-auto">
        {/* Section Header */}
        <SectionHeader 
          subtitle="Our Story"
          title="The Mystic India Journey"
        />

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left Column - Image Carousel */}
          <ScrollReveal animation="fade-in-right">
            <div className="relative">
              <div className="relative z-10 overflow-hidden rounded-lg shadow-xl h-[500px]">
                <AnimatePresence mode="wait">
                  <motion.img 
                    key={currentImageIndex}
                    src={culturalImages[currentImageIndex]} 
                    alt="Cultural heritage of India" 
                    className="w-full h-full object-cover"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                  />
                </AnimatePresence>
                
                <motion.div 
                  className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 2 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="absolute bottom-6 left-6 text-white">
                    <h3 className="font-serif text-2xl mb-2">Discover India</h3>
                    <p className="text-white/80 text-sm max-w-xs">
                      From ancient temples to bustling markets, experience the true essence of India
                    </p>
                  </div>
                </motion.div>
              </div>
              
              <motion.div 
                className="absolute top-10 -right-6 w-24 h-24 bg-spice-500/20 rounded-full backdrop-blur-sm z-0"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 3, repeat: Infinity }}
              />
              <motion.div 
                className="absolute -bottom-6 -left-6 w-32 h-32 bg-indigo-500/10 rounded-full backdrop-blur-sm z-0"
                animate={{ scale: [1, 1.3, 1] }}
                transition={{ duration: 4, repeat: Infinity, delay: 2 }}
              />
            </div>
          </ScrollReveal>

          {/* Right Column - Text */}
          <div className="space-y-8">
            <ScrollReveal animation="fade-in-left">
              <h3 className="text-2xl font-serif font-medium mb-4">
                Unveiling India's Rich Tapestry of Cultures and Landscapes
              </h3>
              <p className="text-foreground/80 leading-relaxed mb-6">
                Founded in 2025, Mystic India was born from a passion to share the authentic essence of India with the world. 
                We believe travel should be transformative, connecting you with the soul of a place through its people, traditions, and natural beauty.
              </p>
              <p className="text-foreground/80 leading-relaxed">
                Our journeys are carefully crafted to balance iconic landmarks with hidden gems, allowing you to experience both the grandeur and intimate charm 
                of India's diverse regions. From the snow-capped Himalayas to the serene backwaters of Kerala, from bustling Delhi bazaars to tranquil temple towns, 
                we reveal the many hues that make India an extraordinary destination.
              </p>
            </ScrollReveal>

            {/* Features */}
            {isMobile ? (
              <div className="space-y-6 mt-8">
                {/* In mobile, show only first feature item by default */}
                <FeatureItem 
                  icon={featureItems[0].icon}
                  title={featureItems[0].title}
                  description={featureItems[0].description}
                />
                
                {/* Add a "view more" toggle for mobile */}
                <details className="mt-4">
                  <summary className="cursor-pointer text-spice-500 font-medium">
                    View more features
                  </summary>
                  <div className="space-y-6 mt-4">
                    {featureItems.slice(1).map((item, index) => (
                      <FeatureItem 
                        key={index}
                        icon={item.icon}
                        title={item.title}
                        description={item.description}
                      />
                    ))}
                  </div>
                </details>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-8">
                {featureItems.map((item, index) => (
                  <FeatureItem 
                    key={index}
                    icon={item.icon}
                    title={item.title}
                    description={item.description}
                    delay={item.delay}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
