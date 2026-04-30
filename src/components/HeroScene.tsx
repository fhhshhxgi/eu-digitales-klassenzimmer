import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Stars, Text, MeshDistortMaterial, PerspectiveCamera } from '@react-three/drei';
import * as THREE from 'three';

function StarCircle() {
  const groupRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.getElapsedTime() * 0.2;
    }
  });

  return (
    <group ref={groupRef}>
      {Array.from({ length: 12 }).map((_, i) => {
        const angle = (i / 12) * Math.PI * 2;
        const radius = 3.5;
        return (
          <Float key={i} speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
            <mesh position={[Math.cos(angle) * radius, Math.sin(angle) * radius, 0]}>
              <sphereGeometry args={[0.15, 16, 16]} />
              <meshStandardMaterial 
                color="#FFCC00" 
                emissive="#FFCC00" 
                emissiveIntensity={2} 
                toneMapped={false}
              />
            </mesh>
          </Float>
        );
      })}
    </group>
  );
}

function Globe() {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.1;
    }
  });

  return (
    <mesh ref={meshRef}>
      <sphereGeometry args={[2, 64, 64]} />
      <MeshDistortMaterial
        color="#003399"
        speed={1}
        distort={0.2}
        radius={1}
        emissive="#001A4D"
        roughness={0.4}
        metalness={0.8}
      />
    </mesh>
  );
}

export function HeroScene() {
  return (
    <div className="absolute inset-0 z-0">
      <Canvas shadows>
        <PerspectiveCamera makeDefault position={[0, 0, 10]} fov={50} />
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} color="#FFCC00" />
        <spotLight position={[-10, 10, 10]} angle={0.15} penumbra={1} intensity={1} color="#003399" />
        
        <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
        
        <group position={[0, 0, 0]}>
          <StarCircle />
          <Globe />
        </group>
        
        <fog attach="fog" args={['#001A4D', 5, 20]} />
      </Canvas>
    </div>
  );
}
