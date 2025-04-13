
// Class to handle the Web Audio API logic
export class BinauralBeatGenerator {
  private audioContext: AudioContext | null = null;
  private leftOscillator: OscillatorNode | null = null;
  private rightOscillator: OscillatorNode | null = null;
  private leftGain: GainNode | null = null;
  private rightGain: GainNode | null = null;
  private masterGain: GainNode | null = null;
  private stereoPanner: StereoPannerNode | null = null;
  private noiseGenerator: AudioBufferSourceNode | null = null;
  private noiseGain: GainNode | null = null;
  private chirpInterval: number | null = null;
  private ultrasonicOscillator: OscillatorNode | null = null;
  private ultrasonicGain: GainNode | null = null;
  private harmonicOscillator: OscillatorNode | null = null;
  private harmonicGain: GainNode | null = null;
  private ambientPadOscillator: OscillatorNode | null = null;
  private ambientPadGain: GainNode | null = null;
  private schumann: OscillatorNode | null = null;
  private schumannGain: GainNode | null = null;
  private isPlaying = false;
  private analyser: AnalyserNode | null = null;
  private baseFrequency = 200;
  private beatFrequency = 10;
  private baseVolume = 0.5;
  private noiseVolume = 0.1;
  private currentPreset = '';

  // Initialize the audio context
  initialize() {
    try {
      this.audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
      this.analyser = this.audioContext.createAnalyser();
      this.analyser.fftSize = 1024;
      this.analyser.connect(this.audioContext.destination);
      return true;
    } catch (e) {
      console.error('Web Audio API is not supported in this browser', e);
      return false;
    }
  }

  // Get the audio context
  getAudioContext() {
    return this.audioContext;
  }

  // Get the analyser node
  getAnalyser() {
    return this.analyser;
  }

  // Start the binaural beat
  start(baseFreq: number, beatFreq: number, volume: number = 0.5, preset: string = 'custom') {
    if (!this.audioContext) {
      if (!this.initialize()) return;
    }
    
    this.stop();
    this.isPlaying = true;
    this.currentPreset = preset;
    this.baseFrequency = baseFreq;
    this.beatFrequency = beatFreq;
    this.baseVolume = volume;

    this.setupOscillators(baseFreq, beatFreq);
    
    // For the alien summoning preset, add the special effects
    if (preset === 'alien') {
      this.addAlienEffects();
    }
  }
  
  private setupOscillators(baseFreq: number, beatFreq: number) {
    if (!this.audioContext || !this.analyser) return;
    
    // Create oscillators
    this.leftOscillator = this.audioContext.createOscillator();
    this.rightOscillator = this.audioContext.createOscillator();
    
    // Create gain nodes
    this.leftGain = this.audioContext.createGain();
    this.rightGain = this.audioContext.createGain();
    this.masterGain = this.audioContext.createGain();
    
    // Create stereo panner
    this.stereoPanner = this.audioContext.createStereoPanner();
    
    // Set frequencies for left and right ear
    this.leftOscillator.frequency.value = baseFreq;
    this.rightOscillator.frequency.value = baseFreq + beatFreq;
    
    // Set volume
    this.leftGain.gain.value = this.baseVolume;
    this.rightGain.gain.value = this.baseVolume;
    this.masterGain.gain.value = this.baseVolume;
    
    // Connect nodes
    this.leftOscillator.connect(this.leftGain);
    this.rightOscillator.connect(this.rightGain);
    
    // Left channel (pan left)
    this.leftGain.connect(this.masterGain);
    
    // Right channel (pan right)
    this.rightGain.connect(this.masterGain);
    
    this.masterGain.connect(this.analyser);
    
    // Start oscillators
    this.leftOscillator.start();
    this.rightOscillator.start();
  }
  
