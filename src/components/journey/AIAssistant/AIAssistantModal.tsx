
import React, { useState, useEffect } from 'react';
import { X, Send, Wand2, Moon, Sun, Clock, Utensils, MapPin, Paintbrush } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import AIAssistantChat from './AIAssistantChat';
import AIAssistantTimeOptions from './AIAssistantTimeOptions';
import AIAssistantCustomizeOptions from './AIAssistantCustomizeOptions';
import { motion, AnimatePresence } from 'framer-motion';
import { stateData } from '@/data/stateData';
import StateSelector from './StateSelector';

interface AIAssistantModalProps {
  onClose: () => void;
  onComplete: (journeyData: any) => void;
  currentJourney: any;
}

const AIAssistantModal: React.FC<AIAssistantModalProps> = ({ 
  onClose, 
  onComplete,
  currentJourney
}) => {
  const [input, setInput] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [activeTab, setActiveTab] = useState<'chat' | 'time' | 'customize' | 'states'>('chat');
  const [selectedTimeOfDay, setSelectedTimeOfDay] = useState<'morning' | 'afternoon' | 'evening' | 'night'>('morning');
  const [messages, setMessages] = useState<{text: string, sender: 'user' | 'bot'}[]>([
    {
      text: "Hi there! I'm your AI Journey Assistant. I can help you plan your perfect trip. Tell me where you'd like to go and for how many days, and I'll create a custom itinerary. For example, try 'Plan a 5-day trip to Kerala'.",
      sender: 'bot'
    }
  ]);

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
    
    let days: number = currentJourney.duration || 3;
    let destination: string = '';
    
    const journeyMatch = query.match(journeyRegex);
    const stateMatch = query.match(stateOnlyRegex);
    
    if (journeyMatch) {
      days = parseInt(journeyMatch[1]);
      destination = journeyMatch[2].trim();
    } else if (stateMatch) {
      destination = stateMatch[1].trim();
    } else {
      setMessages(prev => [...prev, {
        text: "I couldn't understand your request. Please try something like '5 days in Rajasthan' or just 'Kerala'.",
        sender: 'bot'
      }]);
      setIsGenerating(false);
      return;
    }
    
    const stateInfo = stateData.find(state => 
      state.name.toLowerCase() === destination.toLowerCase()
    );
    
    if (!stateInfo) {
      // If direct match is not found, try to find a partial match
      const partialMatch = stateData.find(state => 
        state.name.toLowerCase().includes(destination.toLowerCase())
      );
      
      if (partialMatch) {
        setMessages(prev => [...prev, {
          text: `I'll create a journey for ${partialMatch.name} instead.`,
          sender: 'bot'
        }]);
        setTimeout(() => {
          const updatedJourney = {...currentJourney, destination: partialMatch.name, duration: days};
          onComplete(updatedJourney);
        }, 1000);
        return;
      }
      
      setMessages(prev => [...prev, {
        text: `I couldn't find ${destination} in our database. Please try selecting a state from the States tab.`,
        sender: 'bot'
      }]);
      setIsGenerating(false);
      setActiveTab('states');
      return;
    }
    
    // Set current journey with the new destination and duration
    const updatedJourney = {...currentJourney, destination: stateInfo.name, duration: days};
    onComplete(updatedJourney);
  };

  const handleSelectState = (stateName: string) => {
    const updatedJourney = {
      ...currentJourney, 
      destination: stateName, 
      duration: currentJourney.duration || 3
    };
    
    setMessages(prev => [...prev, {
      text: `I'll create a journey for ${stateName}.`,
      sender: 'bot'
    }]);
    
    setActiveTab('chat');
    onComplete(updatedJourney);
  };

  return (
    <motion.div 
      className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4 backdrop-blur-sm"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div 
        className="w-full max-w-lg bg-white dark:bg-gray-900 rounded-xl shadow-2xl overflow-hidden flex flex-col"
        style={{ maxHeight: '85vh' }}
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 20 }}
        transition={{ type: "spring", damping: 25 }}
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
        
        <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as any)}>
          <TabsList className="w-full bg-gray-100 dark:bg-gray-800 p-0 rounded-none">
            <TabsTrigger value="chat" className="flex-1">Chat</TabsTrigger>
            <TabsTrigger value="states" className="flex-1">States</TabsTrigger>
            <TabsTrigger value="time" className="flex-1">Time</TabsTrigger>
            <TabsTrigger value="customize" className="flex-1">Settings</TabsTrigger>
          </TabsList>
          
          <AnimatePresence mode="wait">
            {activeTab === 'chat' && (
              <TabsContent value="chat" className="p-0 m-0">
                <AIAssistantChat 
                  messages={messages} 
                  isGenerating={isGenerating}
                  setMessages={setMessages}
                  currentJourney={currentJourney}
                  onComplete={onComplete}
                  setIsGenerating={setIsGenerating}
                />
              </TabsContent>
            )}
            
            {activeTab === 'states' && (
              <TabsContent value="states" className="p-0 m-0">
                <StateSelector onSelectState={handleSelectState} />
              </TabsContent>
            )}
            
            {activeTab === 'time' && (
              <TabsContent value="time" className="p-0 m-0">
                <AIAssistantTimeOptions 
                  selectedTimeOfDay={selectedTimeOfDay}
                  setSelectedTimeOfDay={setSelectedTimeOfDay}
                  currentJourney={currentJourney}
                  onComplete={onComplete}
                />
              </TabsContent>
            )}
            
            {activeTab === 'customize' && (
              <TabsContent value="customize" className="p-0 m-0">
                <AIAssistantCustomizeOptions />
              </TabsContent>
            )}
          </AnimatePresence>
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
      </motion.div>
    </motion.div>
  );
};

export default AIAssistantModal;
