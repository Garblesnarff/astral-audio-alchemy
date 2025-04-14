// Define the binaural beat presets
export interface Preset {
  id: string;
  name: string;
  description: string;
  baseFrequency: number;
  beatFrequency: number;
  category: 'relaxation' | 'sleep' | 'concentration' | 'meditation' | 'special' | 'lucid' | 'astral' | 'remote';
  benefits: string[];
  recommendedDuration: number; // in minutes
}

export const presets: Preset[] = [
  {
    id: 'relaxation',
    name: 'Deep Relaxation',
    description: 'Reduces stress and anxiety with gentle alpha waves',
    baseFrequency: 220,
    beatFrequency: 10,
    category: 'relaxation',
    benefits: ['Stress relief', 'Anxiety reduction', 'Mental clarity'],
    recommendedDuration: 20
  },
  {
    id: 'sleep',
    name: 'Sleep Induction',
    description: 'Helps you fall asleep faster with delta waves',
    baseFrequency: 180,
    beatFrequency: 3,
    category: 'sleep',
    benefits: ['Fall asleep faster', 'Deeper sleep', 'Dream enhancement'],
    recommendedDuration: 45
  },
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
    id: 'creativity',
    name: 'Creative Flow',
    description: 'Stimulates creativity and imagination with alpha-theta waves',
    baseFrequency: 210,
    beatFrequency: 7.5,
    category: 'concentration',
    benefits: ['Enhanced creativity', 'New perspectives', 'Flow state'],
    recommendedDuration: 25
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
  },
  {
    id: 'alien',
    name: 'Alien Summoning Dog-Whistle',
    description: 'Special frequency configuration to attract otherworldly beings',
    baseFrequency: 100, // Modulated to create 7.83 Hz (Schumann resonance)
    beatFrequency: 7.83,
    category: 'special',
    benefits: ['Interdimensional communication', 'Enhanced psychic abilities', 'UFO spotting'],
    recommendedDuration: 15
  },
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
  },
  {
    id: 'astral-deep-theta',
    name: 'Deep Theta Astral',
    description: 'Theta waves focused at 6.3 Hz for astral travel',
    baseFrequency: 200,
    beatFrequency: 6.3,
    category: 'astral',
    benefits: ['Astral projection', 'Out-of-body experience', 'Heightened awareness'],
    recommendedDuration: 60
  },
  {
    id: 'astral-epsilon-lambda',
    name: 'Epsilon-Lambda Mix',
    description: 'Combined very low and high frequencies for separation',
    baseFrequency: 100,
    beatFrequency: 0.5,
    category: 'astral',
    benefits: ['Energy body separation', 'Vibrational state', 'Ethereal awareness'],
    recommendedDuration: 45
  },
  {
    id: 'astral-777hz',
    name: '777 Hz Cosmic',
    description: 'Special frequency associated with spiritual travel',
    baseFrequency: 777,
    beatFrequency: 7.7,
    category: 'astral',
    benefits: ['Spiritual connectivity', 'Higher consciousness', 'Dimensional shifting'],
    recommendedDuration: 30
  },
  {
    id: 'astral-vibrational',
    name: 'Vibrational Stage',
    description: 'Progressive frequencies to navigate the vibrational stage',
    baseFrequency: 210,
    beatFrequency: 6.5,
    category: 'astral',
    benefits: ['Intensified vibrations', 'Energy activation', 'Separation assistance'],
    recommendedDuration: 40
  },
  {
    id: 'astral-progressive',
    name: 'Full Astral Journey',
    description: 'Complete guided sequence through all stages of astral projection',
    baseFrequency: 200,
    beatFrequency: 10,
    category: 'astral',
    benefits: ['Complete experience', 'Guided process', 'Safe return'],
    recommendedDuration: 75
  },
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
