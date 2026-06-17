
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import ScrollReveal from '@/components/ui/ScrollReveal';
import { Card, CardContent } from '@/components/ui/card';
import { stateData } from '@/data/stateData';
import { MapPin, ArrowRight, Search, Filter, Heart } from 'lucide-react';
import { motion } from 'framer-motion';
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { regions, getStateRegion } from '@/data/cultural';
import ContentSkeleton, { CardSkeleton } from '@/components/ui/content-skeleton';

const AllStates = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilter, setActiveFilter] = useState('All');
  const [filteredStates, setFilteredStates] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { user, toggleFavoriteState, isAuthenticated } = useAuth();
  const { toast } = useToast();

  // First show the page layout, then load data
  useEffect(() => {
    // Short timeout to let the page layout render first
    const timer = setTimeout(() => {
      let filtered = [...stateData];

      if (activeFilter !== 'All') {
        const region = regions.find(r => r.name.toLowerCase() === activeFilter.toLowerCase());
        if (region) {
          filtered = filtered.filter(state => region.states.includes(state.id));
        }
      }

      const results = filtered.filter((state) => {
        const matchesSearch =
          state.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          state.capital.toLowerCase().includes(searchTerm.toLowerCase()) ||
          state.description.toLowerCase().includes(searchTerm.toLowerCase());

        return matchesSearch;
      });

      results.sort((a, b) => a.name.localeCompare(b.name)); // Sort alphabetically
      setFilteredStates(results);
      setIsLoading(false);
    }, 10);
    
    return () => clearTimeout(timer);
  }, [searchTerm, activeFilter]);

  const handleToggleFavorite = async (e: React.MouseEvent, stateId: string) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (!isAuthenticated) {
      toast({
        title: "Authentication Required",
        description: "Please login to save destinations",
        action: (
          <Button 
            size="sm" 
            variant="outline"
            onClick={() => window.location.href = '/login'}
          >
            Login
          </Button>
        ),
      });
      return;
    }
    
    const result = await toggleFavoriteState(stateId);
    
    if (result.success) {
      toast({
        title: "Success",
        description: result.message,
      });
    } else {
      toast({
        title: "Error",
        description: result.message,
        variant: "destructive",
      });
    }
  };

  const isStateFavorited = (stateId: string) => {
    if (!user || !user.savedStates) return false;
    return user.savedStates.includes(stateId);
  };

  const renderGridSkeleton = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {[...Array(9)].map((_, index) => (
        <CardSkeleton key={index} className="h-[350px]">
          <div className="h-48 bg-gray-200 dark:bg-gray-700 rounded-t-md" />
          <div className="space-y-3 p-4">
            <ContentSkeleton variant="text" width="60%" className="h-5" />
            <ContentSkeleton variant="text" width="40%" className="h-4" />
            <ContentSkeleton variant="text" width="100%" className="h-4 mt-4" />
            <ContentSkeleton variant="text" width="90%" className="h-4" />
            <div className="flex justify-between items-center mt-4 pt-2">
              <ContentSkeleton className="w-24 h-4" />
              <ContentSkeleton className="w-16 h-4" />
            </div>
          </div>
        </CardSkeleton>
      ))}
    </div>
  );

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow pt-20">
        {/* Hero Section */}
        <section className="relative h-[40vh] flex items-center">
          <div 
            className="absolute inset-0 bg-center bg-cover"
            style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1524613032530-449a5d94c285?q=80&w=2070)' }}
          >
            <div className="absolute inset-0 bg-black/50"></div>
          </div>
          <div className="container mx-auto px-6 relative z-10">
            <ScrollReveal priority={true}>
              <h1 className="text-4xl md:text-5xl font-serif text-white mb-4">Explore Indian States</h1>
              <p className="text-white/90 max-w-2xl">
                Discover the rich tapestry of India's diverse states, each with its unique culture, heritage, cuisine, and traditions.
              </p>
            </ScrollReveal>
          </div>
        </section>

        {/* Search and Filter Section */}
        <section className="py-8 px-6 bg-secondary dark:bg-secondary">
          <div className="container mx-auto">
            <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
              <div className="relative w-full md:w-80">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-foreground/60" />
                <input
                  type="text"
                  placeholder="Search states..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="search-box pl-10"
                />
              </div>
              
              <div className="flex items-center gap-2">
                <Filter className="h-4 w-4 text-foreground/70" />
                <span className="text-sm font-medium text-foreground/70">Filter by region:</span>
              </div>
              
              <div className="filter-container">
                {regions.map(region => (
                  <button
                    key={region.name}
                    className={`filter-tag ${activeFilter === region.name ? 'active' : ''}`}
                    onClick={() => setActiveFilter(region.name)}
                  >
                    {region.name}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* States Grid */}
        <section className="py-12 px-6">
          <div className="container mx-auto">
            <ScrollReveal skeleton={renderGridSkeleton()}>
              {isLoading ? (
                renderGridSkeleton()
              ) : filteredStates.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {filteredStates.map((state, index) => (
                    <motion.div
                      key={state.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="h-full"
                    >
                      <Link to={`/state/${state.id}`} className="block h-full">
                        <Card className="overflow-hidden h-full hover:shadow-lg transition-shadow">
                          <div className="relative h-48">
                            {/* Plain <img> with immediate loading, no lazy logic */}
                            <img
                              src={state.bannerImage}
                              alt={state.name}
                              className="w-full h-full object-cover"
                              loading="eager"
                              style={{ borderRadius: "0.5rem" }}
                            />
                            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                              <h3 className="text-white text-xl font-medium">{state.name}</h3>
                            </div>
                            <Button
                              variant="ghost"
                              size="icon"
                              className={cn(
                                "absolute top-2 right-2 rounded-full bg-black/30 backdrop-blur-sm hover:bg-black/50",
                                isStateFavorited(state.id) && "text-rose-400 hover:text-rose-300"
                              )}
                              onClick={(e) => handleToggleFavorite(e, state.id)}
                            >
                              <Heart className={cn(
                                "h-5 w-5",
                                isStateFavorited(state.id) && "fill-current"
                              )} />
                              <span className="sr-only">
                                {isStateFavorited(state.id) ? "Remove from favorites" : "Add to favorites"}
                              </span>
                            </Button>
                          </div>
                          <CardContent className="p-6">
                            <div className="flex items-center text-sm text-muted-foreground mb-4">
                              <MapPin size={16} className="mr-1" />
                              <span>Capital: {state.capital}</span>
                            </div>
                            <p className="line-clamp-3 text-foreground/80 mb-4">
                              {state.description}
                            </p>
                            <div className="mt-auto flex items-center text-spice-500 font-medium">
                              Explore <ArrowRight size={16} className="ml-1" />
                            </div>
                          </CardContent>
                        </Card>
                      </Link>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-16">
                  <h3 className="text-2xl font-medium mb-2">No states found</h3>
                  <p className="text-foreground/70">Try adjusting your search or filter criteria</p>
                </div>
              )}
            </ScrollReveal>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default AllStates;
