
import { stateData } from './stateData';

// Ensure we create a standalone cultural data source 
// that doesn't cause TypeScript errors from stateData

export const culturalData = stateData.map(state => {
  return {
    id: state.id,
    name: state.name,
    bannerImage: state.bannerImage || '',
    description: state.description || '',
    population: state.population || '',
    language: state.language || '',
    famousFor: state.artForms ? state.artForms.split(',').map(item => item.trim()) : [],
    region: state.region || ''
  };
});

// This creates a clean, consistent data structure without relying on
// potentially missing properties from stateData
