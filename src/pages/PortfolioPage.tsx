import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { playSynthBeep } from '../lib/audio';
import ScrollToTop from '../components/ScrollToTop';
import Chatbot from '../components/Chatbot';

export default function PortfolioPage() {
  const projects = [
    {
      id: 'nomas-kitchen',
      title: "NOMA'S Kitchen",
      category: 'Restaurant Website',
      desc: 'A modern, high-performance website with a seamless ordering flow and dynamic menu management.',
      tags: ['React', 'Tailwind', 'Mobile-First']
    },
    {
      id: 'church-website',
      title: 'Church Website',
      category: 'Business / Church Website',
      desc: 'A welcoming digital presence for a local church, featuring event management, online giving, and sermon archives.',
      tags: ['Web Design', 'CMS', 'Donations']
    },
    {
      id: 'ai-lead-generation',
      title: 'AI Lead Generation Automation',
      category: 'Automation Showcase',
      desc: 'An automated workflow that collects leads, organizes them in CRM, and prepares personalized outreach using AI.',
      tags: ['AI', 'Automation', 'CRM']
    }
  ];

  return (
    <>
      <Header />
      <main className="pt-24 min-h-screen bg-[#010309]">
        <div className="max-w-7xl mx-auto px-6 py-20 relative z-10">
          <div className="text-center mb-20 space-y-4">
            <h1 className="text-4xl md:text-6xl font-extrabold text-white tracking-tight">
              Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-electricBlue to-brand-cyanAccent">Portfolio</span>
            </h1>
            <p className="text-slate-400 max-w-2xl mx-auto font-medium text-lg">
              Explore our latest projects and see how we help businesses scale with modern web solutions and AI automation.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project) => (
              <div key={project.id} className="glassmorphism rounded-3xl border border-white/5 overflow-hidden hover:border-brand-electricBlue/30 transition-all duration-300 flex flex-col group">
                <div className="aspect-video bg-slate-900 border-b border-white/5 relative overflow-hidden">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="font-bold text-slate-600 tracking-widest uppercase">{project.title}</span>
                  </div>
                  <div className="absolute inset-0 bg-brand-electricBlue/0 group-hover:bg-brand-electricBlue/10 transition-colors duration-300"></div>
                </div>
                
                <div className="p-8 flex flex-col flex-grow">
                  <div className="mb-2">
                    <span className="text-[10px] text-brand-cyanAccent uppercase tracking-widest font-bold">{project.category}</span>
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-3">{project.title}</h3>
                  <p className="text-slate-400 text-sm mb-6 flex-grow">{project.desc}</p>
                  
                  <div className="flex flex-wrap gap-2 mb-8">
                    {project.tags.map((tag, i) => (
                      <span key={i} className="px-2.5 py-1 rounded-md bg-slate-800 text-slate-300 text-[10px] font-semibold uppercase tracking-wider">
                        {tag}
                      </span>
                    ))}
                  </div>

                  <a 
                    href="https://nexacasestudy.netlify.app/" 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-white font-bold hover:text-brand-cyanAccent transition-colors text-sm"
                    onClick={() => playSynthBeep(650, 0.1)}
                  >
                    View Case Study <ArrowRight className="w-4 h-4" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
      <Chatbot />
      <ScrollToTop />
    </>
  );
}
