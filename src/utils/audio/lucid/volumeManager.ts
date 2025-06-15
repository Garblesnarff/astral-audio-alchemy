
export class VolumeManager {
  static setMainVolume(masterGain: GainNode | null, volume: number) {
    if (masterGain) {
      masterGain.gain.value = volume;
    }
  }

  static setAlphaVolume(alphaGain: GainNode | null, volume: number) {
    if (alphaGain) {
      alphaGain.gain.value = volume * 0.4;
    }
  }

  static setGammaVolume(gammaGain: GainNode | null, volume: number) {
    if (gammaGain) {
      gammaGain.gain.value = volume * 0.25;
    }
  }

  static setDreamStabilizationVolume(dreamStabilizationGain: GainNode | null, volume: number) {
    if (dreamStabilizationGain) {
      dreamStabilizationGain.gain.value = volume * 0.1;
    }
  }

  static updateAllVolumes(
    masterGain: GainNode | null,
    alphaGain: GainNode | null,
    gammaGain: GainNode | null,
    dreamStabilizationGain: GainNode | null,
    volume: number
  ) {
    this.setMainVolume(masterGain, volume);
    this.setAlphaVolume(alphaGain, volume);
    this.setGammaVolume(gammaGain, volume);
    this.setDreamStabilizationVolume(dreamStabilizationGain, volume);
  }
}
