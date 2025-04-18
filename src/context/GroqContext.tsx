import React, { createContext, useState, useEffect, ReactNode } from 'react';
import { Message } from '../types';

interface GroqContextType {
  messages: Message[];
  isLoading: boolean;
  apiKey: string | null;
  darkMode: boolean;
  showSettings: boolean;
  sendMessage: (content: string) => Promise<void>;
  setApiKey: (key: string) => void;
  clearConversation: () => void;
  toggleDarkMode: () => void;
  setShowSettings: (show: boolean) => void;
}

export const GroqContext = createContext<GroqContextType>({
  messages: [],
  isLoading: false,
  apiKey: null,
  darkMode: false,
  showSettings: false,
  sendMessage: async () => {},
  setApiKey: () => {},
  clearConversation: () => {},
  toggleDarkMode: () => {},
  setShowSettings: () => {},
});

interface GroqProviderProps {
  children: ReactNode;
}

export const GroqProvider: React.FC<GroqProviderProps> = ({ children }) => {
  const [messages, setMessages] = useState<Message[]>(() => {
    const saved = localStorage.getItem('groq-messages');
    return saved ? JSON.parse(saved) : [];
  });
  const [isLoading, setIsLoading] = useState(false);
  const [apiKey, setApiKey] = useState<string | null>(() => {
    return localStorage.getItem('groq-api-key');
  });
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    const saved = localStorage.getItem('groq-dark-mode');
    return saved ? JSON.parse(saved) : window.matchMedia('(prefers-color-scheme: dark)').matches;
  });
  const [showSettings, setShowSettings] = useState(!apiKey);

  // Apply dark mode class
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('groq-dark-mode', JSON.stringify(darkMode));
  }, [darkMode]);

  // Save messages to localStorage
  useEffect(() => {
    localStorage.setItem('groq-messages', JSON.stringify(messages));
  }, [messages]);

  // Save API key to localStorage
  useEffect(() => {
    if (apiKey) {
      localStorage.setItem('groq-api-key', apiKey);
    } else {
      localStorage.removeItem('groq-api-key');
    }
  }, [apiKey]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const clearConversation = () => {
    setMessages([]);
    setShowSettings(false);
  };

  const sendMessage = async (content: string) => {
    if (!apiKey) {
      setShowSettings(true);
      return;
    }

    const userMessage: Message = { role: 'user', content };
    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);

    try {
      const response = await fetchGroqResponse(content, apiKey, messages);
      const assistantMessage: Message = { 
        role: 'assistant', 
        content: response 
      };
      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      console.error('Error fetching response:', error);
      const errorMessage: Message = { 
        role: 'assistant', 
        content: 'I apologize, but I encountered an error while processing your request. Please try again or check your API key in settings.' 
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <GroqContext.Provider
      value={{
        messages,
        isLoading,
        apiKey,
        darkMode,
        showSettings,
        sendMessage,
        setApiKey,
        clearConversation,
        toggleDarkMode,
        setShowSettings,
      }}
    >
      {children}
    </GroqContext.Provider>
  );
};

// Function to fetch response from Groq API
async function fetchGroqResponse(
  prompt: string,
  apiKey: string,
  previousMessages: Message[]
): Promise<string> {
  // Convert our message format to Groq's expected format
  const messageHistory = previousMessages.map(msg => ({
    role: msg.role,
    content: msg.content
  }));

  const messages = [
    {
      role: "system",
      content: "You are ZenithAI, an educational assistant designed to support students in their academic pursuits. Your primary goal is to offer clear, accurate, and helpful information on a wide range of academic subjects. When providing explanations, aim to be concise yet thorough, using examples to illustrate concepts where applicable. If you're uncertain about a topic, be honest and refrain from providing incorrect or speculative information."
    },
    ...messageHistory,
    {
      role: "user",
      content: prompt
    }
  ];

  try {
    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: 'llama3-8b-8192', // Using Llama 3 model
        messages,
        temperature: 0.7,
        max_tokens: 2048
      })
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error?.message || 'Failed to get response from Groq API');
    }

    const data = await response.json();
    return data.choices[0].message.content;
  } catch (error) {
    console.error('Error calling Groq API:', error);
    throw error;
  }
}