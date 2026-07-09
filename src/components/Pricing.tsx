import { useEffect, useState } from 'react';
import { Rocket, Check } from 'lucide-react';
import { playSynthBeep } from '../lib/audio';

const pricingPlans = {
  USD: { starterLaunch: '$149', starterReg: '$299', businessLaunch: '$349', businessReg: '$599', automationLaunch: '$599', automationReg: '$999', note: 'USD One-time Offer' },
  SZL: { starterLaunch: 'E1,500', starterReg: 'E3,000', businessLaunch: 'E3,500', businessReg: 'E6,000', automationLaunch: 'E6,000', automationReg: 'E10,000', note: 'SZL One-time Offer' },
  ZAR: { starterLaunch: 'R1,500', starterReg: 'R3,000', businessLaunch: 'R3,500', businessReg: 'R6,000', automationLaunch: 'R6,000', automationReg: 'R10,000', note: 'ZAR One-time Offer' },
  GBP: { starterLaunch: '£125', starterReg: '£249', businessLaunch: '£299', businessReg: '£499', automationLaunch: '£499', automationReg: '£799', note: 'GBP One-time Offer' },
  EUR: { starterLaunch: '€139', starterReg: '€279', businessLaunch: '€329', businessReg: '€559', automationLaunch: '€559', automationReg: '€899', note: 'EUR One-time Offer' }
};

type CurrencyCode = keyof typeof pricingPlans;

