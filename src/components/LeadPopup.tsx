import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Send, Sparkles } from 'lucide-react';
import emailjs from '@emailjs/browser';
import { EMAILJS_CONFIG } from '../lib/emailConfig';
import { playSynthBeep } from '../lib/audio';

export default function LeadPopup() {
  const [isVisible, setIsVisible] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    // Check if the user has already seen/closed the popup
    const hasSeenPopup = localStorage.getItem('hasSeenLeadPopup');
    if (hasSeenPopup) return;

    const timer = setTimeout(() => {
      setIsVisible(true);
      playSynthBeep(600, 0.1);
    }, 25000); // 25 seconds delay

    return () => clearTimeout(timer);
  }, []);

  const closePopup = () => {
    setIsVisible(false);
    localStorage.setItem('hasSeenLeadPopup', 'true');
    playSynthBeep(400, 0.05);
  };

  const handleFormSubmission = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formRef.current) return;
    
    setIsSubmitting(true);
    setError(null);
    playSynthBeep(500, 0.1);

    try {
      await emailjs.sendForm(
        EMAILJS_CONFIG.SERVICE_ID,
        EMAILJS_CONFIG.TEMPLATE_ID,
        formRef.current,
        EMAILJS_CONFIG.PUBLIC_KEY
      );
      
      setSubmitted(true);
      playSynthBeep(900, 0.2, 'triangle');
      localStorage.setItem('hasSeenLeadPopup', 'true');
      
      setTimeout(() => {
        setIsVisible(false);
      }, 3000);
      
    } catch (err: any) {
      console.error('EmailJS Error:', err);
      setError('Failed to send message. Please try again.');
      playSynthBeep(200, 0.2, 'square');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            className="relative w-full max-w-lg overflow-hidden glassmorphism border border-brand-cyanAccent/30 rounded-2xl shadow-2xl bg-slate-900/90"
          >
            {/* Background effects */}
            <div className="absolute inset-0 bg-gradient-to-br from-brand-electricBlue/10 to-brand-cyanAccent/5 pointer-events-none" />
            <div className="absolute top-0 right-0 p-4 z-10">
              <button 
                onClick={closePopup}
                className="p-2 rounded-full bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-colors"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-8 relative z-10">
              {submitted ? (
                <div className="text-center py-8">
                  <div className="w-16 h-16 mx-auto bg-green-500/20 text-green-400 rounded-full flex items-center justify-center mb-6">
                    <Sparkles className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2">Thank You!</h3>
                  <p className="text-slate-300">We've received your inquiry and will be in touch shortly.</p>
                </div>
              ) : (
                <>
                  <div className="mb-6">
                    <span className="text-brand-cyanAccent uppercase tracking-widest text-xs font-bold mb-2 block">Limited Time Offer</span>
                    <h3 className="text-2xl sm:text-3xl font-extrabold text-white mb-2">Get a Free AI Strategy Session</h3>
                    <p className="text-slate-300 text-sm">Discover how Nexaflow AI can transform your business with custom automations and intelligent web design.</p>
                  </div>

                  {error && (
                    <div className="mb-4 p-3 bg-red-500/10 border border-red-500/30 rounded-lg text-red-400 text-sm">
                      {error}
                    </div>
                  )}

                  <form ref={formRef} onSubmit={handleFormSubmission} className="space-y-4">
                    <div>
                      <input 
                        type="text" 
                        name="user_name" 
                        required 
                        placeholder="Your Name" 
                        className="w-full bg-slate-900/60 border border-slate-700/80 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-brand-cyanAccent transition-colors" 
                      />
                    </div>
                    <div>
                      <input 
                        type="email" 
                        name="user_email" 
                        required 
                        placeholder="Email Address" 
                        className="w-full bg-slate-900/60 border border-slate-700/80 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-brand-cyanAccent transition-colors" 
                      />
                    </div>
                    <div>
                      <input 
                        type="tel" 
                        name="user_phone" 
                        placeholder="Phone Number (Optional)" 
                        className="w-full bg-slate-900/60 border border-slate-700/80 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-brand-cyanAccent transition-colors" 
                      />
                    </div>
                    {/* Hidden message field to fit the template */}
                    <input type="hidden" name="message" value="Requested a Free AI Strategy Session from the Lead Popup." />
                    
                    <button 
                      type="submit" 
                      disabled={isSubmitting}
                      className="w-full mt-2 py-4 px-6 rounded-xl bg-gradient-to-r from-brand-electricBlue to-brand-cyanAccent text-white font-bold text-center flex items-center justify-center gap-2 hover:opacity-90 hover:scale-[1.02] transition-all disabled:opacity-70 disabled:hover:scale-100 shadow-[0_0_20px_rgba(6,182,212,0.3)]"
                    >
                      {isSubmitting ? (
                        <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      ) : (
                        <>
                          <Send className="w-5 h-5" />
                          <span>Claim Strategy Session</span>
                        </>
                      )}
                    </button>
                  </form>
                </>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
