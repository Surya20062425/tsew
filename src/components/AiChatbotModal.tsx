import React, { useState, useRef, useEffect } from 'react';
import { 
  Sparkles, MessageSquare, Send, X, Minimize2, Maximize2, 
  RotateCcw, Bot, User, ShieldCheck, ArrowRight, CheckCircle2,
  ExternalLink, HelpCircle, Layers, Award
} from 'lucide-react';

interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
  actions?: Array<{ label: string; actionPath: string }>;
}

interface AiChatbotModalProps {
  navigate: (path: string, creatorId?: string) => void;
}

const INITIAL_MESSAGES: ChatMessage[] = [
  {
    id: 'welcome-msg',
    sender: 'assistant',
    text: `Hello! I am BridgeBot, your CreatorBridge.AI assistant. I know everything about our curated creator network, $250k commercial IP indemnity, dual-signature milestone escrow, and AI creator verification standards.\n\nHow can I help you today?`,
    timestamp: 'Just now',
    actions: [
      { label: 'Explore Verified Creators', actionPath: 'explore-creators' },
      { label: 'How Escrow Protects You', actionPath: 'how-it-works' },
    ],
  },
];

const SUGGESTED_QUESTIONS = [
  'How does Milestone Escrow protect brand payments?',
  'Find me a photoreal automotive AI filmmaker',
  'How does the AI verify creator portfolios?',
  'What is the $250k Commercial IP Indemnity policy?',
  'How do I post a brief and review 4K deliverables?',
];

