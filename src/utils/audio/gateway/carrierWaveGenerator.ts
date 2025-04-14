
// Generator for carrier wave frequencies that transport the binaural beat
export function createCarrierWave(
  audioContext: AudioContext,
  focusLevel: string
) {
  const oscillator = audioContext.createOscillator();
  const gain = audioContext.createGain();
  
  // Set properties based on focus level
  switch (focusLevel) {
    case 'focus10':
      oscillator.frequency.value = 136.1; // OM frequency
      break;
    case 'focus12':
      oscillator.frequency.value = 288; // Double OM
      break;
    case 'focus15':
      oscillator.frequency.value = 432; // "Healing" frequency
      break;
    case 'focus21':
      oscillator.frequency.value = 528; // "Miracle" frequency
      break;
    default:
      oscillator.frequency.value = 136.1;
  }
  
  // Use sine wave for carrier
  oscillator.type = 'sine';
  
  // Set gain to be subtle
  gain.gain.value = 0.15;
  
  // Connect
  oscillator.connect(gain);
  
  // Start
  oscillator.start();
  
  return {
    oscillator,
    gain
  };
}
