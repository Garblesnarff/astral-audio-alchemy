
/**
 * Implements progressive frequency changes to help users navigate 
 * through the vibrational stage of astral projection
 */
export function vibrationStageGenerator(
  audioContext: AudioContext,
  baseFrequency: number,
  beatFrequency: number,
  leftGain: GainNode,
  rightGain: GainNode
) {
  // Create oscillators for left and right channels
  const leftOsc = audioContext.createOscillator();
  const rightOsc = audioContext.createOscillator();
  
  // Start with theta waves (around 6-7 Hz difference)
  const thetaBeat = beatFrequency >= 4 && beatFrequency <= 7 ? beatFrequency : 6.3;
  
  leftOsc.frequency.value = baseFrequency;
  rightOsc.frequency.value = baseFrequency + thetaBeat;
  
  // Use sine waves for the base frequencies
  leftOsc.type = 'sine';
  rightOsc.type = 'sine';
  
  // Create an LFO to produce the "vibration" sensation
  const vibrationLFO = audioContext.createOscillator();
  vibrationLFO.frequency.value = 0.1; // Very slow modulation
  
  const vibrationDepth = audioContext.createGain();
  vibrationDepth.gain.value = 2; // Moderate depth
  
  vibrationLFO.connect(vibrationDepth);
  
  // Modulate both channels slightly differently for an immersive effect
  vibrationDepth.connect(leftOsc.frequency);
  
  const phaseShifter = audioContext.createGain();
  phaseShifter.gain.value = 1.5;
  vibrationDepth.connect(phaseShifter);
  phaseShifter.connect(rightOsc.frequency);
  
  vibrationLFO.start();
  
  // Schedule progressive increases in vibration intensity
  const now = audioContext.currentTime;
  
  // Start subtle
  vibrationDepth.gain.setValueAtTime(1, now);
  
  // Gradually increase to peak at 10 minutes
  vibrationDepth.gain.linearRampToValueAtTime(5, now + 600);
  
  // Then slowly decrease
  vibrationDepth.gain.linearRampToValueAtTime(2, now + 1200);
  
  // Connect oscillators to gain nodes
  leftOsc.connect(leftGain);
  rightOsc.connect(rightGain);
  
  // Start the oscillators
  leftOsc.start();
  rightOsc.start();
  
  return { leftOsc, rightOsc };
}
