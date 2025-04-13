
/**
 * Class that manages the state of the audio player
 */
export class AudioPlayerState {
  private _isPlaying = false;
  private _baseFrequency = 200;
  private _beatFrequency = 10;
  private _volume = 0.5;
  private _currentPreset = '';
  private _startInProgress = false;
  private _stopInProgress = false;
  private _stopCompleteCallback: (() => void) | null = null;
  private _delayedStartTimeoutId: number | null = null;

  /**
   * Get current play state
   */
  public get isPlaying(): boolean {
    return this._isPlaying;
  }

  /**
   * Set play state
   */
  public set isPlaying(value: boolean) {
    this._isPlaying = value;
  }

  /**
   * Get base frequency
   */
  public get baseFrequency(): number {
    return this._baseFrequency;
  }

  /**
   * Set base frequency
   */
  public set baseFrequency(value: number) {
    this._baseFrequency = value;
  }

  /**
   * Get beat frequency
   */
  public get beatFrequency(): number {
    return this._beatFrequency;
  }

  /**
   * Set beat frequency
   */
  public set beatFrequency(value: number) {
    this._beatFrequency = value;
  }

  /**
   * Get current volume
   */
  public get volume(): number {
    return this._volume;
  }

  /**
   * Set volume
   */
  public set volume(value: number) {
    this._volume = value;
  }

  /**
   * Get current preset
   */
  public get currentPreset(): string {
    return this._currentPreset;
  }

  /**
   * Set current preset
   */
  public set currentPreset(value: string) {
    this._currentPreset = value;
  }

  /**
   * Check if start operation is in progress
   */
  public get startInProgress(): boolean {
    return this._startInProgress;
  }

  /**
   * Set start in progress state
   */
  public set startInProgress(value: boolean) {
    this._startInProgress = value;
  }

  /**
   * Check if stop operation is in progress
   */
  public get stopInProgress(): boolean {
    return this._stopInProgress;
  }

  /**
   * Set stop in progress state
   */
  public set stopInProgress(value: boolean) {
    this._stopInProgress = value;
  }

  /**
   * Get current stop complete callback
   */
  public get stopCompleteCallback(): (() => void) | null {
    return this._stopCompleteCallback;
  }

  /**
   * Set stop complete callback
   */
  public set stopCompleteCallback(callback: (() => void) | null) {
    this._stopCompleteCallback = callback;
  }

  /**
   * Get delayed start timeout ID
   */
  public get delayedStartTimeoutId(): number | null {
    return this._delayedStartTimeoutId;
  }

  /**
   * Set delayed start timeout ID
   */
  public set delayedStartTimeoutId(id: number | null) {
    this._delayedStartTimeoutId = id;
  }

  /**
   * Reset all state values to defaults
   */
  public reset(): void {
    this._isPlaying = false;
    this._currentPreset = '';
  }
}
