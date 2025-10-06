
interface CustomWindow extends Window {
  webkitAudioContext?: typeof AudioContext;
}

// Base class for the audio engine with core functionality
export class AudioEngineBase {
  protected audioContext: AudioContext | null = null;
  protected analyser: AnalyserNode | null = null;
  protected masterGain: GainNode | null = null;
  private ambientNodes: Map<string, { source: AudioBufferSourceNode, gain: GainNode }> = new Map();
  protected isPlaying = false;
  protected baseFrequency = 200;
  protected beatFrequency = 10;
  protected baseVolume = 0.5;
  protected currentPreset = '';

  // Initialize the audio context
  initialize() {
    try {
      const CustomAudioContext = (window as CustomWindow).AudioContext || (window as CustomWindow).webkitAudioContext;
      if (!CustomAudioContext) {
        throw new Error('Web Audio API is not supported in this browser');
      }
      this.audioContext = new CustomAudioContext();
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

  getIsPlaying() {
    return this.isPlaying;
  }
  
  getCurrentPreset() {
    return this.currentPreset;
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

  stop() {
    // This will be implemented by subclasses
    this.isPlaying = false;
  }

  setVolume(volume: number) {
    this.baseVolume = volume;
    if (this.masterGain) {
      this.masterGain.gain.value = volume;
    }
  }
  
  // Default implementation that can be overridden by subclasses
  enableRealityCheck(_intervalMinutes: number = 15) {
    // This will be implemented by LucidDreamingPreset
  }
  
  disableRealityCheck() {
    // This will be implemented by LucidDreamingPreset
  }
  
  startWBTBTimer(_wakeUpAfterMinutes: number) {
    // This will be implemented by LucidDreamingPreset
  }
  
  cancelWBTB() {
    // This will be implemented by LucidDreamingPreset
  }
  
  setBaseFrequency(frequency: number) {
    this.baseFrequency = frequency;
  }
  
  setBeatFrequency(frequency: number) {
    this.beatFrequency = frequency;
  }
  
  start(_baseFreq: number, _beatFreq: number, _volume: number = 0.5, _preset: string = 'custom') {
    // This will be implemented by subclasses
  }

  // Ambient sound methods
  async playAmbientSound(soundId: string, url: string, volume: number) {
    if (!this.audioContext) return;
    if (this.ambientNodes.has(soundId)) return;

    try {
      const response = await fetch(url);
      const arrayBuffer = await response.arrayBuffer();
      const audioBuffer = await this.audioContext.decodeAudioData(arrayBuffer);

      const source = this.audioContext.createBufferSource();
      source.buffer = audioBuffer;
      source.loop = true;

      const gain = this.audioContext.createGain();
      gain.gain.value = volume;

      source.connect(gain);
      gain.connect(this.audioContext.destination);

      source.start(0);
      this.ambientNodes.set(soundId, { source, gain });
    } catch (error) {
      console.error(`Error playing ambient sound ${soundId}:`, error);
    }
  }

  stopAmbientSound(soundId: string) {
    if (this.ambientNodes.has(soundId)) {
      const { source, gain } = this.ambientNodes.get(soundId)!;
      source.stop(0);
      source.disconnect();
      gain.disconnect();
      this.ambientNodes.delete(soundId);
    }
  }

  setAmbientVolume(soundId: string, volume: number) {
    if (this.ambientNodes.has(soundId)) {
      const { gain } = this.ambientNodes.get(soundId)!;
      // Use setTargetAtTime for smoother volume changes
      gain.gain.setTargetAtTime(volume, this.audioContext!.currentTime, 0.01);
    }
  }
}
