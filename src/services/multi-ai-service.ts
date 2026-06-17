
import { AIConfig, AIModelProvider } from '@/components/chatbot/types';
import openAIService from './openai-service';

// Services for different AI providers
import { createGeminiService } from './ai-providers/gemini-service';
import { createClaudeService } from './ai-providers/claude-service';
import { createQwenService } from './ai-providers/qwen-service';

export class MultiAIService {
  private currentProvider: AIModelProvider = 'qwen'; // Changed default to Qwen
  private apiKeys: Record<AIModelProvider, string> = {
    'openai': '',
    'gemini': '',
    'claude': '',
    'qwen': ''
  };
  private systemPrompt = "You are a knowledgeable AI assistant focused on Indian culture, geography, travel, and heritage. You know the capital cities, important landmarks, and historical facts about all Indian states and union territories. Provide detailed information about India's states, capitals, cuisine, festivals, and travel tips. Keep responses concise but informative.";

  constructor() {
    // Initialize with any saved API keys from localStorage
    this.loadApiKeys();
  }

  private loadApiKeys() {
    try {
      const savedKeys = localStorage.getItem('ai_api_keys');
      if (savedKeys) {
        this.apiKeys = { ...this.apiKeys, ...JSON.parse(savedKeys) };
      }
    } catch (error) {
      console.error("Error loading API keys from localStorage:", error);
    }
  }

  private saveApiKeys() {
    try {
      localStorage.setItem('ai_api_keys', JSON.stringify(this.apiKeys));
    } catch (error) {
      console.error("Error saving API keys to localStorage:", error);
    }
  }

  setApiKey(provider: AIModelProvider, apiKey: string): void {
    this.apiKeys[provider] = apiKey;
    this.saveApiKeys();

    // Also update OpenAI service directly
    if (provider === 'openai') {
      openAIService.setApiKey(apiKey);
    }
  }

  setProvider(provider: AIModelProvider): void {
    this.currentProvider = provider;
  }

  async generateResponse(prompt: string, conversationHistory: {role: string, content: string}[] = []): Promise<string> {
    // Try current provider first
    try {
      return await this.tryProvider(this.currentProvider, prompt, conversationHistory);
    } catch (error) {
      console.error(`Error with ${this.currentProvider} provider:`, error);
      
      // Try other providers in sequence, prioritizing Qwen first
      const providers: AIModelProvider[] = ['qwen', 'openai', 'gemini', 'claude'];
      
      for (const provider of providers) {
        if (provider === this.currentProvider) continue; // Skip already tried provider
        
        if (this.apiKeys[provider]) {
          try {
            console.log(`Trying fallback provider: ${provider}`);
            return await this.tryProvider(provider, prompt, conversationHistory);
          } catch (fallbackError) {
            console.error(`Error with fallback provider ${provider}:`, fallbackError);
          }
        }
      }
      
      // If all providers fail, throw error
      throw new Error("All AI providers failed to generate a response");
    }
  }

  private async tryProvider(provider: AIModelProvider, prompt: string, conversationHistory: {role: string, content: string}[]): Promise<string> {
    if (!this.apiKeys[provider]) {
      throw new Error(`No API key available for ${provider}`);
    }

    switch (provider) {
      case 'openai':
        return await openAIService.generateResponse(prompt, conversationHistory);
      
      case 'gemini':
        return await createGeminiService(this.apiKeys.gemini)
          .generateResponse(prompt, this.systemPrompt, conversationHistory);
      
      case 'claude':
        return await createClaudeService(this.apiKeys.claude)
          .generateResponse(prompt, this.systemPrompt, conversationHistory);
      
      case 'qwen':
        return await createQwenService(this.apiKeys.qwen)
          .generateResponse(prompt, this.systemPrompt, conversationHistory);
      
      default:
        throw new Error(`Unsupported provider: ${provider}`);
    }
  }
}

export const multiAIService = new MultiAIService();

export default multiAIService;
