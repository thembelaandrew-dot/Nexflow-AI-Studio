import { useEffect, useRef, useState } from 'react';

export interface CinematicBackgroundVideoProps {
  mp4Src: string;
  webmSrc?: string;
  posterSrc: string;
  variant?: 'hero' | 'section';
  topFade?: boolean;
  bottomFade?: boolean;
  vignette?: boolean;
  overlayOpacity?: number; // 0 to 1
  className?: string;
}

export default function CinematicBackgroundVideo({
  mp4Src,
  webmSrc,
  posterSrc,
  variant = 'section',
  topFade = true,
  bottomFade = true,
  vignette = true,
  overlayOpacity = 0.65,
  className = ''
}: CinematicBackgroundVideoProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [shouldPlay, setShouldPlay] = useState(true);
  const [isInViewport, setIsInViewport] = useState(false);

  // 1. Accessibility: prefers-reduced-motion detection
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setShouldPlay(!mediaQuery.matches);

    const handleChange = (e: MediaQueryListEvent) => {
      setShouldPlay(!e.matches);
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  // 2. Performance: IntersectionObserver to pause when off-screen and resume when visible
  useEffect(() => {
    const el = containerRef.current;
    if (!el || typeof IntersectionObserver === 'undefined') {
      setIsInViewport(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setIsInViewport(entry.isIntersecting);
        });
      },
      {
        root: null,
        rootMargin: '120px 0px 120px 0px', // Pre-load slightly before scrolling into view
        threshold: 0.05
      }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // 3. Play/Pause based on viewport visibility and reduced motion state
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (shouldPlay && isInViewport) {
      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {
          // Auto-play was prevented (e.g. low power mode)
        });
      }
    } else {
      video.pause();
    }
  }, [shouldPlay, isInViewport]);

  return (
    <div
      ref={containerRef}
      className={`absolute inset-0 overflow-hidden pointer-events-none select-none z-0 ${className}`}
      aria-hidden="true"
    >
      {/* Layer 0: Dark fallback/background image */}
      <div
        className="absolute inset-0 bg-[#02050c] bg-cover bg-center"
        style={{ backgroundImage: `url('${posterSrc}')` }}
      />

      {/* Layer 1: Cinematic Video Asset */}
      {shouldPlay && (
        <video
          ref={videoRef}
          poster={posterSrc}
          className={`absolute inset-0 w-full h-full object-cover object-center transition-opacity duration-1000 ease-out ${
            isLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          style={{ willChange: "opacity, transform", transform: "translateZ(0)" }}
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          onLoadedData={() => setIsLoaded(true)}
          onCanPlay={() => setIsLoaded(true)}
        >
          {webmSrc && <source src={webmSrc} type="video/webm" />}
          <source src={mp4Src} type="video/mp4" />
        </video>
      )}

      {/* Layer 2: Atmospheric dark layer to maintain high readability */}
      <div 
        className="absolute inset-0 bg-[#02050c]" 
        style={{ opacity: overlayOpacity }}
      />

      {/* Layer 3: Directional Gradients */}
      {topFade && (
        <div className="absolute top-0 left-0 right-0 h-44 bg-gradient-to-b from-[#02050c] via-[#02050c]/80 to-transparent pointer-events-none" />
      )}

      {bottomFade && (
        <div className="absolute bottom-0 left-0 right-0 h-44 bg-gradient-to-t from-[#02050c] via-[#02050c]/80 to-transparent pointer-events-none" />
      )}

      {/* Variant-specific adjustments */}
      {variant === 'hero' && (
        <div className="absolute inset-0 bg-gradient-to-r from-[#02050c]/90 via-[#02050c]/40 to-transparent pointer-events-none" />
      )}

      {variant === 'section' && (
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_20%,rgba(2,5,12,0.75)_95%)] pointer-events-none" />
      )}

      {/* Edge Vignette */}
      {vignette && (
        <div className="absolute inset-0 shadow-[inset_0_0_120px_rgba(2,5,12,0.85)] pointer-events-none" />
      )}
    </div>
  );
}
