
import { AlienPresetBase } from './AlienPresetBase';

export function createBreathLayer(preset: AlienPresetBase): void {
  const audioContext = preset.getAudioContext();
  const masterGain = preset['masterGain'];
  
  if (!audioContext || !masterGain) return;
  
  const bufferSize = 2 * audioContext.sampleRate;
  const noiseBuffer = audioContext.createBuffer(1, bufferSize, audioContext.sampleRate);
  const output = noiseBuffer.getChannelData(0);
  
  for (let i = 0; i < bufferSize; i++) {
    const breathRate = 0.05;
    const breathDepth = 0.7;
    
    const breathPattern = Math.sin(i * breathRate / audioContext.sampleRate) * breathDepth + 0.3;
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
