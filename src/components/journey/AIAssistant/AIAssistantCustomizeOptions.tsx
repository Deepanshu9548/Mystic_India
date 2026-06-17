
import React from 'react';
import { Clock, MapPin, Utensils, Paintbrush } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import StateSelector from './StateSelector';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const AIAssistantCustomizeOptions = () => {
  const handleStateSelect = (stateName: string) => {
    toast({
      title: "State selected",
      description: `You selected ${stateName}. Use the Chat tab to plan your journey.`
    });
  };

  return (
    <div className="p-4 m-0">
      <Tabs defaultValue="states">
        <TabsList className="mb-4">
          <TabsTrigger value="states">Available States</TabsTrigger>
          <TabsTrigger value="settings">AI Settings</TabsTrigger>
        </TabsList>
        
        <TabsContent value="states">
          <div className="mb-4">
            <h4 className="text-lg font-medium">Explore Indian States</h4>
            <p className="text-sm text-muted-foreground mb-2">
              Select a state to create a journey to that destination
            </p>
          </div>
          
          <StateSelector onSelectState={handleStateSelect} />
        </TabsContent>
        
        <TabsContent value="settings">
          <div className="space-y-4">
            <h4 className="text-lg font-medium">AI Assistant Settings</h4>
            <p className="text-sm text-muted-foreground mb-4">
              For more comprehensive AI assistance, we recommend connecting to an external AI service. 
              This would require setting up a Supabase integration with your project.
            </p>
            
            <div className="p-3 bg-amber-50 dark:bg-amber-900/30 rounded-md space-y-2">
              <h5 className="font-medium text-amber-800 dark:text-amber-400">Connect to External AI (Premium Feature)</h5>
              <p className="text-sm text-amber-700 dark:text-amber-300">
                This would allow the AI to access more up-to-date information and provide more personalized recommendations
                based on real-time data.
              </p>
            </div>
            
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
    </div>
  );
};

export default AIAssistantCustomizeOptions;
