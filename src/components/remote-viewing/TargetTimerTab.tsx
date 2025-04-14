
import React from 'react';
import { TabsContent, TabsContentProps } from '@/components/ui/tabs';
import { CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Timer } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import audioEngine from '@/utils/audioEngine';
import TargetTimerSlider from './TargetTimerSlider';
import { formatMinutesSeconds, formatFullMinutes } from './utils/timeFormatters';

interface TargetTimerTabProps extends TabsContentProps {
  isPlaybackActive: boolean;
  isRemoteViewingPreset: boolean;
  targetFocusConfig: {
    countdownSeconds: number;
    focusSeconds: number;
    reportingSeconds: number;
    integrationSeconds: number;
    clearingSeconds: number;
  };
  setTargetFocusConfig: React.Dispatch<React.SetStateAction<{
    countdownSeconds: number;
    focusSeconds: number;
    reportingSeconds: number;
    integrationSeconds: number;
    clearingSeconds: number;
  }>>;
}

const TargetTimerTab: React.FC<TargetTimerTabProps> = ({
  isPlaybackActive,
  isRemoteViewingPreset,
  targetFocusConfig,
  setTargetFocusConfig,
  ...props
}) => {
  const { toast } = useToast();
  
  const startTargetFocus = () => {
    if (!isPlaybackActive) {
      toast({
        title: "Start Playback First",
        description: "Please start a remote viewing frequency before starting the target focus timer.",
        variant: "destructive",
      });
      return;
    }
    
    audioEngine.startTargetFocus(targetFocusConfig);
    
    const totalMinutes = Math.round(
      (targetFocusConfig.countdownSeconds + 
      targetFocusConfig.focusSeconds + 
      targetFocusConfig.reportingSeconds + 
      targetFocusConfig.integrationSeconds + 
      targetFocusConfig.clearingSeconds) / 60
    );
    
    toast({
      title: "Target Focus Timer Started",
      description: `Total session duration: ${totalMinutes} minutes`,
    });
  };
  
  return (
    <TabsContent value="timer" className="mt-4" {...props}>
      <CardContent className="space-y-4 pb-3">
        <div className="space-y-3">
          <TargetTimerSlider
            id="countdown"
            label="Countdown"
            value={targetFocusConfig.countdownSeconds}
            min={0}
            max={120}
            step={10}
            onChange={(value) => setTargetFocusConfig({...targetFocusConfig, countdownSeconds: value})}
            formatTime={formatMinutesSeconds}
          />
          
          <TargetTimerSlider
            id="focus"
            label="Focus Phase"
            value={targetFocusConfig.focusSeconds}
            min={60}
            max={1800}
            step={60}
            onChange={(value) => setTargetFocusConfig({...targetFocusConfig, focusSeconds: value})}
            formatTime={formatFullMinutes}
          />
          
          <TargetTimerSlider
            id="reporting"
            label="Reporting"
            value={targetFocusConfig.reportingSeconds}
            min={60}
            max={900}
            step={60}
            onChange={(value) => setTargetFocusConfig({...targetFocusConfig, reportingSeconds: value})}
            formatTime={formatFullMinutes}
          />
          
          <TargetTimerSlider
            id="integration"
            label="Integration"
            value={targetFocusConfig.integrationSeconds}
            min={0}
            max={600}
            step={60}
            onChange={(value) => setTargetFocusConfig({...targetFocusConfig, integrationSeconds: value})}
            formatTime={formatFullMinutes}
          />
          
          <TargetTimerSlider
            id="clearing"
            label="Clearing"
            value={targetFocusConfig.clearingSeconds}
            min={0}
            max={120}
            step={10}
            onChange={(value) => setTargetFocusConfig({...targetFocusConfig, clearingSeconds: value})}
            formatTime={formatMinutesSeconds}
          />
        </div>
        
        <Button 
          className="w-full mt-2" 
          onClick={startTargetFocus}
          disabled={!isRemoteViewingPreset}
        >
          <Timer className="mr-2 h-4 w-4" />
          Start Target Focus Timer
        </Button>
      </CardContent>
    </TabsContent>
  );
};

export default TargetTimerTab;
