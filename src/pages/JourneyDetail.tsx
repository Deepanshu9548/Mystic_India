
import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import ScrollReveal from '@/components/ui/ScrollReveal';
import { Calendar, Map, Navigation, Star, ArrowLeft, Clock, Activity, Route, Edit, Share2 } from 'lucide-react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import JourneyTimeline from '@/components/journey/JourneyTimeline';
import JourneyActivities from '@/components/journey/JourneyActivities';
import CabBooking from '@/components/journey/CabBooking';
import { getJourneyById } from '@/data/journeys';
import { useAuth } from '@/context/AuthContext';
import JourneyViewer from '@/components/journey/JourneyViewer';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { stateData } from '@/data/stateData';

const JourneyDetail = () => {
  const { journeyId } = useParams<{ journeyId: string }>();
  const [journey, setJourney] = useState<any | null>(null);
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  useEffect(() => {
    window.scrollTo(0, 0);
    
    // First try to find journey in user trips
    if (journeyId && user && user.trips) {
      const userJourney = user.trips.find((trip: any) => trip.id === parseInt(journeyId));
      if (userJourney) {
        // If we found a user journey, use it
        setJourney({
          ...userJourney,
          title: userJourney.title || userJourney.destination,
          location: userJourney.location || userJourney.destination,
          description: userJourney.description || `Your personal journey to ${userJourney.destination}.`,
          rating: userJourney.rating || "5.0",
          duration: userJourney.duration || 3
        });
        return;
      }
    }
    
    // If not found in user trips, look in predefined journeys
    if (journeyId) {
      const predefinedJourney = getJourneyById(parseInt(journeyId));
      setJourney(predefinedJourney || null);
    }
  }, [journeyId, user]);

  if (!journey) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-medium mb-4">Journey not found</h2>
          <Button onClick={() => navigate('/')} variant="default">Return Home</Button>
        </div>
      </div>
    );
  }

  // Helper to find state info for the journey destination
  const getStateInfo = () => {
    if (!journey.destination) return null;
    return stateData.find(state => 
      state.name.toLowerCase() === journey.destination.toLowerCase()
    );
  };

  const stateInfo = getStateInfo();

  // If this is a user-created journey, use enhanced JourneyViewer component
  if (user && user.trips && user.trips.find((trip: any) => trip.id === parseInt(journeyId || '0'))) {
    return (
      <>
        <Navbar />
        <main className="pt-20 pb-16 min-h-screen">
          <div className="container mx-auto px-4 py-8">
            <div className="flex flex-wrap justify-between items-center mb-6">
              <Link 
                to="/profile" 
                className="flex items-center text-primary hover:underline"
              >
                <ArrowLeft size={18} className="mr-2" /> Back to Profile
              </Link>
              
              <div className="flex gap-2 mt-2 sm:mt-0">
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="border-indigo-400 text-indigo-600 hover:bg-indigo-50 flex items-center gap-1"
                  onClick={() => navigate(`/journey-planner`, { state: { journey } })}
                >
                  <Edit size={16} />
                  <span className="hidden sm:inline-block">Edit Journey</span>
                </Button>
                
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="border-indigo-400 text-indigo-600 hover:bg-indigo-50 flex items-center gap-1"
                  onClick={() => {
                    navigator.clipboard.writeText(window.location.href);
                    toast({
                      title: "Link copied!",
                      description: "Journey link copied to clipboard"
                    });
                  }}
                >
                  <Share2 size={16} />
                  <span className="hidden sm:inline-block">Share</span>
                </Button>
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-950/30 dark:to-purple-950/30 p-6 rounded-xl mb-8 shadow-sm">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="md:col-span-2">
                  <h1 className="text-3xl md:text-4xl font-serif font-medium mb-4 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                    {journey.title}
                  </h1>
                  
                  <p className="text-lg text-gray-700 dark:text-gray-300 mb-6">
                    {journey.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-6">
                    <div className="flex items-center">
                      <Calendar size={18} className="mr-2 text-indigo-600" />
                      <span>Duration: {typeof journey.duration === 'number' ? `${journey.duration} days` : journey.duration}</span>
                    </div>
                    <div className="flex items-center">
                      <Map size={18} className="mr-2 text-indigo-600" />
                      <span>Location: {journey.location || journey.destination}</span>
                    </div>
                    <div className="flex items-center">
                      <Clock size={18} className="mr-2 text-indigo-600" />
                      <span>Date: {journey.date || 'Flexible'}</span>
                    </div>
                  </div>
                </div>
                
                <div className="hidden md:block">
                  <div className="w-full h-60 rounded-lg overflow-hidden">
                    <img 
                      src={journey.imageSrc || stateInfo?.bannerImage || 'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?q=80&w=2071&auto=format&fit=crop'} 
                      alt={journey.title} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </div>
            </div>
            
            <JourneyViewer journey={journey} enhanced={true} />
          </div>
        </main>
        <Footer />
      </>
    );
  }

  // Otherwise use the original detailed view for predefined journeys
  return (
    <div className="min-h-screen">
      <Navbar />
      <main>
        {/* Hero Banner */}
        <section className="relative h-[60vh]">
          <div 
            className="absolute inset-0 bg-center bg-cover" 
            style={{ backgroundImage: `url(${journey.imageSrc})` }}
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
            <ScrollReveal>
              <h1 className="text-white text-5xl md:text-6xl font-serif mb-4">{journey.title}</h1>
              <div className="flex flex-wrap gap-6 text-white">
                <div className="flex items-center">
                  <Map size={18} className="mr-2" />
                  <span>Location: {journey.location}</span>
                </div>
                <div className="flex items-center">
                  <Calendar size={18} className="mr-2" />
                  <span>Duration: {journey.duration}</span>
                </div>
                <div className="flex items-center">
                  <Star size={18} className="mr-2" fill="#FFD700" stroke="#FFD700" />
                  <span>Rating: {journey.rating}/5</span>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* Overview Section */}
        <section className="py-16 px-6">
          <div className="container mx-auto">
            <ScrollReveal>
              <div className="max-w-3xl mx-auto border border-white/20 dark:border-white/10 backdrop-blur-md rounded-lg p-6 bg-white/30 dark:bg-white/10">
                <h2 className="section-title after:left-0 mb-8">Journey Overview</h2>
                <p className="text-lg leading-relaxed mb-8">
                  {journey.description}
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-12">
                  <div className="bg-white/40 dark:bg-white/10 p-4 rounded-lg backdrop-blur-sm">
                    <Clock className="text-spice-500 mb-2" size={24} />
                    <h3 className="font-medium mb-2">Duration</h3>
                    <p className="text-foreground/70">{journey.duration}</p>
                  </div>
                  <div className="bg-white/40 dark:bg-white/10 p-4 rounded-lg backdrop-blur-sm">
                    <Route className="text-spice-500 mb-2" size={24} />
                    <h3 className="font-medium mb-2">Destinations</h3>
                    <p className="text-foreground/70">{journey.location}</p>
                  </div>
                  <div className="bg-white/40 dark:bg-white/10 p-4 rounded-lg backdrop-blur-sm">
                    <Activity className="text-spice-500 mb-2" size={24} />
                    <h3 className="font-medium mb-2">Activities</h3>
                    <p className="text-foreground/70">{journey.activities?.length || 0} activities included</p>
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
              <Tabs defaultValue="timeline" className="max-w-4xl mx-auto">
                <TabsList className="w-full flex mb-8 bg-transparent p-0 space-x-2 overflow-x-auto">
                  <TabsTrigger 
                    value="timeline"
                    className="px-6 py-3 data-[state=active]:bg-spice-50 dark:data-[state=active]:bg-gray-700 data-[state=active]:text-spice-600 dark:data-[state=active]:text-spice-400 data-[state=active]:border-b-2 data-[state=active]:border-spice-500 data-[state=active]:shadow-none rounded-full"
                  >
                    Timeline
                  </TabsTrigger>
                  <TabsTrigger 
                    value="activities"
                    className="px-6 py-3 data-[state=active]:bg-spice-50 dark:data-[state=active]:bg-gray-700 data-[state=active]:text-spice-600 dark:data-[state=active]:text-spice-400 data-[state=active]:border-b-2 data-[state=active]:border-spice-500 data-[state=active]:shadow-none rounded-full"
                  >
                    Activities
                  </TabsTrigger>
                  <TabsTrigger 
                    value="booking"
                    className="px-6 py-3 data-[state=active]:bg-spice-50 dark:data-[state=active]:bg-gray-700 data-[state=active]:text-spice-600 dark:data-[state=active]:text-spice-400 data-[state=active]:border-b-2 data-[state=active]:border-spice-500 data-[state=active]:shadow-none rounded-full"
                  >
                    Book a Cab
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="timeline" className="mt-0">
                  <div className="bg-background dark:bg-gray-800 p-6 rounded-lg shadow-sm">
                    <h3 className="text-xl font-medium mb-4">Journey Timeline</h3>
                    <JourneyTimeline journey={journey} />
                  </div>
                </TabsContent>

                <TabsContent value="activities" className="mt-0">
                  <div className="bg-background dark:bg-gray-800 p-6 rounded-lg shadow-sm">
                    <h3 className="text-xl font-medium mb-4">Activities & Experiences</h3>
                    <JourneyActivities journey={journey} />
                  </div>
                </TabsContent>

                <TabsContent value="booking" className="mt-0">
                  <div className="bg-background dark:bg-gray-800 p-6 rounded-lg shadow-sm">
                    <h3 className="text-xl font-medium mb-4">Book a Cab for Your Journey</h3>
                    <CabBooking journey={journey} />
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

export default JourneyDetail;
