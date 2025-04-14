
import { RemoteViewingBase } from './RemoteViewingBase';
import { RemoteViewingRecorder } from './RemoteViewingRecorder';
import { TargetFocusTimer } from './TargetFocusTimer';
import { thetaDeltaMixGenerator } from './thetaDeltaMixGenerator';
import { enhancedAlphaGenerator } from './enhancedAlphaGenerator';
import { betaThetaCycleGenerator } from './betaThetaCycleGenerator';
import { whiteNoiseGenerator } from './whiteNoiseGenerator';
import { targetFocusMarkers } from './targetFocusMarkers';
import { sessionProgressionGenerator } from './sessionProgressionGenerator';

/**
 * Remote Viewing Preset - Specialized audio engine for remote viewing experiences
 */
export class RemoteViewingPreset extends RemoteViewingBase {
  private thetaDeltaOscillators: { leftOsc: OscillatorNode; rightOsc: OscillatorNode } | null = null;
  private enhancedAlphaOscillators: { leftOsc: OscillatorNode; rightOsc: OscillatorNode } | null = null;
  private betaThetaOscillators: { leftOsc: OscillatorNode; rightOsc: OscillatorNode } | null = null;
  private whiteNoiseNode: AudioBufferSourceNode | null = null;
  private targetFocusNodes: AudioNode[] = [];
  private sessionProgressionNodes: AudioNode[] = [];
  
  // Specialized modules
  private recorder: RemoteViewingRecorder;
  private targetTimer: TargetFocusTimer;
  
  constructor() {
    super();
    this.recorder = new RemoteViewingRecorder();
    this.targetTimer = new TargetFocusTimer();
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
    
    if (this.audioContext && this.leftGain && this.rightGain) {
      // Based on the preset, start the appropriate oscillators
      switch (preset) {
        case 'remote-theta-delta':
          this.thetaDeltaOscillators = thetaDeltaMixGenerator(
            this.audioContext,
            this.baseFrequency,
            this.beatFrequency,
            this.leftGain,
            this.rightGain
          );
          break;
        case 'remote-alpha':
          this.enhancedAlphaOscillators = enhancedAlphaGenerator(
            this.audioContext,
            this.baseFrequency,
            this.beatFrequency,
            this.leftGain,
            this.rightGain
          );
          break;
        case 'remote-beta-theta':
          this.betaThetaOscillators = betaThetaCycleGenerator(
            this.audioContext,
            this.baseFrequency,
            this.beatFrequency,
            this.leftGain,
            this.rightGain
          );
          break;
        case 'remote-focused':
          // For focused viewing, we use theta-delta with target focus markers
          this.thetaDeltaOscillators = thetaDeltaMixGenerator(
            this.audioContext,
            this.baseFrequency,
            this.beatFrequency,
            this.leftGain,
            this.rightGain
          );
          this.targetFocusNodes = targetFocusMarkers(
            this.audioContext,
            this.masterGain!
          );
          break;
        case 'remote-crv':
          // Coordinate Remote Viewing protocol
          this.currentProtocol = 'crv';
          this.sessionProgressionNodes = sessionProgressionGenerator(
            this.audioContext,
            this.masterGain!,
            'crv'
          );
          break;
        case 'remote-erv':
          // Extended Remote Viewing protocol
          this.currentProtocol = 'erv';
          this.sessionProgressionNodes = sessionProgressionGenerator(
            this.audioContext,
            this.masterGain!,
            'erv'
          );
          break;
        case 'remote-arv':
          // Associative Remote Viewing protocol
          this.currentProtocol = 'arv';
          this.sessionProgressionNodes = sessionProgressionGenerator(
            this.audioContext,
            this.masterGain!,
            'arv'
          );
          break;
        default:
          // Default to theta-delta mix
          this.thetaDeltaOscillators = thetaDeltaMixGenerator(
            this.audioContext,
            this.baseFrequency,
            this.beatFrequency,
            this.leftGain,
            this.rightGain
          );
      }
      
      // Set initial volume
      this.setVolume(volume);
    }
  }
  
  /**
   * Stop the remote viewing binaural beat
   */
  stop(): void {
    // Stop oscillators
    if (this.thetaDeltaOscillators) {
      this.thetaDeltaOscillators.leftOsc.stop();
      this.thetaDeltaOscillators.rightOsc.stop();
      this.thetaDeltaOscillators = null;
    }
    
    if (this.enhancedAlphaOscillators) {
      this.enhancedAlphaOscillators.leftOsc.stop();
      this.enhancedAlphaOscillators.rightOsc.stop();
      this.enhancedAlphaOscillators = null;
    }
    
    if (this.betaThetaOscillators) {
      this.betaThetaOscillators.leftOsc.stop();
      this.betaThetaOscillators.rightOsc.stop();
      this.betaThetaOscillators = null;
    }
    
    // Stop white noise
    if (this.whiteNoiseNode) {
      this.whiteNoiseNode.stop();
      this.whiteNoiseNode = null;
    }
    
    // Stop target focus markers
    this.targetFocusNodes.forEach(node => {
      if (node instanceof OscillatorNode) {
        node.stop();
      }
    });
    this.targetFocusNodes = [];
    
    // Stop session progression
    this.sessionProgressionNodes.forEach(node => {
      if (node instanceof OscillatorNode) {
        node.stop();
      }
    });
    this.sessionProgressionNodes = [];
    
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
    if (!this.audioContext) return;
    
    // If any white noise is currently playing, stop it
    if (this.whiteNoiseNode) {
      this.whiteNoiseNode.stop();
      this.whiteNoiseNode = null;
    }
    
    // Create new white noise
    this.whiteNoiseNode = whiteNoiseGenerator(
      this.audioContext,
      this.masterGain!,
      durationMs
    );
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
   * Clean up all resources
   */
  cleanup(): void {
    this.stop();
    this.targetTimer.cleanup();
    super.cleanup();
  }
}
