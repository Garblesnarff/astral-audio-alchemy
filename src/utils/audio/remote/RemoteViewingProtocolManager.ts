
import { sessionProgressionGenerator } from './sessionProgressionGenerator';

/**
 * Manages protocol-specific functionality for remote viewing
 */
export class RemoteViewingProtocolManager {
  private currentProtocol: string = 'crv'; // Default to Coordinate Remote Viewing
  private sessionProgressionNodes: AudioNode[] = [];
  private audioContext: AudioContext | null = null;
  private masterGain: GainNode | null = null;

  /**
   * Initialize the protocol manager
   */
  initialize(audioContext: AudioContext, masterGain: GainNode): void {
    this.audioContext = audioContext;
    this.masterGain = masterGain;
  }

  /**
   * Start a specific protocol
   */
  startProtocol(protocol: string): AudioNode[] {
    if (!this.audioContext || !this.masterGain) {
      return [];
    }

    // Clean up any existing nodes
    this.stopProtocol();
    
    // Set the current protocol
    this.currentProtocol = protocol;
    
    // Generate session progression based on the protocol
    this.sessionProgressionNodes = sessionProgressionGenerator(
      this.audioContext,
      this.masterGain,
      protocol
    );
    
    return this.sessionProgressionNodes;
  }

  /**
   * Stop the current protocol
   */
  stopProtocol(): void {
    // Stop session progression
    this.sessionProgressionNodes.forEach(node => {
      if (node instanceof OscillatorNode) {
        node.stop();
      }
    });
    this.sessionProgressionNodes = [];
  }

  /**
   * Get current protocol
   */
  getCurrentProtocol(): string {
    return this.currentProtocol;
  }
  
  /**
   * Set current protocol
   */
  setProtocol(protocol: 'crv' | 'erv' | 'arv'): void {
    this.currentProtocol = protocol;
  }

  /**
   * Clean up resources
   */
  cleanup(): void {
    this.stopProtocol();
  }
}
