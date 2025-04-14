
/**
 * Adds subtle audio cues for target focusing intervals
 */
export function targetFocusMarkers(
  audioContext: AudioContext,
  masterGain: GainNode
): AudioNode[] {
  const nodes: AudioNode[] = [];
  
  // Create a subtle high-frequency marker
  const markerOsc = audioContext.createOscillator();
  markerOsc.frequency.value = 1000; // 1kHz marker tone
  markerOsc.type = 'sine';
  
  // Create a gain node for the marker with very low volume
  const markerGain = audioContext.createGain();
  markerGain.gain.value = 0.05; // Very subtle
  
  // Connect nodes
  markerOsc.connect(markerGain);
  markerGain.connect(masterGain);
  
  // Start the oscillator
  markerOsc.start();
  
  // Schedule it to play briefly every 5 minutes as a subtle reminder
  const intervalMs = 5 * 60 * 1000; // 5 minutes
  const markerDurationMs = 500; // 0.5 seconds
  
  // Initial marker
  markerGain.gain.setValueAtTime(0, audioContext.currentTime);
  markerGain.gain.linearRampToValueAtTime(0.05, audioContext.currentTime + 0.1);
  markerGain.gain.setValueAtTime(0.05, audioContext.currentTime + 0.4);
  markerGain.gain.linearRampToValueAtTime(0, audioContext.currentTime + 0.5);
  
  // Set up repeating markers
  const markerInterval = setInterval(() => {
    if (!audioContext) {
      clearInterval(markerInterval);
      return;
    }
    
    markerGain.gain.setValueAtTime(0, audioContext.currentTime);
    markerGain.gain.linearRampToValueAtTime(0.05, audioContext.currentTime + 0.1);
    markerGain.gain.setValueAtTime(0.05, audioContext.currentTime + 0.4);
    markerGain.gain.linearRampToValueAtTime(0, audioContext.currentTime + 0.5);
  }, intervalMs);
  
  // Store the interval ID for cleanup
  // @ts-ignore - Adding a custom property for cleanup
  markerOsc.markerInterval = markerInterval;
  
  nodes.push(markerOsc);
  return nodes;
}
