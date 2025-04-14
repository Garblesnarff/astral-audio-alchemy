
/**
 * Implements subtle audio markers to help guide consciousness 
 * back to the body during astral projection
 */
export function returnSignalGenerator(
  audioContext: AudioContext,
  leftGain: GainNode,
  rightGain: GainNode
) {
  // Create oscillators for left and right channels
  const leftOsc = audioContext.createOscillator();
  const rightOsc = audioContext.createOscillator();
  
  // Use theta waves (6 Hz) as the base frequency
  leftOsc.frequency.value = 200;
  rightOsc.frequency.value = 206;
  
  // Use sine waves for the base
  leftOsc.type = 'sine';
  rightOsc.type = 'sine';
  
  // Create a "beacon" or "homing" signal using amplitude modulation
  const beaconLFO = audioContext.createOscillator();
  beaconLFO.frequency.value = 0.1; // Very slow pulse, 1 pulse every 10 seconds
  
  const beaconDepth = audioContext.createGain();
  beaconDepth.gain.value = 0.3; // Subtle
  
  beaconLFO.connect(beaconDepth);
  
  // Create a gain node to apply the modulation
  const modulatedGain = audioContext.createGain();
  modulatedGain.gain.value = 1.0;
  
  // Connect the beacon modulation to the gain
  beaconDepth.connect(modulatedGain.gain);
  
  // Route the oscillators through the modulated gain
  leftOsc.connect(modulatedGain);
  rightOsc.connect(modulatedGain);
  modulatedGain.connect(leftGain);
  modulatedGain.connect(rightGain);
  
  beaconLFO.start();
  
  // Gradually increase the beacon intensity
  const now = audioContext.currentTime;
  beaconDepth.gain.setValueAtTime(0.1, now);
  beaconDepth.gain.linearRampToValueAtTime(0.6, now + 600); // 10 minutes
  
  // Start the oscillators
  leftOsc.start();
  rightOsc.start();
  
  return { leftOsc, rightOsc };
}
