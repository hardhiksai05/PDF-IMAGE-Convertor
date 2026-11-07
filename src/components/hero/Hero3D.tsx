import React, { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, MeshDistortMaterial } from '@react-three/drei';
import * as THREE from 'three';
import { FallbackHero } from './FallbackHero';

function FloatingDoc({ position, color }: { position: [number, number, number]; color: string }) {
  const meshRef = useRef<THREE.Mesh>(null!);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    meshRef.current.rotation.x = Math.sin(t * 0.5) * 0.1;
    meshRef.current.rotation.y = Math.cos(t * 0.3) * 0.15;
  });

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
      <mesh ref={meshRef} position={position}>
        <boxGeometry args={[1.6, 2.2, 0.08]} />
        <meshStandardMaterial
          color={color}
          roughness={0.2}
          metalness={0.8}
          transparent
          opacity={0.9}
        />
      </mesh>
    </Float>
  );
}

function GlowingOrb({ position, color }: { position: [number, number, number]; color: string }) {
  const meshRef = useRef<THREE.Mesh>(null!);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    meshRef.current.position.y = position[1] + Math.sin(t * 1.5) * 0.2;
  });

  return (
    <mesh ref={meshRef} position={position}>
      <sphereGeometry args={[0.5, 32, 32]} />
      <MeshDistortMaterial
        color={color}
        speed={3}
        distort={0.4}
        radius={1}
        roughness={0.1}
        metalness={0.9}
      />
    </mesh>
  );
}

function Scene() {
  return (
    <>
      <ambientLight intensity={0.8} />
      <directionalLight position={[5, 8, 5]} intensity={1.5} color="#c4b5fd" />
      <pointLight position={[-4, -2, 2]} intensity={2.5} color="#06b6d4" />
      <pointLight position={[4, 2, 2]} intensity={3} color="#8b5cf6" />

      {/* Main Document: Violet PDF representation */}
      <FloatingDoc position={[0, 0, 0]} color="#7c3aed" />

      {/* Secondary Doc: Cyan JPG representation */}
      <FloatingDoc position={[-2.4, 0.4, -0.8]} color="#06b6d4" />

      {/* Tertiary Doc: Deep Blue / Indigo PNG representation */}
      <FloatingDoc position={[2.4, -0.3, -0.8]} color="#4f46e5" />

      {/* Glowing energy spheres in background */}
      <GlowingOrb position={[-3, -1.5, -2]} color="#0891b2" />
      <GlowingOrb position={[3, 1.8, -2]} color="#9333ea" />
    </>
  );
}

export const Hero3D: React.FC = () => {
  const [hasWebGl, setHasWebGl] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Check if mobile or small screen
    if (window.innerWidth < 768) {
      setIsMobile(true);
      return;
    }

    try {
      const canvas = document.createElement('canvas');
      const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
      if (!gl) setHasWebGl(false);
    } catch {
      setHasWebGl(false);
    }
  }, []);

  if (isMobile || !hasWebGl) {
    return <FallbackHero />;
  }

  return (
    <div className="relative w-full h-[400px] sm:h-[460px] flex items-center justify-center">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 45 }}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
        className="w-full h-full"
      >
        <Scene />
      </Canvas>
    </div>
  );
};
