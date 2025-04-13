
import { AudioContextManager } from './AudioContextManager';
import { AudioPlayer } from './AudioPlayer';
import { IAudioContextManager, IAudioPlayer } from './types';

/**
 * Facade class that combines AudioContextManager and AudioPlayer
 * to provide a simpler interface to the rest of the application
 */
class BinauralBeatGenerator implements IAudioContextManager, IAudioPlayer {
  private contextManager: AudioContextManager;
  private player: AudioPlayer;
  private isInitialized = false;

  constructor() {
    this.contextManager = new AudioContextManager();
    this.player = new AudioPlayer(this.contextManager);
  }

  /**
   * Initialize the audio context
   */
  public initialize(): boolean {
    const result = this.contextManager.initialize();
    this.isInitialized = result;
    return result;
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
   * Start audio playback
   */
  public start(baseFreq: number, beatFreq: number, volume: number = 0.5, preset: string = 'custom'): void {
    if (!this.isInitialized) {
      if (!this.initialize()) {
        return;
      }
    }
    this.player.start(baseFreq, beatFreq, volume, preset);
  }

  /**
   * Stop audio playback
   */
  public stop(): void {
    this.player.stop();
  }

  /**
   * Set volume
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
   * Suspend audio context
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
    this.isInitialized = false;
  }
}

// Create and export singleton instance
const audioEngine = new BinauralBeatGenerator();
export default audioEngine;
