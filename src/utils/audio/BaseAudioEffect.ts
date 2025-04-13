
import { isOscillatorNode, isGainNode, isAudioBufferSourceNode } from './types';

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
    
    // Iterate through all active nodes and disconnect/stop them
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
        console.warn("Error during cleanup of node:", e);
      }
    }
    
    // Clear the active nodes array
    this.activeNodes = [];
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
