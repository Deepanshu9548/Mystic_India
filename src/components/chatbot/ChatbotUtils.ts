import { chatbotTrainingData } from './ChatbotTrainingData';
import liveDataService from '@/services/live-data-service';

// Find a response from training data based on user input
export const findResponseFromTrainingData = (query: string): string => {
  // Convert query to lowercase for case-insensitive matching
  const lowerQuery = query.toLowerCase();
  
  // Check if this is a live data request
  const liveDataResponse = matchLiveDataRequest(query);
  if (liveDataResponse) {
    // Return a placeholder that will be replaced with actual live data
    return liveDataResponse;
  }
  
  // Check for state capital queries first
  const stateCapitalResponse = matchStateCapital(lowerQuery);
  if (stateCapitalResponse) {
    return stateCapitalResponse;
  }
  
  // Try to find an exact match
  for (const item of chatbotTrainingData) {
    for (const pattern of item.patterns) {
      if (lowerQuery.includes(pattern.toLowerCase())) {
        return getRandomResponse(item.responses);
      }
    }
  }
  
  // If no exact match, try to find the best fuzzy match
  let bestMatch = { score: 0, response: "" };
  
  for (const item of chatbotTrainingData) {
    for (const pattern of item.patterns) {
      const score = calculateSimilarity(lowerQuery, pattern.toLowerCase());
      if (score > bestMatch.score && score > 0.4) { // Threshold for relevance
        bestMatch = { 
          score, 
          response: getRandomResponse(item.responses) 
        };
      }
    }
  }
  
  if (bestMatch.response) {
    return bestMatch.response;
  }
  
  // Fallback response if no match found
  return "I'm not sure I understand that question. Could you rephrase it or ask about India's states, capitals, culture, cuisine, or travel destinations?";
};

