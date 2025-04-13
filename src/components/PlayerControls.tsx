
import React from 'react';
import { Play, Pause, Volume2, VolumeX } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { getPresetById } from '@/utils/presets';

interface PlayerControlsProps {
  isPlaying: boolean;
  selectedPreset: string | null;
  volume: number;
  togglePlay: () => void;
  handleVolumeChange: (value: number) => void;
}

const PlayerControls: React.FC<PlayerControlsProps> = ({
  isPlaying,
  selectedPreset,
  volume,
  togglePlay,
  handleVolumeChange,
}) => (
  <div className="flex flex-col sm:flex-row items-center gap-4 justify-between">
    <div className="flex items-center space-x-2">
      <Button 
        size="lg"
        onClick={togglePlay} 
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
        onValueChange={(value) => handleVolumeChange(value[0])}
        className="flex-1"
      />
      <Volume2 className="h-4 w-4 text-muted-foreground" />
    </div>
  </div>
);

export default PlayerControls;
