
/**
 * Generates a mix of theta and delta waves with emphasis on 4 Hz
 * which is particularly effective for remote viewing
 */
export function thetaDeltaMixGenerator(
  audioContext: AudioContext,
  baseFrequency: number,
  beatFrequency: number,
  leftGain: GainNode,
  rightGain: GainNode
) {
  // Create oscillators for left and right channels
  const leftOsc = audioContext.createOscillator();
  const rightOsc = audioContext.createOscillator();
  
  // Set frequencies to create a 4 Hz binaural beat (or specified beat frequency)
  // Default to 4 Hz if not specified, as this is optimal for remote viewing
  const actualBeatFreq = beatFrequency || 4;
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
