import { useRef, useMemo, useState, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Environment, Float, MeshTransmissionMaterial } from '@react-three/drei';
import * as THREE from 'three';

// An abstract object that deforms and rotates based on scroll
function MorphingCore() {
  const mesh = useRef<THREE.Mesh>(null);
  const materialRef = useRef<any>(null);
  const [scrollY, setScrollY] = useState(0);
  const { viewport, mouse } = useThree();

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useFrame((state) => {
    if (mesh.current) {
      const time = state.clock.getElapsedTime();
      
      // Base slow rotation
      mesh.current.rotation.x = time * 0.1;
      mesh.current.rotation.y = time * 0.15;
      
      // Scroll-based interaction
      const maxScroll = Math.max(document.documentElement.scrollHeight - window.innerHeight, 1);
      const scrollProgress = Math.min(scrollY / maxScroll, 1);
      
      mesh.current.rotation.x += scrollProgress * Math.PI * 4;
      mesh.current.rotation.y += scrollProgress * Math.PI * 2;

      // Keep the bubble visible at all times, just drift it slightly
      // It stays in the background, slightly shifting position
      const targetY = THREE.MathUtils.lerp(0, Math.sin(time) * 0.5, 0.1); 
      const targetZ = THREE.MathUtils.lerp(0, -3, scrollProgress); // Push it slightly back on scroll, but not completely away
      const targetScale = THREE.MathUtils.lerp(2.5, 2.0, scrollProgress);
      
      // Add subtle mouse parallax
      const parallaxX = (mouse.x * viewport.width) / 15;
      const parallaxY = (mouse.y * viewport.height) / 15;

      mesh.current.position.x = THREE.MathUtils.lerp(mesh.current.position.x, parallaxX, 0.05);
      mesh.current.position.y = THREE.MathUtils.lerp(mesh.current.position.y, targetY + parallaxY, 0.05);
      mesh.current.position.z = THREE.MathUtils.lerp(mesh.current.position.z, targetZ, 0.05);
      mesh.current.scale.setScalar(THREE.MathUtils.lerp(mesh.current.scale.x, targetScale, 0.05));

      if (materialRef.current) {
        // Increase distortion based on scroll to make it look "hyper interactive"
        materialRef.current.distortion = THREE.MathUtils.lerp(0.3, 1.8, scrollProgress);
        materialRef.current.thickness = THREE.MathUtils.lerp(1.5, 3.0, scrollProgress);
      }
    }
  });

  return (
    <Float speed={2} rotationIntensity={1} floatIntensity={2}>
      <mesh ref={mesh} scale={2.5}>
        <icosahedronGeometry args={[1, 32]} />
        {/* Optimized material settings for performance, but retaining the beautiful glass look */}
        <MeshTransmissionMaterial
          ref={materialRef}
          backside
          samples={4} 
          resolution={256}
          thickness={1.5}
          chromaticAberration={0.3}
          anisotropy={0.3}
          distortion={0.3}
          distortionScale={0.5}
          temporalDistortion={0.4}
          iridescence={1}
          iridescenceIOR={1}
          iridescenceThicknessRange={[0, 1400]}
          color="#06b6d4"
          attenuationDistance={2}
          attenuationColor="#3b82f6"
        />
      </mesh>
    </Float>
  );
}

// Background glowing particles that drift and react to scroll
function ParticleField() {
  const count = 400; 
  const positions = useMemo(() => {
    const p = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      p[i * 3] = (Math.random() - 0.5) * 30; // x
      p[i * 3 + 1] = (Math.random() - 0.5) * 30; // y
      p[i * 3 + 2] = (Math.random() - 0.5) * 20; // z
    }
    return p;
  }, [count]);

  const points = useRef<THREE.Points>(null);
  const { mouse } = useThree();

  useFrame((state) => {
    if (points.current) {
      points.current.rotation.y = state.clock.getElapsedTime() * 0.02;
      
      // Parallax for particles
      const targetX = -mouse.x * 1.5;
      const targetY = (window.scrollY * 0.002) - mouse.y * 1.5;
      
      points.current.position.x = THREE.MathUtils.lerp(points.current.position.x, targetX, 0.05);
      points.current.position.y = THREE.MathUtils.lerp(points.current.position.y, targetY, 0.05);
    }
  });

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial size={0.08} color="#06b6d4" transparent opacity={0.6} sizeAttenuation blending={THREE.AdditiveBlending} />
    </points>
  );
}

export default function Scene3D() {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none w-full h-full bg-[#02050c]">
      <Canvas 
        camera={{ position: [0, 0, 8], fov: 45 }} 
        dpr={[1, 1.5]} 
        gl={{ powerPreference: "high-performance", antialias: false, alpha: false }}
      >
        <color attach="background" args={['#02050c']} />
        <ambientLight intensity={0.6} />
        <directionalLight position={[10, 10, 10]} intensity={2.5} color="#3b82f6" />
        <directionalLight position={[-10, -10, -10]} intensity={1.5} color="#06b6d4" />
        <directionalLight position={[0, 0, 10]} intensity={1} color="#ffffff" />
        <MorphingCore />
        <ParticleField />
        <Environment preset="city" />
      </Canvas>
    </div>
  );
}
