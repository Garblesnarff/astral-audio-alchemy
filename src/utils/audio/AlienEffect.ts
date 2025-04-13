
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
  private safetyTimer: number | null = null;
  
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
    
    // Setup a safety timer to ensure cleanup even if stop() is never called
    // This is an extra safeguard
    this.safetyTimer = window.setTimeout(() => {
      console.warn("AlienEffect: Safety timer triggered, performing cleanup");
      this.stop();
    }, 60 * 60 * 1000); // 1 hour max
    
    this.registerTimeout(this.safetyTimer);
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
    
    // Stop all components first
    const componentsList = [...this.effectComponents]; // Create a copy
    this.effectComponents = []; // Clear the list first to prevent recursive cleanup issues
    
    // Stop each component individually
    componentsList.forEach(component => {
      try {
        component.stop();
      } catch (e) {
        console.warn("Error stopping alien effect component:", e);
      }
    });
    
    // Clear the safety timer if it exists
    if (this.safetyTimer) {
      clearTimeout(this.safetyTimer);
      this.safetyTimer = null;
    }
    
    // Clean up all nodes and timers using the parent class method
    this.cleanup();
    
    // Schedule a delayed final cleanup to catch any missed nodes
    this.scheduleDelayedCleanup();
    
    this.isPlaying = false;
  }
}
