
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Slider } from '@/components/ui/slider';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { 
  Rocket, 
  Star, 
  Clock, 
  Activity, 
  ArrowUpRight, 
  Sparkles,
  Globe
} from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import audioEngine from '@/utils/audioEngine';

interface AstralProjectionControlsProps {
  isPlaying: boolean;
  selectedPreset: string;
}

const AstralProjectionControls: React.FC<AstralProjectionControlsProps> = ({ 
  isPlaying, 
  selectedPreset 
}) => {
  const [returnSignalEnabled, setReturnSignalEnabled] = useState(false);
  const [journeyPhase, setJourneyPhase] = useState(0);
  const [vibrationIntensity, setVibrationIntensity] = useState(50);
  
  // Only show for astral projection presets
  if (!selectedPreset.startsWith('astral-')) {
    return null;
  }
  
  const handleReturnSignalToggle = (checked: boolean) => {
    setReturnSignalEnabled(checked);
    if (checked) {
      audioEngine.enableReturnSignal();
    } else {
      audioEngine.disableReturnSignal();
    }
  };
  
  const handleVibrationIntensityChange = (value: number[]) => {
    const intensity = value[0];
    setVibrationIntensity(intensity);
    // This would need to be implemented in the AstralProjectionPreset class
    // We could adjust some parameters based on this value
  };
  
  // Progressive Journey phases
  const journeyPhases = [
    { name: 'Relaxation', icon: <Clock className="h-4 w-4" />, color: 'text-blue-400' },
    { name: 'Body Awareness', icon: <Activity className="h-4 w-4" />, color: 'text-green-400' },
    { name: 'Vibrational', icon: <Sparkles className="h-4 w-4" />, color: 'text-yellow-400' },
    { name: 'Separation', icon: <ArrowUpRight className="h-4 w-4" />, color: 'text-amber-500' },
    { name: 'Exploration', icon: <Globe className="h-4 w-4" />, color: 'text-purple-400' },
    { name: 'Return', icon: <Star className="h-4 w-4" />, color: 'text-indigo-400' }
  ];
  
  // Show journey progress bar for the progressive preset
  const showJourneyProgress = selectedPreset === 'astral-progressive' && isPlaying;
  
  // Calculate current preset info
  let currentPhaseInfo;
  if (showJourneyProgress && journeyPhase < journeyPhases.length) {
    currentPhaseInfo = journeyPhases[journeyPhase];
  }
  
  return (
    <Card className="border-indigo-500/20 bg-gradient-to-br from-indigo-950/20 to-purple-950/30 backdrop-blur-sm">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg flex items-center gap-1">
            <Rocket className="h-5 w-5 text-indigo-400" /> Astral Projection Controls
          </CardTitle>
        </div>
        <CardDescription>
          Enhanced controls for out-of-body experiences
        </CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {showJourneyProgress && (
          <div className="space-y-2">
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>Journey Progress</span>
              <span>Phase {journeyPhase + 1}/6: {currentPhaseInfo?.name}</span>
            </div>
            
            <div className="w-full bg-secondary h-2 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-indigo-600 to-purple-600 transition-all"
                style={{ width: `${((journeyPhase) / (journeyPhases.length - 1)) * 100}%` }}
              />
            </div>
            
            <div className="flex justify-between mt-1">
              {journeyPhases.map((phase, index) => (
                <TooltipProvider key={index}>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <div 
                        className={`w-4 h-4 rounded-full flex items-center justify-center transition-all ${
                          index <= journeyPhase 
                            ? `bg-gradient-to-br from-indigo-500 to-purple-600 ${phase.color}` 
                            : 'bg-secondary'
                        }`}
                      >
                        {index <= journeyPhase && phase.icon}
                      </div>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>{phase.name} Phase</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              ))}
            </div>
          </div>
        )}
        
        {selectedPreset === 'astral-vibrational' && (
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-sm">Vibration Intensity</span>
              <span className="text-xs text-muted-foreground">{vibrationIntensity}%</span>
            </div>
            <Slider
              value={[vibrationIntensity]}
              min={10}
              max={100}
              step={5}
              onValueChange={handleVibrationIntensityChange}
              className="my-2"
            />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>Subtle</span>
              <span>Intense</span>
            </div>
          </div>
        )}
        
        <div className="flex items-center justify-between pt-2">
          <div className="flex items-center space-x-2">
            <Switch 
              id="return-signal" 
              checked={returnSignalEnabled} 
              onCheckedChange={handleReturnSignalToggle}
            />
            <label htmlFor="return-signal" className="text-sm cursor-pointer">
              Enable Return Signal
            </label>
          </div>
          
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Star className="h-4 w-4 text-amber-400" />
              </TooltipTrigger>
              <TooltipContent>
                <p className="w-60">
                  The return signal helps guide your consciousness back to your physical body
                  with subtle audio cues when your journey is complete.
                </p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </CardContent>
      
      <CardFooter className="pt-0">
        <div className="w-full text-xs text-muted-foreground bg-card/50 rounded p-2">
          <p>
            For best results: Practice in a quiet, dark room while laying flat on your back. 
            Headphones are essential. Stay calm during the vibrational stage.
          </p>
        </div>
      </CardFooter>
    </Card>
  );
};

export default AstralProjectionControls;
