
import { useState, useCallback, useRef, useEffect } from 'react';
import { GuidedMeditationState } from '@/types/meditation';
import { VoiceManager } from '@/utils/tts/VoiceManager';
import { MeditationSynchronizer } from '@/utils/audio/MeditationSynchronizer';
import { getPresetById } from '@/utils/presets';
import audioEngine from '@/utils/audioEngine';

export function useGuidedMeditation() {
  const [guidedState, setGuidedState] = useState<GuidedMeditationState>({
    isGuidedMode: false,
    currentSegmentIndex: 0,
    isVoicePlaying: false,
    voiceVolume: 0.7,
    voiceSpeed: 0.9,
    showTextOverlay: true
  });

  const voiceManagerRef = useRef<VoiceManager | null>(null);
  const synchronizerRef = useRef<MeditationSynchronizer | null>(null);
  const [sessionProgress, setSessionProgress] = useState(0);
  const [currentSegmentText, setCurrentSegmentText] = useState<string>('');

  // Initialize voice manager when audio context is available
  useEffect(() => {
    const audioContext = audioEngine.getAudioContext();
    if (audioContext && !voiceManagerRef.current) {
      voiceManagerRef.current = new VoiceManager(audioContext);
    }
  }, []);

  const updateGuidedState = useCallback((newState: Partial<GuidedMeditationState>) => {
    setGuidedState(prev => ({ ...prev, ...newState }));
  }, []);

  const startGuidedMeditation = useCallback((presetId: string) => {
    const preset = getPresetById(presetId);
    if (!preset?.meditationScript || !voiceManagerRef.current) return;

    if (!synchronizerRef.current) {
      synchronizerRef.current = new MeditationSynchronizer(
        voiceManagerRef.current,
        (state) => {
          updateGuidedState(state);
          
          // Update progress
          if (typeof state.currentSegmentIndex === 'number') {
            const progress = Math.max(0, state.currentSegmentIndex) / preset.meditationScript!.segments.length;
            setSessionProgress(progress);
            
            // Update current segment text
            const segment = preset.meditationScript!.segments[state.currentSegmentIndex];
            setCurrentSegmentText(segment?.text || '');
          }
        }
      );
    }

    const voiceSettings = preset.voiceSettings || {
      voiceId: 'Sarah',
      speed: guidedState.voiceSpeed,
      volume: guidedState.voiceVolume
    };

    synchronizerRef.current.startMeditation(preset.meditationScript, voiceSettings);
    updateGuidedState({ isGuidedMode: true });
  }, [guidedState.voiceSpeed, guidedState.voiceVolume, updateGuidedState]);

  const stopGuidedMeditation = useCallback(() => {
    synchronizerRef.current?.stop();
    updateGuidedState({ 
      isGuidedMode: false, 
      currentSegmentIndex: 0,
      isVoicePlaying: false 
    });
    setSessionProgress(0);
    setCurrentSegmentText('');
  }, [updateGuidedState]);

  const handleVoiceVolumeChange = useCallback((volume: number) => {
    voiceManagerRef.current?.setVolume(volume);
    updateGuidedState({ voiceVolume: volume });
  }, [updateGuidedState]);

  const handleVoiceSpeedChange = useCallback((speed: number) => {
    updateGuidedState({ voiceSpeed: speed });
  }, [updateGuidedState]);

  const handleTextOverlayToggle = useCallback((show: boolean) => {
    updateGuidedState({ showTextOverlay: show });
  }, [updateGuidedState]);

  const handleSkipSegment = useCallback(() => {
    // Implementation for skipping to next segment
    console.log('Skip segment requested');
  }, []);

  const handleReplaySegment = useCallback(() => {
    // Implementation for replaying current segment
    console.log('Replay segment requested');
  }, []);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      synchronizerRef.current?.stop();
      voiceManagerRef.current?.cleanup();
    };
  }, []);

  return {
    guidedState,
    sessionProgress,
    currentSegmentText,
    startGuidedMeditation,
    stopGuidedMeditation,
    handleVoiceVolumeChange,
    handleVoiceSpeedChange,
    handleTextOverlayToggle,
    handleSkipSegment,
    handleReplaySegment,
    updateGuidedState
  };
}
