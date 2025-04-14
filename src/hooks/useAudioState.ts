
import { useState } from 'react';
import { useAudioEngine } from './audio/useAudioEngine';
import { useAudioControls } from './audio/useAudioControls';
import { useAudioParameters } from './audio/useAudioParameters';
import { usePresetSelection } from './audio/usePresetSelection';
import { getPresetById } from '@/utils/presets';

export function useAudioState() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.5);
  const [baseFrequency, setBaseFrequency] = useState(200);
  const [beatFrequency, setBeatFrequency] = useState(10);
  const [selectedPreset, setSelectedPreset] = useState<string | null>(null);
  
  // Initialize audio engine
  useAudioEngine();
  
  // Set up global variables needed by useAudioControls
  // This is needed because we broke up the hook but need to share these variables
  if (typeof window !== 'undefined') {
    (window as any).audioStateGlobals = {
      baseFrequency,
      beatFrequency,
      volume,
      getPresetById
    };
  }
  
  // Initialize hooks
  const { togglePlay, handleTimerEnd } = useAudioControls(
    isPlaying, 
    setIsPlaying, 
    selectedPreset
  );
  
  const { 
    handleVolumeChange,
    handleBaseFrequencyChange,
    handleBeatFrequencyChange
  } = useAudioParameters(
    setBaseFrequency,
    setBeatFrequency,
    setVolume,
    setSelectedPreset
  );
  
  const { handleSelectPreset } = usePresetSelection(
    isPlaying,
    setSelectedPreset,
    volume
  );

  return {
    isPlaying,
    volume,
    baseFrequency,
    beatFrequency,
    selectedPreset,
    handleSelectPreset,
    togglePlay,
    handleVolumeChange,
    handleBaseFrequencyChange,
    handleBeatFrequencyChange,
    handleTimerEnd,
  };
}
