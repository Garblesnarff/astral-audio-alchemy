
/**
 * Generates deep theta waves specifically for astral projection, 
 * focusing on the 4-7 Hz range with emphasis on 6.3 Hz
 */
export function deepThetaWaveGenerator(
  audioContext: AudioContext,
  baseFrequency: number,
  beatFrequency: number,
  leftGain: GainNode,
  rightGain: GainNode
) {
  // Create oscillators for left and right channels
  const leftOsc = audioContext.createOscillator();
  const rightOsc = audioContext.createOscillator();
  
  // Set frequencies to create a 6.3 Hz binaural beat (or specified beat frequency)
  // Default to 6.3 Hz if not specified, as this is optimal for astral projection
  const actualBeatFreq = beatFrequency || 6.3;
  leftOsc.frequency.value = baseFrequency;
  rightOsc.frequency.value = baseFrequency + actualBeatFreq;
  
  // Use sine waves for cleaner, more effective entrainment
  leftOsc.type = 'sine';
  rightOsc.type = 'sine';
  
  // Connect oscillators to gain nodes
  leftOsc.connect(leftGain);
  rightOsc.connect(rightGain);
  
  // Start the oscillators
  leftOsc.start();
  rightOsc.start();
  
  return { leftOsc, rightOsc };
}
