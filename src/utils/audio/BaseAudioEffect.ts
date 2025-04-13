
import { isOscillatorNode } from './types';

/**
 * Base class for audio effects that handles common functionality
 */
export abstract class BaseAudioEffect {
  protected audioContext: AudioContext | null = null;
  protected activeNodes: AudioNode[] = [];
  protected isPlaying = false;
  
  constructor(audioContext: AudioContext | null) {
    this.audioContext = audioContext;
  }
  
  /**
   * Register an audio node for tracking (for cleanup)
   */
  protected registerNode<T extends AudioNode>(node: T): T {
    this.activeNodes.push(node);
    return node;
  }
  
  /**
   * Helper method to safely stop oscillators
   */
  protected stopOscillator(osc: OscillatorNode | null) {
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
   * Helper method to safely disconnect nodes
   */
  protected disconnectNode(node: AudioNode | null) {
    if (node) {
      try {
        node.disconnect();
      } catch (e) {
        console.warn("Error disconnecting node:", e);
      }
    }
  }
  
  /**
   * Clean up all active nodes
   */
  public cleanup() {
    console.log(`Cleaning up ${this.activeNodes.length} audio nodes`);
    
    while (this.activeNodes.length > 0) {
      const node = this.activeNodes.pop();
      if (node) {
        try {
          // Check if it's an oscillator
          if (isOscillatorNode(node)) {
            node.stop();
          }
          node.disconnect();
        } catch (e) {
          console.warn("Error during cleanup of node:", e);
        }
      }
    }
    
    this.isPlaying = false;
  }
  
  /**
   * Get playing status
   */
  public getIsPlaying(): boolean {
    return this.isPlaying;
  }
  
  /**
   * Abstract method that must be implemented by subclasses
   */
  public abstract stop(): void;
}
