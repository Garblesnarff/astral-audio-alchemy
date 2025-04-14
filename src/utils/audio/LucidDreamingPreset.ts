
import { AudioEngineBase } from './AudioEngineBase';

export class LucidDreamingPreset extends AudioEngineBase {
  private leftOscillator: OscillatorNode | null = null;
  private rightOscillator: OscillatorNode | null = null;
  private leftGain: GainNode | null = null;
  private rightGain: GainNode | null = null;
  private alphaOscillator: OscillatorNode | null = null;
  private alphaGain: GainNode | null = null;
  private gammaOscillator: OscillatorNode | null = null;
  private gammaGain: GainNode | null = null;
  private masterGain: GainNode | null = null;
  private realityCheckTimer: number | null = null;
  private realityCheckSound: OscillatorNode | null = null;
  private realityCheckGain: GainNode | null = null;
  private realityCheckInterval: number = 15; // minutes
  private wbtbTimer: number | null = null;
  private isWBTBMode: boolean = false;
  private dreamStabilizationOsc: OscillatorNode | null = null;
  private dreamStabilizationGain: GainNode | null = null;

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
  
  // Generate pure theta waves (4-8 Hz)
  private setupThetaWaves(baseFreq: number, beatFreq: number) {
    if (!this.audioContext || !this.analyser) return;
    
    this.leftOscillator = this.audioContext.createOscillator();
    this.rightOscillator = this.audioContext.createOscillator();
    
    this.leftGain = this.audioContext.createGain();
    this.rightGain = this.audioContext.createGain();
    this.masterGain = this.audioContext.createGain();
    
    // Configure for theta waves (4-8 Hz difference)
    this.leftOscillator.frequency.value = baseFreq;
    this.rightOscillator.frequency.value = baseFreq + beatFreq;
    
    this.leftGain.gain.value = this.baseVolume;
    this.rightGain.gain.value = this.baseVolume;
    this.masterGain.gain.value = this.baseVolume;
    
    // Connect nodes
    this.leftOscillator.connect(this.leftGain);
    this.rightOscillator.connect(this.rightGain);
    
    this.leftGain.connect(this.masterGain);
    this.rightGain.connect(this.masterGain);
    
    this.masterGain.connect(this.analyser);
    
    // Start oscillators
    this.leftOscillator.start();
    this.rightOscillator.start();
    
    // Add dream stabilization
    this.addDreamStabilization();
  }
  
  // Blend theta and alpha waves for optimal lucid dreaming state
  private setupThetaAlphaMix(baseFreq: number, beatFreq: number) {
    // First setup base theta waves
    this.setupThetaWaves(baseFreq, beatFreq);
    
    if (!this.audioContext || !this.analyser) return;
    
    // Add alpha wave component (8-12 Hz)
    this.alphaOscillator = this.audioContext.createOscillator();
    this.alphaGain = this.audioContext.createGain();
    
    this.alphaOscillator.frequency.value = baseFreq + 10; // Alpha range
    this.alphaGain.gain.value = this.baseVolume * 0.4; // Slightly quieter than main frequencies
    
    this.alphaOscillator.connect(this.alphaGain);
    this.alphaGain.connect(this.masterGain as GainNode);
    
    this.alphaOscillator.start();
  }
  
  // Introduce gamma wave components to mimic brain activity during lucid dreams
  private setupWithGamma(baseFreq: number, beatFreq: number) {
    // Setup theta-alpha mix first
    this.setupThetaAlphaMix(baseFreq, beatFreq);
    
    if (!this.audioContext || !this.analyser) return;
    
    // Add gamma wave component (~40 Hz)
    this.gammaOscillator = this.audioContext.createOscillator();
    this.gammaGain = this.audioContext.createGain();
    
    this.gammaOscillator.frequency.value = baseFreq + 40; // Gamma frequency
    this.gammaGain.gain.value = this.baseVolume * 0.25; // Subtle gamma component
    
    this.gammaOscillator.connect(this.gammaGain);
    this.gammaGain.connect(this.masterGain as GainNode);
    
    this.gammaOscillator.start();
  }
  
  // Setup for Wake-Back-To-Bed technique
  private setupWBTB(baseFreq: number, beatFreq: number) {
    this.isWBTBMode = true;
    this.setupThetaWaves(baseFreq, beatFreq);
  }
  
  // Add subtle background frequencies for dream stabilization
  private addDreamStabilization() {
    if (!this.audioContext || !this.masterGain) return;
    
    this.dreamStabilizationOsc = this.audioContext.createOscillator();
    this.dreamStabilizationGain = this.audioContext.createGain();
    
    // Use a very low frequency for subtle modulation
    this.dreamStabilizationOsc.frequency.value = 0.2; 
    this.dreamStabilizationGain.gain.value = this.baseVolume * 0.1;
    
    this.dreamStabilizationOsc.connect(this.dreamStabilizationGain);
    this.dreamStabilizationGain.connect(this.masterGain);
    
    this.dreamStabilizationOsc.start();
  }
  
  // Insert audio cues at intervals for reality checks
  enableRealityCheck(intervalMinutes: number = 15) {
    this.realityCheckInterval = intervalMinutes;
    this.scheduleNextRealityCheck();
  }
  
  private scheduleNextRealityCheck() {
    if (this.realityCheckTimer) {
      window.clearTimeout(this.realityCheckTimer);
    }
    
    this.realityCheckTimer = window.setTimeout(() => {
      this.playRealityCheckSound();
      this.scheduleNextRealityCheck();
    }, this.realityCheckInterval * 60 * 1000);
  }
  
