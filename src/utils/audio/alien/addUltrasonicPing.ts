
import { AlienPresetBase } from './AlienPresetBase';

export function addUltrasonicPing(preset: AlienPresetBase): void {
  const audioContext = preset.getAudioContext();
  const masterGain = preset['masterGain'];
  
  if (!audioContext || !masterGain) return;
  
  const createUltrasonicPing = () => {
    const ultrasonicOsc = audioContext.createOscillator();
    const ultrasonicGain = audioContext.createGain();
    
    ultrasonicOsc.type = 'sine';
    ultrasonicOsc.frequency.value = 17000;
    ultrasonicGain.gain.value = 0;
    
    ultrasonicOsc.connect(ultrasonicGain);
    ultrasonicGain.connect(masterGain);
    
    const currentTime = audioContext.currentTime;
    ultrasonicOsc.start(currentTime);
    ultrasonicGain.gain.setValueAtTime(0, currentTime);
    ultrasonicGain.gain.linearRampToValueAtTime(preset['baseVolume'] * 0.15, currentTime + 0.01);
    ultrasonicGain.gain.linearRampToValueAtTime(0, currentTime + 0.15);
    
    setTimeout(() => {
      ultrasonicOsc.stop();
      ultrasonicOsc.disconnect();
      ultrasonicGain.disconnect();
    }, 200);
  };
  
  createUltrasonicPing();
  const ultrasonicInterval = window.setInterval(createUltrasonicPing, 5000);
  preset['ultrasonicInterval'] = ultrasonicInterval;
}
