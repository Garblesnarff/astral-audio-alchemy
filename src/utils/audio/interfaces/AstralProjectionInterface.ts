
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
  
  // Check whether the return signal homing layer is active
  isReturnSignalEnabled(): boolean {
    const astralPreset = this.presetManager.getAstralProjectionPreset();
    if (this.presetManager.getActiveEngine() === astralPreset) {
      return astralPreset.isReturnSignalEnabled();
    }
    return false;
  }
  
  // Set the intensity of the vibrational stage (percentage, 10-100)
  setVibrationIntensity(intensity: number) {
    const astralPreset = this.presetManager.getAstralProjectionPreset();
    if (this.presetManager.getActiveEngine() === astralPreset) {
      astralPreset.setVibrationIntensity(intensity);
    }
  }
  
  // Get the current phase of the progressive astral journey
  getAstralJourneyPhase(): number {
    const astralPreset = this.presetManager.getAstralProjectionPreset();
    if (this.presetManager.getActiveEngine() === astralPreset) {
      return astralPreset.getCurrentPhase();
    }
    return 0;
  }
}
