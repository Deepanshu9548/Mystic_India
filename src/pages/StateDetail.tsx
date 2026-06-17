
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import ScrollReveal from '@/components/ui/ScrollReveal';
import { ArrowLeft, MapPin, Users, Calendar, Bookmark, Utensils, Landmark, Music } from 'lucide-react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { stateData } from '@/data/stateData';
import ContentSkeleton, { CardSkeleton } from '@/components/ui/content-skeleton';
import LazyImage from '@/components/ui/lazy-image';

const StateDetail = () => {
  const { stateId } = useParams<{ stateId: string }>();
  const [state, setState] = useState<any | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    window.scrollTo(0, 0);
    
    // Find the state data based on stateId with a slight delay to prioritize layout
    const timer = setTimeout(() => {
      const currentState = stateData.find(s => s.id === stateId);
      setState(currentState || null);
      setIsLoading(false);
    }, 10);
    
    return () => clearTimeout(timer);
  }, [stateId]);

  const renderSkeleton = () => (
    <>
      {/* Banner Skeleton */}
      <section className="relative h-[60vh]">
        <div className="absolute inset-0 bg-gray-300 dark:bg-gray-700 animate-pulse"></div>
        <div className="container mx-auto h-full relative z-10 flex flex-col justify-end pb-16 px-6">
          <div className="space-y-4">
            <ContentSkeleton className="h-12 w-1/2" />
            <div className="flex flex-wrap gap-6">
              <ContentSkeleton className="h-6 w-32" />
              <ContentSkeleton className="h-6 w-48" />
              <ContentSkeleton className="h-6 w-40" />
            </div>
          </div>
        </div>
      </section>
      
      {/* Overview Skeleton */}
      <section className="py-16 px-6">
        <div className="container mx-auto">
          <div className="max-w-3xl mx-auto border border-white/20 dark:border-white/10 backdrop-blur-md rounded-lg p-6 bg-white/30 dark:bg-white/10">
            <ContentSkeleton className="h-8 w-1/3 mb-8" />
            <div className="space-y-4">
              <ContentSkeleton className="h-4 w-full" />
              <ContentSkeleton className="h-4 w-full" />
              <ContentSkeleton className="h-4 w-3/4" />
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12">
              {[...Array(4)].map((_, i) => (
                <CardSkeleton key={i} className="h-40" />
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );

  if (isLoading) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <main>
          {renderSkeleton()}
        </main>
        <Footer />
      </div>
    );
  }

  if (!state) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-medium mb-4">State not found</h2>
          <Link to="/" className="btn-primary">Return Home</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Navbar />
      <main>
        {/* Hero Banner */}
        <section className="relative h-[60vh]">
          <div 
            className="absolute inset-0 bg-center bg-cover" 
            style={{ backgroundImage: `url(${state.bannerImage})` }}
          >
            <div className="absolute inset-0 bg-black/40"></div>
          </div>
          <div className="container mx-auto h-full relative z-10 flex flex-col justify-end pb-16 px-6">
            <Link 
              to="/" 
              className="absolute top-8 left-6 text-white flex items-center hover:underline"
            >
              <ArrowLeft size={18} className="mr-2" /> Back to Home
            </Link>
            <ScrollReveal priority={true}>
              <h1 className="text-white text-5xl md:text-6xl font-serif mb-4">{state.name}</h1>
              <div className="flex flex-wrap gap-6 text-white">
                <div className="flex items-center">
                  <MapPin size={18} className="mr-2" />
                  <span>Capital: {state.capital}</span>
                </div>
                <div className="flex items-center">
                  <Users size={18} className="mr-2" />
                  <span>Population: {state.population}</span>
                </div>
                <div className="flex items-center">
                  <Calendar size={18} className="mr-2" />
                  <span>Languages: {state.language}</span>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* Overview Section */}
        <section className="py-16 px-6">
          <div className="container mx-auto">
            <ScrollReveal priority={true}>
              <div className="max-w-3xl mx-auto border border-white/20 dark:border-white/10 backdrop-blur-md rounded-lg p-6 bg-white/30 dark:bg-white/10">
                <h2 className="section-title after:left-0 mb-8">Overview</h2>
                <p className="text-lg leading-relaxed mb-8">
                  {state.description}
                </p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12">
                  <div className="bg-white/40 dark:bg-white/10 p-4 rounded-lg backdrop-blur-sm">
                    <Landmark className="text-spice-500 mb-2" size={24} />
                    <h3 className="font-medium mb-2">Region</h3>
                    <p className="text-foreground/70">{state.region}</p>
                  </div>
                  <div className="bg-white/40 dark:bg-white/10 p-4 rounded-lg backdrop-blur-sm">
                    <Bookmark className="text-spice-500 mb-2" size={24} />
                    <h3 className="font-medium mb-2">Established</h3>
                    <p className="text-foreground/70">{state.established}</p>
                  </div>
                  <div className="bg-white/40 dark:bg-white/10 p-4 rounded-lg backdrop-blur-sm">
                    <Music className="text-spice-500 mb-2" size={24} />
                    <h3 className="font-medium mb-2">Art Forms</h3>
                    <p className="text-foreground/70">{state.artForms}</p>
                  </div>
                  <div className="bg-white/40 dark:bg-white/10 p-4 rounded-lg backdrop-blur-sm">
                    <Utensils className="text-spice-500 mb-2" size={24} />
                    <h3 className="font-medium mb-2">Cuisine</h3>
                    <p className="text-foreground/70">{state.cuisineType}</p>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* Tabs Section */}
        <section className="py-16 px-6 bg-white/40 dark:bg-white/10 backdrop-blur-sm rounded-lg">
          <div className="container mx-auto">
            <ScrollReveal>
              <Tabs defaultValue="culture" className="max-w-4xl mx-auto">
                <TabsList className="w-full flex mb-8 bg-transparent p-0 space-x-2 overflow-x-auto">
                  <TabsTrigger 
                    value="culture"
                    className="px-6 py-3 data-[state=active]:bg-spice-50 dark:data-[state=active]:bg-gray-700 data-[state=active]:text-spice-600 dark:data-[state=active]:text-spice-400 data-[state=active]:border-b-2 data-[state=active]:border-spice-500 data-[state=active]:shadow-none rounded-full"
                  >
                    Culture & Traditions
                  </TabsTrigger>
                  <TabsTrigger 
                    value="cuisine"
                    className="px-6 py-3 data-[state=active]:bg-spice-50 dark:data-[state=active]:bg-gray-700 data-[state=active]:text-spice-600 dark:data-[state=active]:text-spice-400 data-[state=active]:border-b-2 data-[state=active]:border-spice-500 data-[state=active]:shadow-none rounded-full"
                  >
                    Cuisine
                  </TabsTrigger>
                  <TabsTrigger 
                    value="festivals"
                    className="px-6 py-3 data-[state=active]:bg-spice-50 dark:data-[state=active]:bg-gray-700 data-[state=active]:text-spice-600 dark:data-[state=active]:text-spice-400 data-[state=active]:border-b-2 data-[state=active]:border-spice-500 data-[state=active]:shadow-none rounded-full"
                  >
                    Festivals & Celebrations
                  </TabsTrigger>
                  <TabsTrigger 
                    value="heritage"
                    className="px-6 py-3 data-[state=active]:bg-spice-50 dark:data-[state=active]:bg-gray-700 data-[state=active]:text-spice-600 dark:data-[state=active]:text-spice-400 data-[state=active]:border-b-2 data-[state=active]:border-spice-500 data-[state=active]:shadow-none rounded-full"
                  >
                    Heritage Sites
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="culture" className="mt-0">
                  <div className="bg-background dark:bg-gray-800 p-6 rounded-lg shadow-sm">
                    <h3 className="text-xl font-medium mb-4">Cultural Heritage</h3>
                    <p className="mb-4">{state.culture?.description || "Information coming soon."}</p>
                    
                    {state.culture?.traditions && (
                      <div className="mt-8">
                        <h4 className="text-lg font-medium mb-3">Traditional Practices</h4>
                        <ul className="list-disc pl-5 space-y-2">
                          {state.culture.traditions.map((tradition: string, index: number) => (
                            <li key={index}>{tradition}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
                      {state.culture?.images?.map((image: string, index: number) => (
                        <div key={index} className="rounded-lg overflow-hidden h-64">
                          <LazyImage 
                            src={image} 
                            alt={`${state.name} cultural image ${index + 1}`} 
                            className="w-full h-full object-cover"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="cuisine" className="mt-0">
                  <div className="bg-background dark:bg-gray-800 p-6 rounded-lg shadow-sm">
                    <h3 className="text-xl font-medium mb-4">Regional Cuisine</h3>
                    <p className="mb-4">{state.cuisine?.description || "Information coming soon."}</p>
                    
                    {state.cuisine?.dishes && (
                      <div className="mt-8">
                        <h4 className="text-lg font-medium mb-3">Famous Dishes</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {state.cuisine.dishes.map((dish: any, index: number) => (
                            <div key={index} className="flex items-start">
                              <div className="w-20 h-20 rounded-md overflow-hidden mr-4 shrink-0">
                                <LazyImage 
                                  src={dish.image || "https://images.unsplash.com/photo-1546069901-ba9599a7e63c"} 
                                  alt={dish.name} 
                                  className="w-full h-full object-cover"
                                />
                              </div>
                              <div>
                                <h5 className="font-medium">{dish.name}</h5>
                                <p className="text-sm text-foreground/70">{dish.description}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </TabsContent>

                <TabsContent value="festivals" className="mt-0">
                  <div className="bg-background dark:bg-gray-800 p-6 rounded-lg shadow-sm">
                    <h3 className="text-xl font-medium mb-4">Festivals & Celebrations</h3>
                    <p className="mb-4">{state.festivals?.description || "Information coming soon."}</p>
                    
                    {state.festivals?.list && (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                        {state.festivals.list.map((festival: any, index: number) => (
                          <div key={index} className="bg-white/40 dark:bg-white/10 p-4 rounded-lg backdrop-blur-sm">
                            <h4 className="font-medium mb-2">{festival.name}</h4>
                            <p className="text-sm text-foreground/70 mb-2">{festival.timing}</p>
                            <p className="text-foreground/80">{festival.description}</p>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </TabsContent>

                <TabsContent value="heritage" className="mt-0">
                  <div className="bg-background dark:bg-gray-800 p-6 rounded-lg shadow-sm">
                    <h3 className="text-xl font-medium mb-4">Heritage Sites</h3>
                    <p className="mb-4">{state.heritage?.description || "Information coming soon."}</p>
                    
                    {state.heritage?.sites && (
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
                        {state.heritage.sites.map((site: any, index: number) => (
                          <div key={index} className="overflow-hidden rounded-lg border border-mystic-100">
                            <div className="h-48">
                              <LazyImage 
                                src={site.image || "https://images.unsplash.com/photo-1599661046289-e31897d36a68"} 
                                alt={site.name} 
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <div className="p-4">
                              <h4 className="font-medium mb-1">{site.name}</h4>
                              <p className="text-sm text-foreground/70 mb-2">{site.location}</p>
                              <p className="text-sm text-foreground/80">{site.description}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </TabsContent>
              </Tabs>
            </ScrollReveal>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default StateDetail;
