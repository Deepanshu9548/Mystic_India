
import React from 'react';
import { Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

interface ChatbotSuggestionsProps {
  suggestions: string[];
  onSuggestionClick: (suggestion: string) => void;
  theme: string;
}

const ChatbotSuggestions: React.FC<ChatbotSuggestionsProps> = ({ 
  suggestions, 
  onSuggestionClick,
  theme
}) => {
  if (!suggestions.length) return null;
  
  return (
    <div className="p-3 border-t border-gray-200 dark:border-gray-700">
      <div className="flex items-center mb-2">
        <Sparkles className="w-4 h-4 text-indigo-500 mr-2" />
        <span className="text-xs font-medium text-gray-500 dark:text-gray-400">Suggested questions</span>
      </div>
      <div className="flex flex-wrap gap-2">
        {suggestions.map((suggestion, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 * index }}
            onClick={() => onSuggestionClick(suggestion)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`text-xs py-1.5 px-3 rounded-full cursor-pointer
              ${theme === 'dark' 
                ? 'bg-gray-700 hover:bg-gray-600 text-gray-200' 
                : 'bg-indigo-50 hover:bg-indigo-100 text-indigo-700'}`}
          >
            {suggestion}
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default ChatbotSuggestions;
