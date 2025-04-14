
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/components/ui/use-toast';
import { Brain, Waves, Clock, Activity, HelpCircle } from 'lucide-react';
import audioEngine from '@/utils/audioEngine';

interface GatewayProcessControlsProps {
  isPlaying: boolean;
  selectedPreset: string | null;
}

const GatewayProcessControls: React.FC<GatewayProcessControlsProps> = ({ 
  isPlaying,
  selectedPreset 
}) => {
  const { toast } = useToast();
  const [currentFocusLevel, setCurrentFocusLevel] = useState<string>('focus10');
  const [sessionProgress, setSessionProgress] = useState<number>(0);
  const [activeTab, setActiveTab] = useState<string>('controls');
  const [resonantTuning, setResonantTuning] = useState<number>(7.83);
  
  const isGatewayPreset = selectedPreset?.startsWith('gateway-') || false;
  
  // Update focus level when preset changes
  useEffect(() => {
    if (isPlaying && isGatewayPreset) {
      const focusLevel = audioEngine.getCurrentFocusLevel();
      if (focusLevel) {
        setCurrentFocusLevel(focusLevel);
      }
      
      // Start progress tracking
      const progressInterval = setInterval(() => {
        const progress = audioEngine.getGatewaySessionProgress();
        setSessionProgress(progress);
      }, 5000);
      
      return () => clearInterval(progressInterval);
    }
  }, [isPlaying, isGatewayPreset, selectedPreset]);
  
  const handleChangeFocusLevel = (level: 'focus10' | 'focus12' | 'focus15' | 'focus21') => {
    if (isPlaying && isGatewayPreset) {
      audioEngine.setFocusLevel(level);
      setCurrentFocusLevel(level);
      
      toast({
        title: `Changed to ${getLevelName(level)}`,
        description: getLevelDescription(level),
        duration: 3000,
      });
    }
  };
  
  const handleResonantTuningChange = (value: number) => {
    setResonantTuning(value);
    // In a real implementation, this would adjust the resonant tuning frequency
  };
  
  const getLevelName = (level: string): string => {
    switch (level) {
      case 'focus10': return 'Focus 10: Mind Awake, Body Asleep';
      case 'focus12': return 'Focus 12: Expanded Awareness';
      case 'focus15': return 'Focus 15: No Time';
      case 'focus21': return 'Focus 21: Other Energy Systems';
      default: return level;
    }
  };
  
  const getLevelDescription = (level: string): string => {
    switch (level) {
      case 'focus10': return 'Body asleep while mind remains awake and alert';
      case 'focus12': return 'Expanded awareness beyond physical reality';
      case 'focus15': return 'State beyond time and space';
      case 'focus21': return 'Bridge to interdimensional consciousness';
      default: return '';
    }
  };
  
  // If no gateway preset is active, show informational message
  if (!isGatewayPreset) {
    return (
      <div className="p-4 border rounded-lg text-center bg-muted/50">
        <div className="flex justify-center mb-2">
          <Brain className="h-10 w-10 text-muted-foreground" />
        </div>
        <h3 className="text-lg font-medium">Gateway Process Controls</h3>
        <p className="text-sm text-muted-foreground mt-2">
          Select a Gateway Process preset to access specialized controls for consciousness exploration.
        </p>
      </div>
    );
  }
  
  return (
    <div className="bg-card border rounded-lg p-4 space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium">Gateway Process</h3>
        <Button variant="ghost" size="sm">
          <HelpCircle className="h-4 w-4 mr-2" />
          About
        </Button>
      </div>
      
      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <span>Session Progress</span>
          <span>{sessionProgress}%</span>
        </div>
        <Progress value={sessionProgress} className="h-2" />
      </div>
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-3 w-full">
          <TabsTrigger value="controls">
            <Activity className="h-4 w-4 mr-2" />
            <span>Controls</span>
          </TabsTrigger>
          <TabsTrigger value="levels">
            <Brain className="h-4 w-4 mr-2" />
            <span>Focus Levels</span>
          </TabsTrigger>
          <TabsTrigger value="guide">
            <HelpCircle className="h-4 w-4 mr-2" />
            <span>Guide</span>
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="controls" className="space-y-4 pt-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Current Focus Level</label>
            <div className="text-xl font-bold text-primary">{getLevelName(currentFocusLevel)}</div>
            <p className="text-sm text-muted-foreground">{getLevelDescription(currentFocusLevel)}</p>
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-medium">Resonant Tuning</label>
            <div className="flex items-center space-x-2">
              <Waves className="h-4 w-4 text-muted-foreground" />
              <Slider
                value={[resonantTuning]}
                min={1}
                max={15}
                step={0.1}
                onValueChange={(value) => handleResonantTuningChange(value[0])}
                disabled={!isPlaying}
              />
              <span className="text-xs text-muted-foreground w-12">{resonantTuning.toFixed(1)} Hz</span>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="levels" className="space-y-4 pt-4">
          <div className="grid grid-cols-2 gap-2">
            <Button 
              variant={currentFocusLevel === 'focus10' ? 'default' : 'outline'} 
              className="justify-start" 
              onClick={() => handleChangeFocusLevel('focus10')}
              disabled={!isPlaying}
            >
              <div className="text-left">
                <div className="font-medium">Focus 10</div>
                <div className="text-xs text-muted-foreground">Mind Awake, Body Asleep</div>
              </div>
            </Button>
            
            <Button 
              variant={currentFocusLevel === 'focus12' ? 'default' : 'outline'} 
              className="justify-start" 
              onClick={() => handleChangeFocusLevel('focus12')}
              disabled={!isPlaying}
            >
              <div className="text-left">
                <div className="font-medium">Focus 12</div>
                <div className="text-xs text-muted-foreground">Expanded Awareness</div>
              </div>
            </Button>
            
            <Button 
              variant={currentFocusLevel === 'focus15' ? 'default' : 'outline'} 
              className="justify-start" 
              onClick={() => handleChangeFocusLevel('focus15')}
              disabled={!isPlaying}
            >
              <div className="text-left">
                <div className="font-medium">Focus 15</div>
                <div className="text-xs text-muted-foreground">No Time</div>
              </div>
            </Button>
            
            <Button 
              variant={currentFocusLevel === 'focus21' ? 'default' : 'outline'} 
              className="justify-start" 
              onClick={() => handleChangeFocusLevel('focus21')}
              disabled={!isPlaying}
            >
              <div className="text-left">
                <div className="font-medium">Focus 21</div>
                <div className="text-xs text-muted-foreground">Other Energy Systems</div>
              </div>
            </Button>
          </div>
        </TabsContent>
        
        <TabsContent value="guide" className="space-y-4 pt-4">
          <div className="space-y-3">
            <h4 className="font-medium">The Gateway Process</h4>
            <p className="text-sm text-muted-foreground">
              Based on the Monroe Institute's research, the Gateway Process uses specially 
              designed audio patterns to synchronize the brain's hemispheres, enabling expanded 
              states of consciousness.
            </p>
            
            <h5 className="font-medium text-sm mt-3">Focus Levels</h5>
            <ul className="text-sm text-muted-foreground space-y-2">
              <li><strong>Focus 10:</strong> Mind fully awake while body is in a deep state of relaxation.</li>
              <li><strong>Focus 12:</strong> Expanded awareness beyond physical sensory input.</li>
              <li><strong>Focus 15:</strong> State outside time and space where consciousness exists independently.</li>
              <li><strong>Focus 21:</strong> Gateway to other realities and energy systems.</li>
            </ul>
            
            <p className="text-sm text-muted-foreground mt-3">
              For optimal results, use headphones and find a quiet, comfortable space
              where you can remain undisturbed for the duration of the session.
            </p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default GatewayProcessControls;
