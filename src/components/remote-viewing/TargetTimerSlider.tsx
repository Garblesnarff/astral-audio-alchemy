
import React from 'react';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';

interface TargetTimerSliderProps {
  id: string;
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  onChange: (value: number) => void;
  formatTime: (seconds: number) => string;
}

const TargetTimerSlider: React.FC<TargetTimerSliderProps> = ({
  id,
  label,
  value,
  min,
  max,
  step,
  onChange,
  formatTime
}) => {
  return (
    <div className="flex items-center justify-between">
      <Label htmlFor={id} className="text-xs w-28">{label}:</Label>
      <div className="flex-1 flex items-center gap-2">
        <Slider 
          id={id}
          value={[value]} 
          min={min}
          max={max}
          step={step}
          onValueChange={(newValues) => onChange(newValues[0])}
        />
        <span className="text-xs w-12">{formatTime(value)}</span>
      </div>
    </div>
  );
};

export default TargetTimerSlider;
