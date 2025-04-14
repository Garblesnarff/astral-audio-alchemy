
// Generator for different focus level frequencies
export function createFocusLevelSignal(
  audioContext: AudioContext,
  focusLevel: string
) {
  const outputGain = audioContext.createGain();
  outputGain.gain.value = 0.3; // Lower amplitude than primary signal
  
  let frequencies: number[] = [];
  let oscillators: OscillatorNode[] = [];
  
  // Determine frequencies based on focus level
  switch (focusLevel) {
    case 'focus10':
      // Mind awake (alpha) - body asleep (delta)
      frequencies = [10, 4, 7.83]; // Alpha, Delta, Schumann resonance
      break;
    case 'focus12':
      // Expanded awareness
      frequencies = [12, 7.5, 40]; // Higher alpha, theta, gamma
      break;
    case 'focus15':
      // No time state
      frequencies = [4.5, 3, 7.83, 33]; // Low theta, delta, Schumann, gamma
      break;
    case 'focus21':
      // Interdimensional consciousness
      frequencies = [3.5, 1.5, 7.83, 40]; // Deep delta, sub-delta, Schumann, gamma
      break;
    default:
      frequencies = [7.83]; // Default to Schumann resonance
  }
  
  // Create oscillators for each frequency
  for (const freq of frequencies) {
    const oscillator = audioContext.createOscillator();
    const gain = audioContext.createGain();
    
    // Set properties
    oscillator.type = 'sine';
    oscillator.frequency.value = freq;
    gain.gain.value = 0.2 / frequencies.length; // Balance combined volume
    
    // Connect
    oscillator.connect(gain);
    gain.connect(outputGain);
    
    // Start
    oscillator.start();
    oscillators.push(oscillator);
  }
  
  // Return the collection of oscillators and the output gain
  return {
    oscillators,
    outputGain
  };
}
