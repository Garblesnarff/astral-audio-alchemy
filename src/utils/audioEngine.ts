
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
    
    // Create noise generator for the breath layer
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
    
    // Create gain node for noise
    this.noiseGain = this.audioContext.createGain();
    this.noiseGain.gain.value = this.noiseVolume;
    
    // Connect noise
    this.noiseGenerator.connect(this.noiseGain);
    this.noiseGain.connect(this.analyser);
    
    // Start noise
    this.noiseGenerator.start();
    
    // Create periodic chirps
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
      chirpGain.gain.setValueAtTime(0, this.audioContext!.currentTime);
      chirpGain.gain.linearRampToValueAtTime(0.2, this.audioContext!.currentTime + 0.05);
      chirpGain.gain.linearRampToValueAtTime(0, this.audioContext!.currentTime + 0.3);
      
      // Stop after chirp is done
      setTimeout(() => {
        chirpOsc.stop();
        chirpOsc.disconnect();
        chirpGain.disconnect();
      }, 300);
    };
    
    // Create a chirp every 10 seconds
    createChirp();
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
