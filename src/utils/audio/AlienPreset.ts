
import { AlienPresetBase } from './alien/AlienPresetBase';
import { createSchumannResonance } from './alien/createSchumannResonance';
import { add528HzHarmonic, add432HzAmbientPad } from './alien/addHarmonics';
import { createBreathLayer } from './alien/createBreathLayer';
import { createChirps } from './alien/createChirps';
import { addUltrasonicPing } from './alien/addUltrasonicPing';

export class AlienPreset extends AlienPresetBase {
  start(baseFreq: number, beatFreq: number, volume: number = 0.5) {
    if (!this.audioContext) {
      if (!this.initialize()) return;
    }
    
    this.stop();
    this.isPlaying = true;
    this.currentPreset = 'alien';
    this.baseFrequency = baseFreq;
    this.beatFrequency = beatFreq;
    this.baseVolume = volume;

    this.setupAlienPreset();
  }
  
  private setupAlienPreset() {
    if (!this.audioContext || !this.analyser) return;
    
    this.masterGain = this.audioContext.createGain();
    this.masterGain.gain.value = this.baseVolume;
    this.masterGain.connect(this.analyser);
    
    createSchumannResonance(this);
    add528HzHarmonic(this);
    add432HzAmbientPad(this);
    createBreathLayer(this);
    createChirps(this);
    addUltrasonicPing(this);
  }

  stop() {
    if (this.isPlaying) {
      if (this.carrierOscillator) {
        this.carrierOscillator.stop();
        this.carrierOscillator.disconnect();
        this.carrierOscillator = null;
      }
      
      if (this.modulatorOscillator) {
        this.modulatorOscillator.stop();
        this.modulatorOscillator.disconnect();
        this.modulatorOscillator = null;
      }
      
      if (this.modulatorGain) {
        this.modulatorGain.disconnect();
        this.modulatorGain = null;
      }
      
      if (this.carrierGain) {
        this.carrierGain.disconnect();
        this.carrierGain = null;
      }
      
      if (this.ambientPad) {
        this.ambientPad.stop();
        this.ambientPad.disconnect();
        this.ambientPad = null;
      }
      
      if (this.ambientGain) {
        this.ambientGain.disconnect();
        this.ambientGain = null;
      }
      
      this.harmonicOscillators.forEach(osc => {
        osc.stop();
        osc.disconnect();
      });
      this.harmonicOscillators = [];
      
      this.harmonicGains.forEach(gain => {
        gain.disconnect();
      });
      this.harmonicGains = [];
      
      if (this.noiseGenerator) {
        this.noiseGenerator.stop();
        this.noiseGenerator.disconnect();
        this.noiseGenerator = null;
      }
      
      if (this.noiseGain) {
        this.noiseGain.disconnect();
        this.noiseGain = null;
      }
      
      if (this.chirpInterval) {
        clearInterval(this.chirpInterval);
        this.chirpInterval = null;
      }
      
      if (this.ultrasonicInterval) {
        clearInterval(this.ultrasonicInterval);
        this.ultrasonicInterval = null;
      }
      
      if (this.masterGain) {
        this.masterGain.disconnect();
        this.masterGain = null;
      }
      
      this.isPlaying = false;
    }
  }
}
