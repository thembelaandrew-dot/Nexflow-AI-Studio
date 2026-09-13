import { Canvas } from '@react-three/fiber';
import { Environment } from '@react-three/drei';
import { NexaflowCore } from './NexaflowCore';
import { BackgroundEnvironment } from './BackgroundEnvironment';
import { ScrollController } from './ScrollController';
import { PointerController } from './PointerController';
import { Global3DState } from './state';
import { useEffect } from 'react';

// Adaptive Performance Manager
function PerformanceManager() {
  useEffect(() => {
    // Detect mobile or low power
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    Global3DState.isMobile = isMobile;
    
    // Detect reduced motion
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    Global3DState.prefersReducedMotion = mediaQuery.matches;
    
    const handleMotionChange = (e: MediaQueryListEvent) => {
      Global3DState.prefersReducedMotion = e.matches;
    };
    mediaQuery.addEventListener('change', handleMotionChange);

    // Set initial quality based on simple heuristic
    if (isMobile || navigator.hardwareConcurrency <= 4) {
      Global3DState.quality = 'low';
    } else if (navigator.hardwareConcurrency <= 8) {
      Global3DState.quality = 'medium';
    } else {
      Global3DState.quality = 'high';
    }
  }, []);
  return null;
}

export default function Nexaflow3D() {
  return (
    <div className="fixed inset-0 z-0 w-full h-full bg-[#02050c] overflow-hidden pointer-events-none">
      <Canvas 
        camera={{ position: [0, 0, 8], fov: 45 }} 
        dpr={[1, 1.5]} 
        gl={{ 
          powerPreference: "high-performance", 
          antialias: false, 
          alpha: false,
          stencil: false,
          depth: true
        }}
      >
        <PerformanceManager />
        <ScrollController />
        <PointerController />
        <color attach="background" args={['#02050c']} />
        
        {/* Environment Lighting */}
        <ambientLight intensity={0.4} color="#ffffff" />
        <directionalLight position={[10, 10, 10]} intensity={2.5} color="#3b82f6" />
        <directionalLight position={[-10, -10, -10]} intensity={1.5} color="#06b6d4" />
        <directionalLight position={[0, -10, 5]} intensity={1.5} color="#a855f7" />
        <directionalLight position={[0, 0, 10]} intensity={0.5} color="#ffffff" />
        
        {/* Animated Background for Refraction */}
        <BackgroundEnvironment />
        
        {/* The single dominant Nexaflow Core */}
        <NexaflowCore />
        
        {/* Procedural Environment to avoid external HDRI fetches that can 503 */}
        <Environment resolution={256}>
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
      </Canvas>
    </div>
  );
}
