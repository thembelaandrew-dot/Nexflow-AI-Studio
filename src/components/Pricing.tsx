import { Check } from 'lucide-react';
import { playSynthBeep } from '../lib/audio';
import { useCurrency } from '../lib/CurrencyContext';

export default function Pricing() {
  const { formatPrice } = useCurrency();

  return (
    <section id="pricing" className="py-24 relative overflow-hidden bg-[#02050c]">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-brand-electricBlue/10 via-[#02050c]/80 to-[#02050c] pointer-events-none"></div>
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight">
            Transparent Pricing
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto font-medium">
            Straightforward packages designed to scale with your business. Choose the solution that fits your goals.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
          
          {/* Landing Page */}
          <div className="glassmorphism p-8 rounded-3xl border border-white/5 flex flex-col justify-between hover:border-slate-700 transition-all duration-300 relative group">
            <div>
              <div className="mb-6">
                <h3 className="text-lg font-bold text-slate-200">Landing Page</h3>
                <div className="mt-4 flex flex-col">
                  <div className="flex items-baseline gap-2">
                    <span className="text-4xl font-extrabold text-white">{formatPrice(27)}</span>
                  </div>
                </div>
                <p className="text-xs text-slate-400 mt-2">Ideal for restaurants, salons, small businesses, and personal brands.</p>
              </div>
              
              <ul className="space-y-4 border-t border-slate-800 pt-6">
                {['Responsive one-page website', 'WhatsApp integration', 'Contact form', 'Google Maps', 'Mobile optimized', 'Fast loading', 'Professional design'].map((feature, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-slate-300">
                    <Check className="w-4 h-4 mt-0.5 text-brand-cyanAccent shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="mt-8">
              <a href="#contact" className="block w-full text-center py-3 bg-white/5 hover:bg-brand-cyanAccent hover:text-black font-bold rounded-xl transition-all border border-slate-800 hover:border-brand-cyanAccent text-white text-sm" onClick={() => playSynthBeep(700, 0.1)}>Get Started</a>
            </div>
          </div>

          {/* Starter */}
          <div className="glassmorphism p-8 rounded-3xl border border-white/5 flex flex-col justify-between hover:border-slate-700 transition-all duration-300 relative group">
            <div>
              <div className="mb-6">
                <h3 className="text-lg font-bold text-slate-200">Starter Website</h3>
                <div className="mt-4 flex flex-col">
                  <div className="flex items-baseline gap-2">
                    <span className="text-4xl font-extrabold text-white">{formatPrice(80)}</span>
                  </div>
                </div>
                <p className="text-xs text-slate-400 mt-2">Perfect for establishing a credible, multi-page online presence.</p>
              </div>
              
              <ul className="space-y-4 border-t border-slate-800 pt-6">
                {['Up to 5 pages', 'Responsive design', 'Contact forms', 'Gallery', 'Google Maps', 'Basic SEO', 'WhatsApp integration'].map((feature, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-slate-300">
                    <Check className="w-4 h-4 mt-0.5 text-brand-cyanAccent shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="mt-8">
              <a href="#contact" className="block w-full text-center py-3 bg-white/5 hover:bg-brand-cyanAccent hover:text-black font-bold rounded-xl transition-all border border-slate-800 hover:border-brand-cyanAccent text-white text-sm" onClick={() => playSynthBeep(700, 0.1)}>Get Starter</a>
            </div>
          </div>

          {/* Business */}
          <div className="glassmorphism p-8 rounded-3xl border-2 border-brand-cyanAccent/50 flex flex-col justify-between hover:border-brand-cyanAccent/80 transition-all duration-300 relative shadow-[0_0_35px_rgba(6,182,212,0.15)]">
            <span className="absolute -top-3 left-1/2 -translate-x-1/2 text-[10px] font-extrabold uppercase tracking-widest bg-gradient-to-r from-brand-electricBlue to-brand-cyanAccent text-white px-4 py-1.5 rounded-full shadow-md whitespace-nowrap">⭐ Most Popular</span>
            
            <div>
              <div className="mb-6">
                <h3 className="text-lg font-bold text-white">Business Website</h3>
                <div className="mt-4 flex flex-col">
                  <div className="flex items-baseline gap-2">
                    <span className="text-4xl font-extrabold text-white">{formatPrice(190)}</span>
                  </div>
                </div>
                <p className="text-xs text-brand-cyanAccent mt-2">Enhanced layouts configured for optimized growth and authority.</p>
              </div>
              
              <ul className="space-y-4 border-t border-slate-800/80 pt-6">
                <li className="flex items-start gap-3 text-sm text-slate-200">
                  <Check className="w-4 h-4 mt-0.5 text-brand-cyanAccent shrink-0" />
                  <span className="font-bold text-brand-cyanAccent">Everything in Starter</span>
                </li>
                {['Booking forms', 'Blog (if needed)', 'Advanced UI', 'Better SEO', 'More integrations', 'Premium animations'].map((feature, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-slate-300">
                    <Check className="w-4 h-4 mt-0.5 text-brand-cyanAccent shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="mt-8">
              <a href="#contact" className="block w-full text-center py-3 bg-gradient-to-r from-brand-electricBlue to-brand-cyanAccent text-white font-bold rounded-xl transition-all hover:opacity-90 hover:shadow-lg text-sm" onClick={() => playSynthBeep(880, 0.12)}>Get Business Website</a>
            </div>
          </div>

          {/* Premium */}
          <div className="glassmorphism p-8 rounded-3xl border border-white/5 flex flex-col justify-between hover:border-slate-700 transition-all duration-300 relative group">
            <div>
              <div className="mb-4 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-cyanAccent/10 text-brand-cyanAccent border border-brand-cyanAccent/20 text-[10px] font-bold uppercase tracking-widest whitespace-nowrap">
                OPENING DISCOUNT
              </div>
              <div className="mb-6">
                <h3 className="text-lg font-bold text-slate-200">Website + AI Automation</h3>
                <div className="mt-4 flex flex-col">
                  <div className="flex items-baseline gap-2">
                    <span className="text-4xl font-extrabold text-white">{formatPrice(325)}</span>
                  </div>
                </div>
                <p className="text-xs text-slate-400 mt-2">Saves your business time, reduces repetitive work, and helps generate more leads.</p>
              </div>
              
              <ul className="space-y-4 border-t border-slate-800 pt-6">
                <li className="flex items-start gap-3 text-sm text-slate-200">
                  <Check className="w-4 h-4 mt-0.5 text-brand-cyanAccent shrink-0" />
                  <span className="font-bold text-brand-cyanAccent">Complete Business Website</span>
                </li>
                {['AI Chatbot', 'Lead capture', 'Email automation', 'Appointment automation', 'Google Sheets automation', 'CRM integration', 'AI workflows', 'WhatsApp automation'].map((feature, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-slate-300">
                    <Check className="w-4 h-4 mt-0.5 text-brand-cyanAccent shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="mt-8">
              <a href="#contact" className="block w-full text-center py-3 bg-white/5 hover:bg-brand-cyanAccent hover:text-black font-bold rounded-xl transition-all border border-slate-800 hover:border-brand-cyanAccent text-white text-sm" onClick={() => playSynthBeep(700, 0.1)}>Automate My Business</a>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
