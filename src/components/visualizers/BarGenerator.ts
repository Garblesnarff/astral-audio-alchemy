
export interface BarType {
  height: number;
  delay: number;
  color?: string;
}

export const generateDefaultBars = (totalBars: number = 60): BarType[] => {
  return Array.from({ length: totalBars }).map((_, i) => {
    return {
      height: Math.random() * 50 + 5,
      delay: i % 5
    };
  });
};

export const generateAlienBars = (totalBars: number = 60): BarType[] => {
  return Array.from({ length: totalBars }).map((_, i) => {
    let height, delay, color;
    
    // Assign different patterns for different frequency components
    if (i % 17 === 0) {
      // 17kHz ultrasonic ping
      height = Math.random() * 90 + 30;
      delay = i % 2;
      color = 'bg-purple-500';
    } else if (i % 5 === 0) {
      // 528 Hz harmonic (spiritual frequency)
      height = Math.random() * 65 + 20;
      delay = i % 3;
      color = 'bg-green-400';
    } else if (i % 7 === 0) {
      // Schumann resonance (7.83 Hz via 100 Hz carrier)
      height = Math.random() * 75 + 15;
      delay = i % 4;
      color = 'bg-blue-400';
    } else if (i % 3 === 0) {
      // 432 Hz ambient pad
      height = Math.random() * 45 + 10;
      delay = i % 5;
      color = 'bg-amber-300';
    } else if (i % 10 === 0) {
      // 2.5kHz chirps
      height = Math.random() * 70 + 20;
      delay = i % 2;
      color = 'bg-red-400';
    } else {
      // Breath layer
      height = Math.random() * 35 + 5;
      delay = i % 6;
      color = 'bg-primary';
    }
    
    return { height, delay, color };
  });
};

export const generateAstralBars = (preset: string, totalBars: number = 60): BarType[] => {
  return Array.from({ length: totalBars }).map((_, i) => {
    let height, delay, color;
    
    // Assign different patterns for different astral projection patterns
    if (preset === 'astral-deep-theta') {
      // Deep theta pattern (6.3 Hz)
      if (i % 7 === 0) {
        height = Math.random() * 80 + 35;
        delay = i % 3;
        color = 'bg-fuchsia-500';
      } else if (i % 3 === 0) {
        height = Math.random() * 60 + 20;
        delay = i % 5;
        color = 'bg-indigo-400';
      } else {
        height = Math.random() * 40 + 10;
        delay = i % 6;
        color = 'bg-purple-400';
      }
    } else if (preset === 'astral-epsilon-lambda') {
      // Epsilon-Lambda mix pattern
      if (i % 11 === 0) {
        height = Math.random() * 90 + 30; // Lambda spikes
        delay = i % 2;
        color = 'bg-fuchsia-500';
      } else if (i % 12 === 0) {
        height = Math.random() * 75 + 40; // Secondary lambda
        delay = i % 3;
        color = 'bg-violet-500';
      } else {
        // Epsilon ultra-low baseline
        height = Math.random() * 20 + 5;
        delay = i % 7;
        color = 'bg-indigo-400';
      }
    } else if (preset === 'astral-777hz') {
      // 777 Hz special frequency pattern
      if (i % 7 === 0) {
        height = Math.random() * 85 + 40;
        delay = i % 2;
        color = 'bg-amber-400';
      } else if (i % 3 === 0) {
        height = Math.random() * 60 + 30;
        delay = i % 4;
        color = 'bg-fuchsia-500';
      } else if (i % 5 === 0) {
        height = Math.random() * 70 + 25;
        delay = i % 3;
        color = 'bg-violet-400';
      } else {
        height = Math.random() * 35 + 10;
        delay = i % 5;
        color = 'bg-indigo-400';
      }
    } else if (preset === 'astral-vibrational') {
      // Vibrational stage pattern - more chaotic
      const phase = Math.sin(i * 0.1) * 0.5 + 0.5; // Value between 0-1
      height = Math.random() * 40 + 20 + phase * 60;
      delay = i % 4;
      
      if (height > 70) {
        color = 'bg-fuchsia-500';
      } else if (height > 50) {
        color = 'bg-violet-500';
      } else if (height > 30) {
        color = 'bg-indigo-400';
      } else {
        color = 'bg-purple-400';
      }
    } else if (preset === 'astral-progressive') {
      // Progressive sequence - combination of patterns
      if (i % 8 === 0) {
        height = Math.random() * 85 + 40;
        delay = i % 3;
        color = 'bg-fuchsia-500';
      } else if (i % 7 === 0) {
        height = Math.random() * 70 + 30;
        delay = i % 2;
        color = 'bg-violet-500';
      } else if (i % 5 === 0) {
        height = Math.random() * 60 + 20;
        delay = i % 4;
        color = 'bg-indigo-400';
      } else if (i % 3 === 0) {
        height = Math.random() * 50 + 15;
        delay = i % 5;
        color = 'bg-purple-400';
      } else {
        height = Math.random() * 30 + 10;
        delay = i % 6;
        color = 'bg-blue-400';
      }
    } else {
      // Default astral pattern
      height = Math.random() * 60 + 10;
      delay = i % 5;
      color = 'bg-fuchsia-400';
    }
    
    return { height, delay, color };
  });
};

