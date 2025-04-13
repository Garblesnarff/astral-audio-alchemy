
/**
 * Type guard for OscillatorNode
 */
export function isOscillatorNode(node: AudioNode): node is OscillatorNode {
  return 'frequency' in node && 'stop' in node;
}

/**
 * Type guard for GainNode
 */
export function isGainNode(node: AudioNode): node is GainNode {
  return 'gain' in node;
}

/**
 * Type guard for AudioBufferSourceNode
 */
export function isAudioBufferSourceNode(node: AudioNode): node is AudioBufferSourceNode {
  return 'buffer' in node && 'start' in node;
}

/**
 * Configuration options for audio effects
 */
export interface AudioEffectOptions {
  volume: number;
  baseFrequency: number;
  beatFrequency: number;
}

/**
 * Interface for audio effect components
 */
export interface IAudioEffectComponent {
  setup(options: AudioEffectOptions): void;
  updateVolume(volume: number): void;
  stop(): void;
}

/**
 * Interface for audio context manager
 */
export interface IAudioContextManager {
  initialize(): boolean;
  getAudioContext(): AudioContext | null;
  getAnalyser(): AnalyserNode | null;
  suspend(): void;
  resume(): void;
  cleanup(): void;
}

/**
 * Interface for audio player
 */
export interface IAudioPlayer {
  start(baseFreq: number, beatFreq: number, volume: number, preset?: string): void;
  stop(): void;
  setVolume(volume: number): void;
  getIsPlaying(): boolean;
  getCurrentPreset(): string;
  setBaseFrequency(frequency: number): void;
  setBeatFrequency(frequency: number): void;
  getBaseFrequency(): number;
  getBeatFrequency(): number;
}
