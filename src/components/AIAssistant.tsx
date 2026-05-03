import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, X, Send, Sparkles, Bot, ChevronDown, Trash2 } from 'lucide-react';
import { getAIAdvisorResponse } from '../services/aiService';
import { useSounds } from './SoundProvider';

interface Message {
  role: 'user' | 'model';
  content: string;
}

export function AIAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: 'model', content: 'Guten Tag. Ich bin dein Europa-Berater. Wie kann ich dir heute beim Verständnis der Union behilflich sein?' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { playClick } = useSounds();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setIsLoading(true);

    const history = messages.map(m => ({
      role: m.role,
      parts: [{ text: m.content }]
    }));

    const response = await getAIAdvisorResponse(userMessage, history);
    
    setMessages(prev => [...prev, { role: 'model', content: response || '...' }]);
    setIsLoading(false);
  };

  const clearChat = () => {
    setMessages([{ role: 'model', content: 'Guten Tag. Ich bin dein Europa-Berater. Wie kann ich dir heute beim Verständnis der Union behilflich sein?' }]);
  };

  return (
    <>
      {/* Floating Toggle Button */}
      <div className="fixed bottom-6 right-6 z-[100]">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => {
            playClick();
            setIsOpen(!isOpen);
          }}
          className={`w-16 h-16 rounded-2xl flex items-center justify-center shadow-2xl transition-colors duration-500 relative group overflow-hidden ${isOpen ? 'bg-white text-eu-dark' : 'bg-eu-gold text-eu-dark'}`}
        >
          <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
          <AnimatePresence mode="wait">
            {isOpen ? (
              <motion.div
                key="close"
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
              >
                <X size={24} />
              </motion.div>
            ) : (
              <motion.div
                key="open"
                initial={{ rotate: 90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: -90, opacity: 0 }}
                className="flex items-center justify-center"
              >
                <Bot size={28} />
              </motion.div>
            )}
          </AnimatePresence>
          
          {/* Pulse animation for the bot icon when closed */}
          {!isOpen && (
            <span className="absolute inset-0 rounded-2xl border-2 border-eu-gold animate-ping opacity-20 pointer-events-none" />
          )}
        </motion.button>
      </div>

      {/* Chat Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20, transformOrigin: 'bottom right' }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="fixed bottom-24 right-6 w-[90vw] md:w-[400px] h-[600px] max-h-[70vh] bg-eu-dark/90 backdrop-blur-2xl border border-white/10 rounded-3xl z-[100] shadow-[0_30px_100px_rgba(0,0,0,0.6)] flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="p-5 border-b border-white/10 flex items-center justify-between bg-white/2">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-eu-gold/10 rounded-xl flex items-center justify-center border border-eu-gold/20">
                  <Sparkles className="text-eu-gold" size={18} />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white tracking-widest uppercase">Europa-Berater</h3>
                  <div className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="text-[10px] text-emerald-500 font-bold uppercase tracking-wider">Online</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button 
                  onClick={clearChat}
                  title="Chat leeren"
                  className="p-2 hover:bg-white/5 rounded-lg text-slate-500 hover:text-white transition-colors"
                >
                  <Trash2 size={16} />
                </button>
                <button 
                  onClick={() => setIsOpen(false)}
                  className="p-2 hover:bg-white/5 rounded-lg text-slate-500 hover:text-white transition-colors"
                >
                  <ChevronDown size={20} />
                </button>
              </div>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-5 space-y-6 custom-scrollbar">
              {messages.map((m, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: m.role === 'user' ? 10 : -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`max-w-[85%] p-4 rounded-2xl text-sm leading-relaxed ${
                    m.role === 'user' 
                      ? 'bg-eu-gold text-eu-dark font-medium rounded-tr-none font-display' 
                      : 'bg-white/5 text-slate-200 border border-white/5 rounded-tl-none font-sans'
                  }`}>
                    {m.content}
                  </div>
                </motion.div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-white/5 p-4 rounded-2xl rounded-tl-none border border-white/5 flex gap-1">
                    <span className="w-1 h-1 bg-eu-gold/50 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                    <span className="w-1 h-1 bg-eu-gold/50 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                    <span className="w-1 h-1 bg-eu-gold/50 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="p-4 bg-white/2 border-t border-white/5">
              <form 
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSend();
                }}
                className="relative"
              >
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Fragen zur EU stellen..."
                  className="w-full bg-eu-dark/50 border border-white/10 rounded-2xl py-4 pl-5 pr-14 text-sm text-white placeholder:text-slate-600 focus:outline-none focus:border-eu-gold/50 transition-all font-display"
                />
                <button
                  type="submit"
                  disabled={!input.trim() || isLoading}
                  className="absolute right-2 top-2 bottom-2 px-4 bg-eu-gold text-eu-dark rounded-xl flex items-center justify-center disabled:opacity-50 disabled:grayscale transition-all hover:scale-105 active:scale-95"
                >
                  <Send size={18} />
                </button>
              </form>
              <p className="text-[10px] text-slate-600 mt-3 text-center uppercase tracking-widest font-medium">
                Powered by Gemini AI • In Vielfalt geeint
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
