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

        {/* Right Showcase: Real-Time AI Automation Architecture */}
        <motion.div 
          variants={itemVariants} 
          className="lg:col-span-5 relative hidden lg:block"
        >
          {/* Subtle Ambient Glow */}
          <div className="absolute -inset-4 bg-gradient-to-r from-brand-electricBlue/20 to-brand-cyanAccent/20 rounded-3xl blur-2xl opacity-60 pointer-events-none" />

          {/* High-Fidelity Glassmorphic Terminal Card */}
          <div className="relative rounded-2xl border border-white/10 bg-slate-900/60 backdrop-blur-xl p-6 shadow-2xl overflow-hidden">
            {/* Window Header */}
            <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-5">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-rose-500/80" />
                <span className="w-3 h-3 rounded-full bg-amber-500/80" />
                <span className="w-3 h-3 rounded-full bg-emerald-500/80" />
                <span className="text-xs font-mono text-slate-400 ml-2">nexaflow-core // active</span>
              </div>
              <span className="inline-flex items-center gap-1.5 text-[10px] font-mono uppercase tracking-wider text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                Live Systems
              </span>
            </div>

            {/* Live Pipeline Visualizer */}
            <div className="space-y-3 font-mono text-xs">
              <div className="p-3 rounded-xl bg-slate-800/50 border border-white/5 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-brand-electricBlue/10 flex items-center justify-center text-brand-electricBlue">
                    <Bot className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-white font-sans font-semibold text-xs">AI Lead Qualification</p>
                    <p className="text-slate-400 text-[11px]">Chatbot & Multi-Channel</p>
                  </div>
                </div>
                <span className="text-brand-cyanAccent text-[11px] font-semibold">&lt; 1.2s avg</span>
              </div>

              <div className="p-3 rounded-xl bg-slate-800/50 border border-white/5 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-brand-cyanAccent/10 flex items-center justify-center text-brand-cyanAccent">
                    <Cpu className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-white font-sans font-semibold text-xs">CRM & Workflow Engine</p>
                    <p className="text-slate-400 text-[11px]">Make • Webhooks • Cloud Sync</p>
                  </div>
                </div>
                <span className="text-emerald-400 text-[11px] font-semibold">99.98% uptime</span>
              </div>

              <div className="p-3 rounded-xl bg-slate-800/50 border border-white/5 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center text-emerald-400">
                    <TrendingUp className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-white font-sans font-semibold text-xs">Client Conversion Lift</p>
                    <p className="text-slate-400 text-[11px]">Direct revenue impact</p>
                  </div>
                </div>
                <span className="text-emerald-400 font-bold text-[11px]">+42% lift</span>
              </div>
            </div>

            {/* Bottom Status Ticker */}
            <div className="mt-5 pt-4 border-t border-white/5 flex items-center justify-between text-[11px] text-slate-400">
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-brand-cyanAccent animate-ping" />
                Processing global requests
              </span>
              <span className="text-slate-500 font-mono">SZ • AF • GLOBAL</span>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
