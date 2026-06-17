import React, { useState, useMemo, useEffect, lazy, Suspense } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import ScrollReveal from '@/components/ui/ScrollReveal';
import { Card, CardContent } from '@/components/ui/card';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { stateData } from '@/data/stateData';
import { MapPin, X, Search, Filter, Flame, Clock, Utensils, Image, ChevronDown, ChevronUp, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

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

const DishDetail = lazy(() => import('@/components/cuisine/DishDetail'));

const TASTE_LOOKUP = {
  'Dal Baati Churma': 'Spicy with sweet notes, earthy',
  'Laal Maas': 'Fiery hot with complex spices',
  'Ker Sangri': 'Tangy and spicy',
  'Ghevar': 'Sweet and syrupy',
  'Appam with Stew': 'Mildly sweet with savory, coconutty stew',
  'Malabar Biryani': 'Aromatic, mild spice, hint of sweetness',
  'Kerala Fish Curry': 'Tangy, spicy, coconutty',
  'Puttu and Kadala Curry': 'Mild, earthy with spicy curry',
  'Idli Sambhar': 'Savory, tangy with complex spices',
  'Dosa': 'Fermented tangy crepe with savory fillings',
  'Chettinad Chicken': 'Very spicy with complex layers',
  'Pongal': 'Savory version is peppery; sweet version is rich and jaggery-sweet',
  'Butter Chicken': 'Creamy, mildly spiced with tomato sweetness',
  'Biryani': 'Aromatic, layered flavors with tender meat',
  'Rasgulla': 'Sweet, spongy and syrupy',
  'Pav Bhaji': 'Spicy, tangy with buttery bread'
};

const COOKING_TIME_LOOKUP = {
  'Dal Baati Churma': '2-3 hours',
  'Laal Maas': '1-2 hours',
  'Ker Sangri': '45 minutes',
  'Ghevar': '1 hour',
  'Appam with Stew': '1 hour',
  'Malabar Biryani': '1.5 hours',
  'Kerala Fish Curry': '30-40 minutes',
  'Puttu and Kadala Curry': '45 minutes',
  'Idli Sambhar': '30 minutes (plus fermentation)',
  'Dosa': '20 minutes (plus fermentation)',
  'Chettinad Chicken': '1 hour',
  'Pongal': '30-40 minutes'
};

const SPICE_LEVEL_LOOKUP = {
  'Dal Baati Churma': 'Medium',
  'Laal Maas': 'Very Hot',
  'Ker Sangri': 'Medium',
  'Ghevar': 'Mild',
  'Appam with Stew': 'Mild',
  'Malabar Biryani': 'Medium',
  'Kerala Fish Curry': 'Hot',
  'Puttu and Kadala Curry': 'Medium',
  'Idli Sambhar': 'Medium',
  'Dosa': 'Medium',
  'Chettinad Chicken': 'Very Hot',
  'Pongal': 'Mild'
};

const INGREDIENTS_LOOKUP = {
  'Dal Baati Churma': ['Wheat flour', 'Various lentils', 'Ghee', 'Jaggery', 'Spices'],
  'Laal Maas': ['Mutton', 'Mathania red chilies', 'Yogurt', 'Ghee', 'Spices'],
  'Ker Sangri': ['Ker (desert berries)', 'Sangri (beans)', 'Spices', 'Oil'],
  'Ghevar': ['Flour', 'Ghee', 'Sugar syrup', 'Nuts'],
  'Appam with Stew': ['Rice', 'Coconut', 'Vegetables/Meat', 'Spices', 'Coconut milk'],
  'Kerala Fish Curry': ['Fish', 'Coconut milk', 'Kokum', 'Curry leaves', 'Spices'],
  'Puttu and Kadala Curry': ['Rice flour', 'Coconut', 'Black chickpeas', 'Spices'],
  'Idli Sambhar': ['Rice', 'Urad dal', 'Vegetables', 'Tamarind', 'Spices'],
  'Dosa': ['Rice', 'Urad dal', 'Fenugreek seeds', 'Potato filling', 'Spices'],
  'Chettinad Chicken': ['Chicken', 'Star anise', 'Fennel', 'Red chilies', 'Coconut'],
  'Pongal': ['Rice', 'Moong dal', 'Pepper', 'Cumin', 'Ghee', 'Cashews']
};

const SpiceLevelIndicator = React.memo(({ level }: { level: 'Mild' | 'Medium' | 'Hot' | 'Very Hot' }) => {
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
});

SpiceLevelIndicator.displayName = 'SpiceLevelIndicator';

const DishCard = React.memo(({ dish, onClick }: { dish: Dish; onClick: (dish: Dish) => void }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card 
        className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer h-full"
        onClick={() => onClick(dish)}
      >
        <div className="h-48">
          <img 
            src={dish.image || "https://images.unsplash.com/photo-1546069901-ba9599a7e63c"} 
            alt={dish.name}
            className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
            loading="lazy"
          />
        </div>
        <CardContent className="p-6">
          <h3 className="text-xl font-medium mb-2">{dish.name}</h3>
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center text-sm text-muted-foreground">
              <MapPin size={16} className="mr-1" />
              <span>{dish.stateName}</span>
            </div>
            <div className="flex items-center gap-1">
              <SpiceLevelIndicator level={dish.spiceLevel || 'Medium'} />
            </div>
          </div>
          <p className="line-clamp-3 text-foreground/80 mb-3">
            {dish.description}
          </p>
          <p className="text-sm text-spice-600 dark:text-spice-400 font-medium">
            Taste: {dish.taste}
          </p>
        </CardContent>
      </Card>
    </motion.div>
  );
});

