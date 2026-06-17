
import React, { useState, useEffect } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import ScrollReveal from '@/components/ui/ScrollReveal';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Card, CardContent } from '@/components/ui/card';
import { MapPin, Search, Image, X, Clock, History, Info, Globe, Filter } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { artForms, ArtForm } from '@/data/cultural/artForms';
import { festivals, Festival } from '@/data/cultural/festivals';
import { heritageSites, HeritageSite } from '@/data/cultural/heritageSites';
import { regions } from '@/data/cultural'; // Import regions

const Culture = () => {
  const [activeTab, setActiveTab] = useState<string>('artForms');
  const [searchTerm, setSearchTerm] = useState('');
  const [activeStateFilter, setActiveStateFilter] = useState('All');
  const [activeRegionFilter, setActiveRegionFilter] = useState('All'); // Add region filter state
  const [selectedArtForm, setSelectedArtForm] = useState<ArtForm | null>(null);
  const [selectedFestival, setSelectedFestival] = useState<Festival | null>(null);
  const [selectedHeritageSite, setSelectedHeritageSite] = useState<HeritageSite | null>(null);

  // Get unique list of states from all art forms
  const states = ['All', ...new Set(artForms.flatMap(art => art.stateNames))];

  const [filteredArtForms, setFilteredArtForms] = useState<ArtForm[]>([]);
  const [filteredFestivals, setFilteredFestivals] = useState(festivals);
  const [filteredHeritageSites, setFilteredHeritageSites] = useState(heritageSites);

  useEffect(() => {
    let filteredArts = [...artForms];
    let filteredFests = [...festivals];
    let filteredSites = [...heritageSites];

    if (activeRegionFilter !== 'All') {
      const region = regions.find(r => r.name.toLowerCase() === activeRegionFilter.toLowerCase());
      if (region) {
        filteredArts = filteredArts.filter(art => art.regionName.toLowerCase() === activeRegionFilter.toLowerCase() || 
                                                 art.regionId === 'all-india');
        filteredFests = filteredFests.filter(festival => region.states.includes(festival.stateId));
        filteredSites = filteredSites.filter(site => region.states.includes(site.stateId));
      }
    }

    filteredArts = filteredArts.filter(art => {
      const matchesSearch = art.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                            art.stateNames.some(state => state.toLowerCase().includes(searchTerm.toLowerCase()));
      const matchesState = activeStateFilter === 'All' || art.stateNames.includes(activeStateFilter);
      return matchesSearch && matchesState;
    });

    filteredFests = filteredFests.filter(festival => {
      const matchesSearch = festival.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                            festival.stateName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            (festival.description && festival.description.toLowerCase().includes(searchTerm.toLowerCase()));
      const matchesState = activeStateFilter === 'All' || festival.stateName === activeStateFilter;
      return matchesSearch && matchesState;
    });

    filteredSites = filteredSites.filter(site => {
      const matchesSearch = site.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                            site.stateName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            (site.description && site.description.toLowerCase().includes(searchTerm.toLowerCase()));
      const matchesState = activeStateFilter === 'All' || site.stateName === activeStateFilter;
      return matchesSearch && matchesState;
    });

    filteredArts.sort((a, b) => a.name.localeCompare(b.name)); // Sort alphabetically
    filteredFests.sort((a, b) => a.name.localeCompare(b.name)); // Sort alphabetically
    filteredSites.sort((a, b) => a.name.localeCompare(b.name)); // Sort alphabetically

    setFilteredArtForms(filteredArts);
    setFilteredFestivals(filteredFests);
    setFilteredHeritageSites(filteredSites);
  }, [searchTerm, activeStateFilter, activeRegionFilter]); 

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow pt-20">
        <section className="relative h-[40vh] flex items-center">
          <div 
            className="absolute inset-0 bg-center bg-cover"
            style={{ backgroundImage: 'url(https://kuwaitcarnaticmusicforum.wordpress.com/wp-content/uploads/2017/12/cropped-poster-plain1.jpg)' }}
          >
            <div className="absolute inset-0 bg-black/50"></div>
          </div>
          <div className="container mx-auto px-6 relative z-10">
            <ScrollReveal>
              <h1 className="text-4xl md:text-5xl font-serif text-white mb-4">Indian Culture</h1>
              <p className="text-white/90 max-w-2xl">
                Explore the rich tapestry of India's diverse cultural heritage, from ancient arts and traditions to modern-day celebrations.
              </p>
            </ScrollReveal>
          </div>
        </section>

        <section className="py-8 px-6 bg-secondary/80 backdrop-blur-sm dark:bg-secondary/20">
          <div className="container mx-auto">
            <div className="flex flex-col gap-6">
              <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
                <div className="relative w-full md:w-80">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-foreground/60" />
                  <input
                    type="text"
                    placeholder="Search cultural elements..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="search-box pl-10 w-full rounded-md border border-input bg-background/70 backdrop-blur-sm px-3 py-2 text-sm ring-offset-background"
                  />
                </div>
                
                <div className="filter-container flex flex-wrap gap-2">
                  {/* Region Filter */}
                  <div className="flex items-center gap-2">
                    <Filter className="h-4 w-4 text-foreground/70" />
                    <span className="text-sm font-medium text-foreground/70">Filter by region:</span>
                  </div>
                  {regions.map(region => (
                    <button
                      key={region.name}
                      className={`filter-tag ${activeRegionFilter === region.name ? 'active' : ''}`}
                      onClick={() => setActiveRegionFilter(region.name)}
                    >
                      {region.name}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 px-6">
          <div className="container mx-auto">
            <ScrollReveal>
              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="w-full flex mb-8 bg-transparent p-0 space-x-2 overflow-x-auto">
                  <TabsTrigger 
                    value="artForms"
                    className="px-6 py-3 data-[state=active]:bg-spice-50 dark:data-[state=active]:bg-spice-900/30 data-[state=active]:text-spice-600 dark:data-[state=active]:text-spice-400 data-[state=active]:border-b-2 data-[state=active]:border-spice-500 data-[state=active]:shadow-none rounded-none"
                  >
                    Art Forms
                  </TabsTrigger>
                  <TabsTrigger 
                    value="festivals"
                    className="px-6 py-3 data-[state=active]:bg-spice-50 dark:data-[state=active]:bg-spice-900/30 data-[state=active]:text-spice-600 dark:data-[state=active]:text-spice-400 data-[state=active]:border-b-2 data-[state=active]:border-spice-500 data-[state=active]:shadow-none rounded-none"
                  >
                    Festivals
                  </TabsTrigger>
                  <TabsTrigger 
                    value="heritage"
                    className="px-6 py-3 data-[state=active]:bg-spice-50 dark:data-[state=active]:bg-spice-900/30 data-[state=active]:text-spice-600 dark:data-[state=active]:text-spice-400 data-[state=active]:border-b-2 data-[state=active]:border-spice-500 data-[state=active]:shadow-none rounded-none"
                  >
                    Heritage Sites
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="artForms" className="mt-0">
                  {filteredArtForms.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      {filteredArtForms.map((art, index) => (
                        <motion.div
                          key={art.id}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.05 }}
                        >
                          <Card 
                            className="overflow-hidden hover:shadow-lg transition-shadow h-full cursor-pointer bg-card/80 backdrop-blur-sm border-white/10"
                            onClick={() => setSelectedArtForm(art)}
                          >
                            <div className="h-48 overflow-hidden">
                              <img 
                                src={art.image} 
                                alt={art.name}
                                className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                              />
                            </div>
                            <CardContent className="p-6">
                              <h3 className="text-xl font-medium mb-3">{art.name}</h3>
                              <div className="flex items-center text-sm text-muted-foreground">
                                <MapPin size={16} className="mr-1" />
                                <span>
                                  {art.stateNames.length > 1 
                                    ? `${art.stateNames[0]} and ${art.stateNames.length - 1} more` 
                                    : art.stateNames[0]}
                                </span>
                              </div>
                              {art.regionName && (
                                <div className="flex items-center text-sm text-muted-foreground mt-1">
                                  <Globe size={16} className="mr-1" />
                                  <span>{art.regionName}</span>
                                </div>
                              )}
                            </CardContent>
                          </Card>
                        </motion.div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-12">
                      <Image className="mx-auto h-12 w-12 text-muted-foreground/50 mb-4" />
                      <h3 className="text-xl font-medium mb-2">No art forms found</h3>
                      <p className="text-muted-foreground">Try adjusting your search or filter</p>
                    </div>
                  )}
                </TabsContent>

                <TabsContent value="festivals" className="mt-0">
                  {filteredFestivals.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {filteredFestivals.map((festival, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.05 }}
                        >
                          <Card 
                            className="overflow-hidden hover:shadow-lg transition-shadow h-full cursor-pointer bg-card/80 backdrop-blur-sm border-white/10" 
                            onClick={() => setSelectedFestival(festival)}
                          >
                            <div className="h-48 overflow-hidden">
                              <img 
                                src={festival.image} 
                                alt={festival.name}
                                className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                              />
                            </div>
                            <CardContent className="p-6">
                              <h3 className="text-xl font-medium mb-2">{festival.name}</h3>
                              <div className="flex items-center text-sm text-muted-foreground mb-3">
                                <MapPin size={16} className="mr-1" />
                                <span>{festival.stateName}</span>
                              </div>
                              <p className="text-sm font-medium text-foreground/70 mb-3">{festival.timing}</p>
                              <p className="text-foreground/80">{festival.description}</p>
                            </CardContent>
                          </Card>
                        </motion.div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-12">
                      <Image className="mx-auto h-12 w-12 text-muted-foreground/50 mb-4" />
                      <h3 className="text-xl font-medium mb-2">No festivals found</h3>
                      <p className="text-muted-foreground">Try adjusting your search or filter</p>
                    </div>
                  )}
                </TabsContent>

                <TabsContent value="heritage" className="mt-0">
                  {filteredHeritageSites.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {filteredHeritageSites.map((site, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.05 }}
                        >
                          <Card 
                            className="overflow-hidden hover:shadow-lg transition-shadow h-full cursor-pointer bg-card/80 backdrop-blur-sm border-white/10"
                            onClick={() => setSelectedHeritageSite(site)}
                          >
                            <div className="h-48 overflow-hidden">
                              <img 
                                src={site.image} 
                                alt={site.name}
                                className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                              />
                            </div>
                            <CardContent className="p-6">
                              <h3 className="text-xl font-medium mb-2">{site.name}</h3>
                              <div className="flex items-center text-sm text-muted-foreground mb-3">
                                <MapPin size={16} className="mr-1" />
                                <span>{site.location}, {site.stateName}</span>
                              </div>
                              <p className="text-foreground/80">{site.description}</p>
                            </CardContent>
                          </Card>
                        </motion.div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-12">
                      <Image className="mx-auto h-12 w-12 text-muted-foreground/50 mb-4" />
                      <h3 className="text-xl font-medium mb-2">No heritage sites found</h3>
                      <p className="text-muted-foreground">Try adjusting your search or filter</p>
                    </div>
                  )}
                </TabsContent>
              </Tabs>
            </ScrollReveal>
          </div>
        </section>
      </main>

      {/* Art Forms Modal */}
      <AnimatePresence>
        {selectedArtForm && (
          <motion.div 
            className="fixed inset-0 bg-black/70 dark:bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedArtForm(null)}
          >
            <motion.div 
              className="bg-background/90 backdrop-blur-md rounded-lg w-full max-w-4xl max-h-[90vh] overflow-y-auto border border-white/10"
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative h-72 sm:h-80 md:h-96 overflow-hidden">
                <img 
                  src={selectedArtForm.image || "https://images.unsplash.com/photo-1576487236230-eaa4afe68192?q=80&w=1170"}
                  alt={selectedArtForm.name}
                  className="w-full h-full object-cover"
                />
                <button 
                  className="absolute top-4 right-4 bg-black/50 rounded-full p-2 text-white"
                  onClick={() => setSelectedArtForm(null)}
                >
                  <X size={20} />
                </button>
                <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent">
                  <h2 className="text-3xl font-serif text-white">{selectedArtForm.name}</h2>
                  <p className="text-white/80 flex items-center">
                    <MapPin size={16} className="mr-1" />
                    {selectedArtForm.stateNames.join(', ')}
                  </p>
                  {selectedArtForm.regionName && (
                    <p className="text-white/80 flex items-center mt-1">
                      <Globe size={16} className="mr-1" />
                      {selectedArtForm.regionName}
                    </p>
                  )}
                </div>
              </div>
              
              <div className="p-6 md:p-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                  <div className="bg-secondary/50 backdrop-blur-sm p-4 rounded-lg flex flex-col items-center justify-center">
                    <Globe className="text-spice-500 mb-2" size={24} />
                    <h3 className="text-lg font-medium">Region</h3>
                    <p className="text-center">{selectedArtForm.regionName}</p>
                  </div>
                  
                  <div className="bg-secondary/50 backdrop-blur-sm p-4 rounded-lg flex flex-col items-center justify-center">
                    <Clock className="text-spice-500 mb-2" size={24} />
                    <h3 className="text-lg font-medium">Started</h3>
                    <p className="text-center">{selectedArtForm.history?.started || "Ancient times"}</p>
                  </div>
                  
                  <div className="bg-secondary/50 backdrop-blur-sm p-4 rounded-lg flex flex-col items-center justify-center">
                    <History className="text-spice-500 mb-2" size={24} />
                    <h3 className="text-lg font-medium">Golden Period</h3>
                    <p className="text-center">{selectedArtForm.history?.goldenPeriod || "17th-19th century"}</p>
                  </div>
                </div>
                
                <div className="mb-8">
                  <h3 className="text-xl font-medium mb-4 flex items-center">
                    <Info className="mr-2 text-spice-500" size={20} />
                    Information
                  </h3>
                  <p className="text-foreground/80 leading-relaxed">
                    {selectedArtForm.description}
                  </p>
                </div>
                
                <div className="mb-8">
                  <h3 className="text-xl font-medium mb-4">Current Status</h3>
                  <p className="text-foreground/80 leading-relaxed bg-secondary/30 backdrop-blur-sm p-4 rounded-lg">
                    {selectedArtForm.history?.currentStatus || "Being preserved through cultural programs and practiced by dedicated artists."}
                  </p>
                </div>
                
                {selectedArtForm.additionalImages && selectedArtForm.additionalImages.length > 0 && (
                  <div>
                    <h3 className="text-xl font-medium mb-4">Gallery</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {selectedArtForm.additionalImages.map((img, idx) => (
                        <div key={idx} className="rounded-lg overflow-hidden h-48">
                          <img 
                            src={img} 
                            alt={`${selectedArtForm.name} - image ${idx + 1}`} 
                            className="w-full h-full object-cover hover:scale-105 transition-transform"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Festivals Modal */}
      <AnimatePresence>
        {selectedFestival && (
          <motion.div 
            className="fixed inset-0 bg-black/70 dark:bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedFestival(null)}
          >
            <motion.div 
              className="bg-background/90 backdrop-blur-md rounded-lg w-full max-w-4xl max-h-[90vh] overflow-y-auto border border-white/10"
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative h-72 sm:h-80 md:h-96 overflow-hidden">
                <img 
                  src={selectedFestival.image}
                  alt={selectedFestival.name}
                  className="w-full h-full object-cover"
                />
                <button 
                  className="absolute top-4 right-4 bg-black/50 rounded-full p-2 text-white"
                  onClick={() => setSelectedFestival(null)}
                >
                  <X size={20} />
                </button>
                <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent">
                  <h2 className="text-3xl font-serif text-white">{selectedFestival.name}</h2>
                  <p className="text-white/80 flex items-center">
                    <MapPin size={16} className="mr-1" />
                    {selectedFestival.stateName}
                  </p>
                  <p className="text-white/80 flex items-center mt-1">
                    <Clock size={16} className="mr-1" />
                    {selectedFestival.timing}
                  </p>
                </div>
              </div>
              
              <div className="p-6 md:p-8">
                <div className="mb-8">
                  <h3 className="text-xl font-medium mb-4 flex items-center">
                    <Info className="mr-2 text-spice-500" size={20} />
                    About the Festival
                  </h3>
                  <p className="text-foreground/80 leading-relaxed">
                    {selectedFestival.description}
                  </p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  <div className="bg-secondary/50 backdrop-blur-sm p-6 rounded-lg">
                    <h3 className="text-lg font-medium mb-3 flex items-center">
                      <Clock className="mr-2 text-spice-500" size={20} />
                      When it's Celebrated
                    </h3>
                    <p className="text-foreground/80">{selectedFestival.timing}</p>
                  </div>
                  
                  <div className="bg-secondary/50 backdrop-blur-sm p-6 rounded-lg">
                    <h3 className="text-lg font-medium mb-3 flex items-center">
                      <MapPin className="mr-2 text-spice-500" size={20} />
                      Where it's Celebrated
                    </h3>
                    <p className="text-foreground/80">{selectedFestival.stateName}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Heritage Sites Modal */}
      <AnimatePresence>
        {selectedHeritageSite && (
          <motion.div 
            className="fixed inset-0 bg-black/70 dark:bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedHeritageSite(null)}
          >
            <motion.div 
              className="bg-background/90 backdrop-blur-md rounded-lg w-full max-w-4xl max-h-[90vh] overflow-y-auto border border-white/10"
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative h-72 sm:h-80 md:h-96 overflow-hidden">
                <img 
                  src={selectedHeritageSite.image}
                  alt={selectedHeritageSite.name}
                  className="w-full h-full object-cover"
                />
                <button 
                  className="absolute top-4 right-4 bg-black/50 rounded-full p-2 text-white"
                  onClick={() => setSelectedHeritageSite(null)}
                >
                  <X size={20} />
                </button>
                <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent">
                  <h2 className="text-3xl font-serif text-white">{selectedHeritageSite.name}</h2>
                  <p className="text-white/80 flex items-center">
                    <MapPin size={16} className="mr-1" />
                    {selectedHeritageSite.location}, {selectedHeritageSite.stateName}
                  </p>
                </div>
              </div>
              
              <div className="p-6 md:p-8">
                <div className="mb-8">
                  <h3 className="text-xl font-medium mb-4 flex items-center">
                    <Info className="mr-2 text-spice-500" size={20} />
                    About the Site
                  </h3>
                  <p className="text-foreground/80 leading-relaxed">
                    {selectedHeritageSite.description}
                  </p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-secondary/50 backdrop-blur-sm p-6 rounded-lg">
                    <h3 className="text-lg font-medium mb-3 flex items-center">
                      <MapPin className="mr-2 text-spice-500" size={20} />
                      Location
                    </h3>
                    <p className="text-foreground/80">{selectedHeritageSite.location}</p>
                  </div>
                  
                  <div className="bg-secondary/50 backdrop-blur-sm p-6 rounded-lg">
                    <h3 className="text-lg font-medium mb-3 flex items-center">
                      <Globe className="mr-2 text-spice-500" size={20} />
                      State
                    </h3>
                    <p className="text-foreground/80">{selectedHeritageSite.stateName}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <Footer />
    </div>
  );
};

export default Culture;