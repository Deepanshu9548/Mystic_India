
import React, { useState } from 'react';
import ScrollReveal from '../ui/ScrollReveal';
import { Calendar as CalendarIcon, Map, ArrowRight, Play } from 'lucide-react';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";
import { cn } from '@/lib/utils';

type TourType = {
  id: number;
  title: string;
  location: string;
  description: string;
  duration: string;
  thumbnailUrl: string;
  videoUrl: string;
};

const VirtualTours: React.FC = () => {
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [activeVideo, setActiveVideo] = useState<TourType | null>(null);

  const tours: TourType[] = [
    {
      id: 1,
      title: "Golden Triangle Heritage Tour",
      location: "Delhi, Agra, Jaipur",
      description: "Experience the iconic Golden Triangle route connecting Delhi, Agra and Jaipur through immersive 360° virtual tours of historic monuments and vibrant markets.",
      duration: "90 mins",
      thumbnailUrl: "https://images.unsplash.com/photo-1548013146-72479768bfcb?q=80&w=2076",
      videoUrl: "https://www.youtube.com/embed/rFFKoEijIto"
    },
    {
      id: 2,
      title: "Varanasi Spiritual Journey",
      location: "Varanasi, Uttar Pradesh",
      description: "Explore the ancient city of Varanasi, witnessing the spiritual rituals along the sacred Ganges River and the city's intricate maze of narrow streets.",
      duration: "75 mins",
      thumbnailUrl: "https://images.unsplash.com/photo-1561361058-c24cecae35ca?q=80&w=2070",
      videoUrl: "https://www.youtube.com/embed/RjhoRGZ4HUw"
    },
    {
      id: 3,
      title: "Kerala Backwater Experience",
      location: "Alleppey, Kerala",
      description: "Drift through the peaceful backwaters of Kerala on a virtual houseboat tour, experiencing local village life and the region's natural beauty.",
      duration: "60 mins",
      thumbnailUrl: "https://images.unsplash.com/photo-1609941233572-902b658659eb?q=80&w=1974",
      videoUrl: "https://www.youtube.com/embed/6Vm8MsCaRgo"
    },
  ];

  const handleOpenVideo = (tour: TourType) => {
    setActiveVideo(tour);
    document.body.style.overflow = 'hidden';
  };

  const handleCloseVideo = () => {
    setActiveVideo(null);
    document.body.style.overflow = 'auto';
  };

  return (
    <section id="virtual-tours" className="py-24 px-6 bg-mystic-50">
      <div className="container mx-auto">
        {/* Section Header */}
        <ScrollReveal>
          <div className="text-center mb-16">
            <p className="subtitle mb-3">Experience India</p>
            <h2 className="section-title after:left-1/2 after:-translate-x-1/2">
              Virtual Cultural Tours
            </h2>
            <p className="mt-8 max-w-2xl mx-auto text-foreground/70">
              Embark on immersive virtual journeys through India's most iconic locations,
              guided by expert storytellers who bring history and traditions to life.
            </p>
          </div>
        </ScrollReveal>

        {/* Tour Booking CTA */}
        <ScrollReveal>
          <div className="bg-white p-8 rounded-xl shadow-sm mb-16 border border-mystic-100">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
              <div className="md:col-span-2">
                <h3 className="text-xl font-serif font-medium mb-3">Schedule Your Live Virtual Tour</h3>
                <p className="text-foreground/70 mb-4">
                  Join our expert guides for live interactive virtual tours featuring real-time Q&A and personalized cultural insights.
                </p>
              </div>
              
              <div className="flex flex-col space-y-4">
                <Popover>
                  <PopoverTrigger asChild>
                    <button
                      className={cn(
                        "w-full justify-start text-left font-normal btn-outline flex items-center",
                        !date && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {date ? format(date, "PPP") : <span>Pick a date</span>}
                    </button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={date}
                      onSelect={setDate}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                
                <button className="btn-primary w-full justify-center">
                  Book Now
                </button>
              </div>
            </div>
          </div>
        </ScrollReveal>

        {/* Available Tours */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {tours.map((tour, index) => (
            <ScrollReveal key={tour.id} delay={index + 2}>
              <div className="bg-white rounded-xl overflow-hidden border border-mystic-100 shadow-sm hover:shadow-md transition-all h-full flex flex-col">
                <div className="relative h-48 overflow-hidden cursor-pointer group" onClick={() => handleOpenVideo(tour)}>
                  <img 
                    src={tour.thumbnailUrl} 
                    alt={tour.title} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="w-16 h-16 rounded-full bg-white/80 flex items-center justify-center">
                      <Play className="h-6 w-6 text-spice-600 fill-spice-600" />
                    </div>
                  </div>
                  <div className="absolute top-4 right-4 bg-white/80 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-medium">
                    {tour.duration}
                  </div>
                </div>
                
                <div className="p-6 flex flex-col flex-grow">
                  <div className="flex items-center text-foreground/70 mb-2 text-sm">
                    <Map size={16} className="mr-1" />
                    {tour.location}
                  </div>
                  <h3 className="text-xl font-serif font-medium mb-2">{tour.title}</h3>
                  <p className="text-foreground/70 mb-6 flex-grow">{tour.description}</p>
                  
                  <button 
                    onClick={() => handleOpenVideo(tour)}
                    className="inline-flex items-center text-spice-500 font-medium hover:text-spice-600 transition-colors"
                  >
                    Start Virtual Tour <ArrowRight size={16} className="ml-1" />
                  </button>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>

        {/* Video Modal */}
        {activeVideo && (
          <div 
            className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
            onClick={handleCloseVideo}
          >
            <div 
              className="max-w-4xl w-full bg-white rounded-xl overflow-hidden"
              onClick={e => e.stopPropagation()}
            >
              <div className="aspect-video w-full">
                <iframe 
                  src={activeVideo.videoUrl} 
                  title={activeVideo.title}
                  className="w-full h-full"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-medium mb-2">{activeVideo.title}</h3>
                <p className="text-foreground/70">{activeVideo.description}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default VirtualTours;
