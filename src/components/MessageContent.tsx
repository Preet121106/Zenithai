import React, { useMemo } from 'react';

interface MessageContentProps {
  content: string;
}

// Basic markdown parser for simple formatting
const MessageContent: React.FC<MessageContentProps> = ({ content }) => {
  const formattedContent = useMemo(() => {
    // Convert markdown-like syntax to HTML
    let formatted = content
      // Bold
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      // Italic
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
      // Code blocks
      .replace(/```([\s\S]*?)```/g, '<pre><code>$1</code></pre>')
      // Inline code
      .replace(/`(.*?)`/g, '<code>$1</code>')
      // Lists
      .replace(/^\s*-\s+(.*?)$/gm, '<li>$1</li>')
      // Headers
      .replace(/^### (.*?)$/gm, '<h3>$1</h3>')
      .replace(/^## (.*?)$/gm, '<h2>$1</h2>')
      .replace(/^# (.*?)$/gm, '<h1>$1</h1>')
      // Line breaks
      .replace(/\n\n/g, '<br /><br />');
    
    // Wrap lists
    if (formatted.includes('<li>')) {
      formatted = formatted.replace(/<li>.*?<\/li>/gs, (match) => {
        return `<ul>${match}</ul>`;
      });
    }
    
    return formatted;
  }, [content]);

  return (
    <div 
      className="prose dark:prose-invert prose-sm max-w-none"
      dangerouslySetInnerHTML={{ __html: formattedContent }}
    />
  );
};

export default MessageContent;