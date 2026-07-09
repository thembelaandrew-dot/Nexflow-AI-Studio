import { useState, useEffect, useRef, FormEvent } from 'react';
import { X, AlertCircle, CheckCircle } from 'lucide-react';
import { playSynthBeep } from '../lib/audio';
import emailjs from '@emailjs/browser';

export default function LeadPopup() {
  const [isOpen, setIsOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsOpen(true);
    }, 25000);
    return () => clearTimeout(timer);
  }, []);

  const handleClose = () => {
    playSynthBeep(300, 0.08);
    setIsOpen(false);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!formRef.current) return;

    setIsSubmitting(true);
    setError(null);
    
    try {
      await emailjs.sendForm(
        'service_ia09u36',
        'template_ehl0jih',
        formRef.current,
        'A9RbRJq0719TUlvNx'
      );
      setSubmitted(true);
      playSynthBeep(950, 0.15, 'triangle');
      setTimeout(() => {
        setIsOpen(false);
      }, 2500);
    } catch (err: any) {
      console.error('EmailJS error:', err);
      setError('Failed to send request. Please try again.');
      playSynthBeep(200, 0.2, 'square');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-brand-deep/80 backdrop-blur-md">
      <div className="relative glassmorphism w-full max-w-md p-8 rounded-3xl border border-white/10 shadow-2xl transform transition-all duration-300 ease-out animate-[scale-in_0.3s_ease-out]">
        <button
          className="absolute top-4 right-4 p-2 bg-white/5 hover:bg-white/10 rounded-lg text-slate-400 hover:text-white"
          onClick={handleClose}
        >
          <X className="w-5 h-5" />
        </button>

        <div className="text-center space-y-4 mb-6">
          <span className="text-xs font-bold uppercase tracking-widest bg-brand-cyanAccent/10 text-brand-cyanAccent px-3 py-1 rounded-full">Limited-Time Offer</span>
          <h3 className="text-2xl font-extrabold text-white">Request a Free Consultation</h3>
          <p className="text-xs text-slate-400 leading-relaxed">Let us review your current online setup and suggest practical design improvements. Contact us today.</p>
        </div>

        <form ref={formRef} className="space-y-4" onSubmit={handleSubmit}>
          {/* Hidden fields to match the contact form template variables */}
          <input type="hidden" name="service_needed" value="Free Consultation Request (Popup)" />
          <input type="hidden" name="message" value="Please contact me to schedule a free consultation." />
          <input type="hidden" name="business_name" value="N/A" />
          <input type="hidden" name="phone_number" value="N/A" />
          
          <div>
            <input type="text" name="user_name" required placeholder="What is your name?" className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-brand-cyanAccent" />
          </div>
          <div>
            <input type="email" name="user_email" required placeholder="What is your email address?" className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-brand-cyanAccent" />
          </div>

          {error && (
            <div className="text-center text-xs text-red-400 font-semibold flex items-center justify-center gap-1">
              <AlertCircle className="w-4 h-4" />
              <span>{error}</span>
            </div>
          )}

          <button type="submit" disabled={isSubmitting} className="w-full py-3.5 rounded-xl bg-gradient-to-r from-brand-electricBlue to-brand-cyanAccent text-white font-bold text-xs uppercase tracking-wider hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center" onClick={() => !isSubmitting && playSynthBeep(880, 0.1)}>
            {isSubmitting ? 'Sending...' : 'Request Consultation Setup'}
          </button>
        </form>

        {submitted && (
          <div className="text-center text-xs text-brand-cyanAccent font-semibold mt-4 animate-pulse flex items-center justify-center gap-1">
            <CheckCircle className="w-4 h-4" />
            <span>Consultation request received. We will get back to you soon.</span>
          </div>
        )}
      </div>
    </div>
  );
}
