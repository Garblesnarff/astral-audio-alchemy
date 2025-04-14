
// Define the binaural beat preset types
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
