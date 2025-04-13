
// Export the singleton instance as the default export
import audioEngine from './audioEngine';
export default audioEngine;

// Also export types and classes for use elsewhere
export { BinauralBeatGenerator } from './BinauralBeatGenerator';
export type { AudioEffectOptions } from './types';
