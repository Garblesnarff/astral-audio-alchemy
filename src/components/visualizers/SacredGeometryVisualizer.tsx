import React, { useRef, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, MeshDistortMaterial, Sphere, Torus } from '@react-three/drei';
import * as THREE from 'three';
import audioEngine from '@/utils/audioEngine';

interface SacredGeometryVisualizerProps {
  isPlaying: boolean;
}

// Merkaba (Star Tetrahedron) - Sacred geometry representing light body
const Merkaba = ({ audioData }: { audioData: Uint8Array }) => {
  const groupRef = useRef<THREE.Group>(null);
  const materialRef1 = useRef<THREE.MeshStandardMaterial>(null);
  const materialRef2 = useRef<THREE.MeshStandardMaterial>(null);

  useFrame((state) => {
    if (!groupRef.current) return;

    // Calculate average frequency intensity
    const avgIntensity = audioData.reduce((a, b) => a + b, 0) / audioData.length / 255;

    // Rotate both tetrahedrons in opposite directions
    groupRef.current.children[0].rotation.y += 0.01 * (1 + avgIntensity);
    groupRef.current.children[1].rotation.y -= 0.01 * (1 + avgIntensity);

    // Pulsing effect based on audio
    const scale = 1 + avgIntensity * 0.3;
    groupRef.current.scale.set(scale, scale, scale);

    // Color shifting based on frequency
    const hue = (state.clock.elapsedTime * 0.1 + avgIntensity) % 1;
    if (materialRef1.current) {
      materialRef1.current.color.setHSL(hue, 0.8, 0.5);
      materialRef1.current.emissive.setHSL(hue, 1, 0.3);
    }
    if (materialRef2.current) {
      materialRef2.current.color.setHSL((hue + 0.5) % 1, 0.8, 0.5);
      materialRef2.current.emissive.setHSL((hue + 0.5) % 1, 1, 0.3);
    }
  });

  return (
    <group ref={groupRef}>
      {/* Upward pointing tetrahedron */}
      <mesh rotation={[0, 0, 0]}>
        <tetrahedronGeometry args={[2, 0]} />
        <meshStandardMaterial
          ref={materialRef1}
          color="#9f7aea"
          emissive="#7c3aed"
          emissiveIntensity={0.5}
          transparent
          opacity={0.7}
          wireframe
        />
      </mesh>
      {/* Downward pointing tetrahedron */}
      <mesh rotation={[0, Math.PI, 0]}>
        <tetrahedronGeometry args={[2, 0]} />
        <meshStandardMaterial
          ref={materialRef2}
          color="#06b6d4"
          emissive="#0891b2"
          emissiveIntensity={0.5}
          transparent
          opacity={0.7}
          wireframe
        />
      </mesh>
    </group>
  );
};

// Energy Torus - Represents energy field
const EnergyTorus = ({ audioData }: { audioData: Uint8Array }) => {
  const torusRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!torusRef.current) return;

    // Rotate torus
    torusRef.current.rotation.x += 0.005;
    torusRef.current.rotation.z += 0.003;

    // Low frequency influence (bass)
    const lowFreq = audioData.slice(0, 10).reduce((a, b) => a + b, 0) / 10 / 255;
    const scale = 1 + lowFreq * 0.5;
    torusRef.current.scale.set(scale, scale, scale);
  });

  return (
    <Torus
      ref={torusRef}
      args={[3, 0.3, 16, 100]}
      position={[0, 0, 0]}
    >
      <meshStandardMaterial
        color="#a855f7"
        emissive="#7c3aed"
        emissiveIntensity={0.3}
        transparent
        opacity={0.4}
        wireframe
      />
    </Torus>
  );
};

// Central Sphere - Consciousness core
const ConsciousnessSphere = ({ audioData }: { audioData: Uint8Array }) => {
  const sphereRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!sphereRef.current) return;

    // High frequency influence (meditation states)
    const highFreq = audioData.slice(50, 80).reduce((a, b) => a + b, 0) / 30 / 255;

    // Breathing effect
    const breathe = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
    const scale = 1 + breathe + highFreq * 0.3;
    sphereRef.current.scale.set(scale, scale, scale);
  });

  return (
    <Sphere ref={sphereRef} args={[1, 32, 32]}>
      <MeshDistortMaterial
        color="#c084fc"
        emissive="#9333ea"
        emissiveIntensity={0.6}
        distort={0.3}
        speed={2}
        transparent
        opacity={0.8}
      />
    </Sphere>
  );
};

// Orbiting particles representing consciousness expansion
const ConsciousnessParticles = ({ audioData }: { audioData: Uint8Array }) => {
  const particlesRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!particlesRef.current) return;

    particlesRef.current.rotation.y += 0.002;

    // Make particles orbit based on mid-range frequencies
    const midFreq = audioData.slice(20, 50).reduce((a, b) => a + b, 0) / 30 / 255;
    particlesRef.current.children.forEach((particle, i) => {
      const angle = (state.clock.elapsedTime * 0.5 + i * 0.5) * (1 + midFreq);
      const radius = 4 + Math.sin(state.clock.elapsedTime + i) * 0.5;
      particle.position.x = Math.cos(angle) * radius;
      particle.position.z = Math.sin(angle) * radius;
      particle.position.y = Math.sin(state.clock.elapsedTime + i) * 2;
    });
  });

  return (
    <group ref={particlesRef}>
      {[...Array(12)].map((_, i) => (
        <mesh key={i} position={[4, 0, 0]}>
          <sphereGeometry args={[0.1, 8, 8]} />
          <meshStandardMaterial
            color="#fbbf24"
            emissive="#f59e0b"
            emissiveIntensity={0.8}
          />
        </mesh>
      ))}
    </group>
  );
};

// Main Scene
const SacredGeometryScene = ({ isPlaying }: { isPlaying: boolean }) => {
  const [audioData, setAudioData] = React.useState<Uint8Array>(new Uint8Array(128));

  useFrame(() => {
    if (!isPlaying) return;

    const analyser = audioEngine.getAnalyser();
    if (analyser) {
      const data = new Uint8Array(analyser.frequencyBinCount);
      analyser.getByteFrequencyData(data);
      setAudioData(data.slice(0, 128));
    }
  });

  return (
    <>
      {/* Lighting */}
      <ambientLight intensity={0.3} />
      <pointLight position={[10, 10, 10]} intensity={1} color="#9333ea" />
      <pointLight position={[-10, -10, -10]} intensity={0.5} color="#06b6d4" />

      {/* Sacred Geometry Elements */}
      <Merkaba audioData={audioData} />
      <EnergyTorus audioData={audioData} />
      <ConsciousnessSphere audioData={audioData} />
      <ConsciousnessParticles audioData={audioData} />

      {/* Camera Controls */}
      <OrbitControls
        enableZoom={true}
        enablePan={false}
        maxDistance={15}
        minDistance={5}
        autoRotate={isPlaying}
        autoRotateSpeed={0.5}
      />
    </>
  );
};

// Main Component
const SacredGeometryVisualizer: React.FC<SacredGeometryVisualizerProps> = ({ isPlaying }) => {
  return (
    <div className="w-full h-[400px] rounded-lg overflow-hidden bg-gradient-to-b from-purple-900/20 to-black border border-purple-500/30">
      <Canvas
        camera={{ position: [0, 0, 10], fov: 50 }}
        className="w-full h-full"
      >
        <color attach="background" args={['#000000']} />
        <fog attach="fog" args={['#000000', 5, 20]} />
        <SacredGeometryScene isPlaying={isPlaying} />
      </Canvas>
    </div>
  );
};

export default SacredGeometryVisualizer;
