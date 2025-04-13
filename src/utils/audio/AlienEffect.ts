
import { BaseAudioEffect } from './BaseAudioEffect';
import { AudioEffectOptions, isOscillatorNode, isGainNode, isAudioBufferSourceNode } from './types';

/**
 * Class that handles the special alien effects
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
  private breathFilter: BiquadFilterNode | null = null;
  private chirpInterval: number | null = null;
  private volume: number = 0.5;
  private noiseVolume: number = 0.1;
  
  constructor(audioContext: AudioContext | null, private analyser: AnalyserNode | null) {
    super(audioContext);
  }
  
  /**
   * Set up all the alien effects
   */
  public setup(options: AudioEffectOptions): void {
    if (!this.audioContext || !this.analyser) return;
    
    // Make sure we're starting clean
    this.stop();
    
    this.volume = options.volume;
    this.isPlaying = true;
    
    console.log("Adding alien effects");
    
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
    if (!this.audioContext || !this.analyser) return;
    
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
    this.schumannGain.connect(this.analyser);
    
    // Start oscillators
    this.schumann.start();
    this.schumannLFO.start();
  }
  
  /**
   * Add harmonic tone (528 Hz spiritual frequency)
   */
  private addHarmonicTone(): void {
    if (!this.audioContext || !this.analyser) return;
    
    this.harmonicOscillator = this.registerNode(this.audioContext.createOscillator());
    this.harmonicOscillator.frequency.value = 528; // 528 Hz spiritual frequency
    this.harmonicGain = this.registerNode(this.audioContext.createGain());
    this.harmonicGain.gain.value = this.volume * 0.25; // Quieter than the main tone
    
    // Connect harmonic oscillator
    this.harmonicOscillator.connect(this.harmonicGain);
    this.harmonicGain.connect(this.analyser);
    this.harmonicOscillator.start();
  }
  
  /**
   * Add ambient pad (432 Hz masking layer)
   */
  private addAmbientPad(): void {
    if (!this.audioContext || !this.analyser) return;
    
    this.ambientPadOscillator = this.registerNode(this.audioContext.createOscillator());
    this.ambientPadOscillator.frequency.value = 432; // 432 Hz "natural" frequency
    this.ambientPadOscillator.type = 'sine';
    this.ambientPadGain = this.registerNode(this.audioContext.createGain());
    this.ambientPadGain.gain.value = this.volume * 0.2; // Even more subtle
    
    // Connect ambient pad
    this.ambientPadOscillator.connect(this.ambientPadGain);
    this.ambientPadGain.connect(this.analyser);
    this.ambientPadOscillator.start();
  }
  
  /**
   * Add ultrasonic ping (17 kHz)
   */
  private addUltrasonicPing(): void {
    if (!this.audioContext || !this.analyser) return;
    
    // 17 kHz ultrasonic ping (subtle, for "NHI tech-detection")
    // Note: Many people won't hear this, and many devices can't reproduce it
    this.ultrasonicOscillator = this.registerNode(this.audioContext.createOscillator());
    this.ultrasonicOscillator.frequency.value = 17000; // 17 kHz
    this.ultrasonicGain = this.registerNode(this.audioContext.createGain());
    this.ultrasonicGain.gain.value = this.volume * 0.05; // Very subtle
    
    // Connect ultrasonic oscillator
    this.ultrasonicOscillator.connect(this.ultrasonicGain);
    this.ultrasonicGain.connect(this.analyser);
    this.ultrasonicOscillator.start();
  }
  
  /**
   * Add breath effect
   */
  private addBreathEffect(): void {
    if (!this.audioContext || !this.analyser) return;
    
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
    this.noiseGain.gain.value = 0; // Start silent
    
    // Create breath effect with gain automation
    const breathRate = 0.15; // Breaths per second (slow breathing)
    const now = this.audioContext.currentTime;
    
    // Schedule automatic gain changes to simulate breathing
    for (let i = 0; i < 100; i++) { // Schedule many breaths ahead
      const startTime = now + (i * (1 / breathRate));
      // Inhale (gradually increase volume)
      this.noiseGain.gain.setValueAtTime(0.01, startTime);
      this.noiseGain.gain.exponentialRampToValueAtTime(
        this.noiseVolume, startTime + (1 / breathRate) * 0.3
      );
      // Exhale (gradually decrease volume)
      this.noiseGain.gain.exponentialRampToValueAtTime(
        0.01, startTime + (1 / breathRate)
      );
    }
    
    // Filter the noise to make it more organic
    this.breathFilter = this.registerNode(this.audioContext.createBiquadFilter());
    this.breathFilter.type = 'lowpass';
    this.breathFilter.frequency.value = 800; // Cut off higher frequencies
    this.breathFilter.Q.value = 0.5;
    
    // Connect noise
    this.noiseGenerator.connect(this.noiseGain);
    this.noiseGain.connect(this.breathFilter);
    this.breathFilter.connect(this.analyser);
    
    // Start noise
    this.noiseGenerator.start();
  }
  
  /**
   * Create chirping sounds
   */
  private createChirps(): void {
    if (!this.audioContext || !this.analyser) return;
    
    const createChirp = () => {
      const chirpOsc = this.audioContext!.createOscillator();
      const chirpGain = this.audioContext!.createGain();
      
      // Register for tracking (not using this.registerNode because they're temporary)
      this.activeNodes.push(chirpOsc, chirpGain);
      
      chirpOsc.frequency.value = 2500; // 2.5kHz
      chirpGain.gain.value = 0;
      
      chirpOsc.connect(chirpGain);
      chirpGain.connect(this.analyser!);
      
      // Create chirp envelope
      chirpOsc.start();
      const now = this.audioContext!.currentTime;
      
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
      
      // Stop after chirp is done
      setTimeout(() => {
        chirpOsc.stop();
        chirpOsc.disconnect();
        chirpGain.disconnect();
        
        // Remove from active nodes array
        const oscIndex = this.activeNodes.indexOf(chirpOsc);
        if (oscIndex > -1) this.activeNodes.splice(oscIndex, 1);
        
        const gainIndex = this.activeNodes.indexOf(chirpGain);
        if (gainIndex > -1) this.activeNodes.splice(gainIndex, 1);
      }, 300);
    };
    
    // Create a chirp immediately
    createChirp();
    
    // Create a chirp every 10 seconds
    this.chirpInterval = window.setInterval(createChirp, 10000);
  }
  
  /**
   * Update volume of all components
   */
  public updateVolume(volume: number): void {
    this.volume = volume;
    
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
    
    if (this.noiseGain) {
      // Update noise breathing pattern
      this.noiseVolume = volume * 0.2;
    }
  }
  
  /**
   * Stop all alien effects
   */
  public stop(): void {
    console.log("Stopping all alien effects");
    
    // Stop Schumann resonance
    this.stopOscillator(this.schumann);
    this.stopOscillator(this.schumannLFO);
    this.disconnectNode(this.schumannGain);
    this.disconnectNode(this.schumannLFOGain);
    
    // Stop harmonic oscillator
    this.stopOscillator(this.harmonicOscillator);
    this.disconnectNode(this.harmonicGain);
    
    // Stop ambient pad
    this.stopOscillator(this.ambientPadOscillator);
    this.disconnectNode(this.ambientPadGain);
    
    // Stop ultrasonic oscillator
    this.stopOscillator(this.ultrasonicOscillator);
    this.disconnectNode(this.ultrasonicGain);
    
    // Stop noise generator
    if (this.noiseGenerator) {
      try {
        this.noiseGenerator.stop();
        this.noiseGenerator.disconnect();
      } catch (e) {
        console.warn("Error stopping noise generator:", e);
      }
    }
    this.disconnectNode(this.noiseGain);
    this.disconnectNode(this.breathFilter);
    
    // Clear chirp interval
    if (this.chirpInterval) {
      clearInterval(this.chirpInterval);
      this.chirpInterval = null;
    }
    
    // Reset variables
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
    this.breathFilter = null;
    
    // Clean up any remaining nodes
    this.cleanup();
    
    this.isPlaying = false;
  }
}
