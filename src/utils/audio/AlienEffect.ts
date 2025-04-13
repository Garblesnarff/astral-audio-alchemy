
import { BaseAudioEffect } from './BaseAudioEffect';
import { AudioEffectOptions, IAudioEffectComponent } from './types';

// Import effect components
import { SchumannResonanceEffect } from './components/SchumannResonanceEffect';
import { HarmonicToneEffect } from './components/HarmonicToneEffect';
import { AmbientPadEffect } from './components/AmbientPadEffect';
import { UltrasonicPingEffect } from './components/UltrasonicPingEffect';
import { BreathEffect } from './components/BreathEffect';
import { ChirpEffect } from './components/ChirpEffect';

/**
 * Class that handles the alien soundscape effects
 * Coordinates multiple audio effect components
 */
export class AlienEffect extends BaseAudioEffect {
  private effectComponents: IAudioEffectComponent[] = [];
  private volume: number = 0.5;
  
  /**
   * Set up all the alien effects
   */
  public setup(options: AudioEffectOptions): void {
    if (!this.audioContext || !this.analyser || !this.masterGain) return;
    
    // Make sure we're starting clean
    this.stop();
    
    console.log("Setting up alien effect with volume", options.volume);
    this.volume = options.volume;
    this.isPlaying = true;
    
    // Initialize all effect components
    this.effectComponents = [
      new SchumannResonanceEffect(this.audioContext, this.analyser),
      new HarmonicToneEffect(this.audioContext, this.analyser),
      new AmbientPadEffect(this.audioContext, this.analyser),
      new UltrasonicPingEffect(this.audioContext, this.analyser),
      new BreathEffect(this.audioContext, this.analyser),
      new ChirpEffect(this.audioContext, this.analyser)
    ];
    
    // Set up each component
    this.effectComponents.forEach(component => {
      component.setup(options);
    });
  }
  
  /**
   * Update volume of all components
   */
  public override updateVolume(volume: number): void {
    console.log("AlienEffect: updating volume to", volume);
    this.volume = volume;
    
    // Update master gain first (from parent class)
    super.updateVolume(volume);
    
    // Update individual component volumes
    this.effectComponents.forEach(component => {
      component.updateVolume(volume);
    });
  }
  
  /**
   * Stop all alien effects
   */
  public stop(): void {
    console.log("Stopping all alien effects");
    
    // Stop all components
    this.effectComponents.forEach(component => {
      component.stop();
    });
    
    // Clean up all nodes and timers using the parent class method
    this.cleanup();
    
    // Clear components list
    this.effectComponents = [];
    
    this.isPlaying = false;
  }
}
