
import { useChatbot } from '@/components/chatbot/ChatbotProvider';
import { AIConfig, AIModelProvider, OpenAIConfig } from '@/components/chatbot/types';
import openAIService from '@/services/openai-service';
import multiAIService from '@/services/multi-ai-service';

// Expose the chatbot hook for components to use
const useChatbotDialog = () => {
  const chatbot = useChatbot();
  
  // Add convenience methods for OpenAI API
  const setOpenAIApiKey = (apiKey: string) => {
    openAIService.setApiKey(apiKey);
    multiAIService.setApiKey('openai', apiKey);
    chatbot.updateOpenAIConfig({ apiKey });
  };
  
  const configureOpenAI = (config: Partial<OpenAIConfig>) => {
    chatbot.updateOpenAIConfig(config);
  };

  // Add methods for multi-provider AI configuration
  const setAIProvider = (provider: AIModelProvider) => {
    multiAIService.setProvider(provider);
  };

  const setAIProviderApiKey = (provider: AIModelProvider, apiKey: string) => {
    multiAIService.setApiKey(provider, apiKey);
    
    // Also update OpenAI if that's the provider
    if (provider === 'openai') {
      openAIService.setApiKey(apiKey);
      chatbot.updateOpenAIConfig({ apiKey });
    }
  };
  
  // Set Qwen as the default provider
  setAIProvider('qwen');
  
  return {
    ...chatbot,
    setOpenAIApiKey,
    configureOpenAI,
    setAIProvider,
    setAIProviderApiKey
  };
};

export { useChatbotDialog };
export default useChatbotDialog;
