import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float, MeshTransmissionMaterial } from '@react-three/drei';
import * as THREE from 'three';
import { Global3DState } from './state';

export function NexaflowCore() {
  const groupRef = useRef<THREE.Group>(null);
  const outerMeshRef = useRef<THREE.Mesh>(null);
  const innerMeshRef = useRef<THREE.Mesh>(null);
  const materialRef = useRef<any>(null);

  const customUniforms = useMemo(() => ({
    uTime: { value: 0 },
    uPointer: { value: new THREE.Vector2() },
    uScroll: { value: 0 },
  }), []);

  // Use a custom onBeforeCompile to deform the vertices organically on the GPU
  const onBeforeCompile = (shader: any) => {
    shader.uniforms.uTime = customUniforms.uTime;
    shader.uniforms.uPointer = customUniforms.uPointer;
    shader.uniforms.uScroll = customUniforms.uScroll;

    // Inject Simplex Noise
    shader.vertexShader = `
      uniform float uTime;
      uniform vec2 uPointer;
      uniform float uScroll;

      // GLSL Simplex Noise function
      vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
      vec4 mod289(vec4 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
      vec4 permute(vec4 x) { return mod289(((x*34.0)+1.0)*x); }
      vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }
      float snoise(vec3 v) {
        const vec2  C = vec2(1.0/6.0, 1.0/3.0) ;
        const vec4  D = vec4(0.0, 0.5, 1.0, 2.0);
        vec3 i  = floor(v + dot(v, C.yyy) );
        vec3 x0 = v - i + dot(i, C.xxx) ;
        vec3 g = step(x0.yzx, x0.xyz);
        vec3 l = 1.0 - g;
        vec3 i1 = min( g.xyz, l.zxy );
        vec3 i2 = max( g.xyz, l.zxy );
        vec3 x1 = x0 - i1 + C.xxx;
        vec3 x2 = x0 - i2 + C.yyy;
        vec3 x3 = x0 - D.yyy;
        i = mod289(i);
        vec4 p = permute( permute( permute(
                  i.z + vec4(0.0, i1.z, i2.z, 1.0 ))
                + i.y + vec4(0.0, i1.y, i2.y, 1.0 ))
                + i.x + vec4(0.0, i1.x, i2.x, 1.0 ));
        float n_ = 0.142857142857;
        vec3  ns = n_ * D.wyz - D.xzx;
        vec4 j = p - 49.0 * floor(p * ns.z * ns.z);
        vec4 x_ = floor(j * ns.z);
        vec4 y_ = floor(j - 7.0 * x_ );
        vec4 x = x_ *ns.x + ns.yyyy;
        vec4 y = y_ *ns.x + ns.yyyy;
        vec4 h = 1.0 - abs(x) - abs(y);
        vec4 b0 = vec4( x.xy, y.xy );
        vec4 b1 = vec4( x.zw, y.zw );
        vec4 s0 = floor(b0)*2.0 + 1.0;
        vec4 s1 = floor(b1)*2.0 + 1.0;
        vec4 sh = -step(h, vec4(0.0));
        vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy ;
        vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww ;
        vec3 p0 = vec3(a0.xy,h.x);
        vec3 p1 = vec3(a0.zw,h.y);
        vec3 p2 = vec3(a1.xy,h.z);
        vec3 p3 = vec3(a1.zw,h.w);
        vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2, p2), dot(p3,p3)));
        p0 *= norm.x;
        p1 *= norm.y;
        p2 *= norm.z;
        p3 *= norm.w;
        vec4 m = max(0.5 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
        m = m * m;
        return 105.0 * dot( m*m, vec4( dot(p0,x0), dot(p1,x1), dot(p2,x2), dot(p3,x3) ) );
      }
      ${shader.vertexShader}
    `;

    shader.vertexShader = shader.vertexShader.replace(
      '#include <begin_vertex>',
      `
      #include <begin_vertex>

      // Calculate organic displacement based on time and position
      float noiseVal = snoise(position * 1.5 + uTime * 0.3) * 0.15;
      
      // Scroll deformation (squashes/stretches slightly)
      float scrollDeform = sin(position.y * 2.0) * uScroll * 0.1;

      // Pointer interaction pull (bulge towards pointer)
      vec3 pointerPos = vec3(uPointer.x * 2.0, uPointer.y * 2.0, 1.0);
      float distToP = distance(normalize(position), normalize(pointerPos));
      float pointerBulge = smoothstep(1.5, 0.0, distToP) * 0.1;

      // Combine displacement
      float totalDisplacement = 1.0 + noiseVal + scrollDeform + pointerBulge;
      transformed *= totalDisplacement;
      `
    );
  };

  useFrame((state) => {
    if (groupRef.current && outerMeshRef.current && innerMeshRef.current) {
      const time = state.clock.getElapsedTime();
      const { scrollProgress, pointer, isMobile } = Global3DState;
      
      // Update Uniforms
      customUniforms.uTime.value = time;
      // Damped pointer reaction for uniform (smoothing)
      customUniforms.uPointer.value.lerp(pointer, 0.05);
      customUniforms.uScroll.value = THREE.MathUtils.lerp(customUniforms.uScroll.value, scrollProgress, 0.05);

      if (!Global3DState.isInitialized) {
        Global3DState.isInitialized = true;
        Global3DState.initTime = time;
      }
      
      const timeSinceInit = time - Global3DState.initTime;
      const initScaleFactor = Math.min(timeSinceInit / 2.0, 1.0); 
      const easedInitScale = 1 - Math.pow(1 - initScaleFactor, 3);
      
      const motionMultiplier = Global3DState.prefersReducedMotion ? 0 : 1;
      const scrollInfluence = Global3DState.prefersReducedMotion ? scrollProgress * 0.2 : scrollProgress;

      // Target positioning with inertia
      // Scroll moves the core down through the interface
      const baseOffsetX = isMobile ? 0 : 1.5;
      
      // At scroll 0: y=0, z=0, scale=2.2
      // At scroll 1: y=-4.5 (moves down), z=-1, scale=1.4
      const targetY = THREE.MathUtils.lerp(0, -4.5, scrollInfluence) + (pointer.y * 0.3 * motionMultiplier); 
      const targetZ = THREE.MathUtils.lerp(0, -1, scrollInfluence); 
      const targetScale = THREE.MathUtils.lerp(2.2, 1.4, scrollInfluence) * easedInitScale;
      
      // Apply smooth interpolation (inertia) to position
      groupRef.current.position.y = THREE.MathUtils.lerp(groupRef.current.position.y, targetY + Math.sin(time * 0.5) * 0.1 * motionMultiplier, 0.05);
      groupRef.current.position.z = THREE.MathUtils.lerp(groupRef.current.position.z, targetZ, 0.05);
      groupRef.current.position.x = THREE.MathUtils.lerp(groupRef.current.position.x, baseOffsetX + (pointer.x * 0.6 * motionMultiplier), 0.05);
      
      // Scale with smooth interpolation
      groupRef.current.scale.setScalar(THREE.MathUtils.lerp(groupRef.current.scale.x, targetScale, 0.05));

      // Rotations with inertia
      // Idle rotation + scroll-driven rotation + pointer lean
      const targetRotX = (time * 0.05 * motionMultiplier) + (scrollInfluence * Math.PI) + (pointer.y * 0.4 * motionMultiplier);
      const targetRotY = (time * 0.1 * motionMultiplier) + (pointer.x * 0.5 * motionMultiplier);
      
      groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, targetRotX, 0.05);
      groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, targetRotY, 0.05);

      // Inner core counter-rotation
      innerMeshRef.current.rotation.x = -time * 0.1 * motionMultiplier;
      innerMeshRef.current.rotation.y = time * 0.2 * motionMultiplier;
      innerMeshRef.current.position.x = Math.sin(time * 1.2) * 0.05 * motionMultiplier;
      innerMeshRef.current.position.y = Math.cos(time * 1.5) * 0.05 * motionMultiplier;

      // Material properties change on scroll
      if (materialRef.current) {
        if (Global3DState.quality === 'high') {
          // As you scroll down, it becomes more distorted/liquid on high tier
          materialRef.current.distortion = THREE.MathUtils.lerp(0.5, 1.8 * motionMultiplier, scrollInfluence);
          materialRef.current.thickness = THREE.MathUtils.lerp(2.5, 4.0, scrollInfluence);
          materialRef.current.chromaticAberration = THREE.MathUtils.lerp(0.8, 1.5 * motionMultiplier, scrollInfluence);
        } else {
          // Standard meshPhysicalMaterial properties on low and medium tiers (no offscreen render pass)
          materialRef.current.roughness = THREE.MathUtils.lerp(
            Global3DState.quality === 'medium' ? 0.15 : 0.25,
            Global3DState.quality === 'medium' ? 0.25 : 0.35,
            scrollInfluence
          );
        }
      }
    }
  });

  const quality = Global3DState.quality;
  // Detail levels: high=32, medium=16, low=8 (reduced from 64/16)
  const detail = quality === 'high' ? 32 : quality === 'medium' ? 16 : 8;
  const innerDetail = quality === 'high' ? 24 : quality === 'medium' ? 16 : 8;

  return (
    <group ref={groupRef}>
      {/* Outer Premium Nexaflow Core (Refractive Glass on High tier; cheap meshPhysicalMaterial on Low/Med) */}
      <mesh ref={outerMeshRef}>
        <icosahedronGeometry args={[1, detail]} />
        {quality === 'high' ? (
          <MeshTransmissionMaterial
            ref={materialRef}
            onBeforeCompile={onBeforeCompile}
            backside
            samples={6}
            resolution={1024}
            thickness={2.5}
            roughness={0.1}
            transmission={1}
            ior={1.3}
            chromaticAberration={0.8}
            anisotropy={0.3}
            distortion={1.0}
            distortionScale={0.3}
            temporalDistortion={0.2}
            iridescence={1.2}
            iridescenceIOR={1.1}
            iridescenceThicknessRange={[100, 800]}
            color="#ffffff"
            attenuationDistance={2}
            attenuationColor="#06b6d4"
            clearcoat={1}
            clearcoatRoughness={0.1}
          />
        ) : (
          <meshPhysicalMaterial
            ref={materialRef}
            onBeforeCompile={onBeforeCompile}
            transparent
            opacity={quality === 'medium' ? 0.85 : 0.75}
            roughness={quality === 'medium' ? 0.15 : 0.25}
            transmission={quality === 'medium' ? 0.6 : 0.3}
            ior={1.2}
            thickness={1.5}
            color="#ffffff"
            clearcoat={quality === 'medium' ? 0.8 : 0.4}
            clearcoatRoughness={0.2}
            metalness={0.05}
          />
        )}
      </mesh>
      
      {/* Inner Dynamic Energy Core */}
      <mesh ref={innerMeshRef} scale={0.5}>
        <icosahedronGeometry args={[1, innerDetail]} />
        <meshPhysicalMaterial 
          color="#a855f7"
          emissive="#3b82f6"
          emissiveIntensity={quality === 'low' ? 1.5 : 2.5}
          roughness={0.2}
          metalness={0.8}
          iridescence={quality === 'high' ? 1.5 : 0}
          iridescenceIOR={1.5}
          iridescenceThicknessRange={[200, 600]}
          wireframe={true}
          transparent
          opacity={0.6}
        />
      </mesh>

      {/* Internal dense particle node */}
      <mesh scale={0.2}>
        <sphereGeometry args={[1, quality === 'low' ? 8 : 16, quality === 'low' ? 8 : 16]} />
        <meshBasicMaterial color="#ffffff" transparent opacity={0.9} />
      </mesh>
    </group>
  );
}
