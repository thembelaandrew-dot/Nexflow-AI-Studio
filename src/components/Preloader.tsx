import { useEffect, useState } from 'react';

export default function Preloader() {
  const [visible, setVisible] = useState(true);
  const [removed, setRemoved] = useState(false);

  useEffect(() => {
    const timer1 = setTimeout(() => setVisible(false), 1000);
    const timer2 = setTimeout(() => setRemoved(true), 1700);
    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, []);

  if (removed) return null;

  return (
    <div
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center bg-brand-deep transition-all duration-700 ease-in-out ${
        !visible ? 'opacity-0 pointer-events-none' : ''
      }`}
    >
      <div className="relative flex flex-col items-center">
        <div className="absolute w-24 h-24 rounded-full border-2 border-brand-electricBlue/20 animate-ping"></div>
        <div className="glassmorphism w-20 h-20 rounded-2xl flex items-center justify-center border border-brand-electricBlue/40 shadow-[0_0_30px_rgba(59,130,246,0.2)]">
          <span className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-brand-electricBlue to-brand-cyanAccent">
            N
          </span>
        </div>
        <div className="mt-8 text-xs tracking-widest text-brand-cyanAccent uppercase font-bold animate-pulse">
          Initializing NexaFlow System
        </div>
        <div className="w-48 h-1 bg-slate-900 rounded-full overflow-hidden mt-3">
          <div className="h-full bg-gradient-to-r from-brand-electricBlue to-brand-cyanAccent w-0 animate-[loadingBar_1.2s_ease-in-out_forwards]"></div>
        </div>
      </div>
    </div>
  );
}
