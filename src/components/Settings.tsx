import React, { useContext } from 'react';
import { Save, ArrowLeft, Trash2, BrainCircuit } from 'lucide-react';
import { GroqContext } from '../context/GroqContext';

const Settings: React.FC = () => {
  const { apiKey, clearConversation, setShowSettings } = useContext(GroqContext);

  const handleSave = () => {
    // Set the API key programmatically, or handle it securely
    setShowSettings(false);
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 animate-fadeIn">
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={() => setShowSettings(false)}
          className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
          aria-label="Back"
        >
          <ArrowLeft size={20} className="text-gray-600 dark:text-gray-300" />
        </button>
        <h2 className="text-xl font-bold text-gray-800 dark:text-white">Settings</h2>
        <div className="w-8"></div> {/* Spacer for centering */}
      </div>

      <div className="space-y-6">
        <div>
          <label htmlFor="api-key" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Groq API Key (Hidden for Security)
          </label>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Your API key is set securely. If you need to update it, please do so in the backend or via environment variables.
          </p>
        </div>

        <div>
          <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Conversation</h3>
          <button
            onClick={clearConversation}
            className="flex items-center gap-2 px-4 py-2 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded-lg hover:bg-red-100 dark:hover:bg-red-900/30 transition-colors"
          >
            <Trash2 size={16} />
            <span>Clear conversation history</span>
          </button>
        </div>

        <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
          <div className="flex items-start gap-3">
            <BrainCircuit size={24} className="text-blue-500 mt-0.5" />
            <div>
              <h3 className="font-medium text-blue-700 dark:text-blue-300 mb-1">About Groq AI</h3>
              <p className="text-sm text-blue-600 dark:text-blue-400">
                Groq AI is a high-performance AI inference platform that delivers
                extremely fast response times. ZenithAI uses Groq AI to provide
                intelligent answers to your study questions.ZenithAI can make mistakes.use at your own risk.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6">
        <button
          onClick={handleSave}
          disabled={!apiKey}
          className={`flex items-center justify-center gap-2 w-full py-2 px-4 rounded-lg ${
            !apiKey
              ? "bg-gray-100 text-gray-400 dark:bg-gray-700 dark:text-gray-500"
              : "bg-blue-500 text-white hover:bg-blue-600"
          }`}
        >
          <Save size={16} />
          <span>Save Settings</span>
        </button>
      </div>
    </div>
  );
};

export default Settings;