  // Special effects for the alien summoning preset
  private addAlienEffects() {
    if (!this.audioContext || !this.analyser) return;
    
    // 1. Create Schumann resonance (7.83 Hz via modulation of 100 Hz base tone)
    this.schumann = this.audioContext.createOscillator();
    this.schumann.frequency.value = 100; // Base tone at 100 Hz
    this.schumannGain = this.audioContext.createGain();
    this.schumannGain.gain.value = this.baseVolume * 0.5;
    
    // Create LFO for modulation at 7.83 Hz to simulate Schumann resonance
    const schumannLFO = this.audioContext.createOscillator();
    schumannLFO.frequency.value = 7.83; // Schumann resonance frequency
    const schumannLFOGain = this.audioContext.createGain();
    schumannLFOGain.gain.value = 10; // Modulation depth
    
    // Connect LFO to modulate the gain of the 100 Hz oscillator
    schumannLFO.connect(schumannLFOGain);
    schumannLFOGain.connect(this.schumannGain.gain);
    
    // Connect Schumann oscillator to the output
    this.schumann.connect(this.schumannGain);
    this.schumannGain.connect(this.analyser);
    
    // Start oscillators
    this.schumann.start();
    schumannLFO.start();
    
    // 2. Add 528 Hz harmonic (spiritual frequency)
    this.harmonicOscillator = this.audioContext.createOscillator();
    this.harmonicOscillator.frequency.value = 528; // 528 Hz spiritual frequency
    this.harmonicGain = this.audioContext.createGain();
    this.harmonicGain.gain.value = this.baseVolume * 0.25; // Quieter than the main tone
    
    // Connect harmonic oscillator
    this.harmonicOscillator.connect(this.harmonicGain);
    this.harmonicGain.connect(this.analyser);
    this.harmonicOscillator.start();
    
    // 3. Add 432 Hz ambient pad (masking layer)
    this.ambientPadOscillator = this.audioContext.createOscillator();
    this.ambientPadOscillator.frequency.value = 432; // 432 Hz "natural" frequency
    this.ambientPadOscillator.type = 'sine';
    this.ambientPadGain = this.audioContext.createGain();
    this.ambientPadGain.gain.value = this.baseVolume * 0.2; // Even more subtle
    
    // Connect ambient pad
    this.ambientPadOscillator.connect(this.ambientPadGain);
    this.ambientPadGain.connect(this.analyser);
    this.ambientPadOscillator.start();
    
    // 4. Add 17 kHz ultrasonic ping (subtle, for "NHI tech-detection")
    // Note: Many people won't hear this, and many devices can't reproduce it
    this.ultrasonicOscillator = this.audioContext.createOscillator();
    this.ultrasonicOscillator.frequency.value = 17000; // 17 kHz
    this.ultrasonicGain = this.audioContext.createGain();
    this.ultrasonicGain.gain.value = this.baseVolume * 0.05; // Very subtle
    
    // Connect ultrasonic oscillator
    this.ultrasonicOscillator.connect(this.ultrasonicGain);
    this.ultrasonicGain.connect(this.analyser);
    this.ultrasonicOscillator.start();
    
    // 5. Create noise generator for the breath layer
    const bufferSize = 2 * this.audioContext.sampleRate;
    const noiseBuffer = this.audioContext.createBuffer(1, bufferSize, this.audioContext.sampleRate);
    const output = noiseBuffer.getChannelData(0);
    
    // Fill the buffer with white noise
    for (let i = 0; i < bufferSize; i++) {
      output[i] = Math.random() * 2 - 1;
    }
    
    // Create and configure noise source
    this.noiseGenerator = this.audioContext.createBufferSource();
    this.noiseGenerator.buffer = noiseBuffer;
    this.noiseGenerator.loop = true;
    
    // Create gain node for noise with breath-like modulation
    this.noiseGain = this.audioContext.createGain();
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
    const breathFilter = this.audioContext.createBiquadFilter();
    breathFilter.type = 'lowpass';
    breathFilter.frequency.value = 800; // Cut off higher frequencies
    breathFilter.Q.value = 0.5;
    
    // Connect noise
    this.noiseGenerator.connect(this.noiseGain);
    this.noiseGain.connect(breathFilter);
    breathFilter.connect(this.analyser);
    
    // Start noise
    this.noiseGenerator.start();
    
    // 6. Create periodic chirps (2.5 kHz every 10 seconds)
    this.createChirps();
  }
  
