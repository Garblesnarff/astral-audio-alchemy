
/**
 * Handles target focus timer functionality for remote viewing sessions
 */
export class TargetFocusTimer {
  private targetTimerInterval: number | null = null;
  
  /**
   * Start target focus timer
   */
  startTargetFocus(
    config: {
      countdownSeconds: number;
      focusSeconds: number;
      reportingSeconds: number;
      integrationSeconds: number;
      clearingSeconds: number;
    },
    onComplete: () => void
  ): void {
    // Clear any existing timer
    if (this.targetTimerInterval) {
      clearInterval(this.targetTimerInterval);
      this.targetTimerInterval = null;
    }
    
    // Calculate total duration
    const totalDuration = 
      config.countdownSeconds + 
      config.focusSeconds + 
      config.reportingSeconds + 
      config.integrationSeconds + 
      config.clearingSeconds;
    
    // Use setTimeout for the full duration
    this.targetTimerInterval = window.setTimeout(() => {
      this.targetTimerInterval = null;
      
      // Call the callback when timer completes
      onComplete();
      
      // Dispatch an event that the timer has ended
      const event = new CustomEvent('remoteViewingTargetComplete');
      window.dispatchEvent(event);
    }, totalDuration * 1000);
  }
  
  /**
   * Cancel the current timer if active
   */
  cancelTimer(): void {
    if (this.targetTimerInterval) {
      clearTimeout(this.targetTimerInterval);
      this.targetTimerInterval = null;
    }
  }
  
  /**
   * Clean up resources
   */
  cleanup(): void {
    this.cancelTimer();
  }
}
