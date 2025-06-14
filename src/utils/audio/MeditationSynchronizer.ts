
import { MeditationScript, MeditationSegment, GuidedMeditationState } from '@/types/meditation';
import { VoiceManager } from '@/utils/tts/VoiceManager';

export class MeditationSynchronizer {
  private voiceManager: VoiceManager;
  private currentScript: MeditationScript | null = null;
  private currentSegmentIndex: number = 0;
  private segmentTimer: NodeJS.Timeout | null = null;
  private sessionStartTime: number = 0;
  private isRunning: boolean = false;
  private onStateChange: (state: Partial<GuidedMeditationState>) => void;

  constructor(
    voiceManager: VoiceManager,
    onStateChange: (state: Partial<GuidedMeditationState>) => void
  ) {
    this.voiceManager = voiceManager;
    this.onStateChange = onStateChange;
  }

  async startMeditation(script: MeditationScript, voiceSettings: any) {
    this.currentScript = script;
    this.currentSegmentIndex = 0;
    this.sessionStartTime = Date.now();
    this.isRunning = true;

    console.log(`Starting guided meditation: ${script.title}`);

    // Speak introduction
    try {
      this.onStateChange({ isVoicePlaying: true, currentSegmentIndex: -1 });
      await this.voiceManager.speak(script.introduction, voiceSettings);
      this.onStateChange({ isVoicePlaying: false });
    } catch (error) {
      console.error('Failed to speak introduction:', error);
    }

    // Start the meditation segments
    this.scheduleNextSegment(voiceSettings);
  }

  private async scheduleNextSegment(voiceSettings: any) {
    if (!this.currentScript || !this.isRunning) return;

    const segments = this.currentScript.segments;
    
    if (this.currentSegmentIndex >= segments.length) {
      // Meditation complete, speak conclusion
      try {
        this.onStateChange({ isVoicePlaying: true });
        await this.voiceManager.speak(this.currentScript.conclusion, voiceSettings);
        this.onStateChange({ isVoicePlaying: false });
      } catch (error) {
        console.error('Failed to speak conclusion:', error);
      }
      
      this.completeMeditation();
      return;
    }

    const segment = segments[this.currentSegmentIndex];
    this.onStateChange({ currentSegmentIndex: this.currentSegmentIndex });

    try {
      // Speak the segment text
      this.onStateChange({ isVoicePlaying: true });
      await this.voiceManager.speak(segment.text, voiceSettings);
      this.onStateChange({ isVoicePlaying: false });

      // Wait for pause if specified
      if (segment.pauseAfter) {
        await this.wait(segment.pauseAfter * 1000);
      }

    } catch (error) {
      console.error('Failed to speak segment:', error);
    }

    // Move to next segment
    this.currentSegmentIndex++;
    
    // Schedule next segment based on duration
    const nextDelay = segment.timing === 'during' ? segment.duration * 1000 : 1000;
    this.segmentTimer = setTimeout(() => {
      this.scheduleNextSegment(voiceSettings);
    }, nextDelay);
  }

  private wait(ms: number): Promise<void> {
    return new Promise(resolve => {
      setTimeout(resolve, ms);
    });
  }

  stop() {
    this.isRunning = false;
    
    if (this.segmentTimer) {
      clearTimeout(this.segmentTimer);
      this.segmentTimer = null;
    }

    this.voiceManager.stop();
    this.onStateChange({ 
      isVoicePlaying: false,
      currentSegmentIndex: 0
    });
  }

  private completeMeditation() {
    console.log('Meditation session completed');
    this.isRunning = false;
    this.onStateChange({
      isVoicePlaying: false,
      currentSegmentIndex: 0
    });
  }

  getCurrentSegment(): MeditationSegment | null {
    if (!this.currentScript || this.currentSegmentIndex < 0) return null;
    return this.currentScript.segments[this.currentSegmentIndex] || null;
  }

  getProgress(): number {
    if (!this.currentScript) return 0;
    return Math.min(1, this.currentSegmentIndex / this.currentScript.segments.length);
  }

  getElapsedTime(): number {
    return this.sessionStartTime ? (Date.now() - this.sessionStartTime) / 1000 : 0;
  }

  isActive(): boolean {
    return this.isRunning;
  }
}
