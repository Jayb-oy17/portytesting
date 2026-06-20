"use client";

import { useRef, useMemo, useEffect, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

// The Particles
function ParticleField({
  count = 2500,
  isDark,
}: {
  count?: number;
  isDark: boolean;
}) {
  const pointsRef = useRef<THREE.Points>(null);

  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count * 3; i++) {
      positions[i] = (Math.random() - 0.5) * 15;
    }
    geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    return geo;
  }, [count]);

  useFrame((state) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.x = state.clock.elapsedTime * 0.03;
      pointsRef.current.rotation.y = state.clock.elapsedTime * 0.05;
    }
  });

  return (
    <points ref={pointsRef} geometry={geometry}>
      <pointsMaterial
        size={0.03}
        color={isDark ? "#8b5cf6" : "#4f46e5"} // Violet (Dark) / Indigo (Light)
        sizeAttenuation
        transparent
        opacity={0.7}
        depthWrite={false}
      />
    </points>
  );
}

// Camera follows mouse globally
function CameraRig() {
  const mouse = useRef({ x: 0, y: 0 });

  useEffect(() => {
    // Listen to mouse movement on the whole window
    const handleMouseMove = (event: MouseEvent) => {
      mouse.current.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouse.current.y = -(event.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  useFrame(({ camera }) => {
    // Smooth camera movement
    camera.position.x += (mouse.current.x * 1.2 - camera.position.x) * 0.05;
    camera.position.y += (mouse.current.y * 0.8 - camera.position.y) * 0.05;
    camera.lookAt(0, 0, 0);
  });
  return null;
}

export default function BackgroundCanvas() {
  const [isDark, setIsDark] = useState(false);

  // Automatically detect system theme
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    setIsDark(mediaQuery.matches);
    const handleChange = () => setIsDark(mediaQuery.matches);
    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  return (
    // Fixed positioning makes it cover the whole screen.
    // -z-10 puts it behind everything.
    // pointer-events-none lets users click things on top of it.
    <div className="fixed inset-0 -z-10 pointer-events-none">
      <Canvas
        camera={{ position: [0, 0, 6], fov: 60 }}
        style={{ background: "transparent" }}
      >
        <CameraRig />
        <ParticleField count={2500} isDark={isDark} />
      </Canvas>
    </div>
  );
}
