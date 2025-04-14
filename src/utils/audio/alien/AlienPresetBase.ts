
import { AudioEngineBase } from '../AudioEngineBase';

// Base class for the Alien Preset with core properties
export class AlienPresetBase extends AudioEngineBase {
  protected noiseGenerator: AudioBufferSourceNode | null = null;
  protected noiseGain: GainNode | null = null;
  protected chirpInterval: number | null = null;
  protected ultrasonicInterval: number | null = null;
  protected harmonicOscillators: OscillatorNode[] = [];
  protected harmonicGains: GainNode[] = [];
  protected ambientPad: OscillatorNode | null = null;
  protected ambientGain: GainNode | null = null;
  protected noiseVolume = 0.1;
  protected carrierOscillator: OscillatorNode | null = null;
  protected modulatorOscillator: OscillatorNode | null = null;
  protected modulatorGain: GainNode | null = null;
  protected carrierGain: GainNode | null = null;
  
  // Add volume control with dynamic balance between components
  setVolume(volume: number) {
    this.baseVolume = volume;
    
    // Set master volume
    if (this.masterGain) {
      this.masterGain.gain.value = volume;
    }
    
    // Adjust breath layer volume - less at high volumes to prevent harshness
    if (this.noiseGain) {
      const breathVolume = volume < 0.3 
        ? volume * 0.25  // More breath sound at low volumes 
        : volume * 0.15; // Less at high volumes
      this.noiseGain.gain.value = breathVolume;
    }
    
    // Adjust harmonic oscillators with custom volume curves
    this.harmonicGains.forEach((gain, index) => {
      // Make each harmonic respond slightly differently to volume changes
      const harmonicVolume = Math.pow(volume, 0.8 + (index * 0.1));
      gain.gain.value = harmonicVolume * 0.15;
    });
    
    // Adjust ambient pad volume
    if (this.ambientGain) {
      this.ambientGain.gain.value = volume * 0.3;
    }
    
    // Adjust carrier gain for resonance
    if (this.carrierGain) {
      this.carrierGain.gain.value = volume * 0.8;
    }
  }
}
