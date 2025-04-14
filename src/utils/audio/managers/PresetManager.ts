
import { StandardBinauralPreset } from '../StandardBinauralPreset';
import { AlienPreset } from '../AlienPreset';
import { LucidDreamingPreset } from '../LucidDreamingPreset';
import { AstralProjectionPreset } from '../astral/AstralProjectionPreset';
import { RemoteViewingPreset } from '../remote/RemoteViewingPreset';
import { AudioEngineBase } from '../AudioEngineBase';

export class PresetManager {
  private standardPreset: StandardBinauralPreset;
  private alienPreset: AlienPreset;
  private lucidDreamingPreset: LucidDreamingPreset;
  private astralProjectionPreset: AstralProjectionPreset;
  private remoteViewingPreset: RemoteViewingPreset;
  private activeEngine: AudioEngineBase;

  constructor() {
    this.standardPreset = new StandardBinauralPreset();
    this.alienPreset = new AlienPreset();
    this.lucidDreamingPreset = new LucidDreamingPreset();
    this.astralProjectionPreset = new AstralProjectionPreset();
    this.remoteViewingPreset = new RemoteViewingPreset();
    this.activeEngine = this.standardPreset; // Default
  }

  initialize(): boolean {
    return this.standardPreset.initialize() && 
           this.alienPreset.initialize() && 
           this.lucidDreamingPreset.initialize() &&
           this.astralProjectionPreset.initialize() &&
           this.remoteViewingPreset.initialize();
  }

  getActiveEngine(): AudioEngineBase {
    return this.activeEngine;
  }

  setActivePreset(preset: string, baseFreq: number, beatFreq: number, volume: number): void {
    if (preset === 'alien') {
      this.activeEngine = this.alienPreset;
      this.alienPreset.start(baseFreq, beatFreq, volume);
    } else if (preset.startsWith('lucid-')) {
      this.activeEngine = this.lucidDreamingPreset;
      const lucidPresetType = preset.split('-')[1]; // Extract the specific lucid preset type
      this.lucidDreamingPreset.start(baseFreq, beatFreq, volume, lucidPresetType);
    } else if (preset.startsWith('astral-')) {
      this.activeEngine = this.astralProjectionPreset;
      this.astralProjectionPreset.start(baseFreq, beatFreq, volume, preset);
    } else if (preset.startsWith('remote-')) {
      this.activeEngine = this.remoteViewingPreset;
      this.remoteViewingPreset.start(baseFreq, beatFreq, volume, preset);
    } else {
      this.activeEngine = this.standardPreset;
      this.standardPreset.start(baseFreq, beatFreq, volume);
    }
  }

  getLucidDreamingPreset(): LucidDreamingPreset {
    return this.lucidDreamingPreset;
  }

  getAstralProjectionPreset(): AstralProjectionPreset {
    return this.astralProjectionPreset;
  }

  getRemoteViewingPreset(): RemoteViewingPreset {
    return this.remoteViewingPreset;
  }

  stopAllPresets(): void {
    this.standardPreset.stop();
    this.alienPreset.stop();
    this.lucidDreamingPreset.stop();
    this.astralProjectionPreset.stop();
    this.remoteViewingPreset.stop();
  }

  cleanupAllPresets(): void {
    this.standardPreset.cleanup();
    this.alienPreset.cleanup();
    this.lucidDreamingPreset.cleanup();
    this.astralProjectionPreset.cleanup();
    this.remoteViewingPreset.cleanup();
  }
}
