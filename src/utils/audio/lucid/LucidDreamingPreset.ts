
import { LucidDreamingBase } from './LucidDreamingBase';
import { setupThetaWaves } from './thetaWaveGenerator';
import { setupThetaAlphaMix } from './alphaMixGenerator';
import { setupWithGamma } from './gammaGenerator';
import { createDreamStabilization } from './dreamStabilization';
import { RealityCheckSystem } from './realityCheckSystem';
import { WBTBSystem } from './wbtbSystem';

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
    
    // Initialize timer systems
    this.realityCheckSystem = new RealityCheckSystem(this.audioContext, this.analyser!, volume);
    this.wbtbSystem = new WBTBSystem(this.audioContext, this.analyser!, volume);
    
    switch (preset) {
      case 'basic':
        this.setupThetaWaves(baseFreq, beatFreq);
        break;
      case 'advanced':
        this.setupThetaAlphaMix(baseFreq, beatFreq);
        break;
      case 'gamma':
        this.setupWithGamma(baseFreq, beatFreq);
        break;
      case 'wbtb':
        this.setupWBTB(baseFreq, beatFreq);
        break;
      default:
        this.setupThetaWaves(baseFreq, beatFreq);
    }
  }
  
  private setupThetaWaves(baseFreq: number, beatFreq: number) {
    if (!this.audioContext || !this.analyser || !this.masterGain) return;
    
    const { leftOscillator, rightOscillator, leftGain, rightGain } = setupThetaWaves(
      this, baseFreq, beatFreq, this.audioContext, this.analyser, this.masterGain, this.baseVolume
    );
    
    this.leftOscillator = leftOscillator;
    this.rightOscillator = rightOscillator;
    this.leftGain = leftGain;
    this.rightGain = rightGain;
    
    this.addDreamStabilization();
  }
  
  private setupThetaAlphaMix(baseFreq: number, beatFreq: number) {
    if (!this.audioContext || !this.analyser || !this.masterGain) return;
    
    const { 
      leftOscillator, rightOscillator, leftGain, rightGain, 
      alphaOscillator, alphaGain 
    } = setupThetaAlphaMix(
      this, baseFreq, beatFreq, this.audioContext, this.analyser, this.masterGain, this.baseVolume
    );
    
    this.leftOscillator = leftOscillator;
    this.rightOscillator = rightOscillator;
    this.leftGain = leftGain;
    this.rightGain = rightGain;
    this.alphaOscillator = alphaOscillator;
    this.alphaGain = alphaGain;
    
    this.addDreamStabilization();
  }
  
  private setupWithGamma(baseFreq: number, beatFreq: number) {
    if (!this.audioContext || !this.analyser || !this.masterGain) return;
    
    const { 
      leftOscillator, rightOscillator, leftGain, rightGain, 
      alphaOscillator, alphaGain, gammaOscillator, gammaGain 
    } = setupWithGamma(
      this, baseFreq, beatFreq, this.audioContext, this.analyser, this.masterGain, this.baseVolume
    );
    
    this.leftOscillator = leftOscillator;
    this.rightOscillator = rightOscillator;
    this.leftGain = leftGain;
    this.rightGain = rightGain;
    this.alphaOscillator = alphaOscillator;
    this.alphaGain = alphaGain;
    this.gammaOscillator = gammaOscillator;
    this.gammaGain = gammaGain;
    
    this.addDreamStabilization();
  }
  
  private setupWBTB(baseFreq: number, beatFreq: number) {
    this.isWBTBMode = true;
    this.setupThetaWaves(baseFreq, beatFreq);
  }
  
  private addDreamStabilization() {
    if (!this.audioContext || !this.masterGain) return;
    
    const { dreamStabilizationOsc, dreamStabilizationGain } = createDreamStabilization(
      this.audioContext, this.masterGain, this.baseVolume
    );
    
    this.dreamStabilizationOsc = dreamStabilizationOsc;
    this.dreamStabilizationGain = dreamStabilizationGain;
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
    
    if (this.masterGain) {
      this.masterGain.gain.value = volume;
    }
    
    if (this.alphaGain) {
      this.alphaGain.gain.value = volume * 0.4;
    }
    
    if (this.gammaGain) {
      this.gammaGain.gain.value = volume * 0.25;
    }
    
    if (this.dreamStabilizationGain) {
      this.dreamStabilizationGain.gain.value = volume * 0.1;
    }
    
    // Update volume for timer systems
    this.realityCheckSystem?.updateVolume(volume);
    this.wbtbSystem?.updateVolume(volume);
  }
  
  stop() {
    if (this.isPlaying) {
      // Stop and disconnect all oscillators
      super.stop();
      this.stopOscillator(this.alphaOscillator);
      this.stopOscillator(this.gammaOscillator);
      this.stopOscillator(this.dreamStabilizationOsc);
      
      // Disconnect all gain nodes
      this.disconnectNode(this.alphaGain);
      this.disconnectNode(this.gammaGain);
      this.disconnectNode(this.dreamStabilizationGain);
      
      // Clean up timer systems
      this.disableRealityCheck();
      this.cancelWBTB();
      
      // Reset all oscillators and gain nodes
      this.alphaOscillator = null;
      this.alphaGain = null;
      this.gammaOscillator = null;
      this.gammaGain = null;
      this.dreamStabilizationOsc = null;
      this.dreamStabilizationGain = null;
      
      this.isWBTBMode = false;
    }
  }
}
