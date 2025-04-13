
import React from 'react';
import FrequencyControls from '@/components/FrequencyControls';
import Timer from '@/components/Timer';

interface ControlsSectionProps {
  baseFrequency: number;
  beatFrequency: number;
  handleBaseFrequencyChange: (value: number) => void;
  handleBeatFrequencyChange: (value: number) => void;
  handleTimerEnd: () => void;
  isPlaying: boolean;
}

const ControlsSection: React.FC<ControlsSectionProps> = ({
  baseFrequency,
  beatFrequency,
  handleBaseFrequencyChange,
  handleBeatFrequencyChange,
  handleTimerEnd,
  isPlaying,
}) => (
  <div className="space-y-6">
    <div className="bg-card rounded-lg p-4 border border-border">
      <FrequencyControls
        baseFrequency={baseFrequency}
        beatFrequency={beatFrequency}
        onBaseFrequencyChange={handleBaseFrequencyChange}
        onBeatFrequencyChange={handleBeatFrequencyChange}
      />
    </div>
    
    <div className="bg-card rounded-lg p-4 border border-border">
      <Timer 
        onTimerEnd={handleTimerEnd} 
        isPlaying={isPlaying}
      />
    </div>
  </div>
);

export default ControlsSection;
