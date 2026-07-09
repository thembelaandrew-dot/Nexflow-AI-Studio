import { PhoneCall, Zap, Smile, Shield } from 'lucide-react';

export default function BoutiqueAgency() {
  return (
    <section className="py-24 relative border-t border-slate-800 bg-brand-deep">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-5 space-y-6">
            <span className="text-brand-cyanAccent uppercase tracking-widest text-xs font-bold bg-brand-cyanAccent/10 px-4 py-1.5 rounded-full">Boutique Agency Model</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white">Small Team. Big Results.</h2>
            <p className="text-slate-300 leading-relaxed">
              NexaFlow AI focuses on quality over quantity. Every project receives personal attention, direct communication, and a commitment to delivering practical digital solutions that help organizations grow.
            </p>
          </div>
          <div className="lg:col-span-7 grid sm:grid-cols-2 gap-6">
            <div className="glassmorphism p-6 rounded-xl border border-white/5 hover:border-brand-electricBlue/20 transition-all">
              <div className="flex items-center gap-3 text-brand-cyanAccent mb-2">
                <PhoneCall className="w-5 h-5" />
                <span className="font-bold text-sm text-white">Direct Founder Access</span>
              </div>
              <p className="text-xs text-slate-400">Speak directly with Andrew to align requirements quickly, with no intermediary layers.</p>
            </div>
            <div className="glassmorphism p-6 rounded-xl border border-white/5 hover:border-brand-electricBlue/20 transition-all">
              <div className="flex items-center gap-3 text-brand-cyanAccent mb-2">
                <Zap className="w-5 h-5" />
                <span className="font-bold text-sm text-white">Fast Communication</span>
              </div>
              <p className="text-xs text-slate-400">Responsive email and WhatsApp communication keeps you updated at every stage of work.</p>
            </div>
            <div className="glassmorphism p-6 rounded-xl border border-white/5 hover:border-brand-electricBlue/20 transition-all">
              <div className="flex items-center gap-3 text-brand-cyanAccent mb-2">
                <Smile className="w-5 h-5" />
                <span className="font-bold text-sm text-white">Personalized Attention</span>
              </div>
              <p className="text-xs text-slate-400">We keep our active projects limited to guarantee focused development and thorough code reviews.</p>
            </div>
            <div className="glassmorphism p-6 rounded-xl border border-white/5 hover:border-brand-electricBlue/20 transition-all">
              <div className="flex items-center gap-3 text-brand-cyanAccent mb-2">
                <Shield className="w-5 h-5" />
                <span className="font-bold text-sm text-white">Long-Term Support</span>
              </div>
              <p className="text-xs text-slate-400">Continuous updates, hosting setup assistance, and troubleshooting are always accessible.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
