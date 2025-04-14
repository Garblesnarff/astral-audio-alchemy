
import React from 'react';

interface RemoteVisualizerProps {
  isPlaying: boolean;
  bars: Array<{ height: number; delay: number; color?: string }>;
  particles: Array<{ x: number; y: number; size: number; speed: number; color: string }>;
  preset: string;
}

const RemoteVisualizer: React.FC<RemoteVisualizerProps> = ({ isPlaying, bars, particles, preset }) => {
  return (
    <>
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-indigo-900/10 overflow-hidden rounded-lg">
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
              opacity: isPlaying ? 0.7 : 0,
              transition: 'opacity 0.5s ease'
            }}
          />
        ))}
        
        {/* Target visualization for remote viewing */}
        {preset === 'remote-focused' && (
          <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-6 h-6 border border-indigo-400/30 rounded-full opacity-50" />
        )}
      </div>
      
      {/* Remote viewing particles effect */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -bottom-10 left-0 w-full h-20 bg-gradient-to-t from-indigo-900/20 to-transparent" />
        
        <div className="remote-particles">
          {Array.from({ length: 20 }).map((_, i) => (
            <div 
              key={i}
              className="absolute w-1 h-1 rounded-full bg-indigo-300/40 remote-particle"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 12}s`,
                animationDuration: `${12 + Math.random() * 20}s`,
                transform: `scale(${0.5 + Math.random() * 2})`
              }}
            />
          ))}
          
          {/* Target focus visualization */}
          <div className="absolute opacity-30 w-8 h-8 border-2 border-indigo-400 rounded-full left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 animate-ping" 
            style={{ animationDuration: '3s' }} />
        </div>
      </div>
    </>
  );
};

export default RemoteVisualizer;
