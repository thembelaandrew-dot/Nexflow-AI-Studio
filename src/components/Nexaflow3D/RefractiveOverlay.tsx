import React, { useEffect, useRef } from 'react';
import { Global3DState } from './state';

/**
 * RefractiveOverlay
 * Renders the dimensional optical lens over the digital environment,
 * synchronized with 3D Core coordinates to create genuine liquid-glass refraction,
 * edge curvature distortion, and subtle chromatic dispersion.
 */
export const RefractiveOverlay: React.FC = () => {
  const lensRef = useRef<HTMLDivElement>(null);
  const glintRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let animId: number;

    const syncLens = () => {
      if (lensRef.current) {
        const { corePosition, coreScale, pointer, prefersReducedMotion } = Global3DState;

        // Project Three.js camera coordinates (camera fov 45, z=8) into screen percentages
        // At z=0, visible frustum width is ~2 * 8 * tan(22.5 deg) * (w/h)
        const aspect = window.innerWidth / window.innerHeight;
        const vFovRad = (45 * Math.PI) / 180;
        const visibleHeightAtOrigin = 2 * Math.tan(vFovRad / 2) * 8;
        const visibleWidthAtOrigin = visibleHeightAtOrigin * aspect;

        // Convert 3D world pos to screen pixels
        const screenX = window.innerWidth / 2 + (corePosition.x / visibleWidthAtOrigin) * window.innerWidth;
        const screenY = window.innerHeight / 2 - (corePosition.y / visibleHeightAtOrigin) * window.innerHeight;

        // Convert 3D scale to pixel diameter
        const pixelDiameter = (coreScale / visibleHeightAtOrigin) * window.innerHeight * 1.8;

        const tiltX = prefersReducedMotion ? 0 : pointer.y * 14;
        const tiltY = prefersReducedMotion ? 0 : -pointer.x * 16;

        lensRef.current.style.transform = `translate3d(${screenX - pixelDiameter / 2}px, ${screenY - pixelDiameter / 2}px, 0) rotateX(${tiltX}deg) rotateY(${tiltY}deg)`;
        lensRef.current.style.width = `${pixelDiameter}px`;
        lensRef.current.style.height = `${pixelDiameter}px`;

        // Specular highlight reaction to pointer angle
        if (glintRef.current && !prefersReducedMotion) {
          const glintX = 50 + pointer.x * 30;
          const glintY = 50 - pointer.y * 30;
          glintRef.current.style.background = `radial-gradient(circle at ${glintX}% ${glintY}%, rgba(255,255,255,0.35) 0%, rgba(6,182,212,0.15) 30%, transparent 70%)`;
        }
      }

      animId = requestAnimationFrame(syncLens);
    };

    animId = requestAnimationFrame(syncLens);
    return () => cancelAnimationFrame(animId);
  }, []);

  return (
    <div 
      ref={lensRef}
      className="pointer-events-none fixed top-0 left-0 z-[5] rounded-full will-change-transform transition-opacity duration-500"
      style={{
        boxShadow: '0 0 60px -15px rgba(6, 182, 212, 0.25), inset 0 0 35px -5px rgba(59, 130, 246, 0.2)',
      }}
    >
      {/* 1. True SVG Refraction Filter Layer */}
      <div 
        className="absolute inset-0 rounded-full"
        style={{
          backdropFilter: 'url(#nexaflow-core-refraction) blur(0.8px)',
          WebkitBackdropFilter: 'url(#nexaflow-core-refraction) blur(0.8px)',
        }}
      />

      {/* 2. Edge-Weighted Curvature Mask (Subtle center, strong optical rim) */}
      <div 
        className="absolute inset-0 rounded-full border border-white/15"
        style={{
          background: 'radial-gradient(circle at 45% 45%, rgba(6, 182, 212, 0.02) 0%, rgba(11, 19, 41, 0.2) 65%, rgba(59, 130, 246, 0.15) 100%)',
          backdropFilter: 'blur(3px)',
          WebkitBackdropFilter: 'blur(3px)',
          maskImage: 'radial-gradient(circle, transparent 40%, black 100%)',
          WebkitMaskImage: 'radial-gradient(circle, transparent 40%, black 100%)',
        }}
      />

      {/* 3. Subtle Chromatic Dispersion Rim Ring */}
      <div 
        className="absolute inset-[-1px] rounded-full pointer-events-none opacity-70"
        style={{
          background: 'linear-gradient(135deg, rgba(6, 182, 212, 0.5) 0%, rgba(255, 255, 255, 0.2) 40%, rgba(59, 130, 246, 0.4) 100%)',
          maskImage: 'radial-gradient(circle, transparent 92%, black 100%)',
          WebkitMaskImage: 'radial-gradient(circle, transparent 92%, black 100%)',
        }}
      />

      {/* 4. Dynamic Specular Lighting Glint */}
      <div 
        ref={glintRef}
        className="absolute inset-0 rounded-full pointer-events-none opacity-80 mix-blend-screen"
        style={{
          background: 'radial-gradient(circle at 40% 35%, rgba(255,255,255,0.3) 0%, rgba(6,182,212,0.12) 35%, transparent 65%)',
        }}
      />
    </div>
  );
};
