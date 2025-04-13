
import { BaseAudioEffect } from '../BaseAudioEffect';
import { AudioEffectOptions, IAudioEffectComponent } from '../types';

/**
 * Component that creates periodic chirp sounds
 */
export class ChirpEffect extends BaseAudioEffect implements IAudioEffectComponent {
  private chirpInterval: number | null = null;
  private volume: number = 0.5;

  /**
   * Set up the chirp effect
   */
  public setup(options: AudioEffectOptions): void {
    if (!this.audioContext || !this.masterGain) return;
    
    this.volume = options.volume;
    this.isPlaying = true;
    
    // Create a chirp immediately
    this.createChirp();
    
    // Create a chirp every 10 seconds - using registerInterval for cleanup
    this.chirpInterval = this.registerInterval(window.setInterval(() => {
      if (this.isPlaying) {
        this.createChirp();
      }
    }, 10000));
  }
  
  /**
   * Create a single chirp sound
   */
  private createChirp(): void {
    if (!this.audioContext || !this.masterGain || !this.isPlaying) return;
    
    const chirpOsc = this.registerNode(this.audioContext.createOscillator());
    const chirpGain = this.registerNode(this.audioContext.createGain());
    
    chirpOsc.frequency.value = 2500; // 2.5kHz
    chirpGain.gain.value = 0;
    
    chirpOsc.connect(chirpGain);
    chirpGain.connect(this.masterGain);
    
    // Create chirp envelope
    chirpOsc.start();
    const now = this.audioContext.currentTime;
    
    // Initial silent period
    chirpGain.gain.setValueAtTime(0, now);
    
    // Quick ramp up to create attack
    chirpGain.gain.linearRampToValueAtTime(this.volume * 0.2, now + 0.05);
    
    // Create a slight frequency variation for organic feel
    const randomFreqOffset = Math.random() * 200 - 100; // ±100 Hz variation
    chirpOsc.frequency.linearRampToValueAtTime(
      2500 + randomFreqOffset, now + 0.3
    );
    
    // Decay phase
    chirpGain.gain.linearRampToValueAtTime(0, now + 0.3);
    
    // Stop after chirp is done - using registerTimeout to track timeouts
    this.registerTimeout(window.setTimeout(() => {
      try {
        chirpOsc.stop();
        chirpOsc.disconnect();
        chirpGain.disconnect();
        
        // Remove from active nodes array
        const oscIndex = this.activeNodes.indexOf(chirpOsc);
        if (oscIndex > -1) this.activeNodes.splice(oscIndex, 1);
        
        const gainIndex = this.activeNodes.indexOf(chirpGain);
        if (gainIndex > -1) this.activeNodes.splice(gainIndex, 1);
      } catch (e) {
        console.warn("Error cleaning up chirp:", e);
      }
    }, 400)); // Little extra time to ensure all audio processing is complete
  }
  
  /**
   * Update volume of the chirp effect
   */
  public updateVolume(volume: number): void {
    this.volume = volume;
  }
  
  /**
   * Stop the chirp effect
   */
  public stop(): void {
    this.cleanup();
    
    this.chirpInterval = null;
    
    this.isPlaying = false;
  }
}
