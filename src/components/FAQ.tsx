import { useState } from 'react';
import { playSynthBeep } from '../lib/audio';

const faqs = [
  { q: "How long does it take to deploy a premium website?", a: "Most websites are completed within 3–7 business days depending on project requirements, content availability, and revision requests. More advanced projects may require additional time." },
  { q: "What is AI Business Automation, and how does it help us?", a: "AI Business Automation helps streamline repetitive tasks such as lead capture, customer follow-ups, appointment booking, and internal workflows. This saves time and improves operational efficiency." },
  { q: "Can we track our leads and overall site traffic ourselves?", a: "Yes. Analytics and tracking tools can be integrated so you can monitor website traffic, visitor behavior, lead submissions, and overall performance." },
  { q: "Do you offer continuous support after launch?", a: "Absolutely. Ongoing support, updates, maintenance, and technical assistance are available to ensure your digital systems continue operating smoothly." },
  { q: "How much do your services cost?", a: "Pricing depends on project scope and requirements. Every solution is tailored to client needs. Contact us for a consultation and customized quote." }
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (index: number) => {
    playSynthBeep(520, 0.05);
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-24 relative overflow-hidden border-t border-slate-800">
      <div className="max-w-4xl mx-auto px-4 sm:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-brand-cyanAccent uppercase tracking-widest text-xs font-bold bg-brand-cyanAccent/10 px-4 py-1.5 rounded-full">Clarifications</span>
          <h2 className="text-3xl sm:text-4xl font-extrabold mt-4 text-white">Frequently Asked Questions</h2>
          <p className="text-slate-400 mt-2">Clear answers about our development timelines, custom pricing, and integrations.</p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div key={index} className={`glassmorphism rounded-2xl border ${isOpen ? 'border-brand-cyanAccent/40' : 'border-white/5'} overflow-hidden transition-all duration-300`}>
                <button className="faq-btn w-full px-6 py-5 text-left flex items-center justify-between font-bold text-white hover:bg-white/5 transition-colors" onClick={() => toggle(index)}>
                  <span>{faq.q}</span>
                  <div className="relative w-5 h-5 flex items-center justify-center shrink-0 ml-4">
                    <span className="absolute block w-5 h-0.5 bg-brand-cyanAccent transition-transform duration-300 ease-in-out"></span>
                    <span className={`absolute block w-0.5 h-5 bg-brand-cyanAccent transition-transform duration-300 ease-in-out ${isOpen ? 'scale-y-0' : 'scale-y-100'}`}></span>
                  </div>
                </button>
                <div className={`faq-content overflow-hidden transition-all duration-300 ease-in-out bg-slate-900/40 ${isOpen ? 'max-h-40' : 'max-h-0'}`}>
                  <p className="p-6 text-sm text-slate-300 leading-relaxed">
                    {faq.a}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
