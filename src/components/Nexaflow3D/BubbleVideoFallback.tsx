import { useState, useEffect } from 'react';
import { BubbleWarbleWrapper } from './BubbleWarbleWrapper';

export function BubbleVideoFallback() {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mq.matches);

    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  return (
    <div className="fixed inset-0 z-0 w-full h-full bg-[#02050c] overflow-hidden pointer-events-none">
      {prefersReducedMotion ? (
        <img
          src="/nexaflow-bubble-poster.jpg"
          alt=""
          width={1920}
          height={1080}
          className="w-full h-full object-cover"
          style={{ width: '100%', height: '100%', aspectRatio: '16/9' }}
        />
      ) : (
        <BubbleWarbleWrapper>
          <video
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            poster="/nexaflow-bubble-poster.jpg"
            width={1920}
            height={1080}
            className="w-full h-full object-cover"
            style={{ width: '100%', height: '100%', aspectRatio: '16/9' }}
          >
            <source src="/nexaflow-bubble-loop-colorfixed.mp4" type="video/mp4" />
          </video>
        </BubbleWarbleWrapper>
      )}
    </div>
  );
}

export default BubbleVideoFallback;
