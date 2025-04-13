
import React, { useState, useEffect, useCallback } from 'react';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { getPresetById, presets, Preset } from '@/utils/presets';
import FrequencyVisualizer from '@/components/FrequencyVisualizer';
import WaveformVisualizer from '@/components/WaveformVisualizer';
import PresetCard from '@/components/PresetCard';
import FrequencyControls from '@/components/FrequencyControls';
import Timer from '@/components/Timer';
import audioEngine from '@/utils/audio/audioEngine';
import { Info, Play, Pause, Volume2, VolumeX, AlertTriangle } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

const Index = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.5);
  const [baseFrequency, setBaseFrequency] = useState(200);
  const [beatFrequency, setBeatFrequency] = useState(10);
  const [selectedPreset, setSelectedPreset] = useState<string | null>(null);
  const [currentTab, setCurrentTab] = useState('relaxation');
  const { toast } = useToast();
  
  useEffect(() => {
    audioEngine.initialize();
    
    return () => {
      audioEngine.cleanup();
    };
  }, []);
  
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
        audioEngine.setBaseFrequency(preset.baseFrequency);
        audioEngine.setBeatFrequency(preset.beatFrequency);
      }
    }
  }, [isPlaying, toast]);
  
  const togglePlay = useCallback(() => {
    if (isPlaying) {
      audioEngine.stop();
      setIsPlaying(false);
    } else {
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
  
  const presetsByCategory: Record<string, Preset[]> = presets.reduce((acc, preset) => {
    const category = preset.category;
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(preset);
    return acc;
  }, {} as Record<string, Preset[]>);
  
  const categories = Object.keys(presetsByCategory);
  
  return (
    <Layout>
      <div className="space-y-8">
        <div className="bg-card/80 border border-border rounded-lg p-4 flex items-start space-x-3">
          <AlertTriangle className="h-5 w-5 text-yellow-500 mt-0.5" />
          <div className="text-sm">
            <p className="font-medium">Important: Use headphones for binaural beats</p>
            <p className="text-muted-foreground mt-1">
              Binaural beats require stereo headphones to be effective. Keep volume at a comfortable level.
            </p>
          </div>
        </div>
      
        <div className="relative">
          <FrequencyVisualizer isPlaying={isPlaying} />
          <WaveformVisualizer isPlaying={isPlaying} preset={selectedPreset || ''} />
        </div>
        
        <div className="flex flex-col sm:flex-row items-center gap-4 justify-between">
          <div className="flex items-center space-x-2">
            <Button 
              size="lg"
              onClick={togglePlay} 
              className="h-14 w-14 rounded-full"
            >
              {isPlaying ? <Pause className="h-6 w-6" /> : <Play className="h-6 w-6 ml-0.5" />}
            </Button>
            <div className="text-sm">
              {isPlaying ? 'Now Playing' : 'Press Play'}
              {selectedPreset && isPlaying && (
                <div className="text-xs text-muted-foreground">
                  {getPresetById(selectedPreset)?.name}
                </div>
              )}
            </div>
          </div>
          
          <div className="flex items-center space-x-2 w-full max-w-xs">
            <VolumeX className="h-4 w-4 text-muted-foreground" />
            <Slider
              value={[volume]}
              max={1}
              step={0.01}
              onValueChange={(value) => handleVolumeChange(value[0])}
              className="flex-1"
            />
            <Volume2 className="h-4 w-4 text-muted-foreground" />
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="space-y-6">
            <div className="bg-card rounded-lg p-4 border border-border">
              <FrequencyControls
                baseFrequency={baseFrequency}
                beatFrequency={beatFrequency}
                onBaseFrequencyChange={handleBaseFrequencyChange}
                onBeatFrequencyChange={handleBeatFrequencyChange}
              />
            </div>
            
            <div className="bg-card rounded-lg p-4 border border-border">
              <Timer 
                onTimerEnd={handleTimerEnd} 
                isPlaying={isPlaying}
              />
            </div>
          </div>
          
          <div className="md:col-span-2">
            <Tabs defaultValue={currentTab} onValueChange={setCurrentTab}>
              <TabsList className="grid grid-cols-5">
                {categories.map((category) => (
                  <TabsTrigger key={category} value={category} className="capitalize">
                    {category === 'special' ? '👽' : category}
                  </TabsTrigger>
                ))}
              </TabsList>
              
              {categories.map((category) => (
                <TabsContent key={category} value={category} className="p-0 mt-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {presetsByCategory[category].map((preset) => (
                      <PresetCard
                        key={preset.id}
                        preset={preset}
                        isActive={selectedPreset === preset.id}
                        onSelect={handleSelectPreset}
                      />
                    ))}
                  </div>
                </TabsContent>
              ))}
            </Tabs>
          </div>
        </div>
        
        <div className="bg-card/80 border border-border rounded-lg p-4 mt-6">
          <div className="flex items-start space-x-3">
            <Info className="h-5 w-5 text-primary mt-0.5" />
            <div className="text-sm">
              <p className="font-medium">About Binaural Beats</p>
              <p className="text-muted-foreground mt-1">
                Binaural beats occur when two slightly different frequencies are played separately in each ear, 
                creating a perceived third beat. They may help with relaxation, focus, and sleep. 
                Individual results may vary. Consult a doctor if you have neurological conditions or seizure disorders.
              </p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Index;
