// Define regions with their details
export const regions = [
  {
    id: "north-india",
    name: "North India",
    description: "The northern region of India includes states like Himachal Pradesh, Rajasthan, and others known for their distinctive cultural heritage, Himalayan landscapes, and historical monuments.",
    states: ["jammu-kashmir", "ladakh", "himachal-pradesh", "punjab", "haryana", "uttarakhand", "delhi", "rajasthan", "uttar-pradesh", "chandigarh"],
    primaryColors: ["#E63946", "#FFB703"],
    image: "https://images.unsplash.com/photo-1524613032530-449a5d94c285?q=80&w=2070"
  },
  {
    id: "south-india",
    name: "South India",
    description: "South India encompasses states like Kerala, Tamil Nadu, with rich Dravidian culture, tropical landscapes, ancient temples, and distinctive cuisine and classical art forms.",
    states: ["andhra-pradesh", "telangana", "karnataka", "tamil-nadu", "kerala", "puducherry", "andaman-nicobar"],
    primaryColors: ["#2A9D8F", "#E9C46A"],
    image: "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?q=80&w=2070"
  },
  {
    id: "east-india",
    name: "East India",
    description: "East India features states known for their rich cultural heritage, literature, and natural beauty.",
    states: ["bihar", "jharkhand", "odisha", "west-bengal"],
    primaryColors: ["#457B9D", "#A8DADC"],
    image: "https://images.unsplash.com/photo-1600507454245-c796e3afdc4d?q=80&w=2070"
  },
  {
    id: "west-india",
    name: "West India",
    description: "West India includes states with vibrant folk traditions, coastal areas, and diverse cultural practices.",
    states: ["rajasthan", "gujarat", "maharashtra", "goa", "daman-diu", "dadra-nagar-haveli"],
    primaryColors: ["#F4A261", "#264653"],
    image: "https://images.unsplash.com/photo-1584732200355-486c8fbd91a8?q=80&w=2070"
  },
  {
    id: "central-india",
    name: "Central India",
    description: "Central India is known for its tribal heritage, historical sites, and natural reserves.",
    states: ["madhya-pradesh", "chhattisgarh"],
    primaryColors: ["#2B9348", "#8BD3E6"],
    image: "https://images.unsplash.com/photo-1548013146-72479768bada?q=80&w=2070"
  },
  {
    id: "northeast-india",
    name: "Northeast India",
    description: "The northeastern region of India displays a unique mix of tribal cultures, natural diversity, and distinctive traditions.",
    states: ["assam", "arunachal-pradesh", "manipur", "meghalaya", "mizoram", "nagaland", "tripura", "sikkim"],
    primaryColors: ["#4CC9F0", "#560BAD"],
    image: "https://images.unsplash.com/photo-1597040663342-45b6af3d9a65?q=80&w=2070"
  }
];

// Helper function to get a state's region
export const getStateRegion = (stateId: string): string => {
  for (const region of regions) {
    if (region.states.includes(stateId)) {
      return region.id;
    }
  }
  return "";
};

// Get all states from a specific region
export const getStatesInRegion = (regionId: string): string[] => {
  const region = regions.find(r => r.id === regionId);
  return region ? region.states : [];
};
