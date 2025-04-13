
import { IAudioContextManager } from './types';

/**
 * Class that manages the Web Audio API context
 */
export class AudioContextManager implements IAudioContextManager {
  private audioContext: AudioContext | null = null;
  private analyser: AnalyserNode | null = null;
  private masterGain: GainNode | null = null;

  /**
   * Initialize the audio context and create essential nodes
   */
  public initialize(): boolean {
    try {
      if (!this.audioContext) {
        this.audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
        
        // Create analyzer node
        this.analyser = this.audioContext.createAnalyser();
        this.analyser.fftSize = 1024;
        
        // Create master gain node
        this.masterGain = this.audioContext.createGain();
        this.masterGain.gain.value = 0.5; // Default volume
        
        // Connect nodes
        this.masterGain.connect(this.audioContext.destination);
        this.analyser.connect(this.masterGain);
        
        console.log("Audio context initialized successfully");
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
   * Get the master gain node
   */
  public getMasterGain(): GainNode | null {
    return this.masterGain;
  }

  /**
   * Set the master volume
   */
  public setMasterVolume(volume: number): void {
    if (this.masterGain) {
      this.masterGain.gain.value = volume;
    }
  }

  /**
   * Suspend audio context (for battery saving)
   */
  public suspend(): void {
    if (this.audioContext && this.audioContext.state === 'running') {
      this.audioContext.suspend();
    }
  }

  /**
   * Resume audio context
   */
  public resume(): void {
    if (this.audioContext && this.audioContext.state === 'suspended') {
      this.audioContext.resume();
    }
  }

  /**
   * Clean up resources
   */
  public cleanup(): void {
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
