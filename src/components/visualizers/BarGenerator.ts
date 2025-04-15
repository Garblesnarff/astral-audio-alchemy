import { useMemo } from 'react';

export type BarType = {
  height: number;
  delay: number;
  color?: string;
};

// Default bar configuration
export const generateDefaultBars = (): BarType[] => {
  const bars: BarType[] = [];
  for (let i = 0; i < 100; i++) {
    const height = Math.random() * 50 + 5;
    const delay = i * 0.02;
    bars.push({ height, delay });
  }
  return bars;
};

// Alien-specific bar configuration
export const generateAlienBars = (): BarType[] => {
  const bars: BarType[] = [];
  for (let i = 0; i < 100; i++) {
    const height = Math.random() * 60 + 10;
    const delay = i * 0.03;
    const color = `rgba(138, 43, 226, ${Math.random() * 0.8 + 0.2})`; // Purple with varying opacity
    bars.push({ height, delay, color });
  }
  return bars;
};

// Astral Projection-specific bar configuration
export const generateAstralBars = (preset: string): BarType[] => {
  const bars: BarType[] = [];
  let primaryColor = 'rgba(255, 0, 255, 0.6)'; // Default pink

  if (preset.includes('deep-theta')) {
    primaryColor = 'rgba(148, 0, 211, 0.6)'; // Dark violet
  } else if (preset.includes('epsilon-lambda')) {
    primaryColor = 'rgba(75, 0, 130, 0.6)'; // Indigo
  } else if (preset.includes('777hz')) {
    primaryColor = 'rgba(238, 130, 238, 0.6)'; // Violet
  } else if (preset.includes('vibrational')) {
    primaryColor = 'rgba(218, 112, 214, 0.6)'; // Orchid
  }

  for (let i = 0; i < 100; i++) {
    const height = Math.random() * 40 + 10;
    const delay = i * 0.025;
    const color = primaryColor;
    bars.push({ height, delay, color });
  }
  return bars;
};

// Remote Viewing-specific bar configuration
export const generateRemoteViewingBars = (preset: string): BarType[] => {
  const bars: BarType[] = [];
  let primaryColor = 'rgba(75, 0, 130, 0.6)'; // Default indigo

  if (preset.includes('alpha')) {
    primaryColor = 'rgba(0, 0, 255, 0.6)'; // Blue
  } else if (preset.includes('beta-theta')) {
    primaryColor = 'rgba(0, 100, 0, 0.6)'; // Dark green
  } else if (preset.includes('focused')) {
    primaryColor = 'rgba(255, 140, 0, 0.6)'; // Dark orange
  } else if (preset.includes('crv')) {
    primaryColor = 'rgba(139, 0, 0, 0.6)'; // Dark red
  } else if (preset.includes('erv')) {
    primaryColor = 'rgba(107, 142, 35, 0.6)'; // Olive drab
  } else if (preset.includes('arv')) {
    primaryColor = 'rgba(0, 139, 139, 0.6)'; // Dark cyan
  }

  for (let i = 0; i < 100; i++) {
    const height = Math.random() * 35 + 5;
    const delay = i * 0.02;
    const color = primaryColor;
    bars.push({ height, delay, color });
  }
  return bars;
};

// Lucid Dreaming-specific bar configuration
export const generateLucidDreamingBars = (preset: string): BarType[] => {
  const bars: BarType[] = [];
  let primaryColor = 'rgba(138, 43, 226, 0.7)'; // Default violet

  if (preset.includes('advanced')) {
    primaryColor = 'rgba(75, 0, 130, 0.7)'; // Indigo
  } else if (preset.includes('gamma')) {
    primaryColor = 'rgba(238, 130, 238, 0.7)'; // Violet
  } else if (preset.includes('wbtb')) {
    primaryColor = 'rgba(218, 112, 214, 0.7)'; // Orchid
  }

  for (let i = 0; i < 100; i++) {
    const height = Math.random() * 40 + 10;
    const delay = i * 0.025;
    const color = primaryColor;
    bars.push({ height, delay, color });
  }
  return bars;
};

export const generateGatewayProcessBars = (preset: string): BarType[] => {
  const bars: BarType[] = [];
  
  let primaryColor = '#06b6d4'; // Default cyan for focus10
  
  // Set color based on the focus level in the preset
  if (preset.includes('focus12')) {
    primaryColor = '#3b82f6'; // Blue for focus12
  } else if (preset.includes('focus15')) {
    primaryColor = '#6366f1'; // Indigo for focus15
  } else if (preset.includes('focus21')) {
    primaryColor = '#8b5cf6'; // Purple for focus21
  }
  
  // Generate bars with slight randomization
  for (let i = 0; i < 100; i++) {
    const height = Math.random() * 30 + 5; // Random height between 5 and 35
    const delay = i * 0.01; // Progressive delay
    
    // Create alternating color pattern
    const isEven = i % 2 === 0;
    const color = isEven ? primaryColor : `${primaryColor}80`; // Full color or 50% opacity
    
    bars.push({ height, delay, color });
  }
  
  return bars;
};
