
import React from 'react';
import { Clock } from 'lucide-react';

type JourneyTimelineProps = {
  journey: any;
};

const JourneyTimeline: React.FC<JourneyTimelineProps> = ({ journey }) => {
  // Generate timeline days based on journey duration
  const durationDays = parseInt(journey.duration.split(' ')[0]);
  
  const timelineItems = Array.from({ length: durationDays }, (_, index) => {
    const dayNumber = index + 1;
    return {
      day: `Day ${dayNumber}`,
      title: journey.timeline?.[index]?.title || 
        (dayNumber === 1 
          ? 'Arrival & Welcome' 
          : dayNumber === durationDays 
            ? 'Departure' 
            : `Exploring ${journey.location.split(', ')[index % journey.location.split(', ').length]}`),
      description: journey.timeline?.[index]?.description || 
        (dayNumber === 1 
          ? `Arrive at your first destination. Check-in to your hotel and enjoy a welcome dinner.` 
          : dayNumber === durationDays 
            ? `Check-out from your hotel. Transfer to the departure point and bid farewell to the beautiful journey.` 
            : `Explore the local attractions, immerse yourself in the culture, and enjoy the authentic cuisine.`)
    };
  });

  return (
    <div className="space-y-8">
      <div className="relative">
        {timelineItems.map((item, index) => (
          <div key={index} className="mb-8 flex gap-4">
            <div className="flex flex-col items-center">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-spice-100 dark:bg-spice-900 text-spice-500 dark:text-spice-300">
                <Clock className="h-5 w-5" />
              </div>
              {index < timelineItems.length - 1 && (
                <div className="h-full w-0.5 bg-spice-100 dark:bg-spice-900"></div>
              )}
            </div>
            <div className="flex-grow pt-1 pb-8">
              <div className="flex flex-col space-y-2">
                <span className="text-xs text-muted-foreground">{item.day}</span>
                <span className="text-lg font-medium">{item.title}</span>
                <p className="text-muted-foreground">{item.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default JourneyTimeline;
