import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { CloudRain, Waves, Wind, Music2 } from 'lucide-react';

const ambientSounds = [
  { id: 'rain', name: 'Rain', icon: <CloudRain className="h-5 w-5 text-blue-400" /> },
  { id: 'ocean', name: 'Ocean Waves', icon: <Waves className="h-5 w-5 text-cyan-400" /> },
  { id: 'wind', name: 'Wind', icon: <Wind className="h-5 w-5 text-gray-400" /> },
];

interface AmbientSoundControlsProps {
  ambientSounds: Record<string, { isOn: boolean; volume: number }>;
  onToggle: (soundId: string, isOn: boolean) => void;
  onVolumeChange: (soundId: string, volume: number) => void;
}

const AmbientSoundControls: React.FC<AmbientSoundControlsProps> = ({
  ambientSounds: soundStates,
  onToggle,
  onVolumeChange,
}) => {
  const handleVolumeChange = (id: string, value: number[]) => {
    onVolumeChange(id, value[0] / 100);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Music2 className="h-5 w-5" /> Ambient Sound Mixer
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {ambientSounds.map(sound => (
          <div key={sound.id} className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                {sound.icon}
                <label htmlFor={`switch-${sound.id}`} className="text-sm font-medium cursor-pointer">
                  {sound.name}
                </label>
              </div>
              <Switch
                id={`switch-${sound.id}`}
                checked={soundStates[sound.id].isOn}
                onCheckedChange={(checked) => onToggle(sound.id, checked)}
              />
            </div>
            {soundStates[sound.id].isOn && (
              <div className="flex items-center space-x-3 pt-1">
                <Slider
                  value={[soundStates[sound.id].volume * 100]}
                  max={100}
                  step={1}
                  onValueChange={(value) => handleVolumeChange(sound.id, value)}
                  className="flex-1"
                />
                <span className="text-xs text-muted-foreground w-8 text-center">
                  {Math.round(soundStates[sound.id].volume * 100)}%
                </span>
              </div>
            )}
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default AmbientSoundControls;
