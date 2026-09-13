import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { Global3DState } from './state';

export function BackgroundEnvironment() {
  const groupRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (groupRef.current) {
      const time = state.clock.getElapsedTime();
      const { scrollProgress } = Global3DState;
      
      // Slowly rotate the abstract environment
      groupRef.current.rotation.z = time * 0.05;
      groupRef.current.rotation.y = time * 0.03;
      
      // Shift on scroll to give parallax
      groupRef.current.position.y = scrollProgress * 5;
    }
  });

  return (
    <group ref={groupRef} position={[0, 0, -15]} scale={1.5}>
      {/* Abstract floating gradient planes that will be refracted by the Core */}
      <mesh position={[8, 5, -5]} rotation={[0, 0, Math.PI / 4]}>
        <planeGeometry args={[20, 30]} />
        <meshBasicMaterial color="#06b6d4" transparent opacity={0.3} depthWrite={false} />
      </mesh>
      
      <mesh position={[-8, -5, -10]} rotation={[0, 0, -Math.PI / 6]}>
        <planeGeometry args={[25, 25]} />
        <meshBasicMaterial color="#3b82f6" transparent opacity={0.2} depthWrite={false} />
      </mesh>

      <mesh position={[0, 10, -8]} rotation={[0, 0, Math.PI / 8]}>
        <planeGeometry args={[30, 15]} />
        <meshBasicMaterial color="#a855f7" transparent opacity={0.2} depthWrite={false} />
      </mesh>

      <mesh position={[-12, 10, -12]} rotation={[0, 0, Math.PI / 3]}>
        <planeGeometry args={[20, 20]} />
        <meshBasicMaterial color="#ec4899" transparent opacity={0.15} depthWrite={false} />
      </mesh>
    </group>
  );
}
