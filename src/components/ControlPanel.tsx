
import React from 'react';
import FrequencyControls from '@/components/FrequencyControls';
import Timer from '@/components/Timer';

interface ControlPanelProps {
  baseFrequency: number;
  beatFrequency: number;
  onBaseFrequencyChange: (value: number) => void;
  onBeatFrequencyChange: (value: number) => void;
  onTimerEnd: () => void;
  isPlaying: boolean;
  selectedPreset?: string | null;
}

const ControlPanel: React.FC<ControlPanelProps> = ({
  baseFrequency,
  beatFrequency,
  onBaseFrequencyChange,
  onBeatFrequencyChange,
  onTimerEnd,
  isPlaying,
  selectedPreset
}) => {
  const isAlienPreset = selectedPreset === 'alien';
  
  return (
    <div className="space-y-6">
      <div className={`bg-card rounded-lg p-4 border transition-all duration-300 ${
        isAlienPreset ? 'border-purple-500/50 relative' : 'border-border'
      }`}>
        {isAlienPreset && (
          <div className="absolute -top-2 -right-2 px-2 py-1 bg-purple-500 text-white text-xs rounded-full animate-pulse">
            Alien Mode
          </div>
        )}
        <FrequencyControls
          baseFrequency={baseFrequency}
          beatFrequency={beatFrequency}
          onBaseFrequencyChange={onBaseFrequencyChange}
          onBeatFrequencyChange={onBeatFrequencyChange}
        />
      </div>
      
      <div className={`bg-card rounded-lg p-4 border transition-all duration-300 ${
        isAlienPreset ? 'border-purple-500/50' : 'border-border'
      }`}>
        <Timer 
          onTimerEnd={onTimerEnd} 
          isPlaying={isPlaying}
        />
      </div>
    </div>
  );
};

export default ControlPanel;
