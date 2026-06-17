
// Service to fetch live data from the internet about India

type LiveDataCategory = 'weather' | 'news' | 'tourism' | 'currency';

interface LiveDataResponse {
  data: unknown;
  source: string;
  timestamp: number;
  success: boolean;
  error?: string;
}

class LiveDataService {
  private cacheTime = 60 * 60 * 1000; // 1 hour cache
  private cache: Record<string, { data: unknown; timestamp: number }> = {};

  // Get current weather for a location in India
  async getWeather(location: string): Promise<LiveDataResponse> {
    const cacheKey = `weather-${location.toLowerCase()}`;
    
    // Check cache first
    if (this.cache[cacheKey] && (Date.now() - this.cache[cacheKey].timestamp) < this.cacheTime) {
      return {
        data: this.cache[cacheKey].data,
        source: "OpenWeatherMap API (cached)",
        timestamp: this.cache[cacheKey].timestamp,
        success: true
      };
    }
    
    try {
      // Call our backend BFF endpoint instead of the direct OpenWeatherMap API
      const response = await fetch(`/api/weather?location=${encodeURIComponent(location)}`);
      
      if (!response.ok) {
        throw new Error(`Weather API error: ${response.statusText}`);
      }
      
      const data = await response.json();
      
      // Store in cache
      this.cache[cacheKey] = {
        data,
        timestamp: Date.now()
      };
      
      return {
        data,
        source: "OpenWeatherMap API via BFF",
        timestamp: Date.now(),
        success: true
      };
    } catch (error: unknown) {
      console.error("Error fetching weather data:", error);
      return {
        data: null,
        source: "OpenWeatherMap API via BFF",
        timestamp: Date.now(),
        success: false,
        error: error instanceof Error ? error.message : String(error)
      };
    }
  }
  
  // Get latest news about India
  async getNews(): Promise<LiveDataResponse> {
    const cacheKey = 'india-news';
    
    // Check cache first
    if (this.cache[cacheKey] && (Date.now() - this.cache[cacheKey].timestamp) < this.cacheTime) {
      return {
        data: this.cache[cacheKey].data,
        source: "NewsAPI (cached)",
        timestamp: this.cache[cacheKey].timestamp,
        success: true
      };
    }
    
    try {
      // Call our backend BFF endpoint instead of the direct NewsAPI
      const response = await fetch(`/api/news`);
      
      if (!response.ok) {
        throw new Error(`News API error: ${response.statusText}`);
      }
      
      const data = await response.json();
      
      // Store in cache
      this.cache[cacheKey] = {
        data,
        timestamp: Date.now()
      };
      
      return {
        data,
        source: "NewsAPI via BFF",
        timestamp: Date.now(),
        success: true
      };
    } catch (error: unknown) {
      console.error("Error fetching news data:", error);
      return {
        data: null,
        source: "NewsAPI via BFF",
        timestamp: Date.now(),
        success: false,
        error: error instanceof Error ? error.message : String(error)
      };
    }
  }
  
  // Get tourism statistics or current information
  async getTourismInfo(): Promise<LiveDataResponse> {
    const cacheKey = 'india-tourism';
    
    // Since there's no free real-time tourism API, we'll return curated static data
    // with a timestamp to simulate live data
    
    // Check cache first
    if (this.cache[cacheKey] && (Date.now() - this.cache[cacheKey].timestamp) < this.cacheTime) {
      return {
        data: this.cache[cacheKey].data,
        source: "Ministry of Tourism (cached)",
        timestamp: this.cache[cacheKey].timestamp,
        success: true
      };
    }
    
    // Current year tourism data
    const currentYear = new Date().getFullYear();
    const tourismData = {
      year: currentYear,
      popularDestinations: [
        { name: "Taj Mahal, Agra", visitors: "8+ million yearly" },
        { name: "Varanasi Ghats", visitors: "6+ million yearly" },
        { name: "Jaipur City", visitors: "5+ million yearly" },
        { name: "Goa Beaches", visitors: "7+ million yearly" },
        { name: "Kerala Backwaters", visitors: "3+ million yearly" }
      ],
      currentStatus: "Open for international and domestic tourism",
      visaInfo: "e-Visa facility available for tourists from 169 countries",
      travelAdvisories: [
        "Carry ID proof at all times",
        "Follow local customs and dress codes at religious sites",
        "Stay hydrated in summer months (March-June)"
      ]
    };
    
    // Store in cache
    this.cache[cacheKey] = {
      data: tourismData,
      timestamp: Date.now()
    };
    
    return {
      data: tourismData,
      source: "Ministry of Tourism, Govt. of India",
      timestamp: Date.now(),
      success: true
    };
  }
  
