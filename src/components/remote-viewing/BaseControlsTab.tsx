
import React from 'react';
import { TabsContent, TabsContentProps } from '@/components/ui/tabs';
import { CardContent } from '@/components/ui/card';
import VoiceRecordingControl from './VoiceRecordingControl';
import EnergyClearingControl from './EnergyClearingControl';

interface BaseControlsTabProps extends TabsContentProps {
  isRecording: boolean;
  setIsRecording: (isRecording: boolean) => void;
  isPlaybackActive: boolean;
  isRemoteViewingPreset: boolean;
}

const BaseControlsTab: React.FC<BaseControlsTabProps> = ({
  isRecording,
  setIsRecording,
  isPlaybackActive,
  isRemoteViewingPreset,
  ...props
}) => {
  return (
    <TabsContent value="controls" className="mt-4" {...props}>
      <CardContent className="space-y-4 pb-3">
        <VoiceRecordingControl 
          isRecording={isRecording}
          setIsRecording={setIsRecording}
          isPlaybackActive={isPlaybackActive}
          isRemoteViewingPreset={isRemoteViewingPreset}
        />
        
        <EnergyClearingControl 
          isPlaybackActive={isPlaybackActive}
          isRemoteViewingPreset={isRemoteViewingPreset}
        />
        
        <div className="pt-2 border-t border-indigo-800/20">
          <p className="text-xs text-muted-foreground mt-2">
            For best results, use headphones and find a quiet, distraction-free environment.
          </p>
        </div>
      </CardContent>
    </TabsContent>
  );
};

export default BaseControlsTab;
