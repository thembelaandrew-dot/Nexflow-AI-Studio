import { Globe, Users, Zap, Bot, Megaphone, ChevronRight, Settings } from 'lucide-react';
import { playSynthBeep } from '../lib/audio';
import { motion, useMotionValue, useSpring, useTransform } from 'motion/react';
import React, { useRef } from 'react';
import CinematicBackgroundVideo from './CinematicBackgroundVideo';

const TiltCard = ({ service, idx }: { service: any, idx: number }) => {
  const ref = useRef<HTMLDivElement>(null);
  
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 30 });
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 30 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["15deg", "-15deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-15deg", "15deg"]);

  const rectRef = useRef<DOMRect | null>(null);

  const handleMouseEnter = () => {
    if (ref.current) {
      rectRef.current = ref.current.getBoundingClientRect();
    }
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!rectRef.current) return;
    
    const width = rectRef.current.width;
    const height = rectRef.current.height;
    
    const mouseX = e.clientX - rectRef.current.left;
    const mouseY = e.clientY - rectRef.current.top;
    
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
    rectRef.current = null;
  };

  return (
    <motion.div 
      ref={ref}
      onMouseEnter={handleMouseEnter}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
        willChange: "transform"
      }}
      className="perspective-1000 w-full h-full"
    >
      <motion.div 
        className="glassmorphism p-8 rounded-2xl h-full flex flex-col justify-between group border border-white/5 hover:border-brand-electricBlue/40 relative overflow-hidden backdrop-blur-md bg-slate-900/40 shadow-lg"
        style={{ transform: "translateZ(20px)", willChange: "transform" }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-brand-electricBlue/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
        
        <div className="relative z-10">
          <div className={`w-12 h-12 rounded-xl bg-slate-800/80 flex items-center justify-center text-${service.color} border border-slate-700/50 mb-6 group-hover:scale-110 group-hover:border-brand-cyanAccent/40 transition-transform duration-300 shadow-sm`}>
            <service.icon className="w-6 h-6 text-white group-hover:text-brand-cyanAccent transition-colors" />
          </div>
          <h3 className="text-xl font-bold text-white mb-3 tracking-tight">{service.title}</h3>
          <p className="text-slate-400 leading-relaxed text-sm">
            {service.desc}
          </p>
        </div>

        <div className="mt-8 pt-4 border-t border-slate-800/50 flex items-center justify-between relative z-10">
          <span className={`text-[10px] text-${service.color} uppercase tracking-widest font-bold`}>{service.label}</span>
          <a href="#contact" className="text-slate-500 hover:text-brand-cyanAccent transition-colors flex items-center gap-1 text-sm font-semibold group/link" onClick={() => playSynthBeep(700, 0.05)}>
            <span>Learn more</span>
            <ChevronRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
          </a>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default function Services() {
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

  const services = [
    { icon: Globe, title: "Website Development", desc: "High-performance, custom websites designed to convert visitors into customers globally.", label: "Web Design", color: "brand-electricBlue" },
    { icon: Bot, title: "AI Automation", desc: "Automate repetitive business processes using AI chatbots and intelligent workflows.", label: "Automation", color: "brand-cyanAccent" },
    { icon: Settings, title: "Business Automation", desc: "Connect tools, workflows and communication systems to reduce manual work and drive digital transformation.", label: "Efficiency", color: "brand-electricBlue" },
    { icon: Users, title: "Lead Generation Automation", desc: "Build automated systems that help businesses consistently discover and capture potential customers.", label: "Growth", color: "brand-cyanAccent" },
    { icon: Zap, title: "Custom AI Solutions", desc: "Custom AI-powered tools and experiences designed around specific business needs for clients worldwide.", label: "AI Tech", color: "brand-electricBlue" },
    { icon: Megaphone, title: "Digital Marketing Strategy", desc: "Online growth solutions to help businesses increase visibility and authority across Eswatini and Africa.", label: "Strategy", color: "brand-cyanAccent" }
  ];

  return (
    <section id="services" className="py-32 relative overflow-hidden bg-[#02050c] border-t border-white/5">
      <CinematicBackgroundVideo
        mp4Src="https://res.cloudinary.com/utmx65fl/video/upload/v1789379494/nexaflow-hero-bg-loop-1.mp4"
        webmSrc="https://res.cloudinary.com/utmx65fl/video/upload/v1789379494/nexaflow-hero-bg-loop-1.webm"
        posterSrc="https://res.cloudinary.com/utmx65fl/video/upload/v1789379494/nexaflow-hero-bg-loop-1.jpg"
        variant="section"
        topFade={true}
        bottomFade={true}
        vignette={true}
        overlayOpacity={0.65}
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-8 relative z-10">
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={itemVariants}
          className="flex flex-col md:flex-row md:items-end justify-between mb-20"
        >
          <div>
            <span className="text-brand-cyanAccent uppercase tracking-widest text-xs font-bold bg-brand-cyanAccent/10 px-4 py-1.5 rounded-full border border-brand-cyanAccent/20 backdrop-blur-md">Core Expertise</span>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold mt-6 text-white tracking-tight">Premium Digital Solutions</h2>
          </div>
          <p className="text-slate-400 max-w-md mt-6 md:mt-0 text-base leading-relaxed">
            We build high-performance websites and implement AI automations designed to scale modern businesses.
          </p>
        </motion.div>

        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={containerVariants}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
        >
          {services.map((service, idx) => (
            <motion.div key={idx} variants={itemVariants}>
              <TiltCard service={service} idx={idx} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
