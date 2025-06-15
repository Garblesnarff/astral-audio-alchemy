
import { LucidDreamingBase } from './LucidDreamingBase';
import { setupThetaWaves } from './thetaWaveGenerator';
import { setupThetaAlphaMix } from './alphaMixGenerator';
import { setupWithGamma } from './gammaGenerator';
import { createDreamStabilization } from './dreamStabilization';

export interface PresetSetupResult {
  leftOscillator: OscillatorNode;
  rightOscillator: OscillatorNode;
  leftGain: GainNode;
  rightGain: GainNode;
  alphaOscillator?: OscillatorNode;
  alphaGain?: GainNode;
  gammaOscillator?: OscillatorNode;
  gammaGain?: GainNode;
  dreamStabilizationOsc: OscillatorNode;
  dreamStabilizationGain: GainNode;
}

export class PresetSetupOrchestrator {
  static setupPreset(
    instance: LucidDreamingBase,
    preset: string,
    baseFreq: number,
    beatFreq: number,
    audioContext: AudioContext,
    analyser: AnalyserNode,
    masterGain: GainNode,
    baseVolume: number
  ): PresetSetupResult {
    let setupResult;
    
    switch (preset) {
      case 'basic':
        setupResult = setupThetaWaves(
          instance, baseFreq, beatFreq, audioContext, analyser, masterGain, baseVolume
        );
        break;
      case 'advanced':
        setupResult = setupThetaAlphaMix(
          instance, baseFreq, beatFreq, audioContext, analyser, masterGain, baseVolume
        );
        break;
      case 'gamma':
        setupResult = setupWithGamma(
          instance, baseFreq, beatFreq, audioContext, analyser, masterGain, baseVolume
        );
        break;
      case 'wbtb':
        setupResult = setupThetaWaves(
          instance, baseFreq, beatFreq, audioContext, analyser, masterGain, baseVolume
        );
        break;
      default:
        setupResult = setupThetaWaves(
          instance, baseFreq, beatFreq, audioContext, analyser, masterGain, baseVolume
        );
    }
    
    // Add dream stabilization to all setups
    const dreamStabilization = createDreamStabilization(audioContext, masterGain, baseVolume);
    
    return {
      ...setupResult,
      dreamStabilizationOsc: dreamStabilization.dreamStabilizationOsc,
      dreamStabilizationGain: dreamStabilization.dreamStabilizationGain
    };
  }
}
