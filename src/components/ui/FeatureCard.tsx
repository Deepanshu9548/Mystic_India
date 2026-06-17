
import React from 'react';
import { motion } from 'framer-motion';
import { cardHoverVariants, imageHoverVariants } from '@/lib/animations';
import { cn } from '@/lib/utils';
import ScrollReveal from './ScrollReveal';

interface FeatureCardProps {
  title: string;
  description: string;
  imageSrc: string;
  className?: string;
  delay?: number;
  imageAlt?: string;
  icon?: React.ReactNode;
  children?: React.ReactNode;
}

const FeatureCard: React.FC<FeatureCardProps> = ({
  title,
  description,
  imageSrc,
  className,
  delay = 0,
  imageAlt = "Feature image",
  icon,
  children
}) => {
  return (
    <ScrollReveal delay={delay} className={className}>
      <motion.div 
        className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow border border-mystic-100 h-full flex flex-col"
        variants={cardHoverVariants}
        initial="initial"
        whileHover="hover"
      >
        <div className="h-56 relative overflow-hidden">
          <motion.img 
            src={imageSrc} 
            alt={imageAlt} 
            className="w-full h-full object-cover"
            variants={imageHoverVariants}
            initial="initial"
            whileHover="hover"
          />
          {icon && (
            <div className="absolute top-4 right-4 bg-white/80 backdrop-blur-sm p-2 rounded-full">
              {icon}
            </div>
          )}
        </div>
        
        <div className="p-6 flex flex-col flex-grow">
          <h3 className="text-xl font-serif font-medium mb-2">{title}</h3>
          <p className="text-foreground/70 mb-4 flex-grow">{description}</p>
          {children}
        </div>
      </motion.div>
    </ScrollReveal>
  );
};

export default FeatureCard;
