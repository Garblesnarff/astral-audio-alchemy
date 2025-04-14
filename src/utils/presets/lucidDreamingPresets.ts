
import { Preset } from './types';

export const lucidDreamingPresets: Preset[] = [
  {
    id: 'lucid-basic',
    name: 'Basic Lucid Dreaming',
    description: 'Gentle theta entrainment for lucid dream induction',
    baseFrequency: 200,
    beatFrequency: 4.5, // Theta range for dream state
    category: 'lucid',
    benefits: ['Dream awareness', 'Easier dream recall', 'Gentle induction'],
    recommendedDuration: 45
  },
  {
    id: 'lucid-advanced',
    name: 'Advanced Lucid Dreaming',
    description: 'Theta-alpha mix for deeper dream awareness',
    baseFrequency: 210,
    beatFrequency: 6, // Mid-theta range
    category: 'lucid',
    benefits: ['Increased dream control', 'Longer lucid dreams', 'Enhanced awareness'],
    recommendedDuration: 60
  },
  {
    id: 'lucid-gamma',
    name: 'Gamma-Enhanced Dreams',
    description: 'Adds gamma components to mimic lucid dream brain activity',
    baseFrequency: 220,
    beatFrequency: 5, // Theta with gamma overtones
    category: 'lucid',
    benefits: ['Heightened dream consciousness', 'Vivid dream scenarios', 'Greater recall'],
    recommendedDuration: 40
  },
  {
    id: 'lucid-wbtb',
    name: 'Wake-Back-To-Bed (WBTB)',
    description: 'Specialized sequence for the WBTB lucid dreaming technique',
    baseFrequency: 200,
    beatFrequency: 4, // Low theta for deep dreaming
    category: 'lucid',
    benefits: ['Targeted wake-up timing', 'REM-focused induction', 'High success rate'],
    recommendedDuration: 90
  }
];
