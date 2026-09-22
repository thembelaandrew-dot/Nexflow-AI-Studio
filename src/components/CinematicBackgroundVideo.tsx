import { useEffect, useRef, useState, useMemo, useCallback } from 'react';

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
  const video3DLayerRef = useRef<HTMLDivElement>(null);
  const particleLayerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [shouldPlay, setShouldPlay] = useState(true);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const isPlayingRef = useRef(false);
  const tickingRef = useRef(false);
  const mouseTiltXRef = useRef(0);

  // Cloudinary quality optimization:
  // Using q_auto:best,w_1080 for crisp, pristine mobile & desktop playback without macroblocking or blur
  const { optimizedMp4, optimizedWebm, optimizedPoster } = useMemo(() => {
    const optimizedMp4 = getOptimizedCloudinaryUrl(mp4Src, 'q_auto:best,w_1080,vc_auto');
    const optimizedWebm = webmSrc ? getOptimizedCloudinaryUrl(webmSrc, 'q_auto:best,w_1080,vc_auto') : undefined;
    const optimizedPoster = getOptimizedCloudinaryUrl(posterSrc, 'q_auto:best,w_1920');
    return { optimizedMp4, optimizedWebm, optimizedPoster };
  }, [mp4Src, webmSrc, posterSrc]);

  // Safe play helper to eliminate AbortError and keep playback continuous
  const safePlay = useCallback(async () => {
    const video = videoRef.current;
    if (!video || !shouldPlay) return;

    try {
      video.muted = true;
      video.defaultMuted = true;
      const promise = video.play();
      if (promise !== undefined) {
        isPlayingRef.current = true;
        await promise;
      }
    } catch {
      isPlayingRef.current = false;
    }
  }, [shouldPlay]);

  // 1. Accessibility: respects prefers-reduced-motion
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setShouldPlay(!mediaQuery.matches);
    setPrefersReducedMotion(mediaQuery.matches);

    const handleChange = (e: MediaQueryListEvent) => {
      setShouldPlay(!e.matches);
      setPrefersReducedMotion(e.matches);
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  // 2. Hardware initialization & mobile inline setup
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.muted = true;
    video.defaultMuted = true;
    video.playsInline = true;
    video.setAttribute('playsinline', 'true');
    video.setAttribute('webkit-playsinline', 'true');
    video.setAttribute('muted', 'true');
    video.setAttribute('autoplay', 'true');
    video.setAttribute('loop', 'true');

    if (shouldPlay) {
      safePlay();
    }

    const handlePauseOrStall = () => {
      if (shouldPlay && document.visibilityState === 'visible') {
        safePlay();
      }
    };

    video.addEventListener('pause', handlePauseOrStall);
    video.addEventListener('stalled', handlePauseOrStall);
    video.addEventListener('waiting', handlePauseOrStall);

    const unlockPlay = () => {
      safePlay();
      window.removeEventListener('touchstart', unlockPlay);
      window.removeEventListener('click', unlockPlay);
    };

    window.addEventListener('touchstart', unlockPlay, { passive: true, once: true });
    window.addEventListener('click', unlockPlay, { passive: true, once: true });

    return () => {
      video.removeEventListener('pause', handlePauseOrStall);
      video.removeEventListener('stalled', handlePauseOrStall);
      video.removeEventListener('waiting', handlePauseOrStall);
      window.removeEventListener('touchstart', unlockPlay);
      window.removeEventListener('click', unlockPlay);
    };
  }, [shouldPlay, safePlay]);

  // 3. Page visibility management
  useEffect(() => {
    const handleVisibilityChange = () => {
      const video = videoRef.current;
      if (!video) return;

      if (document.visibilityState === 'visible') {
        if (shouldPlay) safePlay();
      } else {
        video.pause();
        isPlayingRef.current = false;
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
  }, [shouldPlay, safePlay]);

  // 4. GPU-Accelerated 3D Parallax & Perspective Tilt Engine
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const update3DTransform = () => {
      tickingRef.current = false;
      if (!containerRef.current || !video3DLayerRef.current) return;

      if (prefersReducedMotion) {
        video3DLayerRef.current.style.transform = 'translate3d(0, 0, 0) scale(1)';
        if (particleLayerRef.current) {
          particleLayerRef.current.style.transform = 'translate3d(0, 0, 0)';
        }
        return;
      }

      const rect = containerRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      // Skip calculation if far outside viewport for peak GPU efficiency
      if (rect.bottom < -150 || rect.top > windowHeight + 150) return;

      // Normalized progress relative to viewport center (-0.5 scrolled down past center, +0.5 approaching)
      const elementCenter = rect.top + rect.height / 2;
      const viewportCenter = windowHeight / 2;
      const progress = (elementCenter - viewportCenter) / (windowHeight + rect.height);

      // Subtle parallax offset: video moves slower than foreground UI
      const parallaxY = progress * 60; // range approx -30px to +30px
      // Subtle 3D perspective tilt (rotateX within 3 degrees)
      const tiltX = -progress * 3.5;
      const tiltY = mouseTiltXRef.current;
      const baseScale = isLoaded ? 1.05 : 1.08;

      video3DLayerRef.current.style.transform = `translate3d(0, ${parallaxY.toFixed(2)}px, -35px) rotateX(${tiltX.toFixed(2)}deg) rotateY(${tiltY.toFixed(2)}deg) scale(${baseScale})`;

      if (particleLayerRef.current) {
        // Soft counter-parallax for multi-plane depth
        const particleY = parallaxY * 0.45;
        particleLayerRef.current.style.transform = `translate3d(0, ${particleY.toFixed(2)}px, -15px) rotateX(${(tiltX * 0.6).toFixed(2)}deg) scale(1.02)`;
      }
    };

    const handleScroll = () => {
      if (!tickingRef.current) {
        tickingRef.current = true;
        requestAnimationFrame(update3DTransform);
      }
    };

    // Subtle interactive mouse tilt for desktop users
    const handleMouseMove = (e: MouseEvent) => {
      if (prefersReducedMotion) return;
      const width = window.innerWidth;
      if (width < 768) return; // desktop only
      const xPct = (e.clientX / width) - 0.5;
      mouseTiltXRef.current = xPct * 2.2; // max ~1.1 deg
      if (!tickingRef.current) {
        tickingRef.current = true;
        requestAnimationFrame(update3DTransform);
      }
    };

    // Initial frame update
    requestAnimationFrame(update3DTransform);

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('resize', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleScroll);
    };
  }, [prefersReducedMotion, isLoaded]);

  return (
    <div
      ref={containerRef}
      className={`absolute inset-0 overflow-hidden pointer-events-none select-none z-0 ${className}`}
      style={{
        perspective: '1200px',
        perspectiveOrigin: 'center center'
      }}
      aria-hidden="true"
    >
      {/* 3D Parallax Video & Poster Depth Plane */}
      <div
        ref={video3DLayerRef}
        className="absolute w-[108%] h-[108%] -left-[4%] -top-[4%] transition-[opacity,scale] duration-1000 ease-out"
        style={{
          transformStyle: 'preserve-3d',
          transform: 'translate3d(0, 0, -35px) scale(1.05)',
          backfaceVisibility: 'hidden',
          willChange: 'transform'
        }}
      >
        {/* Layer 0: High-fidelity fallback poster */}
        <div
          className="absolute inset-0 bg-[#02050c] bg-cover bg-center transition-opacity duration-700"
          style={{
            backgroundImage: `url('${optimizedPoster}')`,
            width: '100%',
            height: '100%'
          }}
        />

        {/* Layer 1: Cinematic Video Stream */}
        {shouldPlay && (
          <video
            ref={videoRef}
            poster={optimizedPoster}
            width={1920}
            height={1080}
            className={`absolute inset-0 w-full h-full object-cover object-center transition-opacity duration-700 ease-out ${
              isLoaded ? 'opacity-100' : 'opacity-0'
            }`}
            style={{
              backfaceVisibility: 'hidden',
              width: '100%',
              height: '100%',
              objectFit: 'cover'
            }}
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            onLoadedData={() => setIsLoaded(true)}
            onCanPlay={() => {
              setIsLoaded(true);
              safePlay();
            }}
          >
            {optimizedWebm && <source src={optimizedWebm} type="video/webm" />}
            <source src={optimizedMp4} type="video/mp4" />
          </video>
        )}
      </div>

      {/* Layer 2: Soft Parallax Depth Gradient & Particle Layer */}
      <div
        ref={particleLayerRef}
        className="absolute inset-0 pointer-events-none select-none overflow-hidden transition-transform duration-75 ease-out"
        style={{
          transform: 'translate3d(0, 0, -15px)',
          transformStyle: 'preserve-3d',
          willChange: 'transform'
        }}
      >
        {/* Atmospheric Depth Glows */}
        <div className="absolute -top-[10%] -left-[10%] w-[120%] h-[120%] bg-[radial-gradient(ellipse_at_30%_40%,rgba(6,182,212,0.12),transparent_60%)] mix-blend-screen" />
        <div className="absolute -top-[10%] -right-[10%] w-[120%] h-[120%] bg-[radial-gradient(ellipse_at_70%_60%,rgba(59,130,246,0.1),transparent_65%)] mix-blend-screen" />

        {/* Ambient Stardust Particle Grid in 3D Space */}
        <svg className="absolute inset-0 w-full h-full opacity-30 mix-blend-screen" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <radialGradient id={`particleGlow-${variant}`} cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#3b82f6" stopOpacity="0" />
            </radialGradient>
          </defs>
          <circle cx="12%" cy="25%" r="1.5" fill={`url(#particleGlow-${variant})`} />
          <circle cx="28%" cy="65%" r="2" fill={`url(#particleGlow-${variant})`} />
          <circle cx="42%" cy="30%" r="1.2" fill="#06b6d4" opacity="0.6" />
          <circle cx="58%" cy="75%" r="1.8" fill={`url(#particleGlow-${variant})`} />
          <circle cx="74%" cy="22%" r="2" fill={`url(#particleGlow-${variant})`} />
          <circle cx="86%" cy="55%" r="1.2" fill="#3b82f6" opacity="0.7" />
          <circle cx="92%" cy="32%" r="1.6" fill={`url(#particleGlow-${variant})`} />
          <circle cx="18%" cy="80%" r="1.8" fill={`url(#particleGlow-${variant})`} />
          <circle cx="48%" cy="85%" r="1.4" fill="#06b6d4" opacity="0.5" />
          <circle cx="65%" cy="18%" r="1.5" fill="#3b82f6" opacity="0.8" />
          <circle cx="82%" cy="82%" r="2" fill={`url(#particleGlow-${variant})`} />
        </svg>
      </div>

      {/* Layer 3: Atmospheric Dark Layer for Pristine Text Readability */}
      <div 
        className="absolute inset-0 bg-[#02050c]" 
        style={{ opacity: overlayOpacity }}
      />

      {/* Layer 4: Directional Gradients */}
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
