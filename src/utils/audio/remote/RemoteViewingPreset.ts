
import { AudioEngineBase } from '../AudioEngineBase';
import { thetaDeltaMixGenerator } from './thetaDeltaMixGenerator';
import { enhancedAlphaGenerator } from './enhancedAlphaGenerator';
import { betaThetaCycleGenerator } from './betaThetaCycleGenerator';
import { whiteNoiseGenerator } from './whiteNoiseGenerator';
import { targetFocusMarkers } from './targetFocusMarkers';
import { sessionProgressionGenerator } from './sessionProgressionGenerator';

/**
 * Remote Viewing Preset - Specialized audio engine for remote viewing experiences
 */
export class RemoteViewingPreset extends AudioEngineBase {
  private thetaDeltaOscillators: { leftOsc: OscillatorNode; rightOsc: OscillatorNode } | null = null;
  private enhancedAlphaOscillators: { leftOsc: OscillatorNode; rightOsc: OscillatorNode } | null = null;
  private betaThetaOscillators: { leftOsc: OscillatorNode; rightOsc: OscillatorNode } | null = null;
  private whiteNoiseNode: AudioBufferSourceNode | null = null;
  private targetFocusNodes: AudioNode[] = [];
  private sessionProgressionNodes: AudioNode[] = [];
  private targetTimerInterval: number | null = null;
  private currentProtocol: string = 'crv'; // Default to Coordinate Remote Viewing
  private isRecording: boolean = false;
  private mediaRecorder: MediaRecorder | null = null;
  private audioChunks: Blob[] = [];
  private recordingStream: MediaStream | null = null;
  
  // Add properties needed for audio generation
  protected leftGain: GainNode | null = null;
  protected rightGain: GainNode | null = null;
  protected volume: number = 0.5;
  
  constructor() {
    super();
    this.currentPreset = 'remote-theta-delta';
  }
  
  /**
   * Initialize the audio context
   */
  override initialize(): boolean {
    const result = super.initialize();
    
    if (result && this.audioContext) {
      // Create gain nodes for left and right channels
      this.leftGain = this.audioContext.createGain();
      this.rightGain = this.audioContext.createGain();
      
      // Create master gain node
      this.masterGain = this.audioContext.createGain();
      
      // Connect the channel gains to the master gain
      this.leftGain.connect(this.masterGain);
      this.rightGain.connect(this.masterGain);
      
      // Connect master gain to the analyser
      if (this.analyser) {
        this.masterGain.connect(this.analyser);
      }
      
      return true;
    }
    
    return false;
  }
  
  /**
   * Start the remote viewing binaural beat with specific preset
   */
  start(baseFreq: number, beatFreq: number, volume: number = 0.5, preset: string = 'remote-theta-delta'): void {
    if (!this.audioContext) {
      this.initialize();
    }
    
    this.stop();
    this.isPlaying = true;
    this.baseFrequency = baseFreq;
    this.beatFrequency = beatFreq;
    this.volume = volume;
    this.currentPreset = preset;
    
    if (this.audioContext && this.leftGain && this.rightGain) {
      // Based on the preset, start the appropriate oscillators
      switch (preset) {
        case 'remote-theta-delta':
          this.thetaDeltaOscillators = thetaDeltaMixGenerator(
            this.audioContext,
            this.baseFrequency,
            this.beatFrequency,
            this.leftGain,
            this.rightGain
          );
          break;
        case 'remote-alpha':
          this.enhancedAlphaOscillators = enhancedAlphaGenerator(
            this.audioContext,
            this.baseFrequency,
            this.beatFrequency,
            this.leftGain,
            this.rightGain
          );
          break;
        case 'remote-beta-theta':
          this.betaThetaOscillators = betaThetaCycleGenerator(
            this.audioContext,
            this.baseFrequency,
            this.beatFrequency,
            this.leftGain,
            this.rightGain
          );
          break;
        case 'remote-focused':
          // For focused viewing, we use theta-delta with target focus markers
          this.thetaDeltaOscillators = thetaDeltaMixGenerator(
            this.audioContext,
            this.baseFrequency,
            this.beatFrequency,
            this.leftGain,
            this.rightGain
          );
          this.targetFocusNodes = targetFocusMarkers(
            this.audioContext,
            this.masterGain!
          );
          break;
        case 'remote-crv':
          // Coordinate Remote Viewing protocol
          this.currentProtocol = 'crv';
          this.sessionProgressionNodes = sessionProgressionGenerator(
            this.audioContext,
            this.masterGain!,
            'crv'
          );
          break;
        case 'remote-erv':
          // Extended Remote Viewing protocol
          this.currentProtocol = 'erv';
          this.sessionProgressionNodes = sessionProgressionGenerator(
            this.audioContext,
            this.masterGain!,
            'erv'
          );
          break;
        case 'remote-arv':
          // Associative Remote Viewing protocol
          this.currentProtocol = 'arv';
          this.sessionProgressionNodes = sessionProgressionGenerator(
            this.audioContext,
            this.masterGain!,
            'arv'
          );
          break;
        default:
          // Default to theta-delta mix
          this.thetaDeltaOscillators = thetaDeltaMixGenerator(
            this.audioContext,
            this.baseFrequency,
            this.beatFrequency,
            this.leftGain,
            this.rightGain
          );
      }
      
      // Set initial volume
      this.setVolume(volume);
    }
  }
  
