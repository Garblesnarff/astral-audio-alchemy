
import { Preset } from './types';

export const remoteViewingPresets: Preset[] = [
  {
    id: 'remote-theta-delta',
    name: 'Theta-Delta Mix',
    description: 'Optimal 4 Hz frequency for remote viewing information reception',
    baseFrequency: 100,
    beatFrequency: 4,
    category: 'remote',
    benefits: ['Enhanced receptivity', 'Improved intuition', 'Signal clarity'],
    recommendedDuration: 30
  },
  {
    id: 'remote-alpha',
    name: 'Alpha Enhancement',
    description: 'Alert but relaxed state for data analysis and processing',
    baseFrequency: 120,
    beatFrequency: 10,
    category: 'remote',
    benefits: ['Mental clarity', 'Data analysis', 'Enhanced recall'],
    recommendedDuration: 25
  },
  {
    id: 'remote-beta-theta',
    name: 'Beta-Theta Cycling',
    description: 'Alternates between focus and receptivity for optimal information flow',
    baseFrequency: 160,
    beatFrequency: 5,
    category: 'remote',
    benefits: ['Balanced reception', 'Improved focus', 'Enhanced perception'],
    recommendedDuration: 45
  },
  {
    id: 'remote-focused',
    name: 'Focused Viewing',
    description: 'Targeted frequency set with interval markers for guided sessions',
    baseFrequency: 140,
    beatFrequency: 4.5,
    category: 'remote',
    benefits: ['Target focus', 'Time awareness', 'Structured viewing'],
    recommendedDuration: 35
  },
  {
    id: 'remote-crv',
    name: 'CRV Protocol',
    description: 'Specialized frequency progression for Coordinate Remote Viewing method',
    baseFrequency: 200,
    beatFrequency: 5,
    category: 'remote',
    benefits: ['6-stage progression', 'Structured protocol', 'Analytical enhancement'],
    recommendedDuration: 45
  },
  {
    id: 'remote-erv',
    name: 'ERV Protocol',
    description: 'Extended Remote Viewing with deeper delta wave entrainment',
    baseFrequency: 100,
    beatFrequency: 3,
    category: 'remote',
    benefits: ['Deep receptivity', 'Extended duration', 'Enhanced detail'],
    recommendedDuration: 60
  },
  {
    id: 'remote-arv',
    name: 'ARV Protocol',
    description: 'Associative Remote Viewing specialized frequency patterns',
    baseFrequency: 180,
    beatFrequency: 10,
    category: 'remote',
    benefits: ['Associative thinking', 'Future outcomes', 'Pattern recognition'],
    recommendedDuration: 30
  }
];
