
import { BaseAudioEffect } from '../BaseAudioEffect';
import { AudioEffectOptions, IAudioEffectComponent } from '../types';

/**
 * Component that creates Schumann resonance effect (7.83 Hz via modulation)
 */
export class SchumannResonanceEffect extends BaseAudioEffect implements IAudioEffectComponent {
  private schumann: OscillatorNode | null = null;
  private schumannGain: GainNode | null = null;
  private schumannLFO: OscillatorNode | null = null;
  private schumannLFOGain: GainNode | null = null;

  /**
   * Set up the Schumann resonance effect
   */
  public setup(options: AudioEffectOptions): void {
    if (!this.audioContext || !this.masterGain) return;
    
    // Create Schumann resonance (7.83 Hz via modulation of 100 Hz base tone)
    this.schumann = this.registerNode(this.audioContext.createOscillator());
    this.schumann.frequency.value = 100; // Base tone at 100 Hz
    this.schumannGain = this.registerNode(this.audioContext.createGain());
    this.schumannGain.gain.value = options.volume * 0.5;
    
    // Create LFO for modulation at 7.83 Hz to simulate Schumann resonance
    this.schumannLFO = this.registerNode(this.audioContext.createOscillator());
    this.schumannLFO.frequency.value = 7.83; // Schumann resonance frequency
    this.schumannLFOGain = this.registerNode(this.audioContext.createGain());
    this.schumannLFOGain.gain.value = 10; // Modulation depth
    
    // Connect LFO to modulate the gain of the 100 Hz oscillator
    this.schumannLFO.connect(this.schumannLFOGain);
    this.schumannLFOGain.connect(this.schumannGain.gain);
    
    // Connect Schumann oscillator to the output
    this.schumann.connect(this.schumannGain);
    this.schumannGain.connect(this.masterGain);
    
    // Start oscillators
    this.schumann.start();
    this.schumannLFO.start();
    
    this.isPlaying = true;
  }
  
  /**
   * Update volume of the Schumann resonance
   */
  public updateVolume(volume: number): void {
    if (this.schumannGain) {
      this.schumannGain.gain.value = volume * 0.5;
    }
  }
  
  /**
   * Stop the Schumann resonance effect
   */
  public stop(): void {
    this.cleanup();
    
    this.schumann = null;
    this.schumannGain = null;
    this.schumannLFO = null;
    this.schumannLFOGain = null;
    
    this.isPlaying = false;
  }
}
