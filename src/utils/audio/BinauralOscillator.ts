
import { BaseAudioEffect } from './BaseAudioEffect';
import { AudioEffectOptions } from './types';

/**
 * Class that handles the basic binaural beat oscillators
 */
export class BinauralOscillator extends BaseAudioEffect {
  private leftOscillator: OscillatorNode | null = null;
  private rightOscillator: OscillatorNode | null = null;
  private leftGain: GainNode | null = null;
  private rightGain: GainNode | null = null;
  private masterGain: GainNode | null = null;
  private stereoPanner: StereoPannerNode | null = null;
  private baseFrequency: number = 200;
  private beatFrequency: number = 10;
  private volume: number = 0.5;
  
  constructor(
    audioContext: AudioContext | null,
    private analyser: AnalyserNode | null
  ) {
    super(audioContext);
  }
  
  /**
   * Set up the binaural oscillators
   */
  public setup(options: AudioEffectOptions): void {
    if (!this.audioContext || !this.analyser) return;
    
    this.baseFrequency = options.baseFrequency;
    this.beatFrequency = options.beatFrequency;
    this.volume = options.volume;
    this.isPlaying = true;
    
    console.log(`Setting up oscillators with baseFreq: ${this.baseFrequency}, beatFreq: ${this.beatFrequency}`);
    
    // Create oscillators
    this.leftOscillator = this.registerNode(this.audioContext.createOscillator());
    this.rightOscillator = this.registerNode(this.audioContext.createOscillator());
    
    // Create gain nodes
    this.leftGain = this.registerNode(this.audioContext.createGain());
    this.rightGain = this.registerNode(this.audioContext.createGain());
    this.masterGain = this.registerNode(this.audioContext.createGain());
    
    // Create stereo panner
    this.stereoPanner = this.registerNode(this.audioContext.createStereoPanner());
    
    // Set frequencies for left and right ear
    this.leftOscillator.frequency.value = this.baseFrequency;
    this.rightOscillator.frequency.value = this.baseFrequency + this.beatFrequency;
    
    // Set volume
    this.leftGain.gain.value = this.volume;
    this.rightGain.gain.value = this.volume;
    this.masterGain.gain.value = this.volume;
    
    // Connect nodes
    this.leftOscillator.connect(this.leftGain);
    this.rightOscillator.connect(this.rightGain);
    
    // Left channel (pan left)
    this.leftGain.connect(this.masterGain);
    
    // Right channel (pan right)
    this.rightGain.connect(this.masterGain);
    
    this.masterGain.connect(this.analyser);
    
    // Start oscillators
    this.leftOscillator.start();
    this.rightOscillator.start();
  }
  
  /**
   * Set base frequency
   */
  public setBaseFrequency(frequency: number): void {
    this.baseFrequency = frequency;
    if (this.leftOscillator) {
      this.leftOscillator.frequency.value = frequency;
    }
    if (this.rightOscillator) {
      this.rightOscillator.frequency.value = frequency + this.beatFrequency;
    }
  }
  
  /**
   * Set beat frequency
   */
  public setBeatFrequency(frequency: number): void {
    this.beatFrequency = frequency;
    if (this.rightOscillator && this.leftOscillator) {
      this.rightOscillator.frequency.value = this.baseFrequency + frequency;
    }
  }
  
  /**
   * Get current base frequency
   */
  public getBaseFrequency(): number {
    return this.baseFrequency;
  }
  
  /**
   * Get current beat frequency
   */
  public getBeatFrequency(): number {
    return this.beatFrequency;
  }
  
  /**
   * Update volume
   */
  public updateVolume(volume: number): void {
    this.volume = volume;
    
    if (this.leftGain) {
      this.leftGain.gain.value = volume;
    }
    
    if (this.rightGain) {
      this.rightGain.gain.value = volume;
    }
    
    if (this.masterGain) {
      this.masterGain.gain.value = volume;
    }
  }
  
  /**
   * Stop all oscillators
   */
  public stop(): void {
    // Stop oscillators
    this.stopOscillator(this.leftOscillator);
    this.stopOscillator(this.rightOscillator);
    
    // Disconnect gain nodes
    this.disconnectNode(this.leftGain);
    this.disconnectNode(this.rightGain);
    this.disconnectNode(this.masterGain);
    
    // Disconnect stereo panner
    this.disconnectNode(this.stereoPanner);
    
    // Reset variables
    this.leftOscillator = null;
    this.rightOscillator = null;
    this.leftGain = null;
    this.rightGain = null;
    this.masterGain = null;
    this.stereoPanner = null;
    
    // Cleanup remaining nodes
    this.cleanup();
    
    this.isPlaying = false;
  }
}
