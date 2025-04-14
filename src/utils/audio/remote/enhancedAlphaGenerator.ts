
/**
 * Generates enhanced alpha frequencies (8-12 Hz) for alert but relaxed
 * state ideal for remote viewing data reception and analysis
 */
export function enhancedAlphaGenerator(
  audioContext: AudioContext,
  baseFrequency: number,
  beatFrequency: number,
  leftGain: GainNode,
  rightGain: GainNode
) {
  // Create oscillators for left and right channels
  const leftOsc = audioContext.createOscillator();
  const rightOsc = audioContext.createOscillator();
  
  // Set frequencies to create an alpha wave binaural beat (typically 8-12 Hz)
  // Default to 10 Hz if not specified, as this is in the middle of the alpha range
  const actualBeatFreq = beatFrequency || 10;
  leftOsc.frequency.value = baseFrequency;
  rightOsc.frequency.value = baseFrequency + actualBeatFreq;
  
  // Use sine waves for the base oscillation
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
