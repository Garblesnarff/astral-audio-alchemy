
import { AlienPresetBase } from './AlienPresetBase';

export function createChirps(preset: AlienPresetBase): void {
  const audioContext = preset.getAudioContext();
  const masterGain = preset['masterGain'];
  
  if (!audioContext || !masterGain) return;
  
  const createChirp = () => {
    const chirpOsc = audioContext.createOscillator();
    const chirpGain = audioContext.createGain();
    
    chirpOsc.frequency.value = 2500;
    chirpGain.gain.value = 0;
    
    chirpOsc.connect(chirpGain);
    chirpGain.connect(masterGain);
    
    const currentTime = audioContext.currentTime;
    chirpOsc.start(currentTime);
    
    chirpOsc.frequency.setValueAtTime(2500, currentTime);
    chirpOsc.frequency.exponentialRampToValueAtTime(2700, currentTime + 0.1);
    chirpOsc.frequency.exponentialRampToValueAtTime(2450, currentTime + 0.2);
    
    chirpGain.gain.setValueAtTime(0, currentTime);
    chirpGain.gain.linearRampToValueAtTime(preset['baseVolume'] * 0.3, currentTime + 0.05);
    chirpGain.gain.linearRampToValueAtTime(0, currentTime + 0.3);
    
    setTimeout(() => {
      chirpOsc.stop();
      chirpOsc.disconnect();
      chirpGain.disconnect();
    }, 300);
  };
  
  createChirp();
  const chirpInterval = window.setInterval(createChirp, 10000);
  preset['chirpInterval'] = chirpInterval;
}
