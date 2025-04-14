
import { useCallback } from 'react';
import audioEngine from '@/utils/audioEngine';

export function useAudioParameters(
  setBaseFrequency: (value: number) => void,
  setBeatFrequency: (value: number) => void,
  setVolume: (value: number) => void,
  setSelectedPreset: (value: string | null) => void
) {
  const handleVolumeChange = useCallback((value: number) => {
    setVolume(value);
    audioEngine.setVolume(value);
  }, [setVolume]);
  
  const handleBaseFrequencyChange = useCallback((value: number) => {
    setBaseFrequency(value);
    audioEngine.setBaseFrequency(value);
    setSelectedPreset(null);
  }, [setBaseFrequency, setSelectedPreset]);
  
  const handleBeatFrequencyChange = useCallback((value: number) => {
    setBeatFrequency(value);
    audioEngine.setBeatFrequency(value);
    setSelectedPreset(null);
  }, [setBeatFrequency, setSelectedPreset]);

  return {
    handleVolumeChange,
    handleBaseFrequencyChange,
    handleBeatFrequencyChange
  };
}
