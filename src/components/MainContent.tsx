
import React from 'react';
import VisualizerSection from '@/components/VisualizerSection';
import AudioControls from '@/components/AudioControls';
import ControlPanel from '@/components/ControlPanel';
import PresetSelection from '@/components/PresetSelection';
import LucidDreamingControls from '@/components/LucidDreamingControls';
import AstralProjectionControls from '@/components/AstralProjectionControls';
import AstralProjectionGuide from '@/components/AstralProjectionGuide';

interface MainContentProps {
  isPlaying: boolean;
  volume: number;
  baseFrequency: number;
  beatFrequency: number;
  selectedPreset: string | null;
  togglePlay: () => void;
  handleVolumeChange: (value: number) => void;
  handleBaseFrequencyChange: (value: number) => void;
  handleBeatFrequencyChange: (value: number) => void;
  handleSelectPreset: (presetId: string) => void;
  handleTimerEnd: () => void;
  currentTab: string;
  setCurrentTab: (value: string) => void;
}

const MainContent: React.FC<MainContentProps> = ({
  isPlaying,
  volume,
  baseFrequency,
  beatFrequency,
  selectedPreset,
  togglePlay,
  handleVolumeChange,
  handleBaseFrequencyChange,
  handleBeatFrequencyChange,
  handleSelectPreset,
  handleTimerEnd,
  currentTab,
  setCurrentTab
}) => {
  const isLucidDreamingPreset = selectedPreset && selectedPreset.startsWith('lucid-');
  const isAstralProjectionPreset = selectedPreset && selectedPreset.startsWith('astral-');
  
  return (
    <div className="space-y-8">
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
          
          {isAstralProjectionPreset && (
            <AstralProjectionControls 
              isPlaying={isPlaying}
              selectedPreset={selectedPreset}
            />
          )}
        </div>
        
        <div className="md:col-span-2 space-y-6">
          <PresetSelection
            selectedPreset={selectedPreset}
            onSelectPreset={handleSelectPreset}
            currentTab={currentTab}
            onTabChange={setCurrentTab}
          />
          
          {isAstralProjectionPreset && (
            <AstralProjectionGuide selectedPreset={selectedPreset} />
          )}
        </div>
      </div>
    </div>
  );
};

export default MainContent;
