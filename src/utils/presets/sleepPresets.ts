
import { Preset } from './types';

export const sleepPresets: Preset[] = [
  {
    id: 'sleep',
    name: 'Sleep Induction',
    description: 'Helps you fall asleep faster with delta waves',
    baseFrequency: 180,
    beatFrequency: 3,
    category: 'sleep',
    benefits: ['Fall asleep faster', 'Deeper sleep', 'Dream enhancement'],
    recommendedDuration: 45
  }
];
