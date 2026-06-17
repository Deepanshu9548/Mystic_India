
export interface Message {
  text: string;
  sender: 'user' | 'bot';
  type?: 'regular' | 'info';
}

export interface ChatbotTrainingItem {
  patterns: string[];
  responses: string[];
  category?: string;
}

// Adding missing types that caused the errors
export interface JourneyItineraryDay {
  day: number;
  title: string;
  activities: string[];
  timeOfDay?: 'morning' | 'afternoon' | 'evening' | 'night';
  places?: string[];
  cuisine?: string[];
  artForms?: string[];
  image?: string;
  morningActivities?: string[];
  afternoonActivities?: string[];
  eveningActivities?: string[];
  nightActivities?: string[];
}

export interface StateInfo {
  id: string;
  name: string;
  description: string;
  region: string;
}

export interface JourneyDetails {
  days: number;
  state: string;
  itinerary: JourneyItineraryDay[];
  accommodation: string[];
  cuisine: string[];
  festivals: string[];
  heritageSites: string[];
  travelTips: string[];
}

export const COMMAND_PATTERNS = {
  JOURNEY_PLAN: /plan\s+(?:a|an)\s+(\d+)(?:\s+|\-)?day(?:s)?\s+(?:journey|trip|vacation|visit|itinerary)\s+(?:to|in|for|at)\s+([A-Za-z\s]+)/i,
  DAYS_AND_STATE: /(\d+)(?:\s+|\-)?days?\s+(?:in|to|for|at)\s+([A-Za-z\s]+)/i,
  STATE_ONLY: /^(?:visit\s+)?([A-Za-z\s]+)$/i,
  JUST_DAYS: /^(\d+)(?:\s+|\-)?days?$/i,
  FOOD_QUERY: /(?:food|cuisine|dishes|eat|try)\s+(?:in|at|from)?\s+([A-Za-z\s]+)?/i,
  FESTIVAL_QUERY: /(?:festival|celebration|cultural\s+event)s?\s+(?:in|at|of)?\s+([A-Za-z\s]+)?/i,
  WEATHER_QUERY: /(?:weather|climate|temperature|season|rain|monsoon)\s+(?:in|at|of)?\s+([A-Za-z\s]+)?/i,
  TRANSPORT_QUERY: /(?:transport|travel|getting\s+around|commute)\s+(?:in|at|within)?\s+([A-Za-z\s]+)?/i,
}

export const CHATBOT_BACKGROUNDS = {
  light: "https://images.unsplash.com/photo-1604147706283-d7119b5b822c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2574&q=80",
  dark: "https://images.unsplash.com/photo-1605806616949-59450f0e3354?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2670&q=80"
}

// New OpenAI API integration types
export interface OpenAIConfig {
  apiKey: string;
  model: string;
  organization?: string;
  temperature?: number;
  maxTokens?: number;
}

export interface ChatbotConfig {
  useOpenAI: boolean;
  openAIConfig?: OpenAIConfig;
  fallbackToTraining: boolean;
  welcomeMessage: string;
}

// New multi-provider AI types
export type AIModelProvider = 'openai' | 'gemini' | 'claude' | 'qwen';

export interface AIConfig {
  provider: AIModelProvider;
  apiKey: string;
  model?: string;
  temperature?: number;
  maxTokens?: number;
}

export interface AIProviderService {
  generateResponse(
    prompt: string, 
    systemPrompt: string, 
    conversationHistory: {role: string, content: string}[]
  ): Promise<string>;
}
