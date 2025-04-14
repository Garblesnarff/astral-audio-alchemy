
import React from 'react';
import FrequencyVisualizer from '@/components/FrequencyVisualizer';
import WaveformVisualizer from '@/components/WaveformVisualizer';

interface VisualizerSectionProps {
  isPlaying: boolean;
  selectedPreset: string | null;
}

const VisualizerSection: React.FC<VisualizerSectionProps> = ({ isPlaying, selectedPreset }) => {
  const isAlien = selectedPreset === 'alien';
  const isLucidDreaming = selectedPreset && selectedPreset.startsWith('lucid-');
  
  return (
    <div className="relative space-y-2">
      <div className={`transition-all duration-500 ${isAlien ? 'opacity-85 border-purple-500' : isLucidDreaming ? 'opacity-90 border-indigo-500' : 'opacity-100'}`}>
        <FrequencyVisualizer isPlaying={isPlaying} />
      </div>
      <div 
        className={`transition-all duration-500 ${
          isAlien 
            ? 'border border-purple-500/30 rounded-lg p-2 bg-black/10 alien-pulse backdrop-blur-sm' 
            : isLucidDreaming 
              ? 'border border-indigo-500/40 rounded-lg p-2 bg-indigo-950/10 lucid-pulse backdrop-blur-sm' 
              : ''
        }`}
      >
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
        
        <WaveformVisualizer isPlaying={isPlaying} preset={selectedPreset || ''} />
      </div>
      
      {isAlien && isPlaying && (
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute -bottom-10 left-0 w-full h-20 bg-gradient-to-t from-purple-900/20 to-transparent" />
        </div>
      )}
      
      {isLucidDreaming && isPlaying && (
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
      )}
    </div>
  );
};

export default VisualizerSection;
