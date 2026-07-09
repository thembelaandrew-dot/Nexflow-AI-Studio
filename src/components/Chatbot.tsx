import { useState, useRef, useEffect, FormEvent } from 'react';
import { MessageSquare, X, Send, Minus } from 'lucide-react';
import { playSynthBeep } from '../lib/audio';

interface Message {
  text: string;
  isBot: boolean;
}

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { text: "Hello! Welcome to NexaFlow AI. How can we help your business today?", isBot: true }
  ]);
  const [input, setInput] = useState('');
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isOpen]);

  const toggleChatbot = () => {
    playSynthBeep(650, 0.08);
    setIsOpen(!isOpen);
  };

  const handleSend = (e?: FormEvent, preset?: string) => {
    if (e) e.preventDefault();
    const text = preset || input;
    if (!text.trim()) return;

    setMessages(prev => [...prev, { text, isBot: false }]);
    setInput('');

    setTimeout(() => {
      setMessages(prev => [...prev, { text: `Thank you for your inquiry: "${text}". Andrew Tsabedze and the team have received your request. You can also reach us on WhatsApp at +268 79375018 for a fast response.`, isBot: true }]);
      playSynthBeep(600, 0.08);
    }, 1000);
  };

  return (
    <div id="chatbot-widget" className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      <button
        className="w-14 h-14 rounded-full bg-gradient-to-r from-brand-electricBlue to-brand-cyanAccent text-white flex items-center justify-center shadow-2xl hover:scale-105 active:scale-95 transition-transform"
        onClick={toggleChatbot}
      >
        {isOpen ? <X className="w-6 h-6" /> : <MessageSquare className="w-6 h-6" />}
      </button>

      <div className={`w-[350px] sm:w-[380px] bg-brand-deep border border-white/10 rounded-2xl shadow-2xl overflow-hidden mt-4 flex flex-col justify-between transition-all origin-bottom-right ${isOpen ? 'scale-100 opacity-100' : 'scale-0 opacity-0 absolute bottom-16'}`}>
        <div className="bg-gradient-to-r from-brand-electricBlue to-brand-cyanAccent p-4 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center font-bold font-sans">N</div>
              <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-green-400 border border-brand-electricBlue"></span>
            </div>
            <div>
              <h4 className="font-bold text-sm">NexaBot Assistant</h4>
              <p className="text-[10px] text-white/80">Active now &bull; Boutique Support</p>
            </div>
          </div>
          <button className="p-1 rounded hover:bg-white/10" onClick={toggleChatbot}>
            <Minus className="w-5 h-5" />
          </button>
        </div>

        <div className="p-4 h-72 overflow-y-auto space-y-4 text-xs font-medium">
          <div className="p-2.5 rounded-xl bg-brand-electricBlue/5 border border-brand-electricBlue/10 space-y-2 text-slate-300 text-[11px] mb-4">
            <p className="font-bold text-brand-cyanAccent">Contact NexaFlow AI:</p>
            <p>WhatsApp: <strong>+268 79375018</strong></p>
            <p>Email: <strong>atsabedzedigital@gmail.com</strong></p>
          </div>

          {messages.map((msg, i) => (
            <div key={i} className={`flex items-start gap-2.5 ${msg.isBot ? '' : 'justify-end'}`}>
              {msg.isBot && <div className="w-7 h-7 rounded-full bg-brand-electricBlue text-white flex items-center justify-center shrink-0 text-[10px]">AI</div>}
              <div className={`${msg.isBot ? 'bg-slate-900 rounded-2xl rounded-tl-none p-3 max-w-[80%] text-slate-300 leading-relaxed font-sans text-xs' : 'bg-brand-electricBlue text-white rounded-2xl rounded-tr-none p-3 max-w-[80%] text-slate-100 text-xs'}`}>
                {msg.text}
              </div>
            </div>
          ))}

          {messages.length === 1 && (
            <div className="space-y-2 pt-2">
              {['I want to build a Business Website', 'I need automated Workflow Systems', 'I want a price quotation'].map(preset => (
                <button
                  key={preset}
                  className="block w-full text-left p-2.5 rounded-xl border border-slate-800 text-slate-300 hover:bg-slate-800 hover:text-white transition-all text-[11px]"
                  onClick={() => { playSynthBeep(450, 0.05); handleSend(undefined, preset); }}
                >
                  {preset}
                </button>
              ))}
            </div>
          )}
          <div ref={chatEndRef} />
        </div>

        <div className="p-3 border-t border-slate-800 bg-[#02050c]/80">
          <form className="flex gap-2" onSubmit={handleSend}>
            <input
              type="text"
              value={input}
              onChange={e => setInput(e.target.value)}
              placeholder="Type your digital query..."
              className="w-full bg-slate-900 text-xs border border-slate-800 rounded-xl px-3.5 py-2.5 focus:outline-none focus:border-brand-cyanAccent text-white"
            />
            <button type="submit" className="p-2.5 rounded-xl bg-brand-electricBlue hover:bg-brand-cyanAccent text-white hover:text-black transition-colors shrink-0">
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
