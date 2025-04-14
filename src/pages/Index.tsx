
import React, { useState, useEffect, useCallback } from 'react';
import Layout from '@/components/Layout';
import { getPresetById } from '@/utils/presets';
import audioEngine from '@/utils/audioEngine';
import { useToast } from '@/components/ui/use-toast';
import AudioControls from '@/components/AudioControls';
import VisualizerSection from '@/components/VisualizerSection';
import PresetSelection from '@/components/PresetSelection';
import ControlPanel from '@/components/ControlPanel';
import InfoBanners from '@/components/InfoBanners';
import LucidDreamingControls from '@/components/LucidDreamingControls';

const Index = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.5);
  const [baseFrequency, setBaseFrequency] = useState(200);
  const [beatFrequency, setBeatFrequency] = useState(10);
  const [selectedPreset, setSelectedPreset] = useState<string | null>(null);
  const [currentTab, setCurrentTab] = useState('relaxation');
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
        } else {
          audioEngine.start(preset.baseFrequency, preset.beatFrequency, volume);
        }
        setIsPlaying(true);
      }
    }
  }, [isPlaying, toast, volume]);
  
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
  
  const isLucidDreamingPreset = selectedPreset && selectedPreset.startsWith('lucid-');
  
  return (
    <Layout>
      <div className="space-y-8">
        <InfoBanners />
      
        <VisualizerSection isPlaying={isPlaying} selectedPreset={selectedPreset} />
        
        <AudioControls
          isPlaying={isPlaying}
          volume={volume}
          selectedPreset={selectedPreset}
          onTogglePlay={togglePlay}
          onVolumeChange={handleVolumeChange}
        />
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="space-y-6">
            <ControlPanel
              baseFrequency={baseFrequency}
              beatFrequency={beatFrequency}
              onBaseFrequencyChange={handleBaseFrequencyChange}
              onBeatFrequencyChange={handleBeatFrequencyChange}
              onTimerEnd={handleTimerEnd}
              isPlaying={isPlaying}
            />
            
            {isLucidDreamingPreset && (
              <LucidDreamingControls 
                isPlaying={isPlaying}
                selectedPreset={selectedPreset}
              />
            )}
          </div>
          
          <div className="md:col-span-2">
            <PresetSelection
              selectedPreset={selectedPreset}
              onSelectPreset={handleSelectPreset}
              currentTab={currentTab}
              onTabChange={setCurrentTab}
            />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Index;
