import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import { MessageSquare, X, Send, Bot, User, Loader2 } from 'lucide-react';
import Markdown from 'react-markdown';

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [messages, setMessages] = useState([
    { sender: 'bot', text: 'Hi! I am the FindIt AI Concierge. What can I help you discover today?' }
  ]);
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };
  
  useEffect(() => {
    scrollToBottom();
  }, [messages, loading]);

  const sendMessage = async (e) => {
    e.preventDefault();
    if (!query.trim()) return;

    setMessages(prev => [...prev, { sender: 'user', text: query }]);
    setQuery('');
    setLoading(true);

    try {
      const response = await axios.post('http://localhost:5000/api/chat', { message: query });
      setMessages(prev => [...prev, { sender: 'bot', text: response.data.reply }]);
    } catch (error) {
      setMessages(prev => [...prev, { sender: 'bot', text: 'Oops! I experienced a connection glitch. Try again in a second.' }]);
    }
    setLoading(false);
  };

  return (
    <div className="chatbot-container">
      {isOpen && (
        <div className="chatbot-window">
          <div className="chatbot-header">
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <Bot size={24} color="var(--white)" />
              <strong style={{ fontSize: '16px', letterSpacing: '0.5px' }}>FindIt AI Assistant</strong>
            </div>
            <button style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'white' }} onClick={() => setIsOpen(false)}>
              <X size={24} />
            </button>
          </div>
          
          <div className="chatbot-messages">
            {messages.map((msg, index) => (
              <div key={index} className={`chatbot-message ${msg.sender}`} style={{ display: 'flex', gap: '8px', alignItems: 'flex-start', flexDirection: msg.sender === 'user' ? 'row-reverse' : 'row' }}>
                <div style={{ minWidth: '28px', height: '28px', borderRadius: '50%', background: msg.sender === 'bot' ? 'var(--olx-dark)' : 'var(--white)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: msg.sender === 'bot' ? 'white' : 'var(--olx-cyan)' }}>
                  {msg.sender === 'bot' ? <Bot size={16} /> : <User size={16} />}
                </div>
                <div style={{ wordBreak: 'break-word', marginTop: '4px' }}>
                  {msg.sender === 'bot' ? <Markdown>{msg.text}</Markdown> : msg.text}
                </div>
              </div>
            ))}
            {loading && (
              <div className="chatbot-message bot" style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                <div style={{ minWidth: '28px', height: '28px', borderRadius: '50%', background: 'var(--olx-dark)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white' }}>
                  <Bot size={16} />
                </div>
                <Loader2 size={16} className="lucide-spin" style={{ animation: 'spin 1s linear infinite' }} />
                <span style={{ fontSize: '13px', color: 'var(--olx-text-muted)' }}>Thinking...</span>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <form onSubmit={sendMessage} className="chatbot-input-area">
            <input 
              type="text" 
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Ask anything..."
              className="chatbot-input"
            />
            <button type="submit" className="chatbot-send-btn" disabled={loading}>
              <Send size={18} />
            </button>
          </form>
        </div>
      )}

      {!isOpen && (
        <button className="chatbot-toggle" onClick={() => setIsOpen(true)}>
          <MessageSquare size={32} />
        </button>
      )}
    </div>
  );
};

export default Chatbot;
