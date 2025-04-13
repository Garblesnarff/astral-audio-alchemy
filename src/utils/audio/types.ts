
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
