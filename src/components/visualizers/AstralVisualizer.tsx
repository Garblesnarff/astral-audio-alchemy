
import React from 'react';
import { Sparkles } from 'lucide-react';

interface AstralVisualizerProps {
  isPlaying: boolean;
  bars: Array<{ height: number; delay: number; color?: string }>;
  particles: Array<{ x: number; y: number; size: number; speed: number; color: string }>;
}

const AstralVisualizer: React.FC<AstralVisualizerProps> = ({ isPlaying, bars, particles }) => {
  return (
    <>
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-fuchsia-900/10 overflow-hidden rounded-lg">
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
              boxShadow: `0 0 ${particle.size * 3}px ${particle.color}`,
              opacity: isPlaying ? 0.8 : 0,
              transition: 'opacity 0.5s ease'
            }}
          />
        ))}
        
        {/* Subtle sparkle effect */}
        <div className="absolute right-3 top-3 text-fuchsia-300/50 animate-pulse">
          <Sparkles size={20} />
        </div>
      </div>
      
      {/* Astral particles effect */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -bottom-10 left-0 w-full h-20 bg-gradient-to-t from-fuchsia-900/20 to-transparent" />
        
        <div className="astral-particles">
          {Array.from({ length: 25 }).map((_, i) => (
            <div 
              key={i}
              className="absolute w-1 h-1 rounded-full bg-fuchsia-300/40 astral-particle"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 15}s`,
                animationDuration: `${15 + Math.random() * 25}s`,
                transform: `scale(${0.5 + Math.random() * 2})`
              }}
            />
          ))}
          
          {/* Subtle ethereal fog */}
          <div className="absolute inset-0 bg-gradient-radial from-transparent via-transparent to-fuchsia-800/5 opacity-50 mix-blend-screen" />
        </div>
      </div>
    </>
  );
};

export default AstralVisualizer;