  /**
   * Stop the remote viewing binaural beat
   */
  stop(): void {
    // Stop oscillators
    if (this.thetaDeltaOscillators) {
      this.thetaDeltaOscillators.leftOsc.stop();
      this.thetaDeltaOscillators.rightOsc.stop();
      this.thetaDeltaOscillators = null;
    }
    
    if (this.enhancedAlphaOscillators) {
      this.enhancedAlphaOscillators.leftOsc.stop();
      this.enhancedAlphaOscillators.rightOsc.stop();
      this.enhancedAlphaOscillators = null;
    }
    
    if (this.betaThetaOscillators) {
      this.betaThetaOscillators.leftOsc.stop();
      this.betaThetaOscillators.rightOsc.stop();
      this.betaThetaOscillators = null;
    }
    
    // Stop white noise
    if (this.whiteNoiseNode) {
      this.whiteNoiseNode.stop();
      this.whiteNoiseNode = null;
    }
    
    // Stop target focus markers
    this.targetFocusNodes.forEach(node => {
      if (node instanceof OscillatorNode) {
        node.stop();
      }
    });
    this.targetFocusNodes = [];
    
    // Stop session progression
    this.sessionProgressionNodes.forEach(node => {
      if (node instanceof OscillatorNode) {
        node.stop();
      }
    });
    this.sessionProgressionNodes = [];
    
    // Clear any intervals
    if (this.targetTimerInterval) {
      clearInterval(this.targetTimerInterval);
      this.targetTimerInterval = null;
    }
    
    // Stop recording if active
    this.stopRecording();
    
    this.isPlaying = false;
  }
  
  /**
   * Generate white noise for energy clearing
   */
  clearEnergy(durationMs: number = 5000): void {
    if (!this.audioContext) return;
    
    // If any white noise is currently playing, stop it
    if (this.whiteNoiseNode) {
      this.whiteNoiseNode.stop();
      this.whiteNoiseNode = null;
    }
    
    // Create new white noise
    this.whiteNoiseNode = whiteNoiseGenerator(
      this.audioContext,
      this.masterGain!,
      durationMs
    );
  }
  
  /**
   * Set up target focus timer
   */
  startTargetFocus(config: {
    countdownSeconds: number;
    focusSeconds: number;
    reportingSeconds: number;
    integrationSeconds: number;
    clearingSeconds: number;
  }): void {
    // Clear any existing timer
    if (this.targetTimerInterval) {
      clearInterval(this.targetTimerInterval);
      this.targetTimerInterval = null;
    }
    
    // Implementation of the target focus timer will go here
    // This would track the current phase and trigger appropriate frequency
    // shifts and audio cues for each phase
    
    // For now, just set up a basic timer that will trigger the end event
    const totalDuration = 
      config.countdownSeconds + 
      config.focusSeconds + 
      config.reportingSeconds + 
      config.integrationSeconds + 
      config.clearingSeconds;
    
    // Use setTimeout instead of setInterval for the full duration
    this.targetTimerInterval = window.setTimeout(() => {
      // When timer ends, clear energy
      this.clearEnergy();
      this.targetTimerInterval = null;
      
      // Dispatch an event that the timer has ended
      const event = new CustomEvent('remoteViewingTargetComplete');
      window.dispatchEvent(event);
    }, totalDuration * 1000);
  }
  
  /**
   * Start audio recording
   */
  startRecording(): Promise<void> {
    return new Promise((resolve, reject) => {
      if (!navigator.mediaDevices) {
        reject(new Error('Media devices not supported in this browser'));
        return;
      }
      
      if (this.isRecording) {
        reject(new Error('Already recording'));
        return;
      }
      
      navigator.mediaDevices.getUserMedia({ audio: true })
        .then(stream => {
          this.recordingStream = stream;
          this.mediaRecorder = new MediaRecorder(stream);
          this.audioChunks = [];
          
          this.mediaRecorder.addEventListener('dataavailable', (event) => {
            this.audioChunks.push(event.data);
          });
          
          this.mediaRecorder.start();
          this.isRecording = true;
          resolve();
        })
        .catch(err => {
          reject(err);
        });
    });
  }
  
  /**
   * Stop audio recording
   */
  stopRecording(): Promise<Blob | null> {
    return new Promise((resolve) => {
      if (!this.isRecording || !this.mediaRecorder) {
        resolve(null);
        return;
      }
      
      this.mediaRecorder.addEventListener('stop', () => {
        const audioBlob = new Blob(this.audioChunks, { type: 'audio/webm' });
        this.isRecording = false;
        
        // Clean up
        if (this.recordingStream) {
          this.recordingStream.getTracks().forEach(track => track.stop());
          this.recordingStream = null;
        }
        
        resolve(audioBlob);
      });
      
      this.mediaRecorder.stop();
    });
  }
  
  /**
   * Get current protocol
   */
  getCurrentProtocol(): string {
    return this.currentProtocol;
  }
  
  /**
   * Set current protocol
   */
  setProtocol(protocol: 'crv' | 'erv' | 'arv'): void {
    this.currentProtocol = protocol;
  }
  
  /**
   * Clean up all resources
   */
  cleanup(): void {
    this.stop();
    super.cleanup();
  }
}
