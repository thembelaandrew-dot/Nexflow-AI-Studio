import { ArrowRight, ExternalLink } from 'lucide-react';
import { playSynthBeep } from '../lib/audio';
import { Link } from 'react-router-dom';

export default function PortfolioPreview() {
  return (
    <section id="portfolio-preview" className="py-24 relative overflow-hidden bg-[#02050c]">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-brand-electricBlue/10 via-transparent to-transparent pointer-events-none"></div>
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="max-w-2xl">
            <h2 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight mb-4">
              Featured Work
            </h2>
            <p className="text-slate-400 font-medium">
              Take a look at how we've helped businesses transform their digital presence and streamline their operations.
            </p>
          </div>
          <Link 
            to="/portfolio" 
            className="inline-flex items-center gap-2 text-brand-cyanAccent font-bold hover:text-white transition-colors"
            onClick={() => playSynthBeep(600, 0.1)}
          >
            View Full Portfolio <ArrowRight className="w-5 h-5" />
          </Link>
        </div>

        {/* Featured Project: NOMA'S Kitchen */}
        <div className="glassmorphism p-6 md:p-10 rounded-3xl border border-white/5 hover:border-brand-electricBlue/30 transition-all duration-300 group">
          <div className="grid md:grid-cols-2 gap-10 items-center">
            
            {/* Thumbnail Placeholder */}
            <div className="relative aspect-video rounded-2xl overflow-hidden bg-slate-900 border border-slate-800">
              <div className="absolute inset-0 flex flex-col items-center justify-center text-slate-500">
                <span className="font-extrabold text-2xl tracking-widest text-slate-400">NOMA'S KITCHEN</span>
                <span className="text-xs uppercase tracking-widest mt-2">Food Delivery & Catering</span>
              </div>
              {/* Optional: if there's a real image, it would go here */}
              <div className="absolute inset-0 bg-brand-electricBlue/0 group-hover:bg-brand-electricBlue/10 transition-colors duration-500"></div>
            </div>

            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-cyanAccent/10 text-brand-cyanAccent border border-brand-cyanAccent/20 text-[10px] font-bold uppercase tracking-widest mb-4">
                Featured Project
              </div>
              <h3 className="text-3xl font-bold text-white mb-4">NOMA'S Kitchen</h3>
              <p className="text-slate-400 mb-6 leading-relaxed">
                A modern, high-performance website for a local culinary brand. We implemented a seamless ordering flow, dynamic menu management, and a stunning visual identity that matches the quality of their food.
              </p>
              
              <div className="flex flex-wrap gap-2 mb-8">
                {['React', 'Tailwind CSS', 'Vite', 'Mobile-First'].map((tech, i) => (
                  <span key={i} className="px-3 py-1 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 text-xs font-semibold">
                    {tech}
                  </span>
                ))}
              </div>

              <div className="flex gap-4">
                <a 
                  href="https://nexacasestudy.netlify.app/" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3 bg-brand-electricBlue hover:bg-brand-cyanAccent text-white hover:text-black font-bold rounded-xl transition-all shadow-lg shadow-brand-electricBlue/20 text-sm"
                  onClick={() => playSynthBeep(750, 0.1)}
                >
                  Read Case Study
                </a>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
