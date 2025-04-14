
import React from 'react';
import { Card } from '@/components/ui/card';
import { TabsContent } from '@/components/ui/tabs';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';

interface BaseControlsTabProps {
  currentProtocol: string;
  setProtocol: (protocol: 'crv' | 'erv' | 'arv') => void;
  baseFrequency: number;
  beatFrequency: number;
  handleBaseFrequencyChange: (value: number) => void;
  handleBeatFrequencyChange: (value: number) => void;
  isRecording?: boolean;
  setIsRecording?: (isRecording: boolean) => void;
  isPlaybackActive?: boolean;
  isRemoteViewingPreset?: boolean;
}

const BaseControlsTab: React.FC<BaseControlsTabProps> = ({
  currentProtocol,
  setProtocol,
  baseFrequency,
  beatFrequency,
  handleBaseFrequencyChange,
  handleBeatFrequencyChange
}) => {
  return (
    <TabsContent value="base" className="space-y-4 pt-2">
      <div className="space-y-4">
        <Card className="p-4">
          <div className="space-y-4">
            <h3 className="text-sm font-medium">Protocol Selection</h3>
            <RadioGroup 
              value={currentProtocol} 
              onValueChange={(value) => setProtocol(value as 'crv' | 'erv' | 'arv')}
              className="grid grid-cols-3 gap-2"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="crv" id="crv" />
                <Label htmlFor="crv" className="text-xs">CRV</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="erv" id="erv" />
                <Label htmlFor="erv" className="text-xs">ERV</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="arv" id="arv" />
                <Label htmlFor="arv" className="text-xs">ARV</Label>
              </div>
            </RadioGroup>
          </div>
        </Card>
        
        <Card className="p-4">
          <div className="space-y-4">
            <h3 className="text-sm font-medium">Frequency Controls</h3>
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <Label htmlFor="base-frequency" className="text-xs">Base Frequency: {baseFrequency} Hz</Label>
                </div>
                <Slider 
                  id="base-frequency"
                  min={50} 
                  max={500} 
                  step={1} 
                  value={[baseFrequency]} 
                  onValueChange={(values) => handleBaseFrequencyChange(values[0])} 
                />
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <Label htmlFor="beat-frequency" className="text-xs">Beat Frequency: {beatFrequency} Hz</Label>
                </div>
                <Slider 
                  id="beat-frequency"
                  min={1} 
                  max={30} 
                  step={0.1} 
                  value={[beatFrequency]} 
                  onValueChange={(values) => handleBeatFrequencyChange(values[0])} 
                />
              </div>
            </div>
          </div>
        </Card>
      </div>
    </TabsContent>
  );
};

export default BaseControlsTab;
