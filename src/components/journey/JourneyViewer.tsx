import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { motion } from 'framer-motion';
import { Calendar, Clock, MapPin, Utensils, Paintbrush, Sun, Moon } from 'lucide-react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { rubikRotate, fadeIn } from '@/lib/animations';

interface JourneyViewerProps {
  journey: any;
  enhanced?: boolean;
}

const JourneyViewer: React.FC<JourneyViewerProps> = ({ journey, enhanced = false }) => {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <div className="container mx-auto p-6">
      <motion.div
        className="mb-6 text-center"
        initial="hidden"
        animate="visible"
        variants={rubikRotate()}
      >
        <h1 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
          {journey.title}
        </h1>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <motion.div 
          className="col-span-2"
          variants={fadeIn('right')}
          initial="hidden"
          animate="visible"
        >
          <Card className="border-[#e0d9ff] dark:border-indigo-900/40 shadow-md overflow-hidden h-full">
            <CardHeader className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white">
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                Journey Overview
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex items-start gap-3">
                  <MapPin className="h-5 w-5 text-indigo-500 mt-0.5" />
                  <div>
                    <p className="font-medium">Destination</p>
                    <p className="text-muted-foreground">{journey.destination}</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <Calendar className="h-5 w-5 text-indigo-500 mt-0.5" />
                  <div>
                    <p className="font-medium">Start Date</p>
                    <p className="text-muted-foreground">{journey.date}</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <Clock className="h-5 w-5 text-indigo-500 mt-0.5" />
                  <div>
                    <p className="font-medium">Duration</p>
                    <p className="text-muted-foreground">{journey.duration} days</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="h-5 w-5 text-indigo-500 flex items-center justify-center mt-0.5 font-bold">
                    !
                  </div>
                  <div>
                    <p className="font-medium">Status</p>
                    <p className="text-muted-foreground">{journey.status}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
        
        <motion.div
          variants={fadeIn('left')}
          initial="hidden"
          animate="visible"
        >
          <Card className="border-[#e0d9ff] dark:border-indigo-900/40 shadow-md overflow-hidden h-full">
            <div className="h-32 bg-cover bg-center" style={{ 
              backgroundImage: `url(${journey.imageSrc || 'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?q=80&w=2071&auto=format&fit=crop'})` 
            }}></div>
            <CardContent className="pt-6">
              <h3 className="font-semibold mb-3 text-lg">Journey Highlights</h3>
              {journey.itinerary && journey.itinerary.length > 0 ? (
                <ul className="space-y-2">
                  {journey.itinerary.slice(0, 3).map((day: any, idx: number) => (
                    <li key={idx} className="text-sm text-muted-foreground">
                      • {day.title}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-sm text-muted-foreground">
                  This journey includes visits to top attractions, local cuisine, and cultural experiences.
                </p>
              )}
            </CardContent>
          </Card>
        </motion.div>
      </div>
      
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="space-y-6"
      >
        <h2 className="text-2xl font-semibold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-6">
          Day by Day Itinerary
        </h2>
        
        {journey.itinerary && journey.itinerary.map((day: any, index: number) => (
          <motion.div 
            key={index}
            variants={item}
            className="group"
          >
            <Card className="border-[#e0d9ff] dark:border-indigo-900/40 shadow-md overflow-hidden transition-all duration-300 group-hover:shadow-lg">
              <div className="h-2 bg-gradient-to-r from-indigo-500 to-purple-500"></div>
              <CardContent className="pt-6">
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 text-white">
                      <Calendar className="h-4 w-4" />
                    </div>
                    <h3 className="text-lg font-medium">Day {day.day}: {day.title}</h3>
                  </div>
                  
                  <Tabs defaultValue={day.timeOfDay || "morning"} className="w-full">
                    <TabsList className="w-full grid grid-cols-4 mb-4">
                      <TabsTrigger value="morning" className="flex gap-1 items-center">
                        <Sun className="h-3.5 w-3.5 text-amber-500" />
                        <span>Morning</span>
                      </TabsTrigger>
                      <TabsTrigger value="afternoon" className="flex gap-1 items-center">
                        <Sun className="h-3.5 w-3.5 text-orange-500" />
                        <span>Afternoon</span>
                      </TabsTrigger>
                      <TabsTrigger value="evening" className="flex gap-1 items-center">
                        <Sun className="h-3.5 w-3.5 text-red-500" />
                        <span>Evening</span>
                      </TabsTrigger>
                      <TabsTrigger value="night" className="flex gap-1 items-center">
                        <Moon className="h-3.5 w-3.5 text-indigo-500" />
                        <span>Night</span>
                      </TabsTrigger>
                    </TabsList>
                    
                    <TabsContent value="morning" className="mt-0 space-y-2">
                      <ul className="space-y-1 list-disc list-inside text-gray-700 dark:text-gray-300">
                        {day.morningActivities?.map((activity: string, idx: number) => (
                          <li key={idx}>{activity}</li>
                        ))}
                      </ul>
                    </TabsContent>
                    
                    <TabsContent value="afternoon" className="mt-0 space-y-2">
                      <ul className="space-y-1 list-disc list-inside text-gray-700 dark:text-gray-300">
                        {day.afternoonActivities?.map((activity: string, idx: number) => (
                          <li key={idx}>{activity}</li>
                        ))}
                      </ul>
                    </TabsContent>
                    
                    <TabsContent value="evening" className="mt-0 space-y-2">
                      <ul className="space-y-1 list-disc list-inside text-gray-700 dark:text-gray-300">
                        {day.eveningActivities?.map((activity: string, idx: number) => (
                          <li key={idx}>{activity}</li>
                        ))}
                      </ul>
                    </TabsContent>
                    
                    <TabsContent value="night" className="mt-0 space-y-2">
                      <ul className="space-y-1 list-disc list-inside text-gray-700 dark:text-gray-300">
                        {day.nightActivities?.map((activity: string, idx: number) => (
                          <li key={idx}>{activity}</li>
                        ))}
                      </ul>
                    </TabsContent>
                  </Tabs>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                    {/* Places to Visit */}
                    {day.places && day.places.length > 0 && (
                      <div className="border rounded-lg p-4 space-y-3">
                        <div className="flex items-center gap-2">
                          <MapPin className="h-4 w-4 text-blue-500" />
                          <h4 className="text-sm font-medium">Places to Visit</h4>
                        </div>
                        
                        <ul className="space-y-1 list-disc list-inside text-sm text-gray-600 dark:text-gray-400">
                          {day.places.map((place: string, idx: number) => (
                            <li key={idx}>{place}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                    
                    {/* Cuisine */}
                    {day.cuisine && day.cuisine.length > 0 && (
                      <div className="border rounded-lg p-4 space-y-3">
                        <div className="flex items-center gap-2">
                          <Utensils className="h-4 w-4 text-green-500" />
                          <h4 className="text-sm font-medium">Local Cuisine</h4>
                        </div>
                        
                        <ul className="space-y-1 list-disc list-inside text-sm text-gray-600 dark:text-gray-400">
                          {day.cuisine.map((item: string, idx: number) => (
                            <li key={idx}>{item}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                    
                    {/* Art Forms */}
                    {day.artForms && day.artForms.length > 0 && (
                      <div className="border rounded-lg p-4 space-y-3">
                        <div className="flex items-center gap-2">
                          <Paintbrush className="h-4 w-4 text-rose-500" />
                          <h4 className="text-sm font-medium">Art & Culture</h4>
                        </div>
                        
                        <ul className="space-y-1 list-disc list-inside text-sm text-gray-600 dark:text-gray-400">
                          {day.artForms.map((item: string, idx: number) => (
                            <li key={idx}>{item}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default JourneyViewer;
