
import React, { useState, useEffect, useRef } from 'react';
import { X, Send, Wand2, Moon, Sun, Clock, Utensils, MapPin, Paintbrush } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { stateData } from '@/data/stateData';
import { JourneyItineraryDay } from '@/components/chatbot/types';
import { CHATBOT_BACKGROUNDS } from '@/components/chatbot/types';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { toast } from '@/hooks/use-toast';
import { artForms, getArtFormsByState } from '@/data/cultural/artForms';
import { getRegionalCuisines } from '@/data/cultural/utils';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface PlannerAIAssistantProps {
  onClose: () => void;
  onComplete: (journeyData: any) => void;
  currentJourney: any;
}

const PlannerAIAssistant: React.FC<PlannerAIAssistantProps> = ({ 
  onClose, 
  onComplete,
  currentJourney
}) => {
  const [input, setInput] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [activeTab, setActiveTab] = useState<'chat' | 'time' | 'customize'>('chat');
  const [selectedTimeOfDay, setSelectedTimeOfDay] = useState<'morning' | 'afternoon' | 'evening' | 'night'>('morning');
  const [selectedState, setSelectedState] = useState<string>(currentJourney?.destination || '');
  const generatedRef = useRef(false);
  const [messages, setMessages] = useState<{text: string, sender: 'user' | 'bot'}[]>([
    {
      text: "Hi there! I'm your AI Journey Assistant. I can help you plan your perfect trip. Tell me where you'd like to go and for how many days, and I'll create a custom itinerary. For example, try 'Plan a 5-day trip to Kerala'.",
      sender: 'bot'
    }
  ]);
  
  useEffect(() => {
    if (currentJourney?.destination && !isGenerating && !generatedRef.current) {
      const stateInfo = stateData.find(state => 
        state.name.toLowerCase() === currentJourney.destination.toLowerCase()
      );
      
      if (stateInfo) {
        setIsGenerating(true);
        generatedRef.current = true;
        setTimeout(() => {
          generateItinerary(currentJourney.duration, stateInfo);
        }, 1000);
      }
    }
  }, [currentJourney]);

  const handleTimeChange = (value: 'morning' | 'afternoon' | 'evening' | 'night') => {
    setSelectedTimeOfDay(value);
    
    if (currentJourney?.destination) {
      const stateInfo = stateData.find(state => 
        state.name.toLowerCase() === currentJourney.destination.toLowerCase()
      );
      
      if (stateInfo) {
        toast({ 
          title: "Updating itinerary",
          description: "Applying new time preferences to your journey."
        });
        generateItinerary(currentJourney.duration, stateInfo, value);
      }
    }
  };

  const handleStateChange = (stateName: string) => {
    setSelectedState(stateName);
    
    const stateInfo = stateData.find(state => state.name === stateName);
    
    if (stateInfo) {
      setMessages(prev => [...prev, {
        text: `I'll help you plan a journey to ${stateName}. How many days would you like to stay?`,
        sender: 'bot'
      }]);
    }
  };

  const handleSend = () => {
    if (!input.trim()) return;
    
    const userMessage = { text: input, sender: 'user' as const };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsGenerating(true);
    
    setTimeout(() => {
      processUserRequest(input);
    }, 500);
  };

  const processUserRequest = (query: string) => {
    const journeyRegex = /(\d+)(?:\s+|\-)?days?(?:\s+(?:in|to|for|at))?\s+([A-Za-z\s]+)/i;
    const stateOnlyRegex = /^(?:visit\s+)?([A-Za-z\s]+)$/i;
    const daysOnlyRegex = /^(\d+)(?:\s+|\-)?days?$/i;
    
    let days: number = currentJourney.duration || 3;
    let destination: string = selectedState || '';
    
    const journeyMatch = query.match(journeyRegex);
    const stateMatch = query.match(stateOnlyRegex);
    const daysMatch = query.match(daysOnlyRegex);
    
    if (journeyMatch) {
      days = parseInt(journeyMatch[1]);
      destination = journeyMatch[2].trim();
    } else if (stateMatch) {
      destination = stateMatch[1].trim();
    } else if (daysMatch && selectedState) {
      days = parseInt(daysMatch[1]);
      destination = selectedState;
    } else {
      setMessages(prev => [...prev, {
        text: "I couldn't understand your request. Please try something like '5 days in Rajasthan' or just 'Kerala'. Or select a state from the dropdown and tell me how many days you'd like to visit.",
        sender: 'bot'
      }]);
      setIsGenerating(false);
      return;
    }
    
    const stateInfo = stateData.find(state => 
      state.name.toLowerCase() === destination.toLowerCase()
    );
    
    if (!stateInfo) {
      setMessages(prev => [...prev, {
        text: `I couldn't find ${destination} in our database. Please try another Indian state or select one from the dropdown.`,
        sender: 'bot'
      }]);
      setIsGenerating(false);
      return;
    }
    
    setSelectedState(stateInfo.name);
    generateItinerary(days, stateInfo);
  };

  const generateItinerary = (days: number, stateInfo: any, timeOfDayOverride?: 'morning' | 'afternoon' | 'evening' | 'night') => {
    setTimeout(() => {
      setMessages(prev => [...prev, {
        text: `Generating a ${days}-day journey to ${stateInfo.name}...`,
        sender: 'bot'
      }]);
      
      const attractions = [
        ...(stateInfo.topAttractions || []),
        ...(stateInfo.beaches || []),
        ...(stateInfo.hillStations || []),
        ...(stateInfo.temples || [])
      ];
      
      const places = attractions.length > 0 
        ? attractions 
        : [`Explore ${stateInfo.name}`, `Visit ${stateInfo.capital}`, 'Local sightseeing', 'Cultural experience'];
      
      const regionId = stateInfo.region?.toLowerCase().replace(' ', '-') || 'north-india';
      const cuisineOptions = getRegionalCuisines(regionId);
      
      const stateId = stateInfo.id || stateInfo.name.toLowerCase().replace(' ', '-');
      const stateArtForms = getArtFormsByState(stateId)
        .map(art => art.name) || ['Traditional Dance', 'Local Music', 'Folk Arts'];
      
      const itinerary: JourneyItineraryDay[] = Array.from({ length: days }, (_, i) => {
        const timeOfDay = timeOfDayOverride || selectedTimeOfDay;
        const shuffledPlaces = [...places].sort(() => 0.5 - Math.random()).slice(0, 3);
        const shuffledCuisine = [...cuisineOptions].sort(() => 0.5 - Math.random()).slice(0, 2);
        const shuffledArtForms = [...stateArtForms].sort(() => 0.5 - Math.random()).slice(0, 2);
        
        const morningActivities = i === 0 
          ? [`Arrive at ${stateInfo.capital || stateInfo.majorCities?.[0] || stateInfo.name}`, 'Check-in to your hotel'] 
          : i === days - 1 
            ? ['Check-out from your hotel', 'Last-minute souvenir shopping'] 
            : [`Morning visit to ${shuffledPlaces[0]}`, 'Breakfast with local delicacies'];
            
        const afternoonActivities = i === 0 
          ? ['Rest and acclimatize', 'Light lunch at the hotel'] 
          : i === days - 1 
            ? ['Visit any remaining attractions nearby', 'Lunch at a popular local restaurant'] 
            : [`Explore ${shuffledPlaces[1] || 'local markets'}`, `Try ${shuffledCuisine[0]} for lunch`];
            
        const eveningActivities = i === 0 
          ? ['Evening stroll to explore the surroundings', 'Welcome dinner'] 
          : i === days - 1 
            ? [`Farewell dinner featuring ${shuffledCuisine[0]}`, `Depart from ${stateInfo.name} with wonderful memories`] 
            : [`Experience ${shuffledArtForms[0]} performance`, 'Evening shopping for souvenirs'];
            
        const nightActivities = i === 0 
          ? ['Relax at the hotel', 'Plan for the days ahead'] 
          : i === days - 1 
            ? ['Pack for departure', 'Final night in the hotel'] 
            : [`Night tour of ${shuffledPlaces[2] || 'illuminated landmarks'}`, 'Traditional music performance'];
        
        let dayTitle = '';
        if (i === 0) {
          dayTitle = `Arrival in ${stateInfo.name}`;
        } else if (i === days - 1) {
          dayTitle = `Departure from ${stateInfo.name}`;
        } else if (stateInfo.beaches && stateInfo.beaches.length > 0 && i % 3 === 0) {
          dayTitle = `Beach Day in ${stateInfo.name}`;
        } else if (stateInfo.hillStations && stateInfo.hillStations.length > 0 && i % 3 === 1) {
          dayTitle = `Mountain Exploration in ${stateInfo.name}`;
        } else if (stateInfo.temples && stateInfo.temples.length > 0 && i % 3 === 2) {
          dayTitle = `Cultural Tour in ${stateInfo.name}`;
        } else {
          dayTitle = `Exploring ${stateInfo.name} - Day ${i + 1}`;
        }
        
        let primaryActivities: string[] = [];
        switch (timeOfDay) {
          case 'morning':
            primaryActivities = morningActivities;
            break;
          case 'afternoon':
            primaryActivities = afternoonActivities;
            break;
          case 'evening':
            primaryActivities = eveningActivities;
            break;
          case 'night':
            primaryActivities = nightActivities;
            break;
        }
        
        return {
          day: i + 1,
          title: dayTitle,
          activities: primaryActivities,
          timeOfDay,
          places: shuffledPlaces,
          cuisine: shuffledCuisine,
          artForms: shuffledArtForms,
          morningActivities,
          afternoonActivities,
          eveningActivities,
          nightActivities
        };
      });
      
      const journeyData = {
        title: `${days}-Day Journey to ${stateInfo.name}`,
        destination: stateInfo.name,
        date: currentJourney.date || new Date().toISOString().split('T')[0],
        duration: days,
        status: 'Upcoming',
        itinerary
      };
      
      setMessages(prev => [...prev, {
        text: `I've created a ${days}-day journey to ${stateInfo.name} for you! It includes places to visit, local cuisine to try, and cultural experiences at different times of the day.`,
        sender: 'bot'
      }]);
      
      setIsGenerating(false);
      
      onComplete(journeyData);
    }, 1500);
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
      <div 
        className="w-full max-w-lg bg-white dark:bg-gray-900 rounded-lg shadow-xl overflow-hidden flex flex-col"
        style={{ maxHeight: '85vh' }}
      >
        <div className="p-4 bg-gradient-to-r from-indigo-600 to-purple-700 text-white flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Wand2 className="h-5 w-5" />
            <h3 className="font-semibold">AI Journey Assistant</h3>
          </div>
          <Button variant="ghost" size="icon" onClick={onClose} className="text-white hover:bg-white/10">
            <X className="h-5 w-5" />
          </Button>
        </div>
        
        <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as 'chat' | 'time' | 'customize')}>
          <TabsList className="w-full bg-gray-100 dark:bg-gray-800 p-0 rounded-none">
            <TabsTrigger value="chat" className="flex-1">Chat</TabsTrigger>
            <TabsTrigger value="time" className="flex-1">Time Options</TabsTrigger>
            <TabsTrigger value="customize" className="flex-1">Customize</TabsTrigger>
          </TabsList>
          
          <TabsContent value="chat" className="p-0 m-0">
            <div className="p-4 bg-gray-50 dark:bg-gray-800 border-b">
              <div className="space-y-2">
                <label className="text-sm font-medium">Select Destination</label>
                <Select 
                  value={selectedState} 
                  onValueChange={handleStateChange}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select a state" />
                  </SelectTrigger>
                  <SelectContent>
                    {stateData.map((state) => (
                      <SelectItem key={state.id} value={state.name}>
                        {state.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div 
              className="h-[300px] sm:h-[400px] overflow-y-auto p-4 space-y-4"
              style={{ 
                backgroundImage: `url(${CHATBOT_BACKGROUNDS.light})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center'
              }}
            >
              {messages.map((message, index) => (
                <div 
                  key={index} 
                  className={`${
                    message.sender === 'user' 
                      ? 'ml-auto bg-gradient-to-r from-indigo-600 to-purple-700 text-white' 
                      : 'mr-auto bg-white/90 dark:bg-gray-800/90 text-gray-800 dark:text-gray-200'
                  } rounded-lg p-3 max-w-[80%] shadow-sm backdrop-blur-sm`}
                >
                  {message.text}
                </div>
              ))}
              
              {isGenerating && (
                <div className="mr-auto bg-white/90 dark:bg-gray-800/90 text-gray-800 dark:text-gray-200 rounded-lg p-3 max-w-[80%] shadow-sm">
                  <div className="flex gap-1">
                    <span className="animate-bounce">●</span>
                    <span className="animate-bounce delay-75">●</span>
                    <span className="animate-bounce delay-150">●</span>
                  </div>
                </div>
              )}
            </div>
          </TabsContent>
          
          <TabsContent value="time" className="p-4 m-0">
            <div className="space-y-4">
              <h4 className="text-lg font-medium">Select Time of Day for Activities</h4>
              <p className="text-sm text-muted-foreground">Choose when you prefer to do activities on your journey. This will apply to all days.</p>
              
              <RadioGroup 
                value={selectedTimeOfDay} 
                onValueChange={(value) => handleTimeChange(value as 'morning' | 'afternoon' | 'evening' | 'night')}
                className="grid grid-cols-2 gap-4"
              >
                <div className="flex items-center space-x-2 border rounded-lg p-3 hover:bg-gray-50 dark:hover:bg-gray-800">
                  <RadioGroupItem value="morning" id="morning" />
                  <Label htmlFor="morning" className="flex items-center gap-2 cursor-pointer">
                    <Sun className="h-5 w-5 text-amber-500" />
                    <span>Morning</span>
                  </Label>
                </div>
                
                <div className="flex items-center space-x-2 border rounded-lg p-3 hover:bg-gray-50 dark:hover:bg-gray-800">
                  <RadioGroupItem value="afternoon" id="afternoon" />
                  <Label htmlFor="afternoon" className="flex items-center gap-2 cursor-pointer">
                    <Sun className="h-5 w-5 text-orange-500" />
                    <span>Afternoon</span>
                  </Label>
                </div>
                
                <div className="flex items-center space-x-2 border rounded-lg p-3 hover:bg-gray-50 dark:hover:bg-gray-800">
                  <RadioGroupItem value="evening" id="evening" />
                  <Label htmlFor="evening" className="flex items-center gap-2 cursor-pointer">
                    <Sun className="h-5 w-5 text-red-500" />
                    <span>Evening</span>
                  </Label>
                </div>
                
                <div className="flex items-center space-x-2 border rounded-lg p-3 hover:bg-gray-50 dark:hover:bg-gray-800">
                  <RadioGroupItem value="night" id="night" />
                  <Label htmlFor="night" className="flex items-center gap-2 cursor-pointer">
                    <Moon className="h-5 w-5 text-indigo-500" />
                    <span>Night</span>
                  </Label>
                </div>
              </RadioGroup>
              
              <div className="pt-4 border-t">
                <p className="text-sm mb-2">Your selection will be instantly applied to all days in your itinerary.</p>
                <div className="p-3 bg-indigo-50 dark:bg-indigo-900/30 rounded-md flex items-center gap-2 text-sm">
                  <Clock className="h-4 w-4 text-indigo-600 dark:text-indigo-400" />
                  <span className="text-indigo-600 dark:text-indigo-400">
                    Current time preference: <strong>{selectedTimeOfDay.charAt(0).toUpperCase() + selectedTimeOfDay.slice(1)}</strong>
                  </span>
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="customize" className="p-4 m-0">
            <div className="space-y-4">
              <h4 className="text-lg font-medium">AI Assistant Settings</h4>
              <p className="text-sm text-muted-foreground mb-4">
                Customize your journey planning experience with these options.
              </p>
              
              <div className="pt-4 border-t">
                <h5 className="font-medium mb-2">Customization Options</h5>
                <div className="grid grid-cols-1 gap-3">
                  <div className="flex items-center gap-2 p-3 border rounded-lg">
                    <div className="bg-purple-100 dark:bg-purple-900/50 p-2 rounded-md">
                      <Clock className="h-4 w-4 text-purple-600 dark:text-purple-400" />
                    </div>
                    <div>
                      <h6 className="font-medium">Time Preferences</h6>
                      <p className="text-xs text-muted-foreground">Set your preferred time of day for activities</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2 p-3 border rounded-lg">
                    <div className="bg-blue-100 dark:bg-blue-900/50 p-2 rounded-md">
                      <MapPin className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div>
                      <h6 className="font-medium">Places to Visit</h6>
                      <p className="text-xs text-muted-foreground">Top attractions added automatically</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2 p-3 border rounded-lg">
                    <div className="bg-green-100 dark:bg-green-900/50 p-2 rounded-md">
                      <Utensils className="h-4 w-4 text-green-600 dark:text-green-400" />
                    </div>
                    <div>
                      <h6 className="font-medium">Cuisine Recommendations</h6>
                      <p className="text-xs text-muted-foreground">Local food specialties included</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2 p-3 border rounded-lg">
                    <div className="bg-rose-100 dark:bg-rose-900/50 p-2 rounded-md">
                      <Paintbrush className="h-4 w-4 text-rose-600 dark:text-rose-400" />
                    </div>
                    <div>
                      <h6 className="font-medium">Cultural Experiences</h6>
                      <p className="text-xs text-muted-foreground">Art forms and cultural activities</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
        
        {activeTab === 'chat' && (
          <div className="p-3 border-t border-gray-200 dark:border-gray-700 flex gap-2">
            <Input
              placeholder="Ask me to plan your journey..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              disabled={isGenerating}
              className="flex-1"
            />
            <Button 
              onClick={handleSend} 
              disabled={isGenerating || !input.trim()}
              className="bg-gradient-to-r from-indigo-600 to-purple-700 hover:from-indigo-700 hover:to-purple-800"
            >
              <Send className="h-5 w-5" />
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default PlannerAIAssistant;
