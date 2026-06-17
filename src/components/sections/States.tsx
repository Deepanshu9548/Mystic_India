import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ScrollReveal from '../ui/ScrollReveal';
import ParallaxSection from '../ui/ParallaxSection';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { MapPin, Users, Calendar, ArrowRight, Globe, Filter, ChevronDown, ChevronUp } from 'lucide-react';
import { stateData } from '@/data/stateData';
import { regions, getStateRegion } from '@/data/cultural';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import ContentSkeleton, { CardSkeleton } from '../ui/content-skeleton';
import StateCard from '../StateCard';

const States: React.FC = () => {
  // States data
  const [activeTab, setActiveTab] = useState<string>('');
  const [activeRegionFilter, setActiveRegionFilter] = useState<string>('all');
  const [filteredStates, setFilteredStates] = useState(stateData.slice(0, 5));
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isDataLoaded, setIsDataLoaded] = useState(false);

  // Load data with slight delay to prioritize layout rendering
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsDataLoaded(true);
    }, 10);
    
    return () => clearTimeout(timer);
  }, []);

  // Function to get region name for a state
  const getRegionName = (stateId: string): string => {
    const regionId = getStateRegion(stateId);
    const region = regions.find(r => r.id === regionId);
    return region ? region.name : "";
  };

  // Filter states by region
  useEffect(() => {
    let filtered = [...stateData];
    
    if (activeRegionFilter === 'all') {
      // Restrict "All Regions" to specific states
      const allowedStates = ['rajasthan', 'kerala', 'himachal', 'goa'];
      filtered = stateData.filter(state => allowedStates.includes(state.id));
    } else {
      const region = regions.find(r => r.id === activeRegionFilter);
      if (region) {
        filtered = stateData.filter(state => region.states.includes(state.id));
      }
    }
    
    // Limit to 5 states
    const limitedStates = filtered.slice(0, 10);
    setFilteredStates(limitedStates);
    
    // Set active tab to first state in filtered list if not already set or if current state isn't in filtered list
    if (!activeTab || !limitedStates.find(state => state.id === activeTab)) {
      setActiveTab(limitedStates[0]?.id || '');
    }
  }, [activeRegionFilter, activeTab]);

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
    <section id="states" className="py-24 px-6 relative">
      {/* Translucent Background Layer */}
      <div className="absolute inset-12 rounded-3xl bg-white/40 dark:bg-white/5 backdrop-blur-sm border border-white/50 dark:border-white/10 z-0"></div>
      
      <div className="container mx-auto relative z-10">
        {/* Section Header */}
        <ScrollReveal priority={true}>
          <div className="text-center mb-16">
            <p className="subtitle mb-3">Explore India</p>
            <h2 className="section-title after:left-1/2 after:-translate-x-1/2">
              Discover Indian States
            </h2>
            <p className="mt-8 max-w-2xl mx-auto text-foreground/70">
              India's diverse states offer unique cultural experiences, from royal palaces to serene backwaters,
              each with its own distinct heritage, cuisine, and traditions.
            </p>
          </div>
        </ScrollReveal>

        {/* Collapsible Region filter */}
        <ScrollReveal delay={1} priority={true}>
          <Collapsible 
            open={isFilterOpen} 
            onOpenChange={setIsFilterOpen}
            className="mb-8 bg-background/80 rounded-lg shadow-sm overflow-hidden border border-border/50"
          >
            <CollapsibleTrigger className="flex items-center justify-between w-full p-4 text-left">
              <div className="flex items-center gap-2">
                <Filter className="h-4 w-4 text-spice-500" />
                <span className="text-sm font-medium">Filter by Region</span>
              </div>
              {isFilterOpen ? (
                <ChevronUp className="h-4 w-4 text-muted-foreground" />
              ) : (
                <ChevronDown className="h-4 w-4 text-muted-foreground" />
              )}
            </CollapsibleTrigger>
            <CollapsibleContent className="p-4 pt-0 border-t border-border/50">
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-7 gap-2 pt-4">
                <button
                  className={`p-2 rounded-md text-sm font-medium transition-colors ${activeRegionFilter === 'all' 
                    ? 'bg-spice-500 text-white' 
                    : 'bg-secondary/50 hover:bg-secondary'}`}
                  onClick={() => setActiveRegionFilter('all')}
                >
                  All Regions
                </button>
                {regions.map(region => (
                  <button
                    key={region.id}
                    className={`p-2 rounded-md text-sm font-medium transition-colors ${activeRegionFilter === region.id 
                      ? 'bg-spice-500 text-white' 
                      : 'bg-secondary/50 hover:bg-secondary'}`}
                    onClick={() => setActiveRegionFilter(region.id)}
                  >
                    {region.name}
                  </button>
                ))}
              </div>
            </CollapsibleContent>
          </Collapsible>
        </ScrollReveal>

        {/* State Tabs - Limited to 5 */}
        <ScrollReveal delay={2} skeleton={
          <div className="w-full">
            <div className="flex mb-8 bg-transparent p-0 space-x-2 overflow-x-auto">
              {[...Array(5)].map((_, i) => (
                <ContentSkeleton key={i} className="px-6 py-3 min-w-[100px]" />
              ))}
            </div>
            {renderSkeletonTabContent()}
          </div>
        }>
          {isDataLoaded && filteredStates.length > 0 ? (
            <Tabs defaultValue={filteredStates[0]?.id} value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="w-full flex mb-8 bg-transparent p-0 space-x-2 overflow-x-auto">
                {filteredStates.map((state) => (
                  <TabsTrigger 
                    key={state.id} 
                    value={state.id}
                    className="px-6 py-3 data-[state=active]:bg-spice-50 data-[state=active]:text-spice-600 data-[state=active]:border-b-2 data-[state=active]:border-spice-500 data-[state=active]:shadow-none rounded-none"
                  >
                    {state.name}
                  </TabsTrigger>
                ))}
              </TabsList>

              {filteredStates.map((state) => (
                <TabsContent key={state.id} value={state.id} className="mt-0">
                  <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
                    <div className="lg:col-span-3">
                      <ParallaxSection speed={0.05} className="h-full" skeleton={
                        <div className="rounded-xl overflow-hidden h-full shadow-md">
                          <ContentSkeleton variant="image" className="w-full h-60 lg:h-full" />
                        </div>
                      }>
                        <div className="rounded-xl overflow-hidden h-full shadow-md">
                          <StateCard 
                            state={{
                              name: state.name,
                              image: state.bannerImage
                            }}
                          />
                        </div>
                      </ParallaxSection>
                    </div>
                    
                    <div className="lg:col-span-2 space-y-6">
                      <Card>
                        <CardHeader>
                          <CardTitle className="flex items-center text-2xl">
                            <MapPin className="mr-2 text-spice-500" size={20} />
                            {state.name}
                          </CardTitle>
                          <CardDescription>Capital: {state.capital}</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <div className="flex flex-wrap gap-4">
                            <div className="flex items-center text-sm text-muted-foreground">
                              <Users size={16} className="mr-1" />
                              {state.population}
                            </div>
                            <div className="flex items-center text-sm text-muted-foreground">
                              <Calendar size={16} className="mr-1" />
                              {state.language}
                            </div>
                            <div className="flex items-center text-sm text-muted-foreground">
                              <Globe size={16} className="mr-1" />
                              {getRegionName(state.id)}
                            </div>
                          </div>
                          
                          <p className="text-foreground/80 leading-relaxed">
                            {state.description}
                          </p>
                          
                          <div className="pt-2">
                            <p className="font-medium mb-2">Famous For:</p>
                            <div className="flex flex-wrap gap-2">
                              {state.famousFor.map((item, index) => (
                                <span 
                                  key={index} 
                                  className="px-3 py-1 bg-white/40 dark:bg-white/10 backdrop-blur-sm text-foreground/80 rounded-full text-sm"
                                >
                                  {item}
                                </span>
                              ))}
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                      
                      <Link 
                        to={`/state/${state.id}`} 
                        className="btn-primary w-full justify-center inline-flex items-center"
                      >
                        Explore {state.name} <ArrowRight size={16} className="ml-2" />
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
              <p className="text-foreground/80">No states found for the selected region.</p>
            </div>
          )}
        </ScrollReveal>
      </div>
    </section>
  );
};

export default States;
