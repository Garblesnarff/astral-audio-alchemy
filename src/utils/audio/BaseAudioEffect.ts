
import { isOscillatorNode, isAudioBufferSourceNode } from './types';

/**
 * Base class for audio effects
 */
export abstract class BaseAudioEffect {
  protected audioContext: AudioContext | null = null;
  protected activeNodes: AudioNode[] = [];
  protected activeTimeouts: number[] = [];
  protected activeIntervals: number[] = [];
  protected isPlaying = false;
  protected masterGain: GainNode | null = null;
  protected analyser: AnalyserNode | null;

  constructor(audioContext: AudioContext | null, analyser: AnalyserNode | null) {
    this.audioContext = audioContext;
    this.analyser = analyser;
    
    // Create master gain node for this effect
    if (this.audioContext && this.analyser) {
      this.masterGain = this.registerNode(this.audioContext.createGain());
      this.masterGain.gain.value = 1;
      this.masterGain.connect(this.analyser);
    }
  }

  /**
   * Register an audio node for tracking (for cleanup)
   */
  protected registerNode<T extends AudioNode>(node: T): T {
    this.activeNodes.push(node);
    return node;
  }
  
  /**
   * Register a timeout ID for cleanup
   */
  protected registerTimeout(timeoutId: number): number {
    this.activeTimeouts.push(timeoutId);
    return timeoutId;
  }
  
  /**
   * Register an interval ID for cleanup
   */
  protected registerInterval(intervalId: number): number {
    this.activeIntervals.push(intervalId);
    return intervalId;
  }

  /**
   * Clean up all audio nodes and timers
   */
  public cleanup(): void {
    console.log(`${this.constructor.name}: Cleaning up ${this.activeNodes.length} audio nodes`);
    
    // Clear all timeouts
    this.activeTimeouts.forEach(id => {
      window.clearTimeout(id);
    });
    this.activeTimeouts = [];
    
    // Clear all intervals
    this.activeIntervals.forEach(id => {
      window.clearInterval(id);
    });
    this.activeIntervals = [];
    
    // Stop and disconnect all nodes
    for (const node of [...this.activeNodes]) {
      try {
        // Check node type and handle accordingly
        if (isOscillatorNode(node)) {
          try {
            node.stop();
          } catch (e) {
            console.warn("Error stopping oscillator during cleanup:", e);
          }
        } else if (isAudioBufferSourceNode(node)) {
          try {
            node.stop();
          } catch (e) {
            console.warn("Error stopping audio buffer source during cleanup:", e);
          }
        }
        
        // Disconnect all nodes
        node.disconnect();
      } catch (e) {
        console.warn(`Error during cleanup of node in ${this.constructor.name}:`, e);
      }
    }
    
    // Clear the active nodes array
    this.activeNodes = [];
    this.isPlaying = false;
  }
  
  /**
   * Helper to safely stop oscillator nodes
   */
  protected stopOscillator(osc: OscillatorNode | null): void {
    if (osc) {
      try {
        osc.stop();
        osc.disconnect();
      } catch (e) {
        console.warn("Error stopping oscillator:", e);
      }
    }
  }
  
  /**
   * Helper to safely disconnect nodes
   */
  protected disconnectNode(node: AudioNode | null): void {
    if (node) {
      try {
        node.disconnect();
      } catch (e) {
        console.warn("Error disconnecting node:", e);
      }
    }
  }
  
  /**
   * Get playing status
   */
  public getIsPlaying(): boolean {
    return this.isPlaying;
  }
  
  /**
   * Update volume of the effect
   */
  public updateVolume(volume: number): void {
    if (this.masterGain) {
      this.masterGain.gain.value = volume;
    }
  }
  
  /**
   * Stop the effect - must be implemented by subclasses
   */
  public abstract stop(): void;
}