// Check if query is requesting live data
export const matchLiveDataRequest = (query: string): string | null => {
  const lowerQuery = query.toLowerCase();
  
  // Weather data patterns
  const weatherPatterns = [
    /weather (?:in|at|of) ([\w\s]+)/i,
    /(?:current|today's|today) weather (?:in|at|of)? ([\w\s]+)/i,
    /temperature (?:in|at|of) ([\w\s]+)/i,
    /how (?:is|was) the weather (?:in|at|of) ([\w\s]+)/i,
    /climate (?:in|at|of) ([\w\s]+)/i
  ];
  
  // News data patterns
  const newsPatterns = [
    /(?:current|latest|recent|today's) news/i,
    /news (?:in|about|from) india/i,
    /what(?:'s| is) happening in india/i,
    /india(?:n)? news/i
  ];
  
  // Tourism data patterns
  const tourismPatterns = [
    /tourism (?:in|of|about) india/i,
    /(?:popular|top) (?:destinations|places|spots)/i,
    /(?:travel|tourist) information/i,
    /(?:visit|visiting) india/i,
    /tourism (?:statistics|stats|numbers|figures)/i
  ];
  
  // Currency data patterns
  const currencyPatterns = [
    /(?:currency|exchange) rate/i,
    /(?:value|worth) of (?:indian )?rupee/i,
    /(?:current|today's) (?:currency|exchange) rate/i,
    /rupee (?:to|vs|against) (?:dollar|euro|pound)/i,
    /inr (?:to|vs|against) (?:usd|eur|gbp)/i
  ];
  
  // Check for weather requests
  for (const pattern of weatherPatterns) {
    const match = lowerQuery.match(pattern);
    if (match && match[1]) {
      const location = match[1].trim();
      // Return a placeholder with the location
      return `[LIVE_WEATHER:${location}]`;
    }
  }
  
  // Check for news requests
  for (const pattern of newsPatterns) {
    if (pattern.test(lowerQuery)) {
      return '[LIVE_NEWS]';
    }
  }
  
  // Check for tourism info requests
  for (const pattern of tourismPatterns) {
    if (pattern.test(lowerQuery)) {
      return '[LIVE_TOURISM]';
    }
  }
  
  // Check for currency rates requests
  for (const pattern of currencyPatterns) {
    if (pattern.test(lowerQuery)) {
      return '[LIVE_CURRENCY]';
    }
  }
  
  return null;
};

// Special matcher for state capital queries
const matchStateCapital = (query: string): string | null => {
  // Common patterns for capital questions
  const capitalPatterns = [
    /capital of ([\w\s]+)/i,
    /what is the capital of ([\w\s]+)/i,
    /([\w\s]+) capital city/i,
    /([\w\s]+) capital/i
  ];
  
  // Map of states to their capitals
  const stateCapitals: {[key: string]: string} = {
    'andhra pradesh': 'Amaravati (planned capital) and Visakhapatnam (administrative capital)',
    'arunachal pradesh': 'Itanagar',
    'assam': 'Dispur',
    'bihar': 'Patna',
    'chhattisgarh': 'Raipur',
    'goa': 'Panaji',
    'gujarat': 'Gandhinagar',
    'haryana': 'Chandigarh',
    'himachal pradesh': 'Shimla',
    'jharkhand': 'Ranchi',
    'karnataka': 'Bengaluru (Bangalore)',
    'kerala': 'Thiruvananthapuram (Trivandrum)',
    'madhya pradesh': 'Bhopal',
    'maharashtra': 'Mumbai',
    'manipur': 'Imphal',
    'meghalaya': 'Shillong',
    'mizoram': 'Aizawl',
    'nagaland': 'Kohima',
    'odisha': 'Bhubaneswar',
    'punjab': 'Chandigarh',
    'rajasthan': 'Jaipur',
    'sikkim': 'Gangtok',
    'tamil nadu': 'Chennai',
    'telangana': 'Hyderabad',
    'tripura': 'Agartala',
    'uttar pradesh': 'Lucknow',
    'uttarakhand': 'Dehradun',
    'west bengal': 'Kolkata',
    'delhi': 'New Delhi',
    'puducherry': 'Puducherry',
    'jammu and kashmir': 'Srinagar (Summer) and Jammu (Winter)',
    'ladakh': 'Leh'
  };
  
  // Check if query is directly asking for a capital
  for (const pattern of capitalPatterns) {
    const match = query.match(pattern);
    if (match && match[1]) {
      const stateName = match[1].toLowerCase().trim();
      if (stateCapitals[stateName]) {
        return `The capital of ${match[1]} is ${stateCapitals[stateName]}.`;
      }
    }
  }
  
  // Check if the query mentions a state
  for (const state in stateCapitals) {
    if (query.includes(state)) {
      return `The capital of ${state} is ${stateCapitals[state]}.`;
    }
  }
  
  return null;
};

// Calculate similarity between two strings
export const calculateSimilarity = (str1: string, str2: string): number => {
  // Simple similarity calculation
  const words1 = str1.split(' ');
  const words2 = str2.split(' ');
  
  let matchCount = 0;
  for (const word1 of words1) {
    if (word1.length <= 2) continue; // Skip small words
    
    for (const word2 of words2) {
      if (word2.length <= 2) continue;
      if (word1 === word2 || word1.includes(word2) || word2.includes(word1)) {
        matchCount++;
        break;
      }
    }
  }
  
  return matchCount / Math.max(words1.length, words2.length);
};

// Get a random response from an array of responses
export const getRandomResponse = (responses: string[]): string => {
  return responses[Math.floor(Math.random() * responses.length)];
};

// Generate suggestions based on user query and bot response
export const generateSuggestions = (query: string, response: string): string[] => {
  // Extract topic from query
  const locationMatch = query.match(/\b(kerala|goa|rajasthan|delhi|mumbai|kolkata|tamil nadu|karnataka)\b/i);
  const location = locationMatch ? locationMatch[0] : null;
  
  // Check for query type
  const isAboutFood = /food|cuisine|eat|dish/i.test(query);
  const isAboutCulture = /culture|tradition|art|dance|music/i.test(query);
  const isAboutTravel = /travel|visit|journey|trip|tour/i.test(query);
  const isAboutFestival = /festival|celebration|event/i.test(query);
  const isAboutGeography = /capital|map|location|where is|situated|located/i.test(query);
  const isAboutWeather = /weather|temperature|climate|rain/i.test(query);
  const isAboutNews = /news|current events|latest|happening/i.test(query);
  const isAboutShopping = /shop|buy|market|bazaar|mall/i.test(query);
  const isAboutHistory = /history|historical|ancient|heritage|monument/i.test(query);
  const isAboutTransport = /transport|travel|how to reach|getting|metro|train|flight/i.test(query);
  
  // Generate related suggestions
  const suggestions: string[] = [];
  
  if (location) {
    if (isAboutFood) {
      suggestions.push(`Famous restaurants in ${location}`);
      suggestions.push(`Traditional dishes of ${location}`);
    } else if (isAboutCulture) {
      suggestions.push(`${location} traditional art forms`);
      suggestions.push(`Cultural heritage of ${location}`);
    } else if (isAboutTravel) {
      suggestions.push(`Hidden gems in ${location}`);
      suggestions.push(`Best time to visit ${location}`);
    } else if (isAboutShopping) {
      suggestions.push(`Shopping markets in ${location}`);
      suggestions.push(`What to buy in ${location}`);
    } else {
      suggestions.push(`Tourist attractions in ${location}`);
      suggestions.push(`How to reach ${location}`);
      suggestions.push(`Weather in ${location}`);
    }
  } else {
    // Add general suggestions based on query type
    if (isAboutGeography) {
      suggestions.push("Capital cities of India");
      suggestions.push("Major cities in South India");
      suggestions.push("States of North India");
    } else if (isAboutFood) {
      suggestions.push("Famous street foods of India");
      suggestions.push("Traditional Indian desserts");
      suggestions.push("Regional cuisines of India");
    } else if (isAboutHistory) {
      suggestions.push("Ancient temples of India");
      suggestions.push("Historical monuments");
      suggestions.push("UNESCO sites in India");
    } else if (isAboutTransport) {
      suggestions.push("Indian Railways information");
      suggestions.push("Metro cities in India");
      suggestions.push("Domestic airports");
    } else {
      suggestions.push("Popular tourist destinations");
      suggestions.push("Best time to visit India");
      suggestions.push("Indian cultural festivals");
      suggestions.push("Adventure sports in India");
    }
  }
  
  // Return 4 unique suggestions
  return Array.from(new Set(suggestions)).slice(0, 4);
};

// Process live data placeholders in bot responses
export const processLiveDataPlaceholders = async (response: string): Promise<string> => {
  // Check if the response contains any live data placeholders
  if (!response.includes('[LIVE_')) {
    return response;
  }
  
  let processedResponse = response;
  
  // Process weather data
  const weatherMatch = response.match(/\[LIVE_WEATHER:([\w\s]+)\]/);
  if (weatherMatch && weatherMatch[1]) {
    const location = weatherMatch[1];
    try {
      const weatherData = await liveDataService.getWeather(location);
      if (weatherData.success) {
        const weatherText = liveDataService.formatWeatherResponse(weatherData.data);
        processedResponse = processedResponse.replace(weatherMatch[0], weatherText);
      } else {
        processedResponse = processedResponse.replace(
          weatherMatch[0], 
          `I couldn't retrieve the current weather for ${location}. Please try again later.`
        );
      }
    } catch (error) {
      console.error("Error processing weather data:", error);
      processedResponse = processedResponse.replace(
        weatherMatch[0], 
        `I'm having trouble accessing weather information right now. Please try again later.`
      );
    }
  }
  
  // Process news data
  if (processedResponse.includes('[LIVE_NEWS]')) {
    try {
      const newsData = await liveDataService.getNews();
      if (newsData.success) {
        const newsText = liveDataService.formatNewsResponse(newsData.data);
        processedResponse = processedResponse.replace('[LIVE_NEWS]', newsText);
      } else {
        processedResponse = processedResponse.replace(
          '[LIVE_NEWS]', 
          `I couldn't retrieve the latest news from India. Please try again later.`
        );
      }
    } catch (error) {
      console.error("Error processing news data:", error);
      processedResponse = processedResponse.replace(
        '[LIVE_NEWS]', 
        `I'm having trouble accessing news information right now. Please try again later.`
      );
    }
  }
  
  // Process tourism data
  if (processedResponse.includes('[LIVE_TOURISM]')) {
    try {
      const tourismData = await liveDataService.getTourismInfo();
      if (tourismData.success) {
        const tourismText = liveDataService.formatTourismResponse(tourismData.data);
        processedResponse = processedResponse.replace('[LIVE_TOURISM]', tourismText);
      } else {
        processedResponse = processedResponse.replace(
          '[LIVE_TOURISM]', 
          `I couldn't retrieve the latest tourism information for India. Please try again later.`
        );
      }
    } catch (error) {
      console.error("Error processing tourism data:", error);
      processedResponse = processedResponse.replace(
        '[LIVE_TOURISM]', 
        `I'm having trouble accessing tourism information right now. Please try again later.`
      );
    }
  }
  
  // Process currency data
  if (processedResponse.includes('[LIVE_CURRENCY]')) {
    try {
      const currencyData = await liveDataService.getCurrencyRates();
      if (currencyData.success) {
        const currencyText = liveDataService.formatCurrencyResponse(currencyData.data);
        processedResponse = processedResponse.replace('[LIVE_CURRENCY]', currencyText);
      } else {
        processedResponse = processedResponse.replace(
          '[LIVE_CURRENCY]', 
          `I couldn't retrieve the current exchange rates for Indian Rupee. Please try again later.`
        );
      }
    } catch (error) {
      console.error("Error processing currency data:", error);
      processedResponse = processedResponse.replace(
        '[LIVE_CURRENCY]', 
        `I'm having trouble accessing currency information right now. Please try again later.`
      );
    }
  }
  
  return processedResponse;
};
