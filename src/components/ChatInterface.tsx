import React, { useContext, useRef, useEffect } from 'react';
import { Loader2 } from 'lucide-react';
import MessageList from './MessageList';
import MessageInput from './MessageInput';
import Settings from './Settings';
import { GroqContext } from '../context/GroqContext';

const ChatInterface: React.FC = () => {
  const { messages, isLoading, showSettings, apiKey } = useContext(GroqContext);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Show welcome message if no API key is set
  if (!apiKey && showSettings) {
    return <Settings />;
  }

  return (
    <div className="flex flex-col h-full">
      {showSettings ? (
        <Settings />
      ) : (
        <>
          <div className="flex-1 overflow-hidden mb-4">
            {messages.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center px-4">
                <BrainCircuitAnimation />
                <h2 className="text-2xl font-bold text-gray-700 dark:text-gray-200 mt-6 mb-2">
                  Your Study Assistant
                </h2>
                <p className="text-gray-500 dark:text-gray-400 max-w-md mb-8">
                  Ask any question about your studies. Get help with homework, essay writing, 
                  research, or prepare for exams with instant insights.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full max-w-2xl">
                  {SAMPLE_PROMPTS.map((prompt, index) => (
                    <SamplePrompt key={index} text={prompt} />
                  ))}
                </div>
              </div>
            ) : (
              <div className="space-y-6 pb-4 pt-2">
                <MessageList messages={messages} />
                <div ref={messagesEndRef} />
              </div>
            )}
          </div>

          <MessageInput disabled={isLoading} />

          {isLoading && (
            <div className="flex justify-center mt-4">
              <div className="inline-flex items-center px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-900/30 text-blue-500 dark:text-blue-300">
                <Loader2 size={16} className="animate-spin mr-2" />
                <span className="text-sm">Generating response...</span>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

// Brain animation component for empty state
const BrainCircuitAnimation = () => (
  <div className="w-20 h-20 rounded-full bg-blue-50 dark:bg-blue-900/30 flex items-center justify-center">
    <BrainCircuit size={40} className="text-blue-500 animate-pulse" />
  </div>
);

// Sample prompt component
const SamplePrompt: React.FC<{ text: string }> = ({ text }) => {
  const { sendMessage } = useContext(GroqContext);
  
  return (
    <button
      onClick={() => sendMessage(text)}
      className="p-3 border border-gray-200 dark:border-gray-700 rounded-lg text-left hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors text-sm"
    >
      {text}
    </button>
  );
};

// Sample prompts
const SAMPLE_PROMPTS = [
  "Explain the concept of quantum entanglement",
  "Summarize the key events of World War II",
  "Help me understand photosynthesis",
  "What are the main themes in Shakespeare's Macbeth?"
];

// Import needed at the top
import { BrainCircuit } from 'lucide-react';

export default ChatInterface;