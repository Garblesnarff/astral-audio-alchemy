
import { PresetManager } from '../managers/PresetManager';

// Interface for remote viewing specific functionality
export class RemoteViewingInterface {
  private presetManager: PresetManager;

  constructor(presetManager: PresetManager) {
    this.presetManager = presetManager;
  }

  // Start target focus timer for remote viewing
  startTargetFocus(config: {
    countdownSeconds: number;
    focusSeconds: number;
    reportingSeconds: number;
    integrationSeconds: number;
    clearingSeconds: number;
  }) {
    const remotePreset = this.presetManager.getRemoteViewingPreset();
    if (this.presetManager.getActiveEngine() === remotePreset) {
      remotePreset.startTargetFocus(config);
    }
  }
  
  // Clear energy for remote viewing
  clearEnergy(durationMs: number = 5000) {
    const remotePreset = this.presetManager.getRemoteViewingPreset();
    if (this.presetManager.getActiveEngine() === remotePreset) {
      remotePreset.clearEnergy(durationMs);
    }
  }
  
  // Start audio recording for remote viewing
  startRecording(): Promise<void> {
    const remotePreset = this.presetManager.getRemoteViewingPreset();
    if (this.presetManager.getActiveEngine() === remotePreset) {
      return remotePreset.startRecording();
    }
    return Promise.reject(new Error('Recording only available in Remote Viewing mode'));
  }
  
  // Stop audio recording for remote viewing
  stopRecording(): Promise<Blob | null> {
    const remotePreset = this.presetManager.getRemoteViewingPreset();
    if (this.presetManager.getActiveEngine() === remotePreset) {
      return remotePreset.stopRecording();
    }
    return Promise.resolve(null);
  }
  
  // Get current remote viewing protocol
  getCurrentRemoteViewingProtocol(): string {
    const remotePreset = this.presetManager.getRemoteViewingPreset();
    if (this.presetManager.getActiveEngine() === remotePreset) {
      return remotePreset.getCurrentProtocol();
    }
    return '';
  }
  
  // Set remote viewing protocol
  setRemoteViewingProtocol(protocol: 'crv' | 'erv' | 'arv') {
    const remotePreset = this.presetManager.getRemoteViewingPreset();
    if (this.presetManager.getActiveEngine() === remotePreset) {
      remotePreset.setProtocol(protocol);
    }
  }
}
