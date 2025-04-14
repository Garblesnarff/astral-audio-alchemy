
import { setupThetaAlphaMix } from './alphaMixGenerator';
import { LucidDreamingBase } from './LucidDreamingBase';

export function setupWithGamma(instance: LucidDreamingBase, baseFreq: number, beatFreq: number, audioContext: AudioContext, analyser: AnalyserNode, masterGain: GainNode, baseVolume: number) {
  const { 
    leftOscillator, 
    rightOscillator, 
    leftGain, 
    rightGain, 
    alphaOscillator, 
    alphaGain 
  } = setupThetaAlphaMix(
    instance, baseFreq, beatFreq, audioContext, analyser, masterGain, baseVolume
  );
  
  const gammaOscillator = audioContext.createOscillator();
  const gammaGain = audioContext.createGain();
  
  gammaOscillator.frequency.value = baseFreq + 40;
  gammaGain.gain.value = baseVolume * 0.25;
  
  gammaOscillator.connect(gammaGain);
  gammaGain.connect(masterGain);
  
  gammaOscillator.start();
  
  return { 
    leftOscillator, 
    rightOscillator, 
    leftGain, 
    rightGain, 
    alphaOscillator, 
    alphaGain, 
    gammaOscillator, 
    gammaGain 
  };
}
