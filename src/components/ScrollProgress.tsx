import { motion, useScroll, useSpring } from 'motion/react';
import { useEffect, useState } from 'react';

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 350,
    damping: 35,
    restDelta: 0.001
  });

  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div 
      className={`fixed top-0 left-0 right-0 z-[100] h-[3px] pointer-events-none transition-opacity duration-300 ${
        isVisible ? 'opacity-100' : 'opacity-0'
      }`}
      aria-hidden="true"
    >
      {/* Background track */}
      <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" />

      {/* Dynamic Progress Line */}
      <motion.div
        className="h-full bg-gradient-to-r from-brand-electricBlue via-brand-cyanAccent to-emerald-400 origin-left relative"
        style={{ scaleX }}
      >
        {/* Glow tracer at the leading edge */}
        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-4 h-4 bg-brand-cyanAccent rounded-full blur-[4px] opacity-80" />
        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1.5 h-1.5 bg-white rounded-full shadow-[0_0_10px_#06b6d4]" />
      </motion.div>
    </div>
  );
}
