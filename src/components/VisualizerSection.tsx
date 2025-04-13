
import React from 'react';
import FrequencyVisualizer from '@/components/FrequencyVisualizer';
import WaveformVisualizer from '@/components/WaveformVisualizer';

interface VisualizerSectionProps {
  isPlaying: boolean;
  selectedPreset: string | null;
}

const VisualizerSection: React.FC<VisualizerSectionProps> = ({
  isPlaying,
  selectedPreset,
}) => (
  <div className="relative">
    <FrequencyVisualizer isPlaying={isPlaying} />
    <WaveformVisualizer isPlaying={isPlaying} preset={selectedPreset || ''} />
  </div>
);

export default VisualizerSection;
