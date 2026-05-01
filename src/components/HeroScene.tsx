import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Stars, MeshDistortMaterial, PerspectiveCamera, Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';

function ParticleField({ count = 1000 }) {
  const points = useMemo(() => {
    const p = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      p[i * 3] = (Math.random() - 0.5) * 50;
      p[i * 3 + 1] = (Math.random() - 0.5) * 50;
      p[i * 3 + 2] = (Math.random() - 0.5) * 50;
    }
    return p;
  }, [count]);

  const ref = useRef<THREE.Points>(null);
  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y = state.clock.getElapsedTime() * 0.05;
      ref.current.rotation.x = state.clock.getElapsedTime() * 0.02;
    }
  });

  return (
    <Points ref={ref} positions={points} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color="#FFCC00"
        size={0.15}
        sizeAttenuation={true}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </Points>
  );
}

function StarShape() {
  const shape = useMemo(() => {
    const s = new THREE.Shape();
    const points = 5;
    const outerRadius = 0.25;
    const innerRadius = 0.1;
    
    for (let i = 0; i < points * 2; i++) {
      const radius = i % 2 === 0 ? outerRadius : innerRadius;
      const x = Math.cos((i * Math.PI) / points) * radius;
      const y = Math.sin((i * Math.PI) / points) * radius;
      if (i === 0) s.moveTo(x, y);
      else s.lineTo(x, y);
    }
    s.closePath();
    return s;
  }, []);

  const extrudeSettings = useMemo(() => ({
    steps: 1,
    depth: 0.08,
    bevelEnabled: true,
    bevelThickness: 0.02,
    bevelSize: 0.02,
    bevelOffset: 0,
    bevelSegments: 1
  }), []);

  return <extrudeGeometry args={[shape, extrudeSettings]} />;
}

function Star({ i }: { i: number }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const glowRef = useRef<THREE.Group>(null);
  const angle = (i / 12) * Math.PI * 2;
  const radius = 3.8;
  
  const glowTexture = useMemo(() => {
    const canvas = document.createElement('canvas');
    canvas.width = 64;
    canvas.height = 64;
    const context = canvas.getContext('2d')!;
    const gradient = context.createRadialGradient(32, 32, 0, 32, 32, 32);
    gradient.addColorStop(0, 'rgba(255, 204, 0, 1)');
    gradient.addColorStop(0.1, 'rgba(255, 204, 0, 0.8)');
    gradient.addColorStop(0.3, 'rgba(255, 204, 0, 0.3)');
    gradient.addColorStop(0.6, 'rgba(255, 204, 0, 0.05)');
    gradient.addColorStop(1, 'rgba(255, 204, 0, 0)');
    context.fillStyle = gradient;
    context.fillRect(0, 0, 64, 64);
    return new THREE.CanvasTexture(canvas);
  }, []);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (meshRef.current) {
      // Steady emissive intensity instead of twinkling
      (meshRef.current.material as THREE.MeshStandardMaterial).emissiveIntensity = 6;
      meshRef.current.rotation.z = Math.sin(t * 0.3 + i) * 0.2;
    }
    if (glowRef.current) {
      glowRef.current.lookAt(state.camera.position);
      // Remove pulsating scale
      glowRef.current.scale.setScalar(1);
    }
  });

  return (
    <Float speed={0.8} rotationIntensity={0.2} floatIntensity={0.2}>
      <group position={[Math.cos(angle) * radius, Math.sin(angle) * radius, 0]}>
        <mesh ref={meshRef}>
          <StarShape />
          <meshStandardMaterial 
            color="#FFCC00" 
            emissive="#FFCC00" 
            emissiveIntensity={3} 
            toneMapped={false}
          />
        </mesh>
        
        {/* Realistic Glow Sprite */}
        <group ref={glowRef}>
          <mesh scale={2.5}>
            <planeGeometry args={[1, 1]} />
            <meshBasicMaterial 
              map={glowTexture}
              transparent 
              opacity={0.35} 
              depthWrite={false}
              blending={THREE.AdditiveBlending}
              side={THREE.DoubleSide}
            />
          </mesh>
          <mesh scale={5}>
            <planeGeometry args={[1, 1]} />
            <meshBasicMaterial 
              map={glowTexture}
              transparent 
              opacity={0.12} 
              depthWrite={false}
              blending={THREE.AdditiveBlending}
              side={THREE.DoubleSide}
            />
          </mesh>
        </group>
      </group>
    </Float>
  );
}

function StarCircle() {
  const groupRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.z = state.clock.getElapsedTime() * 0.03;
      groupRef.current.rotation.y = Math.sin(state.clock.getElapsedTime() * 0.1) * 0.05;
    }
  });

  return (
    <group ref={groupRef}>
      {Array.from({ length: 12 }).map((_, i) => (
        <Star key={i} i={i} />
      ))}
    </group>
  );
}

function DataShards() {
  const shards = useMemo(() => {
    return Array.from({ length: 8 }).map(() => ({
      position: [
        (Math.random() - 0.5) * 15,
        (Math.random() - 0.5) * 15,
        (Math.random() - 0.5) * 10
      ] as [number, number, number],
      rotation: [Math.random() * Math.PI, Math.random() * Math.PI, 0] as [number, number, number],
      scale: Math.random() * 0.4 + 0.2
    }));
  }, []);

  return (
    <group>
      {shards.map((shard, i) => (
        <Float key={i} speed={2} rotationIntensity={2} floatIntensity={1}>
          <mesh position={shard.position} rotation={shard.rotation} scale={shard.scale}>
            <octahedronGeometry args={[1, 0]} />
            <meshStandardMaterial color="#003399" transparent opacity={0.6} wireframe />
          </mesh>
        </Float>
      ))}
    </group>
  );
}

function Globe() {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.003;
    }
  });

  return (
    <mesh ref={meshRef}>
      <sphereGeometry args={[2, 64, 64]} />
      <MeshDistortMaterial
        color="#002b80"
        speed={0.3}
        distort={0.02}
        radius={1}
        emissive="#001433"
        roughness={0.1}
        metalness={0.9}
        toneMapped={false}
      />
    </mesh>
  );
}

function MouseResponsiveContainer({ children }: { children: React.ReactNode }) {
  const groupRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (groupRef.current) {
      const targetRotationX = state.mouse.y * 0.15;
      const targetRotationY = state.mouse.x * 0.15;
      groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, targetRotationX, 0.05);
      groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, targetRotationY, 0.05);
    }
  });

  return <group ref={groupRef}>{children}</group>;
}

export function HeroScene() {
  return (
    <div className="absolute inset-0 z-0 bg-[#000F26]">
      <Canvas shadows dpr={[1, 2]}>
        <PerspectiveCamera makeDefault position={[0, 0, 12]} fov={45} />
        <ambientLight intensity={0.4} />
        <pointLight position={[10, 10, 10]} intensity={2} color="#FFCC00" />
        <pointLight position={[-10, -10, 10]} intensity={1.5} color="#003399" />
        <spotLight position={[0, 5, 10]} angle={0.3} penumbra={1} intensity={2} color="#ffffff" castShadow />
        
        <Stars radius={120} depth={50} count={7000} factor={6} saturation={0.5} fade speed={1.5} />
        
        <MouseResponsiveContainer>
          <group>
            <StarCircle />
            <Globe />
          </group>
        </MouseResponsiveContainer>
        
        <fog attach="fog" args={['#000F26', 8, 25]} />
      </Canvas>
    </div>
  );
}
