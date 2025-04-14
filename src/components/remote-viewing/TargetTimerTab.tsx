
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { TabsContent } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Play, Square } from 'lucide-react';
import TargetTimerSlider from './TargetTimerSlider';
import { formatMinutesSeconds, formatFullMinutes } from './utils/timeFormatters';

interface TargetTimerTabProps {
  startTargetFocus: (config: {
    countdownSeconds: number;
    focusSeconds: number;
    reportingSeconds: number;
    integrationSeconds: number;
    clearingSeconds: number;
  }) => void;
}

const TargetTimerTab: React.FC<TargetTimerTabProps> = ({ startTargetFocus }) => {
  const [isRunning, setIsRunning] = useState(false);
  const [countdown, setCountdown] = useState(60); // 1 minute
  const [focus, setFocus] = useState(900); // 15 minutes
  const [reporting, setReporting] = useState(600); // 10 minutes
  const [integration, setIntegration] = useState(300); // 5 minutes
  const [clearing, setClearing] = useState(30); // 30 seconds

  const handleStart = () => {
    setIsRunning(true);
    startTargetFocus({
      countdownSeconds: countdown,
      focusSeconds: focus,
      reportingSeconds: reporting,
      integrationSeconds: integration,
      clearingSeconds: clearing
    });
  };

  const handleStop = () => {
    setIsRunning(false);
    // Stop functionality would be implemented in the actual component
  };

  return (
    <TabsContent value="timer" className="space-y-4 pt-2">
      <Card className="p-4">
        <div className="space-y-4">
          <h3 className="text-sm font-medium">Target Focus Timer</h3>
          
          <div className="space-y-4">
            <TargetTimerSlider
              id="countdown"
              label="Preparation"
              value={countdown}
              min={30}
              max={300}
              step={30}
              onChange={setCountdown}
              formatTime={formatMinutesSeconds}
            />
            
            <TargetTimerSlider
              id="focus"
              label="Focus"
              value={focus}
              min={300}
              max={1800}
              step={300}
              onChange={setFocus}
              formatTime={formatFullMinutes}
            />
            
            <TargetTimerSlider
              id="reporting"
              label="Reporting"
              value={reporting}
              min={300}
              max={1800}
              step={300}
              onChange={setReporting}
              formatTime={formatFullMinutes}
            />
            
            <TargetTimerSlider
              id="integration"
              label="Integration"
              value={integration}
              min={60}
              max={600}
              step={60}
              onChange={setIntegration}
              formatTime={formatFullMinutes}
            />
            
            <TargetTimerSlider
              id="clearing"
              label="Clearing"
              value={clearing}
              min={10}
              max={60}
              step={5}
              onChange={setClearing}
              formatTime={formatMinutesSeconds}
            />
          </div>
          
          <div className="flex justify-center pt-2">
            {!isRunning ? (
              <Button 
                size="sm" 
                className="w-full" 
                onClick={handleStart}
              >
                <Play className="h-4 w-4 mr-2" />
                Start Session
              </Button>
            ) : (
              <Button 
                size="sm" 
                className="w-full" 
                variant="destructive" 
                onClick={handleStop}
              >
                <Square className="h-4 w-4 mr-2" />
                Stop Session
              </Button>
            )}
          </div>
        </div>
      </Card>
    </TabsContent>
  );
};

export default TargetTimerTab;
