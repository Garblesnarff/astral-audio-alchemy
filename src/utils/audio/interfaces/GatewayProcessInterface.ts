
import { PresetManager } from '../managers/PresetManager';

// Interface for Gateway Process specific functionality
export class GatewayProcessInterface {
  private presetManager: PresetManager;

  constructor(presetManager: PresetManager) {
    this.presetManager = presetManager;
  }

  // Gateway Process specific methods
  setFocusLevel(level: 'focus10' | 'focus12' | 'focus15' | 'focus21') {
    const gatewayPreset = this.presetManager.getGatewayProcessPreset();
    if (this.presetManager.getActiveEngine() === gatewayPreset) {
      gatewayPreset.setFocusLevel(level);
    }
  }
  
  getCurrentFocusLevel(): string {
    const gatewayPreset = this.presetManager.getGatewayProcessPreset();
    if (this.presetManager.getActiveEngine() === gatewayPreset) {
      return gatewayPreset.getCurrentFocusLevel();
    }
    return '';
  }
  
  getGatewaySessionProgress(): number {
    const gatewayPreset = this.presetManager.getGatewayProcessPreset();
    if (this.presetManager.getActiveEngine() === gatewayPreset) {
      return gatewayPreset.getSessionProgress();
    }
    return 0;
  }
}
