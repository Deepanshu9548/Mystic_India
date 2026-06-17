
import React from 'react';
import { Activity, MapPin, Clock } from 'lucide-react';

type JourneyActivitiesProps = {
  journey: any;
};

const JourneyActivities: React.FC<JourneyActivitiesProps> = ({ journey }) => {
  // Generate sample activities if none are provided
  const locations = journey.location.split(', ');
  
  const defaultActivities = [
    {
      name: `Cultural Tour in ${locations[0]}`,
      description: `Explore the rich cultural heritage of ${locations[0]} with a guided tour of historical landmarks and monuments.`,
      duration: '3 hours',
      location: locations[0],
      image: 'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?q=80&w=2071'
    },
    {
      name: 'Local Cuisine Experience',
      description: 'Indulge in the authentic local flavors with a special food tour featuring regional specialties.',
      duration: '2 hours',
      location: locations[locations.length > 1 ? 1 : 0],
      image: 'https://images.unsplash.com/photo-1606491956689-2ea866880c84?q=80&w=2076'
    },
    {
      name: 'Traditional Art Workshop',
      description: 'Learn the traditional art forms of the region with a hands-on workshop conducted by local artisans.',
      duration: '4 hours',
      location: locations[locations.length > 2 ? 2 : 0],
      image: 'https://images.unsplash.com/photo-1584806749948-697891c67821?q=80&w=1170'
    }
  ];
  
  const activities = journey.activities || defaultActivities;
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {activities.map((activity: any, index: number) => (
        <div key={index} className="border border-border rounded-lg overflow-hidden flex flex-col h-full">
          <div className="h-48 overflow-hidden">
            <img 
              src={activity.image} 
              alt={activity.name} 
              className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
            />
          </div>
          <div className="p-4 flex flex-col flex-grow">
            <h4 className="text-lg font-medium mb-2">{activity.name}</h4>
            <p className="text-muted-foreground mb-4 flex-grow">{activity.description}</p>
            <div className="flex justify-between items-center mt-auto">
              <div className="flex items-center text-sm text-muted-foreground">
                <MapPin size={14} className="mr-1" />
                {activity.location}
              </div>
              <div className="flex items-center text-sm text-muted-foreground">
                <Clock size={14} className="mr-1" />
                {activity.duration}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default JourneyActivities;
