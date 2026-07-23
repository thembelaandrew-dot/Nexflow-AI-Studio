import { XCircle, CheckCircle2 } from 'lucide-react';
import { playSynthBeep } from '../lib/audio';

export default function PainPoints() {
  const painPoints = [
    "Customers cannot find you online.",
    "Competitors appear more professional.",
    "You lose potential customers every day.",
    "Limited credibility.",
    "No online enquiries while you sleep.",
    "Customers struggle to find your services.",
    "No automation.",
    "Too much repetitive manual work."
  ];

  const benefits = [
    "Professional online presence",
    "Increased trust",
    "More enquiries",
    "More customers",
    "AI automation",
    "24/7 availability",
    "Better customer experience",
    "Faster communication"
  ];

  return (
    <section id="solutions" className="py-24 relative overflow-hidden bg-brand-darkBlue/20 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        <div className="grid lg:grid-cols-2 gap-16">
          {/* Pain Points */}
          <div>
            <div className="mb-10">
              <span className="text-red-400 uppercase tracking-widest text-xs font-bold bg-red-400/10 px-4 py-1.5 rounded-full">The Problem</span>
              <h2 className="text-3xl md:text-4xl font-extrabold mt-4 text-white">What is your business losing without a website?</h2>
            </div>
            
            <div className="space-y-4">
              {painPoints.map((point, i) => (
                <div key={i} className="flex items-start gap-4 glassmorphism p-4 rounded-xl border border-red-500/10 hover:border-red-500/30 transition-colors">
                  <XCircle className="w-6 h-6 text-red-400 shrink-0 mt-0.5" />
                  <p className="text-slate-300 font-medium">{point}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Solutions */}
          <div>
            <div className="mb-10">
              <span className="text-emerald-400 uppercase tracking-widest text-xs font-bold bg-emerald-400/10 px-4 py-1.5 rounded-full">The Solution</span>
              <h2 className="text-3xl md:text-4xl font-extrabold mt-4 text-white">How Nexaflow AI Helps</h2>
              <p className="text-slate-400 mt-4">We focus on business outcomes, turning your digital presence into an asset that works for you 24/7.</p>
            </div>
            
            <div className="space-y-4">
              {benefits.map((benefit, i) => (
                <div key={i} className="flex items-start gap-4 glassmorphism p-4 rounded-xl border border-emerald-500/20 bg-emerald-500/5 hover:border-emerald-500/40 transition-colors">
                  <CheckCircle2 className="w-6 h-6 text-emerald-400 shrink-0 mt-0.5" />
                  <p className="text-white font-bold">{benefit}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