  private playRealityCheckSound() {
    if (!this.audioContext || !this.analyser || !this.isPlaying) return;
    
    // Create temporary oscillator for the reality check sound
    const checkOsc = this.audioContext.createOscillator();
    const checkGain = this.audioContext.createGain();
    
    checkOsc.frequency.value = 800; // Higher pitched sound for reality check
    checkGain.gain.value = this.baseVolume * 0.5;
    
    checkOsc.connect(checkGain);
    checkGain.connect(this.analyser);
    
    // Brief sound
    checkOsc.start();
    
    // Fade out after 0.5 seconds
    checkGain.gain.setValueAtTime(this.baseVolume * 0.5, this.audioContext.currentTime);
    checkGain.gain.exponentialRampToValueAtTime(0.001, this.audioContext.currentTime + 0.5);
    
    // Stop after fade out
    setTimeout(() => {
      checkOsc.stop();
      checkOsc.disconnect();
      checkGain.disconnect();
    }, 500);
  }
  
  // Set up timer for Wake-Back-To-Bed technique
  startWBTBTimer(wakeUpAfterMinutes: number) {
    if (!this.isWBTBMode) return;
    
    if (this.wbtbTimer) {
      window.clearTimeout(this.wbtbTimer);
    }
    
    this.wbtbTimer = window.setTimeout(() => {
      this.playWakeUpSequence();
    }, wakeUpAfterMinutes * 60 * 1000);
  }
  
  private playWakeUpSequence() {
    if (!this.audioContext || !this.analyser || !this.isPlaying) return;
    
    // Gradually increase volume of a gentle wake-up tone
    const wakeupOsc = this.audioContext.createOscillator();
    const wakeupGain = this.audioContext.createGain();
    
    wakeupOsc.frequency.value = 400; // Gentle wake-up tone
    wakeupGain.gain.value = 0.001;
    
    wakeupOsc.connect(wakeupGain);
    wakeupGain.connect(this.analyser);
    
    // Gradually increase volume
    wakeupOsc.start();
    wakeupGain.gain.exponentialRampToValueAtTime(this.baseVolume, this.audioContext.currentTime + 15);
    
    // Stop after wake-up sequence
    setTimeout(() => {
      wakeupGain.gain.exponentialRampToValueAtTime(0.001, this.audioContext.currentTime + 5);
      setTimeout(() => {
        wakeupOsc.stop();
        wakeupOsc.disconnect();
        wakeupGain.disconnect();
      }, 5000);
    }, 20000);
  }
  
  setVolume(volume: number) {
    this.baseVolume = volume;
    
    if (this.masterGain) {
      this.masterGain.gain.value = volume;
    }
    
    // Adjust relative volumes of components
    if (this.alphaGain) {
      this.alphaGain.gain.value = volume * 0.4;
    }
    
    if (this.gammaGain) {
      this.gammaGain.gain.value = volume * 0.25;
    }
    
    if (this.dreamStabilizationGain) {
      this.dreamStabilizationGain.gain.value = volume * 0.1;
    }
  }
  
  stop() {
    if (this.isPlaying) {
      // Stop oscillators
      this.stopOscillator(this.leftOscillator);
      this.stopOscillator(this.rightOscillator);
      this.stopOscillator(this.alphaOscillator);
      this.stopOscillator(this.gammaOscillator);
      this.stopOscillator(this.dreamStabilizationOsc);
      this.stopOscillator(this.realityCheckSound);
      
      // Clean up gain nodes
      this.disconnectNode(this.leftGain);
      this.disconnectNode(this.rightGain);
      this.disconnectNode(this.alphaGain);
      this.disconnectNode(this.gammaGain);
      this.disconnectNode(this.masterGain);
      this.disconnectNode(this.dreamStabilizationGain);
      this.disconnectNode(this.realityCheckGain);
      
      // Reset timers
      if (this.realityCheckTimer) {
        window.clearTimeout(this.realityCheckTimer);
        this.realityCheckTimer = null;
      }
      
      if (this.wbtbTimer) {
        window.clearTimeout(this.wbtbTimer);
        this.wbtbTimer = null;
      }
      
      this.leftOscillator = null;
      this.rightOscillator = null;
      this.leftGain = null;
      this.rightGain = null;
      this.alphaOscillator = null;
      this.alphaGain = null;
      this.gammaOscillator = null;
      this.gammaGain = null;
      this.masterGain = null;
      this.dreamStabilizationOsc = null;
      this.dreamStabilizationGain = null;
      this.realityCheckSound = null;
      this.realityCheckGain = null;
      
      this.isPlaying = false;
      this.isWBTBMode = false;
    }
  }
  
  private stopOscillator(oscillator: OscillatorNode | null) {
    if (oscillator) {
      oscillator.stop();
      oscillator.disconnect();
    }
  }
  
  private disconnectNode(node: AudioNode | null) {
    if (node) {
      node.disconnect();
    }
  }
  
  disableRealityCheck() {
    if (this.realityCheckTimer) {
      window.clearTimeout(this.realityCheckTimer);
      this.realityCheckTimer = null;
    }
  }
  
  cancelWBTB() {
    if (this.wbtbTimer) {
      window.clearTimeout(this.wbtbTimer);
      this.wbtbTimer = null;
    }
  }
}
