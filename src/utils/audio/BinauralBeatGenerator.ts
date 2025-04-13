
import { AlienEffect } from './AlienEffect';
import { BinauralOscillator } from './BinauralOscillator';
import { AudioEffectOptions } from './types';

/**
 * Main class to handle Web Audio API logic for binaural beats
 */
export class BinauralBeatGenerator {
  private audioContext: AudioContext | null = null;
  private binauralOscillator: BinauralOscillator | null = null;
  private alienEffect: AlienEffect | null = null;
  private masterGain: GainNode | null = null;
  private analyser: AnalyserNode | null = null;
  private isPlaying = false;
  private baseFrequency = 200;
  private beatFrequency = 10;
  private volume = 0.5;
  private currentPreset = '';
  private isAudioContextSuspended = false;

  /**
   * Initialize the audio context
   */
  public initialize(): boolean {
    try {
      // Create a new AudioContext or use the existing one if it's already created
      if (!this.audioContext) {
        this.audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
        
        // Create analyzer node
        this.analyser = this.audioContext.createAnalyser();
        this.analyser.fftSize = 1024;
        
        // Create master gain node
        this.masterGain = this.audioContext.createGain();
        this.masterGain.gain.value = this.volume;
        
        // Connect master gain to audio context destination
        this.masterGain.connect(this.audioContext.destination);
        this.analyser.connect(this.masterGain);
        
        console.log("Audio context initialized successfully");
      } else if (this.isAudioContextSuspended) {
        this.resume();
      }
      
      return true;
    } catch (e) {
      console.error('Web Audio API is not supported in this browser', e);
      return false;
    }
  }

  /**
   * Get the audio context
   */
  public getAudioContext(): AudioContext | null {
    return this.audioContext;
  }

  /**
   * Get the analyser node
   */
  public getAnalyser(): AnalyserNode | null {
    return this.analyser;
  }

  /**
   * Start audio playback with the specified parameters
   */
  public start(baseFreq: number, beatFreq: number, volume: number = 0.5, preset: string = 'custom'): void {
    if (!this.audioContext) {
      if (!this.initialize()) {
        return;
      }
    }
    
    console.log(`Starting with preset: ${preset}, baseFreq: ${baseFreq}, beatFreq: ${beatFreq}, volume: ${volume}`);
    
    // Make sure all previous audio is fully stopped
    this.stop();
    
    this.isPlaying = true;
    this.currentPreset = preset;
    this.baseFrequency = baseFreq;
    this.beatFrequency = beatFreq;
    this.volume = volume;

    // Set master volume
    if (this.masterGain) {
      this.masterGain.gain.value = volume;
    }

    // Create options object
    const options: AudioEffectOptions = {
      baseFrequency: baseFreq,
      beatFrequency: beatFreq,
      volume
    };

    // Initialize and set up the binaural oscillator
    this.binauralOscillator = new BinauralOscillator(this.audioContext, this.analyser);
    this.binauralOscillator.setup(options);
    
    // For the alien summoning preset, add the special effects
    if (preset === 'alien') {
      console.log("Setting up alien effects");
      this.alienEffect = new AlienEffect(this.audioContext, this.analyser);
      this.alienEffect.setup(options);
    }
  }
  
  /**
   * Stop all audio
   */
  public stop(): void {
    console.log("Stopping all audio. Current preset:", this.currentPreset);
    
    if (this.isPlaying) {
      // Stop binaural oscillator
      if (this.binauralOscillator) {
        this.binauralOscillator.stop();
        this.binauralOscillator = null;
      }
      
      // Stop alien effects
      if (this.alienEffect) {
        this.alienEffect.stop();
        this.alienEffect = null;
      }
      
      this.isPlaying = false;
      this.currentPreset = '';
    }
  }
  
  /**
   * Set volume for all active gain nodes
   */
  public setVolume(volume: number): void {
    console.log(`Setting volume to ${volume}, current preset: ${this.currentPreset}`);
    
    this.volume = volume;
    
    // Update master gain volume
    if (this.masterGain) {
      this.masterGain.gain.value = volume;
    }
    
    // Update binaural oscillator volume
    if (this.binauralOscillator) {
      this.binauralOscillator.updateVolume(volume);
    }
    
    // Update alien effects volume
    if (this.alienEffect) {
      this.alienEffect.updateVolume(volume);
    }
  }
  
  /**
   * Check if currently playing
   */
  public getIsPlaying(): boolean {
    return this.isPlaying;
  }
  
  /**
   * Get current preset
   */
  public getCurrentPreset(): string {
    return this.currentPreset;
  }
  
  /**
   * Set base frequency
   */
  public setBaseFrequency(frequency: number): void {
    this.baseFrequency = frequency;
    if (this.binauralOscillator) {
      this.binauralOscillator.setBaseFrequency(frequency);
    }
  }
  
  /**
   * Set beat frequency
   */
  public setBeatFrequency(frequency: number): void {
    this.beatFrequency = frequency;
    if (this.binauralOscillator) {
      this.binauralOscillator.setBeatFrequency(frequency);
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
   * Suspend audio context (for battery saving)
   */
  public suspend(): void {
    if (this.audioContext && this.audioContext.state === 'running') {
      this.audioContext.suspend();
      this.isAudioContextSuspended = true;
    }
  }
  
  /**
   * Resume audio context
   */
  public resume(): void {
    if (this.audioContext && this.audioContext.state === 'suspended') {
      this.audioContext.resume();
      this.isAudioContextSuspended = false;
    }
  }
  
  /**
   * Clean up on component unmount
   */
  public cleanup(): void {
    this.stop();
    
    if (this.masterGain) {
      this.masterGain.disconnect();
      this.masterGain = null;
    }
    
    if (this.analyser) {
      this.analyser.disconnect();
      this.analyser = null;
    }
    
    if (this.audioContext) {
      this.audioContext.close();
      this.audioContext = null;
    }
  }
}

// Create and export singleton instance
const audioEngine = new BinauralBeatGenerator();
export default audioEngine;
