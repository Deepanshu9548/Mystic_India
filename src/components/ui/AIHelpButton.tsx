
import React from 'react';
import { MessageSquareText } from 'lucide-react';
import { motion } from 'framer-motion';

interface AIHelpButtonProps {
  question?: string;
  className?: string;
  variant?: 'icon' | 'text' | 'pill';
  label?: string;
  onClick?: () => void;
}

const AIHelpButton: React.FC<AIHelpButtonProps> = ({ 
  question,
  className = "",
  variant = "icon",
  label = "Ask AI",
  onClick
}) => {
  const handleClick = () => {
    if (onClick) {
      onClick();
    } else {
      // Default fallback behavior
      console.log("AI Help button clicked", question);
    }
  };

  if (variant === 'icon') {
    return (
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={handleClick}
        className={`p-2 rounded-full bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 hover:bg-indigo-200 dark:hover:bg-indigo-900/50 ${className}`}
        aria-label={label}
      >
        <MessageSquareText className="w-4 h-4" />
      </motion.button>
    );
  }

  if (variant === 'pill') {
    return (
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={handleClick}
        className={`px-4 py-1.5 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white hover:from-indigo-600 hover:to-purple-700 text-sm font-medium flex items-center ${className}`}
      >
        <MessageSquareText className="w-3.5 h-3.5 mr-1.5" />
        {label}
      </motion.button>
    );
  }

  // Default text variant
  return (
    <motion.button
      whileHover={{ y: -2 }}
      whileTap={{ y: 0 }}
      onClick={handleClick}
      className={`text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300 text-sm font-medium flex items-center ${className}`}
    >
      <MessageSquareText className="w-3.5 h-3.5 mr-1.5" />
      {label}
    </motion.button>
  );
};

export default AIHelpButton;
