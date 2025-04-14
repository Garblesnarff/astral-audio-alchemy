
import { AudioEngineBase } from './AudioEngineBase';
import { StandardBinauralPreset } from './StandardBinauralPreset';
import { AlienPreset } from './AlienPreset';

// Class to handle the Web Audio API logic
export class BinauralBeatGenerator {
  private standardPreset: StandardBinauralPreset;
  private alienPreset: AlienPreset;
  private activeEngine: AudioEngineBase;

  constructor() {
    this.standardPreset = new StandardBinauralPreset();
    this.alienPreset = new AlienPreset();
    this.activeEngine = this.standardPreset; // Default
  }

  // Initialize the audio context
  initialize() {
    return this.standardPreset.initialize() && this.alienPreset.initialize();
  }

  // Get the audio context
  getAudioContext() {
    return this.activeEngine.getAudioContext();
  }

  // Get the analyser node
  getAnalyser() {
    return this.activeEngine.getAnalyser();
  }

  // Start the binaural beat
  start(baseFreq: number, beatFreq: number, volume: number = 0.5, preset: string = 'custom') {
    this.stop();
    
    if (preset === 'alien') {
      this.activeEngine = this.alienPreset;
      this.alienPreset.start(baseFreq, beatFreq, volume);
    } else {
      this.activeEngine = this.standardPreset;
      this.standardPreset.start(baseFreq, beatFreq, volume);
    }
  }
  
  stop() {
    this.standardPreset.stop();
    this.alienPreset.stop();
  }
  
  setVolume(volume: number) {
    this.activeEngine.setVolume(volume);
  }
  
  getIsPlaying() {
    return this.activeEngine.getIsPlaying();
  }
  
  getCurrentPreset() {
    return this.activeEngine.getCurrentPreset();
  }
  
  setBaseFrequency(frequency: number) {
    if (this.activeEngine === this.standardPreset) {
      this.standardPreset.setBaseFrequency(frequency);
    }
  }
  
  setBeatFrequency(frequency: number) {
    if (this.activeEngine === this.standardPreset) {
      this.standardPreset.setBeatFrequency(frequency);
    }
  }
  
  getBaseFrequency() {
    return this.activeEngine.getBaseFrequency();
  }
  
  getBeatFrequency() {
    return this.activeEngine.getBeatFrequency();
  }
  
  suspend() {
    this.activeEngine.suspend();
  }
  
  resume() {
    this.activeEngine.resume();
  }
  
  cleanup() {
    this.standardPreset.cleanup();
    this.alienPreset.cleanup();
  }
}
