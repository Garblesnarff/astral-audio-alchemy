
import { AudioEngineBase } from '../AudioEngineBase';

export class LucidDreamingBase extends AudioEngineBase {
  protected leftOscillator: OscillatorNode | null = null;
  protected rightOscillator: OscillatorNode | null = null;
  protected leftGain: GainNode | null = null;
  protected rightGain: GainNode | null = null;
  
  stop() {
    if (this.isPlaying) {
      this.stopOscillator(this.leftOscillator);
      this.stopOscillator(this.rightOscillator);
      
      this.disconnectNode(this.leftGain);
      this.disconnectNode(this.rightGain);
      this.disconnectNode(this.masterGain);
      
      this.leftOscillator = null;
      this.rightOscillator = null;
      this.leftGain = null;
      this.rightGain = null;
      
      this.isPlaying = false;
    }
  }
  
  protected stopOscillator(oscillator: OscillatorNode | null) {
    if (oscillator) {
      oscillator.stop();
      oscillator.disconnect();
    }
  }
  
  protected disconnectNode(node: AudioNode | null) {
    if (node) {
      node.disconnect();
    }
  }
}
