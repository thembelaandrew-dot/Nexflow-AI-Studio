import { useState } from 'react';
import { playSynthBeep } from '../lib/audio';
import { useCurrency } from '../lib/CurrencyContext';

export default function FAQ() {
  const { formatPrice } = useCurrency();
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (index: number) => {
    playSynthBeep(520, 0.05);
    setOpenIndex(openIndex === index ? null : index);
  };

  const faqs = [
    { q: "How much do your services cost?", a: `We offer transparent pricing: Landing Pages from ${formatPrice(27)}, Starter Websites from ${formatPrice(80)}, Business Websites from ${formatPrice(190)}, and comprehensive Website + AI Automation packages at a discounted ${formatPrice(325)}. All prices can be tailored during a free consultation based on your exact needs.` },
    { q: "How long does delivery take?", a: "A standard Landing Page or Starter Website typically takes 1 to 2 weeks. More complex Business Websites and Automation systems generally take 2 to 4 weeks depending on the project scope and how quickly we receive content from you." },
    { q: "What are your payment terms?", a: "We typically require a 50% deposit before work begins, with the remaining 50% due upon project completion and your final approval. Payment plans can be discussed for larger projects." },
    { q: "Do you offer revisions?", a: "Yes. Every project includes a built-in review and revision phase. We want to ensure you are 100% satisfied with the design and functionality before we go live." },
    { q: "Do you provide hosting?", a: "Yes, we can manage hosting and domain registration for you so you don't have to worry about the technical details. We use fast, secure, and reliable cloud hosting." },
    { q: "Do you offer ongoing maintenance?", a: "Absolutely. We offer ongoing maintenance and support packages to keep your website updated, secure, and running smoothly long after the initial launch." },
    { q: "What is AI Business Automation?", a: "AI Business Automation uses smart software (like AI chatbots, automated email responses, and lead capture workflows) to handle repetitive tasks. This saves you time, reduces manual data entry, and helps convert visitors into paying clients 24/7." },
    { q: "How does the Referral Program work?", a: `Anyone can join! Simply refer a business to Nexaflow AI. If they become a client, you earn a commission ranging from ${formatPrice(3)} to ${formatPrice(50)} depending on the package they choose. Commissions are paid once the client completes their first payment.` }
  ];

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
                <div className={`faq-content overflow-hidden transition-all duration-300 ease-in-out bg-slate-900/40 ${isOpen ? 'max-h-60' : 'max-h-0'}`}>
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
