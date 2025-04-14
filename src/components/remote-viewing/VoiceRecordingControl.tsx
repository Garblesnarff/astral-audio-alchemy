
import React from 'react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Mic } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import audioEngine from '@/utils/audioEngine';

interface VoiceRecordingControlProps {
  isRecording: boolean;
  setIsRecording: (isRecording: boolean) => void;
  isPlaybackActive: boolean;
  isRemoteViewingPreset: boolean;
}

const VoiceRecordingControl: React.FC<VoiceRecordingControlProps> = ({
  isRecording,
  setIsRecording,
  isPlaybackActive,
  isRemoteViewingPreset
}) => {
  const { toast } = useToast();
  
  const startRecording = async () => {
    if (!isPlaybackActive) {
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
  
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center space-x-2">
        <Mic className={`h-5 w-5 ${isRecording ? 'text-red-500 animate-pulse' : 'text-indigo-400'}`} />
        <Label htmlFor="recording">Voice Notes</Label>
      </div>
      
      <Button 
        variant={isRecording ? "destructive" : "outline"} 
        size="sm"
        onClick={isRecording ? stopRecording : startRecording}
        disabled={!isRemoteViewingPreset}
      >
        {isRecording ? "Stop Recording" : "Start Recording"}
      </Button>
    </div>
  );
};

export default VoiceRecordingControl;
