
import React, { useState, useEffect } from 'react';
import ScrollReveal from '../ui/ScrollReveal';
import ParallaxSection from '../ui/ParallaxSection';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { MapPin, Utensils, Clock, Star, ChevronDown, ChevronUp, Filter } from 'lucide-react';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import useMobile from '@/hooks/use-mobile';
import HorizontalScroll from '../ui/horizontal-scroll';
import ContentSkeleton, { CardSkeleton } from '../ui/content-skeleton';
import LazyImage from '../ui/lazy-image';

type DishType = {
  id: number;
  name: string;
  origin: string;
  description: string;
  ingredients: string[];
  imageUrl: string;
  prepTime: string;
  spiceLevel: number;
};

const Cuisine: React.FC = () => {
  const [selectedDish, setSelectedDish] = useState<DishType | null>(null);
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
  const [activeRegionFilter, setActiveRegionFilter] = useState('all');
  const [isDataLoaded, setIsDataLoaded] = useState(false);
  const isMobile = useMobile();

  // Load data with slight delay to prioritize layout rendering
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsDataLoaded(true);
    }, 10);
    
    return () => clearTimeout(timer);
  }, []);

  // Regions for filtering
  const regions = [
    { id: 'all', name: 'All Regions' },
    { id: 'north', name: 'North India' },
    { id: 'south', name: 'South India' },
    { id: 'east', name: 'East India' },
    { id: 'west', name: 'West India' },
    { id: 'central', name: 'Central India' },
    { id: 'northeast', name: 'Northeast India' },
  ];

  const dishes: DishType[] = [
    {
      id: 1,
      name: "Butter Chicken",
      origin: "Punjab",
      description: "This iconic North Indian dish features tender chicken pieces in a rich, creamy tomato sauce flavored with aromatic spices. The dish balances tangy tomatoes with velvety butter and cream, resulting in a harmonious blend of flavors.",
      ingredients: ["Chicken", "Tomatoes", "Butter", "Cream", "Garam Masala", "Fenugreek Leaves"],
      imageUrl: "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?q=80&w=2070",
      prepTime: "45 mins",
      spiceLevel: 2,
    },
    {
      id: 2,
      name: "Masala Dosa",
      origin: "South India",
      description: "A popular South Indian breakfast, masala dosa is a thin, crispy crepe made from fermented rice and lentil batter, filled with a spiced potato mixture. It's typically served with coconut chutney and sambar.",
      ingredients: ["Rice", "Urad Dal", "Potatoes", "Onions", "Mustard Seeds", "Curry Leaves"],
      imageUrl: "https://www.idfreshfood.com/wp-content/uploads/2020/11/svsd.jpg",
      prepTime: "30 mins",
      spiceLevel: 3,
    },
    {
      id: 3,
      name: "Rogan Josh",
      origin: "Kashmir",
      description: "A staple of Kashmiri cuisine, this aromatic lamb curry is known for its vibrant red color and complex flavor profile. Slow-cooked with a blend of signature Kashmiri spices, it's rich without being overly spicy.",
      ingredients: ["Lamb", "Kashmiri Chili", "Fennel Seeds", "Ginger", "Yogurt", "Cardamom"],
      imageUrl: "https://www.krumpli.co.uk/wp-content/uploads/2023/10/Lamb-Rogan-Josh-Curry-04-735x735.jpg",
      prepTime: "90 mins",
      spiceLevel: 4,
    },
    {
      id: 4,
      name: "Pav Bhaji",
      origin: "Maharashtra",
      description: "A Mumbai street food favorite, pav bhaji consists of a spicy mashed vegetable curry served with buttered soft bread rolls. It's a flavorful one-pot meal that showcases the diversity of Indian street cuisine.",
      ingredients: ["Mixed Vegetables", "Butter", "Pav Bhaji Masala", "Tomatoes", "Soft Bread Rolls", "Lemon"],
      imageUrl: "https://images.unsplash.com/photo-1606491956689-2ea866880c84?q=80&w=2076",
      prepTime: "40 mins",
      spiceLevel: 3,
    },
    {
      id: 5,
      name: "Biryani",
      origin: "Hyderabad",
      description: "Hyderabadi biryani is a fragrant rice dish cooked with meat, vegetables, and aromatic spices. The layers of rice and meat are cooked in the 'dum' style, creating a harmonious blend of flavors and textures.",
      ingredients: ["Basmati Rice", "Meat (Chicken/Mutton)", "Yogurt", "Saffron", "Mint", "Fried Onions"],
      imageUrl: "https://media-assets.swiggy.com/swiggy/image/upload/f_auto,q_auto,fl_lossy/lslhtclel6j5qxkeejdo",
      prepTime: "60 mins",
      spiceLevel: 3,
    },
    {
      id: 6,
      name: "Rasgulla",
      origin: "West Bengal",
      description: "A beloved Bengali sweet, rasgulla consists of spongy cheese balls soaked in sugar syrup. These soft, melt-in-your-mouth treats are delicately flavored with cardamom and rose water.",
      ingredients: ["Milk", "Sugar", "Lemon Juice", "Cardamom", "Rose Water"],
      imageUrl: "https://images.hindustantimes.com/rf/image_size_630x354/HT/p2/2017/11/14/Pictures/_ee20d284-c90f-11e7-855e-d08d9ee048bd.jpg",
      prepTime: "45 mins",
      spiceLevel: 0,
    },
  ];

  const filteredDishes = activeRegionFilter === 'all' 
    ? dishes 
    : dishes.filter(dish => {
        const regionMap: Record<string, string> = {
          'Punjab': 'north',
          'South India': 'south',
          'Kashmir': 'north',
          'Maharashtra': 'west',
          'Hyderabad': 'south',
          'West Bengal': 'east'
        };
        return regionMap[dish.origin] === activeRegionFilter;
      });

  const openDishDetails = (dish: DishType) => {
    setSelectedDish(dish);
    document.body.style.overflow = 'hidden';
  };

  const closeDishDetails = () => {
    setSelectedDish(null);
    document.body.style.overflow = 'auto';
  };

  const renderSkeleton = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {[1, 2, 3, 4, 5, 6].map((item) => (
        <CardSkeleton key={item} className="h-[350px]" animated={true}>
          <div className="h-40 bg-gray-200 dark:bg-gray-700 rounded-t-md mb-4" />
          <div className="space-y-2 px-1">
            <ContentSkeleton variant="text" width="70%" className="h-5" />
            <ContentSkeleton variant="text" width="40%" className="h-4" />
            <ContentSkeleton variant="text" width="100%" className="h-4" />
            <ContentSkeleton variant="text" width="90%" className="h-4" />
          </div>
        </CardSkeleton>
      ))}
    </div>
  );

  return (
    <section id="cuisine" className="py-24 px-6 relative">
      <div className="absolute inset-12 rounded-3xl bg-white/40 dark:bg-white/10 backdrop-blur-sm border border-white/50 dark:border-white/30 z-0"></div>
      <div className="container mx-auto">
        {/* Section Header */}
        <ScrollReveal priority={true}>
          <div className="text-center mb-16">
            <p className="subtitle mb-3">Culinary Journey</p>
            <h2 className="section-title after:left-1/2 after:-translate-x-1/2">
              Indian Cuisine
            </h2>
            <p className="mt-8 max-w-2xl mx-auto text-foreground dark:text-gray-300">
              Discover the rich and diverse flavors of Indian cuisine, from spicy curries 
              to sweet delicacies, each dish telling a story of regional traditions.
            </p>
            <div className="w-30 h-[3px] bg-spice-400 mx-auto mt-6"></div>
          </div>
        </ScrollReveal>

        {/* Cuisine Grid */}
        {isMobile ? (
          <ScrollReveal 
            skeleton={<div className="overflow-x-auto pb-4"><div className="flex gap-4">{[1,2,3].map(i => (
              <CardSkeleton key={i} className="min-w-[90%] h-[350px]" />
            ))}</div></div>}
          >
            <HorizontalScroll>
              {isDataLoaded && filteredDishes.map((dish) => (
                <div key={dish.id} className="min-w-[90%] snap-start">
                  <DishCard dish={dish} onClick={openDishDetails} />
                </div>
              ))}
            </HorizontalScroll>
          </ScrollReveal>
        ) : (
          <ScrollReveal skeleton={renderSkeleton()}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {isDataLoaded && filteredDishes.map((dish, index) => (
                <ScrollReveal key={dish.id} delay={index % 3} 
                  skeleton={<CardSkeleton className="h-[350px]" />}
                >
                  <DishCard dish={dish} onClick={openDishDetails} />
                </ScrollReveal>
              ))}
            </div>
          </ScrollReveal>
        )}

        {/* Dish Detail Modal */}
        {selectedDish && (
          <div 
            className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4 overflow-auto"
            onClick={closeDishDetails}
          >
            <div 
              className="bg-background dark:bg-gray-900 rounded-xl overflow-hidden max-w-4xl w-full max-h-[90vh] flex flex-col md:flex-row"
              onClick={e => e.stopPropagation()}
            >
              <div className="md:w-1/2 h-64 md:h-auto relative">
                <ParallaxSection speed={0.05} className="h-full">
                  <LazyImage 
                    src={selectedDish.imageUrl} 
                    alt={selectedDish.name} 
                    className="w-full h-full object-cover"
                    priority={true}
                  />
                </ParallaxSection>
              </div>
              
              <div className="md:w-1/2 p-6 overflow-auto">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-2xl font-serif font-medium">{selectedDish.name}</h3>
                    <p className="flex items-center text-foreground dark:text-gray-300 mt-1">
                      <MapPin size={16} className="mr-1" /> {selectedDish.origin}
                    </p>
                  </div>
                  <div className="flex flex-col items-end">
                    <div className="flex items-center mb-1">
                      <Clock size={14} className="mr-1 text-muted-foreground" />
                      <span className="text-xs text-muted-foreground">{selectedDish.prepTime}</span>
                    </div>
                    <div className="flex items-center">
                      <span className="text-xs mr-2">Spice:</span>
                      <SpiceLevelIndicator level={selectedDish.spiceLevel} />
                    </div>
                  </div>
                </div>
                
                <div className="mb-6">
                  <h4 className="font-medium mb-2 flex items-center">
                    <Utensils size={16} className="mr-2 text-spice-500" />
                    Description
                  </h4>
                  <p className="text-foreground dark:text-gray-300 leading-relaxed">
                    {selectedDish.description}
                  </p>
                </div>
                
                <div>
                  <h4 className="font-medium mb-2">Key Ingredients:</h4>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {selectedDish.ingredients.map((ingredient, index) => (
                      <span 
                        key={index} 
                        className="px-3 py-1 bg-white/30 dark:bg-white/10 backdrop-blur-sm text-foreground dark:text-gray-300 rounded-full text-sm"
                      >
                        {ingredient}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div className="mt-auto pt-4 border-t border-border dark:border-white/20">
                  <button 
                    className="btn-primary w-full justify-center"
                    onClick={closeDishDetails}
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

const SpiceLevelIndicator = ({ level }: { level: number }) => {
  return (
    <div className="flex items-center">
      {[...Array(5)].map((_, index) => (
        <div 
          key={index} 
          className={`w-2 h-2 rounded-full mx-0.5 ${
            index < level 
              ? 'bg-spice-500' 
              : 'bg-gray-200'
          }`}
        />
      ))}
    </div>
  );
};

const DishCard = ({ dish, onClick }: { dish: DishType; onClick: (dish: DishType) => void }) => {
  return (
    <Card className="overflow-hidden cursor-pointer hover:shadow-md transition-shadow h-full flex flex-col" onClick={() => onClick(dish)}>
      <div className="h-56 overflow-hidden">
        <LazyImage 
          src={dish.imageUrl} 
          alt={dish.name} 
          className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
        />
      </div>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle>{dish.name}</CardTitle>
            <CardDescription className="flex items-center mt-1">
              <MapPin size={14} className="mr-1" />
              {dish.origin}
            </CardDescription>
          </div>
          <div className="flex items-center">
            <Clock size={14} className="mr-1 text-muted-foreground" />
            <span className="text-xs text-muted-foreground">{dish.prepTime}</span>
          </div>
        </div>
      </CardHeader>
      <CardContent className="flex-grow">
        <p className="text-foreground dark:text-gray-300 line-clamp-3">
          {dish.description}
        </p>
      </CardContent>
      <CardFooter className="flex justify-between pt-0">
        <div className="flex items-center">
          <span className="text-xs mr-2">Spice Level:</span>
          <SpiceLevelIndicator level={dish.spiceLevel} />
        </div>
        <button className="text-spice-500 text-sm font-medium">View Details</button>
      </CardFooter>
    </Card>
  );
};

export default Cuisine;
