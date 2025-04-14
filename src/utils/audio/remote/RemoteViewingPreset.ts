
import { RemoteViewingBase } from './RemoteViewingBase';
import { RemoteViewingRecorder } from './RemoteViewingRecorder';
import { TargetFocusTimer } from './TargetFocusTimer';
import { RemoteViewingOscillators } from './RemoteViewingOscillators';
import { RemoteViewingProtocolManager } from './RemoteViewingProtocolManager';

/**
 * Remote Viewing Preset - Specialized audio engine for remote viewing experiences
 */
export class RemoteViewingPreset extends RemoteViewingBase {
  // Specialized modules
  private recorder: RemoteViewingRecorder;
  private targetTimer: TargetFocusTimer;
  private oscillators: RemoteViewingOscillators;
  private protocolManager: RemoteViewingProtocolManager;
  
  constructor() {
    super();
    this.recorder = new RemoteViewingRecorder();
    this.targetTimer = new TargetFocusTimer();
    this.oscillators = new RemoteViewingOscillators();
    this.protocolManager = new RemoteViewingProtocolManager();
  }
  
  /**
   * Initialize the audio context
   */
  override initialize(): boolean {
    const result = super.initialize();
    
    if (result && this.audioContext && this.leftGain && this.rightGain && this.masterGain) {
      this.oscillators.initialize(this.audioContext, this.leftGain, this.rightGain, this.masterGain);
      this.protocolManager.initialize(this.audioContext, this.masterGain);
      return true;
    }
    
    return false;
  }
  
  /**
   * Start the remote viewing binaural beat with specific preset
   */
  start(baseFreq: number, beatFreq: number, volume: number = 0.5, preset: string = 'remote-theta-delta'): void {
    if (!this.audioContext) {
      this.initialize();
    }
    
    this.stop();
    this.isPlaying = true;
    this.baseFrequency = baseFreq;
    this.beatFrequency = beatFreq;
    this.volume = volume;
    this.currentPreset = preset;
    
    if (this.audioContext && this.leftGain && this.rightGain && this.masterGain) {
      // Check if it's a protocol-based preset
      if (preset === 'remote-crv' || preset === 'remote-erv' || preset === 'remote-arv') {
        // Extract protocol name from preset (remove 'remote-' prefix)
        const protocol = preset.replace('remote-', '');
        this.currentProtocol = protocol;
        this.protocolManager.startProtocol(protocol);
      } else {
        // Regular frequency preset
        this.oscillators.startOscillators(preset, baseFreq, beatFreq);
      }
      
      // Set initial volume
      this.setVolume(volume);
    }
  }
  
  /**
   * Stop the remote viewing binaural beat
   */
  stop(): void {
    // Stop all oscillators
    this.oscillators.stopOscillators();
    
    // Stop protocol progression
    this.protocolManager.stopProtocol();
    
    // Clean up any active timers
    this.targetTimer.cancelTimer();
    
    // Stop recording if active
    this.stopRecording();
    
    this.isPlaying = false;
  }
  
  /**
   * Generate white noise for energy clearing
   */
  clearEnergy(durationMs: number = 5000): void {
    this.oscillators.clearEnergy(durationMs);
  }
  
  /**
   * Set up target focus timer
   */
  startTargetFocus(config: {
    countdownSeconds: number;
    focusSeconds: number;
    reportingSeconds: number;
    integrationSeconds: number;
    clearingSeconds: number;
  }): void {
    this.targetTimer.startTargetFocus(config, () => {
      // When timer ends, clear energy
      this.clearEnergy();
    });
  }
  
  /**
   * Start audio recording
   */
  startRecording(): Promise<void> {
    return this.recorder.startRecording();
  }
  
  /**
   * Stop audio recording
   */
  stopRecording(): Promise<Blob | null> {
    return this.recorder.stopRecording();
  }
  
  /**
   * Get current protocol
   */
  getCurrentProtocol(): string {
    return this.protocolManager.getCurrentProtocol();
  }
  
  /**
   * Set current protocol
   */
  setProtocol(protocol: 'crv' | 'erv' | 'arv'): void {
    this.protocolManager.setProtocol(protocol);
  }
  
  /**
   * Clean up all resources
   */
  cleanup(): void {
    this.stop();
    this.targetTimer.cleanup();
    this.oscillators.cleanup();
    this.protocolManager.cleanup();
    super.cleanup();
  }
}
