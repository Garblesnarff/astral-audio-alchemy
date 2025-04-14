
/**
 * Generates the special 777 Hz frequency associated with astral projection
 */
export function frequency777Generator(
  audioContext: AudioContext,
  leftGain: GainNode,
  rightGain: GainNode
) {
  // Create oscillators for left and right channels
  const leftOsc = audioContext.createOscillator();
  const rightOsc = audioContext.createOscillator();
  
  // Set the special 777 Hz frequency
  leftOsc.frequency.value = 777;
  
  // Create a slight difference between channels to enhance the effect
  // Using a 7.7 Hz difference, which is in the alpha range
  rightOsc.frequency.value = 777 + 7.7;
  
  // Use sine waves for purity of tone
  leftOsc.type = 'sine';
  rightOsc.type = 'sine';
  
  // Add subtle harmonics
  const harmonicGain = audioContext.createGain();
  harmonicGain.gain.value = 0.1; // Subtle
  
  const harmonic = audioContext.createOscillator();
  harmonic.frequency.value = 777 * 2; // Second harmonic
  harmonic.connect(harmonicGain);
  harmonicGain.connect(leftGain);
  harmonic.start();
  
  // Connect oscillators to gain nodes
  leftOsc.connect(leftGain);
  rightOsc.connect(rightGain);
  
  // Start the oscillators
  leftOsc.start();
  rightOsc.start();
  
  return { leftOsc, rightOsc };
}
