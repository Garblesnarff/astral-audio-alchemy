
import { AudioEngineBase } from '../AudioEngineBase';

/**
 * Base class for Remote Viewing functionality
 */
export class RemoteViewingBase extends AudioEngineBase {
  protected leftGain: GainNode | null = null;
  protected rightGain: GainNode | null = null;
  protected volume: number = 0.5;
  protected currentProtocol: string = 'crv'; // Default to Coordinate Remote Viewing
  
  constructor() {
    super();
    this.currentPreset = 'remote-theta-delta';
  }
  
  /**
   * Initialize the audio context
   */
  override initialize(): boolean {
    const result = super.initialize();
    
    if (result && this.audioContext) {
      // Create gain nodes for left and right channels
      this.leftGain = this.audioContext.createGain();
      this.rightGain = this.audioContext.createGain();
      
      // Create master gain node
      this.masterGain = this.audioContext.createGain();
      
      // Connect the channel gains to the master gain
      this.leftGain.connect(this.masterGain);
      this.rightGain.connect(this.masterGain);
      
      // Connect master gain to the analyser
      if (this.analyser) {
        this.masterGain.connect(this.analyser);
      }
      
      return true;
    }
    
    return false;
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
}
