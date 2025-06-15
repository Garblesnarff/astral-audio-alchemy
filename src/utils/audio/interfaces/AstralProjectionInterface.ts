
import { PresetManager } from '../managers/PresetManager';

// Interface for astral projection specific functionality
export class AstralProjectionInterface {
  private presetManager: PresetManager;

  constructor(presetManager: PresetManager) {
    this.presetManager = presetManager;
  }

  // Enable return signal for astral projection
  enableReturnSignal() {
    const astralPreset = this.presetManager.getAstralProjectionPreset();
    if (this.presetManager.getActiveEngine() === astralPreset) {
      astralPreset.enableReturnSignal();
    }
  }
  
  // Disable return signal for astral projection
  disableReturnSignal() {
    const astralPreset = this.presetManager.getAstralProjectionPreset();
    if (this.presetManager.getActiveEngine() === astralPreset) {
      astralPreset.disableReturnSignal();
    }
  }
}
