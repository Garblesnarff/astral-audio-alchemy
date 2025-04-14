
import { Preset } from './types';

export const concentrationPresets: Preset[] = [
  {
    id: 'focus',
    name: 'Deep Focus',
    description: 'Enhances concentration and problem-solving with beta waves',
    baseFrequency: 250,
    beatFrequency: 15,
    category: 'concentration',
    benefits: ['Improved concentration', 'Mental endurance', 'Problem solving'],
    recommendedDuration: 30
  },
  {
    id: 'creativity',
    name: 'Creative Flow',
    description: 'Stimulates creativity and imagination with alpha-theta waves',
    baseFrequency: 210,
    beatFrequency: 7.5,
    category: 'concentration',
    benefits: ['Enhanced creativity', 'New perspectives', 'Flow state'],
    recommendedDuration: 25
  }
];
