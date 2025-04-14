
import { AlienPresetBase } from './AlienPresetBase';

export function createSchumannResonance(preset: AlienPresetBase): void {
  const audioContext = preset.getAudioContext();
  const masterGain = preset['masterGain'];
  
  if (!audioContext || !masterGain) return;
  
  const carrierOscillator = audioContext.createOscillator();
  carrierOscillator.type = 'sine';
  carrierOscillator.frequency.value = 100;
  
  const modulatorOscillator = audioContext.createOscillator();
  modulatorOscillator.type = 'sine';
  modulatorOscillator.frequency.value = 7.83;
  
  const modulatorGain = audioContext.createGain();
  modulatorGain.gain.value = 25;
  
  const carrierGain = audioContext.createGain();
  carrierGain.gain.value = preset['baseVolume'] * 0.6;
  
  modulatorOscillator.connect(modulatorGain);
  modulatorGain.connect(carrierOscillator.frequency);
  
  carrierOscillator.connect(carrierGain);
  carrierGain.connect(masterGain);
  
  carrierOscillator.start();
  modulatorOscillator.start();
  
  preset['harmonicOscillators'].push(carrierOscillator, modulatorOscillator);
  preset['harmonicGains'].push(carrierGain, modulatorGain);
  
  // Store references for cleanup
  preset['carrierOscillator'] = carrierOscillator;
  preset['modulatorOscillator'] = modulatorOscillator;
  preset['modulatorGain'] = modulatorGain;
  preset['carrierGain'] = carrierGain;
}