export default function Pricing() {
  const [currency, setCurrency] = useState<CurrencyCode>('USD');
  const [isFallback, setIsFallback] = useState(false);

  useEffect(() => {
    async function detectCurrency() {
      try {
        const response = await fetch('https://ipapi.co/json/');
        if (!response.ok) throw new Error('API failure');
        const data = await response.json();
        const detectedCountry = data.country_code;
        
        let selectedCurrency: CurrencyCode = 'USD';
        if (detectedCountry === 'SZ') selectedCurrency = 'SZL';
        else if (detectedCountry === 'ZA') selectedCurrency = 'ZAR';
        else if (detectedCountry === 'GB') selectedCurrency = 'GBP';
        else if (['FR', 'DE', 'IT', 'ES', 'NL', 'BE', 'AT', 'IE'].includes(detectedCountry)) selectedCurrency = 'EUR';

        setCurrency(selectedCurrency);
      } catch (err) {
        setIsFallback(true);
        setCurrency('USD');
      }
    }
    detectCurrency();
  }, []);

  const handleCurrencyChange = (val: string) => {
    playSynthBeep(450, 0.05);
    setCurrency(val as CurrencyCode);
    setIsFallback(false);
  };

  const plan = pricingPlans[currency];

  return (
    <section id="pricing" className="py-24 relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-brand-electricBlue/5 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-8 relative z-10">
        <div className="mb-12 glassmorphism p-6 sm:p-8 rounded-3xl border border-brand-cyanAccent/30 relative overflow-hidden shadow-[0_0_30px_rgba(6,182,212,0.1)]">
          <div className="absolute -right-20 -top-20 w-48 h-48 bg-brand-cyanAccent/10 rounded-full blur-3xl pointer-events-none"></div>
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 relative z-10">
            <div className="flex items-center gap-4 text-center md:text-left flex-col md:flex-row">
              <div className="w-12 h-12 rounded-2xl bg-brand-cyanAccent/10 text-brand-cyanAccent flex items-center justify-center shrink-0">
                <Rocket className="w-6 h-6 animate-pulse" />
              </div>
              <div>
                <h3 className="text-lg sm:text-xl font-extrabold text-white">🚀 Limited Time Founding Client Offer</h3>
                <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-2xl">
                  To celebrate the launch of NexaFlow AI, the first 5 clients receive exclusive discounted pricing. Once these spots are filled, standard pricing will apply.
                </p>
              </div>
            </div>
            <div className="shrink-0">
              <span className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-brand-cyanAccent/15 text-brand-cyanAccent border border-brand-cyanAccent/30 text-xs font-bold uppercase tracking-wider animate-pulse">
                5 Spots Left
              </span>
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between mb-16 gap-6">
          <div className="max-w-xl text-center md:text-left">
            <span className="text-brand-electricBlue uppercase tracking-widest text-xs font-bold bg-brand-electricBlue/10 px-4 py-1.5 rounded-full">Founding Launch Tiers</span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold mt-4 text-white">Exclusive Launch Offer</h2>
            <p className="text-slate-400 mt-2">Invest in premium high-performance digital architectures at a fraction of our standard rate.</p>
          </div>
          <div className="flex items-center gap-3 glassmorphism p-2 rounded-xl border border-white/10 shrink-0">
            <span className="text-xs text-slate-400 font-bold ml-2">Currency:</span>
            <select value={currency} onChange={(e) => handleCurrencyChange(e.target.value)} className="bg-slate-900 border border-slate-700/80 rounded-lg text-xs font-bold text-brand-cyanAccent px-3 py-1.5 focus:outline-none focus:border-brand-cyanAccent">
              <option value="USD">USD ($)</option>
              <option value="SZL">SZL (E)</option>
              <option value="ZAR">ZAR (R)</option>
              <option value="GBP">GBP (£)</option>
              <option value="EUR">EUR (€)</option>
            </select>
          </div>
        </div>

        {isFallback && (
          <div className="max-w-2xl mx-auto mb-8 bg-amber-500/10 border border-amber-500/30 rounded-xl p-3 text-center text-xs text-amber-300">
            Prices are listed in USD. Final invoicing can be provided in your local currency.
          </div>
        )}

        <div className="grid md:grid-cols-3 gap-8 items-stretch">
          {/* Starter */}
          <div className="glassmorphism p-8 rounded-3xl border border-white/5 flex flex-col justify-between hover:border-slate-700 transition-all duration-300 relative group">
            <div>
              <div className="mb-4 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-cyanAccent/10 text-brand-cyanAccent border border-brand-cyanAccent/20 text-[10px] font-bold uppercase tracking-widest">
                FOUNDING CLIENT OFFER
              </div>
              <div className="mb-6">
                <h3 className="text-lg font-bold text-slate-200">Starter Website</h3>
                <div className="mt-4 flex flex-col">
                  <div className="flex items-baseline gap-2">
                    <span className="text-4xl font-extrabold text-white">{plan.starterLaunch}</span>
                    <span className="text-sm text-slate-500 line-through">{plan.starterReg}</span>
                  </div>
                  <span className="text-[10px] font-bold text-brand-cyanAccent uppercase tracking-wider mt-1.5">{plan.note}</span>
                </div>
                <p className="text-xs text-slate-400 mt-2">Perfect for establishing a highly credible, fast-loading online presence.</p>
              </div>
              <ul className="space-y-4 border-t border-slate-800 pt-6">
                {['Modern responsive website', 'Up to 5 pages', 'Mobile optimization', 'Contact form', 'Basic SEO setup', 'Fast loading performance'].map((feature, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-slate-300">
                    <Check className="w-5 h-5 text-brand-cyanAccent shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="mt-8">
              <a href="#contact" className="block w-full text-center py-4 bg-white/5 hover:bg-brand-cyanAccent hover:text-black font-bold rounded-xl transition-all border border-slate-800 hover:border-brand-cyanAccent text-white text-sm" onClick={() => playSynthBeep(700, 0.1)}>Claim Launch Offer</a>
            </div>
          </div>

          {/* Business */}
          <div className="glassmorphism p-8 rounded-3xl border-2 border-brand-cyanAccent/50 flex flex-col justify-between hover:border-brand-cyanAccent/80 transition-all duration-300 relative shadow-[0_0_35px_rgba(6,182,212,0.15)]">
            <span className="absolute -top-3 left-1/2 -translate-x-1/2 text-[10px] font-extrabold uppercase tracking-widest bg-gradient-to-r from-brand-electricBlue to-brand-cyanAccent text-white px-4 py-1.5 rounded-full shadow-md">⭐ Most Popular</span>
            <div>
              <div className="mb-4 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-cyanAccent/10 text-brand-cyanAccent border border-brand-cyanAccent/20 text-[10px] font-bold uppercase tracking-widest mt-1">
                FOUNDING CLIENT OFFER
              </div>
              <div className="mb-6">
                <h3 className="text-lg font-bold text-white">Business Website</h3>
                <div className="mt-4 flex flex-col">
                  <div className="flex items-baseline gap-2">
                    <span className="text-4xl font-extrabold text-white">{plan.businessLaunch}</span>
                    <span className="text-sm text-slate-500 line-through">{plan.businessReg}</span>
                  </div>
                  <span className="text-[10px] font-bold text-brand-cyanAccent uppercase tracking-wider mt-1.5">{plan.note}</span>
                </div>
                <p className="text-xs text-brand-cyanAccent mt-2">Enhanced features and layouts configured for optimized growth and authority.</p>
              </div>
              <ul className="space-y-4 border-t border-slate-800/80 pt-6">
                <li className="flex items-start gap-3 text-sm text-slate-200">
                  <Check className="w-5 h-5 text-brand-cyanAccent shrink-0" />
                  <span className="font-bold text-brand-cyanAccent">Everything in Starter</span>
                </li>
                {['Up to 10 pages', 'Premium design', 'Blog integration', 'Advanced SEO setup', 'Google Maps & Social integration'].map((feature, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-slate-300">
                    <Check className="w-5 h-5 text-brand-cyanAccent shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="mt-8">
              <a href="#contact" className="block w-full text-center py-4 bg-gradient-to-r from-brand-electricBlue to-brand-cyanAccent text-white font-bold rounded-xl transition-all hover:opacity-90 hover:shadow-lg text-sm" onClick={() => playSynthBeep(880, 0.12)}>Get Business Website</a>
            </div>
          </div>

          {/* Premium */}
          <div className="glassmorphism p-8 rounded-3xl border border-white/5 flex flex-col justify-between hover:border-slate-700 transition-all duration-300 relative group">
            <div>
              <div className="mb-4 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-cyanAccent/10 text-brand-cyanAccent border border-brand-cyanAccent/20 text-[10px] font-bold uppercase tracking-widest">
                FOUNDING CLIENT OFFER
              </div>
              <div className="mb-6">
                <h3 className="text-lg font-bold text-slate-200">Website + AI Automation</h3>
                <div className="mt-4 flex flex-col">
                  <div className="flex items-baseline gap-2">
                    <span className="text-4xl font-extrabold text-white">{plan.automationLaunch}</span>
                    <span className="text-sm text-slate-500 line-through">{plan.automationReg}</span>
                  </div>
                  <span className="text-[10px] font-bold text-brand-cyanAccent uppercase tracking-wider mt-1.5">{plan.note}</span>
                </div>
                <p className="text-xs text-slate-400 mt-2">End-to-end automation, workflow funnels, and interactive smart solutions.</p>
              </div>
              <ul className="space-y-4 border-t border-slate-800 pt-6">
                <li className="flex items-start gap-3 text-sm text-slate-200">
                  <Check className="w-5 h-5 text-brand-cyanAccent shrink-0" />
                  <span className="font-bold text-brand-cyanAccent">Everything in Business Package</span>
                </li>
                {['AI chatbot integration', 'Lead capture automation', 'Automated appointment booking', 'WhatsApp & Customer inquiry automation', 'AI-powered workflows'].map((feature, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-slate-300">
                    <Check className="w-5 h-5 text-brand-cyanAccent shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="mt-8">
              <a href="#contact" className="block w-full text-center py-4 bg-white/5 hover:bg-brand-cyanAccent hover:text-black font-bold rounded-xl transition-all border border-slate-800 hover:border-brand-cyanAccent text-white text-sm" onClick={() => playSynthBeep(700, 0.1)}>Automate My Business</a>
            </div>
          </div>
        </div>

        <div className="text-center mt-12">
          <p className="text-sm text-brand-cyanAccent font-extrabold uppercase tracking-wider animate-pulse inline-flex items-center gap-2 bg-brand-cyanAccent/5 border border-brand-cyanAccent/10 px-6 py-2.5 rounded-full">
            <span>⏳ Only 5 founding client spots available at these rates.</span>
          </p>
        </div>
      </div>
    </section>
  );
}
