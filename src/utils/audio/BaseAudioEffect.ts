
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
  protected cleanupTimeout: number | null = null;
  protected mainMasterGain: GainNode | null = null;

  constructor(audioContext: AudioContext | null, analyser: AnalyserNode | null, mainMasterGain: GainNode | null = null) {
    this.audioContext = audioContext;
    this.analyser = analyser;
    this.mainMasterGain = mainMasterGain;
    
    // Create master gain node for this effect
    if (this.audioContext) {
      this.masterGain = this.registerNode(this.audioContext.createGain());
      this.masterGain.gain.value = 1;
      
      // Connect to the main master gain from AudioContextManager
      if (this.mainMasterGain) {
        console.log(`${this.constructor.name}: Connecting effect masterGain to AudioContextManager masterGain`);
        this.masterGain.connect(this.mainMasterGain);
      } else {
        console.error(`${this.constructor.name}: Main masterGain not provided, audio routing incomplete!`);
      }
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
    console.log(`${this.constructor.name}: Cleaning up ${this.activeNodes.length} audio nodes, ${this.activeTimeouts.length} timeouts, ${this.activeIntervals.length} intervals`);
    
    // Clear all timeouts
    this.activeTimeouts.forEach(id => {
      try {
        window.clearTimeout(id);
      } catch (e) {
        console.warn("Error clearing timeout:", e);
      }
    });
    this.activeTimeouts = [];
    
    // Clear all intervals
    this.activeIntervals.forEach(id => {
      try {
        window.clearInterval(id);
      } catch (e) {
        console.warn("Error clearing interval:", e);
      }
    });
    this.activeIntervals = [];
    
    // Stop and disconnect all nodes
    const nodesToCleanup = [...this.activeNodes]; // Create a copy because we'll be modifying the array
    this.activeNodes = []; // Clear immediately to prevent double-cleanup issues
    
    for (const node of nodesToCleanup) {
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
        try {
          node.disconnect();
        } catch (e) {
          console.warn(`Error disconnecting node in ${this.constructor.name}:`, e);
        }
      } catch (e) {
        console.warn(`Error during cleanup of node in ${this.constructor.name}:`, e);
      }
    }
    
    // Cancel any pending cleanup timeout
    if (this.cleanupTimeout) {
      window.clearTimeout(this.cleanupTimeout);
      this.cleanupTimeout = null;
    }
    
    this.isPlaying = false;
  }
  
  /**
   * Schedule a final cleanup after a delay
   * This helps catch any nodes that might have been missed
   */
  protected scheduleDelayedCleanup(delayMs: number = 500): void {
    if (this.cleanupTimeout) {
      window.clearTimeout(this.cleanupTimeout);
    }
    
    this.cleanupTimeout = window.setTimeout(() => {
      console.log(`${this.constructor.name}: Running delayed cleanup check`);
      if (this.activeNodes.length > 0 || this.activeTimeouts.length > 0 || this.activeIntervals.length > 0) {
        console.warn(`${this.constructor.name}: Found leftover nodes/timers in delayed cleanup, cleaning up now`);
        this.cleanup();
      }
      this.cleanupTimeout = null;
    }, delayMs);
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
      console.log(`${this.constructor.name}: Volume updated to ${volume}`);
    }
  }
  
  /**
   * Stop the effect - must be implemented by subclasses
   */
  public abstract stop(): void;
}
