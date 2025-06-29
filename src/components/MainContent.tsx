
import React from 'react';
import VisualizerSection from '@/components/VisualizerSection';
import AudioControls from '@/components/AudioControls';
import ControlPanel from '@/components/ControlPanel';
import PresetSelection from '@/components/PresetSelection';
import LucidDreamingControls from '@/components/LucidDreamingControls';
import AstralProjectionControls from '@/components/AstralProjectionControls';
import AstralProjectionGuide from '@/components/AstralProjectionGuide';
import RemoteViewingControls from '@/components/remote-viewing/RemoteViewingControls';
import RemoteViewingGuide from '@/components/RemoteViewingGuide';
import LucidDreamingGuide from '@/components/LucidDreamingGuide';
import GuidedModeControls from '@/components/guided/GuidedModeControls';
import { useGuidedMeditation } from '@/hooks/useGuidedMeditation';

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
  const isRemoteViewingPreset = selectedPreset && selectedPreset.startsWith('remote-');
  const isGuidedPreset = selectedPreset && selectedPreset.startsWith('guided-');
  
  const {
    guidedState,
    sessionProgress,
    currentSegmentText,
    startGuidedMeditation,
    stopGuidedMeditation,
    handleVoiceVolumeChange,
    handleVoiceSpeedChange,
    handleTextOverlayToggle,
    handleSkipSegment,
    handleReplaySegment
  } = useGuidedMeditation();

  // Start guided meditation when a guided preset is selected and playing
  React.useEffect(() => {
    if (isGuidedPreset && isPlaying && !guidedState.isGuidedMode) {
      startGuidedMeditation(selectedPreset);
    } else if (!isPlaying && guidedState.isGuidedMode) {
      stopGuidedMeditation();
    }
  }, [isGuidedPreset, isPlaying, selectedPreset, guidedState.isGuidedMode, startGuidedMeditation, stopGuidedMeditation]);
  
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
          
          {isRemoteViewingPreset && (
            <RemoteViewingControls 
              isPlaying={isPlaying}
              selectedPreset={selectedPreset}
            />
          )}

          {isGuidedPreset && (
            <GuidedModeControls
              guidedState={guidedState}
              onVoiceVolumeChange={handleVoiceVolumeChange}
              onVoiceSpeedChange={handleVoiceSpeedChange}
              onTextOverlayToggle={handleTextOverlayToggle}
              onSkipSegment={handleSkipSegment}
              onReplaySegment={handleReplaySegment}
              sessionProgress={sessionProgress}
              currentSegmentText={currentSegmentText}
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
          
          {isLucidDreamingPreset && (
            <LucidDreamingGuide selectedPreset={selectedPreset} />
          )}
          
          {isAstralProjectionPreset && (
            <AstralProjectionGuide selectedPreset={selectedPreset} />
          )}
          
          {isRemoteViewingPreset && (
            <RemoteViewingGuide selectedPreset={selectedPreset} />
          )}
        </div>
      </div>
    </div>
  );
};

export default MainContent;
