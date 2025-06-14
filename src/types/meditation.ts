
export interface MeditationScript {
  id: string;
  title: string;
  introduction: string;
  segments: MeditationSegment[];
  conclusion: string;
  totalDuration: number;
}

export interface MeditationSegment {
  text: string;
  duration: number; // seconds
  timing: 'start' | 'during' | 'end';
  pauseAfter?: number;
}

export interface VoiceSettings {
  voiceId: string;
  speed: number;
  volume: number;
  pitch?: number;
}

export interface GuidedMeditationState {
  isGuidedMode: boolean;
  currentSegmentIndex: number;
  isVoicePlaying: boolean;
  voiceVolume: number;
  voiceSpeed: number;
  showTextOverlay: boolean;
}
