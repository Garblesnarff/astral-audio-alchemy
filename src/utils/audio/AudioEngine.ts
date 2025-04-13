
import { AudioContextManager } from './AudioContextManager';
import { AudioPlayer } from './AudioPlayer';

/**
 * Main entry point for audio engine functionality
 * Creates and maintains the singleton instance of the audio engine
 */
class AudioEngine {
  private contextManager: AudioContextManager;
  private player: AudioPlayer;

  constructor() {
    this.contextManager = new AudioContextManager();
    this.player = new AudioPlayer(this.contextManager);
  }

  /**
   * Initialize the audio context
   */
  public initialize(): boolean {
    return this.contextManager.initialize();
  }

  /**
   * Get the audio context
   */
  public getAudioContext(): AudioContext | null {
    return this.contextManager.getAudioContext();
  }

  /**
   * Get the analyser node
   */
  public getAnalyser(): AnalyserNode | null {
    return this.contextManager.getAnalyser();
  }

  /**
   * Start audio playback with the specified parameters
   */
  public start(baseFreq: number, beatFreq: number, volume: number = 0.5, preset: string = 'custom'): void {
    this.player.start(baseFreq, beatFreq, volume, preset);
  }
  
  /**
   * Stop all audio
   */
  public stop(): void {
    this.player.stop();
  }
  
  /**
   * Set volume for all active gain nodes
   */
  public setVolume(volume: number): void {
    this.player.setVolume(volume);
  }
  
  /**
   * Check if currently playing
   */
  public getIsPlaying(): boolean {
    return this.player.getIsPlaying();
  }
  
  /**
   * Get current preset
   */
  public getCurrentPreset(): string {
    return this.player.getCurrentPreset();
  }
  
  /**
   * Set base frequency
   */
  public setBaseFrequency(frequency: number): void {
    this.player.setBaseFrequency(frequency);
  }
  
  /**
   * Set beat frequency
   */
  public setBeatFrequency(frequency: number): void {
    this.player.setBeatFrequency(frequency);
  }
  
  /**
   * Get current base frequency
   */
  public getBaseFrequency(): number {
    return this.player.getBaseFrequency();
  }
  
  /**
   * Get current beat frequency
   */
  public getBeatFrequency(): number {
    return this.player.getBeatFrequency();
  }
  
  /**
   * Suspend audio context (for battery saving)
   */
  public suspend(): void {
    this.contextManager.suspend();
  }
  
  /**
   * Resume audio context
   */
  public resume(): void {
    this.contextManager.resume();
  }
  
  /**
   * Clean up on component unmount
   */
  public cleanup(): void {
    this.player.stop();
    this.contextManager.cleanup();
  }
}

// Create and export singleton instance
const audioEngine = new AudioEngine();
export default audioEngine;
