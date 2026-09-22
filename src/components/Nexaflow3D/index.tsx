import { Canvas } from '@react-three/fiber';
import { Environment } from '@react-three/drei';
import { NexaflowCore } from './NexaflowCore';
import { BackgroundEnvironment } from './BackgroundEnvironment';
import { ScrollController } from './ScrollController';
import { PointerController } from './PointerController';
import RefractiveFilter from './RefractiveFilter';
import RefractiveOverlay, { RefractiveOverlayFrameSync } from './RefractiveOverlay';
import BubbleVideoFallback from './BubbleVideoFallback';
import { Global3DState, QualityTier } from './state';
import { useEffect, useState } from 'react';

function hasWebGLSupport(): boolean {
  if (typeof window === 'undefined') return false;
  try {
    const canvas = document.createElement('canvas');
    return !!(window.WebGLRenderingContext && (canvas.getContext('webgl') || canvas.getContext('experimental-webgl')));
  } catch {
    return false;
  }
}

// Enhanced device & capability detection
function detectCapabilities(): {
  isMobile: boolean;
  isTouch: boolean;
  quality: QualityTier;
  prefersReducedMotion: boolean;
} {
  if (typeof window === 'undefined') {
    return { isMobile: false, isTouch: false, quality: 'high', prefersReducedMotion: false };
  }

  // 1. UA sniffing for mobile platforms
  const isMobileUA = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

  // 2. Touch / coarse pointer check
  const isTouch = window.matchMedia('(pointer: coarse)').matches;
  const isMobile = isMobileUA || isTouch;

  // 3. Hardware specifications
  const memory = (navigator as any).deviceMemory !== undefined ? (navigator as any).deviceMemory : 8;
  const concurrency = navigator.hardwareConcurrency || 4;

  // 4. Reduced motion preference
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // 3-tier quality classification
  let quality: QualityTier = 'high';
  if (isMobile || isTouch || memory <= 4 || concurrency <= 4) {
    quality = 'low';
  } else if (memory <= 6 || concurrency <= 8) {
    quality = 'medium';
  } else {
    quality = 'high';
  }

  return { isMobile, isTouch, quality, prefersReducedMotion };
}

// Adaptive Performance Manager
function PerformanceManager({ onQualityChange }: { onQualityChange?: (q: QualityTier, isMob: boolean) => void }) {
  useEffect(() => {
    const caps = detectCapabilities();
    Global3DState.isMobile = caps.isMobile;
    Global3DState.quality = caps.quality;
    Global3DState.prefersReducedMotion = caps.prefersReducedMotion;

    // Log Global3DState.quality to verify quality gating takes effect
    console.log(`[Nexaflow3D] Global3DState.quality: ${Global3DState.quality}`);
    console.log(`[Nexaflow3D] Device specs: isMobile=${caps.isMobile}, isTouch=${caps.isTouch}, memory=${(navigator as any).deviceMemory ?? 'unknown'}GB, cores=${navigator.hardwareConcurrency}`);

    if (onQualityChange) {
      onQualityChange(caps.quality, caps.isMobile);
    }

    const mediaQueryMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const handleMotionChange = (e: MediaQueryListEvent) => {
      Global3DState.prefersReducedMotion = e.matches;
    };
    mediaQueryMotion.addEventListener('change', handleMotionChange);

    const mediaQueryTouch = window.matchMedia('(pointer: coarse)');
    const handleTouchChange = () => {
      const updated = detectCapabilities();
      Global3DState.quality = updated.quality;
      Global3DState.isMobile = updated.isMobile;
      console.log(`[Nexaflow3D] Global3DState.quality updated: ${Global3DState.quality}`);
      if (onQualityChange) {
        onQualityChange(updated.quality, updated.isMobile);
      }
    };
    mediaQueryTouch.addEventListener('change', handleTouchChange);

    return () => {
      mediaQueryMotion.removeEventListener('change', handleMotionChange);
      mediaQueryTouch.removeEventListener('change', handleTouchChange);
    };
  }, [onQualityChange]);

  return null;
}

