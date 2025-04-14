
// Define the binaural beat preset types
export interface Preset {
  id: string;
  name: string;
  description: string;
  baseFrequency: number;
  beatFrequency: number;
  category: 'relaxation' | 'sleep' | 'concentration' | 'meditation' | 'special' | 'lucid' | 'astral' | 'remote' | 'gateway';
  benefits: string[];
  recommendedDuration: number; // in minutes
}
