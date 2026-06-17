
import React from 'react';
import { MapPin, X, Clock, Flame, Utensils } from 'lucide-react';
import { motion } from 'framer-motion';
import { stateData } from '@/data/stateData';

// Extracted from the main Cuisine page for better code splitting
const SpiceLevelIndicator = ({ level }: { level: 'Mild' | 'Medium' | 'Hot' | 'Very Hot' }) => {
  const levels = {
    'Mild': 1,
    'Medium': 2, 
    'Hot': 3,
    'Very Hot': 4
  };
  
  const count = levels[level];
  
  return (
    <div className="flex items-center gap-1">
      {[...Array(4)].map((_, i) => (
        <Flame
          key={i}
          size={16}
          className={i < count 
            ? "text-red-500" 
            : "text-gray-300 dark:text-gray-600"
          }
          fill={i < count ? "currentColor" : "none"}
        />
      ))}
    </div>
  );
};

type Dish = {
  name: string;
  description: string;
  stateName: string;
  stateId: string;
  image: string;
  taste?: string;
  cookingTime?: string;
  spiceLevel?: 'Mild' | 'Medium' | 'Hot' | 'Very Hot';
  ingredients?: string[];
};

interface DishDetailProps {
  dish: Dish;
  onClose: () => void;
}

const DishDetail: React.FC<DishDetailProps> = ({ dish, onClose }) => {
  return (
    <motion.div 
      className="fixed inset-0 bg-black/70 dark:bg-black/80 z-50 flex items-center justify-center p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div 
        className="bg-background rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto"
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 20 }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative h-72">
          <img 
            src={dish.image || "https://images.unsplash.com/photo-1546069901-ba9599a7e63c"} 
            alt={dish.name}
            className="w-full h-full object-cover"
          />
          <button 
            className="absolute top-4 right-4 bg-black/50 rounded-full p-2 text-white"
            onClick={onClose}
          >
            <X size={20} />
          </button>
          <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent">
            <h2 className="text-3xl font-serif text-white">{dish.name}</h2>
            <p className="text-white/80 flex items-center">
              <MapPin size={16} className="mr-1" />
              {dish.stateName}
            </p>
          </div>
        </div>
        
        <div className="p-6 md:p-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-secondary/50 p-4 rounded-lg flex flex-col items-center justify-center">
              <Clock className="text-spice-500 mb-2" size={24} />
              <h3 className="text-lg font-medium">Cooking Time</h3>
              <p className="text-center">{dish.cookingTime}</p>
            </div>
            
            <div className="bg-secondary/50 p-4 rounded-lg flex flex-col items-center justify-center">
              <Flame className="text-spice-500 mb-2" size={24} />
              <h3 className="text-lg font-medium">Spice Level</h3>
              <div className="flex items-center mt-2">
                <SpiceLevelIndicator level={dish.spiceLevel || 'Medium'} />
                <span className="ml-2">{dish.spiceLevel}</span>
              </div>
            </div>
            
            <div className="bg-secondary/50 p-4 rounded-lg flex flex-col items-center justify-center">
              <Utensils className="text-spice-500 mb-2" size={24} />
              <h3 className="text-lg font-medium">Cuisine Type</h3>
              <p className="text-center">{stateData.find(s => s.id === dish.stateId)?.cuisineType || 'Traditional'}</p>
            </div>
          </div>
          
          <div className="mb-8">
            <h3 className="text-xl font-medium mb-4">Description</h3>
            <p className="text-foreground/80 leading-relaxed">
              {dish.description}
            </p>
          </div>
          
          <div className="mb-8">
            <h3 className="text-xl font-medium mb-4">Taste Profile</h3>
            <p className="text-foreground/80 leading-relaxed bg-spice-50/50 dark:bg-spice-900/20 p-4 rounded-lg border border-spice-200 dark:border-spice-900">
              {dish.taste}
            </p>
          </div>
          
          <div>
            <h3 className="text-xl font-medium mb-4">Key Ingredients</h3>
            <div className="flex flex-wrap gap-2">
              {dish.ingredients?.map((ingredient, idx) => (
                <span 
                  key={idx} 
                  className="px-3 py-1 bg-secondary rounded-full text-sm"
                >
                  {ingredient}
                </span>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default DishDetail;
