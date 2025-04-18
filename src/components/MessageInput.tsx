import React, { useState, useContext, useRef, useEffect } from 'react';
import { Send } from 'lucide-react';
import { GroqContext } from '../context/GroqContext';

interface MessageInputProps {
  disabled?: boolean;
}

const MessageInput: React.FC<MessageInputProps> = ({ disabled = false }) => {
  const [input, setInput] = useState('');
  const { sendMessage } = useContext(GroqContext);  // Removed apiKey from context
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [input]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim() && !disabled) {
      sendMessage(input);
      setInput('');
      
      // Reset height
      if (textareaRef.current) {
        textareaRef.current.style.height = 'auto';
      }
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="relative">
      <div className="flex items-end rounded-xl border dark:border-gray-700 bg-white dark:bg-gray-800 focus-within:ring-2 focus-within:ring-blue-500 dark:focus-within:ring-blue-400 transition-all overflow-hidden">
        <textarea
          ref={textareaRef}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Ask any study question..."
          className="flex-1 py-3 px-4 resize-none max-h-40 bg-transparent border-0 focus:ring-0 focus:outline-none text-gray-800 dark:text-white"
          rows={1}
          disabled={disabled}
        />
        <button
          type="submit"
          disabled={disabled || !input.trim()}
          className={`p-3 mr-2 mb-2 rounded-lg transition-colors ${
            disabled || !input.trim()
              ? 'bg-gray-100 text-gray-400 dark:bg-gray-700 dark:text-gray-500'
              : 'bg-blue-500 text-white hover:bg-blue-600'
          }`}
          aria-label="Send message"
        >
          <Send size={20} />
        </button>
      </div>
    </form>
  );
};

export default MessageInput;
