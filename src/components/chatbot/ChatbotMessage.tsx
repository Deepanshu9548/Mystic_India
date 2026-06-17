
import React from 'react';
import { Message } from './types';

interface ChatbotMessageProps {
  message: Message;
  theme: 'light' | 'dark';
}

const ChatbotMessage: React.FC<ChatbotMessageProps> = ({ message, theme }) => {
  if (message.sender === 'user') {
    return (
      <div className="text-right mb-6">
        <div className="inline-block p-3 rounded-lg bg-indigo-600 text-white max-w-[90%] shadow-sm">
          {message.text}
        </div>
      </div>
    );
  }
  
  return (
    <div className="text-left mb-6">
      <div className="inline-block p-3 rounded-lg backdrop-blur-sm bg-white/80 dark:bg-gray-800/90 text-gray-800 dark:text-gray-200 max-w-[90%] shadow-sm">
        {message.text}
      </div>
    </div>
  );
};

export default ChatbotMessage;
