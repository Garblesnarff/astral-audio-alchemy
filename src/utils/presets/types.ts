
import { MeditationScript, VoiceSettings } from '@/types/meditation';

// Define the binaural beat preset types
export interface Preset {
  id: string;
  name: string;
  description: string;
  baseFrequency: number;
  beatFrequency: number;
  category: 'relaxation' | 'sleep' | 'concentration' | 'meditation' | 'special' | 'lucid' | 'astral' | 'remote' | 'gateway' | 'guided';
  benefits: string[];
  recommendedDuration: number; // in minutes
  meditationScript?: MeditationScript;
  hasVoiceGuide?: boolean;
  voiceSettings?: VoiceSettings;
}
