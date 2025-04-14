
import React from 'react';

interface LucidVisualizerProps {
  isPlaying: boolean;
  bars: Array<{ height: number; delay: number; color?: string }>;
}

const LucidVisualizer: React.FC<LucidVisualizerProps> = ({ isPlaying, bars }) => {
  return (
    <>
      {/* Lucid Dreaming specific background effect */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -bottom-10 left-0 w-full h-20 bg-gradient-to-t from-indigo-600/10 to-transparent" />
        
        {/* Dreamy particles effect */}
        <div className="dream-particles">
          {Array.from({ length: 15 }).map((_, i) => (
            <div 
              key={i}
              className="absolute w-2 h-2 rounded-full bg-indigo-400/30 lucid-particle"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 10}s`,
                animationDuration: `${10 + Math.random() * 20}s`
              }}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default LucidVisualizer;
