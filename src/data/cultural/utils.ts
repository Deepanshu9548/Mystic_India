
import { regions } from './regions';
import { artForms } from './artForms';
import { festivals } from './festivals';
import { heritageSites } from './heritageSites';

// General cultural data utilities for Mystic India
export const getPopularDestinations = (regionId: string) => {
  // This could be extended to pull from a more comprehensive dataset
  const popularDestinations = {
    'north-india': ['Delhi', 'Agra', 'Jaipur', 'Amritsar', 'Varanasi'],
    'south-india': ['Chennai', 'Kochi', 'Hyderabad', 'Bangalore', 'Mysore'],
    'east-india': ['Kolkata', 'Darjeeling', 'Puri', 'Bhubaneswar', 'Gangtok'],
    'west-india': ['Mumbai', 'Goa', 'Ahmedabad', 'Udaipur', 'Jaisalmer'],
    'central-india': ['Bhopal', 'Khajuraho', 'Indore', 'Gwalior', 'Nagpur'],
    'northeast-india': ['Guwahati', 'Shillong', 'Tawang', 'Kaziranga', 'Majuli']
  };
  
  return popularDestinations[regionId as keyof typeof popularDestinations] || 
         popularDestinations['north-india'];
};

export const getRegionalCuisines = (regionId: string) => {
  const regionalCuisines = {
    'north-india': ['Butter Chicken', 'Chole Bhature', 'Kebabs', 'Biryani', 'Paratha'],
    'south-india': ['Dosa', 'Idli Sambar', 'Fish Curry', 'Hyderabadi Biryani', 'Appam'],
    'east-india': ['Fish Curry', 'Rosogolla', 'Litti Chokha', 'Momos', 'Pitha'],
    'west-india': ['Dhokla', 'Vada Pav', 'Vindaloo', 'Dal Baati Churma', 'Pav Bhaji'],
    'central-india': ['Poha', 'Jalebi', 'Bhutte Ka Kees', 'Daal Bafla', 'Indori Namkeen'],
    'northeast-india': ['Bamboo Shoot Curry', 'Axone', 'Jadoh', 'Smoked Meat', 'Rice Beer']
  };
  
  return regionalCuisines[regionId as keyof typeof regionalCuisines] || 
         regionalCuisines['north-india'];
};

export const getSeasonalTravelTips = (month: number) => {
  const seasons = {
    winter: [11, 12, 1, 2], // Nov-Feb
    summer: [3, 4, 5, 6],   // Mar-Jun
    monsoon: [7, 8, 9, 10]  // Jul-Oct
  };
  
  if (seasons.winter.includes(month)) {
    return [
      'Pack warm clothing for North India, where temperatures can drop significantly',
      'This is the ideal time to visit coastal regions like Goa and Kerala',
      'Many cultural festivals happen during winter months'
    ];
  } else if (seasons.summer.includes(month)) {
    return [
      'Carry lightweight, breathable clothing and stay hydrated',
      'Consider hill stations like Shimla or Darjeeling to escape the heat',
      'Morning and evening activities are recommended to avoid midday heat'
    ];
  } else {
    return [
      'Carry rain gear and waterproof bags during monsoon season',
      'Check weather forecasts daily as heavy rainfall can affect travel plans',
      'Enjoy the lush green landscapes and waterfalls during this season'
    ];
  }
};

export { regions, artForms, festivals, heritageSites };
