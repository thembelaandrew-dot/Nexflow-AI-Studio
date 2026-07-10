import { useState, useRef, FormEvent } from 'react';
import { Phone, Mail, Calendar, Send, CheckCircle, AlertCircle } from 'lucide-react';
import { playSynthBeep } from '../lib/audio';
import emailjs from '@emailjs/browser';

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const formRef = useRef<HTMLFormElement>(null);

  const handleFormSubmission = async (e: FormEvent) => {
    e.preventDefault(); // 1. Prevent default browser page reload
    if (!formRef.current) {
      console.error('EmailJS: Form reference is missing.');
      return;
    }
    
    setIsSubmitting(true);
    setError(null);
    setSubmitted(false);

    console.log('EmailJS: Starting submission process...', {
      serviceId: 'service_ia09u36',
      templateId: 'template_ehl0jih',
    });

    try {
      // 2. Await the sendForm promise to ensure it completes before resetting
      const response = await emailjs.sendForm(
        'service_ia09u36',
        'template_ehl0jih',
        formRef.current,
        'A9RbRJq0719TUlvNx' // Public key is correct as 4th argument
      );
      
      console.log('EmailJS: Success!', { status: response.status, text: response.text });
      setSubmitted(true);
      playSynthBeep(900, 0.2, 'triangle');
      formRef.current.reset(); // 3. Safe to reset here since await has finished
    } catch (err: any) {
      // 4. Detailed error logging to catch exact failure reason
      console.error('EmailJS: Error caught during sendForm():', err);
      
      let errorMessage = 'Failed to send message. Please try again later.';
      
      // EmailJS errors often come as an object with status and text properties
      if (err?.status || err?.text) {
        console.error(`EmailJS Error Details - Status: ${err.status}, Text: ${err.text}`);
        errorMessage = `EmailJS Error (${err.status}): ${err.text}`;
      } else if (err instanceof Error) {
        errorMessage = err.message;
      }
      
      setError(errorMessage);
      playSynthBeep(200, 0.2, 'square');
    } finally {
      setIsSubmitting(false);
      console.log('EmailJS: Submission process completed.');
    }
  };

  return (
    <>
      <section id="contact" className="py-24 relative overflow-hidden bg-brand-darkBlue/25 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 relative z-10">
          <div className="grid lg:grid-cols-12 gap-12">
            {/* Left Column */}
            <div className="lg:col-span-5 space-y-8">
              <div>
                <span className="text-brand-cyanAccent uppercase tracking-widest text-xs font-bold bg-brand-cyanAccent/10 px-4 py-1.5 rounded-full">Consultation</span>
                <h2 className="text-3xl sm:text-4xl font-extrabold mt-4 text-white">Let's Discuss Your Project</h2>
                <p className="text-slate-400 mt-2">Get in touch to arrange an initial review and discuss digital options for your organization.</p>
              </div>

              {/* Direct contact details */}
              <div className="space-y-4">
                <a href="https://wa.me/26879375018" target="_blank" className="flex items-center gap-4 glassmorphism p-4 rounded-xl border border-white/5 hover:border-brand-cyanAccent/40 transition-all block" onClick={() => playSynthBeep(550, 0.05)}>
                  <div className="w-11 h-11 rounded-lg bg-green-500/10 text-green-400 flex items-center justify-center border border-green-500/20 shrink-0">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs text-slate-400 font-semibold uppercase tracking-wider">Call / WhatsApp</h4>
                    <p className="text-sm text-white font-bold">+268 79375018</p>
                  </div>
                </a>
                <a href="mailto:thembelaandrew@gmail.com" className="flex items-center gap-4 glassmorphism p-4 rounded-xl border border-white/5 hover:border-brand-electricBlue/40 transition-all block" onClick={() => playSynthBeep(550, 0.05)}>
                  <div className="w-11 h-11 rounded-lg bg-brand-electricBlue/10 text-brand-electricBlue flex items-center justify-center border border-brand-electricBlue/20 shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs text-slate-400 font-semibold uppercase tracking-wider">Email Address</h4>
                    <p className="text-sm text-white font-bold">thembelaandrew@gmail.com</p>
                  </div>
                </a>
              </div>

              {/* Embed Google Map */}
              <div className="rounded-2xl overflow-hidden h-60 border border-slate-800 shadow-lg relative bg-slate-900 flex items-center justify-center">
                <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d114400.91254347715!2d31.066453916422312!3d-26.315058778437785!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1ee8cecfa5ec979f%3A0xe75ef98059c3dbe7!2sMbabane%2C%20Eswatini!5e0!3m2!1sen!2sus!4v1716000000000!5m2!1sen!2sus" className="absolute inset-0 w-full h-full border-0 grayscale invert opacity-75 contrast-125" allowFullScreen loading="lazy"></iframe>
              </div>
            </div>

            {/* Right Form and Prompt Details */}
            <div className="lg:col-span-7">
              <div className="glassmorphism p-8 rounded-3xl border border-white/10 shadow-2xl space-y-8">
                <div>
                  <p className="text-xs text-brand-cyanAccent font-semibold uppercase tracking-wider mb-2">Ready to discuss your project?</p>
                  <h3 className="text-xl font-bold text-white mb-2">Reach out directly through WhatsApp or schedule a consultation.</h3>
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                  <a href="https://wa.me/26879375018" target="_blank" className="flex-1 py-4 px-6 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-bold text-center flex items-center justify-center gap-2 hover:opacity-90 hover:scale-102 transition-all shadow-[0_0_20px_rgba(16,185,129,0.2)]" onClick={() => playSynthBeep(650, 0.1)}>
                    <Phone className="w-5 h-5" />
                    <span>Chat on WhatsApp</span>
                  </a>
                  <a href="#contact" className="flex-1 py-4 px-6 rounded-xl bg-gradient-to-r from-brand-electricBlue to-brand-cyanAccent text-white font-bold text-center flex items-center justify-center gap-2 hover:opacity-90 hover:scale-102 transition-all shadow-[0_0_20px_rgba(59,130,246,0.2)]" onClick={() => playSynthBeep(650, 0.1)}>
                    <Calendar className="w-5 h-5" />
                    <span>Book Consultation</span>
                  </a>
                </div>

                <div className="border-t border-slate-800/80 pt-6">
                  <h4 className="text-sm font-bold text-slate-300 mb-4">Or Send an Email Inquiry Below:</h4>
                  <form ref={formRef} className="space-y-6" onSubmit={handleFormSubmission}>
                    <div className="grid sm:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-xs uppercase tracking-wider text-slate-400 font-semibold mb-2">Full Name</label>
                        <input type="text" name="user_name" required placeholder="Your Name" className="w-full bg-slate-900/60 border border-slate-700/80 rounded-xl px-4 py-3.5 text-white text-sm focus:outline-none focus:border-brand-cyanAccent transition-colors" />
                      </div>
                      <div>
                        <label className="block text-xs uppercase tracking-wider text-slate-400 font-semibold mb-2">Business Name</label>
                        <input type="text" name="business_name" placeholder="Organization Name" className="w-full bg-slate-900/60 border border-slate-700/80 rounded-xl px-4 py-3.5 text-white text-sm focus:outline-none focus:border-brand-cyanAccent transition-colors" />
                      </div>
                    </div>
                    <div className="grid sm:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-xs uppercase tracking-wider text-slate-400 font-semibold mb-2">Email Address</label>
                        <input type="email" name="user_email" required placeholder="name@domain.com" className="w-full bg-slate-900/60 border border-slate-700/80 rounded-xl px-4 py-3.5 text-white text-sm focus:outline-none focus:border-brand-cyanAccent transition-colors" />
                      </div>
                      <div>
                        <label className="block text-xs uppercase tracking-wider text-slate-400 font-semibold mb-2">Phone Number</label>
                        <input type="tel" name="phone_number" placeholder="+268 79375018" className="w-full bg-slate-900/60 border border-slate-700/80 rounded-xl px-4 py-3.5 text-white text-sm focus:outline-none focus:border-brand-cyanAccent transition-colors" />
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs uppercase tracking-wider text-slate-400 font-semibold mb-2">Service Needed</label>
                      <select name="service_needed" className="w-full bg-slate-900/60 border border-slate-700/80 rounded-xl px-4 py-3.5 text-slate-300 text-sm focus:outline-none focus:border-brand-cyanAccent transition-colors">
                        <option>AI-Powered Business Websites</option>
                        <option>Lead Generation Campaign</option>
                        <option>Business Automation Setup</option>
                        <option>Virtual Assistant Services</option>
                        <option>Cold Email Outreach Setup</option>
                        <option>Digital Marketing Support</option>
                        <option>Bespoke Custom Package</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs uppercase tracking-wider text-slate-400 font-semibold mb-2">Message Description</label>
                      <textarea name="message" required rows={4} placeholder="Briefly describe your project..." className="w-full bg-slate-900/60 border border-slate-700/80 rounded-xl px-4 py-3.5 text-white text-sm focus:outline-none focus:border-brand-cyanAccent transition-colors"></textarea>
                    </div>

                    {error && (
                      <div className="glassmorphism bg-red-500/10 border border-red-500/30 text-red-400 text-xs p-4 rounded-xl flex items-center gap-3">
                        <AlertCircle className="w-5 h-5 shrink-0" />
                        <span>{error}</span>
                      </div>
                    )}

                    {submitted && (
                      <div className="glassmorphism bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs p-4 rounded-xl flex items-center gap-3">
                        <CheckCircle className="w-5 h-5 shrink-0" />
                        <span>Thank you! We will get in touch shortly to assist you.</span>
                      </div>
                    )}

                    <button type="submit" disabled={isSubmitting} className="w-full py-4 rounded-xl bg-gradient-to-r from-brand-electricBlue to-brand-cyanAccent text-white font-bold text-sm tracking-wider uppercase hover:shadow-[0_0_20px_rgba(59,130,246,0.3)] disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2 group" onClick={() => !isSubmitting && playSynthBeep(880, 0.1)}>
                      <span>{isSubmitting ? 'Sending...' : 'Send Message'}</span>
                      {!isSubmitting && <Send className="w-4 h-4 group-hover:translate-x-1 transition-transform" />}
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 relative overflow-hidden bg-brand-darkBlue/40 border-t border-slate-800">
        <div className="absolute -top-1/2 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-brand-electricBlue/10 rounded-full blur-[120px] pointer-events-none"></div>
        <div className="max-w-4xl mx-auto px-4 sm:px-8 relative z-10 text-center space-y-8">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white leading-tight">Ready to Grow Your Business?</h2>
          <p className="text-slate-300 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            Whether you need a professional website, lead generation system, or AI-powered automation, NexaFlow AI is ready to help you build smarter and grow faster.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a href="#contact" className="w-full sm:w-auto px-8 py-4 rounded-xl bg-gradient-to-r from-brand-electricBlue to-brand-cyanAccent text-white font-bold shadow-lg hover:opacity-90 hover:scale-102 transition-all text-center" onClick={() => playSynthBeep(880, 0.1)}>
              Book Consultation
            </a>
            <a href="https://wa.me/26879375018" target="_blank" className="w-full sm:w-auto px-8 py-4 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-white font-bold flex items-center justify-center gap-2 hover:scale-102 transition-all text-center" onClick={() => playSynthBeep(600, 0.08)}>
              <Phone className="w-5 h-5 text-green-400" />
              <span>Chat on WhatsApp</span>
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
