import { Check, ArrowRight, ShieldCheck, Zap, Sparkles, Cpu, Clock, Calendar, CheckCircle } from 'lucide-react';
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

  const standardPlans = [
    {
      name: "Professional Landing Page",
      price: 135,
      desc: "Focused, professionally designed landing pages for campaigns, services, products, events, launches and businesses that need a strong conversion-oriented online presence.",
      features: ['Conversion-optimized design', 'Mobile responsiveness', 'Contact & lead capture forms', 'Professional branding alignment'],
    },
    {
      name: "Starter Website",
      price: 216,
      desc: "A professional website for individuals, startups and small businesses that need a credible and polished online presence.",
      features: ['Multi-page professional layout', 'Mobile responsiveness', 'Contact & inquiry forms', 'Basic SEO configuration', 'Professional aesthetic'],
    },
    {
      name: "Business Website",
      price: 324,
      desc: "A more comprehensive website for established businesses requiring stronger presentation, multiple pages, enhanced functionality and a more refined customer experience.",
      features: ['Comprehensive page structures', 'Advanced UI/UX design', 'Enhanced functionality & forms', 'Performance optimization', 'CMS integration capabilities'],
    },
    {
      name: "Website + Automation",
      price: 540,
      desc: "A professional website combined with practical business automation such as lead capture, enquiry handling, communication workflows, and follow-up systems.",
      features: ['Complete business website', 'Lead capture & qualification', 'Automated email workflows', 'CRM integrations', 'Enquiry handling automation'],
    }
  ];

  const premiumPlans = [
    {
      name: "Premium Interactive Website",
      price: 810,
      desc: "A highly customized digital experience featuring advanced motion, interactive sections, visual storytelling, refined transitions and a more distinctive interface.",
      features: ['Advanced motion graphics', 'Custom interactive elements', 'Visual storytelling layouts', 'Refined micro-interactions'],
    },
    {
      name: "Premium 3D / Hyperinteractive Experience",
      price: 1081,
      desc: "Immersive websites combining advanced animation, 3D elements, scroll-driven interactions, dynamic visual experiences and highly customized interfaces designed around the brand.",
      features: ['Custom WebGL / 3D elements', 'Scroll-driven interactive journeys', 'Dynamic data visualization', 'Unconventional premium layouts'],
    },
    {
      name: "Enterprise / Bespoke Digital Experience",
      price: 1621,
      isPlus: true,
      desc: "Fully customized digital experiences for established organizations requiring advanced functionality, complex user journeys, integrations, sophisticated interaction systems or a bespoke digital platform.",
      features: ['Complex user journey mapping', 'Bespoke platform development', 'Advanced system integrations', 'High-performance architecture'],
    }
  ];

  const aiServices = [
    'AI customer-service agents',
    'AI business assistants',
    'Website AI assistants',
    'Lead capture and qualification',
    'Automated lead follow-up',
    'WhatsApp communication workflows',
    'Email automation',
    'Appointment and enquiry automation',
    'CRM workflow automation',
    'Document and data processing',
    'Automated notifications',
    'Multi-step business workflows',
    'Custom AI agent systems',
    'Business process automation',
    'Website and system integrations'
  ];

  const ongoingServices = [
    'Website maintenance',
    'Content updates',
    'Technical support',
    'Performance monitoring',
    'Website improvements',
    'Additional feature development',
    'Automation monitoring',
    'AI agent maintenance',
    'Content and marketing support',
    'System updates'
  ];

  const processSteps = [
    {
      num: "01",
      title: "DISCOVERY",
      desc: "Understand the client's business, goals, audience and requirements."
    },
    {
      num: "02",
      title: "PROPOSAL",
      desc: "Prepare a tailored scope, quotation and project plan."
    },
    {
      num: "03",
      title: "PROJECT DEPOSIT",
      desc: "A 50% deposit is required to secure the project and allocate development resources before work begins."
    },
    {
      num: "04",
      title: "DEVELOPMENT",
      desc: "Build the agreed website, digital experience, automation or system."
    },
    {
      num: "05",
      title: "REVIEW & REFINEMENT",
      desc: "Client reviews the agreed deliverables and provides feedback within the agreed project scope."
    },
    {
      num: "06",
      title: "FINAL PAYMENT & HANDOVER",
      desc: "The remaining balance is settled upon completion and approval before final handover or launch."
    }
  ];

  return (
    <section id="pricing" className="py-32 relative bg-nexa-deep overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-48 bg-gradient-to-b from-nexa-light-blue to-transparent pointer-events-none z-0"></div>
      <div className="max-w-7xl mx-auto px-4 sm:px-8 relative z-10 space-y-32">
        
        {/* Header */}
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={itemVariants}
          className="text-center max-w-3xl mx-auto"
        >
          <span className="text-brand-electricBlue uppercase tracking-widest text-xs font-bold bg-brand-electricBlue/10 px-4 py-1.5 rounded-full border border-brand-electricBlue/20 backdrop-blur-md">Professional Solutions</span>
          <h2 className="text-4xl md:text-5xl font-extrabold mt-6 text-white tracking-tight">Website Development & <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-electricBlue to-brand-cyanAccent">AI Automation</span></h2>
          <p className="text-slate-400 mt-4 text-lg">
            From professional business websites to AI chatbots, automation systems, and immersive digital experiences in Eswatini and globally.
          </p>
        </motion.div>

        {/* Standard Plans */}
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch"
        >
          {standardPlans.map((plan, idx) => (
            <motion.div 
              key={idx} 
              variants={itemVariants}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
              className="glassmorphism p-8 rounded-3xl flex flex-col justify-between transition-all duration-300 relative group backdrop-blur-xl border border-white/10 hover:border-slate-600 bg-slate-900/40"
            >
              <div>
                <h3 className="text-lg font-bold text-slate-200">{plan.name}</h3>
                <div className="mt-4 flex flex-col">
                  <span className="text-xs text-slate-500 uppercase tracking-widest font-semibold mb-1">From</span>
                  <div className="flex items-baseline gap-2">
                    <span className="text-4xl font-extrabold text-white">{formatPrice(plan.price)}</span>
                  </div>
                </div>
                <p className="text-xs mt-4 text-slate-400 leading-relaxed">
                  {plan.desc}
                </p>
              </div>
              
              <ul className="space-y-4 border-t border-slate-800/80 pt-6 mt-6">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-slate-300">
                    <Check className="w-4 h-4 mt-0.5 text-brand-cyanAccent shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              
              <div className="mt-8 pt-6 border-t border-slate-800/80">
                <a 
                  href="#contact" 
                  className="block w-full text-center py-3 font-bold rounded-xl transition-all text-sm bg-white/5 hover:bg-brand-cyanAccent hover:text-black border border-slate-700 hover:border-brand-cyanAccent text-white"
                  onClick={() => playSynthBeep(700, 0.1)}
                >
                  Discuss Your Project
                </a>
              </div>
            </motion.div>
          ))}
        </motion.div>
        
        <div className="text-center text-xs text-slate-500 mt-8">
          Final pricing is determined by project scope, functionality, integrations, content requirements, design complexity and development requirements.
        </div>

        {/* Premium Experiences */}
        <div className="pt-20 border-t border-white/5 relative">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-brand-cyanAccent/5 rounded-full blur-[100px] pointer-events-none"></div>
          
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={itemVariants}
            className="text-center max-w-3xl mx-auto mb-16 relative z-10"
          >
            <span className="text-brand-cyanAccent uppercase tracking-widest text-xs font-bold bg-brand-cyanAccent/10 px-4 py-1.5 rounded-full border border-brand-cyanAccent/20 backdrop-blur-md">Premium Tier</span>
            <h2 className="text-4xl md:text-5xl font-extrabold mt-6 text-white tracking-tight">Premium <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-brand-cyanAccent">Digital Experiences</span></h2>
            <p className="text-slate-400 mt-4 text-lg">
              For brands that want more than a conventional website.
            </p>
          </motion.div>

          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={containerVariants}
            className="grid md:grid-cols-3 gap-8 items-stretch relative z-10"
          >
            {premiumPlans.map((plan, idx) => (
              <motion.div 
                key={idx} 
                variants={itemVariants}
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
                className="glassmorphism p-8 rounded-3xl flex flex-col justify-between transition-all duration-300 relative group backdrop-blur-xl border border-brand-cyanAccent/30 hover:border-emerald-400/60 hover:shadow-[0_0_30px_rgba(6,182,212,0.15)] bg-gradient-to-b from-[#06b6d4]/10 to-[#02050c]/90"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-400/5 to-brand-cyanAccent/5 rounded-3xl pointer-events-none"></div>
                <div className="relative z-10">
                  <h3 className="text-xl font-bold text-white flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-emerald-400" />
                    {plan.name}
                  </h3>
                  <div className="mt-4 flex flex-col">
                    <span className="text-xs text-brand-cyanAccent uppercase tracking-widest font-semibold mb-1">From</span>
                    <div className="flex items-baseline gap-2">
                      <span className="text-4xl font-extrabold text-white">{formatPrice(plan.price)}{plan.isPlus ? '+' : ''}</span>
                    </div>
                  </div>
                  <p className="text-sm mt-4 text-slate-300 leading-relaxed">
                    {plan.desc}
                  </p>
                </div>
                
                <ul className="space-y-4 border-t border-brand-cyanAccent/20 pt-6 mt-8 relative z-10">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm text-slate-200">
                      <Check className="w-4 h-4 mt-0.5 text-emerald-400 shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <div className="mt-10 pt-6 border-t border-brand-cyanAccent/20 relative z-10">
                  <a 
                    href="#contact" 
                    className="block w-full text-center py-4 font-bold rounded-xl transition-all text-sm bg-gradient-to-r from-emerald-500 to-brand-cyanAccent hover:opacity-90 hover:scale-[1.02] text-black shadow-[0_0_20px_rgba(6,182,212,0.3)]"
                    onClick={() => playSynthBeep(880, 0.1)}
                  >
                    Request a Project Discussion
                  </a>
                </div>
              </motion.div>
            ))}
          </motion.div>
          <div className="text-center text-xs text-slate-500 mt-8">
            Premium projects are individually scoped and quoted according to design complexity, functionality, integrations, content requirements and development scope.
          </div>
        </div>

        {/* AI Agents & Automation */}
        <div className="pt-20 border-t border-white/5">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={itemVariants}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <span className="text-[#a855f7] uppercase tracking-widest text-xs font-bold bg-[#a855f7]/10 px-4 py-1.5 rounded-full border border-[#a855f7]/20 backdrop-blur-md">Business Technology</span>
            <h2 className="text-4xl md:text-5xl font-extrabold mt-6 text-white tracking-tight">AI Agents & <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#a855f7] to-[#ec4899]">Business Automation</span></h2>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={itemVariants}
              className="glassmorphism p-8 md:p-10 rounded-3xl border border-white/10 bg-slate-900/40"
            >
              <div className="inline-flex items-center gap-2 bg-slate-800/80 px-4 py-2 rounded-lg border border-slate-700 mb-6">
                <Cpu className="w-5 h-5 text-[#a855f7]" />
                <span className="font-bold text-white tracking-wide">CUSTOM QUOTE</span>
              </div>
              <p className="text-slate-300 text-lg leading-relaxed">
                Every business operates differently. AI agents and automation solutions are therefore individually scoped around your workflows, systems, integrations and operational requirements. 
              </p>
              <p className="text-slate-400 mt-4 leading-relaxed">
                Following an initial discussion, Nexaflow AI develops a tailored solution and proposal based on the required level of complexity and customization.
              </p>
              
              <a 
                href="#contact" 
                className="mt-8 inline-flex items-center gap-3 px-8 py-4 rounded-xl font-bold transition-all text-sm bg-gradient-to-r from-[#a855f7] to-[#ec4899] text-white hover:opacity-90 hover:shadow-[0_0_25px_rgba(168,85,247,0.4)]"
                onClick={() => playSynthBeep(880, 0.1)}
              >
                <span>Start a Conversation</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            </motion.div>

            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={containerVariants}
              className="grid sm:grid-cols-2 gap-3"
            >
              {aiServices.map((service, idx) => (
                <motion.div 
                  key={idx}
                  variants={itemVariants}
                  className="flex items-center gap-3 p-3 rounded-lg bg-white/5 border border-white/5 hover:border-[#a855f7]/30 transition-colors"
                >
                  <Zap className="w-4 h-4 text-[#a855f7] shrink-0" />
                  <span className="text-sm text-slate-300">{service}</span>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>

        {/* Ongoing Services */}
        <div className="pt-20 border-t border-white/5">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={itemVariants}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">Ongoing Support & Services</h2>
            <p className="text-slate-400 mt-4 text-lg max-w-2xl mx-auto">
              Ongoing services are available depending on the selected package, technology stack, maintenance requirements and level of support required. Support arrangements can be discussed and tailored to the requirements of each project.
            </p>
          </motion.div>

          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
            className="flex flex-wrap justify-center gap-4 max-w-4xl mx-auto"
          >
            {ongoingServices.map((service, idx) => (
              <motion.div 
                key={idx}
                variants={itemVariants}
                className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-slate-900 border border-slate-800 text-sm font-medium text-slate-300 hover:text-white transition-colors cursor-default"
              >
                <ShieldCheck className="w-4 h-4 text-brand-electricBlue" />
                {service}
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* How It Works / Process */}
        <div id="process" className="pt-20 border-t border-white/5">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={itemVariants}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <span className="text-brand-electricBlue uppercase tracking-widest text-xs font-bold bg-brand-electricBlue/10 px-4 py-1.5 rounded-full border border-brand-electricBlue/20 backdrop-blur-md">Professional Process</span>
            <h2 className="text-4xl font-extrabold mt-6 text-white tracking-tight">Payment & <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-electricBlue to-brand-cyanAccent">Project Commencement</span></h2>
          </motion.div>

          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 relative"
          >
            {processSteps.map((step, idx) => (
              <motion.div 
                key={idx}
                variants={itemVariants}
                className="glassmorphism p-8 rounded-3xl border border-white/10 hover:border-brand-electricBlue/30 transition-all group"
              >
                <span className="text-4xl font-black text-slate-800 group-hover:text-brand-electricBlue/20 transition-colors">{step.num}</span>
                <h4 className="text-xl font-bold text-white mt-4 mb-3 flex items-center gap-3">
                  <span className="w-2 h-2 rounded-full bg-brand-cyanAccent block"></span>
                  {step.title}
                </h4>
                <p className="text-sm text-slate-400 leading-relaxed">{step.desc}</p>
              </motion.div>
            ))}
          </motion.div>

          <div className="mt-12 text-center flex flex-col items-center justify-center space-y-4">
            <div className="flex items-center gap-3 text-sm text-slate-300 bg-slate-900/50 px-6 py-3 rounded-xl border border-slate-800">
              <CheckCircle className="w-5 h-5 text-brand-cyanAccent" />
              <span>A formal quotation or invoice is provided before payment, outlining the agreed scope, deliverables and payment terms.</span>
            </div>
            <p className="text-xs text-slate-500 max-w-xl mx-auto">
              Larger projects may be structured around agreed development milestones.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}
