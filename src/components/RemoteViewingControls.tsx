
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Timer, Mic, Sparkles, Target, WifiOff, Brain, AlertTriangle } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
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
  const [targetFocusConfig, setTargetFocusConfig] = useState({
    countdownSeconds: 30,
    focusSeconds: 300,
    reportingSeconds: 180,
    integrationSeconds: 120,
    clearingSeconds: 30
  });
  const [selectedTab, setSelectedTab] = useState('controls');
  const [selectedProtocol, setSelectedProtocol] = useState('crv');
  
  const startRecording = async () => {
    if (!isPlaying) {
      toast({
        title: "Start Playback First",
        description: "Please start a remote viewing frequency before recording.",
        variant: "destructive",
      });
      return;
    }
    
    try {
      await audioEngine.startRecording();
      setIsRecording(true);
      toast({
        title: "Recording Started",
        description: "Your voice notes are now being recorded.",
      });
    } catch (error) {
      toast({
        title: "Recording Failed",
        description: "Could not access microphone. Please check your browser permissions.",
        variant: "destructive",
      });
    }
  };
  
  const stopRecording = async () => {
    if (!isRecording) return;
    
    const audioBlob = await audioEngine.stopRecording();
    setIsRecording(false);
    
    if (audioBlob) {
      // Create a URL for the blob
      const audioUrl = URL.createObjectURL(audioBlob);
      
      toast({
        title: "Recording Saved",
        description: "Your voice notes have been saved.",
        action: (
          <Button variant="outline" onClick={() => window.open(audioUrl)}>
            Listen
          </Button>
        ),
      });
    } else {
      toast({
        title: "Recording Stopped",
        description: "No audio was recorded.",
      });
    }
  };
  
  const startTargetFocus = () => {
    if (!isPlaying) {
      toast({
        title: "Start Playback First",
        description: "Please start a remote viewing frequency before starting the target focus timer.",
        variant: "destructive",
      });
      return;
    }
    
    audioEngine.startTargetFocus(targetFocusConfig);
    
    toast({
      title: "Target Focus Timer Started",
      description: `Total session duration: ${
        Math.round((targetFocusConfig.countdownSeconds + 
          targetFocusConfig.focusSeconds + 
          targetFocusConfig.reportingSeconds + 
          targetFocusConfig.integrationSeconds + 
          targetFocusConfig.clearingSeconds) / 60)
      } minutes`,
    });
  };
  
  const clearEnergy = () => {
    if (!isPlaying) {
      toast({
        title: "Start Playback First",
        description: "Please start a remote viewing frequency before clearing energy.",
        variant: "destructive",
      });
      return;
    }
    
    audioEngine.clearEnergy(5000);
    
    toast({
      title: "Energy Clearing",
      description: "White noise segment playing to clear perceptual slate.",
    });
  };
  
  const changeProtocol = (protocol: string) => {
    setSelectedProtocol(protocol);
    
    if (isPlaying && selectedPreset?.startsWith('remote-')) {
      audioEngine.setRemoteViewingProtocol(protocol as 'crv' | 'erv' | 'arv');
      
      toast({
        title: `${protocol.toUpperCase()} Protocol Selected`,
        description: protocol === 'crv' 
          ? "Coordinate Remote Viewing: structured 6-stage protocol" 
          : protocol === 'erv'
            ? "Extended Remote Viewing: deeper states for extended sessions"
            : "Associative Remote Viewing: specialized for prediction tasks",
      });
    }
  };
  
  return (
    <Card className="border-indigo-400/30 bg-gradient-to-br from-indigo-950/10 to-purple-950/10">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center text-lg">
          <Target className="w-5 h-5 mr-2 text-indigo-400" />
          Remote Viewing Controls
        </CardTitle>
        <CardDescription>
          Tools for enhancing your remote viewing sessions
        </CardDescription>
      </CardHeader>
      
      <Tabs defaultValue="controls" value={selectedTab} onValueChange={setSelectedTab}>
        <TabsList className="w-full grid grid-cols-3">
          <TabsTrigger value="controls">Controls</TabsTrigger>
          <TabsTrigger value="timer">Target Timer</TabsTrigger>
          <TabsTrigger value="protocol">Protocol</TabsTrigger>
        </TabsList>
        
        <TabsContent value="controls" className="mt-4">
          <CardContent className="space-y-4 pb-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Mic className={`h-5 w-5 ${isRecording ? 'text-red-500 animate-pulse' : 'text-indigo-400'}`} />
                <Label htmlFor="recording">Voice Notes</Label>
              </div>
              
              <Button 
                variant={isRecording ? "destructive" : "outline"} 
                size="sm"
                onClick={isRecording ? stopRecording : startRecording}
                disabled={!selectedPreset?.startsWith('remote-')}
              >
                {isRecording ? "Stop Recording" : "Start Recording"}
              </Button>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <WifiOff className="h-5 w-5 text-indigo-400" />
                <Label htmlFor="clear-energy">Clear Energy</Label>
              </div>
              
              <Button 
                variant="outline" 
                size="sm"
                onClick={clearEnergy}
                disabled={!selectedPreset?.startsWith('remote-')}
              >
                Clear Now
              </Button>
            </div>
            
            <div className="pt-2 border-t border-indigo-800/20">
              <p className="text-xs text-muted-foreground mt-2">
                For best results, use headphones and find a quiet, distraction-free environment.
              </p>
            </div>
          </CardContent>
        </TabsContent>
        
        <TabsContent value="timer" className="mt-4">
          <CardContent className="space-y-4 pb-3">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Label htmlFor="countdown" className="text-xs w-28">Countdown:</Label>
                <div className="flex-1 flex items-center gap-2">
                  <Slider 
                    id="countdown"
                    value={[targetFocusConfig.countdownSeconds]} 
                    min={0}
                    max={120}
                    step={10}
                    onValueChange={(value) => setTargetFocusConfig({...targetFocusConfig, countdownSeconds: value[0]})}
                  />
                  <span className="text-xs w-12">{Math.round(targetFocusConfig.countdownSeconds / 60)}:{(targetFocusConfig.countdownSeconds % 60).toString().padStart(2, '0')}</span>
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <Label htmlFor="focus" className="text-xs w-28">Focus Phase:</Label>
                <div className="flex-1 flex items-center gap-2">
                  <Slider 
                    id="focus"
                    value={[targetFocusConfig.focusSeconds]} 
                    min={60}
                    max={1800}
                    step={60}
                    onValueChange={(value) => setTargetFocusConfig({...targetFocusConfig, focusSeconds: value[0]})}
                  />
                  <span className="text-xs w-12">{Math.floor(targetFocusConfig.focusSeconds / 60)}:00</span>
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <Label htmlFor="reporting" className="text-xs w-28">Reporting:</Label>
                <div className="flex-1 flex items-center gap-2">
                  <Slider 
                    id="reporting"
                    value={[targetFocusConfig.reportingSeconds]} 
                    min={60}
                    max={900}
                    step={60}
                    onValueChange={(value) => setTargetFocusConfig({...targetFocusConfig, reportingSeconds: value[0]})}
                  />
                  <span className="text-xs w-12">{Math.floor(targetFocusConfig.reportingSeconds / 60)}:00</span>
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <Label htmlFor="integration" className="text-xs w-28">Integration:</Label>
                <div className="flex-1 flex items-center gap-2">
                  <Slider 
                    id="integration"
                    value={[targetFocusConfig.integrationSeconds]} 
                    min={0}
                    max={600}
                    step={60}
                    onValueChange={(value) => setTargetFocusConfig({...targetFocusConfig, integrationSeconds: value[0]})}
                  />
                  <span className="text-xs w-12">{Math.floor(targetFocusConfig.integrationSeconds / 60)}:00</span>
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <Label htmlFor="clearing" className="text-xs w-28">Clearing:</Label>
                <div className="flex-1 flex items-center gap-2">
                  <Slider 
                    id="clearing"
                    value={[targetFocusConfig.clearingSeconds]} 
                    min={0}
                    max={120}
                    step={10}
                    onValueChange={(value) => setTargetFocusConfig({...targetFocusConfig, clearingSeconds: value[0]})}
                  />
                  <span className="text-xs w-12">{Math.round(targetFocusConfig.clearingSeconds / 60)}:{(targetFocusConfig.clearingSeconds % 60).toString().padStart(2, '0')}</span>
                </div>
              </div>
            </div>
            
            <Button 
              className="w-full mt-2" 
              onClick={startTargetFocus}
              disabled={!selectedPreset?.startsWith('remote-')}
            >
              <Timer className="mr-2 h-4 w-4" />
              Start Target Focus Timer
            </Button>
          </CardContent>
        </TabsContent>
        
        <TabsContent value="protocol" className="mt-4">
          <CardContent className="space-y-4 pb-3">
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <Brain className="h-5 w-5 text-indigo-400" />
                <Label htmlFor="protocol">Select Protocol</Label>
              </div>
              
              <Select 
                value={selectedProtocol} 
                onValueChange={changeProtocol}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select protocol" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="crv">CRV - Coordinate Remote Viewing</SelectItem>
                  <SelectItem value="erv">ERV - Extended Remote Viewing</SelectItem>
                  <SelectItem value="arv">ARV - Associative Remote Viewing</SelectItem>
                </SelectContent>
              </Select>
              
              <div className="p-3 bg-indigo-950/20 rounded-md">
                {selectedProtocol === 'crv' && (
                  <div className="space-y-2">
                    <h4 className="text-sm font-medium">CRV Protocol</h4>
                    <p className="text-xs text-muted-foreground">A structured 6-stage approach:</p>
                    <ul className="text-xs text-muted-foreground list-disc pl-4 space-y-1">
                      <li>Stage 1: Ideogram - Initial impressions</li>
                      <li>Stage 2: Sensory data - Tastes, smells, etc.</li>
                      <li>Stage 3: Dimensional data - Sizes, shapes</li>
                      <li>Stage 4: Emotional/aesthetic data</li>
                      <li>Stage 5: Analytical data</li>
                      <li>Stage 6: Summary and debriefing</li>
                    </ul>
                  </div>
                )}
                
                {selectedProtocol === 'erv' && (
                  <div className="space-y-2">
                    <h4 className="text-sm font-medium">ERV Protocol</h4>
                    <p className="text-xs text-muted-foreground">Uses deeper delta states:</p>
                    <ul className="text-xs text-muted-foreground list-disc pl-4 space-y-1">
                      <li>Longer sessions (typically 60+ minutes)</li>
                      <li>Deeper delta wave entrainment</li>
                      <li>Semi-dream state approach</li>
                      <li>Less structured than CRV</li>
                      <li>Enhanced for spatial details</li>
                    </ul>
                  </div>
                )}
                
                {selectedProtocol === 'arv' && (
                  <div className="space-y-2">
                    <h4 className="text-sm font-medium">ARV Protocol</h4>
                    <p className="text-xs text-muted-foreground">Optimized for binary predictions:</p>
                    <ul className="text-xs text-muted-foreground list-disc pl-4 space-y-1">
                      <li>Associating targets with outcomes</li>
                      <li>Useful for future event prediction</li>
                      <li>Alternating beta-theta frequencies</li>
                      <li>Specialized for binary choices</li>
                      <li>Enhanced pattern recognition</li>
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </CardContent>
        </TabsContent>
      </Tabs>
      
      <CardFooter className="pt-0 flex justify-between items-center">
        <div className="flex items-center">
          <AlertTriangle className="h-4 w-4 text-amber-400 mr-2" />
          <span className="text-xs text-muted-foreground">Session data is not saved between sessions</span>
        </div>
      </CardFooter>
    </Card>
  );
};

export default RemoteViewingControls;
