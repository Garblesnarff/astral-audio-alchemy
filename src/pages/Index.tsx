
import React, { useState } from 'react';
import Layout from '@/components/Layout';
import InfoBanners from '@/components/InfoBanners';
import MainContent from '@/components/MainContent';
import { useAudioState } from '@/hooks/useAudioState';

const Index = () => {
  const [currentTab, setCurrentTab] = useState('relaxation');
  const audioState = useAudioState();
  
  return (
    <Layout>
      <div className="space-y-8">
        <InfoBanners />
        
        <MainContent 
          isPlaying={audioState.isPlaying}
          volume={audioState.volume}
          baseFrequency={audioState.baseFrequency}
          beatFrequency={audioState.beatFrequency}
          selectedPreset={audioState.selectedPreset}
          togglePlay={audioState.togglePlay}
          handleVolumeChange={audioState.handleVolumeChange}
          handleBaseFrequencyChange={audioState.handleBaseFrequencyChange}
          handleBeatFrequencyChange={audioState.handleBeatFrequencyChange}
          handleSelectPreset={audioState.handleSelectPreset}
          handleTimerEnd={audioState.handleTimerEnd}
          currentTab={currentTab}
          setCurrentTab={setCurrentTab}
        />
      </div>
    </Layout>
  );
};

export default Index;
