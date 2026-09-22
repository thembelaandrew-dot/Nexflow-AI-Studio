import { Target, Eye } from 'lucide-react';
import SectionReveal3D, { RevealItem3D } from './SectionReveal3D';

export default function Team() {
  return (
    <section id="team" className="py-24 relative bg-nexa-dark-blue border-t border-white/5 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 relative z-10">
        <SectionReveal3D staggerDelay={0.15}>
          <div className="grid lg:grid-cols-12 gap-12 items-center">
            
            <RevealItem3D className="lg:col-span-5 flex justify-center">
              <div className="relative max-w-sm w-full group">
                <div className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-brand-electricBlue to-brand-cyanAccent opacity-25 blur-xl group-hover:opacity-35 transition-all"></div>
                
                <div className="relative rounded-2xl overflow-hidden aspect-[4/5] bg-slate-900 border border-slate-700">
                  <img src="/assets/founder.jpg" alt="Andrew Tsabedze Founder of Nexaflow AI" className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500" loading="lazy" />
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-deep via-brand-deep/20 to-transparent"></div>
                  
                  <div className="absolute bottom-6 left-6 right-6">
                    <p className="text-xs uppercase tracking-widest text-brand-cyanAccent font-bold">Founder & CEO</p>
                    <h3 className="text-2xl font-bold text-white mt-1">Andrew Tsabedze</h3>
                  </div>
                </div>
              </div>
            </RevealItem3D>

            <RevealItem3D className="lg:col-span-7 space-y-8">
              <div>
                <span className="text-brand-cyanAccent uppercase tracking-widest text-xs font-bold bg-brand-cyanAccent/10 px-4 py-1.5 rounded-full">Who You'll Work With</span>
                <h2 className="text-3xl sm:text-4xl font-extrabold mt-4 text-white">A Reliable Boutique AI Agency Experience</h2>
              </div>
              
              <p className="text-slate-300 leading-relaxed text-base">
                As an established AI Agency in Africa based in Eswatini, clients work directly with the experts responsible for planning, building, and supporting their projects. This ensures clear communication, personalized service, and accountability for every custom website and automation system we deliver.
              </p>
              
              <div className="grid sm:grid-cols-2 gap-6 pt-4">
                <div className="glassmorphism p-5 rounded-xl border border-white/5 backdrop-blur-sm hover:-translate-y-1 transition-transform">
                  <span className="text-brand-cyanAccent text-xs uppercase font-bold block mb-1">Lead Developer</span>
                  <h4 className="text-base font-bold text-white mb-2">Andrew Tsabedze</h4>
                  <p className="text-xs text-slate-400 leading-relaxed">Founder & AI Solutions Specialist handling web development, automation architectures, and strategic system planning.</p>
                </div>
                <div className="glassmorphism p-5 rounded-xl border border-white/5 backdrop-blur-sm hover:-translate-y-1 transition-transform">
                  <span className="text-brand-electricBlue text-xs uppercase font-bold block mb-1">Client Strategy</span>
                  <h4 className="text-base font-bold text-white mb-2">Business Development Advisor</h4>
                  <p className="text-xs text-slate-400 leading-relaxed">Coordinating client outreach, workflow scopes, administrative relations, and long-term assistance programs.</p>
                </div>
              </div>
              
              <div className="grid sm:grid-cols-2 gap-6 pt-2">
                <div className="glassmorphism p-5 rounded-xl border border-white/5 backdrop-blur-sm hover:-translate-y-1 transition-transform">
                  <div className="flex items-center gap-3 text-brand-cyanAccent mb-2">
                    <Target className="w-5 h-5" />
                    <span className="font-extrabold text-sm uppercase tracking-wide text-white">Our Mission</span>
                  </div>
                  <p className="text-xs text-slate-400 leading-relaxed">To help growing organizations build credible, high-performing websites and streamlined systems.</p>
                </div>
                <div className="glassmorphism p-5 rounded-xl border border-white/5 backdrop-blur-sm hover:-translate-y-1 transition-transform">
                  <div className="flex items-center gap-3 text-brand-electricBlue mb-2">
                    <Eye className="w-5 h-5" />
                    <span className="font-extrabold text-sm uppercase tracking-wide text-white">Our Vision</span>
                  </div>
                  <p className="text-xs text-slate-400 leading-relaxed">To establish Nexaflow AI as a highly trusted boutique partner for modern digital design and automation.</p>
                </div>
              </div>
            </RevealItem3D>
          </div>
        </SectionReveal3D>
      </div>
    </section>
  );
}
