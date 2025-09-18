
import { useState, useCallback } from 'react';
import audioEngine from '@/utils/audioEngine';
import { useAudioEngine } from './audio/useAudioEngine';
import { useAudioControls } from './audio/useAudioControls';
import { useAudioParameters } from './audio/useAudioParameters';
import { usePresetSelection } from './audio/usePresetSelection';
import { getPresetById, Preset } from '@/utils/presets';

interface AudioStateGlobals {
  baseFrequency: number;
  beatFrequency: number;
  volume: number;
  getPresetById: (id: string) => Preset | undefined;
}

declare global {
  interface Window {
    audioStateGlobals: AudioStateGlobals;
  }
}

const initialAmbientSounds = {
  rain: { isOn: false, volume: 0.5 },
  ocean: { isOn: false, volume: 0.5 },
  wind: { isOn: false, volume: 0.5 },
};

const ambientSoundUrls: Record<string, string> = {
  rain: '/sounds/rain.mp3',
  ocean: '/sounds/ocean.mp3',
  wind: '/sounds/wind.mp3',
};

export function useAudioState() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.5);
  const [baseFrequency, setBaseFrequency] = useState(200);
  const [beatFrequency, setBeatFrequency] = useState(10);
  const [selectedPreset, setSelectedPreset] = useState<string | null>(null);
  const [ambientSounds, setAmbientSounds] = useState(initialAmbientSounds);
  
  // Initialize audio engine
  useAudioEngine();
  
  // Set up global variables needed by useAudioControls
  // This is needed because we broke up the hook but need to share these variables
  if (typeof window !== 'undefined') {
    window.audioStateGlobals = {
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

  const handleToggleAmbientSound = useCallback((soundId: string, isOn: boolean) => {
    setAmbientSounds(prev => {
      const newState = { ...prev, [soundId]: { ...prev[soundId], isOn } };
      const sound = newState[soundId];

      if (sound.isOn) {
        audioEngine.playAmbientSound(soundId, ambientSoundUrls[soundId], sound.volume);
      } else {
        audioEngine.stopAmbientSound(soundId);
      }

      return newState;
    });
  }, []);

  const handleAmbientVolumeChange = useCallback((soundId: string, newVolume: number) => {
    setAmbientSounds(prev => ({
      ...prev,
      [soundId]: { ...prev[soundId], volume: newVolume },
    }));
    audioEngine.setAmbientVolume(soundId, newVolume);
  }, []);

  return {
    isPlaying,
    volume,
    baseFrequency,
    beatFrequency,
    selectedPreset,
    ambientSounds,
    handleSelectPreset,
    togglePlay,
    handleVolumeChange,
    handleBaseFrequencyChange,
    handleBeatFrequencyChange,
    handleTimerEnd,
    handleToggleAmbientSound,
    handleAmbientVolumeChange,
  };
}
