import { useState } from 'react';
import { ChevronDown, MessageCircle } from 'lucide-react';
import { playSynthBeep } from '../lib/audio';
import { motion, AnimatePresence } from 'motion/react';

export default function FAQ() {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const faqs = [
    {
      q: "How long does it take to build a website?",
      a: "Most of our standard business websites are completed within 1-2 weeks. Complex projects or custom AI integrations may take 3-4 weeks. We prioritize rapid delivery without sacrificing quality."
    },
    {
      q: "Do I need to provide the text and images?",
      a: "It's best if you have your own brand assets, but if not, our team can help generate professional copy and source high-quality premium imagery for your site."
    },
    {
      q: "What is an AI Automation and how does it help?",
      a: "AI automation means using intelligent software to do repetitive tasks for you. For example, automatically responding to customer inquiries, booking appointments, capturing leads, or syncing data to your CRM, freeing you up to focus on growing your business."
    },
    {
      q: "Will my website work on mobile phones?",
      a: "Yes. Every website we build is \"mobile-first,\" meaning it is explicitly designed and optimized to look and perform flawlessly on smartphones and tablets."
    },
    {
      q: "Are there any hidden monthly fees?",
      a: "No hidden fees. You pay the project cost upfront or in milestones. The only ongoing costs are standard domain and hosting fees (usually around $10-$20/month depending on your traffic), which we help you set up in your own name."
    }
  ];

  return (
    <section id="faq" className="py-32 relative bg-transparent overflow-hidden">
      <div className="max-w-4xl mx-auto px-6 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-brand-electricBlue uppercase tracking-widest text-xs font-bold bg-brand-electricBlue/10 px-4 py-1.5 rounded-full border border-brand-electricBlue/20">Questions & Answers</span>
          <h2 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight mt-6">Frequently Asked <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-electricBlue to-brand-cyanAccent">Questions</span></h2>
        </motion.div>

        <div className="space-y-4">
          {faqs.map((faq, idx) => (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
              key={idx} 
              className={`glassmorphism rounded-2xl border transition-all duration-300 overflow-hidden ${openIdx === idx ? 'border-brand-electricBlue/50 shadow-[0_0_20px_rgba(59,130,246,0.1)] bg-slate-900/60' : 'border-white/5 bg-slate-900/30 hover:border-white/20'}`}
            >
              <button 
                className="w-full px-6 py-5 flex items-center justify-between text-left"
                onClick={() => {
                  playSynthBeep(400 + (idx * 50), 0.05);
                  setOpenIdx(openIdx === idx ? null : idx);
                }}
              >
                <span className={`font-bold text-lg transition-colors duration-300 ${openIdx === idx ? 'text-white' : 'text-slate-300'}`}>{faq.q}</span>
                <ChevronDown className={`w-5 h-5 shrink-0 transition-transform duration-300 ${openIdx === idx ? 'text-brand-electricBlue rotate-180' : 'text-slate-500'}`} />
              </button>
              
              <AnimatePresence>
                {openIdx === idx && (
                  <motion.div 
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                  >
                    <div className="px-6 pb-6 text-slate-400 leading-relaxed">
                      {faq.a}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="mt-12 text-center"
        >
          <div className="inline-flex flex-col sm:flex-row items-center gap-4 bg-slate-900/50 p-4 rounded-2xl border border-white/5 backdrop-blur-md">
            <div className="flex items-center justify-center w-12 h-12 rounded-full bg-brand-electricBlue/20 text-brand-electricBlue">
              <MessageCircle className="w-6 h-6" />
            </div>
            <div className="text-center sm:text-left">
              <p className="text-white font-bold">Still have questions?</p>
              <p className="text-slate-400 text-sm">We're here to help clarify anything you need.</p>
            </div>
            <a href="#contact" className="px-5 py-2.5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-white font-bold text-sm transition-colors sm:ml-4" onClick={() => playSynthBeep(600, 0.05)}>
              Ask a Question
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
