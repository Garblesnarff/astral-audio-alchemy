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
  const isAstralProjection = selectedPreset && selectedPreset.startsWith('astral-');
  const isRemoteViewing = selectedPreset && selectedPreset.startsWith('remote-');
  
  return (
    <div className="relative space-y-2">
      <div className={`transition-all duration-500 ${
        isAlien ? 'opacity-85 border-purple-500' : 
        isLucidDreaming ? 'opacity-90 border-indigo-500' :
        isAstralProjection ? 'opacity-95 border-fuchsia-500' :
        isRemoteViewing ? 'opacity-95 border-indigo-400' :
        'opacity-100'}`}
      >
        <FrequencyVisualizer isPlaying={isPlaying} />
      </div>
      
      {/* Single container for WaveformVisualizer - removed duplicate code */}
      <WaveformVisualizer isPlaying={isPlaying} preset={selectedPreset || ''} />
      
      {/* Specialized background effects - these were duplicated before */}
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
      
      {isAstralProjection && isPlaying && (
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute -bottom-10 left-0 w-full h-20 bg-gradient-to-t from-fuchsia-900/20 to-transparent" />
          
          {/* Astral particles effect */}
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
      )}
      
      {isRemoteViewing && isPlaying && (
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute -bottom-10 left-0 w-full h-20 bg-gradient-to-t from-indigo-900/20 to-transparent" />
          
          {/* Remote viewing particles effect */}
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
      )}
    </div>
  );
};

export default VisualizerSection;
