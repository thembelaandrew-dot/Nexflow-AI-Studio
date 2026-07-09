import { Globe, Users, Zap, Headphones, Mail, Megaphone, ChevronRight } from 'lucide-react';
import { playSynthBeep } from '../lib/audio';

export default function Services() {
  return (
    <section id="services" className="py-24 relative overflow-hidden border-t border-slate-800 bg-brand-darkBlue/10">
      <div className="absolute -top-1/3 left-0 w-[400px] h-[400px] bg-brand-cyanAccent/5 rounded-full blur-[100px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16">
          <div>
            <span className="text-brand-electricBlue uppercase tracking-widest text-xs font-bold bg-brand-electricBlue/10 px-4 py-1.5 rounded-full">Core Expertise</span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold mt-4 text-white">Practical Business Solutions</h2>
          </div>
          <p className="text-slate-400 max-w-md mt-4 md:mt-0 text-sm">
            Utilizing clean standards and smart workflows to build reliable solutions designed for utility and growth.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            { icon: Globe, title: "AI-Powered Business Websites", desc: "Modern responsive websites designed to attract customers and build credibility.", label: "Web Design", color: "brand-electricBlue" },
            { icon: Users, title: "Lead Generation", desc: "We help businesses find and connect with qualified leads.", label: "Marketing", color: "brand-cyanAccent" },
            { icon: Zap, title: "Business Automation", desc: "Automate repetitive tasks and improve operational efficiency.", label: "Efficiency", color: "brand-electricBlue" },
            { icon: Headphones, title: "Virtual Assistant Services", desc: "Administrative support, research, customer management and business assistance.", label: "Admin Support", color: "brand-cyanAccent" },
            { icon: Mail, title: "Cold Email Outreach", desc: "Targeted outreach campaigns designed to generate business opportunities.", label: "Campaigns", color: "brand-electricBlue" },
            { icon: Megaphone, title: "Digital Marketing Support", desc: "Online growth solutions to help businesses increase visibility and attract customers.", label: "Visibility", color: "brand-cyanAccent" }
          ].map((service, idx) => (
            <div key={idx} className="glassmorphism glow-card p-8 rounded-2xl transition-all duration-300 flex flex-col justify-between group">
              <div>
                <div className={`w-12 h-12 rounded-xl bg-${service.color}/10 flex items-center justify-center text-${service.color} border border-${service.color}/20 mb-6 transition-all duration-300`}>
                  <service.icon className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{service.title}</h3>
                <p className="text-slate-400 leading-relaxed text-sm">
                  {service.desc}
                </p>
              </div>
              <div className="mt-8 pt-4 border-t border-slate-800/60 flex items-center justify-between">
                <span className="text-xs text-brand-cyanAccent uppercase tracking-widest font-bold">{service.label}</span>
                <a href="#contact" className="text-slate-400 hover:text-white transition-colors flex items-center gap-1 text-sm" onClick={() => playSynthBeep(700, 0.05)}>
                  <span>Inquire</span>
                  <ChevronRight className="w-4 h-4" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
