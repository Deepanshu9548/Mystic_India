import React, { useEffect, useRef } from 'react';
import { CHATBOT_BACKGROUNDS } from '@/components/chatbot/types';
import { stateData } from '@/data/stateData';
import { toast } from '@/hooks/use-toast';
import { motion, AnimatePresence } from 'framer-motion';

interface AIAssistantChatProps {
  messages: {text: string, sender: 'user' | 'bot'}[];
  isGenerating: boolean;
  setMessages: React.Dispatch<React.SetStateAction<{text: string, sender: 'user' | 'bot'}[]>>;
  currentJourney: any;
  onComplete: (journeyData: any) => void;
  setIsGenerating: React.Dispatch<React.SetStateAction<boolean>>;
}

const AIAssistantChat: React.FC<AIAssistantChatProps> = ({ 
  messages, 
  isGenerating, 
  setMessages, 
  currentJourney,
  onComplete,
  setIsGenerating
}) => {
  // Keep track of whether we've already generated an itinerary to avoid loops
  const hasGeneratedInitialItinerary = useRef(false);
  
  useEffect(() => {
    // Only generate initial itinerary if:
    // 1. We haven't already generated one for this component
    // 2. There's a destination
    // 3. We're not currently generating
    if (!hasGeneratedInitialItinerary.current && 
        currentJourney?.destination && 
        !isGenerating) {
      const stateInfo = stateData.find(state => 
        state.name.toLowerCase() === currentJourney.destination.toLowerCase()
      );
      
      if (stateInfo) {
        setIsGenerating(true);
        hasGeneratedInitialItinerary.current = true; // Mark as generated
        
        setTimeout(() => {
          generateItinerary(currentJourney.duration, stateInfo);
        }, 1000);
      }
    }
  }, [currentJourney, isGenerating]);
  
  const generateItinerary = (days: number, stateInfo: any, timeOfDay: 'morning' | 'afternoon' | 'evening' | 'night' = 'morning') => {
    // Let the user know journey is being generated
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
      .map((art: any) => art.name) || ['Traditional Dance', 'Local Music', 'Folk Arts'];
    
    const itinerary = Array.from({ length: days }, (_, i) => {
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
    
    // Complete journey generation
    onComplete(journeyData);
    setIsGenerating(false);
  };
  
  // These functions would typically be imported from utils
  const getRegionalCuisines = (regionId: string) => {
    // Mock implementation, in a real app this would reference actual data
    const cuisineByRegion: { [key: string]: string[] } = {
      'north-india': ['Butter Chicken', 'Chole Bhature', 'Rajasthani Thali', 'Biryani', 'Kebabs'],
      'south-india': ['Masala Dosa', 'Idli', 'Kerala Fish Curry', 'Appam', 'Hyderabadi Biryani'],
      'east-india': ['Bengali Fish Curry', 'Momos', 'Thukpa', 'Litti Chokha', 'Rasgulla'],
      'west-india': ['Dhokla', 'Pav Bhaji', 'Gujarati Thali', 'Vada Pav', 'Goan Fish Curry'],
      'central-india': ['Poha', 'Jalebi', 'Bhutte Ka Kees', 'Indori Chaat', 'Malpua'],
      'northeast-india': ['Bamboo Shoot Curry', 'Smoked Meat', 'Axone', 'Rice Beer', 'Fish Tenga']
    };
    
    return cuisineByRegion[regionId] || ['Local cuisine', 'Traditional dishes', 'Signature meals', 'Street food'];
  };
  
  const getArtFormsByState = (stateId: string) => {
    // Mock implementation, in a real app this would reference actual data
    const artFormsByState: { [key: string]: {name: string}[] } = {
      'rajasthan': [{ name: 'Ghoomar Dance' }, { name: 'Kathputli Puppetry' }, { name: 'Phad Painting' }],
      'kerala': [{ name: 'Kathakali' }, { name: 'Mohiniyattam' }, { name: 'Kalaripayattu' }],
      'west-bengal': [{ name: 'Rabindra Sangeet' }, { name: 'Chhau Dance' }, { name: 'Patachitra' }],
      'tamil-nadu': [{ name: 'Bharatanatyam' }, { name: 'Carnatic Music' }, { name: 'Tanjore Painting' }],
      'uttar-pradesh': [{ name: 'Kathak' }, { name: 'Banaras Gharana' }, { name: 'Chikankari' }],
      'gujarat': [{ name: 'Garba' }, { name: 'Dandiya Raas' }, { name: 'Bandhani' }],
      'maharashtra': [{ name: 'Lavani' }, { name: 'Tamasha' }, { name: 'Warli Painting' }],
      'manipur': [{ name: 'Manipuri Dance' }, { name: 'Pung Cholom' }, { name: 'Lai Haraoba' }]
    };
    
    return artFormsByState[stateId] || [
      { name: 'Traditional Dance' },
      { name: 'Local Music' },
      { name: 'Folk Arts' }
    ];
  };

  return (
    <div 
      className="h-[400px] sm:h-[400px] overflow-y-auto p-4 space-y-4 bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-950/30 dark:to-purple-950/30"
      style={{ 
        backgroundImage: `url(${CHATBOT_BACKGROUNDS.light})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundBlendMode: 'soft-light'
      }}
    >
      <AnimatePresence initial={false}>
        {messages.map((message, index) => (
          <motion.div 
            key={index} 
            className={`${
              message.sender === 'user' 
                ? 'ml-auto bg-gradient-to-r from-indigo-600 to-purple-700 text-white' 
                : 'mr-auto bg-white/90 dark:bg-gray-800/90 text-gray-800 dark:text-gray-200'
            } rounded-lg p-3 max-w-[80%] shadow-sm backdrop-blur-sm`}
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            {message.text}
          </motion.div>
        ))}
      </AnimatePresence>
      
      {isGenerating && (
        <motion.div 
          className="mr-auto bg-white/90 dark:bg-gray-800/90 text-gray-800 dark:text-gray-200 rounded-lg p-3 max-w-[80%] shadow-sm"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
        >
          <div className="flex gap-1">
            <motion.span 
              animate={{ y: [0, -5, 0] }}
              transition={{ duration: 0.6, repeat: Infinity, repeatDelay: 0.1 }}
              className="text-indigo-600 dark:text-indigo-400"
            >●</motion.span>
            <motion.span 
              animate={{ y: [0, -5, 0] }}
              transition={{ duration: 0.6, repeat: Infinity, repeatDelay: 0.2, delay: 0.1 }}
              className="text-indigo-500 dark:text-indigo-400"
            >●</motion.span>
            <motion.span 
              animate={{ y: [0, -5, 0] }}
              transition={{ duration: 0.6, repeat: Infinity, repeatDelay: 0.3, delay: 0.2 }}
              className="text-indigo-400 dark:text-indigo-400"
            >●</motion.span>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default AIAssistantChat;
