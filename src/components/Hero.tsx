import { useEffect, useRef } from 'react';
import { ArrowRight, CheckCircle2, ShieldCheck, TrendingUp, Cpu, Sparkles, Bot } from 'lucide-react';
import { playSynthBeep } from '../lib/audio';
import { motion } from 'motion/react';

export default function Hero() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.1,
        delayChildren: 0.5
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
    <section className="relative min-h-screen flex items-center justify-center pt-32 pb-20 overflow-hidden px-4 sm:px-8">
      {/* Background Gradients - Reduced since we have 3D */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-brand-electricBlue/10 blur-[120px] pointer-events-none mix-blend-screen"></div>
      
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
              Build Smarter. <br />Automate Faster. <br />
              <span className="inline-block bg-clip-text text-transparent bg-gradient-to-r from-brand-electricBlue via-[#60a5fa] to-brand-cyanAccent relative">
                Grow Further.
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
            Nexaflow AI builds high-performance websites, AI solutions and business automations that help modern businesses operate and grow digitally.
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

        {/* Right Visual Interactive Block */}
        <motion.div 
          variants={itemVariants} 
          className="lg:col-span-5 relative w-full flex justify-center perspective-[1000px] z-20"
        >
          <motion.div 
            className="w-full max-w-md relative group cursor-pointer"
            whileHover={{ rotateY: 5, rotateX: -5, scale: 1.02, transition: { type: "spring", stiffness: 300 } }}
            animate={{ y: [-15, 15, -15] }}
            transition={{ y: { duration: 6, repeat: Infinity, ease: "easeInOut" } }}
          >
            <div className="absolute -inset-1 rounded-[2rem] bg-gradient-to-r from-brand-electricBlue to-brand-cyanAccent opacity-30 blur-2xl group-hover:opacity-50 transition-opacity duration-700"></div>
            
            <div className="relative glassmorphism rounded-3xl border border-white/10 overflow-hidden shadow-[0_30px_50px_rgba(0,0,0,0.5)] backdrop-blur-xl bg-transparent/60">
              {/* Header */}
              <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800/80 bg-slate-900/50 backdrop-blur-md">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-slate-600"></span>
                  <span className="w-3 h-3 rounded-full bg-slate-600"></span>
                  <span className="w-3 h-3 rounded-full bg-slate-600"></span>
                </div>
                <div className="flex items-center gap-2 text-xs font-mono text-slate-400 bg-slate-800/50 px-2 py-1 rounded">
                  <Bot className="w-3.5 h-3.5 text-brand-cyanAccent" />
                  <span>nexaflow_agent</span>
                </div>
              </div>
              
              {/* Content */}
              <div className="p-6 space-y-5">
                {/* Visual block 1 */}
                <div className="flex items-center justify-between bg-slate-900/60 p-4 rounded-2xl border border-slate-800/50 hover:border-brand-cyanAccent/50 transition-colors">
                  <div>
                    <span className="block text-[10px] text-slate-400 uppercase tracking-widest font-semibold mb-1">Incoming Lead</span>
                    <span className="text-sm font-medium text-white flex items-center gap-2">
                      New Project Request <span className="relative flex h-2 w-2"><span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span><span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span></span>
                    </span>
                  </div>
                  <TrendingUp className="w-5 h-5 text-green-400" />
                </div>
                
                {/* Visual block 2 - Terminal */}
                <div className="bg-[#010206]/80 rounded-2xl p-4 border border-slate-800/50 font-mono text-xs space-y-2 text-slate-300">
                  <p className="text-slate-500">~ ❯ system init --auto</p>
                  <p className="text-brand-electricBlue">Evaluating request parameters...</p>
                  <p className="text-brand-cyanAccent">✓ Routing to appropriate team</p>
                  <p className="text-green-400">✓ Generating optimal strategy</p>
                  <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden mt-3">
                    <motion.div 
                      className="h-full bg-gradient-to-r from-brand-electricBlue to-brand-cyanAccent"
                      initial={{ width: "0%" }}
                      animate={{ width: "100%" }}
                      transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
                    />
                  </div>
                </div>

                {/* Floating Icon */}
                <motion.div 
                  className="absolute -bottom-6 -right-6 w-24 h-24 glassmorphism rounded-3xl flex items-center justify-center border border-brand-cyanAccent/40 shadow-[0_0_30px_rgba(6,182,212,0.2)] bg-slate-900/90 text-brand-cyanAccent backdrop-blur-xl"
                  animate={{ rotate: [0, 5, 0, -5, 0], scale: [1, 1.05, 1] }}
                  transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
                >
                  <Cpu className="w-10 h-10" />
                </motion.div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}
