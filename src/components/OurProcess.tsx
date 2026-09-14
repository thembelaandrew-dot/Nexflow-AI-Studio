import { User, Globe, Bot, UserCheck, Database, MessageSquare } from 'lucide-react';
import { motion, useScroll, useTransform } from 'motion/react';
import { useRef } from 'react';
import CinematicBackgroundVideo from './CinematicBackgroundVideo';

const WorkflowNode = ({ 
  icon: Icon, 
  title, 
  delay, 
  align = 'center', 
  active = false 
}: { 
  icon: any, 
  title: string, 
  delay: number,
  align?: 'left' | 'center' | 'right',
  active?: boolean
}) => {
  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay, ease: "easeOut" }}
      viewport={{ once: true, margin: "-100px" }}
      className={`flex flex-col items-center gap-4 ${align === 'left' ? 'md:items-start' : align === 'right' ? 'md:items-end' : ''}`}
    >
      <div className={`relative w-24 h-24 rounded-2xl glassmorphism flex items-center justify-center border transition-all duration-700
        ${active ? 'border-brand-cyanAccent shadow-[0_0_30px_rgba(6,182,212,0.4)] bg-brand-cyanAccent/10 text-brand-cyanAccent' : 'border-white/10 text-slate-400 bg-slate-900/40'}
      `}>
        {active && (
          <div className="absolute inset-0 rounded-2xl border border-brand-cyanAccent animate-ping opacity-20"></div>
        )}
        <Icon className="w-8 h-8" />
      </div>
      <div className="text-center">
        <span className="text-sm font-bold text-white tracking-widest uppercase">{title}</span>
      </div>
    </motion.div>
  );
};

export default function OurProcess() {
  const containerRef = useRef(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });

  const lineHeight = useTransform(scrollYProgress, [0, 0.8], ["0%", "100%"]);

  return (
    <section id="process" className="py-32 relative bg-nexa-deep overflow-hidden border-t border-slate-800" ref={containerRef}>
      <CinematicBackgroundVideo
        mp4Src="https://res.cloudinary.com/utmx65fl/video/upload/v1789379494/nexaflow-hero-bg-loop-1.mp4"
        webmSrc="https://res.cloudinary.com/utmx65fl/video/upload/v1789379494/nexaflow-hero-bg-loop-1.webm"
        posterSrc="https://res.cloudinary.com/utmx65fl/video/upload/v1789379494/nexaflow-hero-bg-loop-1.jpg"
        variant="section"
        topFade={true}
        bottomFade={true}
        vignette={true}
        overlayOpacity={0.7}
      />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-brand-electricBlue/5 via-transparent to-transparent pointer-events-none"></div>
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="text-center mb-24 space-y-6 max-w-3xl mx-auto"
        >
          <span className="text-brand-electricBlue uppercase tracking-widest text-xs font-bold bg-brand-electricBlue/10 px-4 py-1.5 rounded-full border border-brand-electricBlue/20 backdrop-blur-md">
            Intelligent Systems
          </span>
          <h2 className="text-4xl md:text-6xl font-extrabold text-white tracking-tight">
            The Living Digital <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-electricBlue to-brand-cyanAccent">Workflow</span>
          </h2>
          <p className="text-lg text-slate-400">
            We connect disparate tools into a unified, intelligent machine that operates autonomously.
          </p>
        </motion.div>
        
        {/* Network Visualization */}
        <div className="relative max-w-4xl mx-auto py-10">
          {/* Main animated connecting line */}
          <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-slate-800 -translate-x-1/2 rounded-full hidden md:block">
            <motion.div 
              style={{ height: lineHeight }}
              className="w-full bg-gradient-to-b from-brand-electricBlue via-brand-cyanAccent to-brand-electricBlue rounded-full shadow-[0_0_15px_rgba(6,182,212,0.8)] relative"
            >
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-4 bg-white rounded-full blur-[2px] shadow-[0_0_20px_rgba(255,255,255,1)]"></div>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-16 md:gap-8 relative">
            
            <div className="col-span-1 md:col-start-2 flex justify-center">
              <WorkflowNode icon={User} title="User Visit" delay={0.1} />
            </div>

            <div className="col-span-1 md:col-start-1 flex justify-center md:justify-end md:pr-12">
              <WorkflowNode icon={Globe} title="Website" delay={0.3} align="right" />
            </div>

            <div className="col-span-1 md:col-start-3 flex justify-center md:justify-start md:pl-12 mt-0 md:-mt-24">
              <WorkflowNode icon={Bot} title="AI Processing" delay={0.5} align="left" active />
            </div>

            <div className="col-span-1 md:col-start-2 flex justify-center mt-0 md:-mt-12">
              <WorkflowNode icon={UserCheck} title="Lead Qualification" delay={0.7} active />
            </div>

            <div className="col-span-1 md:col-start-1 flex justify-center md:justify-end md:pr-12 mt-0 md:-mt-24">
              <WorkflowNode icon={Database} title="CRM Sync" delay={0.9} align="right" />
            </div>

            <div className="col-span-1 md:col-start-3 flex justify-center md:justify-start md:pl-12">
              <WorkflowNode icon={MessageSquare} title="Automated Follow-up" delay={1.1} align="left" />
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
