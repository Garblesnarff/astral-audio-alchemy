
/**
 * Creates a progressive body relaxation sequence with audio frequencies
 * designed to relax the body in preparation for astral projection
 */
export function relaxationSequenceGenerator(
  audioContext: AudioContext,
  leftGain: GainNode,
  rightGain: GainNode
) {
  // Create oscillators for left and right channels
  const leftOsc = audioContext.createOscillator();
  const rightOsc = audioContext.createOscillator();
  
  // Start with alpha waves (around 10 Hz difference) for initial relaxation
  leftOsc.frequency.value = 200;
  rightOsc.frequency.value = 210; // 10 Hz difference
  
  // Use sine waves for gentleness
  leftOsc.type = 'sine';
  rightOsc.type = 'sine';
  
  // Schedule a sequence of frequency changes to guide through progressive relaxation
  const now = audioContext.currentTime;
  
  // Start with alpha waves (10 Hz) for general relaxation - 5 minutes
  leftOsc.frequency.setValueAtTime(200, now);
  rightOsc.frequency.setValueAtTime(210, now);
  
  // Transition to slower alpha (8 Hz) for deeper relaxation - next 5 minutes
  leftOsc.frequency.linearRampToValueAtTime(200, now + 300);
  rightOsc.frequency.linearRampToValueAtTime(208, now + 300);
  
  // Move to theta waves (6 Hz) for even deeper states - next 5 minutes
  leftOsc.frequency.linearRampToValueAtTime(200, now + 600);
  rightOsc.frequency.linearRampToValueAtTime(206, now + 600);
  
  // Connect oscillators to gain nodes
  leftOsc.connect(leftGain);
  rightOsc.connect(rightGain);
  
  // Start the oscillators
  leftOsc.start();
  rightOsc.start();
  
  return { leftOsc, rightOsc };
}
