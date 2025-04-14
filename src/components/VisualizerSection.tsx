
import React from 'react';
import FrequencyVisualizer from '@/components/FrequencyVisualizer';
import WaveformVisualizer from '@/components/WaveformVisualizer';

interface VisualizerSectionProps {
  isPlaying: boolean;
  selectedPreset: string | null;
}

const VisualizerSection: React.FC<VisualizerSectionProps> = ({ isPlaying, selectedPreset }) => {
  return (
    <div className="relative space-y-2">
      <div className={`transition-all duration-500 ${selectedPreset === 'alien' ? 'opacity-85 border-purple-500' : 'opacity-100'}`}>
        <FrequencyVisualizer isPlaying={isPlaying} />
      </div>
      <div className={`transition-all duration-500 ${selectedPreset === 'alien' ? 'border border-purple-500/30 rounded-lg p-2 bg-black/10' : ''}`}>
        <WaveformVisualizer isPlaying={isPlaying} preset={selectedPreset || ''} />
      </div>
    </div>
  );
};

export default VisualizerSection;
