import { useEffect, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Global3DState } from './state';

/**
 * Synchronized R3F frame loop updater for the refractive overlay.
 * Merged directly into R3F's useFrame loop — eliminates independent requestAnimationFrame.
 */
export function RefractiveOverlayFrameSync() {
  useFrame((state) => {
    // Only execute when on desktop high tier
    if (Global3DState.quality !== 'high' || Global3DState.isMobile) return;

    const time = state.clock.getElapsedTime();
    const turbEl = document.getElementById('fe-turbulence');
    if (turbEl) {
      const freq = 0.012 + Math.sin(time * 0.4) * 0.003;
      turbEl.setAttribute('baseFrequency', freq.toFixed(5));
    }

    const overlayEl = document.getElementById('nexaflow-refractive-overlay');
    if (overlayEl) {
      const { pointer, scrollProgress } = Global3DState;
      const x = (pointer.x * 15).toFixed(1);
      const y = (-pointer.y * 15 + scrollProgress * 20).toFixed(1);
      overlayEl.style.transform = `translate3d(${x}px, ${y}px, 0)`;
    }
  });

  return null;
}

/**
 * DOM backdrop-filter refraction overlay.
 * Completely unmounted on touch devices and low/medium quality tiers.
 */
export default function RefractiveOverlay() {
  const [shouldMount, setShouldMount] = useState(false);

  useEffect(() => {
    const isTouch = typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches;
    // Strictly keep only for desktop 'high' tier
    if (Global3DState.quality === 'high' && !isTouch && !Global3DState.isMobile) {
      setShouldMount(true);
    }
  }, []);

  // Completely disabled on touch devices / low-medium quality tier
  if (!shouldMount) return null;

  return (
    <div
      id="nexaflow-refractive-overlay"
      className="pointer-events-none fixed inset-0 z-10 opacity-25 mix-blend-overlay transition-opacity duration-700"
      style={{
        backdropFilter: 'url(#nexaflow-refraction-filter)',
        WebkitBackdropFilter: 'url(#nexaflow-refraction-filter)',
      }}
    />
  );
}
