import { useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { Global3DState } from './state';
import * as THREE from 'three';

export function ScrollController() {
  useEffect(() => {
    const handleScroll = () => {
      const maxScroll = Math.max(document.documentElement.scrollHeight - window.innerHeight, 1);
      Global3DState.targetScrollProgress = Math.min(Math.max(window.scrollY / maxScroll, 0), 1);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    
    // Initial call
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useFrame((_, delta) => {
    // Exponential smoothing for scroll progress
    Global3DState.scrollProgress = THREE.MathUtils.lerp(
      Global3DState.scrollProgress,
      Global3DState.targetScrollProgress,
      1 - Math.exp(-delta * 5) // Smoothing factor
    );
  });

  return null;
}
