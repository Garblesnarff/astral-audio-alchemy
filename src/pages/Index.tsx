
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
          {...audioState}
          currentTab={currentTab}
          setCurrentTab={setCurrentTab}
        />
      </div>
    </Layout>
  );
};

export default Index;
