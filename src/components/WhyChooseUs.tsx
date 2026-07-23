import { DollarSign, Zap, Smartphone, Bot, MonitorPlay, Maximize, Headphones, Users } from 'lucide-react';

export default function WhyChooseUs() {
  const reasons = [
    { icon: <DollarSign className="w-6 h-6" />, title: "Affordable Pricing", desc: "Premium quality websites without the premium price tag. Scalable for any business." },
    { icon: <Zap className="w-6 h-6" />, title: "Fast Delivery", desc: "We respect your time. Get your project launched quickly and efficiently." },
    { icon: <Smartphone className="w-6 h-6" />, title: "Mobile-First Design", desc: "Flawless performance on mobile devices to capture the majority of your traffic." },
    { icon: <Bot className="w-6 h-6" />, title: "AI Automation Expertise", desc: "Automate repetitive tasks, capture leads, and scale your business effortlessly." },
    { icon: <MonitorPlay className="w-6 h-6" />, title: "Modern UI", desc: "Clean, high-conversion interfaces that build immediate trust with your visitors." },
    { icon: <Maximize className="w-6 h-6" />, title: "Responsive Websites", desc: "Your site will look and function perfectly across all screen sizes and devices." },
    { icon: <Headphones className="w-6 h-6" />, title: "Ongoing Support", desc: "We are here for you before, during, and long after your project is launched." },
    { icon: <Users className="w-6 h-6" />, title: "Reliable Communication", desc: "Direct, transparent communication. You'll always know the status of your project." }
  ];

  return (
    <section id="why-choose-us" className="py-24 relative border-t border-slate-800 bg-brand-darkBlue/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-brand-cyanAccent uppercase tracking-widest text-xs font-bold bg-brand-cyanAccent/10 px-4 py-1.5 rounded-full">Core Principles</span>
          <h2 className="text-3xl sm:text-4xl font-extrabold mt-3 text-white">Why Choose NexaFlow AI?</h2>
          <p className="text-slate-400 mt-2">We build and scale customized tools that help your organization operate efficiently.</p>
        </div>
        
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {reasons.map((reason, i) => (
            <div key={i} className="glassmorphism p-6 sm:p-8 rounded-2xl border border-white/5 relative group hover:border-brand-electricBlue/30 transition-all duration-300">
              <div className="text-brand-electricBlue bg-brand-electricBlue/10 p-3 rounded-xl inline-block mb-4 group-hover:scale-110 transition-transform">
                {reason.icon}
              </div>
              <h3 className="text-lg font-bold text-white mb-2">{reason.title}</h3>
              <p className="text-sm text-slate-400 leading-relaxed">{reason.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
