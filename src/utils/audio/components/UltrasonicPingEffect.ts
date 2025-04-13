
import { BaseAudioEffect } from '../BaseAudioEffect';
import { AudioEffectOptions, IAudioEffectComponent } from '../types';

/**
 * Component that creates ultrasonic pings at 17 kHz
 */
export class UltrasonicPingEffect extends BaseAudioEffect implements IAudioEffectComponent {
  private ultrasonicOscillator: OscillatorNode | null = null;
  private ultrasonicGain: GainNode | null = null;

  /**
   * Set up the ultrasonic ping effect
   */
  public setup(options: AudioEffectOptions): void {
    if (!this.audioContext || !this.masterGain) return;
    
    // 17 kHz ultrasonic ping (subtle, for "NHI tech-detection")
    // Note: Many people won't hear this, and many devices can't reproduce it
    this.ultrasonicOscillator = this.registerNode(this.audioContext.createOscillator());
    this.ultrasonicOscillator.frequency.value = 17000; // 17 kHz
    this.ultrasonicGain = this.registerNode(this.audioContext.createGain());
    this.ultrasonicGain.gain.value = options.volume * 0.05; // Very subtle
    
    // Connect ultrasonic oscillator
    this.ultrasonicOscillator.connect(this.ultrasonicGain);
    this.ultrasonicGain.connect(this.masterGain);
    this.ultrasonicOscillator.start();
    
    this.isPlaying = true;
  }
  
  /**
   * Update volume of the ultrasonic ping
   */
  public updateVolume(volume: number): void {
    if (this.ultrasonicGain) {
      this.ultrasonicGain.gain.value = volume * 0.05;
    }
  }
  
  /**
   * Stop the ultrasonic ping effect
   */
  public stop(): void {
    this.cleanup();
    
    this.ultrasonicOscillator = null;
    this.ultrasonicGain = null;
    
    this.isPlaying = false;
  }
}
