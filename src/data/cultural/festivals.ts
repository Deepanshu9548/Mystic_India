
import { stateData } from '../stateData';

// Type definition for festivals
export type Festival = {
  name: string;
  timing: string;
  description: string;
  stateName: string;
  stateId: string;
  image: string;
};

// Default image for festivals
const defaultFestivalImage = "https://www.shutterstock.com/shutterstock/videos/3420493313/thumb/1.jpg?ip=x480";

// Transform festivals from state data and ensure each has an image property
export const festivals: Festival[] = stateData.flatMap(state => 
  state.festivals?.list?.map(festival => ({
    ...festival,
    stateName: state.name,
    stateId: state.id,
    // Add the image property with a default if it doesn't exist in the source data
    image: festival.image || defaultFestivalImage
  })) || []
);

// Function to get festivals by state
export const getFestivalsByState = (stateId: string): Festival[] => {
  if (stateId === 'all') return festivals;
  return festivals.filter(festival => festival.stateId === stateId);
};

// Function to get a specific festival by name and state
export const getFestivalByNameAndState = (name: string, stateId: string): Festival | undefined => {
  return festivals.find(festival => festival.name === name && festival.stateId === stateId);
};
