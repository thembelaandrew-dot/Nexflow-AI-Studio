import { Gift, Wallet, Users, MessageCircle, Phone, Mail, AlertTriangle } from 'lucide-react';
import { playSynthBeep } from '../lib/audio';
import { useCurrency } from '../lib/CurrencyContext';
import SectionReveal3D, { RevealItem3D } from './SectionReveal3D';

export default function Referral() {
  const { formatPrice } = useCurrency();
  const steps = [
    { icon: <Users className="w-6 h-6 text-brand-cyanAccent" />, title: "1. Join", desc: "Anyone can join. Just sign up and get your unique referral link." },
    { icon: <MessageCircle className="w-6 h-6 text-brand-cyanAccent" />, title: "2. Share", desc: "Recommend our services to businesses in need of a website." },
    { icon: <Wallet className="w-6 h-6 text-brand-cyanAccent" />, title: "3. Earn", desc: "Get paid a generous commission for every successful referral." }
  ];
  const commissions = [
    { service: "Landing Page", price: 135, earn: 14 },
    { service: "Starter Website", price: 216, earn: 22 },
    { service: "Business Website", price: 324, earn: 32 },
    { service: "Website + Automation", price: 540, earn: 54 },
  ];
  
  return (
    <section id="referral" className="py-24 relative overflow-hidden bg-nexa-deep border-t border-slate-800">
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-brand-electricBlue/20 to-transparent"></div>
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <SectionReveal3D staggerDelay={0.12}>
          <div className="text-center mb-16 space-y-4">
            <RevealItem3D>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-cyanAccent/10 text-brand-cyanAccent border border-brand-cyanAccent/20 text-xs font-bold uppercase tracking-widest mb-2">
                <Gift className="w-4 h-4" /> Partner With Us
              </div>
            </RevealItem3D>
            <RevealItem3D>
              <h2 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight">
                Earn Money by Referring Clients
              </h2>
            </RevealItem3D>
            <RevealItem3D>
              <p className="text-slate-400 max-w-2xl mx-auto font-medium">
                Know someone who needs a professional website or AI automation? Refer them to us and earn a generous commission when they become a client. Anyone can join!
              </p>
            </RevealItem3D>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Steps & FAQ */}
            <RevealItem3D className="space-y-12">
              <div className="space-y-6">
                <h3 className="text-2xl font-bold text-white">How it works</h3>
                <div className="space-y-6">
                  {steps.map((step, i) => (
                    <div key={i} className="flex gap-4 items-start">
                      <div className="w-12 h-12 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center shrink-0">
                        {step.icon}
                      </div>
                      <div>
                        <h4 className="text-lg font-bold text-slate-200">{step.title}</h4>
                        <p className="text-sm text-slate-400 mt-1">{step.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="space-y-4">
                <h3 className="text-xl font-bold text-white mb-2">Simple FAQ</h3>
                <div className="bg-slate-900/50 rounded-xl p-5 border border-white/5 backdrop-blur-md">
                  <h4 className="text-sm font-bold text-brand-cyanAccent">When do I get paid?</h4>
                  <p className="text-xs text-slate-400 mt-1 mb-4">You receive your commission as soon as the referred client completes their first project payment.</p>
                  <h4 className="text-sm font-bold text-brand-cyanAccent">Is there a limit to how much I can earn?</h4>
                  <p className="text-xs text-slate-400 mt-1">No! There is no cap. The more clients you refer, the more you earn.</p>
                </div>
              </div>
            </RevealItem3D>

            {/* Commission Structure */}
            <RevealItem3D>
              <div className="glassmorphism p-8 rounded-3xl border border-brand-electricBlue/30 relative">
                <div className="absolute inset-0 bg-gradient-to-br from-brand-electricBlue/5 to-transparent rounded-3xl pointer-events-none"></div>
                <h3 className="text-2xl font-bold text-white mb-8 relative z-10">Commission Structure</h3>
                
                <div className="space-y-4 relative z-10">
                  {commissions.map((item, i) => (
                    <div 
                      key={i} 
                      className="flex justify-between items-center p-4 rounded-xl bg-slate-900 border border-slate-800 hover:border-brand-electricBlue/50 transition-colors"
                    >
                      <div>
                        <h4 className="text-sm font-bold text-slate-200">{item.service}</h4>
                        <p className="text-xs text-slate-500 mt-0.5">Package Price: {formatPrice(item.price)}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-[10px] text-slate-400 uppercase tracking-wider font-bold">You Earn</p>
                        <p className="text-lg font-extrabold text-brand-cyanAccent">{formatPrice(item.earn)}</p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Multiple ways to join */}
                <div className="mt-8 relative z-10 space-y-3">
                  <p className="text-sm text-slate-300 text-center font-bold mb-4">Choose how you want to join:</p>
                  
                  <a href="https://wa.me/26879375018?text=Hi,%20I'd%20like%20to%20join%20the%20referral%20program." target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 w-full py-3 bg-green-500/20 hover:bg-green-500/30 text-green-400 font-bold rounded-xl transition-all text-sm border border-green-500/20" onClick={() => playSynthBeep(850, 0.1)}>
                    <Phone className="w-4 h-4" /> Join via WhatsApp
                  </a>
                  <a href="mailto:andrewtsabedze943@gmail.com?subject=Join%20Referral%20Program&body=Hi,%20I'd%20like%20to%20join%20the%20referral%20program." className="flex items-center justify-center gap-2 w-full py-3 bg-brand-electricBlue/20 hover:bg-brand-electricBlue/30 text-brand-cyanAccent font-bold rounded-xl transition-all text-sm border border-brand-electricBlue/20" onClick={() => playSynthBeep(850, 0.1)}>
                    <Mail className="w-4 h-4" /> Join via Email
                  </a>
                </div>
              </div>
            </RevealItem3D>
          </div>

          {/* Terms and Conditions */}
          <RevealItem3D className="mt-16 max-w-4xl mx-auto glassmorphism p-8 rounded-2xl border border-slate-700/50">
            <div className="flex items-center gap-3 mb-6">
              <AlertTriangle className="w-6 h-6 text-amber-400" />
              <h3 className="text-xl font-bold text-white">Referral Terms & Conditions</h3>
            </div>
            <ul className="space-y-3 text-sm text-slate-300 list-disc pl-5">
              <li>Commission is earned <strong className="text-white">ONLY</strong> after the client has paid in full.</li>
              <li>Referral commission is paid only after payment has been confirmed.</li>
              <li>The client must mention the referral ID or referral name <strong className="text-white">before</strong> making payment.</li>
              <li>Fraudulent or self-referrals are not accepted.</li>
              <li>Nexaflow AI reserves the right to verify referrals and adjust terms if necessary.</li>
            </ul>
          </RevealItem3D>
        </SectionReveal3D>
      </div>
    </section>
  );
}