DishCard.displayName = 'DishCard';

const Cuisine = () => {
  const [selectedDish, setSelectedDish] = useState<Dish | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeStateFilter, setActiveStateFilter] = useState('All');
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
  const [isSpiceLevelFilterOpen, setIsSpiceLevelFilterOpen] = useState(false);
  const [activeSpiceLevelFilter, setActiveSpiceLevelFilter] = useState('All');
  const [isLoading, setIsLoading] = useState(true);
  const [displayedDishes, setDisplayedDishes] = useState<Dish[]>([]);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const allDishes = useMemo(() => {
    return stateData.flatMap(state => 
      state.cuisine?.dishes?.map(dish => ({
        ...dish, 
        stateName: state.name,
        stateId: state.id,
        taste: TASTE_LOOKUP[dish.name as keyof typeof TASTE_LOOKUP] || 'Complex blend of spices with regional flavors',
        cookingTime: COOKING_TIME_LOOKUP[dish.name as keyof typeof COOKING_TIME_LOOKUP] || '45-60 minutes',
        spiceLevel: (SPICE_LEVEL_LOOKUP[dish.name as keyof typeof SPICE_LEVEL_LOOKUP] || 'Medium') as 'Mild' | 'Medium' | 'Hot' | 'Very Hot',
        ingredients: INGREDIENTS_LOOKUP[dish.name as keyof typeof INGREDIENTS_LOOKUP] || ['Regional spices', 'Local ingredients', 'Traditional herbs']
      })) || []
    );
  }, []);

  const filteredDishes = useMemo(() => {
    const dishes = allDishes.filter(dish => {
      const matchesSearch = dish.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                            dish.stateName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            (dish.description && dish.description.toLowerCase().includes(searchTerm.toLowerCase()));
      const matchesState = activeStateFilter === 'All' || dish.stateName === activeStateFilter;
      const matchesSpiceLevel = activeSpiceLevelFilter === 'All' || dish.spiceLevel === activeSpiceLevelFilter;
      return matchesSearch && matchesState && matchesSpiceLevel;
    });

    return dishes.sort((a, b) => a.name.localeCompare(b.name)); // Sort alphabetically
  }, [allDishes, searchTerm, activeStateFilter, activeSpiceLevelFilter]);

  const states = useMemo(() => ['All', ...new Set(stateData.map(state => state.name))], []);
  
  const spiceLevels = ['All', 'Mild', 'Medium', 'Hot', 'Very Hot'];

  useEffect(() => {
    if (!isInitialized) {
      const initTimer = window.setTimeout(() => {
        setIsInitialized(true);
      }, 100);
      
      return () => window.clearTimeout(initTimer);
    }
  }, [isInitialized]);
  
  useEffect(() => {
    if (!isInitialized) return;
    
    setIsLoading(true);
    
    const loadTimer = window.setTimeout(() => {
      setDisplayedDishes(filteredDishes);
      setIsLoading(false);
    }, 100); // Small delay to prevent flash of loading state
    
    return () => window.clearTimeout(loadTimer);
  }, [filteredDishes, isInitialized]);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow pt-20">
        <section className="relative h-[40vh] flex items-center">
          <div 
            className="absolute inset-0 bg-center bg-cover"
            style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1589301760014-d929f3979dbc?q=80&w=2070)' }}
          >
            <div className="absolute inset-0 bg-black/50"></div>
          </div>
          <div className="container mx-auto px-6 relative z-10">
            <ScrollReveal>
              <h1 className="text-4xl md:text-5xl font-serif text-white mb-4">Indian Cuisine</h1>
              <p className="text-white/90 max-w-2xl">
                Explore the rich tapestry of flavors that make up India's diverse and delectable culinary traditions.
              </p>
            </ScrollReveal>
          </div>
        </section>

        <section className="py-8 px-6 bg-secondary dark:bg-secondary/20">
          <div className="container mx-auto">
            <div className="relative w-full md:w-80 mb-6">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-foreground/60" />
              <input
                type="text"
                placeholder="Search dishes..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="search-box pl-10 w-full"
              />
            </div>
            
            <div className="mb-4">
              <Collapsible 
                open={isFiltersOpen} 
                onOpenChange={setIsFiltersOpen}
                className="border border-border/40 rounded-lg overflow-hidden"
              >
                <CollapsibleTrigger className="flex items-center justify-between w-full bg-background/80 backdrop-blur-sm p-4">
                  <div className="flex items-center gap-2">
                    <Filter className="h-4 w-4 text-spice-500" />
                    <span className="font-medium">Filter by State</span>
                  </div>
                  {isFiltersOpen ? (
                    <ChevronUp className="h-4 w-4 text-muted-foreground" />
                  ) : (
                    <ChevronDown className="h-4 w-4 text-muted-foreground" />
                  )}
                </CollapsibleTrigger>
                <CollapsibleContent className="p-4 bg-background/70 backdrop-blur-sm">
                  <div className="flex flex-wrap gap-2">
                    {states.map(state => (
                      <button
                        key={state}
                        className={`filter-tag ${activeStateFilter === state ? 'active' : ''}`}
                        onClick={() => setActiveStateFilter(state)}
                      >
                        {state}
                      </button>
                    ))}
                  </div>
                </CollapsibleContent>
              </Collapsible>
            </div>
            
            <div>
              <Collapsible 
                open={isSpiceLevelFilterOpen} 
                onOpenChange={setIsSpiceLevelFilterOpen}
                className="border border-border/40 rounded-lg overflow-hidden"
              >
                <CollapsibleTrigger className="flex items-center justify-between w-full bg-background/80 backdrop-blur-sm p-4">
                  <div className="flex items-center gap-2">
                    <Flame className="h-4 w-4 text-spice-500" />
                    <span className="font-medium">Filter by Spice Level</span>
                  </div>
                  {isSpiceLevelFilterOpen ? (
                    <ChevronUp className="h-4 w-4 text-muted-foreground" />
                  ) : (
                    <ChevronDown className="h-4 w-4 text-muted-foreground" />
                  )}
                </CollapsibleTrigger>
                <CollapsibleContent className="p-4 bg-background/70 backdrop-blur-sm">
                  <div className="flex flex-wrap gap-2">
                    {spiceLevels.map(level => (
                      <button
                        key={level}
                        className={`filter-tag ${activeSpiceLevelFilter === level ? 'active' : ''}`}
                        onClick={() => setActiveSpiceLevelFilter(level)}
                      >
                        {level}
                      </button>
                    ))}
                  </div>
                </CollapsibleContent>
              </Collapsible>
            </div>
          </div>
        </section>

        <section className="py-16 px-6">
          <div className="container mx-auto">
            <ScrollReveal>
              {isLoading ? (
                <div className="flex items-center justify-center min-h-[400px]">
                  <Loader2 className="h-8 w-8 animate-spin text-spice-500" />
                </div>
              ) : displayedDishes.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {displayedDishes.map((dish, index) => (
                    <DishCard 
                      key={`${dish.stateId}-${dish.name}`} 
                      dish={dish} 
                      onClick={setSelectedDish} 
                    />
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <Image className="mx-auto h-12 w-12 text-muted-foreground/50 mb-4" />
                  <h3 className="text-xl font-medium mb-2">No dishes found</h3>
                  <p className="text-muted-foreground">Try adjusting your search or filter</p>
                </div>
              )}
            </ScrollReveal>
          </div>
        </section>
      </main>

      <AnimatePresence>
        {selectedDish && (
          <Suspense fallback={
            <div className="fixed inset-0 bg-black/70 dark:bg-black/80 z-50 flex items-center justify-center">
              <Loader2 className="h-10 w-10 animate-spin text-white" />
            </div>
          }>
            <motion.div 
              className="fixed inset-0 bg-black/70 dark:bg-black/80 z-50 flex items-center justify-center p-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedDish(null)}
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
                    src={selectedDish.image || "https://images.unsplash.com/photo-1546069901-ba9599a7e63c"} 
                    alt={selectedDish.name}
                    className="w-full h-full object-cover"
                  />
                  <button 
                    className="absolute top-4 right-4 bg-black/50 rounded-full p-2 text-white"
                    onClick={() => setSelectedDish(null)}
                  >
                    <X size={20} />
                  </button>
                  <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent">
                    <h2 className="text-3xl font-serif text-white">{selectedDish.name}</h2>
                    <p className="text-white/80 flex items-center">
                      <MapPin size={16} className="mr-1" />
                      {selectedDish.stateName}
                    </p>
                  </div>
                </div>
                
                <div className="p-6 md:p-8">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <div className="bg-secondary/50 p-4 rounded-lg flex flex-col items-center justify-center">
                      <Clock className="text-spice-500 mb-2" size={24} />
                      <h3 className="text-lg font-medium">Cooking Time</h3>
                      <p className="text-center">{selectedDish.cookingTime}</p>
                    </div>
                    
                    <div className="bg-secondary/50 p-4 rounded-lg flex flex-col items-center justify-center">
                      <Flame className="text-spice-500 mb-2" size={24} />
                      <h3 className="text-lg font-medium">Spice Level</h3>
                      <div className="flex items-center mt-2">
                        <SpiceLevelIndicator level={selectedDish.spiceLevel || 'Medium'} />
                        <span className="ml-2">{selectedDish.spiceLevel}</span>
                      </div>
                    </div>
                    
                    <div className="bg-secondary/50 p-4 rounded-lg flex flex-col items-center justify-center">
                      <Utensils className="text-spice-500 mb-2" size={24} />
                      <h3 className="text-lg font-medium">Cuisine Type</h3>
                      <p className="text-center">{stateData.find(s => s.id === selectedDish.stateId)?.cuisineType || 'Traditional'}</p>
                    </div>
                  </div>
                  
                  <div className="mb-8">
                    <h3 className="text-xl font-medium mb-4">Description</h3>
                    <p className="text-foreground/80 leading-relaxed">
                      {selectedDish.description}
                    </p>
                  </div>
                  
                  <div className="mb-8">
                    <h3 className="text-xl font-medium mb-4">Taste Profile</h3>
                    <p className="text-foreground/80 leading-relaxed bg-spice-50/50 dark:bg-spice-900/20 p-4 rounded-lg border border-spice-200 dark:border-spice-900">
                      {selectedDish.taste}
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="text-xl font-medium mb-4">Key Ingredients</h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedDish.ingredients?.map((ingredient, idx) => (
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
          </Suspense>
        )}
      </AnimatePresence>

      <Footer />
    </div>
  );
};

export default Cuisine;
