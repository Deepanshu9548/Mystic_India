
import { OpenAIConfig } from '@/components/chatbot/types';

// Default API key (you'll replace this later)
const DEFAULT_API_KEY = "sk-placeholder-key-replace-with-real-key-later";

export class OpenAIService {
  private apiKey: string;
  private model: string;
  private organization?: string;
  private temperature: number;
  private maxTokens: number;

  constructor(config?: Partial<OpenAIConfig>) {
    this.apiKey = config?.apiKey || DEFAULT_API_KEY;
    this.model = config?.model || "gpt-3.5-turbo";
    this.organization = config?.organization;
    this.temperature = config?.temperature || 0.7;
    this.maxTokens = config?.maxTokens || 150;
  }

  async generateResponse(prompt: string, conversationHistory: {role: string, content: string}[] = []): Promise<string> {
    try {
      const headers = {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${this.apiKey}`
      };

      if (this.organization) {
        headers["OpenAI-Organization"] = this.organization;
      }

      const messages = [
        { role: "system", content: "You are a knowledgeable AI assistant focused on Indian culture, geography, travel, and heritage. You know the capital cities, important landmarks, historical facts, festivals, cuisine, and cultural aspects about all Indian states and union territories. Provide detailed information about India's geography, history, arts, sports, wildlife, economy, and travel tips. When asked about current information like weather, news, or events, mention that you can pull live data for the most accurate information. Keep responses concise but informative." },
        ...conversationHistory,
        { role: "user", content: prompt }
      ];

      const response = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers,
        body: JSON.stringify({
          model: this.model,
          messages,
          temperature: this.temperature,
          max_tokens: this.maxTokens
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("OpenAI API error:", errorData);
        throw new Error(`OpenAI API error: ${errorData.error?.message || response.statusText}`);
      }

      const data = await response.json();
      return data.choices[0].message.content;
    } catch (error) {
      console.error("Error calling OpenAI API:", error);
      throw error;
    }
  }

  setApiKey(apiKey: string): void {
    this.apiKey = apiKey;
  }

  updateConfig(config: Partial<OpenAIConfig>): void {
    if (config.apiKey) this.apiKey = config.apiKey;
    if (config.model) this.model = config.model;
    if (config.organization !== undefined) this.organization = config.organization;
    if (config.temperature !== undefined) this.temperature = config.temperature;
    if (config.maxTokens !== undefined) this.maxTokens = config.maxTokens;
  }
}

export const openAIService = new OpenAIService();

export default openAIService;
