
import { BaseAudioEffect } from '../BaseAudioEffect';
import { AudioEffectOptions, IAudioEffectComponent } from '../types';

/**
 * Component that creates the 528 Hz spiritual frequency
 */
export class HarmonicToneEffect extends BaseAudioEffect implements IAudioEffectComponent {
  private harmonicOscillator: OscillatorNode | null = null;
  private harmonicGain: GainNode | null = null;

  /**
   * Set up the harmonic tone effect
   */
  public setup(options: AudioEffectOptions): void {
    if (!this.audioContext || !this.masterGain) return;
    
    this.harmonicOscillator = this.registerNode(this.audioContext.createOscillator());
    this.harmonicOscillator.frequency.value = 528; // 528 Hz spiritual frequency
    this.harmonicGain = this.registerNode(this.audioContext.createGain());
    this.harmonicGain.gain.value = options.volume * 0.25; // Quieter than the main tone
    
    // Connect harmonic oscillator
    this.harmonicOscillator.connect(this.harmonicGain);
    this.harmonicGain.connect(this.masterGain);
    this.harmonicOscillator.start();
    
    this.isPlaying = true;
  }
  
  /**
   * Update volume of the harmonic tone
   */
  public updateVolume(volume: number): void {
    if (this.harmonicGain) {
      this.harmonicGain.gain.value = volume * 0.25;
    }
  }
  
  /**
   * Stop the harmonic tone effect
   */
  public stop(): void {
    this.cleanup();
    
    this.harmonicOscillator = null;
    this.harmonicGain = null;
    
    this.isPlaying = false;
  }
}
