import { thetaDeltaMixGenerator, enhancedAlphaGenerator, betaThetaCycleGenerator } from './RemoteViewingGenerators';
import { targetFocusMarkers } from './targetFocusMarkers';
import { whiteNoiseGenerator } from './whiteNoiseGenerator';

/**
 * Manages oscillators for remote viewing frequencies
 */
export class RemoteViewingOscillators {
  private thetaDeltaOscillators: { leftOsc: OscillatorNode; rightOsc: OscillatorNode } | null = null;
  private enhancedAlphaOscillators: { leftOsc: OscillatorNode; rightOsc: OscillatorNode } | null = null;
  private betaThetaOscillators: { leftOsc: OscillatorNode; rightOsc: OscillatorNode } | null = null;
  private whiteNoiseNode: AudioBufferSourceNode | null = null;
  private targetFocusNodes: AudioNode[] = [];
  
  private audioContext: AudioContext | null = null;
  private leftGain: GainNode | null = null;
  private rightGain: GainNode | null = null;
  private masterGain: GainNode | null = null;
  private currentBaseFrequency: number = 200;
  private currentBeatFrequency: number = 4;

  /**
   * Initialize oscillator manager
   */
  initialize(audioContext: AudioContext, leftGain: GainNode, rightGain: GainNode, masterGain: GainNode): void {
    this.audioContext = audioContext;
    this.leftGain = leftGain;
    this.rightGain = rightGain;
    this.masterGain = masterGain;
  }

  /**
   * Start the appropriate oscillators based on preset
   */
  startOscillators(preset: string, baseFrequency: number, beatFrequency: number): void {
    if (!this.audioContext || !this.leftGain || !this.rightGain || !this.masterGain) {
      return;
    }
    
    this.currentBaseFrequency = baseFrequency;
    this.currentBeatFrequency = beatFrequency;
    
    // Stop any existing oscillators
    this.stopOscillators();
    
    // Based on the preset, start the appropriate oscillators
    switch (preset) {
      case 'remote-theta-delta':
        this.thetaDeltaOscillators = thetaDeltaMixGenerator(
          this.audioContext,
          baseFrequency,
          beatFrequency,
          this.leftGain,
          this.rightGain
        );
        break;
      case 'remote-alpha':
        this.enhancedAlphaOscillators = enhancedAlphaGenerator(
          this.audioContext,
          baseFrequency,
          beatFrequency,
          this.leftGain,
          this.rightGain
        );
        break;
      case 'remote-beta-theta':
        this.betaThetaOscillators = betaThetaCycleGenerator(
          this.audioContext,
          baseFrequency,
          beatFrequency,
          this.leftGain,
          this.rightGain
        );
        break;
      case 'remote-focused':
        // For focused viewing, we use theta-delta with target focus markers
        this.thetaDeltaOscillators = thetaDeltaMixGenerator(
          this.audioContext,
          baseFrequency,
          beatFrequency,
          this.leftGain,
          this.rightGain
        );
        this.targetFocusNodes = targetFocusMarkers(
          this.audioContext,
          this.masterGain
        );
        break;
      default:
        // Default to theta-delta mix
        this.thetaDeltaOscillators = thetaDeltaMixGenerator(
          this.audioContext,
          baseFrequency,
          beatFrequency,
          this.leftGain,
          this.rightGain
        );
    }
  }

  /**
   * Update the base carrier frequency of the currently playing oscillators
   */
  setBaseFrequency(baseFrequency: number): void {
    this.currentBaseFrequency = baseFrequency;
    this.applyFrequencies();
  }
  
  /**
   * Update the binaural beat frequency of the currently playing oscillators
   */
  setBeatFrequency(beatFrequency: number): void {
    this.currentBeatFrequency = beatFrequency;
    this.applyFrequencies();
  }
  
  /**
   * Get the currently active oscillator pair, if any
   */
  private getActiveOscillators(): { leftOsc: OscillatorNode; rightOsc: OscillatorNode } | null {
    return this.thetaDeltaOscillators || this.enhancedAlphaOscillators || this.betaThetaOscillators;
  }
  
  /**
   * Apply the current base/beat frequencies to the running oscillators
   */
  private applyFrequencies(): void {
    const oscillators = this.getActiveOscillators();
    if (!oscillators || !this.audioContext) return;
    
    const now = this.audioContext.currentTime;
    oscillators.leftOsc.frequency.setValueAtTime(this.currentBaseFrequency, now);
    oscillators.rightOsc.frequency.setValueAtTime(
      this.currentBaseFrequency + this.currentBeatFrequency,
      now
    );
  }
  
  /**
   * Stop all oscillators
   */
  stopOscillators(): void {
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
  }

  /**
   * Generate white noise for energy clearing
   */
  clearEnergy(durationMs: number = 5000): void {
    if (!this.audioContext || !this.masterGain) return;
    
    // If any white noise is currently playing, stop it
    if (this.whiteNoiseNode) {
      this.whiteNoiseNode.stop();
      this.whiteNoiseNode = null;
    }
    
    // Create new white noise
    this.whiteNoiseNode = whiteNoiseGenerator(
      this.audioContext,
      this.masterGain,
      durationMs
    );
  }

  /**
   * Clean up all resources
   */
  cleanup(): void {
    this.stopOscillators();
  }
}
