
/**
 * Generates brief white noise segments to "clear the slate" 
 * between remote viewing attempts
 */
export function whiteNoiseGenerator(
  audioContext: AudioContext,
  masterGain: GainNode,
  durationMs: number = 5000 // Default 5 seconds
): AudioBufferSourceNode {
  // Create a buffer for white noise
  const bufferSize = audioContext.sampleRate * (durationMs / 1000);
  const noiseBuffer = audioContext.createBuffer(2, bufferSize, audioContext.sampleRate);
  
  // Fill the buffer with white noise
  for (let channel = 0; channel < noiseBuffer.numberOfChannels; channel++) {
    const output = noiseBuffer.getChannelData(channel);
    for (let i = 0; i < bufferSize; i++) {
      // Random values between -1.0 and 1.0
      output[i] = Math.random() * 2 - 1;
    }
  }
  
  // Create a buffer source node
  const whiteNoiseSource = audioContext.createBufferSource();
  whiteNoiseSource.buffer = noiseBuffer;
  
  // Create a gain node to control the volume of the white noise
  const noiseGain = audioContext.createGain();
  noiseGain.gain.value = 0.2; // Lower volume for the noise
  
  // Connect the nodes
  whiteNoiseSource.connect(noiseGain);
  noiseGain.connect(masterGain);
  
  // Fade in and out for smoother transition
  noiseGain.gain.setValueAtTime(0, audioContext.currentTime);
  noiseGain.gain.linearRampToValueAtTime(0.2, audioContext.currentTime + 0.1);
  noiseGain.gain.setValueAtTime(0.2, audioContext.currentTime + (durationMs / 1000) - 0.2);
  noiseGain.gain.linearRampToValueAtTime(0, audioContext.currentTime + (durationMs / 1000));
  
  // Start and stop the white noise
  whiteNoiseSource.start();
  whiteNoiseSource.stop(audioContext.currentTime + (durationMs / 1000));
  
  return whiteNoiseSource;
}
