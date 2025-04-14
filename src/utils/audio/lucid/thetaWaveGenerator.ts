
import { LucidDreamingBase } from './LucidDreamingBase';

export function setupThetaWaves(instance: LucidDreamingBase, baseFreq: number, beatFreq: number, audioContext: AudioContext, analyser: AnalyserNode, masterGain: GainNode, baseVolume: number) {
  const leftOscillator = audioContext.createOscillator();
  const rightOscillator = audioContext.createOscillator();
  
  const leftGain = audioContext.createGain();
  const rightGain = audioContext.createGain();
  
  leftOscillator.frequency.value = baseFreq;
  rightOscillator.frequency.value = baseFreq + beatFreq;
  
  leftGain.gain.value = baseVolume;
  rightGain.gain.value = baseVolume;
  
  leftOscillator.connect(leftGain);
  rightOscillator.connect(rightGain);
  
  leftGain.connect(masterGain);
  rightGain.connect(masterGain);
  
  masterGain.connect(analyser);
  
  leftOscillator.start();
  rightOscillator.start();
  
  return { leftOscillator, rightOscillator, leftGain, rightGain };
}
