
import { BaseAudioEffect } from '../BaseAudioEffect';
import { AudioEffectOptions, IAudioEffectComponent } from '../types';

/**
 * Component that creates the 432 Hz ambient pad sound
 */
export class AmbientPadEffect extends BaseAudioEffect implements IAudioEffectComponent {
  private ambientPadOscillator: OscillatorNode | null = null;
  private ambientPadGain: GainNode | null = null;

  /**
   * Set up the ambient pad effect
   */
  public setup(options: AudioEffectOptions): void {
    if (!this.audioContext || !this.masterGain) return;
    
    this.ambientPadOscillator = this.registerNode(this.audioContext.createOscillator());
    this.ambientPadOscillator.frequency.value = 432; // 432 Hz "natural" frequency
    this.ambientPadOscillator.type = 'sine';
    this.ambientPadGain = this.registerNode(this.audioContext.createGain());
    this.ambientPadGain.gain.value = options.volume * 0.2; // Subtle
    
    // Connect ambient pad
    this.ambientPadOscillator.connect(this.ambientPadGain);
    this.ambientPadGain.connect(this.masterGain);
    this.ambientPadOscillator.start();
    
    this.isPlaying = true;
  }
  
  /**
   * Update volume of the ambient pad
   */
  public updateVolume(volume: number): void {
    if (this.ambientPadGain) {
      this.ambientPadGain.gain.value = volume * 0.2;
    }
  }
  
  /**
   * Stop the ambient pad effect
   */
  public stop(): void {
    this.cleanup();
    
    this.ambientPadOscillator = null;
    this.ambientPadGain = null;
    
    this.isPlaying = false;
  }
}
