import { Phone, Mail, Instagram, Facebook, ArrowUpRight } from 'lucide-react';
import { playSynthBeep } from '../lib/audio';

export default function Footer() {
  return (
    <footer className="bg-nexa-deep pt-24 pb-8 border-t border-white/5 relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-px bg-gradient-to-r from-transparent via-brand-electricBlue/30 to-transparent"></div>
      
      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        {/* Large Footer CTA */}
        <div className="pb-20 border-b border-white/5 mb-20 flex flex-col md:flex-row items-center justify-between gap-10">
          <div className="max-w-2xl">
            <h2 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight mb-4 leading-tight">
              Ready to scale your <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-electricBlue to-brand-cyanAccent">digital presence?</span>
            </h2>
            <p className="text-slate-400 text-lg">
              Let's build intelligent workflows and premium experiences.
            </p>
          </div>
          <a 
            href="#contact" 
            className="shrink-0 px-8 py-5 rounded-xl bg-brand-electricBlue text-white font-bold hover:bg-[#2563eb] transition-all shadow-lg hover:shadow-[0_0_30px_rgba(59,130,246,0.3)] hover:-translate-y-1 flex items-center justify-center gap-3 group"
            onClick={() => playSynthBeep(880, 0.1)}
          >
            <span>Start Your Project</span>
            <ArrowUpRight className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
          </a>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-12 gap-12 lg:gap-8 mb-16">
          <div className="col-span-2 md:col-span-4 lg:col-span-4 space-y-6">
            <a href="#" className="inline-block" onClick={() => playSynthBeep(600, 0.1)}>
              <img src="https://i.imgur.com/DftcbVu.jpeg" alt="Nexaflow AI - AI Automation and Website Development Agency" className="h-10 w-auto object-contain rounded opacity-90 hover:opacity-100 transition-opacity" loading="lazy" width="200" height="40" onError={(e) => { e.currentTarget.outerHTML = "<span class='text-2xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-brand-electricBlue'>Nexaflow AI</span>"; }} />
            </a>
            <p className="text-sm text-slate-400 leading-relaxed max-w-sm">
              Nexaflow AI is a premier AI and Digital agency providing custom website development, AI chatbots, and workflow automation services across Eswatini, Africa, and worldwide.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <a href="https://wa.me/26879375018?text=Hi%20I%20would%20like%20to%20work%20with%20Nexaflow%20AI" target="_blank" className="p-2.5 bg-white/5 border border-white/10 rounded-lg text-slate-400 hover:text-green-400 hover:bg-white/10 hover:border-white/20 transition-all" onClick={() => playSynthBeep(450, 0.05)}>
                <Phone className="w-4 h-4" />
              </a>
              <a href="mailto:andrewtsabedze943@gmail.com" className="p-2.5 bg-white/5 border border-white/10 rounded-lg text-slate-400 hover:text-brand-electricBlue hover:bg-white/10 hover:border-white/20 transition-all" onClick={() => playSynthBeep(490, 0.05)}>
                <Mail className="w-4 h-4" />
              </a>
              <a href="https://www.instagram.com/nexaflow_ai.africa?igsh=MXRzdzc0MTdvYjYxaQ==" target="_blank" className="p-2.5 bg-white/5 border border-white/10 rounded-lg text-slate-400 hover:text-pink-500 hover:bg-white/10 hover:border-white/20 transition-all" onClick={() => playSynthBeep(520, 0.05)}>
                <Instagram className="w-4 h-4" />
              </a>
              <a href="https://www.facebook.com/profile.php?id=61591884524709" target="_blank" className="p-2.5 bg-white/5 border border-white/10 rounded-lg text-slate-400 hover:text-blue-500 hover:bg-white/10 hover:border-white/20 transition-all" onClick={() => playSynthBeep(550, 0.05)}>
                <Facebook className="w-4 h-4" />
              </a>
            </div>
          </div>
          
          <div className="col-span-1 md:col-span-2 lg:col-span-2 lg:col-start-7 space-y-5">
            <h4 className="text-xs uppercase tracking-widest text-slate-300 font-bold">Solutions</h4>
            <ul className="space-y-3 text-sm text-slate-400">
              <li><a href="#services" className="hover:text-white transition-colors">Premium Websites</a></li>
              <li><a href="#services" className="hover:text-white transition-colors">AI Automation</a></li>
              <li><a href="#services" className="hover:text-white transition-colors">Business Systems</a></li>
              <li><a href="#services" className="hover:text-white transition-colors">Lead Generation</a></li>
            </ul>
          </div>
          
          <div className="col-span-1 md:col-span-2 lg:col-span-2 space-y-5">
            <h4 className="text-xs uppercase tracking-widest text-slate-300 font-bold">Company</h4>
            <ul className="space-y-3 text-sm text-slate-400">
              <li><a href="#portfolio-preview" className="hover:text-white transition-colors">Featured Work</a></li>
              <li><a href="#pricing" className="hover:text-white transition-colors">Pricing</a></li>
              <li><a href="#referral" className="hover:text-white transition-colors">Partner Program</a></li>
              <li><a href="#faq" className="hover:text-white transition-colors">FAQ</a></li>
            </ul>
          </div>

          <div className="col-span-2 md:col-span-4 lg:col-span-2 space-y-5">
            <h4 className="text-xs uppercase tracking-widest text-slate-300 font-bold">Location</h4>
            <div className="text-sm text-slate-400 space-y-1">
              <p>Africa</p>
              <p>Operating Globally</p>
              <p className="pt-2 text-brand-electricBlue hover:text-white transition-colors cursor-pointer">
                andrewtsabedze943@gmail.com
              </p>
            </div>
          </div>
        </div>
        
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>&copy; {new Date().getFullYear()} Nexaflow AI. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <a href="#" className="hover:text-slate-300 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-slate-300 transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
