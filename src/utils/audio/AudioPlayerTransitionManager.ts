
import { AudioPlayerState } from './AudioPlayerState';

/**
 * Class that manages transitions between audio states
 */
export class AudioPlayerTransitionManager {
  private state: AudioPlayerState;
  
  constructor(state: AudioPlayerState) {
    this.state = state;
  }

  /**
   * Start a transition to playing state
   */
  public beginStart(): boolean {
    // Prevent multiple simultaneous starts
    if (this.state.startInProgress) {
      console.warn('Start operation already in progress, skipping');
      return false;
    }
    
    this.state.startInProgress = true;
    return true;
  }
  
  /**
   * Complete a transition to playing state
   */
  public completeStart(): void {
    this.state.startInProgress = false;
  }
  
  /**
   * Cancel any pending delayed starts
   */
  public cancelDelayedStart(): void {
    if (this.state.delayedStartTimeoutId !== null) {
      window.clearTimeout(this.state.delayedStartTimeoutId);
      this.state.delayedStartTimeoutId = null;
    }
  }
  
  /**
   * Begin a transition to stopped state
   */
  public beginStop(callback?: () => void): boolean {
    // Store callback if provided
    if (callback) {
      this.state.stopCompleteCallback = callback;
    }
    
    // If already in the process of stopping, don't do it again
    if (this.state.stopInProgress) {
      console.warn('Stop operation already in progress, skipping');
      return false;
    }
    
    this.state.stopInProgress = true;
    return true;
  }
  
  /**
   * Complete a transition to stopped state and execute callback
   */
  public completeStop(): void {
    this.state.stopInProgress = false;
    
    // Execute callback if exists
    if (this.state.stopCompleteCallback) {
      this.state.stopCompleteCallback();
      this.state.stopCompleteCallback = null;
    }
  }
  
  /**
   * Schedule completing the stop operation after a delay
   */
  public scheduleStopCompletion(delayMs: number = 300): void {
    setTimeout(() => this.completeStop(), delayMs);
  }
}
