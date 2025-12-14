import React, { useRef, useEffect, useState } from 'react'
import { ArrowUp } from 'lucide-react'
import axios from 'axios';

const ChatField = () => {
  const [messages, setMessages] = useState([
    { role: 'assistant', content: 'Hello! How can I help you today?' }
  ]);
  const [input, setInput] = useState('');
  const messagesEndRef = useRef(null);
  const [loading, setLoading] = useState(false);

  // Auto-scroll to bottom when new messages arrive
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim() || loading) return;

    try {
      setLoading(true);
      
      // Add user message
      const userMessage = { role: 'user', content: input };
      setMessages(prev => [...prev, userMessage]);
  
      const currentInput = input;
      setInput('');
      
      const response = await axios.get('http://localhost:3000/chat', {
        params: {
          userQuery: currentInput,
        }
      });

      // Add AI response
      const aiResponse = { role: 'assistant', content: response.data.response };
      setMessages(prev => [...prev, aiResponse]);
      
    } catch (error) {
      console.error('Error:', error);
      
      // Add error message to chat
      const errorMessage = { 
        role: 'assistant', 
        content: 'Sorry, I encountered an error. Please try again.' 
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen w-full flex flex-col">
      {/* Messages Container - Scrollable */}
      <div className="flex-1 overflow-y-auto px-4 py-6">
        <div className="max-w-4xl mx-auto space-y-4">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[80%] rounded-lg px-4 py-3 ${
                  message.role === 'user'
                    ? 'bg-blue-600 text-white'
                    : 'bg-white text-gray-800 border border-gray-200'
                }`}
              >
                <p className="text-sm whitespace-pre-wrap text-justify">{message.content}</p>
              </div>
            </div>
          ))}
          
          {/* Loading indicator */}
          {loading && (
            <div className="flex justify-start">
              <div className="bg-white text-gray-800 border border-gray-200 rounded-lg px-4 py-3">
                <div className="flex items-center gap-2">
                  <div className="flex gap-1">
                    <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
                    <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
                    <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
                  </div>
                  <span className="text-sm text-gray-600">Thinking...</span>
                </div>
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input Container - Fixed at Bottom */}
      <div className="border-t border-gray-300 px-4 py-4">
        <form onSubmit={handleSend} className="max-w-3xl mx-auto">
          <div className="flex items-center gap-2 border border-gray-300 rounded-full shadow-sm">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Send a message..."
              disabled={loading}
              className="flex-1 px-4 py-3 bg-transparent outline-none text-white  disabled:opacity-50"
            />
            <button
              type="submit"
              disabled={!input.trim() || loading}
              className="mr-2 p-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
            >
              {loading ? (
                <div className="animate-spin">
                  <ArrowUp size={20} />
                </div>
              ) : (
                <ArrowUp size={20} />
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default ChatField
