
/**
 * Generates a combination of very low (epsilon, below 0.5 Hz) and 
 * very high (lambda, above 100 Hz) frequencies for astral projection
 */
export function epsilonLambdaGenerator(
  audioContext: AudioContext,
  baseFrequency: number,
  beatFrequency: number,
  leftGain: GainNode,
  rightGain: GainNode
) {
  // Create oscillators for left and right channels
  const leftOsc = audioContext.createOscillator();
  const rightOsc = audioContext.createOscillator();
  
  // Set frequencies to create a very low epsilon beat (0.5 Hz or lower)
  const epsilonBeat = beatFrequency <= 0.5 ? beatFrequency : 0.5;
  
  // Use higher carrier frequencies to also introduce lambda waves
  const lambdaBase = baseFrequency > 100 ? baseFrequency : 100;
  
  leftOsc.frequency.value = lambdaBase;
  rightOsc.frequency.value = lambdaBase + epsilonBeat;
  
  // Use sine waves for cleaner entrainment
  leftOsc.type = 'sine';
  rightOsc.type = 'sine';
  
  // Create modulators for the lambda component
  const lambdaModulator = audioContext.createOscillator();
  lambdaModulator.frequency.value = 120; // Hz, in the lambda range
  
  const modulatorGain = audioContext.createGain();
  modulatorGain.gain.value = 10; // Depth of modulation
  
  lambdaModulator.connect(modulatorGain);
  modulatorGain.connect(leftOsc.frequency);
  modulatorGain.connect(rightOsc.frequency);
  lambdaModulator.start();
  
  // Connect oscillators to gain nodes
  leftOsc.connect(leftGain);
  rightOsc.connect(rightGain);
  
  // Start the oscillators
  leftOsc.start();
  rightOsc.start();
  
  return { leftOsc, rightOsc };
}
