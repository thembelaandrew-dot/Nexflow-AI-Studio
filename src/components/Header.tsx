import { useEffect, useState } from 'react';
import { ArrowRight, Menu, X, Star, Cpu, Briefcase, Users, CreditCard, HelpCircle, Calendar, Gift, Settings, Globe } from 'lucide-react';
import { playSynthBeep } from '../lib/audio';
import { Link, useLocation } from 'react-router-dom';
import { useCurrency, Currency } from '../lib/CurrencyContext';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const location = useLocation();
  const { currency, setCurrency } = useCurrency();

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
          <Link to="/" className="flex items-center gap-3 group" onClick={() => playSynthBeep(600, 0.1)}>
            <img
              src="https://i.imgur.com/DftcbVu.jpeg"
              alt="NexaFlow AI Logo"
              className="h-10 sm:h-12 w-auto object-contain rounded-lg shadow-md transition-transform duration-300 group-hover:scale-102"
              onError={(e) => {
                e.currentTarget.outerHTML = `<div class='glassmorphism px-3 py-1.5 rounded-lg flex items-center gap-2 border border-brand-cyanAccent/50'><div class='w-3 h-3 rounded-full bg-brand-electricBlue animate-pulse'></div><span class='font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-brand-electricBlue'>NexaFlow AI</span></div>`;
              }}
            />
          </Link>
          
          <nav className="hidden lg:flex items-center gap-6 glassmorphism px-6 py-2.5 rounded-full border border-slate-800 overflow-x-auto">
            <Link to="/#services" className="text-sm font-medium text-slate-300 hover:text-white transition-colors whitespace-nowrap" onClick={() => playSynthBeep(480, 0.05)}>Services</Link>
            <Link to="/#process" className="text-sm font-medium text-slate-300 hover:text-white transition-colors whitespace-nowrap" onClick={() => playSynthBeep(480, 0.05)}>Process</Link>
            <Link to="/portfolio" className="text-sm font-medium text-slate-300 hover:text-white transition-colors whitespace-nowrap" onClick={() => playSynthBeep(520, 0.05)}>Portfolio</Link>
            <Link to="/#pricing" className="text-sm font-medium text-slate-300 hover:text-white transition-colors whitespace-nowrap" onClick={() => playSynthBeep(580, 0.05)}>Pricing</Link>
            <Link to="/#referral" className="text-sm font-medium text-slate-300 hover:text-white transition-colors whitespace-nowrap" onClick={() => playSynthBeep(580, 0.05)}>Refer & Earn</Link>
            <Link to="/#faq" className="text-sm font-medium text-slate-300 hover:text-white transition-colors whitespace-nowrap" onClick={() => playSynthBeep(600, 0.05)}>FAQs</Link>
          </nav>
          
          <div className="flex items-center gap-4">
            <div className="hidden sm:flex items-center bg-slate-900/50 border border-white/10 rounded-full px-2 py-1">
              <Globe className="w-4 h-4 text-slate-400 ml-1" />
              <select 
                value={currency} 
                onChange={(e) => {
                  playSynthBeep(400, 0.05);
                  setCurrency(e.target.value as Currency);
                }}
                className="bg-transparent text-xs text-white border-none outline-none focus:ring-0 px-2 cursor-pointer appearance-none font-bold"
              >
                <option value="USD" className="bg-slate-900 text-white">USD ($)</option>
                <option value="EUR" className="bg-slate-900 text-white">EUR (€)</option>
                <option value="GBP" className="bg-slate-900 text-white">GBP (£)</option>
                <option value="ZAR" className="bg-slate-900 text-white">ZAR (R)</option>
                <option value="SZL" className="bg-slate-900 text-white">SZL (E)</option>
              </select>
            </div>
            
            <a href="/#contact" className="hidden sm:inline-flex items-center gap-2 text-xs uppercase tracking-wider font-bold bg-gradient-to-r from-brand-electricBlue to-brand-cyanAccent hover:from-brand-cyanAccent hover:to-brand-electricBlue text-white px-5 py-3 rounded-full shadow-lg hover:shadow-[0_0_20px_rgba(59,130,246,0.3)] transition-all duration-300" onClick={() => playSynthBeep(880, 0.12)}>
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
          
          <div className="mb-6 flex items-center bg-slate-900/50 border border-white/10 rounded-xl px-4 py-3">
            <Globe className="w-5 h-5 text-brand-electricBlue mr-3" />
            <select 
              value={currency} 
              onChange={(e) => {
                playSynthBeep(400, 0.05);
                setCurrency(e.target.value as Currency);
              }}
              className="bg-transparent text-sm text-white border-none outline-none focus:ring-0 w-full cursor-pointer font-bold appearance-none"
            >
              <option value="USD" className="bg-slate-900 text-white">USD ($) - Default</option>
              <option value="EUR" className="bg-slate-900 text-white">EUR (€)</option>
              <option value="GBP" className="bg-slate-900 text-white">GBP (£)</option>
              <option value="ZAR" className="bg-slate-900 text-white">ZAR (R)</option>
              <option value="SZL" className="bg-slate-900 text-white">SZL (E)</option>
            </select>
          </div>
          
          <div className="flex flex-col gap-5 text-base font-semibold">
            <Link to="/#services" className="text-slate-300 hover:text-brand-cyanAccent flex items-center gap-3 py-2 border-b border-white/5" onClick={() => { playSynthBeep(480, 0.05); closeDrawer(); }}>
              <Cpu className="w-5 h-5 text-brand-electricBlue" /> Services
            </Link>
            <Link to="/#process" className="text-slate-300 hover:text-brand-cyanAccent flex items-center gap-3 py-2 border-b border-white/5" onClick={() => { playSynthBeep(480, 0.05); closeDrawer(); }}>
              <Settings className="w-5 h-5 text-brand-electricBlue" /> Process
            </Link>
            <Link to="/portfolio" className="text-slate-300 hover:text-brand-cyanAccent flex items-center gap-3 py-2 border-b border-white/5" onClick={() => { playSynthBeep(520, 0.05); closeDrawer(); }}>
              <Briefcase className="w-5 h-5 text-brand-electricBlue" /> Portfolio
            </Link>
            <Link to="/#pricing" className="text-slate-300 hover:text-brand-cyanAccent flex items-center gap-3 py-2 border-b border-white/5" onClick={() => { playSynthBeep(580, 0.05); closeDrawer(); }}>
              <CreditCard className="w-5 h-5 text-brand-electricBlue" /> Pricing
            </Link>
            <Link to="/#referral" className="text-slate-300 hover:text-brand-cyanAccent flex items-center gap-3 py-2 border-b border-white/5" onClick={() => { playSynthBeep(580, 0.05); closeDrawer(); }}>
              <Gift className="w-5 h-5 text-brand-electricBlue" /> Refer & Earn
            </Link>
            <Link to="/#faq" className="text-slate-300 hover:text-brand-cyanAccent flex items-center gap-3 py-2 border-b border-white/5" onClick={() => { playSynthBeep(600, 0.05); closeDrawer(); }}>
              <HelpCircle className="w-5 h-5 text-brand-electricBlue" /> FAQs
            </Link>
          </div>
        </div>
        
        <div className="mt-auto space-y-4">
          <a href="/#contact" className="w-full py-3.5 bg-gradient-to-r from-brand-electricBlue to-brand-cyanAccent text-center rounded-xl font-bold flex items-center justify-center gap-2 text-white shadow-lg" onClick={() => { playSynthBeep(880, 0.12); closeDrawer(); }}>
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
