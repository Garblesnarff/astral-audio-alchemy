
import React from 'react';
import { Sparkles } from 'lucide-react';

interface AlienVisualizerProps {
  isPlaying: boolean;
  bars: Array<{ height: number; delay: number; color?: string }>;
  particles: Array<{ x: number; y: number; size: number; speed: number; color: string }>;
}

const AlienVisualizer: React.FC<AlienVisualizerProps> = ({ isPlaying, bars, particles }) => {
  return (
    <>
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-purple-900/20 overflow-hidden rounded-lg">
        {/* Floating particles */}
        {particles.map((particle, index) => (
          <div 
            key={index} 
            className="absolute rounded-full animate-pulse"
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              width: `${particle.size}px`,
              height: `${particle.size}px`,
              backgroundColor: particle.color,
              boxShadow: `0 0 ${particle.size * 2}px ${particle.color}`,
              opacity: isPlaying ? 0.8 : 0,
              transition: 'opacity 0.5s ease'
            }}
          />
        ))}
        
        {/* Subtle sparkle effect */}
        <div className="absolute right-3 top-3 text-purple-300/50 animate-pulse">
          <Sparkles size={20} />
        </div>
      </div>
      
      {/* Overlay effect at the bottom */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -bottom-10 left-0 w-full h-20 bg-gradient-to-t from-purple-900/20 to-transparent" />
      </div>
    </>
  );
};

export default AlienVisualizer;
