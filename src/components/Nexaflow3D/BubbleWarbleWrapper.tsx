import React, { useEffect, useRef } from 'react';

export function BubbleWarbleWrapper({ children }: { children: React.ReactNode }) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number | undefined>(undefined);

  useEffect(() => {
    const prefersReducedMotion = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion || !wrapRef.current) return;

    const start = performance.now();

    const tick = (now: number) => {
      const t = (now - start) / 1000;

      // Independent, out-of-phase waves per axis = non-uniform "jelly" wobble
      const scaleX =
        1 + 0.028 * Math.sin(t * 0.9) + 0.012 * Math.sin(t * 2.3 + 1.4);
      const scaleY =
        1 + 0.028 * Math.sin(t * 1.15 + 2.1) + 0.012 * Math.sin(t * 1.7 + 0.6);

      // Slow overall breathing pulse, on its own period so it never syncs with the wobble
      const pulse = 1 + 0.02 * Math.sin(t * (2 * Math.PI / 4.6));

      // Gentle shear + sway so the deformation isn't axis-locked
      const skewDeg = 0.5 * Math.sin(t * 0.55 + 1.5);
      const rotateDeg = 0.35 * Math.sin(t * 0.35);

      if (wrapRef.current) {
        wrapRef.current.style.transform =
          `translateZ(0) rotate(${rotateDeg}deg) skew(${skewDeg}deg) ` +
          `scale(${(scaleX * pulse).toFixed(4)}, ${(scaleY * pulse).toFixed(4)})`;
      }

      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, []);

  return (
    <div
      ref={wrapRef}
      style={{ transformOrigin: '50% 50%', willChange: 'transform', backfaceVisibility: 'hidden' }}
      className="absolute inset-0"
    >
      {children}
    </div>
  );
}

export default BubbleWarbleWrapper;