export const generateRemoteViewingBars = (preset: string, totalBars: number = 60): BarType[] => {
  return Array.from({ length: totalBars }).map((_, i) => {
    let height, delay, color;
    
    // Assign different patterns for different remote viewing patterns
    if (preset === 'remote-theta-delta') {
      // Theta-Delta mix pattern (4 Hz)
      if (i % 8 === 0) {
        height = Math.random() * 75 + 30;
        delay = i % 3;
        color = 'bg-indigo-500';
      } else if (i % 4 === 0) {
        height = Math.random() * 55 + 20;
        delay = i % 5;
        color = 'bg-purple-400';
      } else {
        height = Math.random() * 35 + 10;
        delay = i % 6;
        color = 'bg-indigo-400';
      }
    } else if (preset === 'remote-alpha') {
      // Alpha enhancement pattern
      if (i % 7 === 0) {
        height = Math.random() * 65 + 35;
        delay = i % 2;
        color = 'bg-indigo-500';
      } else if (i % 3 === 0) {
        height = Math.random() * 80 + 25;
        delay = i % 4;
        color = 'bg-blue-400';
      } else {
        height = Math.random() * 50 + 15;
        delay = i % 5;
        color = 'bg-indigo-400';
      }
    } else if (preset === 'remote-beta-theta') {
      // Beta-Theta cycling pattern
      if (i % 11 === 0) {
        height = Math.random() * 85 + 30; // Beta spikes
        delay = i % 2;
        color = 'bg-blue-500';
      } else if (i % 12 === 0) {
        height = Math.random() * 70 + 40; // Secondary beta
        delay = i % 3;
        color = 'bg-indigo-500';
      } else {
        // Theta baseline
        height = Math.random() * 40 + 10;
        delay = i % 7;
        color = 'bg-indigo-400';
      }
    } else if (preset === 'remote-focused') {
      // Focused viewing pattern with marker pulses
      if (i % 15 === 0) {
        height = Math.random() * 90 + 30; // Focus markers
        delay = i % 2;
        color = 'bg-indigo-600';
      } else if (i % 5 === 0) {
        height = Math.random() * 60 + 25;
        delay = i % 3;
        color = 'bg-indigo-500';
      } else if (i % 3 === 0) {
        height = Math.random() * 45 + 20;
        delay = i % 4;
        color = 'bg-purple-400';
      } else {
        height = Math.random() * 30 + 10;
        delay = i % 6;
        color = 'bg-indigo-400';
      }
    } else if (preset.startsWith('remote-crv') || preset === 'remote-crv') {
      // CRV protocol pattern - structured waves
      const phase = Math.sin(i * 0.2) * 0.5 + 0.5; // Value between 0-1
      height = Math.random() * 30 + 20 + phase * 50;
      delay = i % 4;
      
      if (height > 70) {
        color = 'bg-indigo-500';
      } else if (height > 50) {
        color = 'bg-purple-400';
      } else if (height > 30) {
        color = 'bg-blue-400';
      } else {
        color = 'bg-indigo-300';
      }
    } else if (preset.startsWith('remote-erv') || preset === 'remote-erv') {
      // ERV protocol pattern - deeper, slower waves
      if (i % 10 === 0) {
        height = Math.random() * 70 + 30;
        delay = i % 3;
        color = 'bg-indigo-600';
      } else if (i % 6 === 0) {
        height = Math.random() * 45 + 20;
        delay = i % 4;
        color = 'bg-indigo-500';
      } else {
        height = Math.random() * 25 + 10; // Lower baseline for deeper state
        delay = i % 7;
        color = 'bg-indigo-400';
      }
    } else if (preset.startsWith('remote-arv') || preset === 'remote-arv') {
      // ARV protocol pattern - alternating patterns
      if (i % 12 === 0) {
        height = Math.random() * 80 + 35; // Association markers
        delay = i % 2;
        color = 'bg-blue-500';
      } else if (i % 7 === 0) {
        height = Math.random() * 70 + 30; // Secondary markers
        delay = i % 3;
        color = 'bg-indigo-500';
      } else if (i % 4 === 0) {
        height = Math.random() * 50 + 20;
        delay = i % 4;
        color = 'bg-purple-400';
      } else {
        height = Math.random() * 30 + 10;
        delay = i % 5;
        color = 'bg-indigo-300';
      }
    } else {
      // Default remote viewing pattern
      height = Math.random() * 60 + 10;
      delay = i % 5;
      color = 'bg-indigo-400';
    }
    
    return { height, delay, color };
  });
};

export const generateLucidDreamingBars = (preset: string, totalBars: number = 60): BarType[] => {
  // For now, a simple implementation - could be expanded similarly to the other generators
  return Array.from({ length: totalBars }).map((_, i) => {
    let height = Math.random() * 60 + 10;
    let delay = i % 5;
    let color = 'bg-indigo-400';
    
    if (i % 7 === 0) {
      height = Math.random() * 70 + 20;
      color = 'bg-indigo-500';
    } else if (i % 3 === 0) {
      height = Math.random() * 50 + 15;
      color = 'bg-indigo-400';
    }
    
    return { height, delay, color };
  });
};
