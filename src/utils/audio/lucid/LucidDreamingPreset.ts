
import { LucidDreamingBase } from './LucidDreamingBase';
import { RealityCheckSystem } from './realityCheckSystem';
import { WBTBSystem } from './wbtbSystem';
import { VolumeManager } from './volumeManager';
import { PresetSetupOrchestrator, PresetSetupResult } from './presetSetupOrchestrator';

export class LucidDreamingPreset extends LucidDreamingBase {
  private alphaOscillator: OscillatorNode | null = null;
  private alphaGain: GainNode | null = null;
  private gammaOscillator: OscillatorNode | null = null;
  private gammaGain: GainNode | null = null;
  private dreamStabilizationOsc: OscillatorNode | null = null;
  private dreamStabilizationGain: GainNode | null = null;
  private realityCheckSystem: RealityCheckSystem | null = null;
  private wbtbSystem: WBTBSystem | null = null;
  private isWBTBMode: boolean = false;

  start(baseFreq: number, beatFreq: number, volume: number = 0.5, preset: string = 'basic') {
    if (!this.audioContext) {
      if (!this.initialize()) return;
    }
    
    this.stop();
    this.isPlaying = true;
    this.currentPreset = preset;
    this.baseFrequency = baseFreq;
    this.beatFrequency = beatFreq;
    this.baseVolume = volume;
    
    this.masterGain = this.audioContext.createGain();
    this.masterGain.gain.value = volume;
    
    this.initializeTimerSystems();
    this.setupPresetAudio(preset, baseFreq, beatFreq);
    
    if (preset === 'wbtb') {
      this.isWBTBMode = true;
    }
  }
  
  private initializeTimerSystems() {
    if (!this.audioContext || !this.analyser) return;
    
    this.realityCheckSystem = new RealityCheckSystem(this.audioContext, this.analyser, this.baseVolume);
    this.wbtbSystem = new WBTBSystem(this.audioContext, this.analyser, this.baseVolume);
  }
  
  private setupPresetAudio(preset: string, baseFreq: number, beatFreq: number) {
    if (!this.audioContext || !this.analyser || !this.masterGain) return;
    
    const setupResult: PresetSetupResult = PresetSetupOrchestrator.setupPreset(
      this, preset, baseFreq, beatFreq, this.audioContext, this.analyser, this.masterGain, this.baseVolume
    );
    
    this.assignAudioNodes(setupResult);
  }
  
  private assignAudioNodes(setupResult: PresetSetupResult) {
    this.leftOscillator = setupResult.leftOscillator;
    this.rightOscillator = setupResult.rightOscillator;
    this.leftGain = setupResult.leftGain;
    this.rightGain = setupResult.rightGain;
    this.alphaOscillator = setupResult.alphaOscillator || null;
    this.alphaGain = setupResult.alphaGain || null;
    this.gammaOscillator = setupResult.gammaOscillator || null;
    this.gammaGain = setupResult.gammaGain || null;
    this.dreamStabilizationOsc = setupResult.dreamStabilizationOsc;
    this.dreamStabilizationGain = setupResult.dreamStabilizationGain;
  }
  
  enableRealityCheck(intervalMinutes: number = 15) {
    this.realityCheckSystem?.enableRealityCheck(intervalMinutes);
  }
  
  disableRealityCheck() {
    this.realityCheckSystem?.disableRealityCheck();
  }
  
  startWBTBTimer(wakeUpAfterMinutes: number) {
    if (!this.isWBTBMode) return;
    this.wbtbSystem?.startWBTBTimer(wakeUpAfterMinutes);
  }
  
  cancelWBTB() {
    this.wbtbSystem?.cancelWBTB();
  }
  
  setVolume(volume: number) {
    this.baseVolume = volume;
    
    VolumeManager.updateAllVolumes(
      this.masterGain,
      this.alphaGain,
      this.gammaGain,
      this.dreamStabilizationGain,
      volume
    );
    
    this.realityCheckSystem?.updateVolume(volume);
    this.wbtbSystem?.updateVolume(volume);
  }
  
  stop() {
    if (this.isPlaying) {
      super.stop();
      this.stopAdditionalOscillators();
      this.disconnectAdditionalNodes();
      this.cleanupTimerSystems();
      this.resetAudioNodes();
      this.isWBTBMode = false;
    }
  }
  
  private stopAdditionalOscillators() {
    this.stopOscillator(this.alphaOscillator);
    this.stopOscillator(this.gammaOscillator);
    this.stopOscillator(this.dreamStabilizationOsc);
  }
  
  private disconnectAdditionalNodes() {
    this.disconnectNode(this.alphaGain);
    this.disconnectNode(this.gammaGain);
    this.disconnectNode(this.dreamStabilizationGain);
  }
  
  private cleanupTimerSystems() {
    this.disableRealityCheck();
    this.cancelWBTB();
  }
  
  private resetAudioNodes() {
    this.alphaOscillator = null;
    this.alphaGain = null;
    this.gammaOscillator = null;
    this.gammaGain = null;
    this.dreamStabilizationOsc = null;
    this.dreamStabilizationGain = null;
  }
}
