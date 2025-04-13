
import { AlienEffect } from './AlienEffect';
import { BinauralOscillator } from './BinauralOscillator';
import { AudioEffectOptions } from './types';

/**
 * Main class to handle Web Audio API logic for binaural beats
 */
export class BinauralBeatGenerator {
  private audioContext: AudioContext | null = null;
  private analyser: AnalyserNode | null = null;
  private masterGain: GainNode | null = null;
  private binauralOscillator: BinauralOscillator | null = null;
  private alienEffect: AlienEffect | null = null;
  private isPlaying = false;
  private baseFrequency = 200;
  private beatFrequency = 10;
  private baseVolume = 0.5;
  private currentPreset = '';

  /**
   * Initialize the audio context
   */
  initialize(): boolean {
    try {
      this.audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
      this.analyser = this.audioContext.createAnalyser();
      this.analyser.fftSize = 1024;
      
      // Create master gain node for overall volume control
      this.masterGain = this.audioContext.createGain();
      this.masterGain.gain.value = this.baseVolume;
      
      // Connect master gain to destination
      this.masterGain.connect(this.audioContext.destination);
      this.analyser.connect(this.masterGain);
      
      console.log("Audio context initialized successfully");
      return true;
    } catch (e) {
      console.error('Web Audio API is not supported in this browser', e);
      return false;
    }
  }

  /**
   * Get the audio context
   */
  getAudioContext(): AudioContext | null {
    return this.audioContext;
  }

  /**
   * Get the analyser node
   */
  getAnalyser(): AnalyserNode | null {
    return this.analyser;
  }

  /**
   * Start the binaural beat with options
   */
  start(baseFreq: number, beatFreq: number, volume: number = 0.5, preset: string = 'custom'): void {
    if (!this.audioContext) {
      if (!this.initialize()) return;
    }
    
    console.log(`Starting with preset: ${preset}, baseFreq: ${baseFreq}, beatFreq: ${beatFreq}, volume: ${volume}`);
    
    // Make sure we stop any previous sounds completely
    this.stop();
    
    this.isPlaying = true;
    this.currentPreset = preset;
    this.baseFrequency = baseFreq;
    this.beatFrequency = beatFreq;
    this.baseVolume = volume;

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
      // Initialize and set up alien effects
      this.alienEffect = new AlienEffect(this.audioContext, this.analyser);
      this.alienEffect.setup(options);
    }
  }
  
  /**
   * Stop all audio
   */
  stop(): void {
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
  setVolume(volume: number): void {
    console.log(`Setting volume to ${volume}, current preset: ${this.currentPreset}`);
    
    this.baseVolume = volume;
    
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
  getIsPlaying(): boolean {
    return this.isPlaying;
  }
  
  /**
   * Get current preset
   */
  getCurrentPreset(): string {
    return this.currentPreset;
  }
  
  /**
   * Set base frequency
   */
  setBaseFrequency(frequency: number): void {
    this.baseFrequency = frequency;
    if (this.binauralOscillator) {
      this.binauralOscillator.setBaseFrequency(frequency);
    }
  }
  
  /**
   * Set beat frequency
   */
  setBeatFrequency(frequency: number): void {
    this.beatFrequency = frequency;
    if (this.binauralOscillator) {
      this.binauralOscillator.setBeatFrequency(frequency);
    }
  }
  
  /**
   * Get current base frequency
   */
  getBaseFrequency(): number {
    return this.baseFrequency;
  }
  
  /**
   * Get current beat frequency
   */
  getBeatFrequency(): number {
    return this.beatFrequency;
  }
  
  /**
   * Suspend audio context (for battery saving)
   */
  suspend(): void {
    if (this.audioContext && this.audioContext.state === 'running') {
      this.audioContext.suspend();
    }
  }
  
  /**
   * Resume audio context
   */
  resume(): void {
    if (this.audioContext && this.audioContext.state === 'suspended') {
      this.audioContext.resume();
    }
  }
  
  /**
   * Clean up on component unmount
   */
  cleanup(): void {
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
