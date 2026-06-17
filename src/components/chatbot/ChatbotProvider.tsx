
import React, { createContext, useContext, useState, useEffect } from 'react';
import Chatbot from './Chatbot';
import ChatbotButton from './ChatbotButton';
import { ChatbotConfig, OpenAIConfig } from './types';
import openAIService from '@/services/openai-service';

interface ChatbotContextType {
  isOpen: boolean;
  openChatbot: () => void;
  closeChatbot: () => void;
  toggleChatbot: () => void;
  config: ChatbotConfig;
  updateConfig: (newConfig: Partial<ChatbotConfig>) => void;
  updateOpenAIConfig: (config: Partial<OpenAIConfig>) => void;
}

const defaultConfig: ChatbotConfig = {
  useOpenAI: true,
  fallbackToTraining: true,
  welcomeMessage: "Namaste! 🙏 I'm your Mystic India Guide. Ask me about India's heritage, states, cuisines, or festivals, or let me help plan your journey."
};

const ChatbotContext = createContext<ChatbotContextType>({
  isOpen: false,
  openChatbot: () => {},
  closeChatbot: () => {},
  toggleChatbot: () => {},
  config: defaultConfig,
  updateConfig: () => {},
  updateOpenAIConfig: () => {}
});

export const useChatbot = () => useContext(ChatbotContext);

export const ChatbotProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [config, setConfig] = useState<ChatbotConfig>(defaultConfig);

  const openChatbot = () => setIsOpen(true);
  const closeChatbot = () => setIsOpen(false);
  const toggleChatbot = () => setIsOpen(prev => !prev);
  
  const updateConfig = (newConfig: Partial<ChatbotConfig>) => {
    setConfig(prev => ({
      ...prev,
      ...newConfig
    }));
  };
  
  const updateOpenAIConfig = (newOpenAIConfig: Partial<OpenAIConfig>) => {
    setConfig(prev => ({
      ...prev,
      openAIConfig: {
        ...prev.openAIConfig,
        ...newOpenAIConfig
      }
    }));
    
    // Also update the openAIService with the new config
    if (newOpenAIConfig) {
      openAIService.updateConfig(newOpenAIConfig);
    }
  };
  
  // Initialize openAIService with config from context
  useEffect(() => {
    if (config.openAIConfig) {
      openAIService.updateConfig(config.openAIConfig);
    }
  }, [config.openAIConfig]);

  return (
    <ChatbotContext.Provider value={{ 
      isOpen, 
      openChatbot, 
      closeChatbot, 
      toggleChatbot,
      config,
      updateConfig,
      updateOpenAIConfig
    }}>
      {children}
      <ChatbotButton onClick={toggleChatbot} />
      <Chatbot isOpen={isOpen} onClose={closeChatbot} />
    </ChatbotContext.Provider>
  );
};

export default ChatbotProvider;
