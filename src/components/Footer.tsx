import { Phone, Mail } from 'lucide-react';
import { playSynthBeep } from '../lib/audio';

export default function Footer() {
  return (
    <footer className="bg-[#02050c] pt-20 pb-8 border-t border-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-12 gap-12 mb-16">
          <div className="col-span-2 md:col-span-4 lg:col-span-5 space-y-6">
            <a href="#" className="inline-block" onClick={() => playSynthBeep(600, 0.1)}>
              <img src="https://i.imgur.com/DftcbVu.jpeg" alt="NexaFlow AI Logo" className="h-12 w-auto object-contain rounded-lg shadow-sm" onError={(e) => { e.currentTarget.outerHTML = "<span class='text-2xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-brand-electricBlue'>NexaFlow AI</span>"; }} />
            </a>
            <h4 className="text-lg font-bold text-white tracking-tight">Let's Build Something Amazing Together</h4>
            <p className="text-sm text-slate-400 leading-relaxed max-w-sm">
              Helping businesses, churches, and organizations build smarter digital experiences through modern websites and automation solutions.
            </p>
            <div className="flex items-center gap-3">
              <a href="https://wa.me/26879375018" target="_blank" className="p-2.5 bg-slate-900 rounded-full text-slate-400 hover:text-green-400 hover:bg-slate-800 transition-colors" onClick={() => playSynthBeep(450, 0.05)}>
                <Phone className="w-4 h-4" />
              </a>
              <a href="mailto:thembelaandrew@gmail.com" className="p-2.5 bg-slate-900 rounded-full text-slate-400 hover:text-brand-electricBlue hover:bg-slate-800 transition-colors" onClick={() => playSynthBeep(490, 0.05)}>
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </div>

          <div className="col-span-1 md:col-span-2 lg:col-span-3 space-y-4">
            <h4 className="text-xs uppercase tracking-widest text-slate-300 font-bold">Quick Links</h4>
            <ul className="space-y-2.5 text-sm text-slate-400">
              <li><a href="#why-choose-us" className="hover:text-white transition-colors">Why Choose Us</a></li>
              <li><a href="#featured-work" className="hover:text-white transition-colors">Featured Work</a></li>
              <li><a href="#pricing" className="hover:text-white transition-colors">Pricing Options</a></li>
              <li><a href="#faq" className="hover:text-white transition-colors">FAQ Support</a></li>
            </ul>
          </div>

          <div className="col-span-1 md:col-span-2 lg:col-span-4 space-y-4">
            <h4 className="text-xs uppercase tracking-widest text-slate-300 font-bold">Our Services</h4>
            <ul className="space-y-2.5 text-sm text-slate-400">
              <li><a href="#services" className="hover:text-white transition-colors">AI-Powered Business Websites</a></li>
              <li><a href="#services" className="hover:text-white transition-colors">B2B Lead Generation</a></li>
              <li><a href="#services" className="hover:text-white transition-colors">Internal Business Automations</a></li>
              <li><a href="#services" className="hover:text-white transition-colors">Virtual Assistant Support</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-900 pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500">
          <p>&copy; 2026 NexaFlow AI. All rights preserved with honor.</p>
          <div className="flex items-center gap-6 mt-4 sm:mt-0">
            <a href="#contact" className="hover:text-slate-300 transition-colors">Terms of Agreement</a>
            <a href="#contact" className="hover:text-slate-300 transition-colors">Privacy Principles</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
