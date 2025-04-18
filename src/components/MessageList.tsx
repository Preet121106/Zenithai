import React from 'react';
import { UserCircle2 } from 'lucide-react';
import { Message } from '../types';
import MessageContent from './MessageContent';

interface MessageListProps {
  messages: Message[];
}

const MessageList: React.FC<MessageListProps> = ({ messages }) => {
  return (
    <div className="space-y-6">
      {messages.map((message, index) => (
        <div 
          key={index}
          className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
        >
          <div 
            className={`flex max-w-3xl ${
              message.role === 'user' 
                ? 'flex-row-reverse bg-blue-50 dark:bg-blue-900/30 rounded-2xl rounded-tr-none' 
                : 'bg-white dark:bg-gray-800 rounded-2xl rounded-tl-none'
            } p-4 shadow-sm`}
          >
            <div className="flex-shrink-0 mr-4">
              {message.role === 'user' ? (
                <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-800 flex items-center justify-center">
                  <UserCircle2 size={20} className="text-blue-600 dark:text-blue-300" />
                </div>
              ) : (
                <div className="w-8 h-8 rounded-full bg-purple-100 dark:bg-purple-800 flex items-center justify-center">
                  <BrainCircuit size={20} className="text-purple-600 dark:text-purple-300" />
                </div>
              )}
            </div>
            <div className="flex-1">
              <div className="font-medium text-sm text-gray-500 dark:text-gray-400 mb-1">
                {message.role === 'user' ? 'You' : 'ZenithAI'}
              </div>
              <MessageContent content={message.content} />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

// Import needed at the top
import { BrainCircuit } from 'lucide-react';

export default MessageList;