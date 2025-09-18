
import { AudioEngineBase } from '../AudioEngineBase';
import { PresetManager } from './PresetManager';

export class AudioInterfaceManager {
  private presetManager: PresetManager;

  constructor(presetManager: PresetManager) {
    this.presetManager = presetManager;
  }

  getAudioContext(): AudioContext | null {
    return this.presetManager.getActiveEngine().getAudioContext();
  }

  getAnalyser(): AnalyserNode | null {
    return this.presetManager.getActiveEngine().getAnalyser();
  }

  getIsPlaying(): boolean {
    return this.presetManager.getActiveEngine().getIsPlaying();
  }

  getCurrentPreset(): string {
    return this.presetManager.getActiveEngine().getCurrentPreset();
  }

  getBaseFrequency(): number {
    return this.presetManager.getActiveEngine().getBaseFrequency();
  }

  getBeatFrequency(): number {
    return this.presetManager.getActiveEngine().getBeatFrequency();
  }

  setVolume(volume: number): void {
    this.presetManager.getActiveEngine().setVolume(volume);
  }

  setBaseFrequency(frequency: number): void {
    this.presetManager.getActiveEngine().setBaseFrequency(frequency);
  }

  setBeatFrequency(frequency: number): void {
    this.presetManager.getActiveEngine().setBeatFrequency(frequency);
  }

  suspend(): void {
    this.presetManager.getActiveEngine().suspend();
  }

  resume(): void {
    this.presetManager.getActiveEngine().resume();
  }

  // Ambient sound methods
  playAmbientSound(soundId: string, url: string, volume: number): void {
    const engine = this.presetManager.getActiveEngine();
    if (engine) {
      engine.playAmbientSound(soundId, url, volume);
    }
  }

  stopAmbientSound(soundId: string): void {
    const engine = this.presetManager.getActiveEngine();
    if (engine) {
      engine.stopAmbientSound(soundId);
    }
  }

  setAmbientVolume(soundId: string, volume: number): void {
    const engine = this.presetManager.getActiveEngine();
    if (engine) {
      engine.setAmbientVolume(soundId, volume);
    }
  }
}
