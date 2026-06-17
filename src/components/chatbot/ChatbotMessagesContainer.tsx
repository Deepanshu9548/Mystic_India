
import React, { useRef, useEffect } from 'react';
import { Message } from './types';
import ChatbotMessage from './ChatbotMessage';
import { AnimatePresence, motion } from 'framer-motion';

interface ChatbotMessagesContainerProps {
  messages: Message[];
  isLoading: boolean;
  theme: string;
  backgroundImage?: string;
}

const ChatbotMessagesContainer: React.FC<ChatbotMessagesContainerProps> = ({ 
  messages, 
  isLoading,
  theme,
  backgroundImage
}) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  return (
    <div 
      className="h-[350px] overflow-y-auto py-3 px-4 scrollbar-hide"
      style={{ 
        backgroundImage: backgroundImage ? `url(${backgroundImage})` : undefined,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
        backgroundBlendMode: 'soft-light',
        backgroundColor: theme === 'dark' ? 'rgba(17, 24, 39, 0.8)' : 'rgba(255, 255, 255, 0.8)'
      }}
    >
      <AnimatePresence initial={false}>
        {messages.map((message, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            <ChatbotMessage 
              message={message} 
              theme={theme as 'light' | 'dark'}
            />
          </motion.div>
        ))}
        
        {isLoading && (
          <motion.div 
            className="text-left mb-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="inline-block p-3 rounded-lg backdrop-blur-sm bg-white/80 dark:bg-gray-800/90 text-gray-800 dark:text-gray-200 max-w-[90%] shadow-sm">
              <div className="flex items-center space-x-1">
                <motion.div 
                  className="w-2 h-2 rounded-full bg-indigo-600 dark:bg-indigo-400"
                  animate={{
                    scale: [1, 1.5, 1],
                    opacity: [1, 0.5, 1]
                  }}
                  transition={{
                    duration: 1,
                    repeat: Infinity,
                    repeatType: 'loop',
                    ease: "easeInOut",
                    delay: 0
                  }}
                />
                <motion.div 
                  className="w-2 h-2 rounded-full bg-indigo-500 dark:bg-indigo-500"
                  animate={{
                    scale: [1, 1.5, 1],
                    opacity: [1, 0.5, 1]
                  }}
                  transition={{
                    duration: 1,
                    repeat: Infinity,
                    repeatType: 'loop',
                    ease: "easeInOut",
                    delay: 0.3
                  }}
                />
                <motion.div 
                  className="w-2 h-2 rounded-full bg-indigo-400 dark:bg-indigo-600"
                  animate={{
                    scale: [1, 1.5, 1],
                    opacity: [1, 0.5, 1]
                  }}
                  transition={{
                    duration: 1,
                    repeat: Infinity,
                    repeatType: 'loop',
                    ease: "easeInOut",
                    delay: 0.6
                  }}
                />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      <div ref={messagesEndRef} />
    </div>
  );
};

export default ChatbotMessagesContainer;
