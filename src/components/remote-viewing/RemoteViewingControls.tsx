
import React, { useEffect, useState } from 'react';
import { CardFooter } from '@/components/ui/card';
import { AlertTriangle } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import RemoteViewingControlCard from './RemoteViewingControlCard';
import BaseControlsTab from './BaseControlsTab';
import TargetTimerTab from './TargetTimerTab';
import ProtocolTab from './ProtocolTab';
import VoiceRecordingControl from './VoiceRecordingControl';
import EnergyClearingControl from './EnergyClearingControl';
import audioEngine from '@/utils/audioEngine';

interface RemoteViewingControlsProps {
  isPlaying: boolean;
  selectedPreset: string | null;
}

const RemoteViewingControls: React.FC<RemoteViewingControlsProps> = ({ 
  isPlaying, 
  selectedPreset 
}) => {
  const { toast } = useToast();
  const [isRecording, setIsRecording] = useState(false);
  const [targetFocusRunning, setTargetFocusRunning] = useState(false);
  const [targetFocusConfig, setTargetFocusConfig] = useState({
    countdownSeconds: 30,
    focusSeconds: 300,
    reportingSeconds: 180,
    integrationSeconds: 120,
    clearingSeconds: 30
  });
  const [selectedTab, setSelectedTab] = useState('controls');
  const [selectedProtocol, setSelectedProtocol] = useState('crv');
  const [baseFrequency, setBaseFrequency] = useState(200);
  const [beatFrequency, setBeatFrequency] = useState(4); // 4Hz is specific for remote viewing
  
  const isRemoteViewingPreset = Boolean(selectedPreset?.startsWith('remote-'));

  // Keep the protocol selector in sync when a protocol preset is selected
  useEffect(() => {
    if (
      selectedPreset === 'remote-crv' ||
      selectedPreset === 'remote-erv' ||
      selectedPreset === 'remote-arv'
    ) {
      setSelectedProtocol(selectedPreset.replace('remote-', '') as 'crv' | 'erv' | 'arv');
    }
  }, [selectedPreset]);

  // Keep the target timer button in sync with the real engine timer
  useEffect(() => {
    if (!isRemoteViewingPreset || !isPlaying) {
      setTargetFocusRunning(false);
      return;
    }

    const syncRunningState = () => {
      setTargetFocusRunning(audioEngine.isTargetFocusRunning());
    };

    syncRunningState();
    const intervalId = window.setInterval(syncRunningState, 1000);
    return () => window.clearInterval(intervalId);
  }, [isRemoteViewingPreset, isPlaying, selectedPreset]);

  // Stop any in-progress recording when playback ends
  useEffect(() => {
    if (isPlaying || !isRecording) return;

    audioEngine.stopRecording()
      .then(() => setIsRecording(false))
      .catch(() => setIsRecording(false));
  }, [isPlaying, isRecording]);

  const handleBaseFrequencyChange = (value: number) => {
    setBaseFrequency(value);
    audioEngine.setBaseFrequency(value);
  };

  const handleBeatFrequencyChange = (value: number) => {
    setBeatFrequency(value);
    audioEngine.setBeatFrequency(value);
  };

  const setProtocol = (protocol: 'crv' | 'erv' | 'arv') => {
    setSelectedProtocol(protocol);
    audioEngine.setRemoteViewingProtocol(protocol);

    if (isPlaying && isRemoteViewingPreset) {
      toast({
        title: `${protocol.toUpperCase()} Protocol Applied`,
        description: "Session progression audio is now following the selected protocol.",
        duration: 3000,
      });
    }
  };

  const startTargetFocus = (config: {
    countdownSeconds: number;
    focusSeconds: number;
    reportingSeconds: number;
    integrationSeconds: number;
    clearingSeconds: number;
  }) => {
    setTargetFocusConfig(config);

    if (!isRemoteViewingPreset || !isPlaying) {
      toast({
        title: "Start Playback First",
        description: "Start a remote viewing frequency before beginning a target focus session.",
        variant: "destructive",
      });
      return;
    }

    audioEngine.startTargetFocus(config);
    setTargetFocusRunning(true);

    toast({
      title: "Target Focus Session Started",
      description: `Preparation ${config.countdownSeconds}s · Focus ${config.focusSeconds}s · Reporting ${config.reportingSeconds}s`,
      duration: 5000,
    });
  };

  const stopTargetFocus = () => {
    audioEngine.cancelTargetFocus();
    setTargetFocusRunning(false);

    toast({
      title: "Target Focus Session Stopped",
      description: "The session has been cancelled.",
      duration: 3000,
    });
  };
  
  return (
    <RemoteViewingControlCard selectedTab={selectedTab} onTabChange={setSelectedTab}>
      <BaseControlsTab 
        currentProtocol={selectedProtocol}
        setProtocol={setProtocol}
        baseFrequency={baseFrequency}
        beatFrequency={beatFrequency}
        handleBaseFrequencyChange={handleBaseFrequencyChange}
        handleBeatFrequencyChange={handleBeatFrequencyChange}
        isRecording={isRecording}
        setIsRecording={setIsRecording}
        isPlaybackActive={isPlaying}
        isRemoteViewingPreset={isRemoteViewingPreset}
      />
      
      <TargetTimerTab
        startTargetFocus={startTargetFocus}
        cancelTargetFocus={stopTargetFocus}
        isTargetFocusRunning={targetFocusRunning}
        isPlaybackActive={isPlaying}
        isRemoteViewingPreset={isRemoteViewingPreset}
        targetFocusConfig={targetFocusConfig}
        setTargetFocusConfig={setTargetFocusConfig}
      />
      
      <ProtocolTab 
        selectedProtocol={selectedProtocol}
        setSelectedProtocol={setProtocol}
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
