
import React from 'react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { WifiOff } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import audioEngine from '@/utils/audioEngine';

interface EnergyClearingControlProps {
  isPlaybackActive: boolean;
  isRemoteViewingPreset: boolean;
}

const EnergyClearingControl: React.FC<EnergyClearingControlProps> = ({
  isPlaybackActive,
  isRemoteViewingPreset
}) => {
  const { toast } = useToast();
  
  const clearEnergy = () => {
    if (!isPlaybackActive) {
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
  
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center space-x-2">
        <WifiOff className="h-5 w-5 text-indigo-400" />
        <Label htmlFor="clear-energy">Clear Energy</Label>
      </div>
      
      <Button 
        variant="outline" 
        size="sm"
        onClick={clearEnergy}
        disabled={!isRemoteViewingPreset}
      >
        Clear Now
      </Button>
    </div>
  );
};

export default EnergyClearingControl;
