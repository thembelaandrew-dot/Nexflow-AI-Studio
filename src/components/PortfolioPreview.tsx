import { ArrowRight, ExternalLink } from 'lucide-react';
import { playSynthBeep } from '../lib/audio';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';

export default function PortfolioPreview() {
  return (
    <section id="portfolio-preview" className="py-24 relative overflow-hidden bg-transparent">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-brand-electricBlue/10 via-transparent to-transparent pointer-events-none"></div>
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6"
        >
          <div className="max-w-2xl">
            <span className="text-brand-electricBlue uppercase tracking-widest text-xs font-bold bg-brand-electricBlue/10 px-4 py-1.5 rounded-full border border-brand-electricBlue/20">Featured Case Study</span>
            <h2 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight mt-6 mb-4">
              Work We're Proud Of
            </h2>
            <p className="text-slate-400 font-medium">
              Take a look at how we've helped businesses transform their digital presence and streamline their operations.
            </p>
          </div>
          <Link 
            to="/portfolio" 
            className="inline-flex items-center gap-2 text-brand-cyanAccent font-bold hover:text-white transition-colors group"
            onClick={() => playSynthBeep(600, 0.1)}
          >
            View Full Portfolio <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>

        {/* Featured Project: NOMA'S Kitchen */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="glassmorphism p-6 md:p-10 rounded-[2rem] border border-white/5 hover:border-brand-electricBlue/40 hover:shadow-[0_0_40px_rgba(59,130,246,0.15)] transition-all duration-500 group relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-brand-electricBlue/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          
          <div className="grid md:grid-cols-2 gap-10 md:gap-16 items-center relative z-10">
            
            {/* Thumbnail Placeholder */}
            <div className="relative aspect-video rounded-2xl overflow-hidden bg-transparent border border-slate-800 group-hover:border-brand-electricBlue/30 transition-colors duration-500">
              <div className="absolute inset-0 flex flex-col items-center justify-center text-slate-500 z-10">
                <span className="font-extrabold text-3xl tracking-widest text-white drop-shadow-md">NOMA'S KITCHEN</span>
                <span className="text-xs uppercase tracking-widest mt-2 text-brand-cyanAccent">Food Delivery & Catering</span>
              </div>
              
              <div className="absolute inset-0 bg-brand-electricBlue/0 group-hover:bg-brand-electricBlue/20 transition-colors duration-500 z-0"></div>
              
              {/* Animated subtle grid overlay */}
              <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMSIgY3k9IjEiIHI9IjEiIGZpbGw9InJnYmEoMjU1LDI1NSwyNTUsMC4wNSkiLz48L3N2Zz4=')] [mask-image:linear-gradient(to_bottom,white,transparent)] group-hover:opacity-100 opacity-50 transition-opacity duration-500"></div>
              
              <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-brand-cyanAccent/20 blur-3xl group-hover:bg-brand-cyanAccent/30 transition-colors duration-500"></div>
            </div>
            
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-brand-cyanAccent/10 text-brand-cyanAccent border border-brand-cyanAccent/20 text-[10px] font-bold uppercase tracking-widest mb-6">
                Featured Project
              </div>
              <h3 className="text-4xl font-extrabold text-white mb-4 tracking-tight group-hover:text-brand-electricBlue transition-colors duration-300">NOMA'S Kitchen</h3>
              <p className="text-slate-400 mb-8 leading-relaxed text-lg">
                A modern, high-performance website for a local culinary brand. We implemented a seamless ordering flow, dynamic menu management, and a stunning visual identity that matches the quality of their food.
              </p>
              
              <div className="flex flex-wrap gap-2 mb-10">
                {['React', 'Tailwind CSS', 'Vite', 'Mobile-First'].map((tech, i) => (
                  <span key={i} className="px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 text-xs font-semibold">
                    {tech}
                  </span>
                ))}
              </div>
              <div className="flex gap-4">
                <a 
                  href="https://nexacasestudy.netlify.app/" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-8 py-4 bg-brand-electricBlue text-white font-bold rounded-xl transition-all shadow-lg shadow-brand-electricBlue/20 hover:shadow-brand-electricBlue/40 hover:-translate-y-0.5 flex items-center gap-2 group/btn"
                  onClick={() => playSynthBeep(750, 0.1)}
                >
                  <span>Read Case Study</span>
                  <ExternalLink className="w-4 h-4 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                </a>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
