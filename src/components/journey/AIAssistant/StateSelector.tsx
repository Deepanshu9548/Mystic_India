
import React, { useState } from 'react';
import { stateData } from '@/data/stateData';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { motion } from 'framer-motion';
import { Search } from 'lucide-react';

interface StateSelectorProps {
  onSelectState: (stateName: string) => void;
}

const StateSelector: React.FC<StateSelectorProps> = ({ onSelectState }) => {
  const [searchTerm, setSearchTerm] = useState('');
  
  const filteredStates = stateData.filter(state => 
    state.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  // Group states by region
  const groupedStates: {[key: string]: typeof stateData} = {};
  
  filteredStates.forEach(state => {
    const region = state.region || 'Other';
    if (!groupedStates[region]) {
      groupedStates[region] = [];
    }
    groupedStates[region].push(state);
  });
  
  return (
    <div className="p-4 space-y-4">
      <div className="relative">
        <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search for a state..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-8"
        />
      </div>
      
      <ScrollArea className="h-[350px] pr-4">
        <div className="space-y-4">
          {Object.entries(groupedStates).map(([region, states]) => (
            <div key={region} className="space-y-2">
              <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">{region}</h3>
              <div className="grid grid-cols-2 gap-2">
                {states.map(state => (
                  <motion.div
                    key={state.id}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Button
                      variant="outline"
                      className="w-full justify-start text-left h-auto py-2 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 border-indigo-100 dark:border-indigo-900/30"
                      onClick={() => onSelectState(state.name)}
                    >
                      <span className="truncate">{state.name}</span>
                    </Button>
                  </motion.div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
};

export default StateSelector;