export const AiChatbotModal: React.FC<AiChatbotModalProps> = ({ navigate }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>(INITIAL_MESSAGES);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen && !isMinimized) {
      scrollToBottom();
    }
  }, [messages, isOpen, isMinimized]);

  const handleSendMessage = async (textToSend?: string) => {
    const text = (textToSend || inputValue).trim();
    if (!text || isLoading) return;

    const userMessage: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMessage]);
    if (!textToSend) setInputValue('');
    setIsLoading(true);

    try {
      // Map history for server
      const history = messages.slice(-6).map((m) => ({
        role: m.sender === 'user' ? 'user' : 'model',
        text: m.text,
      }));

      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: text, history }),
      });

      if (!res.ok) {
        throw new Error(`Server returned status ${res.status}`);
      }

      const data = await res.json();
      const replyText = data.reply || 'I am having trouble retrieving that detail right now. Please explore our creators directly or try again in a moment.';

      // Determine smart contextual actions
      const actions: Array<{ label: string; actionPath: string }> = [];
      const lower = text.toLowerCase();
      if (lower.includes('alex') || lower.includes('automotive') || lower.includes('car')) {
        actions.push({ label: 'View Alex Morgan Bento Profile', actionPath: 'creator-profile' });
      }
      if (lower.includes('verify') || lower.includes('portfolio') || lower.includes('creator')) {
        actions.push({ label: 'Creator AI Verification Gate', actionPath: 'register' });
      }
      if (lower.includes('brief') || lower.includes('post') || lower.includes('hire')) {
        actions.push({ label: 'Launch Brief Scoper', actionPath: 'brief' });
      }
      if (lower.includes('opportunity') || lower.includes('brand brief') || lower.includes('pitch') || lower.includes('commission')) {
        actions.push({ label: 'Browse Brand Briefs ($18.5k)', actionPath: 'brand-briefs' });
      }
      if (lower.includes('escrow') || lower.includes('workspace') || lower.includes('review')) {
        actions.push({ label: 'Open Project Workspace', actionPath: 'workspace' });
      }

      const botMessage: ChatMessage = {
        id: `bot-${Date.now()}`,
        sender: 'assistant',
        text: replyText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        actions: actions.length > 0 ? actions : undefined,
      };

      setMessages((prev) => [...prev, botMessage]);
    } catch (err) {
      console.error('Chat error:', err);
      // Friendly fallback
      const fallbackMsg: ChatMessage = {
        id: `bot-${Date.now()}`,
        sender: 'assistant',
        text: `CreatorBridge guarantees commercial IP indemnity ($250k backing) and protects brand funds through dual-signature Milestone Escrow vaults. You can explore verified creators, post a brief, or register your brand or creator account at any time!`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        actions: [
          { label: 'Explore Creators', actionPath: 'explore-creators' },
          { label: 'Post Project Brief', actionPath: 'brief' },
        ],
      };
      setMessages((prev) => [...prev, fallbackMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleResetChat = () => {
    setMessages(INITIAL_MESSAGES);
  };

  return (
    <>
      {/* Floating launcher trigger button */}
      {!isOpen && (
        <div className="fixed bottom-6 right-6 z-40 flex items-center gap-3">
          <div className="hidden sm:flex items-center gap-2 bg-white/95 backdrop-blur-md px-3.5 py-2 rounded-full shadow-lg border border-slate-200 text-xs text-slate-700 animate-fade-in pointer-events-none">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="font-medium">Have questions? Ask BridgeBot AI</span>
          </div>

          <button
            onClick={() => setIsOpen(true)}
            aria-label="Open CreatorBridge AI Assistant"
            className="w-14 h-14 rounded-full bg-[#000E23] text-white shadow-2xl border-2 border-[#175CB5] hover:border-[#6AA0FD] flex items-center justify-center transition-all transform hover:scale-105 active:scale-95 group cursor-pointer relative"
          >
            <div className="absolute inset-0 rounded-full bg-[#175CB5]/30 blur-md group-hover:bg-[#175CB5]/50 transition-all pointer-events-none" />
            <Sparkles className="w-6 h-6 text-[#6AA0FD] group-hover:rotate-12 transition-transform relative z-10" />
            <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-emerald-500 rounded-full ring-2 ring-white" />
          </button>
        </div>
      )}

      {/* Chatbot Window */}
      {isOpen && (
        <div 
          className={`fixed z-50 transition-all duration-300 shadow-2xl ${
            isMinimized 
              ? 'bottom-6 right-6 w-80 rounded-2xl overflow-hidden' 
              : 'bottom-4 right-4 sm:bottom-6 sm:right-6 w-[calc(100vw-2rem)] sm:w-[420px] max-w-full h-[600px] max-h-[85vh] rounded-3xl overflow-hidden flex flex-col'
          } bg-white border border-slate-200`}
        >
          {/* Header */}
          <div className="bg-[#000E23] text-white px-4 py-3.5 flex items-center justify-between border-b border-slate-800 shrink-0">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-[#175CB5] flex items-center justify-center text-white shadow-inner">
                <Bot className="w-4 h-4" />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <h3 className="text-xs font-bold text-white tracking-wide">BridgeBot AI</h3>
                  <span className="px-1.5 py-0.2 rounded text-[9px] font-bold bg-[#175CB5]/40 text-[#6AA0FD] border border-[#175CB5]/60">
                    Gemini 3.8
                  </span>
                </div>
                <div className="flex items-center gap-1.5 text-[10px] text-slate-400">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  <span>Platform & Workflow Concierge</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-1 text-slate-400">
              <button
                onClick={handleResetChat}
                title="Restart conversation"
                className="p-1.5 rounded-lg hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => setIsMinimized(!isMinimized)}
                title={isMinimized ? 'Expand' : 'Minimize'}
                className="p-1.5 rounded-lg hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
              >
                {isMinimized ? <Maximize2 className="w-3.5 h-3.5" /> : <Minimize2 className="w-3.5 h-3.5" />}
              </button>
              <button
                onClick={() => setIsOpen(false)}
                title="Close chatbot"
                className="p-1.5 rounded-lg hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {!isMinimized && (
            <>
              {/* Message History Container */}
              <div className="flex-1 p-4 overflow-y-auto space-y-3.5 bg-slate-50/70 text-xs">
                {messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex gap-2.5 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    {msg.sender === 'assistant' && (
                      <div className="w-6 h-6 rounded-lg bg-[#000E23] text-white flex items-center justify-center shrink-0 mt-0.5 shadow-sm">
                        <Sparkles className="w-3 h-3 text-[#6AA0FD]" />
                      </div>
                    )}

                    <div className={`max-w-[82%] rounded-2xl p-3 shadow-sm ${
                      msg.sender === 'user'
                        ? 'bg-[#175CB5] text-white rounded-tr-xs'
                        : 'bg-white text-slate-800 border border-slate-200/80 rounded-tl-xs'
                    }`}>
                      <p className="whitespace-pre-line leading-relaxed">{msg.text}</p>
                      
                      {/* Contextual actions/links */}
                      {msg.actions && msg.actions.length > 0 && (
                        <div className="mt-2.5 pt-2 border-t border-slate-100 flex flex-wrap gap-1.5">
                          {msg.actions.map((act, i) => (
                            <button
                              key={i}
                              onClick={() => {
                                setIsOpen(false);
                                navigate(act.actionPath);
                              }}
                              className="px-2.5 py-1 rounded-md bg-[#175CB5]/10 hover:bg-[#175CB5]/20 text-[#175CB5] font-semibold text-[11px] flex items-center gap-1 transition-colors cursor-pointer"
                            >
                              <span>{act.label}</span>
                              <ArrowRight className="w-3 h-3" />
                            </button>
                          ))}
                        </div>
                      )}

                      <span className={`block text-[9px] mt-1 ${
                        msg.sender === 'user' ? 'text-blue-100 text-right' : 'text-slate-400'
                      }`}>
                        {msg.timestamp}
                      </span>
                    </div>

                    {msg.sender === 'user' && (
                      <div className="w-6 h-6 rounded-lg bg-slate-200 text-slate-700 flex items-center justify-center shrink-0 mt-0.5">
                        <User className="w-3.5 h-3.5" />
                      </div>
                    )}
                  </div>
                ))}

                {isLoading && (
                  <div className="flex gap-2.5 items-start">
                    <div className="w-6 h-6 rounded-lg bg-[#000E23] text-white flex items-center justify-center shrink-0 shadow-sm">
                      <Sparkles className="w-3 h-3 text-[#6AA0FD] animate-spin" />
                    </div>
                    <div className="bg-white border border-slate-200 rounded-2xl rounded-tl-xs p-3 shadow-sm flex items-center gap-2 text-slate-500">
                      <div className="flex gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#175CB5] animate-bounce" style={{ animationDelay: '0ms' }} />
                        <span className="w-1.5 h-1.5 rounded-full bg-[#175CB5] animate-bounce" style={{ animationDelay: '150ms' }} />
                        <span className="w-1.5 h-1.5 rounded-full bg-[#175CB5] animate-bounce" style={{ animationDelay: '300ms' }} />
                      </div>
                      <span className="text-[11px]">BridgeBot is analyzing...</span>
                    </div>
                  </div>
                )}

                <div ref={messagesEndRef} />
              </div>

              {/* Suggested Questions Pills */}
              {messages.length <= 2 && (
                <div className="px-3 py-2 bg-white border-t border-slate-100 flex gap-1.5 overflow-x-auto no-scrollbar shrink-0">
                  {SUGGESTED_QUESTIONS.map((q, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleSendMessage(q)}
                      className="shrink-0 px-2.5 py-1 rounded-full text-[10px] font-medium bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200 transition-colors cursor-pointer whitespace-nowrap"
                    >
                      {q}
                    </button>
                  ))}
                </div>
              )}

              {/* Chat Input Bar */}
              <div className="p-3 bg-white border-t border-slate-200 shrink-0">
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleSendMessage();
                  }}
                  className="flex items-center gap-2"
                >
                  <input
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Ask about creators, escrow, verification..."
                    className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#175CB5] focus:bg-white transition-all"
                  />
                  <button
                    type="submit"
                    disabled={!inputValue.trim() || isLoading}
                    className="p-2 rounded-xl bg-[#175CB5] text-white hover:bg-[#124b96] disabled:opacity-40 disabled:cursor-not-allowed transition-colors shadow-sm cursor-pointer"
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </form>
                <div className="mt-1.5 flex items-center justify-between text-[10px] text-slate-400 px-1">
                  <span>Audited Generative Pipeline Knowledge</span>
                  <span className="flex items-center gap-1">
                    <ShieldCheck className="w-3 h-3 text-emerald-500" />
                    $250k IP Indemnity Standard
                  </span>
                </div>
              </div>
            </>
          )}
        </div>
      )}
    </>
  );
};
