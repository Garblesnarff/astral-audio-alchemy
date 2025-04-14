
// Generator for resonant tuning frequencies
export function createResonantTuning(
  audioContext: AudioContext
) {
  const oscillator = audioContext.createOscillator();
  const gain = audioContext.createGain();
  
  // Use Schumann resonance as base
  oscillator.frequency.value = 7.83;
  
  // Use sine wave for pure tone
  oscillator.type = 'sine';
  
  // Set gain to be subtle
  gain.gain.value = 0.1;
  
  // Schedule pulsing pattern for resonant tuning effect
  const now = audioContext.currentTime;
  
  // Pulse the resonant frequency
  gain.gain.setValueAtTime(0.1, now);
  for (let i = 0; i < 10; i++) {
    const startTime = now + (i * 2);
    gain.gain.linearRampToValueAtTime(0.2, startTime + 0.5);
    gain.gain.linearRampToValueAtTime(0.1, startTime + 1);
  }
  
  // Connect
  oscillator.connect(gain);
  
  // Start
  oscillator.start();
  
  return {
    oscillator,
    gain
  };
}
