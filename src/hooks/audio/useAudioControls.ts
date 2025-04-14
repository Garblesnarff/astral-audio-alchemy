
import { useCallback } from 'react';
import audioEngine from '@/utils/audioEngine';
import { useToast } from '@/components/ui/use-toast';
import { getPresetById } from '@/utils/presets';

export function useAudioControls(
  isPlaying: boolean, 
  setIsPlaying: (playing: boolean) => void,
  selectedPreset: string | null
) {
  const { toast } = useToast();

  const togglePlay = useCallback(() => {
    if (isPlaying) {
      audioEngine.stop();
      setIsPlaying(false);
    } else {
      // Make sure audio context is running
      audioEngine.resume();
      
      // Access globals set in the parent hook
      const globals = (window as any).audioStateGlobals || {};
      const { baseFrequency, beatFrequency, volume } = globals;
      
      if (selectedPreset) {
        const preset = getPresetById(selectedPreset);
        if (preset) {
          // Special handling for alien preset
          if (selectedPreset === 'alien') {
            audioEngine.start(preset.baseFrequency, preset.beatFrequency, volume, 'alien');
            
            toast({
              title: "Alien Summoning Activated",
              description: "Please ensure you have taken proper interdimensional precautions.",
              variant: "destructive",
              duration: 5000,
            });
          } else if (selectedPreset.startsWith('lucid-')) {
            audioEngine.start(preset.baseFrequency, preset.beatFrequency, volume, selectedPreset);
            
            toast({
              title: "Lucid Dreaming Mode Activated",
              description: "For best results, use before sleep or during a WBTB session.",
              duration: 5000,
            });
          } else if (selectedPreset.startsWith('astral-')) {
            audioEngine.start(preset.baseFrequency, preset.beatFrequency, volume, selectedPreset);
            
            toast({
              title: "Astral Projection Mode Activated",
              description: "For best results, lay flat on your back in a quiet, dark environment.",
              duration: 5000,
            });
          } else if (selectedPreset.startsWith('remote-')) {
            audioEngine.start(preset.baseFrequency, preset.beatFrequency, volume, selectedPreset);
            
            toast({
              title: "Remote Viewing Mode Activated",
              description: "Find a quiet space and focus on receiving information. Use the target timer for structured sessions.",
              duration: 5000,
            });
          } else {
            audioEngine.start(preset.baseFrequency, preset.beatFrequency, volume);
          }
        }
      } else {
        audioEngine.start(baseFrequency, beatFrequency, volume);
      }
      setIsPlaying(true);
    }
  }, [isPlaying, selectedPreset, toast, setIsPlaying]);
  
  const handleTimerEnd = useCallback(() => {
    audioEngine.stop();
    setIsPlaying(false);
    toast({
      title: "Session Complete",
      description: "Your binaural beats session has ended.",
      duration: 3000,
    });
  }, [toast, setIsPlaying]);

  return {
    togglePlay,
    handleTimerEnd
  };
}
