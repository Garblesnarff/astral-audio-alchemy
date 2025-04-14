
import { useState, useCallback, useEffect } from 'react';
import audioEngine from '@/utils/audioEngine';
import { getPresetById } from '@/utils/presets';
import { useToast } from '@/components/ui/use-toast';

export function useAudioState() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.5);
  const [baseFrequency, setBaseFrequency] = useState(200);
  const [beatFrequency, setBeatFrequency] = useState(10);
  const [selectedPreset, setSelectedPreset] = useState<string | null>(null);
  const { toast } = useToast();
  
  useEffect(() => {
    // Ensure audio context is initialized
    const initSuccess = audioEngine.initialize();
    
    if (!initSuccess) {
      toast({
        title: "Audio Error",
        description: "Could not initialize audio system. Please check browser compatibility.",
        variant: "destructive",
      });
    }
    
    return () => {
      audioEngine.cleanup();
    };
  }, [toast]);

  const handleSelectPreset = useCallback((presetId: string) => {
    const preset = getPresetById(presetId);
    if (preset) {
      setSelectedPreset(presetId);
      setBaseFrequency(preset.baseFrequency);
      setBeatFrequency(preset.beatFrequency);
      
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
        } else {
          audioEngine.start(preset.baseFrequency, preset.beatFrequency, volume);
        }
        setIsPlaying(true);
      }
    }
  }, [isPlaying, toast, volume]);

  const handleLucidPresetToast = (presetId: string) => {
    if (presetId === 'lucid-basic') {
      toast({
        title: "Lucid Dreaming Mode",
        description: "Basic theta entrainment for dream awareness. Use headphones for best results.",
        duration: 5000,
      });
    } else if (presetId === 'lucid-advanced') {
      toast({
        title: "Advanced Lucid Dreaming",
        description: "Theta-alpha mix for deeper dream control. Check reality check options below.",
        duration: 5000,
      });
    } else if (presetId === 'lucid-gamma') {
      toast({
        title: "Gamma-Enhanced Dreams",
        description: "Added gamma components to mimic lucid dream brain activity.",
        duration: 5000,
      });
    } else if (presetId === 'lucid-wbtb') {
      toast({
        title: "WBTB Mode Activated",
        description: "Use the WBTB timer below for optimal timing.",
        duration: 5000,
      });
    }
  };
  
  const handleAstralPresetToast = (presetId: string) => {
    if (presetId === 'astral-deep-theta') {
      toast({
        title: "Deep Theta Astral Mode",
        description: "Focused 6.3 Hz frequency for astral travel. Use headphones for best results.",
        duration: 5000,
      });
    } else if (presetId === 'astral-epsilon-lambda') {
      toast({
        title: "Epsilon-Lambda Mix",
        description: "Combined ultra-low and high frequencies for enhanced separation experience.",
        duration: 5000,
      });
    } else if (presetId === 'astral-777hz') {
      toast({
        title: "777 Hz Cosmic Frequency",
        description: "Special frequency associated with spiritual and astral connections.",
        duration: 5000,
      });
    } else if (presetId === 'astral-vibrational') {
      toast({
        title: "Vibrational Stage Support",
        description: "Progressive frequencies to help navigate through the vibrational phase.",
        duration: 5000,
      });
    } else if (presetId === 'astral-progressive') {
      toast({
        title: "Full Astral Journey Activated",
        description: "This guided sequence will take you through all phases of astral projection.",
        duration: 5000,
      });
    }
  };
  
  const togglePlay = useCallback(() => {
    if (isPlaying) {
      audioEngine.stop();
      setIsPlaying(false);
    } else {
      // Make sure audio context is running
      audioEngine.resume();
      
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
          } else {
            audioEngine.start(preset.baseFrequency, preset.beatFrequency, volume);
          }
        }
      } else {
        audioEngine.start(baseFrequency, beatFrequency, volume);
      }
      setIsPlaying(true);
    }
  }, [isPlaying, selectedPreset, baseFrequency, beatFrequency, volume, toast]);
  
  const handleVolumeChange = useCallback((value: number) => {
    setVolume(value);
    audioEngine.setVolume(value);
  }, []);
  
  const handleBaseFrequencyChange = useCallback((value: number) => {
    setBaseFrequency(value);
    audioEngine.setBaseFrequency(value);
    setSelectedPreset(null);
  }, []);
  
  const handleBeatFrequencyChange = useCallback((value: number) => {
    setBeatFrequency(value);
    audioEngine.setBeatFrequency(value);
    setSelectedPreset(null);
  }, []);
  
  const handleTimerEnd = useCallback(() => {
    audioEngine.stop();
    setIsPlaying(false);
    toast({
      title: "Session Complete",
      description: "Your binaural beats session has ended.",
      duration: 3000,
    });
  }, [toast]);

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
