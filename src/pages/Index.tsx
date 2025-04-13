
import React, { useState, useCallback } from 'react';
import Layout from '@/components/Layout';
import { getPresetById } from '@/utils/presets';
import audioEngine from '@/utils/audio/audioEngine';
import { useToast } from '@/components/ui/use-toast';

// Import refactored components
import WarningBanner from '@/components/WarningBanner';
import VisualizerSection from '@/components/VisualizerSection';
import PlayerControls from '@/components/PlayerControls';
import ControlsSection from '@/components/ControlsSection';
import PresetSelector from '@/components/PresetSelector';
import AboutSection from '@/components/AboutSection';

const Index = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.5);
  const [baseFrequency, setBaseFrequency] = useState(200);
  const [beatFrequency, setBeatFrequency] = useState(10);
  const [selectedPreset, setSelectedPreset] = useState<string | null>(null);
  const [currentTab, setCurrentTab] = useState('relaxation');
  const { toast } = useToast();
  
  // Initialize audio engine
  React.useEffect(() => {
    audioEngine.initialize();
    
    return () => {
      audioEngine.cleanup();
    };
  }, []);
  
  // Handle preset selection
  const handleSelectPreset = useCallback((presetId: string) => {
    const preset = getPresetById(presetId);
    if (preset) {
      console.log(`Selecting preset: ${presetId}, stopping any current audio first`);
      
      // Important: Always stop any currently playing audio before changing preset
      const wasPlaying = isPlaying;
      if (isPlaying) {
        audioEngine.stop();
      }
      
      setSelectedPreset(presetId);
      setBaseFrequency(preset.baseFrequency);
      setBeatFrequency(preset.beatFrequency);
      
      toast({
        title: `Selected: ${preset.name}`,
        description: preset.description,
        duration: 3000,
      });
      
      // If already playing, restart with new preset
      if (wasPlaying) {
        console.log(`Restarting audio with new preset: ${presetId}`);
        // Add a small delay to ensure cleanup is complete
        setTimeout(() => {
          audioEngine.start(preset.baseFrequency, preset.beatFrequency, volume, presetId);
        }, 100);
      }
    }
  }, [isPlaying, toast, volume]);
  
  // Toggle play/pause
  const togglePlay = useCallback(() => {
    if (isPlaying) {
      console.log("Stopping audio from togglePlay");
      audioEngine.stop();
      setIsPlaying(false);
    } else {
      console.log("Starting audio from togglePlay");
      if (selectedPreset) {
        const preset = getPresetById(selectedPreset);
        if (preset) {
          audioEngine.start(preset.baseFrequency, preset.beatFrequency, volume, selectedPreset);
        }
      } else {
        audioEngine.start(baseFrequency, beatFrequency, volume);
      }
      setIsPlaying(true);
      
      if (selectedPreset === 'alien') {
        toast({
          title: "Alien Summoning Activated",
          description: "Please ensure you have taken proper interdimensional precautions.",
          variant: "destructive",
          duration: 5000,
        });
      }
    }
  }, [isPlaying, selectedPreset, baseFrequency, beatFrequency, volume, toast]);
  
  // Handle volume change
  const handleVolumeChange = useCallback((value: number) => {
    setVolume(value);
    audioEngine.setVolume(value);
  }, []);
  
  // Handle base frequency change
  const handleBaseFrequencyChange = useCallback((value: number) => {
    // Always stop first for clean slate
    const wasPlaying = isPlaying;
    if (isPlaying) {
      audioEngine.stop();
    }
    
    setBaseFrequency(value);
    setSelectedPreset(null);
    
    // Restart if was playing
    if (wasPlaying) {
      setTimeout(() => {
        audioEngine.start(value, beatFrequency, volume);
        setIsPlaying(true);
      }, 100);
    }
  }, [beatFrequency, isPlaying, volume]);
  
  // Handle beat frequency change
  const handleBeatFrequencyChange = useCallback((value: number) => {
    // Always stop first for clean slate
    const wasPlaying = isPlaying;
    if (isPlaying) {
      audioEngine.stop();
    }
    
    setBeatFrequency(value);
    setSelectedPreset(null);
    
    // Restart if was playing
    if (wasPlaying) {
      setTimeout(() => {
        audioEngine.start(baseFrequency, value, volume);
        setIsPlaying(true);
      }, 100);
    }
  }, [baseFrequency, isPlaying, volume]);
  
  // Handle timer end
  const handleTimerEnd = useCallback(() => {
    audioEngine.stop();
    setIsPlaying(false);
    toast({
      title: "Session Complete",
      description: "Your binaural beats session has ended.",
      duration: 3000,
    });
  }, [toast]);
  
  // Ensure UI state is in sync with audio engine
  React.useEffect(() => {
    const syncState = () => {
      const engineIsPlaying = audioEngine.getIsPlaying();
      if (isPlaying !== engineIsPlaying) {
        console.log(`Syncing play state UI (${isPlaying}) with audio engine (${engineIsPlaying})`);
        setIsPlaying(engineIsPlaying);
      }
    };
    
    // Check sync every 1 second
    const intervalId = setInterval(syncState, 1000);
    return () => clearInterval(intervalId);
  }, [isPlaying]);
  
  return (
    <Layout>
      <div className="space-y-8">
        <WarningBanner />
        <VisualizerSection isPlaying={isPlaying} selectedPreset={selectedPreset} />
        <PlayerControls 
          isPlaying={isPlaying}
          selectedPreset={selectedPreset}
          volume={volume}
          togglePlay={togglePlay}
          handleVolumeChange={handleVolumeChange}
        />
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <ControlsSection 
            baseFrequency={baseFrequency}
            beatFrequency={beatFrequency}
            handleBaseFrequencyChange={handleBaseFrequencyChange}
            handleBeatFrequencyChange={handleBeatFrequencyChange}
            handleTimerEnd={handleTimerEnd}
            isPlaying={isPlaying}
          />
          
          <div className="md:col-span-2">
            <PresetSelector 
              selectedPreset={selectedPreset}
              currentTab={currentTab}
              setCurrentTab={setCurrentTab}
              handleSelectPreset={handleSelectPreset}
            />
          </div>
        </div>
        
        <AboutSection />
      </div>
    </Layout>
  );
};

export default Index;
