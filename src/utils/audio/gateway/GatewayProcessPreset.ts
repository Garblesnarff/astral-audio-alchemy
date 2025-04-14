
import { AudioEngineBase } from '../AudioEngineBase';
import { createHemiSyncSignal } from './hemiSyncGenerator';
import { createFocusLevelSignal } from './focusLevelGenerator';
import { createCarrierWave } from './carrierWaveGenerator';
import { createResonantTuning } from './resonantTuningGenerator';

export class GatewayProcessPreset extends AudioEngineBase {
  private leftOscillator: OscillatorNode | null = null;
  private rightOscillator: OscillatorNode | null = null;
  private carrierOscillator: OscillatorNode | null = null;
  private resonantOscillator: OscillatorNode | null = null;
  private leftGain: GainNode | null = null;
  private rightGain: GainNode | null = null;
  private carrierGain: GainNode | null = null;
  private resonantGain: GainNode | null = null;
  private focusLevel: string = 'focus10';
  private sessionProgress: number = 0;
  private sessionActive: boolean = false;
  private progressIntervalId: number | null = null;
  private currentPresetId: string = '';

  constructor() {
    super();
    this.currentPreset = 'gateway';
  }

  start(baseFreq: number, beatFreq: number, volume: number = 0.5, presetId: string = 'gateway-focus10-intro') {
    if (!this.audioContext) {
      this.initialize();
    }

    if (!this.audioContext) {
      console.error('Failed to initialize audio context');
      return;
    }

    this.stop();
    this.isPlaying = true;
    this.baseFrequency = baseFreq;
    this.beatFrequency = beatFreq;
    this.baseVolume = volume;
    this.currentPresetId = presetId;

    // Determine focus level from preset ID
    if (presetId.includes('focus10')) {
      this.focusLevel = 'focus10';
    } else if (presetId.includes('focus12')) {
      this.focusLevel = 'focus12';
    } else if (presetId.includes('focus15')) {
      this.focusLevel = 'focus15';
    } else if (presetId.includes('focus21')) {
      this.focusLevel = 'focus21';
    }

    // Create master gain node
    this.masterGain = this.audioContext.createGain();
    this.masterGain.gain.value = volume;
    this.masterGain.connect(this.audioContext.destination);

    if (this.analyser) {
      this.masterGain.connect(this.analyser);
    }

    // Create the hemi-sync signal (binaural beat core)
    const hemiSyncNodes = createHemiSyncSignal(this.audioContext, baseFreq, beatFreq);
    this.leftOscillator = hemiSyncNodes.leftOscillator;
    this.rightOscillator = hemiSyncNodes.rightOscillator;
    this.leftGain = hemiSyncNodes.leftGain;
    this.rightGain = hemiSyncNodes.rightGain;
    
    this.leftGain.connect(this.masterGain);
    this.rightGain.connect(this.masterGain);
    
    // Create focus level specific frequencies
    const focusNodes = createFocusLevelSignal(this.audioContext, this.focusLevel);
    if (focusNodes) {
      focusNodes.outputGain.connect(this.masterGain);
    }
    
    // Create carrier wave
    const carrierNodes = createCarrierWave(this.audioContext, this.focusLevel);
    this.carrierOscillator = carrierNodes.oscillator;
    this.carrierGain = carrierNodes.gain;
    this.carrierGain.connect(this.masterGain);
    
    // Create resonant tuning
    const resonantNodes = createResonantTuning(this.audioContext);
    this.resonantOscillator = resonantNodes.oscillator;
    this.resonantGain = resonantNodes.gain;
    this.resonantGain.connect(this.masterGain);
    
    // Start the session
    this.sessionActive = true;
    this.sessionProgress = 0;
    this.startProgressTracking();
  }

  stop() {
    if (this.leftOscillator) {
      this.leftOscillator.stop();
      this.leftOscillator = null;
    }
    
    if (this.rightOscillator) {
      this.rightOscillator.stop();
      this.rightOscillator = null;
    }
    
    if (this.carrierOscillator) {
      this.carrierOscillator.stop();
      this.carrierOscillator = null;
    }
    
    if (this.resonantOscillator) {
      this.resonantOscillator.stop();
      this.resonantOscillator = null;
    }
    
    if (this.masterGain) {
      this.masterGain.disconnect();
      this.masterGain = null;
    }
    
    if (this.leftGain) {
      this.leftGain.disconnect();
      this.leftGain = null;
    }
    
    if (this.rightGain) {
      this.rightGain.disconnect();
      this.rightGain = null;
    }
    
    if (this.carrierGain) {
      this.carrierGain.disconnect();
      this.carrierGain = null;
    }
    
    if (this.resonantGain) {
      this.resonantGain.disconnect();
      this.resonantGain = null;
    }
    
    this.stopProgressTracking();
    this.sessionActive = false;
    this.isPlaying = false;
  }

  setVolume(volume: number) {
    super.setVolume(volume);
    if (this.masterGain && this.audioContext) {
      this.masterGain.gain.setValueAtTime(volume, this.audioContext.currentTime);
    }
  }

  setBaseFrequency(frequency: number) {
    if (this.leftOscillator && this.rightOscillator && this.audioContext) {
      this.baseFrequency = frequency;
      this.leftOscillator.frequency.setValueAtTime(frequency, this.audioContext.currentTime);
      this.rightOscillator.frequency.setValueAtTime(frequency + this.beatFrequency, this.audioContext.currentTime);
    }
  }

  setBeatFrequency(frequency: number) {
    if (this.rightOscillator && this.audioContext) {
      this.beatFrequency = frequency;
      this.rightOscillator.frequency.setValueAtTime(this.baseFrequency + frequency, this.audioContext.currentTime);
    }
  }

  getCurrentFocusLevel(): string {
    return this.focusLevel;
  }

  setFocusLevel(level: 'focus10' | 'focus12' | 'focus15' | 'focus21'): void {
    this.focusLevel = level;
    
    // If playing, restart with the new focus level
    if (this.isPlaying) {
      const wasPlaying = this.isPlaying;
      const currentVolume = this.baseVolume;
      const currentBaseFreq = this.baseFrequency;
      const currentBeatFreq = this.beatFrequency;
      
      this.stop();
      
      if (wasPlaying) {
        this.start(currentBaseFreq, currentBeatFreq, currentVolume, this.currentPresetId);
      }
    }
  }

  getSessionProgress(): number {
    return this.sessionProgress;
  }

  private startProgressTracking() {
    this.stopProgressTracking();
    
    // Update progress every 5 seconds
    this.progressIntervalId = window.setInterval(() => {
      if (this.sessionProgress < 100) {
        this.sessionProgress += 1;
      } else {
        this.stopProgressTracking();
      }
    }, 5000) as unknown as number;
  }

  private stopProgressTracking() {
    if (this.progressIntervalId !== null) {
      clearInterval(this.progressIntervalId);
      this.progressIntervalId = null;
    }
  }
}
