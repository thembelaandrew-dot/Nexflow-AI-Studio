import { useEffect, useRef } from 'react';
import { ArrowRight, CheckCircle2, ShieldCheck, TrendingUp, Cpu, Sparkles, Bot } from 'lucide-react';
import { playSynthBeep } from '../lib/audio';
import { motion } from 'motion/react';
import CinematicHeroVideo from './CinematicHeroVideo';

export default function Hero() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.1,
        delayChildren: 1.5
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30, filter: 'blur(10px)' },
    visible: { 
      opacity: 1, 
      y: 0,
      filter: 'blur(0px)',
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as any }
    }
  };

  const textVariants = {
    hidden: { opacity: 0, y: 50, rotateX: 45, filter: 'blur(15px)' },
    visible: {
      opacity: 1,
      y: 0,
      rotateX: 0,
      filter: 'blur(0px)',
      transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] as any }
    }
  };

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center pt-32 pb-20 overflow-hidden px-4 sm:px-8">
      <CinematicHeroVideo />
      
      {/* Background Gradients - Reduced since we have 3D */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-brand-electricBlue/10 blur-[120px] pointer-events-none mix-blend-screen z-0"></div>
      
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-7xl mx-auto grid lg:grid-cols-12 gap-12 lg:gap-16 items-center relative z-10 w-full"
      >
        {/* Left Headline Block */}
        <div className="lg:col-span-7 flex flex-col text-center lg:text-left items-center lg:items-start space-y-8 relative z-20">
          <motion.div variants={itemVariants} className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-electricBlue/10 border border-brand-electricBlue/30 text-xs sm:text-sm font-semibold text-brand-cyanAccent backdrop-blur-md">
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-cyanAccent opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-cyanAccent"></span>
            </span>
            <span>Premium AI & Digital Agency</span>
          </motion.div>
          
          <div className="perspective-1000">
            <motion.h1 variants={textVariants} className="text-5xl sm:text-6xl lg:text-[5rem] font-extrabold tracking-tight leading-[1.05] text-white">
              AI Automation. <br />Custom Websites. <br />
              <span className="inline-block bg-clip-text text-transparent bg-gradient-to-r from-brand-electricBlue via-[#60a5fa] to-brand-cyanAccent relative">
                Digital Transformation.
                <motion.span 
                  className="absolute bottom-0 left-0 h-1 bg-brand-cyanAccent rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: '100%' }}
                  transition={{ delay: 1.5, duration: 1, ease: "easeInOut" }}
                ></motion.span>
              </span>
            </motion.h1>
          </div>
          
          <motion.p variants={itemVariants} className="text-base sm:text-lg text-slate-300 max-w-xl leading-relaxed">
            Nexaflow AI is Africa's premier AI agency delivering workflow automation, custom websites, and AI chatbots that help modern businesses scale worldwide.
          </motion.p>
          
          <motion.div variants={itemVariants} className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
            <a href="#contact" className="w-full sm:w-auto px-8 py-4 rounded-xl bg-brand-electricBlue text-white font-bold hover:bg-[#2563eb] transition-all duration-300 text-center flex items-center justify-center gap-3 group shadow-[0_0_20px_rgba(59,130,246,0.2)] hover:shadow-[0_0_30px_rgba(59,130,246,0.4)] hover:-translate-y-0.5" onClick={() => playSynthBeep(880, 0.1)}>
              <span>Start Your Project</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </a>
            <a href="#services" className="w-full sm:w-auto px-8 py-4 rounded-xl glassmorphism text-slate-200 font-bold hover:bg-white/10 hover:text-white transition-all duration-300 text-center flex items-center justify-center gap-2 border border-slate-700 hover:-translate-y-0.5" onClick={() => playSynthBeep(600, 0.08)}>
              <span>Explore Our Solutions</span>
              <Sparkles className="w-5 h-5 text-brand-cyanAccent" />
            </a>
          </motion.div>
          
          <motion.div variants={itemVariants} className="flex flex-wrap items-center justify-center lg:justify-start gap-6 pt-6 text-slate-400">
            <div className="flex items-center gap-2 group cursor-pointer hover:text-brand-cyanAccent transition-colors">
              <CheckCircle2 className="w-5 h-5 text-brand-cyanAccent group-hover:scale-110 transition-transform" />
              <span className="text-sm font-medium">Intelligent Workflows</span>
            </div>
            <div className="flex items-center gap-2 group cursor-pointer hover:text-brand-cyanAccent transition-colors">
              <ShieldCheck className="w-5 h-5 text-brand-cyanAccent group-hover:scale-110 transition-transform" />
              <span className="text-sm font-medium">Premium Digital Systems</span>
            </div>
          </motion.div>
        </div>

        {/* Right empty space for 3D core negative space */}
        <div className="lg:col-span-5 hidden lg:block pointer-events-none"></div>
      </motion.div>
    </section>
  );
}
