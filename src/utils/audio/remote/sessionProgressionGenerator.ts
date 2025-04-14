
/**
 * Generates progressive frequency changes throughout a remote viewing session
 * based on the selected protocol (CRV, ERV, ARV)
 */
export function sessionProgressionGenerator(
  audioContext: AudioContext,
  masterGain: GainNode,
  protocol: string = 'crv'
): AudioNode[] {
  const nodes: AudioNode[] = [];
  
  // Create oscillators for progressive frequency changes
  const leftOsc = audioContext.createOscillator();
  const rightOsc = audioContext.createOscillator();
  
  // Create gain nodes for the oscillators
  const leftGain = audioContext.createGain();
  const rightGain = audioContext.createGain();
  
  // Connect the oscillators to their respective gain nodes
  leftOsc.connect(leftGain);
  rightOsc.connect(rightGain);
  
  // Connect the gain nodes to the master gain
  leftGain.connect(masterGain);
  rightGain.connect(masterGain);
  
  // Set up the initial frequencies based on the protocol
  switch (protocol.toLowerCase()) {
    case 'crv': // Coordinate Remote Viewing
      // Stage 1: Ideogram - Beta to Theta transition
      leftOsc.frequency.value = 200;
      rightOsc.frequency.value = 215; // 15 Hz beta
      
      // Schedule the 6-stage CRV protocol
      // Each stage has specific brainwave requirements
      
      // Stage 1: Ideogram (Beta -> Theta) - 5 minutes
      rightOsc.frequency.setValueAtTime(215, audioContext.currentTime);
      rightOsc.frequency.linearRampToValueAtTime(205, audioContext.currentTime + 300); // 5 Hz theta after 5 minutes
      
      // Stage 2: Sensory data (Theta) - 10 minutes
      rightOsc.frequency.setValueAtTime(205, audioContext.currentTime + 300);
      rightOsc.frequency.linearRampToValueAtTime(204, audioContext.currentTime + 900); // 4 Hz deep theta after 15 minutes
      
      // Stage 3: Emotions/Feelings (Theta/Alpha mix) - 5 minutes
      rightOsc.frequency.setValueAtTime(204, audioContext.currentTime + 900);
      rightOsc.frequency.linearRampToValueAtTime(208, audioContext.currentTime + 1200); // 8 Hz alpha after 20 minutes
      
      // Stage 4: Analytical data (Alpha) - 10 minutes
      rightOsc.frequency.setValueAtTime(208, audioContext.currentTime + 1200);
      rightOsc.frequency.linearRampToValueAtTime(210, audioContext.currentTime + 1800); // 10 Hz alpha after 30 minutes
      
      // Stage 5: Exploration (Alpha/Beta mix) - 10 minutes
      rightOsc.frequency.setValueAtTime(210, audioContext.currentTime + 1800);
      rightOsc.frequency.linearRampToValueAtTime(213, audioContext.currentTime + 2400); // 13 Hz beta after 40 minutes
      
      // Stage 6: Summary (Beta) - 5 minutes
      rightOsc.frequency.setValueAtTime(213, audioContext.currentTime + 2400);
      rightOsc.frequency.linearRampToValueAtTime(215, audioContext.currentTime + 2700); // 15 Hz beta after 45 minutes
      break;
      
    case 'erv': // Extended Remote Viewing
      // ERV focuses on deeper theta and delta states for extended periods
      leftOsc.frequency.value = 100;
      rightOsc.frequency.value = 103; // 3 Hz delta
      
      // Schedule the ERV protocol frequency changes
      // Initial delta state (3 Hz) - 15 minutes
      rightOsc.frequency.setValueAtTime(103, audioContext.currentTime);
      
      // Transition to deep theta (4 Hz) - 30 minutes
      rightOsc.frequency.linearRampToValueAtTime(104, audioContext.currentTime + 900); // After 15 minutes
      
      // Maintain theta (4-5 Hz) for extended period - 30 minutes
      rightOsc.frequency.linearRampToValueAtTime(105, audioContext.currentTime + 2700); // After 45 minutes
      
      // Gradual return to alpha (8 Hz) - 15 minutes
      rightOsc.frequency.linearRampToValueAtTime(108, audioContext.currentTime + 3600); // After 60 minutes
      break;
      
    case 'arv': // Associative Remote Viewing
      // ARV alternates between beta (associative thinking) and theta (receptive)
      leftOsc.frequency.value = 180;
      rightOsc.frequency.value = 190; // 10 Hz alpha
      
      // Schedule the ARV protocol frequency changes
      // Initial alpha state (10 Hz) for target familiarization - 5 minutes
      rightOsc.frequency.setValueAtTime(190, audioContext.currentTime);
      
      // Beta state (15 Hz) for association formation - 10 minutes
      rightOsc.frequency.linearRampToValueAtTime(195, audioContext.currentTime + 300); // After 5 minutes
      
      // Theta state (5 Hz) for information reception - 15 minutes
      rightOsc.frequency.linearRampToValueAtTime(185, audioContext.currentTime + 900); // After 15 minutes
      
      // Return to beta (15 Hz) for analytical association - 10 minutes
      rightOsc.frequency.linearRampToValueAtTime(195, audioContext.currentTime + 1800); // After 30 minutes
      break;
      
    default:
      // Default to a simple progression from beta to theta and back
      leftOsc.frequency.value = 150;
      rightOsc.frequency.value = 162; // 12 Hz alpha
      
      // Transition to theta (5 Hz) over 15 minutes
      rightOsc.frequency.linearRampToValueAtTime(155, audioContext.currentTime + 900);
      
      // Stay in theta for 15 minutes
      rightOsc.frequency.linearRampToValueAtTime(155, audioContext.currentTime + 1800);
      
      // Return to alpha over 15 minutes
      rightOsc.frequency.linearRampToValueAtTime(162, audioContext.currentTime + 2700);
  }
  
  // Start the oscillators
  leftOsc.start();
  rightOsc.start();
  
  // Add the nodes to the array for later cleanup
  nodes.push(leftOsc, rightOsc);
  
  return nodes;
}
