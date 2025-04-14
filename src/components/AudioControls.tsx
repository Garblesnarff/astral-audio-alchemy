
import React from 'react';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Play, Pause, Volume2, VolumeX } from 'lucide-react';
import { getPresetById } from '@/utils/presets';

interface AudioControlsProps {
  isPlaying: boolean;
  volume: number;
  selectedPreset: string | null;
  onTogglePlay: () => void;
  onVolumeChange: (value: number) => void;
}

const AudioControls: React.FC<AudioControlsProps> = ({ 
  isPlaying, 
  volume, 
  selectedPreset, 
  onTogglePlay, 
  onVolumeChange 
}) => {
  return (
    <div className="flex flex-col sm:flex-row items-center gap-4 justify-between">
      <div className="flex items-center space-x-2">
        <Button 
          size="lg"
          onClick={onTogglePlay} 
          className="h-14 w-14 rounded-full"
        >
          {isPlaying ? <Pause className="h-6 w-6" /> : <Play className="h-6 w-6 ml-0.5" />}
        </Button>
        <div className="text-sm">
          {isPlaying ? 'Now Playing' : 'Press Play'}
          {selectedPreset && isPlaying && (
            <div className="text-xs text-muted-foreground">
              {getPresetById(selectedPreset)?.name}
            </div>
          )}
        </div>
      </div>
      
      <div className="flex items-center space-x-2 w-full max-w-xs">
        <VolumeX className="h-4 w-4 text-muted-foreground" />
        <Slider
          value={[volume]}
          max={1}
          step={0.01}
          onValueChange={(value) => onVolumeChange(value[0])}
          className="flex-1"
        />
        <Volume2 className="h-4 w-4 text-muted-foreground" />
      </div>
    </div>
  );
};

export default AudioControls;
