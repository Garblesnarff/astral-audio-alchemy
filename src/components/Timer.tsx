
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Clock, RefreshCw } from 'lucide-react';

interface TimerProps {
  onTimerEnd: () => void;
  isPlaying: boolean;
}

const Timer: React.FC<TimerProps> = ({ onTimerEnd, isPlaying }) => {
  const [duration, setDuration] = useState<number>(0); // in minutes
  const [remainingTime, setRemainingTime] = useState<number>(0); // in seconds
  const [isTimerActive, setIsTimerActive] = useState<boolean>(false);
  
  const presetDurations = [
    { label: '15m', minutes: 15 },
    { label: '30m', minutes: 30 },
    { label: '1h', minutes: 60 },
  ];
  
  useEffect(() => {
    let interval: number | null = null;
    
    if (isTimerActive && isPlaying && remainingTime > 0) {
      interval = window.setInterval(() => {
        setRemainingTime(prev => {
          if (prev <= 1) {
            clearInterval(interval!);
            setIsTimerActive(false);
            onTimerEnd();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else if (!isPlaying || remainingTime === 0) {
      if (interval) clearInterval(interval);
    }
    
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isTimerActive, isPlaying, remainingTime, onTimerEnd]);
  
  const handleSetTimer = (minutes: number) => {
    setDuration(minutes);
    setRemainingTime(minutes * 60);
    setIsTimerActive(true);
  };
  
  const resetTimer = () => {
    setIsTimerActive(false);
    setRemainingTime(0);
    setDuration(0);
  };
  
  // Format time as mm:ss
  const formatTime = (totalSeconds: number): string => {
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };
  
  return (
    <div className="flex flex-col space-y-3">
      <div className="flex items-center space-x-2">
        <Clock className="h-4 w-4 text-muted-foreground" />
        <span className="text-sm font-medium">Timer</span>
      </div>
      
      <div className="grid grid-cols-3 gap-2">
        {presetDurations.map(preset => (
          <Button
            key={preset.label}
            variant="outline"
            size="sm"
            className={`${duration === preset.minutes && isTimerActive ? 'bg-primary/20' : ''}`}
            onClick={() => handleSetTimer(preset.minutes)}
            disabled={!isPlaying}
          >
            {preset.label}
          </Button>
        ))}
      </div>
      
      {isTimerActive && (
        <div className="flex items-center justify-between bg-card p-2 rounded-md">
          <div className="text-lg font-mono">{formatTime(remainingTime)}</div>
          <Button variant="ghost" size="icon" onClick={resetTimer} disabled={!isPlaying}>
            <RefreshCw className="h-4 w-4" />
          </Button>
        </div>
      )}
      
      {!isTimerActive && remainingTime === 0 && (
        <div className="text-sm text-muted-foreground text-center">
          Set a timer or play continuously
        </div>
      )}
    </div>
  );
};

export default Timer;
