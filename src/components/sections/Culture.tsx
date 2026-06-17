
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ScrollReveal from '../ui/ScrollReveal';
import ParallaxSection from '../ui/ParallaxSection';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { MapPin, Users, Calendar, ArrowRight, Globe, Filter, ChevronDown, ChevronUp } from 'lucide-react';
import { culturalData } from '@/data/culturalData';
import { regions, getStateRegion } from '@/data/cultural';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import useMobile from '@/hooks/use-mobile';
import ContentSkeleton, { CardSkeleton } from '../ui/content-skeleton';
import LazyImage from '../ui/lazy-image';

const Culture: React.FC = () => {
  // Cultural data
  const [activeTab, setActiveTab] = useState<string>('');
  const [activeRegionFilter, setActiveRegionFilter] = useState<string>('all');
  const [filteredItems, setFilteredItems] = useState(culturalData.slice(0, 5));
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isDataLoaded, setIsDataLoaded] = useState(false);
  const isMobile = useMobile();

  // Load data with slight delay to prioritize layout rendering
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsDataLoaded(true);
    }, 10);
    
    return () => clearTimeout(timer);
  }, []);

  // Function to get region name for a cultural item
  const getRegionName = (itemId: string): string => {
    const regionId = getStateRegion(itemId);
    const region = regions.find(r => r.id === regionId);
    return region ? region.name : "";
  };

  // Filter cultural items by region
  useEffect(() => {
    let filtered = [...culturalData];
    
    if (activeRegionFilter !== 'all') {
      const region = regions.find(r => r.id === activeRegionFilter);
      if (region) {
        filtered = culturalData.filter(item => region.states.includes(item.id));
      }
    }
    
    // Limit to 5 items for desktop, 1 for mobile
    const limitedItems = filtered.slice(0, isMobile ? 1 : 5);
    setFilteredItems(limitedItems);
    
    // Set active tab to first item in filtered list if not already set or if current item isn't in filtered list
    if (!activeTab || !limitedItems.find(item => item.id === activeTab)) {
      setActiveTab(limitedItems[0]?.id || '');
    }
  }, [activeRegionFilter, activeTab, isMobile]);

  const renderSkeletonTabContent = () => (
    <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
      <div className="lg:col-span-3">
        <ContentSkeleton variant="image" className="w-full h-60 lg:h-full rounded-xl" />
      </div>
      <div className="lg:col-span-2 space-y-6">
        <CardSkeleton className="h-[300px]" />
        <ContentSkeleton className="h-12 rounded-md" />
      </div>
    </div>
  );

  return (
    <section id="culture" className="py-24 px-6 relative">
      {/* Translucent Background Layer */}
      <div className="absolute inset-12 rounded-3xl bg-white/40 dark:bg-white/5 backdrop-blur-sm border border-white/50 dark:border-white/10 z-0"></div>
      
      <div className="container mx-auto relative z-10">
        {/* Section Header */}
        <ScrollReveal priority={true}>
          <div className="text-center mb-16">
            <p className="subtitle mb-3">Explore Culture</p>
            <h2 className="section-title after:left-1/2 after:-translate-x-1/2">
              Discover Indian Culture
            </h2>
            <p className="mt-8 max-w-2xl mx-auto text-foreground/70">
              India's diverse culture offers unique experiences, from traditional dances to vibrant festivals,
              each with its own distinct heritage, cuisine, and traditions.
            </p>
          </div>
        </ScrollReveal>

        {/* Cultural Tabs - Limited based on device */}
        <ScrollReveal delay={2} skeleton={
          <div className="w-full">
            <div className="flex mb-8 bg-transparent p-0 space-x-2 overflow-x-auto">
              {[...Array(isMobile ? 2 : 5)].map((_, i) => (
                <ContentSkeleton key={i} className="px-6 py-3 min-w-[100px]" />
              ))}
            </div>
            {renderSkeletonTabContent()}
          </div>
        }>
          {isDataLoaded && filteredItems.length > 0 ? (
            <Tabs defaultValue={filteredItems[0]?.id} value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="w-full flex mb-8 bg-transparent p-0 space-x-2 overflow-x-auto">
                {filteredItems.map((item) => (
                  <TabsTrigger 
                    key={item.id} 
                    value={item.id}
                    className="px-6 py-3 data-[state=active]:bg-spice-50 data-[state=active]:text-spice-600 data-[state=active]:border-b-2 data-[state=active]:border-spice-500 data-[state=active]:shadow-none rounded-none whitespace-nowrap"
                  >
                    {item.name}
                  </TabsTrigger>
                ))}
                
                {isMobile && (
                  <Link to="/culture" className="px-6 py-3 text-spice-500 whitespace-nowrap flex items-center">
                    More <ArrowRight size={14} className="ml-1" />
                  </Link>
                )}
              </TabsList>

              {filteredItems.map((item) => (
                <TabsContent key={item.id} value={item.id} className="mt-0">
                  <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
                    <div className="lg:col-span-3">
                      <ParallaxSection speed={0.05} className="h-full" skeleton={
                        <div className="rounded-xl overflow-hidden h-full shadow-md">
                          <ContentSkeleton variant="image" className="w-full h-60 lg:h-full" />
                        </div>
                      }>
                        <div className="rounded-xl overflow-hidden h-full shadow-md">
                          <LazyImage 
                            src={item.bannerImage} 
                            alt={item.name} 
                            className="w-full h-full object-cover"
                          />
                        </div>
                      </ParallaxSection>
                    </div>
                    
                    <div className="lg:col-span-2 space-y-6">
                      <Card>
                        <CardHeader>
                          <CardTitle className="flex items-center text-2xl">
                            <MapPin className="mr-2 text-spice-500" size={20} />
                            {item.name}
                          </CardTitle>
                          <CardDescription>Region: {getRegionName(item.id)}</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <div className="flex flex-wrap gap-4">
                            <div className="flex items-center text-sm text-muted-foreground">
                              <Users size={16} className="mr-1" />
                              {item.population}
                            </div>
                            <div className="flex items-center text-sm text-muted-foreground">
                              <Calendar size={16} className="mr-1" />
                              {item.language}
                            </div>
                            <div className="flex items-center text-sm text-muted-foreground">
                              <Globe size={16} className="mr-1" />
                              {getRegionName(item.id)}
                            </div>
                          </div>
                          
                          <p className="text-foreground/80 leading-relaxed">
                            {item.description}
                          </p>
                          
                          <div className="pt-2">
                            <p className="font-medium mb-2">Famous For:</p>
                            <div className="flex flex-wrap gap-2">
                              {item.famousFor.map((feature, index) => (
                                <span 
                                  key={index} 
                                  className="px-3 py-1 bg-white/40 dark:bg-white/10 backdrop-blur-sm text-foreground/80 rounded-full text-sm"
                                >
                                  {feature}
                                </span>
                              ))}
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                      
                      <Link 
                        to={`/culture/${item.id}`} 
                        className="btn-primary w-full justify-center inline-flex items-center"
                      >
                        Explore {item.name} <ArrowRight size={16} className="ml-2" />
                      </Link>
                    </div>
                  </div>
                </TabsContent>
              ))}
            </Tabs>
          ) : !isDataLoaded ? (
            renderSkeletonTabContent()
          ) : (
            <div className="text-center py-8">
              <p className="text-foreground/80">No cultural items found for the selected region.</p>
            </div>
          )}
        </ScrollReveal>
      </div>
    </section>
  );
};

export default Culture;
