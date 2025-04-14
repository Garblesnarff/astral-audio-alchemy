
import { AudioInterfaceManager } from './managers/AudioInterfaceManager';
import { PresetManager } from './managers/PresetManager';
import { LucidDreamingPreset } from './LucidDreamingPreset';
import { AstralProjectionPreset } from './astral/AstralProjectionPreset';
import { RemoteViewingPreset } from './remote/RemoteViewingPreset';

// Class to handle the Web Audio API logic
export class BinauralBeatGenerator {
  private presetManager: PresetManager;
  private audioInterface: AudioInterfaceManager;

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
  
  // Enable reality check sounds for lucid dreaming
  enableRealityCheck(intervalMinutes: number = 15) {
    const lucidPreset = this.presetManager.getLucidDreamingPreset();
    if (this.presetManager.getActiveEngine() === lucidPreset) {
      lucidPreset.enableRealityCheck(intervalMinutes);
    }
  }
  
  // Disable reality check sounds
  disableRealityCheck() {
    const lucidPreset = this.presetManager.getLucidDreamingPreset();
    if (this.presetManager.getActiveEngine() === lucidPreset) {
      lucidPreset.disableRealityCheck();
    }
  }
  
  // Start WBTB timer for lucid dreaming
  startWBTBTimer(wakeUpAfterMinutes: number) {
    const lucidPreset = this.presetManager.getLucidDreamingPreset();
    if (this.presetManager.getActiveEngine() === lucidPreset) {
      lucidPreset.startWBTBTimer(wakeUpAfterMinutes);
    }
  }
  
  // Cancel WBTB timer
  cancelWBTB() {
    const lucidPreset = this.presetManager.getLucidDreamingPreset();
    if (this.presetManager.getActiveEngine() === lucidPreset) {
      lucidPreset.cancelWBTB();
    }
  }
  
  // Enable return signal for astral projection
  enableReturnSignal() {
    const astralPreset = this.presetManager.getAstralProjectionPreset();
    if (this.presetManager.getActiveEngine() === astralPreset) {
      astralPreset.enableReturnSignal();
    }
  }
  
  // Disable return signal for astral projection
  disableReturnSignal() {
    const astralPreset = this.presetManager.getAstralProjectionPreset();
    if (this.presetManager.getActiveEngine() === astralPreset) {
      astralPreset.disableReturnSignal();
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
    const remotePreset = this.presetManager.getRemoteViewingPreset();
    if (this.presetManager.getActiveEngine() === remotePreset) {
      remotePreset.startTargetFocus(config);
    }
  }
  
  // Clear energy for remote viewing
  clearEnergy(durationMs: number = 5000) {
    const remotePreset = this.presetManager.getRemoteViewingPreset();
    if (this.presetManager.getActiveEngine() === remotePreset) {
      remotePreset.clearEnergy(durationMs);
    }
  }
  
  // Start audio recording for remote viewing
  startRecording(): Promise<void> {
    const remotePreset = this.presetManager.getRemoteViewingPreset();
    if (this.presetManager.getActiveEngine() === remotePreset) {
      return remotePreset.startRecording();
    }
    return Promise.reject(new Error('Recording only available in Remote Viewing mode'));
  }
  
  // Stop audio recording for remote viewing
  stopRecording(): Promise<Blob | null> {
    const remotePreset = this.presetManager.getRemoteViewingPreset();
    if (this.presetManager.getActiveEngine() === remotePreset) {
      return remotePreset.stopRecording();
    }
    return Promise.resolve(null);
  }
  
  // Get current remote viewing protocol
  getCurrentRemoteViewingProtocol(): string {
    const remotePreset = this.presetManager.getRemoteViewingPreset();
    if (this.presetManager.getActiveEngine() === remotePreset) {
      return remotePreset.getCurrentProtocol();
    }
    return '';
  }
  
  // Set remote viewing protocol
  setRemoteViewingProtocol(protocol: 'crv' | 'erv' | 'arv') {
    const remotePreset = this.presetManager.getRemoteViewingPreset();
    if (this.presetManager.getActiveEngine() === remotePreset) {
      remotePreset.setProtocol(protocol);
    }
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
