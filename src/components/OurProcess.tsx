import { MessageSquare, Phone, FileText, Code2, CheckSquare, Rocket, Headphones } from 'lucide-react';

export default function OurProcess() {
  const steps = [
    { icon: <MessageSquare className="w-5 h-5" />, title: "Submit Inquiry", desc: "Reach out via our contact form, email, or WhatsApp." },
    { icon: <Phone className="w-5 h-5" />, title: "Free Consultation", desc: "We discuss your goals, requirements, and business challenges." },
    { icon: <FileText className="w-5 h-5" />, title: "Quotation", desc: "Receive a detailed proposal tailored to your specific needs." },
    { icon: <Code2 className="w-5 h-5" />, title: "Design & Dev", desc: "We design and build your solution with regular updates." },
    { icon: <CheckSquare className="w-5 h-5" />, title: "Review & Revise", desc: "You review the work, and we make necessary adjustments." },
    { icon: <Rocket className="w-5 h-5" />, title: "Launch", desc: "Your website goes live and starts generating results." },
    { icon: <Headphones className="w-5 h-5" />, title: "Ongoing Support", desc: "We provide maintenance and support to ensure smooth operation." }
  ];

  return (
    <section id="process" className="py-24 relative bg-[#010309] overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight">
            Our Process
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto font-medium">
            A clear, transparent workflow to turn your vision into a live product without the stress.
          </p>
        </div>

        <div className="relative max-w-4xl mx-auto">
          {/* Timeline line */}
          <div className="absolute left-[27px] md:left-1/2 top-0 bottom-0 w-px bg-slate-800 -translate-x-1/2 hidden md:block"></div>
          
          <div className="space-y-8 relative">
            {steps.map((step, i) => (
              <div key={i} className={`flex flex-col md:flex-row gap-6 md:gap-12 items-start md:items-center ${i % 2 === 0 ? 'md:flex-row-reverse' : ''}`}>
                <div className={`hidden md:block w-1/2 ${i % 2 === 0 ? 'text-left pl-12' : 'text-right pr-12'}`}>
                  <h3 className="text-xl font-bold text-white mb-2">{step.title}</h3>
                  <p className="text-sm text-slate-400">{step.desc}</p>
                </div>
                
                <div className="relative shrink-0 z-10 flex items-center justify-center">
                  <div className="w-14 h-14 rounded-full bg-slate-900 border-2 border-brand-electricBlue text-brand-cyanAccent flex items-center justify-center shadow-[0_0_15px_rgba(6,182,212,0.3)]">
                    {step.icon}
                  </div>
                  <div className="absolute -top-3 -right-3 w-6 h-6 rounded-full bg-brand-cyanAccent text-[#010309] text-[10px] font-extrabold flex items-center justify-center">
                    {i + 1}
                  </div>
                </div>

                <div className={`md:hidden w-full bg-slate-900/50 border border-white/5 p-5 rounded-2xl`}>
                   <h3 className="text-lg font-bold text-white mb-1">{step.title}</h3>
                   <p className="text-sm text-slate-400">{step.desc}</p>
                </div>
                
                <div className={`hidden md:block w-1/2 ${i % 2 === 0 ? 'text-right pr-12' : 'text-left pl-12'}`}>
                  {/* Empty space for alternating layout */}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
