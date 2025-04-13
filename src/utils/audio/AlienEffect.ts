
import { BaseAudioEffect } from './BaseAudioEffect';
import { AudioEffectOptions } from './types';

/**
 * Class that handles the alien soundscape effects
 */
export class AlienEffect extends BaseAudioEffect {
  private schumann: OscillatorNode | null = null;
  private schumannGain: GainNode | null = null;
  private schumannLFO: OscillatorNode | null = null;
  private schumannLFOGain: GainNode | null = null;
  private harmonicOscillator: OscillatorNode | null = null;
  private harmonicGain: GainNode | null = null;
  private ambientPadOscillator: OscillatorNode | null = null;
  private ambientPadGain: GainNode | null = null;
  private ultrasonicOscillator: OscillatorNode | null = null;
  private ultrasonicGain: GainNode | null = null;
  private noiseGenerator: AudioBufferSourceNode | null = null;
  private noiseGain: GainNode | null = null;
  private breathLFO: OscillatorNode | null = null;
  private breathFilter: BiquadFilterNode | null = null;
  private chirpInterval: number | null = null;
  private volume: number = 0.5;
  private noiseVolume: number = 0.1;
  
  /**
   * Set up all the alien effects
   */
  public setup(options: AudioEffectOptions): void {
    if (!this.audioContext || !this.analyser || !this.masterGain) return;
    
    // Make sure we're starting clean
    this.stop();
    
    console.log("Setting up alien effect with volume", options.volume);
    this.volume = options.volume;
    this.isPlaying = true;
    
    this.addSchumannResonance();
    this.addHarmonicTone();
    this.addAmbientPad();
    this.addUltrasonicPing();
    this.addBreathEffect();
    this.createChirps();
  }
  
  /**
   * Add Schumann resonance effect
   */
  private addSchumannResonance(): void {
    if (!this.audioContext || !this.masterGain) return;
    
    // Create Schumann resonance (7.83 Hz via modulation of 100 Hz base tone)
    this.schumann = this.registerNode(this.audioContext.createOscillator());
    this.schumann.frequency.value = 100; // Base tone at 100 Hz
    this.schumannGain = this.registerNode(this.audioContext.createGain());
    this.schumannGain.gain.value = this.volume * 0.5;
    
    // Create LFO for modulation at 7.83 Hz to simulate Schumann resonance
    this.schumannLFO = this.registerNode(this.audioContext.createOscillator());
    this.schumannLFO.frequency.value = 7.83; // Schumann resonance frequency
    this.schumannLFOGain = this.registerNode(this.audioContext.createGain());
    this.schumannLFOGain.gain.value = 10; // Modulation depth
    
    // Connect LFO to modulate the gain of the 100 Hz oscillator
    this.schumannLFO.connect(this.schumannLFOGain);
    this.schumannLFOGain.connect(this.schumannGain.gain);
    
    // Connect Schumann oscillator to the output
    this.schumann.connect(this.schumannGain);
    this.schumannGain.connect(this.masterGain);
    
    // Start oscillators
    this.schumann.start();
    this.schumannLFO.start();
  }
  
  /**
   * Add harmonic tone (528 Hz spiritual frequency)
   */
  private addHarmonicTone(): void {
    if (!this.audioContext || !this.masterGain) return;
    
    this.harmonicOscillator = this.registerNode(this.audioContext.createOscillator());
    this.harmonicOscillator.frequency.value = 528; // 528 Hz spiritual frequency
    this.harmonicGain = this.registerNode(this.audioContext.createGain());
    this.harmonicGain.gain.value = this.volume * 0.25; // Quieter than the main tone
    
    // Connect harmonic oscillator
    this.harmonicOscillator.connect(this.harmonicGain);
    this.harmonicGain.connect(this.masterGain);
    this.harmonicOscillator.start();
  }
  
  /**
   * Add ambient pad (432 Hz masking layer)
   */
  private addAmbientPad(): void {
    if (!this.audioContext || !this.masterGain) return;
    
    this.ambientPadOscillator = this.registerNode(this.audioContext.createOscillator());
    this.ambientPadOscillator.frequency.value = 432; // 432 Hz "natural" frequency
    this.ambientPadOscillator.type = 'sine';
    this.ambientPadGain = this.registerNode(this.audioContext.createGain());
    this.ambientPadGain.gain.value = this.volume * 0.2; // Even more subtle
    
    // Connect ambient pad
    this.ambientPadOscillator.connect(this.ambientPadGain);
    this.ambientPadGain.connect(this.masterGain);
    this.ambientPadOscillator.start();
  }
  
