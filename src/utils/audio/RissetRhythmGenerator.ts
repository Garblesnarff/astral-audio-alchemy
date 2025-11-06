/**
 * Risset Rhythm Generator
 *
 * Creates the auditory illusion of perpetually accelerating rhythm.
 * Similar to Shepard tones but for tempo instead of pitch.
 *
 * The rhythm appears to speed up indefinitely, yet paradoxically returns
 * to the same tempo - like an infinite drum roll.
 *
 * Perfect for:
 * - Consciousness alteration
 * - Hypnotic states
 * - Time perception manipulation
 * - Meditation and trance induction
 *
 * Named after Jean-Claude Risset who discovered this auditory illusion.
 */

interface RissetRhythmConfig {
  baseTempo: number;       // Base tempo in BPM
  acceleration: number;    // Acceleration rate (0.1 = slow, 1.0 = fast)
  numLayers: number;       // Number of overlapping rhythm layers
  volume: number;          // Master volume (0-1)
  clickType: 'soft' | 'sharp' | 'drum'; // Type of click sound
}

export class RissetRhythmGenerator {
  private audioContext: AudioContext;
  private scheduledEvents: number[] = [];
  private masterGain: GainNode;
  private config: RissetRhythmConfig;
  private startTime: number = 0;
  private isPlaying: boolean = false;
  private scheduleInterval: number | null = null;

  constructor(audioContext: AudioContext, config?: Partial<RissetRhythmConfig>) {
    this.audioContext = audioContext;
    this.masterGain = audioContext.createGain();
    this.masterGain.connect(audioContext.destination);

    this.config = {
      baseTempo: 60,        // 60 BPM starting tempo
      acceleration: 0.3,    // Moderate acceleration
      numLayers: 6,         // 6 overlapping layers
      volume: 0.4,
      clickType: 'soft',
      ...config
    };

    this.masterGain.gain.value = this.config.volume;
  }

  /**
   * Create a click/percussion sound
   */
  private createClick(time: number, amplitude: number): void {
    const clickOsc = this.audioContext.createOscillator();
    const clickGain = this.audioContext.createGain();

    clickOsc.connect(clickGain);
    clickGain.connect(this.masterGain);

    switch (this.config.clickType) {
      case 'soft':
        // Soft, meditative click
        clickOsc.frequency.value = 800;
        clickGain.gain.setValueAtTime(amplitude * 0.3, time);
        clickGain.gain.exponentialRampToValueAtTime(0.001, time + 0.05);
        clickOsc.start(time);
        clickOsc.stop(time + 0.05);
        break;

      case 'sharp':
        // Sharp, attention-grabbing click
        clickOsc.frequency.value = 1500;
        clickGain.gain.setValueAtTime(amplitude * 0.5, time);
        clickGain.gain.exponentialRampToValueAtTime(0.001, time + 0.02);
        clickOsc.start(time);
        clickOsc.stop(time + 0.02);
        break;

      case 'drum':
        // Deep drum-like sound
        clickOsc.type = 'triangle';
        clickOsc.frequency.value = 100;
        clickGain.gain.setValueAtTime(amplitude * 0.6, time);
        clickGain.gain.exponentialRampToValueAtTime(0.001, time + 0.1);
        clickOsc.start(time);
        clickOsc.stop(time + 0.1);
        break;
    }
  }

  /**
   * Calculate amplitude envelope (fades in and out like Shepard tone)
   */
  private amplitudeEnvelope(tempo: number, minTempo: number, maxTempo: number): number {
    // Logarithmic scale for tempo
    const logTempo = Math.log2(tempo);
    const logMin = Math.log2(minTempo);
    const logMax = Math.log2(maxTempo);
    const logCenter = (logMin + logMax) / 2;
    const logRange = (logMax - logMin) / 2;

    // Gaussian envelope
    const normalized = (logTempo - logCenter) / logRange;
    return Math.exp(-Math.pow(normalized, 2) * 2);
  }

  /**
   * Schedule clicks for the Risset rhythm
   */
  private scheduleRhythm(): void {
    if (!this.isPlaying) return;

    const currentTime = this.audioContext.currentTime;
    const scheduleAhead = 0.5; // Schedule 500ms ahead

    const minTempo = this.config.baseTempo;
    const maxTempo = this.config.baseTempo * Math.pow(2, this.config.numLayers);

    for (let layer = 0; layer < this.config.numLayers; layer++) {
      // Calculate tempo for this layer (exponential distribution)
      const tempoMultiplier = Math.pow(2, layer + (currentTime - this.startTime) * this.config.acceleration);
      let tempo = minTempo * tempoMultiplier;

      // Wrap tempo around (key to the infinite illusion)
      while (tempo > maxTempo) {
        tempo /= 2;
      }

      // Calculate beat interval
      const beatInterval = 60 / tempo; // seconds per beat

      // Calculate amplitude based on envelope
      const amplitude = this.amplitudeEnvelope(tempo, minTempo, maxTempo);

      // Schedule next beat for this layer
      const nextBeatTime = currentTime + beatInterval;

      if (nextBeatTime < currentTime + scheduleAhead) {
        this.createClick(nextBeatTime, amplitude);
      }
    }
  }

  /**
   * Start the Risset rhythm
   */
  start(): void {
    if (this.isPlaying) return;

    this.startTime = this.audioContext.currentTime;
    this.isPlaying = true;

    // Schedule rhythm updates every 100ms
    this.scheduleInterval = window.setInterval(() => {
      this.scheduleRhythm();
    }, 100);
  }

  /**
   * Stop the Risset rhythm
   */
  stop(): void {
    if (!this.isPlaying) return;

    this.isPlaying = false;

    if (this.scheduleInterval !== null) {
      clearInterval(this.scheduleInterval);
      this.scheduleInterval = null;
    }

    this.scheduledEvents = [];
  }

  /**
   * Update configuration
   */
  updateConfig(config: Partial<RissetRhythmConfig>): void {
    Object.assign(this.config, config);

    if (config.volume !== undefined) {
      this.masterGain.gain.setValueAtTime(
        config.volume,
        this.audioContext.currentTime
      );
    }
  }

  /**
   * Set volume
   */
  setVolume(volume: number): void {
    this.config.volume = Math.max(0, Math.min(1, volume));
    this.masterGain.gain.setValueAtTime(
      this.config.volume,
      this.audioContext.currentTime
    );
  }

  /**
   * Set acceleration rate
   */
  setAcceleration(acceleration: number): void {
    this.config.acceleration = acceleration;
  }

  /**
   * Set click type
   */
  setClickType(clickType: 'soft' | 'sharp' | 'drum'): void {
    this.config.clickType = clickType;
  }

  /**
   * Cleanup
   */
  destroy(): void {
    this.stop();
    this.masterGain.disconnect();
  }
}

export default RissetRhythmGenerator;
