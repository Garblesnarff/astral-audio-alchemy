
import { setupThetaWaves } from './thetaWaveGenerator';
import { LucidDreamingBase } from './LucidDreamingBase';

export function setupThetaAlphaMix(instance: LucidDreamingBase, baseFreq: number, beatFreq: number, audioContext: AudioContext, analyser: AnalyserNode, masterGain: GainNode, baseVolume: number) {
  const { leftOscillator, rightOscillator, leftGain, rightGain } = setupThetaWaves(
    instance, baseFreq, beatFreq, audioContext, analyser, masterGain, baseVolume
  );
  
  const alphaOscillator = audioContext.createOscillator();
  const alphaGain = audioContext.createGain();
  
  alphaOscillator.frequency.value = baseFreq + 10;
  alphaGain.gain.value = baseVolume * 0.4;
  
  alphaOscillator.connect(alphaGain);
  alphaGain.connect(masterGain);
  
  alphaOscillator.start();
  
  return { 
    leftOscillator, 
    rightOscillator, 
    leftGain, 
    rightGain, 
    alphaOscillator, 
    alphaGain 
  };
}
