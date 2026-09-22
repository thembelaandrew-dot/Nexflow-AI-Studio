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
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [shouldPlay, setShouldPlay] = useState(true);
  const isPlayingRef = useRef(false);

  // Cloudinary quality optimization:
  // Using q_auto:best,w_1080 for crisp, pristine mobile & desktop playback without macroblocking or blur
  const { optimizedMp4, optimizedWebm, optimizedPoster } = useMemo(() => {
    // Deliver pristine 1080p high-bitrate video stream across all devices without quality drop
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
      // Auto-play was temporarily restrained or interrupted; will re-attempt seamlessly
    }
  }, [shouldPlay]);

  // 1. Accessibility: respects prefers-reduced-motion
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

  // 2. Hardware initialization & mobile inline setup
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Imperative inline video attributes for WebKit / iOS Safari & Android
    video.muted = true;
    video.defaultMuted = true;
    video.playsInline = true;
    video.setAttribute('playsinline', 'true');
    video.setAttribute('webkit-playsinline', 'true');
    video.setAttribute('muted', 'true');
    video.setAttribute('autoplay', 'true');
    video.setAttribute('loop', 'true');

    // Immediate initial play
    if (shouldPlay) {
      safePlay();
    }

    // Auto-recovery: if mobile browser pauses or stalls on touch scroll or memory pressure, smoothly resume
    const handlePauseOrStall = () => {
      if (shouldPlay && document.visibilityState === 'visible') {
        safePlay();
      }
    };

    video.addEventListener('pause', handlePauseOrStall);
    video.addEventListener('stalled', handlePauseOrStall);
    video.addEventListener('waiting', handlePauseOrStall);

    // Global first-gesture unlock for strict mobile autoplay policies
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

  // 3. Page visibility management: only pause when tab is in background / screen is locked
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

  return (
    <div
      ref={containerRef}
      className={`absolute inset-0 overflow-hidden pointer-events-none select-none z-0 ${className}`}
      aria-hidden="true"
    >
      {/* Layer 0: High-fidelity fallback poster image to eliminate CLS and blank flashes */}
      <div
        className="absolute inset-0 bg-[#02050c] bg-cover bg-center transition-opacity duration-700"
        style={{
          backgroundImage: `url('${optimizedPoster}')`,
          width: '100%',
          height: '100%',
          aspectRatio: '16/9'
        }}
      />

      {/* Layer 1: Cinematic Video Asset - continuously running without scroll interruptions */}
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
            transform: 'translate3d(0, 0, 0)',
            backfaceVisibility: 'hidden',
            width: '100%',
            height: '100%',
            aspectRatio: '16/9',
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

      {/* Layer 2: Atmospheric dark layer to ensure pristine text readability */}
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
