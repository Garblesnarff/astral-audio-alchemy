
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
        console.log("Creating new AudioContext");
        this.audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
        
        if (!this.audioContext) {
          console.error("Failed to create AudioContext");
          return false;
        }
        
        // Create analyzer node
        this.analyser = this.audioContext.createAnalyser();
        this.analyser.fftSize = 1024;
        
        // Create master gain node
        this.masterGain = this.audioContext.createGain();
        this.masterGain.gain.value = 0.5; // Default volume
        
        // CRITICAL FIX: Connect nodes in correct order
        // First connect master gain to destination 
        this.masterGain.connect(this.audioContext.destination);
        
        // Then connect analyser to master gain - this ensures both visualization
        // and audio output work for all presets
        this.analyser.connect(this.masterGain);
        
        console.log("Audio context initialized successfully with state:", this.audioContext.state);
        console.log("Audio routing chain: Effects -> Analyser -> MasterGain -> Destination");
        
        // Resume context if it's suspended (autoplay policies in some browsers)
        if (this.audioContext.state === 'suspended') {
          console.log("Audio context is suspended, attempting to resume");
          this.audioContext.resume().then(() => {
            console.log("Audio context resumed successfully");
          }).catch(err => {
            console.warn("Could not resume audio context:", err);
          });
        }
      } else {
        console.log("Audio context already exists, skipping initialization");
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
      this.audioContext.suspend().then(() => {
        console.log("Audio context suspended successfully");
      }).catch(err => {
        console.warn("Could not suspend audio context:", err);
      });
    }
  }

  /**
   * Resume audio context
   */
  public resume(): void {
    if (this.audioContext && this.audioContext.state === 'suspended') {
      this.audioContext.resume().then(() => {
        console.log("Audio context resumed successfully");
      }).catch(err => {
        console.warn("Could not resume audio context:", err);
      });
    }
  }

  /**
   * Clean up resources
   */
  public cleanup(): void {
    if (this.masterGain) {
      try {
        this.masterGain.disconnect();
      } catch (e) {
        console.warn("Error disconnecting master gain:", e);
      }
      this.masterGain = null;
    }
    
    if (this.analyser) {
      try {
        this.analyser.disconnect();
      } catch (e) {
        console.warn("Error disconnecting analyser:", e);
      }
      this.analyser = null;
    }
    
    if (this.audioContext) {
      try {
        this.audioContext.close();
      } catch (e) {
        console.warn("Error closing audio context:", e);
      }
      this.audioContext = null;
    }
    
    console.log("Audio context manager cleaned up successfully");
  }
}
