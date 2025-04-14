
import { Preset } from './types';

export const meditationPresets: Preset[] = [
  {
    id: 'meditation',
    name: 'Meditation Enhancement',
    description: 'Facilitates deeper meditation with theta waves',
    baseFrequency: 432,
    beatFrequency: 6,
    category: 'meditation',
    benefits: ['Deeper meditation', 'Spiritual awareness', 'Mind-body connection'],
    recommendedDuration: 20
  },
  {
    id: 'healing',
    name: 'Healing Resonance',
    description: 'Promotes physical healing and relaxation with the "miracle tone"',
    baseFrequency: 528,
    beatFrequency: 5,
    category: 'meditation',
    benefits: ['Cell regeneration', 'DNA repair', 'Overall wellbeing'],
    recommendedDuration: 30
  }
];