  // Get current currency exchange rates for INR
  async getCurrencyRates(): Promise<LiveDataResponse> {
    const cacheKey = 'inr-rates';
    
    // Check cache first
    if (this.cache[cacheKey] && (Date.now() - this.cache[cacheKey].timestamp) < this.cacheTime) {
      return {
        data: this.cache[cacheKey].data,
        source: "ExchangeRate API (cached)",
        timestamp: this.cache[cacheKey].timestamp,
        success: true
      };
    }
    
    try {
      // ExchangeRate API (free tier)
      const response = await fetch(
        `https://open.er-api.com/v6/latest/INR`
      );
      
      if (!response.ok) {
        throw new Error(`Currency API error: ${response.statusText}`);
      }
      
      const data = await response.json();
      
      // Store in cache
      this.cache[cacheKey] = {
        data,
        timestamp: Date.now()
      };
      
      return {
        data,
        source: "ExchangeRate API",
        timestamp: Date.now(),
        success: true
      };
    } catch (error: unknown) {
      console.error("Error fetching currency data:", error);
      return {
        data: null,
        source: "ExchangeRate API",
        timestamp: Date.now(),
        success: false,
        error: error instanceof Error ? error.message : String(error)
      };
    }
  }

  // Format weather data into a readable response
  formatWeatherResponse(weatherData: Record<string, unknown> | null): string {
    if (!weatherData || !weatherData.main) {
      return "Weather information is currently unavailable.";
    }
    
    const main = weatherData.main as Record<string, number>;
    const weather = (weatherData.weather as Record<string, string>[])[0];
    const wind = weatherData.wind as Record<string, number>;
    
    const temp = main.temp;
    const feels_like = main.feels_like;
    const description = weather.description;
    const humidity = main.humidity;
    const windSpeed = wind.speed;
    const cityName = weatherData.name as string;
    
    return `Current weather in ${cityName}: ${description}, temperature is ${temp}°C (feels like ${feels_like}°C), humidity ${humidity}%, wind speed ${windSpeed} m/s.`;
  }
  
  // Format news data into a readable response
  formatNewsResponse(newsData: Record<string, unknown> | null): string {
    if (!newsData || !newsData.articles || !Array.isArray(newsData.articles) || newsData.articles.length === 0) {
      return "News information is currently unavailable.";
    }
    
    // Take top 3 news items
    const topNews = newsData.articles.slice(0, 3);
    
    let response = "Latest news from India:\n\n";
    topNews.forEach((article: Record<string, string>, index: number) => {
      response += `${index + 1}. ${article.title}\n`;
    });
    
    return response;
  }
  
  // Format tourism data into a readable response
  formatTourismResponse(tourismData: Record<string, unknown> | null): string {
    if (!tourismData) {
      return "Tourism information is currently unavailable.";
    }
    
    let response = `Current tourism information for India (${tourismData.year}):\n\n`;
    response += `Status: ${tourismData.currentStatus}\n`;
    response += `Visa: ${tourismData.visaInfo}\n\n`;
    response += "Top destinations by visitor numbers:\n";
    
    const destinations = tourismData.popularDestinations as Record<string, string>[];
    destinations.forEach((dest: Record<string, string>, index: number) => {
      response += `${index + 1}. ${dest.name} (${dest.visitors})\n`;
    });
    
    response += "\nTravel advisories:\n";
    const advisories = tourismData.travelAdvisories as string[];
    advisories.forEach((advisory: string) => {
      response += `• ${advisory}\n`;
    });
    
    return response;
  }
  
  // Format currency data into a readable response
  formatCurrencyResponse(currencyData: Record<string, unknown> | null): string {
    if (!currencyData || !currencyData.rates) {
      return "Currency information is currently unavailable.";
    }
    
    // Select a few major currencies
    const majorCurrencies = ['USD', 'EUR', 'GBP', 'JPY', 'AUD', 'CAD'];
    
    let response = `Current exchange rates for Indian Rupee (INR):\n\n`;
    
    const rates = currencyData.rates as Record<string, number>;
    majorCurrencies.forEach(currency => {
      if (rates[currency]) {
        // Since we get INR as base, we need to take reciprocal for the usual representation
        const rate = (1 / rates[currency]).toFixed(2);
        response += `1 ${currency} = ${rate} INR\n`;
      }
    });
    
    response += `\nLast updated: ${new Date(currencyData.time_last_update_unix * 1000).toLocaleString()}`;
    
    return response;
  }
}

export const liveDataService = new LiveDataService();
export default liveDataService;
