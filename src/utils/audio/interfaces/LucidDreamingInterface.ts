
import { PresetManager } from '../managers/PresetManager';

// Interface for lucid dreaming specific functionality
export class LucidDreamingInterface {
  private presetManager: PresetManager;

  constructor(presetManager: PresetManager) {
    this.presetManager = presetManager;
  }

  // Enable reality check sounds for lucid dreaming
  enableRealityCheck(intervalMinutes: number = 15) {
    const lucidPreset = this.presetManager.getLucidDreamingPreset();
    if (this.presetManager.getActiveEngine() === lucidPreset) {
      lucidPreset.enableRealityCheck(intervalMinutes);
    }
  }
  
  // Disable reality check sounds
  disableRealityCheck() {
    const lucidPreset = this.presetManager.getLucidDreamingPreset();
    if (this.presetManager.getActiveEngine() === lucidPreset) {
      lucidPreset.disableRealityCheck();
    }
  }
  
  // Start WBTB timer for lucid dreaming
  startWBTBTimer(wakeUpAfterMinutes: number) {
    const lucidPreset = this.presetManager.getLucidDreamingPreset();
    if (this.presetManager.getActiveEngine() === lucidPreset) {
      lucidPreset.startWBTBTimer(wakeUpAfterMinutes);
    }
  }
  
  // Cancel WBTB timer
  cancelWBTB() {
    const lucidPreset = this.presetManager.getLucidDreamingPreset();
    if (this.presetManager.getActiveEngine() === lucidPreset) {
      lucidPreset.cancelWBTB();
    }
  }
}
