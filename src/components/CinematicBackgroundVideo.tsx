import { useEffect, useRef, useState, useMemo } from 'react';

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

function getOptimizedCloudinaryUrl(url: string, params: string): string {
  if (!url || !url.includes('res.cloudinary.com')) return url;
  if (url.includes('/video/upload/q_') || url.includes('/video/upload/w_')) return url;
  return url.replace('/video/upload/', `/video/upload/${params}/`);
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
  const [hasApproached, setHasApproached] = useState(false);

  // Generate responsive Cloudinary variants with reduced bitrates and scaled dimensions
  const { mobileMp4, desktopMp4, mobileWebm, desktopWebm } = useMemo(() => {
    const mobileMp4 = getOptimizedCloudinaryUrl(mp4Src, 'q_auto:eco,w_720,c_limit,vc_auto');
    const desktopMp4 = getOptimizedCloudinaryUrl(mp4Src, 'q_auto:good,w_1280,c_limit,vc_auto');
    const mobileWebm = webmSrc ? getOptimizedCloudinaryUrl(webmSrc, 'q_auto:eco,w_720,c_limit,vc_auto') : undefined;
    const desktopWebm = webmSrc ? getOptimizedCloudinaryUrl(webmSrc, 'q_auto:good,w_1280,c_limit,vc_auto') : undefined;
    return { mobileMp4, desktopMp4, mobileWebm, desktopWebm };
  }, [mp4Src, webmSrc]);

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

  // 2. Performance: IntersectionObserver to load when approaching and pause when off-screen
  useEffect(() => {
    const el = containerRef.current;
    if (!el || typeof IntersectionObserver === 'undefined') {
      setIsInViewport(true);
      setHasApproached(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setIsInViewport(entry.isIntersecting);
          if (entry.isIntersecting) {
            setHasApproached(true);
          }
        });
      },
      {
        root: null,
        rootMargin: '200px 0px 200px 0px', // Pre-load slightly before scrolling into view
        threshold: 0.02
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
          // Auto-play was prevented by browser policy / power save
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
      {/* Layer 0: Dark fallback poster image with explicit sizing to prevent CLS */}
      <div
        className="absolute inset-0 bg-[#02050c] bg-cover bg-center"
        style={{
          backgroundImage: `url('${posterSrc}')`,
          width: '100%',
          height: '100%',
          aspectRatio: '16/9'
        }}
      />

      {/* Layer 1: Cinematic Video Asset - mounted only when approached and motion allowed */}
      {shouldPlay && hasApproached && (
        <video
          ref={videoRef}
          poster={posterSrc}
          width={1920}
          height={1080}
          className={`absolute inset-0 w-full h-full object-cover object-center transition-opacity duration-1000 ease-out ${
            isLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          style={{
            willChange: 'opacity, transform',
            transform: 'translateZ(0)',
            width: '100%',
            height: '100%',
            aspectRatio: '16/9',
            objectFit: 'cover'
          }}
          autoPlay
          loop
          muted
          playsInline
          preload="metadata"
          onLoadedData={() => setIsLoaded(true)}
          onCanPlay={() => setIsLoaded(true)}
        >
          {mobileWebm && <source media="(max-width: 768px)" src={mobileWebm} type="video/webm" />}
          <source media="(max-width: 768px)" src={mobileMp4} type="video/mp4" />
          {desktopWebm && <source src={desktopWebm} type="video/webm" />}
          <source src={desktopMp4} type="video/mp4" />
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