  // Create chirping sounds for alien effect
  private createChirps() {
    if (!this.audioContext || !this.analyser) return;
    
    const createChirp = () => {
      const chirpOsc = this.audioContext!.createOscillator();
      const chirpGain = this.audioContext!.createGain();
      
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
      chirpGain.gain.linearRampToValueAtTime(this.baseVolume * 0.2, now + 0.05);
      
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
      }, 300);
    };
    
    // Create a chirp immediately
    createChirp();
    
    // Create a chirp every 10 seconds
    this.chirpInterval = window.setInterval(createChirp, 10000);
  }
  
  // Stop the binaural beat
  stop() {
    if (this.isPlaying) {
      // Stop and disconnect oscillators
      if (this.leftOscillator) {
        this.leftOscillator.stop();
        this.leftOscillator.disconnect();
        this.leftOscillator = null;
      }
      
      if (this.rightOscillator) {
        this.rightOscillator.stop();
        this.rightOscillator.disconnect();
        this.rightOscillator = null;
      }
      
      // Disconnect gain nodes
      if (this.leftGain) {
        this.leftGain.disconnect();
        this.leftGain = null;
      }
      
      if (this.rightGain) {
        this.rightGain.disconnect();
        this.rightGain = null;
      }
      
      if (this.masterGain) {
        this.masterGain.disconnect();
        this.masterGain = null;
      }
      
      // Stop and disconnect alien effects
      if (this.schumann) {
        this.schumann.stop();
        this.schumann.disconnect();
        this.schumann = null;
      }
      
      if (this.schumannGain) {
        this.schumannGain.disconnect();
        this.schumannGain = null;
      }
      
      if (this.harmonicOscillator) {
        this.harmonicOscillator.stop();
        this.harmonicOscillator.disconnect();
        this.harmonicOscillator = null;
      }
      
      if (this.harmonicGain) {
        this.harmonicGain.disconnect();
        this.harmonicGain = null;
      }
      
      if (this.ambientPadOscillator) {
        this.ambientPadOscillator.stop();
        this.ambientPadOscillator.disconnect();
        this.ambientPadOscillator = null;
      }
      
      if (this.ambientPadGain) {
        this.ambientPadGain.disconnect();
        this.ambientPadGain = null;
      }
      
      if (this.ultrasonicOscillator) {
        this.ultrasonicOscillator.stop();
        this.ultrasonicOscillator.disconnect();
        this.ultrasonicOscillator = null;
      }
      
      if (this.ultrasonicGain) {
        this.ultrasonicGain.disconnect();
        this.ultrasonicGain = null;
      }
      
      // Stop noise generator
      if (this.noiseGenerator) {
        this.noiseGenerator.stop();
        this.noiseGenerator.disconnect();
        this.noiseGenerator = null;
      }
      
      if (this.noiseGain) {
        this.noiseGain.disconnect();
        this.noiseGain = null;
      }
      
      // Clear chirp interval
      if (this.chirpInterval) {
        clearInterval(this.chirpInterval);
        this.chirpInterval = null;
      }
      
      this.isPlaying = false;
    }
  }
  
  // Set volume
  setVolume(volume: number) {
    this.baseVolume = volume;
    if (this.masterGain) {
      this.masterGain.gain.value = volume;
    }
    
    if (this.noiseGain) {
      this.noiseGain.gain.value = volume * 0.2; // Keep noise quieter than main tones
    }
    
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
  }
  
  // Check if currently playing
  getIsPlaying() {
    return this.isPlaying;
  }
  
  // Get current preset
  getCurrentPreset() {
    return this.currentPreset;
  }
  
  // Set base frequency
  setBaseFrequency(frequency: number) {
    this.baseFrequency = frequency;
    if (this.leftOscillator) {
      this.leftOscillator.frequency.value = frequency;
    }
    if (this.rightOscillator) {
      this.rightOscillator.frequency.value = frequency + this.beatFrequency;
    }
  }
  
  // Set beat frequency
  setBeatFrequency(frequency: number) {
    this.beatFrequency = frequency;
    if (this.rightOscillator && this.leftOscillator) {
      this.rightOscillator.frequency.value = this.baseFrequency + frequency;
    }
  }
  
  // Get current base frequency
  getBaseFrequency() {
    return this.baseFrequency;
  }
  
  // Get current beat frequency
  getBeatFrequency() {
    return this.beatFrequency;
  }
  
  // Suspend audio context (for battery saving)
  suspend() {
    if (this.audioContext && this.audioContext.state === 'running') {
      this.audioContext.suspend();
    }
  }
  
  // Resume audio context
  resume() {
    if (this.audioContext && this.audioContext.state === 'suspended') {
      this.audioContext.resume();
    }
  }
  
  // Clean up on component unmount
  cleanup() {
    this.stop();
    if (this.analyser) {
      this.analyser.disconnect();
      this.analyser = null;
    }
    if (this.audioContext) {
      this.audioContext.close();
      this.audioContext = null;
    }
  }
}

// Create a singleton instance
const audioEngine = new BinauralBeatGenerator();
export default audioEngine;
