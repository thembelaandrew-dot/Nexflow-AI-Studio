import { Check } from 'lucide-react';
import { playSynthBeep } from '../lib/audio';
import { useCurrency } from '../lib/CurrencyContext';
import { motion } from 'motion/react';

export default function Pricing() {
  const { formatPrice } = useCurrency();
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as any }
    }
  };

  const plans = [
    {
      name: "Landing Page",
      price: 27,
      desc: "Ideal for restaurants, salons, small businesses, and personal brands.",
      features: ['Responsive one-page website', 'WhatsApp integration', 'Contact form', 'Google Maps', 'Mobile optimized', 'Fast loading', 'Professional design'],
      popular: false,
      tag: null
    },
    {
      name: "Starter Website",
      price: 80,
      desc: "Perfect for establishing a credible, multi-page online presence.",
      features: ['Up to 5 pages', 'Responsive design', 'Contact forms', 'Gallery', 'Google Maps', 'Basic SEO', 'WhatsApp integration'],
      popular: false,
      tag: null
    },
    {
      name: "Business Website",
      price: 190,
      desc: "Enhanced layouts configured for optimized growth and authority.",
      extra: "Everything in Starter",
      features: ['Booking forms', 'Blog (if needed)', 'Advanced UI', 'Better SEO', 'More integrations', 'Premium animations'],
      popular: true,
      tag: "⭐ Most Popular"
    },
    {
      name: "Website + AI",
      price: 325,
      desc: "Saves your business time, reduces repetitive work, and helps generate leads.",
      extra: "Complete Business Website",
      features: ['AI Chatbot', 'Lead capture', 'Email automation', 'Appointment automation', 'Google Sheets automation', 'CRM integration', 'AI workflows', 'WhatsApp automation'],
      popular: false,
      tag: "OPENING DISCOUNT"
    }
  ];

  return (
    <section id="pricing" className="py-32 relative overflow-hidden bg-transparent border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 relative z-10">
        
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={itemVariants}
          className="text-center max-w-3xl mx-auto mb-20"
        >
          <span className="text-brand-electricBlue uppercase tracking-widest text-xs font-bold bg-brand-electricBlue/10 px-4 py-1.5 rounded-full border border-brand-electricBlue/20 backdrop-blur-md">Investment</span>
          <h2 className="text-4xl md:text-5xl font-extrabold mt-6 text-white tracking-tight">Transparent <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-electricBlue to-brand-cyanAccent">Pricing</span></h2>
          <p className="text-slate-400 mt-4 text-lg">
            Straightforward packages designed to scale with your business. Choose the solution that fits your goals.
          </p>
        </motion.div>

        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch"
        >
          {plans.map((plan, idx) => (
            <motion.div 
              key={idx} 
              variants={itemVariants}
              whileHover={{ y: -8, transition: { duration: 0.2 } }}
              className={`glassmorphism p-8 rounded-3xl flex flex-col justify-between transition-all duration-300 relative group backdrop-blur-xl
                ${plan.popular ? 'border-2 border-brand-cyanAccent/50 hover:border-brand-cyanAccent/80 shadow-[0_0_35px_rgba(6,182,212,0.15)] bg-[#02050c]/80' : 'border border-white/10 hover:border-slate-600 bg-slate-900/40'}
              `}
            >
              {plan.tag && (
                plan.popular ? (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 text-[10px] font-extrabold uppercase tracking-widest bg-gradient-to-r from-brand-electricBlue to-brand-cyanAccent text-white px-4 py-1.5 rounded-full shadow-md whitespace-nowrap">
                    {plan.tag}
                  </span>
                ) : (
                  <div className="mb-4 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-cyanAccent/10 text-brand-cyanAccent border border-brand-cyanAccent/20 text-[10px] font-bold uppercase tracking-widest whitespace-nowrap">
                    {plan.tag}
                  </div>
                )
              )}
              
              <div>
                <div className="mb-6 mt-2">
                  <h3 className="text-lg font-bold text-slate-200">{plan.name}</h3>
                  <div className="mt-4 flex flex-col">
                    <div className="flex items-baseline gap-2">
                      <span className="text-4xl font-extrabold text-white">{formatPrice(plan.price)}</span>
                    </div>
                  </div>
                  <p className={`text-xs mt-2 ${plan.popular ? 'text-brand-cyanAccent' : 'text-slate-400'}`}>
                    {plan.desc}
                  </p>
                </div>
                
                <ul className="space-y-4 border-t border-slate-800/80 pt-6">
                  {plan.extra && (
                    <li className="flex items-start gap-3 text-sm text-slate-200">
                      <Check className="w-4 h-4 mt-0.5 text-brand-cyanAccent shrink-0" />
                      <span className="font-bold text-brand-cyanAccent">{plan.extra}</span>
                    </li>
                  )}
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm text-slate-300">
                      <Check className="w-4 h-4 mt-0.5 text-brand-cyanAccent shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="mt-8">
                <a 
                  href="#contact" 
                  className={`block w-full text-center py-3 font-bold rounded-xl transition-all text-sm
                    ${plan.popular 
                      ? 'bg-gradient-to-r from-brand-electricBlue to-brand-cyanAccent text-white hover:opacity-90 hover:shadow-lg' 
                      : 'bg-white/5 hover:bg-brand-cyanAccent hover:text-black border border-slate-700 hover:border-brand-cyanAccent text-white'}
                  `}
                  onClick={() => playSynthBeep(plan.popular ? 880 : 700, 0.1)}
                >
                  {plan.popular ? 'Get Started' : 'Select Plan'}
                </a>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
