
import { BinauralBeatCore } from './core/BinauralBeatCore';
import { LucidDreamingInterface } from './interfaces/LucidDreamingInterface';
import { AstralProjectionInterface } from './interfaces/AstralProjectionInterface';
import { RemoteViewingInterface } from './interfaces/RemoteViewingInterface';
import { GatewayProcessInterface } from './interfaces/GatewayProcessInterface';

// Main class that combines all functionality through composition
export class BinauralBeatGenerator extends BinauralBeatCore {
  private lucidInterface: LucidDreamingInterface;
  private astralInterface: AstralProjectionInterface;
  private remoteInterface: RemoteViewingInterface;
  private gatewayInterface: GatewayProcessInterface;

  constructor() {
    super();
    this.lucidInterface = new LucidDreamingInterface(this.presetManager);
    this.astralInterface = new AstralProjectionInterface(this.presetManager);
    this.remoteInterface = new RemoteViewingInterface(this.presetManager);
    this.gatewayInterface = new GatewayProcessInterface(this.presetManager);
  }

  // Lucid dreaming methods
  enableRealityCheck(intervalMinutes: number = 15) {
    this.lucidInterface.enableRealityCheck(intervalMinutes);
  }
  
  disableRealityCheck() {
    this.lucidInterface.disableRealityCheck();
  }
  
  startWBTBTimer(wakeUpAfterMinutes: number) {
    this.lucidInterface.startWBTBTimer(wakeUpAfterMinutes);
  }
  
  cancelWBTB() {
    this.lucidInterface.cancelWBTB();
  }

  // Astral projection methods
  enableReturnSignal() {
    this.astralInterface.enableReturnSignal();
  }
  
  disableReturnSignal() {
    this.astralInterface.disableReturnSignal();
  }

  // Remote viewing methods
  startTargetFocus(config: {
    countdownSeconds: number;
    focusSeconds: number;
    reportingSeconds: number;
    integrationSeconds: number;
    clearingSeconds: number;
  }) {
    this.remoteInterface.startTargetFocus(config);
  }
  
  clearEnergy(durationMs: number = 5000) {
    this.remoteInterface.clearEnergy(durationMs);
  }
  
  startRecording(): Promise<void> {
    return this.remoteInterface.startRecording();
  }
  
  stopRecording(): Promise<Blob | null> {
    return this.remoteInterface.stopRecording();
  }
  
  getCurrentRemoteViewingProtocol(): string {
    return this.remoteInterface.getCurrentRemoteViewingProtocol();
  }
  
  setRemoteViewingProtocol(protocol: 'crv' | 'erv' | 'arv') {
    this.remoteInterface.setRemoteViewingProtocol(protocol);
  }

  // Gateway Process methods
  setFocusLevel(level: 'focus10' | 'focus12' | 'focus15' | 'focus21') {
    this.gatewayInterface.setFocusLevel(level);
  }
  
  getCurrentFocusLevel(): string {
    return this.gatewayInterface.getCurrentFocusLevel();
  }
  
  getGatewaySessionProgress(): number {
    return this.gatewayInterface.getGatewaySessionProgress();
  }
}
