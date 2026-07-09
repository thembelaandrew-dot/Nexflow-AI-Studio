import { Layout, Activity, UserCheck, LifeBuoy } from 'lucide-react';

export default function WhyChooseUs() {
  return (
    <section id="why-choose-us" className="py-24 relative border-t border-slate-800 bg-brand-darkBlue/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-brand-cyanAccent uppercase tracking-widest text-xs font-bold bg-brand-cyanAccent/10 px-4 py-1.5 rounded-full">Core Principles</span>
          <h2 className="text-3xl sm:text-4xl font-extrabold mt-3 text-white">Why Choose NexaFlow AI?</h2>
          <p className="text-slate-400 mt-2">We build and scale customized tools that help your organization operate efficiently.</p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          <div className="glassmorphism p-6 sm:p-8 rounded-2xl border border-white/5 relative group hover:border-brand-electricBlue/30 transition-all duration-300">
            <div className="text-brand-electricBlue bg-brand-electricBlue/10 p-3 rounded-xl inline-block mb-4">
              <Layout className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">Modern Web Design</h3>
            <p className="text-sm text-slate-400 leading-relaxed">Professional websites built to establish credibility and support business growth.</p>
          </div>
          
          <div className="glassmorphism p-6 sm:p-8 rounded-2xl border border-white/5 relative group hover:border-brand-cyanAccent/30 transition-all duration-300">
            <div className="text-brand-cyanAccent bg-brand-cyanAccent/10 p-3 rounded-xl inline-block mb-4">
              <Activity className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">AI-Powered Solutions</h3>
            <p className="text-sm text-slate-400 leading-relaxed">Smart automation systems that help reduce manual work and improve efficiency.</p>
          </div>
          
          <div className="glassmorphism p-6 sm:p-8 rounded-2xl border border-white/5 relative group hover:border-brand-electricBlue/30 transition-all duration-300">
            <div className="text-brand-electricBlue bg-brand-electricBlue/10 p-3 rounded-xl inline-block mb-4">
              <UserCheck className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">Personalized Service</h3>
            <p className="text-sm text-slate-400 leading-relaxed">Work directly with the people responsible for your project.</p>
          </div>
          
          <div className="glassmorphism p-6 sm:p-8 rounded-2xl border border-white/5 relative group hover:border-brand-cyanAccent/30 transition-all duration-300">
            <div className="text-brand-cyanAccent bg-brand-cyanAccent/10 p-3 rounded-xl inline-block mb-4">
              <LifeBuoy className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">Ongoing Support</h3>
            <p className="text-sm text-slate-400 leading-relaxed">Reliable assistance before, during, and after project launch.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
