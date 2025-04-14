
// Define the binaural beat presets
export interface Preset {
  id: string;
  name: string;
  description: string;
  baseFrequency: number;
  beatFrequency: number;
  category: 'relaxation' | 'sleep' | 'concentration' | 'meditation' | 'special' | 'lucid';
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
  // Lucid Dreaming Presets
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
