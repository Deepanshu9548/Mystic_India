
import { useState, useCallback } from 'react';
import openAIService from '@/services/openai-service';
import multiAIService from '@/services/multi-ai-service';
import { useChatbot } from '@/components/chatbot/ChatbotProvider';
import { findResponseFromTrainingData } from '@/components/chatbot/ChatbotUtils';
import { AIModelProvider } from '@/components/chatbot/types';

export function useOpenAIChat() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [conversationHistory, setConversationHistory] = useState<{role: string, content: string}[]>([]);
  const { config } = useChatbot();
  
  const sendMessage = useCallback(async (message: string, useTrainingFallback = true): Promise<string> => {
    setIsLoading(true);
    setError(null);
    
    try {
      // Add user message to conversation history
      const updatedHistory = [
        ...conversationHistory,
        { role: 'user', content: message }
      ];
      setConversationHistory(updatedHistory);
      
      // Try using the multi-AI service that will attempt different providers, now with Qwen as priority
      const response = await multiAIService.generateResponse(message, conversationHistory);
      
      // Add bot response to conversation history
      setConversationHistory(prev => [
        ...prev,
        { role: 'assistant', content: response }
      ]);
      
      setIsLoading(false);
      return response;
    } catch (err) {
      console.error('Error in AI chat:', err);
      setError(err.message || 'Failed to get response from AI');
      
      // If AI services fail and fallback is enabled, use training data
      if (useTrainingFallback) {
        const fallbackResponse = findResponseFromTrainingData(message);
        return fallbackResponse;
      }
      
      setIsLoading(false);
      return "I'm having trouble connecting to my knowledge base right now. Please try again later.";
    }
  }, [conversationHistory]);
  
  const clearConversation = useCallback(() => {
    setConversationHistory([]);
  }, []);

  const setAIProvider = useCallback((provider: AIModelProvider) => {
    multiAIService.setProvider(provider);
  }, []);

  const setProviderApiKey = useCallback((provider: AIModelProvider, apiKey: string) => {
    multiAIService.setApiKey(provider, apiKey);
  }, []);
  
  return {
    isLoading,
    error,
    sendMessage,
    clearConversation,
    conversationHistory,
    setAIProvider,
    setProviderApiKey
  };
}
