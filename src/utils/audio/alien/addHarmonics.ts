
import { AlienPresetBase } from './AlienPresetBase';

export function add528HzHarmonic(preset: AlienPresetBase): void {
  const audioContext = preset.getAudioContext();
  const masterGain = preset['masterGain'];
  
  if (!audioContext || !masterGain) return;
  
  const harmonicOsc = audioContext.createOscillator();
  harmonicOsc.type = 'sine';
  harmonicOsc.frequency.value = 528;
  
  const harmonicGain = audioContext.createGain();
  harmonicGain.gain.value = preset['baseVolume'] * 0.4;
  
  harmonicOsc.connect(harmonicGain);
  harmonicGain.connect(masterGain);
  
  harmonicOsc.start();
  
  preset['harmonicOscillators'].push(harmonicOsc);
  preset['harmonicGains'].push(harmonicGain);
}

export function add432HzAmbientPad(preset: AlienPresetBase): void {
  const audioContext = preset.getAudioContext();
  const masterGain = preset['masterGain'];
  
  if (!audioContext || !masterGain) return;
  
  const ambientPad = audioContext.createOscillator();
  ambientPad.type = 'sine';
  ambientPad.frequency.value = 432;
  
  const ambientGain = audioContext.createGain();
  ambientGain.gain.value = preset['baseVolume'] * 0.25;
  
  const modulator = audioContext.createOscillator();
  const modulatorGain = audioContext.createGain();
  
  modulator.frequency.value = 0.1;
  modulatorGain.gain.value = 5;
  
  modulator.connect(modulatorGain);
  modulatorGain.connect(ambientPad.detune);
  
  ambientPad.connect(ambientGain);
  ambientGain.connect(masterGain);
  
  ambientPad.start();
  modulator.start();
  
  preset['harmonicOscillators'].push(modulator);
  preset['ambientPad'] = ambientPad;
  preset['ambientGain'] = ambientGain;
}
