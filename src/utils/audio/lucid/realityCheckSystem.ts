
export class RealityCheckSystem {
  private realityCheckTimer: number | null = null;
  private realityCheckInterval: number = 15; // minutes
  private audioContext: AudioContext | null = null;
  private analyser: AnalyserNode | null = null;
  private baseVolume: number = 0.5;
  
  constructor(audioContext: AudioContext, analyser: AnalyserNode, baseVolume: number) {
    this.audioContext = audioContext;
    this.analyser = analyser;
    this.baseVolume = baseVolume;
  }
  
  enableRealityCheck(intervalMinutes: number = 15) {
    this.realityCheckInterval = intervalMinutes;
    this.scheduleNextRealityCheck();
  }
  
  disableRealityCheck() {
    if (this.realityCheckTimer) {
      window.clearTimeout(this.realityCheckTimer);
      this.realityCheckTimer = null;
    }
  }
  
  updateVolume(volume: number) {
    this.baseVolume = volume;
  }
  
  private scheduleNextRealityCheck() {
    if (this.realityCheckTimer) {
      window.clearTimeout(this.realityCheckTimer);
    }
    
    this.realityCheckTimer = window.setTimeout(() => {
      this.playRealityCheckSound();
      this.scheduleNextRealityCheck();
    }, this.realityCheckInterval * 60 * 1000);
  }
  
  private playRealityCheckSound() {
    if (!this.audioContext || !this.analyser) return;
    
    const checkOsc = this.audioContext.createOscillator();
    const checkGain = this.audioContext.createGain();
    
    checkOsc.frequency.value = 800;
    checkGain.gain.value = this.baseVolume * 0.5;
    
    checkOsc.connect(checkGain);
    checkGain.connect(this.analyser);
    
    checkOsc.start();
    
    checkGain.gain.setValueAtTime(this.baseVolume * 0.5, this.audioContext.currentTime);
    checkGain.gain.exponentialRampToValueAtTime(0.001, this.audioContext.currentTime + 0.5);
    
    setTimeout(() => {
      checkOsc.stop();
      checkOsc.disconnect();
      checkGain.disconnect();
    }, 500);
  }
}
