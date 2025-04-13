
import { BaseAudioEffect } from '../BaseAudioEffect';
import { AudioEffectOptions, IAudioEffectComponent } from '../types';

/**
 * Component that creates a breathing-like noise effect
 */
export class BreathEffect extends BaseAudioEffect implements IAudioEffectComponent {
  private noiseGenerator: AudioBufferSourceNode | null = null;
  private noiseGain: GainNode | null = null;
  private breathLFO: OscillatorNode | null = null;
  private breathFilter: BiquadFilterNode | null = null;
  private noiseVolume: number = 0.1;

  /**
   * Set up the breath effect
   */
  public setup(options: AudioEffectOptions): void {
    if (!this.audioContext || !this.masterGain) return;
    
    this.noiseVolume = options.volume * 0.2;
    
    // Create noise buffer
    const bufferSize = 2 * this.audioContext.sampleRate;
    const noiseBuffer = this.audioContext.createBuffer(1, bufferSize, this.audioContext.sampleRate);
    const output = noiseBuffer.getChannelData(0);
    
    // Fill the buffer with white noise
    for (let i = 0; i < bufferSize; i++) {
      output[i] = Math.random() * 2 - 1;
    }
    
    // Create and configure noise source
    this.noiseGenerator = this.registerNode(this.audioContext.createBufferSource());
    this.noiseGenerator.buffer = noiseBuffer;
    this.noiseGenerator.loop = true;
    
    // Create gain node for noise with breath-like modulation
    this.noiseGain = this.registerNode(this.audioContext.createGain());
    this.noiseGain.gain.value = 0; // Start at zero
    
    // Create LFO for breathing effect instead of scheduled events
    this.breathLFO = this.registerNode(this.audioContext.createOscillator());
    this.breathLFO.frequency.value = 0.15; // Breathing rate in Hz (about one breath every ~6.7 seconds)
    const breathLFOGain = this.registerNode(this.audioContext.createGain());
    breathLFOGain.gain.value = this.noiseVolume;
    
    // Connect LFO to modulate noise gain
    this.breathLFO.connect(breathLFOGain);
    breathLFOGain.connect(this.noiseGain.gain);
    
    // Filter the noise to make it more organic
    this.breathFilter = this.registerNode(this.audioContext.createBiquadFilter());
    this.breathFilter.type = 'lowpass';
    this.breathFilter.frequency.value = 800; // Cut off higher frequencies
    this.breathFilter.Q.value = 0.5;
    
    // Connect noise chain to output
    this.noiseGenerator.connect(this.noiseGain);
    this.noiseGain.connect(this.breathFilter);
    this.breathFilter.connect(this.masterGain);
    
    // Start oscillators and noise
    this.breathLFO.start();
    this.noiseGenerator.start();
    
    this.isPlaying = true;
  }
  
  /**
   * Update volume of the breath effect
   */
  public updateVolume(volume: number): void {
    this.noiseVolume = volume * 0.2;
  }
  
  /**
   * Stop the breath effect
   */
  public stop(): void {
    this.cleanup();
    
    this.noiseGenerator = null;
    this.noiseGain = null;
    this.breathLFO = null;
    this.breathFilter = null;
    
    this.isPlaying = false;
  }
}
