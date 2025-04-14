
/**
 * Generates cycling between beta and theta states to enhance information
 * reception during remote viewing sessions
 */
export function betaThetaCycleGenerator(
  audioContext: AudioContext,
  baseFrequency: number,
  beatFrequency: number,
  leftGain: GainNode,
  rightGain: GainNode
) {
  // Create oscillators for left and right channels
  const leftOsc = audioContext.createOscillator();
  const rightOsc = audioContext.createOscillator();
  
  // Set initial frequencies to create a theta wave (4-7 Hz)
  leftOsc.frequency.value = baseFrequency;
  rightOsc.frequency.value = baseFrequency + (beatFrequency || 5); // Default to 5 Hz theta
  
  // Use sine waves for the base oscillation
  leftOsc.type = 'sine';
  rightOsc.type = 'sine';
  
  // Connect oscillators to gain nodes
  leftOsc.connect(leftGain);
  rightOsc.connect(rightGain);
  
  // Start the oscillators
  leftOsc.start();
  rightOsc.start();
  
  // Set up cycling between beta (15-20 Hz) and theta (4-7 Hz)
  // This creates a pattern of alternating between focused attention and receptive states
  const cycleDuration = 60; // seconds for a complete cycle
  const betaDuration = 20; // seconds in beta state
  const thetaDuration = 40; // seconds in theta state
  
  let cycleInterval = setInterval(() => {
    if (!audioContext) {
      clearInterval(cycleInterval);
      return;
    }
    
    // Switch to beta state (focused attention)
    rightOsc.frequency.setValueAtTime(
      baseFrequency + 15, // 15 Hz beta
      audioContext.currentTime
    );
    rightOsc.frequency.linearRampToValueAtTime(
      baseFrequency + 15,
      audioContext.currentTime + 0.5
    );
    
    // After beta duration, switch back to theta
    setTimeout(() => {
      if (!audioContext) return;
      
      rightOsc.frequency.setValueAtTime(
        baseFrequency + 5, // 5 Hz theta
        audioContext.currentTime
      );
      rightOsc.frequency.linearRampToValueAtTime(
        baseFrequency + 5,
        audioContext.currentTime + 0.5
      );
    }, betaDuration * 1000);
    
  }, cycleDuration * 1000);
  
  // Store the interval ID for cleanup
  // @ts-ignore - Adding a custom property for cleanup
  leftOsc.cycleInterval = cycleInterval;
  
  return { leftOsc, rightOsc };
}
