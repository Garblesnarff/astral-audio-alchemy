/**
 * Shepard Tone Generator
 *
 * Creates the famous "infinite staircase" auditory illusion.
 * A Shepard tone appears to continuously rise (or fall) in pitch, yet never actually gets higher.
 *
 * Perfect for:
 * - Meditation and trance states
 * - Consciousness expansion
 * - Hypnotic induction
 * - Mind-bending audio experiences
 *
 * The effect is created by layering multiple sine waves across octaves,
 * with amplitude envelopes that fade in at the bottom and fade out at the top,
 * creating a circular perception of pitch.
 */

interface ShepardToneConfig {
  baseFrequency: number;  // Starting frequency (Hz)
  speed: number;          // How fast the tone rises (Hz/sec)
  numOctaves: number;     // Number of overlapping octaves (typically 8-10)
  direction: 'up' | 'down'; // Rising or falling
  volume: number;         // Master volume (0-1)
}

export class ShepardToneGenerator {
  private audioContext: AudioContext;
  private oscillators: OscillatorNode[] = [];
  private gainNodes: GainNode[] = [];
  private masterGain: GainNode;
  private config: ShepardToneConfig;
  private startTime: number = 0;
  private isPlaying: boolean = false;

  constructor(audioContext: AudioContext, config?: Partial<ShepardToneConfig>) {
    this.audioContext = audioContext;
    this.masterGain = audioContext.createGain();
    this.masterGain.connect(audioContext.destination);

    // Default configuration
    this.config = {
      baseFrequency: 220, // A3
      speed: 0.1,         // Slow, meditative rise
      numOctaves: 10,     // Rich, full spectrum
      direction: 'up',
      volume: 0.3,
      ...config
    };

    this.masterGain.gain.value = this.config.volume;
  }

  /**
   * Gaussian envelope function
   * Creates a bell curve that fades in at low frequencies and out at high frequencies
   */
  private gaussianEnvelope(frequency: number, center: number, width: number): number {
    const logFreq = Math.log2(frequency);
    const logCenter = Math.log2(center);
    const exponent = -Math.pow((logFreq - logCenter) / width, 2);
    return Math.exp(exponent);
  }

  /**
   * Start the Shepard tone
   */
  start(): void {
    if (this.isPlaying) return;

    this.startTime = this.audioContext.currentTime;
    this.isPlaying = true;

    // Create oscillators for each octave
    for (let i = 0; i < this.config.numOctaves; i++) {
      const oscillator = this.audioContext.createOscillator();
      const gainNode = this.audioContext.createGain();

      oscillator.type = 'sine';

      // Start each oscillator at a different octave
      const octaveMultiplier = Math.pow(2, i);
      oscillator.frequency.value = this.config.baseFrequency * octaveMultiplier;

      oscillator.connect(gainNode);
      gainNode.connect(this.masterGain);

      oscillator.start();

      this.oscillators.push(oscillator);
      this.gainNodes.push(gainNode);
    }

    // Start the animation loop
    this.updateShepardTone();
  }

  /**
   * Update loop - continuously adjusts frequencies and amplitudes
   */
  private updateShepardTone = (): void => {
    if (!this.isPlaying) return;

    const currentTime = this.audioContext.currentTime;
    const elapsed = currentTime - this.startTime;

    // Calculate the center frequency for the envelope
    const centerFrequency = this.config.baseFrequency * Math.pow(2, 5); // Middle of range

    for (let i = 0; i < this.oscillators.length; i++) {
      const oscillator = this.oscillators[i];
      const gainNode = this.gainNodes[i];

      // Current frequency of this oscillator
      let frequency = oscillator.frequency.value;

      // Update frequency based on direction and speed
      const frequencyChange = this.config.speed * (this.config.direction === 'up' ? 1 : -1);
      frequency *= Math.pow(2, frequencyChange / 12); // Convert to semitones

      // Wrap around octaves (this is the key to the infinite illusion)
      const minFreq = this.config.baseFrequency;
      const maxFreq = this.config.baseFrequency * Math.pow(2, this.config.numOctaves);

      if (this.config.direction === 'up' && frequency > maxFreq) {
        frequency = minFreq * (frequency / maxFreq);
      } else if (this.config.direction === 'down' && frequency < minFreq) {
        frequency = maxFreq * (frequency / minFreq);
      }

      oscillator.frequency.setValueAtTime(frequency, currentTime);

      // Apply Gaussian envelope for smooth fading
      const amplitude = this.gaussianEnvelope(frequency, centerFrequency, 2.0);
      gainNode.gain.setValueAtTime(amplitude * 0.1, currentTime); // 0.1 to prevent clipping
    }

    // Continue the loop
    requestAnimationFrame(this.updateShepardTone);
  };

  /**
   * Stop the Shepard tone
   */
  stop(): void {
    if (!this.isPlaying) return;

    this.isPlaying = false;

    // Stop and disconnect all oscillators
    this.oscillators.forEach(osc => {
      osc.stop();
      osc.disconnect();
    });

    this.gainNodes.forEach(gain => {
      gain.disconnect();
    });

    this.oscillators = [];
    this.gainNodes = [];
  }

  /**
   * Update configuration while playing
   */
  updateConfig(config: Partial<ShepardToneConfig>): void {
    Object.assign(this.config, config);

    if (config.volume !== undefined) {
      this.masterGain.gain.setValueAtTime(
        config.volume,
        this.audioContext.currentTime
      );
    }

    // If direction changed, no need to restart - it will update in the loop
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
   * Set speed
   */
  setSpeed(speed: number): void {
    this.config.speed = speed;
  }

  /**
   * Set direction
   */
  setDirection(direction: 'up' | 'down'): void {
    this.config.direction = direction;
  }

  /**
   * Cleanup
   */
  destroy(): void {
    this.stop();
    this.masterGain.disconnect();
  }
}

export default ShepardToneGenerator;
