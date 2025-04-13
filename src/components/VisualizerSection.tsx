
import React, { useEffect, useState } from 'react';
import FrequencyVisualizer from '@/components/FrequencyVisualizer';
import WaveformVisualizer from '@/components/WaveformVisualizer';

interface VisualizerSectionProps {
  isPlaying: boolean;
  selectedPreset: string | null;
}

const VisualizerSection: React.FC<VisualizerSectionProps> = ({
  isPlaying,
  selectedPreset,
}) => {
  // Track the currently displayed preset for animation transitions
  const [displayedPreset, setDisplayedPreset] = useState<string>('');
  
  // When the selected preset changes, update with a slight delay
  // This helps with smoother transitions in the visualizer
  useEffect(() => {
    if (selectedPreset !== null) {
      // Small delay to allow audio to start/stop first
      const timer = setTimeout(() => {
        setDisplayedPreset(selectedPreset);
      }, 200);
      
      return () => clearTimeout(timer);
    }
  }, [selectedPreset]);
  
  return (
    <div className="relative">
      <FrequencyVisualizer isPlaying={isPlaying} />
      <WaveformVisualizer 
        isPlaying={isPlaying} 
        preset={displayedPreset} 
      />
    </div>
  );
};

export default VisualizerSection;
