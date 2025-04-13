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
  private ultrasonicInterval: number | null = null;
  private harmonicOscillators: OscillatorNode[] = [];
  private harmonicGains: GainNode[] = [];
  private ambientPad: OscillatorNode | null = null;
  private ambientGain: GainNode | null = null;
  private isPlaying = false;
  private analyser: AnalyserNode | null = null;
  private baseFrequency = 200;
  private beatFrequency = 10;
  private baseVolume = 0.5;
  private noiseVolume = 0.1;
  private currentPreset = '';
  private carrierOscillator: OscillatorNode | null = null;
  private modulatorOscillator: OscillatorNode | null = null;
  private modulatorGain: GainNode | null = null;
  private carrierGain: GainNode | null = null;

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

    if (preset === 'alien') {
      this.setupAlienPreset();
    } else {
      this.setupOscillators(baseFreq, beatFreq);
    }
  }
  
  private setupOscillators(baseFreq: number, beatFreq: number) {
    if (!this.audioContext || !this.analyser) return;
    
    this.leftOscillator = this.audioContext.createOscillator();
    this.rightOscillator = this.audioContext.createOscillator();
    
    this.leftGain = this.audioContext.createGain();
    this.rightGain = this.audioContext.createGain();
    this.masterGain = this.audioContext.createGain();
    
    this.stereoPanner = this.audioContext.createStereoPanner();
    
    this.leftOscillator.frequency.value = baseFreq;
    this.rightOscillator.frequency.value = baseFreq + beatFreq;
    
    this.leftGain.gain.value = this.baseVolume;
    this.rightGain.gain.value = this.baseVolume;
    this.masterGain.gain.value = this.baseVolume;
    
    this.leftOscillator.connect(this.leftGain);
    this.rightOscillator.connect(this.rightGain);
    
    this.leftGain.connect(this.masterGain);
    this.rightGain.connect(this.masterGain);
    
    this.masterGain.connect(this.analyser);
    
    this.leftOscillator.start();
    this.rightOscillator.start();
  }
  
  private setupAlienPreset() {
    if (!this.audioContext || !this.analyser) return;
    
    this.masterGain = this.audioContext.createGain();
    this.masterGain.gain.value = this.baseVolume;
    this.masterGain.connect(this.analyser);
    
    this.createSchumannResonance();
    
    this.add528HzHarmonic();
    
    this.add432HzAmbientPad();
    
    this.createBreathLayer();
    
    this.createChirps();
    
    this.addUltrasonicPing();
  }
  
  private createSchumannResonance() {
    if (!this.audioContext || !this.masterGain) return;
    
    this.carrierOscillator = this.audioContext.createOscillator();
    this.carrierOscillator.type = 'sine';
    this.carrierOscillator.frequency.value = 100;
    
    this.modulatorOscillator = this.audioContext.createOscillator();
    this.modulatorOscillator.type = 'sine';
    this.modulatorOscillator.frequency.value = 7.83;
    
    this.modulatorGain = this.audioContext.createGain();
    this.modulatorGain.gain.value = 25;
    
    this.carrierGain = this.audioContext.createGain();
    this.carrierGain.gain.value = this.baseVolume * 0.6;
    
    this.modulatorOscillator.connect(this.modulatorGain);
    this.modulatorGain.connect(this.carrierOscillator.frequency);
    
    this.carrierOscillator.connect(this.carrierGain);
    this.carrierGain.connect(this.masterGain);
    
    this.carrierOscillator.start();
    this.modulatorOscillator.start();
    
    this.harmonicOscillators.push(this.carrierOscillator, this.modulatorOscillator);
    this.harmonicGains.push(this.carrierGain, this.modulatorGain);
  }
  
  private add528HzHarmonic() {
    if (!this.audioContext || !this.masterGain) return;
    
    const harmonicOsc = this.audioContext.createOscillator();
    harmonicOsc.type = 'sine';
    harmonicOsc.frequency.value = 528;
    
    const harmonicGain = this.audioContext.createGain();
    harmonicGain.gain.value = this.baseVolume * 0.4;
    
    harmonicOsc.connect(harmonicGain);
    harmonicGain.connect(this.masterGain);
    
    harmonicOsc.start();
    
    this.harmonicOscillators.push(harmonicOsc);
    this.harmonicGains.push(harmonicGain);
  }
  
  private add432HzAmbientPad() {
    if (!this.audioContext || !this.masterGain) return;
    
    this.ambientPad = this.audioContext.createOscillator();
    this.ambientPad.type = 'sine';
    this.ambientPad.frequency.value = 432;
    
    this.ambientGain = this.audioContext.createGain();
    this.ambientGain.gain.value = this.baseVolume * 0.25;
    
    const modulator = this.audioContext.createOscillator();
    const modulatorGain = this.audioContext.createGain();
    
    modulator.frequency.value = 0.1;
    modulatorGain.gain.value = 5;
    
    modulator.connect(modulatorGain);
    modulatorGain.connect(this.ambientPad.detune);
    
    this.ambientPad.connect(this.ambientGain);
    this.ambientGain.connect(this.masterGain);
    
    this.ambientPad.start();
    modulator.start();
    
    this.harmonicOscillators.push(modulator);
  }
  
  private createBreathLayer() {
    if (!this.audioContext || !this.masterGain) return;
    
    const bufferSize = 2 * this.audioContext.sampleRate;
    const noiseBuffer = this.audioContext.createBuffer(1, bufferSize, this.audioContext.sampleRate);
    const output = noiseBuffer.getChannelData(0);
    
    for (let i = 0; i < bufferSize; i++) {
      const breathRate = 0.05;
      const breathDepth = 0.7;
      
      const breathPattern = Math.sin(i * breathRate / this.audioContext.sampleRate) * breathDepth + 0.3;
      output[i] = (Math.random() * 2 - 1) * breathPattern;
    }
    
    this.noiseGenerator = this.audioContext.createBufferSource();
    this.noiseGenerator.buffer = noiseBuffer;
    this.noiseGenerator.loop = true;
    
    this.noiseGain = this.audioContext.createGain();
    this.noiseGain.gain.value = this.baseVolume * 0.2;
    
    this.noiseGenerator.connect(this.noiseGain);
    this.noiseGain.connect(this.masterGain);
    
    this.noiseGenerator.start();
  }
  
  private createChirps() {
    if (!this.audioContext || !this.masterGain) return;
    
    const createChirp = () => {
      const chirpOsc = this.audioContext!.createOscillator();
      const chirpGain = this.audioContext!.createGain();
      
      chirpOsc.frequency.value = 2500;
      chirpGain.gain.value = 0;
      
      chirpOsc.connect(chirpGain);
      chirpGain.connect(this.masterGain!);
      
      const currentTime = this.audioContext!.currentTime;
      chirpOsc.start(currentTime);
      
      chirpOsc.frequency.setValueAtTime(2500, currentTime);
      chirpOsc.frequency.exponentialRampToValueAtTime(2700, currentTime + 0.1);
      chirpOsc.frequency.exponentialRampToValueAtTime(2450, currentTime + 0.2);
      
      chirpGain.gain.setValueAtTime(0, currentTime);
      chirpGain.gain.linearRampToValueAtTime(this.baseVolume * 0.3, currentTime + 0.05);
      chirpGain.gain.linearRampToValueAtTime(0, currentTime + 0.3);
      
      setTimeout(() => {
        chirpOsc.stop();
        chirpOsc.disconnect();
        chirpGain.disconnect();
      }, 300);
    };
    
    createChirp();
    this.chirpInterval = window.setInterval(createChirp, 10000);
  }
  
  private addUltrasonicPing() {
    if (!this.audioContext || !this.masterGain) return;
    
    const createUltrasonicPing = () => {
      const ultrasonicOsc = this.audioContext!.createOscillator();
      const ultrasonicGain = this.audioContext!.createGain();
      
      ultrasonicOsc.type = 'sine';
      ultrasonicOsc.frequency.value = 17000;
      ultrasonicGain.gain.value = 0;
      
      ultrasonicOsc.connect(ultrasonicGain);
      ultrasonicGain.connect(this.masterGain!);
      
      const currentTime = this.audioContext!.currentTime;
      ultrasonicOsc.start(currentTime);
      ultrasonicGain.gain.setValueAtTime(0, currentTime);
      ultrasonicGain.gain.linearRampToValueAtTime(this.baseVolume * 0.15, currentTime + 0.01);
      ultrasonicGain.gain.linearRampToValueAtTime(0, currentTime + 0.15);
      
      setTimeout(() => {
        ultrasonicOsc.stop();
        ultrasonicOsc.disconnect();
        ultrasonicGain.disconnect();
      }, 200);
    };
    
    createUltrasonicPing();
    this.ultrasonicInterval = window.setInterval(createUltrasonicPing, 5000);
  }
  
  stop() {
    if (this.isPlaying) {
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
      
      if (this.carrierOscillator) {
        this.carrierOscillator.stop();
        this.carrierOscillator.disconnect();
        this.carrierOscillator = null;
      }
      
      if (this.modulatorOscillator) {
        this.modulatorOscillator.stop();
        this.modulatorOscillator.disconnect();
        this.modulatorOscillator = null;
      }
      
      if (this.modulatorGain) {
        this.modulatorGain.disconnect();
        this.modulatorGain = null;
      }
      
      if (this.carrierGain) {
        this.carrierGain.disconnect();
        this.carrierGain = null;
      }
      
      if (this.ambientPad) {
        this.ambientPad.stop();
        this.ambientPad.disconnect();
        this.ambientPad = null;
      }
      
      if (this.ambientGain) {
        this.ambientGain.disconnect();
        this.ambientGain = null;
      }
      
      this.harmonicOscillators.forEach(osc => {
        osc.stop();
        osc.disconnect();
      });
      this.harmonicOscillators = [];
      
      this.harmonicGains.forEach(gain => {
        gain.disconnect();
      });
      this.harmonicGains = [];
      
      if (this.noiseGenerator) {
        this.noiseGenerator.stop();
        this.noiseGenerator.disconnect();
        this.noiseGenerator = null;
      }
      
      if (this.noiseGain) {
        this.noiseGain.disconnect();
        this.noiseGain = null;
      }
      
      if (this.chirpInterval) {
        clearInterval(this.chirpInterval);
        this.chirpInterval = null;
      }
      
      if (this.ultrasonicInterval) {
        clearInterval(this.ultrasonicInterval);
        this.ultrasonicInterval = null;
      }
      
      this.isPlaying = false;
    }
  }
  
  setVolume(volume: number) {
    this.baseVolume = volume;
    if (this.masterGain) {
      this.masterGain.gain.value = volume;
    }
    
    if (this.noiseGain) {
      this.noiseGain.gain.value = volume * 0.2;
    }
  }
  
  getIsPlaying() {
    return this.isPlaying;
  }
  
  getCurrentPreset() {
    return this.currentPreset;
  }
  
  setBaseFrequency(frequency: number) {
    this.baseFrequency = frequency;
    if (this.leftOscillator) {
      this.leftOscillator.frequency.value = frequency;
    }
    if (this.rightOscillator) {
      this.rightOscillator.frequency.value = frequency + this.beatFrequency;
    }
  }
  
  setBeatFrequency(frequency: number) {
    this.beatFrequency = frequency;
    if (this.rightOscillator && this.leftOscillator) {
      this.rightOscillator.frequency.value = this.baseFrequency + frequency;
    }
  }
  
  getBaseFrequency() {
    return this.baseFrequency;
  }
  
  getBeatFrequency() {
    return this.beatFrequency;
  }
  
  suspend() {
    if (this.audioContext && this.audioContext.state === 'running') {
      this.audioContext.suspend();
    }
  }
  
  resume() {
    if (this.audioContext && this.audioContext.state === 'suspended') {
      this.audioContext.resume();
    }
  }
  
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

const audioEngine = new BinauralBeatGenerator();
export default audioEngine;
