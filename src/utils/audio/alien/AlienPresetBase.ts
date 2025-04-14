
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

  setVolume(volume: number) {
    this.baseVolume = volume;
    if (this.masterGain) {
      this.masterGain.gain.value = volume;
    }
    
    if (this.noiseGain) {
      this.noiseGain.gain.value = volume * 0.2;
    }
  }
}