  /**
   * Add ultrasonic ping (17 kHz)
   */
  private addUltrasonicPing(): void {
    if (!this.audioContext || !this.masterGain) return;
    
    // 17 kHz ultrasonic ping (subtle, for "NHI tech-detection")
    // Note: Many people won't hear this, and many devices can't reproduce it
    this.ultrasonicOscillator = this.registerNode(this.audioContext.createOscillator());
    this.ultrasonicOscillator.frequency.value = 17000; // 17 kHz
    this.ultrasonicGain = this.registerNode(this.audioContext.createGain());
    this.ultrasonicGain.gain.value = this.volume * 0.05; // Very subtle
    
    // Connect ultrasonic oscillator
    this.ultrasonicOscillator.connect(this.ultrasonicGain);
    this.ultrasonicGain.connect(this.masterGain);
    this.ultrasonicOscillator.start();
  }
  
  /**
   * Add breath effect using LFO for modulation instead of scheduled events
   */
  private addBreathEffect(): void {
    if (!this.audioContext || !this.masterGain) return;
    
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
    breathLFOGain.gain.value = this.noiseVolume * this.volume;
    
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
  }
  
  /**
   * Create chirping sounds using properly registered timeouts
   */
  private createChirps(): void {
    if (!this.audioContext || !this.masterGain) return;
    
    const createChirp = () => {
      if (!this.audioContext || !this.masterGain || !this.isPlaying) return;
      
      const chirpOsc = this.registerNode(this.audioContext.createOscillator());
      const chirpGain = this.registerNode(this.audioContext.createGain());
      
      chirpOsc.frequency.value = 2500; // 2.5kHz
      chirpGain.gain.value = 0;
      
      chirpOsc.connect(chirpGain);
      chirpGain.connect(this.masterGain);
      
      // Create chirp envelope
      chirpOsc.start();
      const now = this.audioContext.currentTime;
      
      // Initial silent period
      chirpGain.gain.setValueAtTime(0, now);
      
      // Quick ramp up to create attack
      chirpGain.gain.linearRampToValueAtTime(this.volume * 0.2, now + 0.05);
      
      // Create a slight frequency variation for organic feel
      const randomFreqOffset = Math.random() * 200 - 100; // ±100 Hz variation
      chirpOsc.frequency.linearRampToValueAtTime(
        2500 + randomFreqOffset, now + 0.3
      );
      
      // Decay phase
      chirpGain.gain.linearRampToValueAtTime(0, now + 0.3);
      
      // Stop after chirp is done - using registerTimeout to track timeouts
      this.registerTimeout(window.setTimeout(() => {
        try {
          chirpOsc.stop();
          chirpOsc.disconnect();
          chirpGain.disconnect();
          
          // Remove from active nodes array
          const oscIndex = this.activeNodes.indexOf(chirpOsc);
          if (oscIndex > -1) this.activeNodes.splice(oscIndex, 1);
          
          const gainIndex = this.activeNodes.indexOf(chirpGain);
          if (gainIndex > -1) this.activeNodes.splice(gainIndex, 1);
        } catch (e) {
          console.warn("Error cleaning up chirp:", e);
        }
      }, 400)); // Little extra time to ensure all audio processing is complete
    };
    
    // Create a chirp immediately
    createChirp();
    
    // Create a chirp every 10 seconds - using registerInterval for cleanup
    this.chirpInterval = this.registerInterval(window.setInterval(() => {
      if (this.isPlaying) {
        createChirp();
      }
    }, 10000));
  }
  
  /**
   * Update volume of all components
   */
  public override updateVolume(volume: number): void {
    console.log("AlienEffect: updating volume to", volume);
    this.volume = volume;
    
    // Update master gain first (from parent class)
    super.updateVolume(volume);
    
    // Update individual component volumes
    if (this.schumannGain) {
      this.schumannGain.gain.value = volume * 0.5;
    }
    
    if (this.harmonicGain) {
      this.harmonicGain.gain.value = volume * 0.25;
    }
    
    if (this.ambientPadGain) {
      this.ambientPadGain.gain.value = volume * 0.2;
    }
    
    if (this.ultrasonicGain) {
      this.ultrasonicGain.gain.value = volume * 0.05;
    }
    
    this.noiseVolume = volume * 0.2;
  }
  
  /**
   * Stop all alien effects
   */
  public stop(): void {
    console.log("Stopping all alien effects");
    
    // Clean up all nodes and timers using the parent class method
    this.cleanup();
    
    // Reset all references
    this.schumann = null;
    this.schumannGain = null;
    this.schumannLFO = null;
    this.schumannLFOGain = null;
    this.harmonicOscillator = null;
    this.harmonicGain = null;
    this.ambientPadOscillator = null;
    this.ambientPadGain = null;
    this.ultrasonicOscillator = null;
    this.ultrasonicGain = null;
    this.noiseGenerator = null;
    this.noiseGain = null;
    this.breathLFO = null;
    this.breathFilter = null;
    this.chirpInterval = null;
    
    this.isPlaying = false;
  }
}
