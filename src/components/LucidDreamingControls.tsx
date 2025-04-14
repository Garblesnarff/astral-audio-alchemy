
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Moon, Bell, Clock, Zap } from 'lucide-react';
import audioEngine from '@/utils/audioEngine';
import { useToast } from '@/components/ui/use-toast';

interface LucidDreamingControlsProps {
  isPlaying: boolean;
  selectedPreset: string | null;
}

const LucidDreamingControls: React.FC<LucidDreamingControlsProps> = ({ 
  isPlaying, 
  selectedPreset 
}) => {
  const { toast } = useToast();
  const [realityCheckEnabled, setRealityCheckEnabled] = useState(false);
  const [realityCheckInterval, setRealityCheckInterval] = useState(15);
  const [wbtbEnabled, setWbtbEnabled] = useState(false);
  const [wbtbTime, setWbtbTime] = useState(90);
  
  const isLucidPreset = selectedPreset && selectedPreset.startsWith('lucid-');
  
  const handleRealityCheckToggle = (checked: boolean) => {
    setRealityCheckEnabled(checked);
    
    if (checked && isPlaying && isLucidPreset) {
      audioEngine.enableRealityCheck(realityCheckInterval);
      toast({
        title: "Reality Check Enabled",
        description: `Audio cues will play every ${realityCheckInterval} minutes`,
        duration: 3000,
      });
    } else {
      audioEngine.disableRealityCheck();
    }
  };
  
  const handleIntervalChange = (value: number[]) => {
    const interval = value[0];
    setRealityCheckInterval(interval);
    if (realityCheckEnabled && isPlaying && isLucidPreset) {
      audioEngine.disableRealityCheck();
      audioEngine.enableRealityCheck(interval);
    }
  };
  
  const handleWBTBToggle = (checked: boolean) => {
    setWbtbEnabled(checked);
    
    if (checked && isPlaying && selectedPreset === 'lucid-wbtb') {
      audioEngine.startWBTBTimer(wbtbTime);
      toast({
        title: "WBTB Timer Started",
        description: `You will be gently awakened after ${wbtbTime} minutes`,
        duration: 3000,
      });
    } else {
      audioEngine.cancelWBTB();
    }
  };
  
  const handleWBTBTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const time = parseInt(e.target.value);
    if (!isNaN(time) && time > 0) {
      setWbtbTime(time);
      if (wbtbEnabled && isPlaying && selectedPreset === 'lucid-wbtb') {
        audioEngine.cancelWBTB();
        audioEngine.startWBTBTimer(time);
      }
    }
  };
  
  if (!isLucidPreset) {
    return null;
  }
  
  return (
    <Card className="bg-gradient-to-br from-purple-900/50 to-purple-800/30 border-purple-700/50">
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center gap-2 text-lg text-purple-100">
          <Moon className="h-5 w-5 text-purple-300" />
          Lucid Dreaming Controls
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <Checkbox 
              id="realityCheck" 
              checked={realityCheckEnabled}
              onCheckedChange={handleRealityCheckToggle}
              disabled={!isPlaying || !isLucidPreset}
              className="data-[state=checked]:bg-purple-500 data-[state=checked]:border-purple-600"
            />
            <Label 
              htmlFor="realityCheck"
              className="flex items-center gap-2 text-sm font-medium cursor-pointer"
            >
              <Bell className="h-4 w-4" />
              Reality Check Sounds
            </Label>
          </div>
          
          {realityCheckEnabled && (
            <div className="pl-6 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs text-muted-foreground">Interval: {realityCheckInterval} minutes</span>
                <span className="text-xs text-muted-foreground">(5-60 minutes)</span>
              </div>
              <Slider
                value={[realityCheckInterval]}
                min={5}
                max={60}
                step={5}
                onValueChange={handleIntervalChange}
                disabled={!isPlaying || !realityCheckEnabled}
                className="w-full"
              />
            </div>
          )}
        </div>
        
        <div className={`space-y-2 ${selectedPreset !== 'lucid-wbtb' ? 'opacity-50' : ''}`}>
          <div className="flex items-center space-x-2">
            <Checkbox 
              id="wbtbTimer" 
              checked={wbtbEnabled}
              onCheckedChange={handleWBTBToggle}
              disabled={!isPlaying || selectedPreset !== 'lucid-wbtb'}
              className="data-[state=checked]:bg-purple-500 data-[state=checked]:border-purple-600"
            />
            <Label 
              htmlFor="wbtbTimer"
              className="flex items-center gap-2 text-sm font-medium cursor-pointer"
            >
              <Clock className="h-4 w-4" />
              Wake-Back-To-Bed (WBTB) Timer
            </Label>
          </div>
          
          {wbtbEnabled && selectedPreset === 'lucid-wbtb' && (
            <div className="pl-6 space-y-2">
              <Label htmlFor="wbtbTime" className="text-xs text-muted-foreground">
                Wake after (minutes):
              </Label>
              <Input
                id="wbtbTime"
                type="number"
                min={20}
                max={240}
                value={wbtbTime}
                onChange={handleWBTBTimeChange}
                disabled={!isPlaying || !wbtbEnabled}
                className="h-8 text-sm"
              />
              <p className="text-xs text-muted-foreground">
                Recommended: 90 minutes (one full sleep cycle)
              </p>
            </div>
          )}
        </div>
        
        <div className="mt-4 text-xs text-purple-300/80 border-t border-purple-700/30 pt-3">
          <div className="flex items-start gap-2">
            <Zap className="h-3 w-3 mt-0.5 text-purple-400" />
            <span>
              Lucid dreaming requires practice. Use binaural beats in combination with reality checks
              and dream journaling for best results.
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default LucidDreamingControls;
