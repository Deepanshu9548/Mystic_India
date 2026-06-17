
import React from 'react';
import { Sun, Moon, Clock } from 'lucide-react';
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { toast } from '@/hooks/use-toast';
import { stateData } from '@/data/stateData';
import { motion } from 'framer-motion';

interface AIAssistantTimeOptionsProps {
  selectedTimeOfDay: 'morning' | 'afternoon' | 'evening' | 'night';
  setSelectedTimeOfDay: React.Dispatch<React.SetStateAction<'morning' | 'afternoon' | 'evening' | 'night'>>;
  currentJourney: any;
  onComplete: (journeyData: any) => void;
}

const AIAssistantTimeOptions: React.FC<AIAssistantTimeOptionsProps> = ({
  selectedTimeOfDay,
  setSelectedTimeOfDay,
  currentJourney,
  onComplete
}) => {
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
        
        // Update the itinerary with the new time preference
        if (currentJourney.itinerary) {
          const updatedItinerary = currentJourney.itinerary.map((day: any) => ({
            ...day,
            timeOfDay: value,
            activities: day[`${value}Activities`] || day.activities
          }));
          
          const updatedJourney = {
            ...currentJourney,
            itinerary: updatedItinerary
          };
          
          onComplete(updatedJourney);
        }
      }
    }
  };

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
    hidden: { opacity: 0, y: 10 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <motion.div 
      className="p-4 space-y-4"
      initial="hidden"
      animate="show"
      variants={container}
    >
      <motion.h4 variants={item} className="text-lg font-medium">Select Time of Day for Activities</motion.h4>
      <motion.p variants={item} className="text-sm text-muted-foreground">Choose when you prefer to do activities on your journey. This will apply to all days.</motion.p>
      
      <RadioGroup 
        value={selectedTimeOfDay} 
        onValueChange={(value) => handleTimeChange(value as 'morning' | 'afternoon' | 'evening' | 'night')}
        className="grid grid-cols-2 gap-4 mt-4"
      >
        <motion.div 
          variants={item}
          className="flex items-center space-x-2 border rounded-lg p-3 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
          whileHover={{ scale: 1.02, y: -2 }}
        >
          <RadioGroupItem value="morning" id="morning" />
          <Label htmlFor="morning" className="flex items-center gap-2 cursor-pointer">
            <Sun className="h-5 w-5 text-amber-500" />
            <span>Morning</span>
          </Label>
        </motion.div>
        
        <motion.div 
          variants={item}
          className="flex items-center space-x-2 border rounded-lg p-3 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
          whileHover={{ scale: 1.02, y: -2 }}
        >
          <RadioGroupItem value="afternoon" id="afternoon" />
          <Label htmlFor="afternoon" className="flex items-center gap-2 cursor-pointer">
            <Sun className="h-5 w-5 text-orange-500" />
            <span>Afternoon</span>
          </Label>
        </motion.div>
        
        <motion.div 
          variants={item}
          className="flex items-center space-x-2 border rounded-lg p-3 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
          whileHover={{ scale: 1.02, y: -2 }}
        >
          <RadioGroupItem value="evening" id="evening" />
          <Label htmlFor="evening" className="flex items-center gap-2 cursor-pointer">
            <Sun className="h-5 w-5 text-red-500" />
            <span>Evening</span>
          </Label>
        </motion.div>
        
        <motion.div 
          variants={item}
          className="flex items-center space-x-2 border rounded-lg p-3 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
          whileHover={{ scale: 1.02, y: -2 }}
        >
          <RadioGroupItem value="night" id="night" />
          <Label htmlFor="night" className="flex items-center gap-2 cursor-pointer">
            <Moon className="h-5 w-5 text-indigo-500" />
            <span>Night</span>
          </Label>
        </motion.div>
      </RadioGroup>
      
      <motion.div 
        variants={item} 
        className="pt-4 border-t mt-4"
      >
        <p className="text-sm mb-2">Your selection will be instantly applied to all days in your itinerary.</p>
        <div className="p-3 bg-indigo-50 dark:bg-indigo-900/30 rounded-md flex items-center gap-2 text-sm">
          <Clock className="h-4 w-4 text-indigo-600 dark:text-indigo-400" />
          <span className="text-indigo-600 dark:text-indigo-400">
            Current time preference: <strong>{selectedTimeOfDay.charAt(0).toUpperCase() + selectedTimeOfDay.slice(1)}</strong>
          </span>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default AIAssistantTimeOptions;
