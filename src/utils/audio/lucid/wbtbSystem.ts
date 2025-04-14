
export class WBTBSystem {
  private wbtbTimer: number | null = null;
  private audioContext: AudioContext | null = null;
  private analyser: AnalyserNode | null = null;
  private baseVolume: number = 0.5;
  
  constructor(audioContext: AudioContext, analyser: AnalyserNode, baseVolume: number) {
    this.audioContext = audioContext;
    this.analyser = analyser;
    this.baseVolume = baseVolume;
  }
  
  startWBTBTimer(wakeUpAfterMinutes: number) {
    if (this.wbtbTimer) {
      window.clearTimeout(this.wbtbTimer);
    }
    
    this.wbtbTimer = window.setTimeout(() => {
      this.playWakeUpSequence();
    }, wakeUpAfterMinutes * 60 * 1000);
  }
  
  cancelWBTB() {
    if (this.wbtbTimer) {
      window.clearTimeout(this.wbtbTimer);
      this.wbtbTimer = null;
    }
  }
  
  updateVolume(volume: number) {
    this.baseVolume = volume;
  }
  
  private playWakeUpSequence() {
    if (!this.audioContext || !this.analyser) return;
    
    const wakeupOsc = this.audioContext.createOscillator();
    const wakeupGain = this.audioContext.createGain();
    
    wakeupOsc.frequency.value = 400;
    wakeupGain.gain.value = 0.001;
    
    wakeupOsc.connect(wakeupGain);
    wakeupGain.connect(this.analyser);
    
    wakeupOsc.start();
    wakeupGain.gain.exponentialRampToValueAtTime(this.baseVolume, this.audioContext.currentTime + 15);
    
    setTimeout(() => {
      wakeupGain.gain.exponentialRampToValueAtTime(0.001, this.audioContext.currentTime + 5);
      setTimeout(() => {
        wakeupOsc.stop();
        wakeupOsc.disconnect();
        wakeupGain.disconnect();
      }, 5000);
    }, 20000);
  }
}
