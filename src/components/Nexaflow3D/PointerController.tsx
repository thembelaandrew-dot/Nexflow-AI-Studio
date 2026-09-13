import { useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { Global3DState } from './state';
import * as THREE from 'three';

export function PointerController() {
  useEffect(() => {
    const handlePointerMove = (e: PointerEvent) => {
      // Normalize to -1 to 1
      Global3DState.targetPointer.x = (e.clientX / window.innerWidth) * 2 - 1;
      Global3DState.targetPointer.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };

    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    
    return () => window.removeEventListener('pointermove', handlePointerMove);
  }, []);

  useFrame((_, delta) => {
    // Exponential smoothing for pointer
    Global3DState.pointer.x = THREE.MathUtils.lerp(
      Global3DState.pointer.x,
      Global3DState.targetPointer.x,
      1 - Math.exp(-delta * 8)
    );
    Global3DState.pointer.y = THREE.MathUtils.lerp(
      Global3DState.pointer.y,
      Global3DState.targetPointer.y,
      1 - Math.exp(-delta * 8)
    );
  });

  return null;
}
