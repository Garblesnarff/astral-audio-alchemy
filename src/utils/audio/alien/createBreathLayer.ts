
import { AlienPresetBase } from './AlienPresetBase';

export function createBreathLayer(preset: AlienPresetBase): void {
  const audioContext = preset.getAudioContext();
  const masterGain = preset['masterGain'];
  
  if (!audioContext || !masterGain) return;
  
  const bufferSize = 2 * audioContext.sampleRate;
  const noiseBuffer = audioContext.createBuffer(1, bufferSize, audioContext.sampleRate);
  const output = noiseBuffer.getChannelData(0);
  
  // Create a more complex and textured breath pattern
  for (let i = 0; i < bufferSize; i++) {
    const breathRateSlow = 0.03; // Slow breath cycle
    const breathRateMedium = 0.08; // Medium breath cycle
    const breathRateFast = 0.2; // Micro-fluctuations
    
    // Combine multiple sine waves at different frequencies for a more organic effect
    const slowBreath = Math.sin(i * breathRateSlow / audioContext.sampleRate);
    const mediumBreath = Math.sin(i * breathRateMedium / audioContext.sampleRate) * 0.3;
    const fastBreath = Math.sin(i * breathRateFast / audioContext.sampleRate) * 0.1;
    
    // Combine the breath patterns with different weights
    const breathPattern = (slowBreath + mediumBreath + fastBreath) * 0.5 + 0.5;
    
    // Apply the breath pattern to the noise
    output[i] = (Math.random() * 2 - 1) * breathPattern;
  }
  
  const noiseGenerator = audioContext.createBufferSource();
  noiseGenerator.buffer = noiseBuffer;
  noiseGenerator.loop = true;
  
  const noiseGain = audioContext.createGain();
  noiseGain.gain.value = preset['baseVolume'] * 0.2;
  
  noiseGenerator.connect(noiseGain);
  noiseGain.connect(masterGain);
  
  noiseGenerator.start();
  
  preset['noiseGenerator'] = noiseGenerator;
  preset['noiseGain'] = noiseGain;
}
