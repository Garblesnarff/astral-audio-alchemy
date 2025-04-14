
import { AudioEngineBase } from './AudioEngineBase';
import { StandardBinauralPreset } from './StandardBinauralPreset';
import { AlienPreset } from './AlienPreset';
import { LucidDreamingPreset } from './LucidDreamingPreset';
import { AstralProjectionPreset } from './astral/AstralProjectionPreset';
import { RemoteViewingPreset } from './remote/RemoteViewingPreset';

// Class to handle the Web Audio API logic
export class BinauralBeatGenerator {
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

  // Initialize the audio context
  initialize() {
    return this.standardPreset.initialize() && 
           this.alienPreset.initialize() && 
           this.lucidDreamingPreset.initialize() &&
           this.astralProjectionPreset.initialize() &&
           this.remoteViewingPreset.initialize();
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
  
  // Enable reality check sounds for lucid dreaming
  enableRealityCheck(intervalMinutes: number = 15) {
    if (this.activeEngine === this.lucidDreamingPreset) {
      this.lucidDreamingPreset.enableRealityCheck(intervalMinutes);
    }
  }
  
  // Disable reality check sounds
  disableRealityCheck() {
    if (this.activeEngine === this.lucidDreamingPreset) {
      this.lucidDreamingPreset.disableRealityCheck();
    }
  }
  
  // Start WBTB timer for lucid dreaming
  startWBTBTimer(wakeUpAfterMinutes: number) {
    if (this.activeEngine === this.lucidDreamingPreset) {
      this.lucidDreamingPreset.startWBTBTimer(wakeUpAfterMinutes);
    }
  }
  
  // Cancel WBTB timer
  cancelWBTB() {
    if (this.activeEngine === this.lucidDreamingPreset) {
      this.lucidDreamingPreset.cancelWBTB();
    }
  }
  
  // Enable return signal for astral projection
  enableReturnSignal() {
    if (this.activeEngine === this.astralProjectionPreset) {
      (this.activeEngine as AstralProjectionPreset).enableReturnSignal();
    }
  }
  
  // Disable return signal for astral projection
  disableReturnSignal() {
    if (this.activeEngine === this.astralProjectionPreset) {
      (this.activeEngine as AstralProjectionPreset).disableReturnSignal();
    }
  }
  
  // Start target focus timer for remote viewing
  startTargetFocus(config: {
    countdownSeconds: number;
    focusSeconds: number;
    reportingSeconds: number;
    integrationSeconds: number;
    clearingSeconds: number;
  }) {
    if (this.activeEngine === this.remoteViewingPreset) {
      (this.activeEngine as RemoteViewingPreset).startTargetFocus(config);
    }
  }
  
  // Clear energy for remote viewing
  clearEnergy(durationMs: number = 5000) {
    if (this.activeEngine === this.remoteViewingPreset) {
      (this.activeEngine as RemoteViewingPreset).clearEnergy(durationMs);
    }
  }
  
  // Start audio recording for remote viewing
  startRecording(): Promise<void> {
    if (this.activeEngine === this.remoteViewingPreset) {
      return (this.activeEngine as RemoteViewingPreset).startRecording();
    }
    return Promise.reject(new Error('Recording only available in Remote Viewing mode'));
  }
  
  // Stop audio recording for remote viewing
  stopRecording(): Promise<Blob | null> {
    if (this.activeEngine === this.remoteViewingPreset) {
      return (this.activeEngine as RemoteViewingPreset).stopRecording();
    }
    return Promise.resolve(null);
  }
  
  // Get current remote viewing protocol
  getCurrentRemoteViewingProtocol(): string {
    if (this.activeEngine === this.remoteViewingPreset) {
      return (this.activeEngine as RemoteViewingPreset).getCurrentProtocol();
    }
    return '';
  }
  
  // Set remote viewing protocol
  setRemoteViewingProtocol(protocol: 'crv' | 'erv' | 'arv') {
    if (this.activeEngine === this.remoteViewingPreset) {
      (this.activeEngine as RemoteViewingPreset).setProtocol(protocol);
    }
  }
  
  stop() {
    this.standardPreset.stop();
    this.alienPreset.stop();
    this.lucidDreamingPreset.stop();
    this.astralProjectionPreset.stop();
    this.remoteViewingPreset.stop();
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
    this.activeEngine.setBaseFrequency(frequency);
  }
  
  setBeatFrequency(frequency: number) {
    this.activeEngine.setBeatFrequency(frequency);
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
    this.lucidDreamingPreset.cleanup();
    this.astralProjectionPreset.cleanup();
    this.remoteViewingPreset.cleanup();
  }
}
