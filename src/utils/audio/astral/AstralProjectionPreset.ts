
import { AudioEngineBase } from '../AudioEngineBase';
import { deepThetaWaveGenerator } from './deepThetaWaveGenerator';
import { epsilonLambdaGenerator } from './epsilonLambdaGenerator';
import { frequency777Generator } from './frequency777Generator';
import { vibrationStageGenerator } from './vibrationStageGenerator';
import { relaxationSequenceGenerator } from './relaxationSequenceGenerator';
import { returnSignalGenerator } from './returnSignalGenerator';

export class AstralProjectionPreset extends AudioEngineBase {
  private oscillatorLeft: OscillatorNode | null = null;
  private oscillatorRight: OscillatorNode | null = null;
  private leftGain: GainNode | null = null;
  private rightGain: GainNode | null = null;
  private mergerNode: ChannelMergerNode | null = null;
  private currentPhase: number = 0;
  private progressiveSequenceActive: boolean = false;
  private progressiveSequenceTimer: number | null = null;
  private returnSignalActive: boolean = false;

  start(baseFreq: number, beatFreq: number, volume: number = 0.5, preset: string = 'astral-deep-theta') {
    if (!this.audioContext) {
      this.initialize();
    }

    this.resume();

    if (this.isPlaying) {
      this.stop();
    }

    this.baseFrequency = baseFreq;
    this.beatFrequency = beatFreq;
    this.baseVolume = volume;
    this.currentPreset = preset;

    if (!this.audioContext) return;

    // Set up stereo sound
    this.mergerNode = this.audioContext.createChannelMerger(2);
    this.masterGain = this.audioContext.createGain();
    this.masterGain.gain.value = volume;

    // Create left and right channel gains
    this.leftGain = this.audioContext.createGain();
    this.rightGain = this.audioContext.createGain();
    this.leftGain.gain.value = 0.5;
    this.rightGain.gain.value = 0.5;

    // Connect gain nodes to merger
    this.leftGain.connect(this.mergerNode, 0, 0);
    this.rightGain.connect(this.mergerNode, 0, 1);

    // Connect merger to master gain
    this.mergerNode.connect(this.masterGain);

    // Connect master gain to destination and analyzer
    if (this.analyser) {
      this.masterGain.connect(this.analyser);
    }

    // Select the appropriate generator based on preset
    switch (preset) {
      case 'astral-deep-theta':
        this.setupDeepTheta();
        break;
      case 'astral-epsilon-lambda':
        this.setupEpsilonLambda();
        break;
      case 'astral-777hz':
        this.setup777Hz();
        break;
      case 'astral-vibrational':
        this.setupVibrationalStage();
        break;
      case 'astral-progressive':
        this.setupProgressiveSequence();
        break;
      default:
        this.setupDeepTheta(); // Default to deep theta
    }

    this.isPlaying = true;
  }

  private setupDeepTheta() {
    if (!this.audioContext || !this.leftGain || !this.rightGain) return;
    
    const { leftOsc, rightOsc } = deepThetaWaveGenerator(
      this.audioContext, 
      this.baseFrequency, 
      this.beatFrequency, 
      this.leftGain, 
      this.rightGain
    );
    
    this.oscillatorLeft = leftOsc;
    this.oscillatorRight = rightOsc;
  }

  private setupEpsilonLambda() {
    if (!this.audioContext || !this.leftGain || !this.rightGain) return;
    
    const { leftOsc, rightOsc } = epsilonLambdaGenerator(
      this.audioContext, 
      this.baseFrequency, 
      this.beatFrequency, 
      this.leftGain, 
      this.rightGain
    );
    
    this.oscillatorLeft = leftOsc;
    this.oscillatorRight = rightOsc;
  }

  private setup777Hz() {
    if (!this.audioContext || !this.leftGain || !this.rightGain) return;
    
    const { leftOsc, rightOsc } = frequency777Generator(
      this.audioContext,
      this.leftGain, 
      this.rightGain
    );
    
    this.oscillatorLeft = leftOsc;
    this.oscillatorRight = rightOsc;
  }

  private setupVibrationalStage() {
    if (!this.audioContext || !this.leftGain || !this.rightGain) return;
    
    const { leftOsc, rightOsc } = vibrationStageGenerator(
      this.audioContext, 
      this.baseFrequency, 
      this.beatFrequency, 
      this.leftGain, 
      this.rightGain
    );
    
    this.oscillatorLeft = leftOsc;
    this.oscillatorRight = rightOsc;
  }

  private setupProgressiveSequence() {
    this.progressiveSequenceActive = true;
    this.currentPhase = 0;
    this.advanceToNextPhase();
  }

