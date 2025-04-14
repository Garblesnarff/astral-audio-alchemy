
export function createDreamStabilization(audioContext: AudioContext, masterGain: GainNode, baseVolume: number) {
  const dreamStabilizationOsc = audioContext.createOscillator();
  const dreamStabilizationGain = audioContext.createGain();
  
  dreamStabilizationOsc.frequency.value = 0.2; 
  dreamStabilizationGain.gain.value = baseVolume * 0.1;
  
  dreamStabilizationOsc.connect(dreamStabilizationGain);
  dreamStabilizationGain.connect(masterGain);
  
  dreamStabilizationOsc.start();
  
  return { dreamStabilizationOsc, dreamStabilizationGain };
}
