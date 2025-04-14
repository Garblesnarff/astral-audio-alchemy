
import React, { useState } from 'react';
import { CardFooter } from '@/components/ui/card';
import { AlertTriangle } from 'lucide-react';
import RemoteViewingControlCard from './RemoteViewingControlCard';
import BaseControlsTab from './BaseControlsTab';
import TargetTimerTab from './TargetTimerTab';
import ProtocolTab from './ProtocolTab';

interface RemoteViewingControlsProps {
  isPlaying: boolean;
  selectedPreset: string | null;
}

const RemoteViewingControls: React.FC<RemoteViewingControlsProps> = ({ 
  isPlaying, 
  selectedPreset 
}) => {
  const [isRecording, setIsRecording] = useState(false);
  const [targetFocusConfig, setTargetFocusConfig] = useState({
    countdownSeconds: 30,
    focusSeconds: 300,
    reportingSeconds: 180,
    integrationSeconds: 120,
    clearingSeconds: 30
  });
  const [selectedTab, setSelectedTab] = useState('controls');
  const [selectedProtocol, setSelectedProtocol] = useState('crv');
  
  const isRemoteViewingPreset = Boolean(selectedPreset?.startsWith('remote-'));
  
  return (
    <RemoteViewingControlCard selectedTab={selectedTab} onTabChange={setSelectedTab}>
      <BaseControlsTab 
        isRecording={isRecording}
        setIsRecording={setIsRecording}
        isPlaybackActive={isPlaying}
        isRemoteViewingPreset={isRemoteViewingPreset}
      />
      
      <TargetTimerTab
        isPlaybackActive={isPlaying}
        isRemoteViewingPreset={isRemoteViewingPreset}
        targetFocusConfig={targetFocusConfig}
        setTargetFocusConfig={setTargetFocusConfig}
      />
      
      <ProtocolTab 
        selectedProtocol={selectedProtocol}
        setSelectedProtocol={setSelectedProtocol}
        isPlaybackActive={isPlaying}
        isRemoteViewingPreset={isRemoteViewingPreset}
      />
      
      <CardFooter className="pt-0 flex justify-between items-center">
        <div className="flex items-center">
          <AlertTriangle className="h-4 w-4 text-amber-400 mr-2" />
          <span className="text-xs text-muted-foreground">Session data is not saved between sessions</span>
        </div>
      </CardFooter>
    </RemoteViewingControlCard>
  );
};

export default RemoteViewingControls;