  private advanceToNextPhase() {
    if (!this.progressiveSequenceActive) return;
    
    // Stop current oscillators
    if (this.oscillatorLeft) {
      this.oscillatorLeft.stop();
      this.oscillatorLeft = null;
    }
    if (this.oscillatorRight) {
      this.oscillatorRight.stop();
      this.oscillatorRight = null;
    }
    
    if (!this.audioContext || !this.leftGain || !this.rightGain) return;
    
    // Set up the next phase
    switch (this.currentPhase) {
      case 0: // Phase 1: Relaxation
        const relaxation = relaxationSequenceGenerator(
          this.audioContext,
          this.leftGain,
          this.rightGain
        );
        this.oscillatorLeft = relaxation.leftOsc;
        this.oscillatorRight = relaxation.rightOsc;
        this.progressiveSequenceTimer = window.setTimeout(() => this.advanceToNextPhase(), 10 * 60 * 1000); // 10 minutes
        break;
      case 1: // Phase 2: Body Awareness
        this.oscillatorLeft = this.audioContext.createOscillator();
        this.oscillatorRight = this.audioContext.createOscillator();
        this.oscillatorLeft.frequency.value = 200;
        this.oscillatorRight.frequency.value = 204; // 4 Hz difference for body awareness
        this.oscillatorLeft.connect(this.leftGain);
        this.oscillatorRight.connect(this.rightGain);
        this.oscillatorLeft.start();
        this.oscillatorRight.start();
        this.progressiveSequenceTimer = window.setTimeout(() => this.advanceToNextPhase(), 10 * 60 * 1000); // 10 minutes
        break;
      case 2: // Phase 3: Vibrational Stage
        const vibration = vibrationStageGenerator(
          this.audioContext,
          210,
          6.3,
          this.leftGain,
          this.rightGain
        );
        this.oscillatorLeft = vibration.leftOsc;
        this.oscillatorRight = vibration.rightOsc;
        this.progressiveSequenceTimer = window.setTimeout(() => this.advanceToNextPhase(), 15 * 60 * 1000); // 15 minutes
        break;
      case 3: // Phase 4: Separation
        const separation = epsilonLambdaGenerator(
          this.audioContext,
          200,
          0.5,
          this.leftGain,
          this.rightGain
        );
        this.oscillatorLeft = separation.leftOsc;
        this.oscillatorRight = separation.rightOsc;
        this.progressiveSequenceTimer = window.setTimeout(() => this.advanceToNextPhase(), 10 * 60 * 1000); // 10 minutes
        break;
      case 4: // Phase 5: Exploration
        const theta = deepThetaWaveGenerator(
          this.audioContext,
          200,
          6.3,
          this.leftGain,
          this.rightGain
        );
        this.oscillatorLeft = theta.leftOsc;
        this.oscillatorRight = theta.rightOsc;
        this.progressiveSequenceTimer = window.setTimeout(() => this.advanceToNextPhase(), 20 * 60 * 1000); // 20 minutes
        break;
      case 5: // Phase 6: Return
        const returnSignal = returnSignalGenerator(
          this.audioContext,
          this.leftGain,
          this.rightGain
        );
        this.oscillatorLeft = returnSignal.leftOsc;
        this.oscillatorRight = returnSignal.rightOsc;
        this.progressiveSequenceTimer = window.setTimeout(() => this.stop(), 10 * 60 * 1000); // 10 minutes then stop
        break;
      default:
        this.stop();
        return;
    }
    
    this.currentPhase++;
  }

  enableReturnSignal() {
    if (!this.returnSignalActive && this.audioContext && this.isPlaying) {
      this.returnSignalActive = true;
      // Implement return signal logic here
    }
  }

  disableReturnSignal() {
    this.returnSignalActive = false;
    // Remove return signal if active
  }

  stop() {
    if (this.oscillatorLeft) {
      this.oscillatorLeft.stop();
      this.oscillatorLeft = null;
    }
    
    if (this.oscillatorRight) {
      this.oscillatorRight.stop();
      this.oscillatorRight = null;
    }
    
    if (this.progressiveSequenceTimer) {
      clearTimeout(this.progressiveSequenceTimer);
      this.progressiveSequenceTimer = null;
    }
    
    this.progressiveSequenceActive = false;
    this.returnSignalActive = false;
    this.currentPhase = 0;
    this.isPlaying = false;
    
    // Clean up audio nodes
    if (this.leftGain) {
      this.leftGain.disconnect();
      this.leftGain = null;
    }
    
    if (this.rightGain) {
      this.rightGain.disconnect();
      this.rightGain = null;
    }
    
    if (this.mergerNode) {
      this.mergerNode.disconnect();
      this.mergerNode = null;
    }
    
    if (this.masterGain) {
      this.masterGain.disconnect();
      this.masterGain = null;
    }
  }
}
