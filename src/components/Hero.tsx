import { useEffect, useRef } from 'react';
import { ArrowRight, CheckCircle2, ShieldCheck, TrendingUp, Cpu, Sparkles } from 'lucide-react';
import { playSynthBeep } from '../lib/audio';

export default function Hero() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let points: { x: number; y: number; vx: number; vy: number }[] = [];
    const numPoints = 50;
    const maxDist = 120;
    let animationFrameId: number;

    const initCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      points = [];
      for (let i = 0; i < numPoints; i++) {
        points.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.4,
          vy: (Math.random() - 0.5) * 0.4
        });
      }
    };

    const animateCanvas = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      for (let i = 0; i < numPoints; i++) {
        let p = points[i];
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, 2, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(6, 182, 212, 0.6)';
        ctx.fill();

        for (let j = i + 1; j < numPoints; j++) {
          let p2 = points[j];
          let dist = Math.hypot(p.x - p2.x, p.y - p2.y);
          if (dist < maxDist) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            let alpha = (1 - dist / maxDist) * 0.15;
            ctx.strokeStyle = `rgba(59, 130, 246, ${alpha})`;
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        }
      }
      animationFrameId = requestAnimationFrame(animateCanvas);
    };

    window.addEventListener('resize', initCanvas);
    initCanvas();
    animateCanvas();

    return () => {
      window.removeEventListener('resize', initCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center pt-32 pb-20 overflow-hidden px-4 sm:px-8">
      <canvas ref={canvasRef} className="absolute inset-0 z-0 opacity-30 pointer-events-none" />

      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-brand-electricBlue/10 blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-10 right-10 w-[300px] h-[300px] rounded-full bg-brand-cyanAccent/10 blur-[100px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto grid lg:grid-cols-12 gap-12 items-center relative z-10 w-full">
        {/* Left Headline Block */}
        <div className="lg:col-span-7 flex flex-col text-center lg:text-left items-center lg:items-start space-y-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-electricBlue/10 border border-brand-electricBlue/30 text-xs sm:text-sm font-semibold text-brand-cyanAccent">
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-cyanAccent opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-cyanAccent"></span>
            </span>
            <span>Modern Digital Strategy</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.15] text-white">
            Transform Your Business With <span className="bg-clip-text text-transparent bg-gradient-to-r from-brand-electricBlue via-[#60a5fa] to-brand-cyanAccent text-glow">AI-Powered Websites</span>, Automation & Lead Generation
          </h1>

          <p className="text-base sm:text-lg text-slate-300 max-w-2xl leading-relaxed">
            We help businesses attract more customers, automate repetitive work, and build a stronger online presence through modern websites and AI solutions.
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
            <a href="#contact" className="w-full sm:w-auto px-8 py-4 rounded-full bg-gradient-to-r from-brand-electricBlue to-brand-cyanAccent text-white font-bold hover:shadow-[0_0_25px_rgba(59,130,246,0.4)] hover:-translate-y-0.5 transition-all duration-300 text-center flex items-center justify-center gap-3 group" onClick={() => playSynthBeep(880, 0.1)}>
              <span>Book Free Consultation</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </a>
            <a href="#services" className="w-full sm:w-auto px-8 py-4 rounded-full glassmorphism text-slate-200 font-bold hover:bg-white/10 hover:text-white hover:-translate-y-0.5 transition-all duration-300 text-center flex items-center justify-center gap-2 border border-slate-700" onClick={() => playSynthBeep(600, 0.08)}>
              <span>View Services</span>
              <Sparkles className="w-5 h-5 text-brand-cyanAccent" />
            </a>
          </div>

          <div className="flex flex-wrap items-center justify-center lg:justify-start gap-6 pt-4 text-slate-400">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-brand-cyanAccent" />
              <span className="text-sm font-medium">Boutique & Founder-Led</span>
            </div>
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-brand-cyanAccent" />
              <span className="text-sm font-medium">Reliable Support & Clean Standards</span>
            </div>
          </div>
          
          <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 pt-6 w-full">
            <span className="text-xs text-slate-500 font-bold uppercase tracking-widest w-full text-center lg:text-left mb-1">Quick Links</span>
            {[
              { id: 'services', label: 'Services' },
              { id: 'portfolio-preview', label: 'Featured Work' },
              { id: 'pricing', label: 'Pricing' },
              { id: 'referral', label: 'Partner & Earn' },
              { id: 'faq', label: 'FAQs' }
            ].map((link) => (
              <a 
                key={link.id} 
                href={`#${link.id}`}
                className="px-4 py-1.5 rounded-full glassmorphism text-slate-300 text-sm font-semibold border border-white/5 hover:border-brand-electricBlue hover:bg-brand-electricBlue/10 hover:text-white transition-all shadow-sm"
                onClick={() => playSynthBeep(500, 0.05)}
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>

        {/* Right Visual Mock Card */}
        <div className="lg:col-span-5 relative w-full flex justify-center">
          <div className="w-full max-w-md relative group animate-float">
            <div className="absolute -inset-1 rounded-[2.5rem] bg-gradient-to-r from-brand-electricBlue to-brand-cyanAccent opacity-20 blur-xl group-hover:opacity-30 transition-opacity duration-500"></div>
            
            <div className="relative glassmorphism rounded-[2rem] border border-white/15 overflow-hidden p-6 shadow-2xl">
              <div className="flex items-center justify-between mb-6 border-b border-slate-800 pb-4">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-red-500/80"></span>
                  <span className="w-3 h-3 rounded-full bg-yellow-500/80"></span>
                  <span className="w-3 h-3 rounded-full bg-green-500/80"></span>
                </div>
                <span className="text-xs font-mono text-slate-500">nexaflow-system.v1</span>
              </div>

              {/* Graphical Mock Content */}
              <div className="glassmorphism p-4 rounded-xl border border-white/10 mb-4 hover:border-brand-cyanAccent/40 transition-colors">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs text-slate-400 uppercase tracking-widest font-semibold">Smart Routing Status</span>
                  <span className="text-xs text-brand-cyanAccent font-mono bg-brand-cyanAccent/10 px-2 py-0.5 rounded">Active</span>
                </div>
                <div className="text-xl font-bold text-white flex items-center gap-2">
                  <span>+264% Inbound Leads</span>
                  <TrendingUp className="w-5 h-5 text-brand-cyanAccent animate-pulse" />
                </div>
              </div>

              {/* Terminal Output Mock */}
              <div className="bg-[#02050c]/90 rounded-xl p-4 border border-white/5 font-mono text-[11px] space-y-2 text-slate-300">
                <div className="flex items-center justify-between text-brand-electricBlue border-b border-slate-800/60 pb-1.5">
                  <span>[NexaFlow AI Automations]</span>
                  <span>Online</span>
                </div>
                <p className="text-slate-500">&gt; running system integrations...</p>
                <p className="text-brand-cyanAccent">✓ Live connection verified</p>
                <p className="text-slate-400">&gt; executing user workflow sequence...</p>
                <p className="text-green-400">✓ CRM & WhatsApp automations routing correctly</p>
                <div className="w-full bg-slate-900 h-1.5 rounded-full overflow-hidden mt-2">
                  <div className="h-full bg-gradient-to-r from-brand-electricBlue to-brand-cyanAccent w-3/4 animate-pulse"></div>
                </div>
              </div>

              <div className="absolute -bottom-6 -right-6 glassmorphism w-16 h-16 rounded-2xl flex items-center justify-center border border-brand-cyanAccent/50 shadow-lg text-brand-cyanAccent">
                <Cpu className="w-8 h-8 animate-spin-slow" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
