
// Creates the Hemi-Sync signal based on the Monroe Institute technique
export function createHemiSyncSignal(
  audioContext: AudioContext, 
  baseFrequency: number,
  beatFrequency: number
) {
  // Create oscillators for left and right channels
  const leftOscillator = audioContext.createOscillator();
  const rightOscillator = audioContext.createOscillator();
  
  // Set frequencies to create the binaural beat effect
  leftOscillator.frequency.value = baseFrequency;
  rightOscillator.frequency.value = baseFrequency + beatFrequency;
  
  // Create gain nodes for each channel
  const leftGain = audioContext.createGain();
  const rightGain = audioContext.createGain();
  
  // Set initial gains
  leftGain.gain.value = 0.5;
  rightGain.gain.value = 0.5;
  
  // Create stereo panner to separate channels
  const leftPanner = audioContext.createStereoPanner();
  const rightPanner = audioContext.createStereoPanner();
  
  leftPanner.pan.value = -1; // Full left
  rightPanner.pan.value = 1;  // Full right
  
  // Connect the nodes
  leftOscillator.connect(leftPanner);
  rightOscillator.connect(rightPanner);
  
  leftPanner.connect(leftGain);
  rightPanner.connect(rightGain);
  
  // Start the oscillators
  leftOscillator.start();
  rightOscillator.start();
  
  return {
    leftOscillator,
    rightOscillator,
    leftGain,
    rightGain
  };
}
