
import { useCallback } from 'react';
import { getPresetById } from '@/utils/presets';
import { useToast } from '@/components/ui/use-toast';
import audioEngine from '@/utils/audioEngine';
import { usePresetToasts } from './usePresetToasts';

export function usePresetSelection(
  isPlaying: boolean,
  setSelectedPreset: (value: string | null) => void,
  volume: number
) {
  const { toast } = useToast();
  const { 
    handleLucidPresetToast, 
    handleAstralPresetToast, 
    handleRemoteViewingPresetToast 
  } = usePresetToasts();

  const handleSelectPreset = useCallback((presetId: string) => {
    const preset = getPresetById(presetId);
    if (preset) {
      setSelectedPreset(presetId);
      
      toast({
        title: `Selected: ${preset.name}`,
        description: preset.description,
        duration: 3000,
      });
      
      if (isPlaying) {
        // Stop current playback before changing settings
        audioEngine.stop();
        
        // For special presets
        if (presetId === 'alien') {
          audioEngine.start(preset.baseFrequency, preset.beatFrequency, volume, 'alien');
        } else if (presetId.startsWith('lucid-')) {
          audioEngine.start(preset.baseFrequency, preset.beatFrequency, volume, presetId);
          
          handleLucidPresetToast(presetId);
        } else if (presetId.startsWith('astral-')) {
          audioEngine.start(preset.baseFrequency, preset.beatFrequency, volume, presetId);
          
          handleAstralPresetToast(presetId);
        } else if (presetId.startsWith('remote-')) {
          audioEngine.start(preset.baseFrequency, preset.beatFrequency, volume, presetId);
          
          handleRemoteViewingPresetToast(presetId);
        } else if (presetId.startsWith('gateway-')) {
          audioEngine.start(preset.baseFrequency, preset.beatFrequency, volume, presetId);
          
          toast({
            title: 'Gateway Process Activated',
            description: `${preset.name} frequencies are now active. Recommended duration: ${preset.recommendedDuration} minutes.`,
            duration: 5000,
          });
        } else {
          audioEngine.start(preset.baseFrequency, preset.beatFrequency, volume);
        }
      }
    }
  }, [isPlaying, toast, volume, setSelectedPreset, handleLucidPresetToast, handleAstralPresetToast, handleRemoteViewingPresetToast]);

  return {
    handleSelectPreset
  };
}
