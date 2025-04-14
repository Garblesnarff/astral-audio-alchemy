
import React, { useEffect, useState, useRef } from 'react';
import WaveformBars from './visualizers/WaveformBars';
import AlienVisualizer from './visualizers/AlienVisualizer';
import AstralVisualizer from './visualizers/AstralVisualizer';
import RemoteVisualizer from './visualizers/RemoteVisualizer';
import LucidVisualizer from './visualizers/LucidVisualizer';
import { 
  generateDefaultBars, 
  generateAlienBars, 
  generateAstralBars, 
  generateRemoteViewingBars,
  generateLucidDreamingBars,
  type BarType
} from './visualizers/BarGenerator';
import {
  initializeAlienParticles,
  initializeAstralParticles,
  initializeRemoteViewingParticles
} from './visualizers/ParticleGenerator';

interface WaveformVisualizerProps {
  isPlaying: boolean;
  preset: string;
}

const WaveformVisualizer: React.FC<WaveformVisualizerProps> = ({ isPlaying, preset }) => {
  const [bars, setBars] = useState<BarType[]>([]);
  const [particles, setParticles] = useState<Array<{ x: number; y: number; size: number; speed: number; color: string }>>([]);
  const particleRef = useRef<HTMLDivElement>(null);
  
  // Generate initial bars based on preset
  useEffect(() => {
    // Create appropriate bar configuration based on preset
    if (preset === 'alien') {
      setBars(generateAlienBars());
      
      // Initialize particles for alien preset
      if (isPlaying) {
        setParticles(initializeAlienParticles());
      }
    } else if (preset.startsWith('astral-')) {
      setBars(generateAstralBars(preset));
      
      // Initialize particles for astral preset
      if (isPlaying) {
        setParticles(initializeAstralParticles());
      }
    } else if (preset.startsWith('remote-')) {
      setBars(generateRemoteViewingBars(preset));
      
      // Initialize particles for remote viewing preset
      if (isPlaying) {
        setParticles(initializeRemoteViewingParticles());
      }
    } else if (preset.startsWith('lucid-')) {
      setBars(generateLucidDreamingBars(preset));
      setParticles([]);
    } else {
      // Default visualization for other presets
      setBars(generateDefaultBars());
      setParticles([]);
    }
  }, [preset, isPlaying]);
  
  // Update particle positions for animation
  useEffect(() => {
    if (!isPlaying || particles.length === 0) return;
    
    const interval = setInterval(() => {
      setParticles(prevParticles => 
        prevParticles.map(particle => {
          // Move particles upward
          let newY = particle.y - particle.speed;
          
          // Reset position if particle goes off the top
          if (newY < 0) {
            newY = 100;
            return {
              ...particle,
              x: Math.random() * 100,
              y: newY,
              size: Math.random() * 3 + 1,
              speed: Math.random() * 1 + 0.2
            };
          }
          
          return { ...particle, y: newY };
        })
      );
    }, 50);
    
    return () => clearInterval(interval);
  }, [isPlaying, particles]);
  
  const isAlien = preset === 'alien';
  const isLucidDreaming = preset.startsWith('lucid-');
  const isAstralProjection = preset.startsWith('astral-');
  const isRemoteViewing = preset.startsWith('remote-');
  
  return (
    <div className={`transition-all duration-500 ${
      isAlien 
        ? 'border border-purple-500/30 rounded-lg p-2 bg-black/10 alien-pulse backdrop-blur-sm'
        : isLucidDreaming 
          ? 'border border-indigo-500/40 rounded-lg p-2 bg-indigo-950/10 lucid-pulse backdrop-blur-sm'
          : isAstralProjection
            ? 'border border-fuchsia-500/30 rounded-lg p-2 bg-gradient-to-r from-indigo-950/20 to-fuchsia-950/20 astral-pulse backdrop-blur-sm'
            : isRemoteViewing
              ? 'border border-indigo-400/30 rounded-lg p-2 bg-gradient-to-r from-indigo-950/20 to-purple-950/20 remote-pulse backdrop-blur-sm'
              : ''
    }`}>
      {/* Status indicators */}
      {isAlien && isPlaying && (
        <div className="absolute -top-2 -right-2 px-2 py-1 bg-purple-500 text-white text-xs rounded-full animate-pulse z-10">
          Alien Frequencies Active
        </div>
      )}
      
      {isLucidDreaming && isPlaying && (
        <div className="absolute -top-2 -right-2 px-2 py-1 bg-indigo-500 text-white text-xs rounded-full animate-pulse z-10">
          Lucid Dream Induction Active
        </div>
      )}
      
      {isAstralProjection && isPlaying && (
        <div className="absolute -top-2 -right-2 px-2 py-1 bg-fuchsia-600 text-white text-xs rounded-full animate-pulse z-10">
          Astral Projection Active
        </div>
      )}
      
      {isRemoteViewing && isPlaying && (
        <div className="absolute -top-2 -right-2 px-2 py-1 bg-indigo-600 text-white text-xs rounded-full animate-pulse z-10">
          Remote Viewing Active
        </div>
      )}
      
      {/* Specialized visualization components based on preset */}
      <div className="relative">
        {isAlien && <AlienVisualizer isPlaying={isPlaying} bars={bars} particles={particles} />}
        {isAstralProjection && <AstralVisualizer isPlaying={isPlaying} bars={bars} particles={particles} />}
        {isRemoteViewing && <RemoteVisualizer isPlaying={isPlaying} bars={bars} particles={particles} preset={preset} />}
        {isLucidDreaming && <LucidVisualizer isPlaying={isPlaying} bars={bars} />}
        
        {/* Common waveform bars for all visualization types */}
        <WaveformBars bars={bars} isPlaying={isPlaying} preset={preset} />
      </div>
    </div>
  );
};

export default WaveformVisualizer;
