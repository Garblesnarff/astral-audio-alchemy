
import { IAudioPlayer, AudioEffectOptions } from './types';
import { AudioContextManager } from './AudioContextManager';
import { BinauralOscillator } from './BinauralOscillator';
import { AlienEffect } from './AlienEffect';
import { AudioPlayerState } from './AudioPlayerState';
import { AudioPlayerTransitionManager } from './AudioPlayerTransitionManager';

/**
 * Class that handles audio playback
 */
export class AudioPlayer implements IAudioPlayer {
  private contextManager: AudioContextManager;
  private binauralOscillator: BinauralOscillator | null = null;
  private alienEffect: AlienEffect | null = null;
  private state: AudioPlayerState;
  private transitionManager: AudioPlayerTransitionManager;

  constructor(contextManager: AudioContextManager) {
    this.contextManager = contextManager;
    this.state = new AudioPlayerState();
    this.transitionManager = new AudioPlayerTransitionManager(this.state);
  }

  /**
   * Start audio playback with the specified parameters
   */
  public start(baseFreq: number, beatFreq: number, volume: number = 0.5, preset: string = 'custom'): void {
    const audioContext = this.contextManager.getAudioContext();
    const analyser = this.contextManager.getAnalyser();
    
    if (!audioContext || !analyser) {
      console.error('Audio context not initialized');
      return;
    }
    
    // Begin start transition
    if (!this.transitionManager.beginStart()) {
      return;
    }
    
    console.log(`Starting with preset: ${preset}, baseFreq: ${baseFreq}, beatFreq: ${beatFreq}, volume: ${volume}`);
    
    // Cancel any pending delayed starts
    this.transitionManager.cancelDelayedStart();
    
    // Make sure all previous audio is fully stopped
    this.stop(() => {
      // This callback will be executed after stop operation is fully completed
      
      console.log(`Stop operation completed, now starting ${preset} preset`);
      
      this.state.isPlaying = true;
      this.state.currentPreset = preset;
      this.state.baseFrequency = baseFreq;
      this.state.beatFrequency = beatFreq;
      this.state.volume = volume;

      // Set master volume
      this.contextManager.setMasterVolume(volume);

      // Create options object
      const options: AudioEffectOptions = {
        baseFrequency: baseFreq,
        beatFrequency: beatFreq,
        volume
      };

      // Initialize and set up the binaural oscillator
      this.binauralOscillator = new BinauralOscillator(audioContext, analyser);
      this.binauralOscillator.setup(options);
      
      // For the alien summoning preset, add the special effects
      if (preset === 'alien') {
        console.log("Setting up alien effects");
        this.alienEffect = new AlienEffect(audioContext, analyser);
        this.alienEffect.setup(options);
      }
      
      this.transitionManager.completeStart();
      
      console.log(`${preset} preset started successfully`);
    });
  }
  
  /**
   * Stop all audio
   */
  public stop(callback?: () => void): void {
    console.log("Stopping all audio. Current preset:", this.state.currentPreset);
    
    // Begin stop transition
    if (!this.transitionManager.beginStop(callback)) {
      return;
    }
    
    // Record if we need to clean up the alien effect
    const hadAlienEffect = this.alienEffect !== null;
    
    if (this.state.isPlaying) {
      // Stop binaural oscillator
      if (this.binauralOscillator) {
        try {
          this.binauralOscillator.stop();
        } catch (e) {
          console.warn("Error stopping binaural oscillator:", e);
        }
        this.binauralOscillator = null;
      }
      
      // Stop alien effects
      if (this.alienEffect) {
        try {
          this.alienEffect.stop();
        } catch (e) {
          console.warn("Error stopping alien effect:", e);
        }
        this.alienEffect = null;
      }
      
      this.state.reset();
    }
    
    // Set a timeout to verify cleanup was successful and execute callback
    setTimeout(() => {
      // Double check the alien effect was cleared, especially important
      if (hadAlienEffect && this.alienEffect !== null) {
        console.warn("AlienEffect still exists after cleanup timeout, forcing cleanup");
        try {
          this.alienEffect.stop();
        } catch (e) {
          console.error("Error during forced alien effect cleanup:", e);
        }
        this.alienEffect = null;
      }
      
      this.transitionManager.completeStop();
      
      console.log("Audio stop operation completed successfully");
    }, 300); // Reduced from 500ms to 300ms for faster transitions
  }
  
  /**
   * Set volume for all active gain nodes
   */
  public setVolume(volume: number): void {
    console.log(`Setting volume to ${volume}, current preset: ${this.state.currentPreset}`);
    
    this.state.volume = volume;
    
    // Update master gain volume
    this.contextManager.setMasterVolume(volume);
    
    // Update binaural oscillator volume
    if (this.binauralOscillator) {
      this.binauralOscillator.updateVolume(volume);
    }
    
    // Update alien effects volume
    if (this.alienEffect) {
      this.alienEffect.updateVolume(volume);
    }
  }
  
  /**
   * Check if currently playing
   */
  public getIsPlaying(): boolean {
    return this.state.isPlaying;
  }
  
  /**
   * Get current preset
   */
  public getCurrentPreset(): string {
    return this.state.currentPreset;
  }
  
  /**
   * Set base frequency
   */
  public setBaseFrequency(frequency: number): void {
    this.state.baseFrequency = frequency;
    if (this.binauralOscillator) {
      this.binauralOscillator.setBaseFrequency(frequency);
    }
  }
  
  /**
   * Set beat frequency
   */
  public setBeatFrequency(frequency: number): void {
    this.state.beatFrequency = frequency;
    if (this.binauralOscillator) {
      this.binauralOscillator.setBeatFrequency(frequency);
    }
  }
  
  /**
   * Get current base frequency
   */
  public getBaseFrequency(): number {
    return this.state.baseFrequency;
  }
  
  /**
   * Get current beat frequency
   */
  public getBeatFrequency(): number {
    return this.state.beatFrequency;
  }
}
