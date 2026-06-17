
import { OpenAIConfig } from '@/components/chatbot/types';

// API key must be provided via configuration — never hardcode keys
const DEFAULT_API_KEY = "";

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
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          prompt,
          conversationHistory,
          model: this.model,
          temperature: this.temperature,
          maxTokens: this.maxTokens
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Chat API error:", errorData);
        throw new Error(`Chat API error: ${errorData.error || response.statusText}`);
      }

      const data = await response.json();
      return data.choices[0].message.content;
    } catch (error) {
      console.error("Error calling Chat API:", error);
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
