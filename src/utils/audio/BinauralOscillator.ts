
import { BaseAudioEffect } from './BaseAudioEffect';
import { AudioEffectOptions } from './types';

/**
 * Class for generating binaural beats
 */
export class BinauralOscillator extends BaseAudioEffect {
  private leftOscillator: OscillatorNode | null = null;
  private rightOscillator: OscillatorNode | null = null;
  private leftGain: GainNode | null = null;
  private rightGain: GainNode | null = null;
  private stereoPanner: StereoPannerNode | null = null;
  private merger: ChannelMergerNode | null = null;
  private baseFrequency: number = 200;
  private beatFrequency: number = 10;
  private volume: number = 0.5;

  /**
   * Set up the binaural oscillators
   */
  public setup(options: AudioEffectOptions): void {
    if (!this.audioContext || !this.masterGain) {
      console.error("Cannot setup BinauralOscillator - audioContext or masterGain is null");
      return;
    }
    
    // Make sure to stop any previous oscillators
    this.stop();
    
    console.log(`Setting up binaural oscillator with baseFreq: ${options.baseFrequency}, beatFreq: ${options.beatFrequency}, volume: ${options.volume}`);
    
    this.baseFrequency = options.baseFrequency;
    this.beatFrequency = options.beatFrequency;
    this.volume = options.volume;
    
    try {
      // Create oscillators
      this.leftOscillator = this.registerNode(this.audioContext.createOscillator());
      this.rightOscillator = this.registerNode(this.audioContext.createOscillator());
      
      // Create gain nodes
      this.leftGain = this.registerNode(this.audioContext.createGain());
      this.rightGain = this.registerNode(this.audioContext.createGain());
      
      // Create stereo panner
      this.stereoPanner = this.registerNode(this.audioContext.createStereoPanner());
      
      // Set frequencies for left and right ear
      this.leftOscillator.frequency.value = this.baseFrequency;
      this.rightOscillator.frequency.value = this.baseFrequency + this.beatFrequency;
      
      // Set volume
      this.leftGain.gain.value = this.volume;
      this.rightGain.gain.value = this.volume;
      
      // Create channel merger for stereo effect
      this.merger = this.registerNode(this.audioContext.createChannelMerger(2));
      
      // Connect nodes - ensure proper connections
      this.leftOscillator.connect(this.leftGain);
      this.rightOscillator.connect(this.rightGain);
      
      // Connect gains to merger
      this.leftGain.connect(this.merger, 0, 0);  // Connect to left channel
      this.rightGain.connect(this.merger, 0, 1); // Connect to right channel
      
      // Connect merger to master gain
      this.merger.connect(this.masterGain);
      
      // Verify connections before starting
      console.log("Binaural oscillator connections verified, starting oscillators");
      
      // Start oscillators
      this.leftOscillator.start();
      this.rightOscillator.start();
      
      this.isPlaying = true;
      
      console.log("Binaural oscillator setup complete and playing");
    } catch (e) {
      console.error("Error setting up binaural oscillator:", e);
      // Attempt cleanup in case of error
      this.stop();
    }
  }
  
  /**
   * Update the base frequency
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
   * Update the beat frequency
   */
  public setBeatFrequency(frequency: number): void {
    this.beatFrequency = frequency;
    if (this.rightOscillator && this.leftOscillator) {
      this.rightOscillator.frequency.value = this.baseFrequency + frequency;
    }
  }
  
  /**
   * Update the volume
   */
  public override updateVolume(volume: number): void {
    console.log("BinauralOscillator: updating volume to", volume);
    this.volume = volume;
    
    // Update master gain from parent class
    super.updateVolume(volume);
    
    // Update individual gains
    if (this.leftGain) {
      this.leftGain.gain.value = volume;
    }
    
    if (this.rightGain) {
      this.rightGain.gain.value = volume;
    }
  }
  
  /**
   * Stop all oscillators
   */
  public stop(): void {
    console.log("Stopping binaural oscillators");
    
    try {
      // Stop oscillators first to prevent audio artifacts
      if (this.leftOscillator) {
        try {
          this.leftOscillator.stop();
        } catch (e) {
          console.warn("Error stopping left oscillator:", e);
        }
      }
      
      if (this.rightOscillator) {
        try {
          this.rightOscillator.stop();
        } catch (e) {
          console.warn("Error stopping right oscillator:", e);
        }
      }
      
      // Use the parent class method to clean up all audio nodes
      this.cleanup();
      
      // Reset references
      this.leftOscillator = null;
      this.rightOscillator = null;
      this.leftGain = null;
      this.rightGain = null;
      this.stereoPanner = null;
      this.merger = null;
      
      this.isPlaying = false;
      
      console.log("Binaural oscillators stopped and cleaned up");
    } catch (e) {
      console.error("Error during binaural oscillator stop:", e);
    }
  }
}
