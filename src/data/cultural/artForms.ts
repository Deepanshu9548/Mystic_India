
import { getArtFormDetails } from './artformdata';

// Create a more structured format for art forms
export type ArtForm = {
  id: string;
  name: string;
  stateIds: string[];
  stateNames: string[];
  regionId: string;
  regionName: string;
  image: string;
  description: string;
  history: {
    started?: string;
    goldenPeriod?: string;
    currentStatus?: string;
  };
  additionalImages?: string[];
};

// Map of region names to IDs
const regionMap: Record<string, string> = {
  "Northern India": "north-india",
  "South India": "south-india",
  "East India": "east-india",
  "West India": "west-india",
  "Central India": "central-india",
  "Northeast India": "northeast-india"
};

// Create unique art forms with associated states
export const artForms: ArtForm[] = [
  {
    id: "kathputli",
    name: "Kathputli",
    stateIds: ["rajasthan", "delhi"],
    stateNames: ["Rajasthan", "Delhi"],
    regionId: regionMap["Northern India"],
    regionName: "Northern India",
    ...getArtFormDetails("Kathputli")
  },
  {
    id: "ghoomar",
    name: "Ghoomar",
    stateIds: ["rajasthan"],
    stateNames: ["Rajasthan"],
    regionId: regionMap["Northern India"],
    regionName: "Northern India",
    ...getArtFormDetails("Ghoomar")
  },
  {
    id: "kalbeliya",
    name: "Kalbeliya",
    stateIds: ["rajasthan"],
    stateNames: ["Rajasthan"],
    regionId: regionMap["Northern India"],
    regionName: "Northern India",
    ...getArtFormDetails("Kalbeliya")
  },
  {
    id: "kathakali",
    name: "Kathakali",
    stateIds: ["kerala"],
    stateNames: ["Kerala"],
    regionId: regionMap["South India"],
    regionName: "South India",
    ...getArtFormDetails("Kathakali")
  },
  {
    id: "mohiniyattam",
    name: "Mohiniyattam",
    stateIds: ["kerala"],
    stateNames: ["Kerala"],
    regionId: regionMap["South India"],
    regionName: "South India",
    ...getArtFormDetails("Mohiniyattam")
  },
  {
    id: "kalaripayattu",
    name: "Kalaripayattu",
    stateIds: ["kerala"],
    stateNames: ["Kerala"],
    regionId: regionMap["South India"],
    regionName: "South India",
    ...getArtFormDetails("Kalaripayattu")
  },
  {
    id: "bharatanatyam",
    name: "Bharatanatyam",
    stateIds: ["tamil-nadu", "karnataka"],
    stateNames: ["Tamil Nadu", "Karnataka"],
    regionId: regionMap["South India"],
    regionName: "South India",
    ...getArtFormDetails("Bharatanatyam")
  },
  {
    id: "carnatic-music",
    name: "Carnatic Music",
    stateIds: ["tamil-nadu", "karnataka", "kerala", "andhra-pradesh"],
    stateNames: ["Tamil Nadu", "Karnataka", "Kerala", "Andhra Pradesh"],
    regionId: regionMap["South India"],
    regionName: "South India",
    ...getArtFormDetails("Carnatic Music")
  },
  {
    id: "tanjore-paintings",
    name: "Tanjore Paintings",
    stateIds: ["tamil-nadu"],
    stateNames: ["Tamil Nadu"],
    regionId: regionMap["South India"],
    regionName: "South India",
    ...getArtFormDetails("Tanjore Paintings")
  },
  {
    id: "nati-dance",
    name: "Nati Dance",
    stateIds: ["himachal-pradesh"],
    stateNames: ["Himachal Pradesh"],
    regionId: regionMap["Northern India"],
    regionName: "Northern India",
    ...getArtFormDetails("Nati Dance")
  },
  {
    id: "thangka-paintings",
    name: "Thangka Paintings",
    stateIds: ["himachal-pradesh", "ladakh", "sikkim"],
    stateNames: ["Himachal Pradesh", "Ladakh", "Sikkim"],
    regionId: regionMap["Northern India"],
    regionName: "Northern India",
    ...getArtFormDetails("Thangka Paintings")
  },
  {
    id: "chamba-rumal",
    name: "Chamba Rumal",
    stateIds: ["himachal-pradesh"],
    stateNames: ["Himachal Pradesh"],
    regionId: regionMap["Northern India"],
    regionName: "Northern India",
    ...getArtFormDetails("Chamba Rumal")
  },
  {
    id: "fado-music",
    name: "Fado Music",
    stateIds: ["goa"],
    stateNames: ["Goa"],
    regionId: regionMap["West India"],
    regionName: "West India",
    ...getArtFormDetails("Fado Music")
  },
  {
    id: "goan-carnival",
    name: "Goan Carnival",
    stateIds: ["goa"],
    stateNames: ["Goa"],
    regionId: regionMap["West India"],
    regionName: "West India",
    ...getArtFormDetails("Goan Carnival")
  },
  {
    id: "traditional-pottery",
    name: "Traditional Pottery",
    stateIds: ["gujarat", "rajasthan", "uttar-pradesh", "west-bengal", "tamil-nadu"],
    stateNames: ["Gujarat", "Rajasthan", "Uttar Pradesh", "West Bengal", "Tamil Nadu"],
    regionId: "all-india",
    regionName: "All India",
    ...getArtFormDetails("Traditional Pottery")
  }
];

// Function to get artforms by region
export const getArtFormsByRegion = (regionId: string): ArtForm[] => {
  if (regionId === 'all') return artForms;
  return artForms.filter(art => art.regionId === regionId);
};

// Function to get artforms by state
export const getArtFormsByState = (stateId: string): ArtForm[] => {
  return artForms.filter(art => art.stateIds.includes(stateId));
};

// Function to get a specific artform by ID
export const getArtFormById = (id: string): ArtForm | undefined => {
  return artForms.find(art => art.id === id);
};
