
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { Volume2, Mic, Eye, SkipForward, RotateCcw } from 'lucide-react';
import { GuidedMeditationState } from '@/types/meditation';

interface GuidedModeControlsProps {
  guidedState: GuidedMeditationState;
  onVoiceVolumeChange: (volume: number) => void;
  onVoiceSpeedChange: (speed: number) => void;
  onTextOverlayToggle: (show: boolean) => void;
  onSkipSegment: () => void;
  onReplaySegment: () => void;
  sessionProgress: number;
  currentSegmentText?: string;
}

const GuidedModeControls: React.FC<GuidedModeControlsProps> = ({
  guidedState,
  onVoiceVolumeChange,
  onVoiceSpeedChange,
  onTextOverlayToggle,
  onSkipSegment,
  onReplaySegment,
  sessionProgress,
  currentSegmentText
}) => {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Mic className="w-5 h-5" />
          Guided Meditation Controls
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        
        {/* Session Progress */}
        <div className="space-y-2">
          <Label className="text-sm font-medium">Session Progress</Label>
          <Progress value={sessionProgress * 100} className="w-full" />
          <div className="text-xs text-muted-foreground">
            Segment {guidedState.currentSegmentIndex + 1}
          </div>
        </div>

        {/* Voice Volume Control */}
        <div className="space-y-2">
          <Label className="text-sm font-medium flex items-center gap-2">
            <Volume2 className="w-4 h-4" />
            Voice Volume
          </Label>
          <Slider
            value={[guidedState.voiceVolume]}
            max={1}
            step={0.01}
            onValueChange={(value) => onVoiceVolumeChange(value[0])}
            className="w-full"
          />
          <div className="text-xs text-muted-foreground text-right">
            {Math.round(guidedState.voiceVolume * 100)}%
          </div>
        </div>

        {/* Voice Speed Control */}
        <div className="space-y-2">
          <Label className="text-sm font-medium">Voice Speed</Label>
          <Slider
            value={[guidedState.voiceSpeed]}
            min={0.5}
            max={1.5}
            step={0.1}
            onValueChange={(value) => onVoiceSpeedChange(value[0])}
            className="w-full"
          />
          <div className="text-xs text-muted-foreground text-right">
            {guidedState.voiceSpeed.toFixed(1)}x
          </div>
        </div>

        {/* Text Overlay Toggle */}
        <div className="flex items-center justify-between">
          <Label className="text-sm font-medium flex items-center gap-2">
            <Eye className="w-4 h-4" />
            Show Text Overlay
          </Label>
          <Switch
            checked={guidedState.showTextOverlay}
            onCheckedChange={onTextOverlayToggle}
          />
        </div>

        {/* Segment Controls */}
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={onReplaySegment}
            className="flex-1"
            disabled={!guidedState.isGuidedMode}
          >
            <RotateCcw className="w-4 h-4 mr-2" />
            Replay
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={onSkipSegment}
            className="flex-1"
            disabled={!guidedState.isGuidedMode}
          >
            <SkipForward className="w-4 h-4 mr-2" />
            Skip
          </Button>
        </div>

        {/* Current Text Display */}
        {guidedState.showTextOverlay && currentSegmentText && (
          <div className="mt-4 p-3 bg-muted rounded-lg">
            <Label className="text-xs font-medium text-muted-foreground">Current Instruction:</Label>
            <p className="text-sm mt-1 leading-relaxed">{currentSegmentText}</p>
          </div>
        )}

        {/* Voice Status */}
        {guidedState.isVoicePlaying && (
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            Voice guidance active
          </div>
        )}

      </CardContent>
    </Card>
  );
};

export default GuidedModeControls;
