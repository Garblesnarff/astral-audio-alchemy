
import React from 'react';
import { Slider } from '@/components/ui/slider';
import { Label } from '@/components/ui/label';
import { Sliders } from 'lucide-react';

interface FrequencyControlsProps {
  baseFrequency: number;
  beatFrequency: number;
  onBaseFrequencyChange: (value: number) => void;
  onBeatFrequencyChange: (value: number) => void;
  disabled?: boolean;
}

const FrequencyControls: React.FC<FrequencyControlsProps> = ({
  baseFrequency,
  beatFrequency,
  onBaseFrequencyChange,
  onBeatFrequencyChange,
  disabled = false
}) => {
  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-2 mb-4">
        <Sliders className="h-4 w-4 text-muted-foreground" />
        <span className="text-sm font-medium">Custom Frequencies</span>
      </div>
      
      <div className="space-y-6">
        <div className="space-y-2">
          <div className="flex justify-between">
            <Label htmlFor="baseFrequency">Base Frequency</Label>
            <span className="text-xs text-muted-foreground">{baseFrequency} Hz</span>
          </div>
          <Slider
            id="baseFrequency"
            value={[baseFrequency]}
            min={80}
            max={500}
            step={1}
            className="frequency-slider"
            onValueChange={(value) => onBaseFrequencyChange(value[0])}
            disabled={disabled}
          />
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>80 Hz</span>
            <span>500 Hz</span>
          </div>
        </div>
        
        <div className="space-y-2">
          <div className="flex justify-between">
            <Label htmlFor="beatFrequency">Beat Frequency</Label>
            <span className="text-xs text-muted-foreground">{beatFrequency} Hz</span>
          </div>
          <Slider
            id="beatFrequency"
            value={[beatFrequency]}
            min={1}
            max={30}
            step={0.1}
            className="frequency-slider"
            onValueChange={(value) => onBeatFrequencyChange(value[0])}
            disabled={disabled}
          />
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>1 Hz (Delta)</span>
            <span>30 Hz (Gamma)</span>
          </div>
        </div>
      </div>
      
      <div className="text-xs text-muted-foreground mt-4">
        <p>• Delta (1-4 Hz): Deep sleep, healing</p>
        <p>• Theta (4-8 Hz): Meditation, creativity</p>
        <p>• Alpha (8-14 Hz): Relaxation, calmness</p>
        <p>• Beta (14-30 Hz): Focus, alertness</p>
      </div>
    </div>
  );
};

export default FrequencyControls;
