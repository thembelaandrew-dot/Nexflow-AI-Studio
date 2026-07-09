import { useEffect, useState } from 'react';
import { ArrowRight, Menu, X, Star, Cpu, Briefcase, Users, CreditCard, HelpCircle, Calendar } from 'lucide-react';
import { playSynthBeep } from '../lib/audio';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const closeDrawer = () => setDrawerOpen(false);

  return (
    <>
      <header
        id="main-nav"
        className={`fixed top-0 w-full z-40 transition-all duration-300 px-4 sm:px-8 ${
          isScrolled ? 'glassmorphism py-3 border-b border-white/5' : 'py-4 border-b border-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <a href="#" className="flex items-center gap-3 group" onClick={() => playSynthBeep(600, 0.1)}>
            <img
              src="https://i.imgur.com/DftcbVu.jpeg"
              alt="NexaFlow AI Logo"
              className="h-10 sm:h-12 w-auto object-contain rounded-lg shadow-md transition-transform duration-300 group-hover:scale-102"
              onError={(e) => {
                e.currentTarget.outerHTML = `<div class='glassmorphism px-3 py-1.5 rounded-lg flex items-center gap-2 border border-brand-cyanAccent/50'><div class='w-3 h-3 rounded-full bg-brand-electricBlue animate-pulse'></div><span class='font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-brand-electricBlue'>NexaFlow AI</span></div>`;
              }}
            />
          </a>

          <nav className="hidden lg:flex items-center gap-8 glassmorphism px-6 py-2.5 rounded-full border border-slate-800">
            <a href="#why-choose-us" className="text-sm font-medium text-slate-300 hover:text-white transition-colors" onClick={() => playSynthBeep(440, 0.05)}>Why Choose Us</a>
            <a href="#services" className="text-sm font-medium text-slate-300 hover:text-white transition-colors" onClick={() => playSynthBeep(480, 0.05)}>Services</a>
            <a href="#featured-work" className="text-sm font-medium text-slate-300 hover:text-white transition-colors" onClick={() => playSynthBeep(520, 0.05)}>Featured Work</a>
            <a href="#team" className="text-sm font-medium text-slate-300 hover:text-white transition-colors" onClick={() => playSynthBeep(560, 0.05)}>Who You'll Work With</a>
            <a href="#pricing" className="text-sm font-medium text-slate-300 hover:text-white transition-colors" onClick={() => playSynthBeep(580, 0.05)}>Pricing</a>
            <a href="#faq" className="text-sm font-medium text-slate-300 hover:text-white transition-colors" onClick={() => playSynthBeep(600, 0.05)}>FAQs</a>
          </nav>

          <div className="flex items-center gap-4">
            <a href="#contact" className="hidden sm:inline-flex items-center gap-2 text-xs uppercase tracking-wider font-bold bg-gradient-to-r from-brand-electricBlue to-brand-cyanAccent hover:from-brand-cyanAccent hover:to-brand-electricBlue text-white px-5 py-3 rounded-full shadow-lg hover:shadow-[0_0_20px_rgba(59,130,246,0.3)] transition-all duration-300" onClick={() => playSynthBeep(880, 0.12)}>
              <span>Consultation</span>
              <ArrowRight className="w-4 h-4" />
            </a>
            <button className="lg:hidden glassmorphism p-2 rounded-lg hover:bg-white/10 text-slate-200" onClick={() => { playSynthBeep(500, 0.08); setDrawerOpen(true); }}>
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      <div className={`fixed inset-y-0 right-0 w-80 bg-brand-deep/98 backdrop-blur-2xl border-l border-white/10 z-50 transform transition-transform duration-300 ease-in-out p-6 flex flex-col justify-between shadow-2xl ${drawerOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div>
          <div className="flex items-center justify-between mb-8">
            <span className="font-extrabold tracking-tight text-white">Menu</span>
            <button className="p-2 rounded-lg bg-white/5 hover:bg-white/10" onClick={() => { playSynthBeep(300, 0.08); closeDrawer(); }}>
              <X className="w-6 h-6" />
            </button>
          </div>
          <div className="flex flex-col gap-5 text-base font-semibold">
            <a href="#why-choose-us" className="text-slate-300 hover:text-brand-cyanAccent flex items-center gap-3 py-2 border-b border-white/5" onClick={() => { playSynthBeep(440, 0.05); closeDrawer(); }}>
              <Star className="w-5 h-5 text-brand-electricBlue" /> Why Choose Us
            </a>
            <a href="#services" className="text-slate-300 hover:text-brand-cyanAccent flex items-center gap-3 py-2 border-b border-white/5" onClick={() => { playSynthBeep(480, 0.05); closeDrawer(); }}>
              <Cpu className="w-5 h-5 text-brand-electricBlue" /> Services
            </a>
            <a href="#featured-work" className="text-slate-300 hover:text-brand-cyanAccent flex items-center gap-3 py-2 border-b border-white/5" onClick={() => { playSynthBeep(520, 0.05); closeDrawer(); }}>
              <Briefcase className="w-5 h-5 text-brand-electricBlue" /> Featured Work
            </a>
            <a href="#team" className="text-slate-300 hover:text-brand-cyanAccent flex items-center gap-3 py-2 border-b border-white/5" onClick={() => { playSynthBeep(560, 0.05); closeDrawer(); }}>
              <Users className="w-5 h-5 text-brand-electricBlue" /> Who You'll Work With
            </a>
            <a href="#pricing" className="text-slate-300 hover:text-brand-cyanAccent flex items-center gap-3 py-2 border-b border-white/5" onClick={() => { playSynthBeep(580, 0.05); closeDrawer(); }}>
              <CreditCard className="w-5 h-5 text-brand-electricBlue" /> Pricing
            </a>
            <a href="#faq" className="text-slate-300 hover:text-brand-cyanAccent flex items-center gap-3 py-2 border-b border-white/5" onClick={() => { playSynthBeep(600, 0.05); closeDrawer(); }}>
              <HelpCircle className="w-5 h-5 text-brand-electricBlue" /> FAQs
            </a>
          </div>
        </div>
        <div className="mt-auto space-y-4">
          <a href="#contact" className="w-full py-3.5 bg-gradient-to-r from-brand-electricBlue to-brand-cyanAccent text-center rounded-xl font-bold flex items-center justify-center gap-2 text-white shadow-lg" onClick={() => { playSynthBeep(880, 0.12); closeDrawer(); }}>
            <Calendar className="w-5 h-5" />
            <span>Book Consultation</span>
          </a>
          <div className="text-center text-xs text-slate-500">
            NexaFlow AI &bull; +268 79375018
          </div>
        </div>
      </div>
    </>
  );
}
