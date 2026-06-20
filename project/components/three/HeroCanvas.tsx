'use client';

import { useRef, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Float, MeshDistortMaterial, Sphere, Torus, Icosahedron, Stars } from '@react-three/drei';
import * as THREE from 'three';
import { useTheme } from 'next-themes';

function FloatingOrb({ position, color, speed = 1, distort = 0.4 }: {
  position: [number, number, number];
  color: string;
  speed?: number;
  distort?: number;
}) {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (!ref.current) return;
    ref.current.rotation.x = state.clock.elapsedTime * 0.2 * speed;
    ref.current.rotation.y = state.clock.elapsedTime * 0.3 * speed;
  });
  return (
    <Float speed={speed * 1.5} rotationIntensity={0.5} floatIntensity={0.8}>
      <Sphere ref={ref} args={[1, 64, 64]} position={position}>
        <MeshDistortMaterial
          color={color}
          attach="material"
          distort={distort}
          speed={2}
          roughness={0.1}
          metalness={0.8}
          transparent
          opacity={0.85}
        />
      </Sphere>
    </Float>
  );
}

function FloatingTorus({ position, color }: { position: [number, number, number]; color: string }) {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (!ref.current) return;
    ref.current.rotation.x = state.clock.elapsedTime * 0.4;
    ref.current.rotation.y = state.clock.elapsedTime * 0.2;
  });
  return (
    <Float speed={2} rotationIntensity={1} floatIntensity={1}>
      <Torus ref={ref} args={[0.7, 0.25, 16, 100]} position={position}>
        <meshStandardMaterial color={color} metalness={0.9} roughness={0.1} />
      </Torus>
    </Float>
  );
}

function FloatingIco({ position, color }: { position: [number, number, number]; color: string }) {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (!ref.current) return;
    ref.current.rotation.x = state.clock.elapsedTime * 0.3;
    ref.current.rotation.z = state.clock.elapsedTime * 0.2;
  });
  return (
    <Float speed={1.5} rotationIntensity={0.8} floatIntensity={0.6}>
      <Icosahedron ref={ref} args={[0.8, 0]} position={position}>
        <meshStandardMaterial color={color} wireframe metalness={0.6} roughness={0.2} />
      </Icosahedron>
    </Float>
  );
}

function CursorReactive() {
  const { camera } = useThree();
  useFrame(({ mouse }) => {
    camera.position.x += (mouse.x * 0.5 - camera.position.x) * 0.05;
    camera.position.y += (mouse.y * 0.3 - camera.position.y) * 0.05;
    camera.lookAt(0, 0, 0);
  });
  return null;
}

function Scene({ isDark }: { isDark: boolean }) {
  return (
    <>
      <CursorReactive />
      <ambientLight intensity={isDark ? 0.3 : 0.6} />
      <pointLight position={[10, 10, 10]} intensity={isDark ? 1.5 : 1} color="#0ea5e9" />
      <pointLight position={[-10, -10, -10]} intensity={0.8} color="#14b8a6" />
      <pointLight position={[0, 10, -10]} intensity={0.6} color="#06b6d4" />

      {isDark && <Stars radius={100} depth={50} count={3000} factor={4} saturation={0} fade speed={1} />}

      <FloatingOrb position={[3, 1, -2]} color={isDark ? '#0ea5e9' : '#38bdf8'} speed={0.8} distort={0.5} />
      <FloatingOrb position={[-3.5, -1, -1]} color={isDark ? '#14b8a6' : '#2dd4bf'} speed={1.2} distort={0.3} />
      <FloatingOrb position={[0, 2.5, -3]} color={isDark ? '#06b6d4' : '#67e8f9'} speed={0.6} distort={0.6} />

      <FloatingTorus position={[-2, 2, -1]} color={isDark ? '#0ea5e9' : '#0284c7'} />
      <FloatingTorus position={[4, -2, -2]} color={isDark ? '#14b8a6' : '#0f766e'} />

      <FloatingIco position={[-4, -0.5, -1.5]} color={isDark ? '#38bdf8' : '#0369a1'} />
      <FloatingIco position={[2, -2.5, -2]} color={isDark ? '#5eead4' : '#0d9488'} />
    </>
  );
}

export default function HeroCanvas({ isDark }: { isDark: boolean }) {
  return (
    <Canvas
      camera={{ position: [0, 0, 8], fov: 60 }}
      style={{ background: 'transparent' }}
      gl={{ antialias: true, alpha: true }}
    >
      <Scene isDark={isDark} />
    </Canvas>
  );
}
