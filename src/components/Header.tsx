import React, { useContext } from 'react';
import { BrainCircuit, Moon, Settings, Sun } from 'lucide-react';
import { GroqContext } from '../context/GroqContext';

const Header: React.FC = () => {
  const { darkMode, toggleDarkMode, showSettings, setShowSettings } = useContext(GroqContext);

  return (
    <header className="bg-white dark:bg-gray-800 shadow-sm py-4 px-6 transition-colors duration-300">
      <div className="container mx-auto max-w-5xl flex justify-between items-center">
        <div className="flex items-center gap-2">
          <BrainCircuit className="text-blue-500" size={28} />
          <h1 className="text-xl font-bold text-gray-800 dark:text-white">ZenithAI</h1>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={toggleDarkMode}
            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
          >
            {darkMode ? (
              <Sun size={20} className="text-gray-300" />
            ) : (
              <Moon size={20} className="text-gray-700" />
            )}
          </button>
          <button
            onClick={() => setShowSettings(!showSettings)}
            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            aria-label="Settings"
          >
            <Settings size={20} className="text-gray-700 dark:text-gray-300" />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;