import React from 'react';
import { BrainCircuit } from 'lucide-react';
import ChatInterface from './components/ChatInterface';
import Header from './components/Header';
import { GroqProvider } from './context/GroqContext';

function App() {
  return (
    <GroqProvider>
      <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
        <Header />
        <main className="flex-1 container mx-auto px-4 py-6 max-w-5xl">
          <ChatInterface />
        </main>
        <footer className="py-4 text-center text-sm text-gray-500 dark:text-gray-400">
          <div className="flex items-center justify-center gap-2">
            <BrainCircuit size={16} />
            <span>ZenithAI © {new Date().getFullYear()}</span>
          </div>
        </footer>
      </div>
    </GroqProvider>
  );
}

export default App;