
import { AudioInterfaceManager } from '../managers/AudioInterfaceManager';
import { PresetManager } from '../managers/PresetManager';

// Core class handling basic binaural beat functionality
export class BinauralBeatCore {
  protected presetManager: PresetManager;
  protected audioInterface: AudioInterfaceManager;

  constructor() {
    this.presetManager = new PresetManager();
    this.audioInterface = new AudioInterfaceManager(this.presetManager);
  }

  // Initialize the audio context
  initialize() {
    return this.presetManager.initialize();
  }

  // Get the audio context
  getAudioContext() {
    return this.audioInterface.getAudioContext();
  }

  // Get the analyser node
  getAnalyser() {
    return this.audioInterface.getAnalyser();
  }

  // Start the binaural beat
  start(baseFreq: number, beatFreq: number, volume: number = 0.5, preset: string = 'custom') {
    this.stop();
    this.presetManager.setActivePreset(preset, baseFreq, beatFreq, volume);
  }

  stop() {
    this.presetManager.stopAllPresets();
  }
  
  setVolume(volume: number) {
    this.audioInterface.setVolume(volume);
  }
  
  getIsPlaying() {
    return this.audioInterface.getIsPlaying();
  }
  
  getCurrentPreset() {
    return this.audioInterface.getCurrentPreset();
  }
  
  setBaseFrequency(frequency: number) {
    this.audioInterface.setBaseFrequency(frequency);
  }
  
  setBeatFrequency(frequency: number) {
    this.audioInterface.setBeatFrequency(frequency);
  }
  
  getBaseFrequency() {
    return this.audioInterface.getBaseFrequency();
  }
  
  getBeatFrequency() {
    return this.audioInterface.getBeatFrequency();
  }
  
  suspend() {
    this.audioInterface.suspend();
  }
  
  resume() {
    this.audioInterface.resume();
  }
  
  cleanup() {
    this.presetManager.cleanupAllPresets();
  }
}