export default function Nexaflow3D() {
  const [inView, setInView] = useState(true);
  const [quality, setQuality] = useState<QualityTier>(() => {
    const initial = detectCapabilities();
    Global3DState.isMobile = initial.isMobile;
    Global3DState.quality = initial.quality;
    Global3DState.prefersReducedMotion = initial.prefersReducedMotion;
    console.log(`Global3DState.quality: ${initial.quality}`);
    return initial.quality;
  });
  const [isMobile, setIsMobile] = useState<boolean>(() => Global3DState.isMobile);

  // IntersectionObserver: sets frameloop="demand" when the 3D section is out of viewport, resumes when in view
  useEffect(() => {
    const target = document.getElementById('hero') || document.querySelector('section');
    if (!target) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setInView(entry.isIntersecting);
      },
      { threshold: 0, rootMargin: '120px 0px 120px 0px' }
    );

    observer.observe(target);
    return () => observer.disconnect();
  }, []);

  // Cap dpr to 1 on mobile, [1, 1.5] on desktop
  const dpr: number | [number, number] = isMobile || quality === 'low' ? 1 : [1, 1.5];

  // Mutually exclusive: If device is mobile/touch, or has no WebGL, or low quality, use optimized BubbleVideoFallback
  const isWebGlSupported = typeof window !== 'undefined' ? hasWebGLSupport() : false;
  const shouldRender3D = isWebGlSupported && !isMobile && quality !== 'low' && !Global3DState.prefersReducedMotion;

  if (!shouldRender3D) {
    return <BubbleVideoFallback />;
  }

  return (
    <div className="fixed inset-0 z-0 w-full h-full bg-[#02050c] overflow-hidden pointer-events-none">
      {/* Refractive Filter and Overlay: strictly only mounted for desktop 'high' tier */}
      {quality === 'high' && !isMobile && (
        <>
          <RefractiveFilter />
          <RefractiveOverlay />
        </>
      )}

      <Canvas 
        camera={{ position: [0, 0, 8], fov: 45 }} 
        dpr={dpr}
        frameloop={inView ? "always" : "demand"}
        gl={{ 
          powerPreference: "high-performance", 
          antialias: false, 
          alpha: false,
          stencil: false,
          depth: true
        }}
      >
        <PerformanceManager onQualityChange={(q, mob) => { setQuality(q); setIsMobile(mob); }} />
        <ScrollController />
        <PointerController />
        <color attach="background" args={['#02050c']} />
        
        {/* Environment Lighting - reduced to 2 directional lights max */}
        <ambientLight intensity={0.4} color="#ffffff" />
        <directionalLight position={[10, 10, 10]} intensity={2.2} color="#3b82f6" />
        <directionalLight position={[-10, -10, -10]} intensity={1.5} color="#06b6d4" />
        
        {/* Animated Background for Refraction */}
        <BackgroundEnvironment />
        
        {/* The single dominant Nexaflow Core */}
        <NexaflowCore />

        {/* Refractive overlay animation synchronized directly into R3F useFrame */}
        {quality === 'high' && !isMobile && <RefractiveOverlayFrameSync />}
        
        {/* Procedural Environment: removed completely on mobile, dropped to resolution 64 on desktop */}
        {!isMobile && (
          <Environment resolution={64}>
            <group rotation={[-Math.PI / 2, 0, 0]}>
              <mesh position={[0, 10, 10]}>
                <planeGeometry args={[50, 50]} />
                <meshBasicMaterial color="#06b6d4" />
              </mesh>
              <mesh position={[0, -10, -10]}>
                <planeGeometry args={[50, 50]} />
                <meshBasicMaterial color="#3b82f6" />
              </mesh>
              <mesh position={[10, 0, 0]}>
                <planeGeometry args={[50, 50]} />
                <meshBasicMaterial color="#a855f7" />
              </mesh>
              <mesh position={[-10, 0, 0]}>
                <planeGeometry args={[50, 50]} />
                <meshBasicMaterial color="#0284c7" />
              </mesh>
            </group>
          </Environment>
        )}
      </Canvas>
    </div>
  );
}
