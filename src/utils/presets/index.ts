
import { Preset } from './types';
import { relaxationPresets } from './relaxationPresets';
import { sleepPresets } from './sleepPresets';
import { concentrationPresets } from './concentrationPresets';
import { meditationPresets } from './meditationPresets';
import { specialPresets } from './specialPresets';
import { lucidDreamingPresets } from './lucidDreamingPresets';
import { astralProjectionPresets } from './astralProjectionPresets';
import { remoteViewingPresets } from './remoteViewingPresets';
import { gatewayProcessPresets } from './gatewayProcessPresets';

// Combine all presets
export const presets: Preset[] = [
  ...relaxationPresets,
  ...sleepPresets,
  ...concentrationPresets, 
  ...meditationPresets,
  ...specialPresets,
  ...lucidDreamingPresets,
  ...astralProjectionPresets,
  ...remoteViewingPresets,
  ...gatewayProcessPresets
];

// Re-export the Preset type
export type { Preset };

// Get a preset by ID
export const getPresetById = (id: string): Preset | undefined => {
  return presets.find(preset => preset.id === id);
};

// Get presets by category
export const getPresetsByCategory = (category: string): Preset[] => {
  return presets.filter(preset => preset.category === category);
};

// Get all available categories
export const getCategories = (): string[] => {
  const categories = presets.map(preset => preset.category);
  return [...new Set(categories)];
};

// Get all presets
export const getAllPresets = (): Preset[] => {
  return presets;
};
