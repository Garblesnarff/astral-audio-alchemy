
import { Preset } from './types';

export const gatewayProcessPresets: Preset[] = [
  // Wave I: Focus 10 Development
  {
    id: 'gateway-focus10-intro',
    name: 'Focus 10: Mind Awake, Body Asleep',
    description: 'First experience of the Mind Awake, Body Asleep state',
    baseFrequency: 100,
    beatFrequency: 4.5, // Mixed delta for body, alpha for mind
    category: 'gateway',
    benefits: ['Deep physical relaxation', 'Heightened mental awareness', 'Detachment from physical sensations'],
    recommendedDuration: 45
  },
  {
    id: 'gateway-focus10-advanced',
    name: 'Focus 10: Advanced',
    description: 'Deepening the Focus 10 experience with resonant tuning',
    baseFrequency: 136.1,
    beatFrequency: 5.5,
    category: 'gateway',
    benefits: ['Deeper state access', 'Enhanced mind-body separation', 'Increased energy awareness'],
    recommendedDuration: 45
  },
  {
    id: 'gateway-focus10-problem',
    name: 'Focus 10: Problem Solving',
    description: 'Using Focus 10 state for creative problem solving',
    baseFrequency: 210.42,
    beatFrequency: 6.3,
    category: 'gateway',
    benefits: ['Enhanced creativity', 'Subconscious problem solving', 'Intuitive insights'],
    recommendedDuration: 40
  },
  
  // Wave II: Focus 12 Development
  {
    id: 'gateway-focus12-intro',
    name: 'Focus 12: Expanded Awareness',
    description: 'First exposure to the expanded awareness state',
    baseFrequency: 210,
    beatFrequency: 7.5,
    category: 'gateway',
    benefits: ['Expanded perception', 'Access to deeper consciousness', 'Enhanced intuitive abilities'],
    recommendedDuration: 50
  },
  {
    id: 'gateway-focus12-energy',
    name: 'Focus 12: Energy Bar Tool',
    description: 'Energy manipulation technique for healing and manifestation',
    baseFrequency: 144,
    beatFrequency: 8.4,
    category: 'gateway',
    benefits: ['Energy manipulation skills', 'Self-healing capabilities', 'Manifestation practice'],
    recommendedDuration: 45
  },
  
  // Wave III: Focus 15 Development
  {
    id: 'gateway-focus15-intro',
    name: 'Focus 15: No Time State',
    description: 'Accessing the state beyond time and space',
    baseFrequency: 136.1,
    beatFrequency: 3.5,
    category: 'gateway',
    benefits: ['Transcending time perception', 'Accessing non-physical reality', 'Higher consciousness states'],
    recommendedDuration: 60
  },
  {
    id: 'gateway-focus15-future',
    name: 'Focus 15: Future Patterning',
    description: 'Exploring and influencing potential future timelines',
    baseFrequency: 144,
    beatFrequency: 4.5,
    category: 'gateway',
    benefits: ['Future timeline exploration', 'Probability shifting', 'Precognitive development'],
    recommendedDuration: 55
  },
  
  // Wave IV: Focus 21 Introduction
  {
    id: 'gateway-focus21-intro',
    name: 'Focus 21: Other Energy Systems',
    description: 'Introduction to interdimensional consciousness',
    baseFrequency: 288,
    beatFrequency: 1.5,
    category: 'gateway',
    benefits: ['Advanced consciousness exploration', 'Interdimensional awareness', 'Contact with non-physical entities'],
    recommendedDuration: 70
  }
];
