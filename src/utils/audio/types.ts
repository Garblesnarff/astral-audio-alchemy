
// Common types used across the audio engine

export interface AudioEffectOptions {
  baseFrequency: number;
  beatFrequency: number;
  volume: number;
}

// Type guard to check if a node is an OscillatorNode
export function isOscillatorNode(node: AudioNode): node is OscillatorNode {
  return 'frequency' in node && 'type' in node;
}

// Type guard to check if a node is a GainNode
export function isGainNode(node: AudioNode): node is GainNode {
  return 'gain' in node;
}

// Type guard to check if a node is an AudioBufferSourceNode
export function isAudioBufferSourceNode(node: AudioNode): node is AudioBufferSourceNode {
  return 'buffer' in node && 'loop' in node;
}
