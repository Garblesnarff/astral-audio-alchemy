
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
}

const ControlPanel: React.FC<ControlPanelProps> = ({
  baseFrequency,
  beatFrequency,
  onBaseFrequencyChange,
  onBeatFrequencyChange,
  onTimerEnd,
  isPlaying
}) => {
  return (
    <div className="space-y-6">
      <div className="bg-card rounded-lg p-4 border border-border">
        <FrequencyControls
          baseFrequency={baseFrequency}
          beatFrequency={beatFrequency}
          onBaseFrequencyChange={onBaseFrequencyChange}
          onBeatFrequencyChange={onBeatFrequencyChange}
        />
      </div>
      
      <div className="bg-card rounded-lg p-4 border border-border">
        <Timer 
          onTimerEnd={onTimerEnd} 
          isPlaying={isPlaying}
        />
      </div>
    </div>
  );
};

export default ControlPanel;
