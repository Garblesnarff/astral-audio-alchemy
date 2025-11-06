import React, { useEffect, useState } from 'react';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Brain, Zap, Eye, Sparkles } from 'lucide-react';

interface ConsciousnessStateTrackerProps {
  beatFrequency: number;
  baseFrequency: number;
  isPlaying: boolean;
  currentPreset?: string;
}

interface BrainwaveState {
  name: string;
  range: [number, number];
  color: string;
  state: string;
  icon: string;
  description: string;
}

const brainwaveStates: BrainwaveState[] = [
  {
    name: 'Epsilon',
    range: [0, 0.5],
    color: 'from-purple-900 to-black',
    state: 'Extraordinary States',
    icon: '🌌',
    description: 'Profound unity consciousness, interdimensional awareness'
  },
  {
    name: 'Delta',
    range: [0.5, 4],
    color: 'from-indigo-900 to-purple-900',
    state: 'Deep Sleep / Healing',
    icon: '😴',
    description: 'Unconscious, regeneration, deep healing'
  },
  {
    name: 'Theta',
    range: [4, 8],
    color: 'from-purple-700 to-indigo-700',
    state: 'Deep Meditation',
    icon: '🧘',
    description: 'Deep meditation, vivid imagery, intuition, memory access'
  },
  {
    name: 'Alpha',
    range: [8, 13],
    color: 'from-blue-600 to-purple-600',
    state: 'Relaxed Focus',
    icon: '🌊',
    description: 'Relaxed alertness, light meditation, learning readiness'
  },
  {
    name: 'Beta',
    range: [13, 30],
    color: 'from-cyan-500 to-blue-500',
    state: 'Active Thinking',
    icon: '💡',
    description: 'Active concentration, problem-solving, decision making'
  },
  {
    name: 'Gamma',
    range: [30, 100],
    color: 'from-yellow-400 to-orange-500',
    state: 'Peak Performance',
    icon: '⚡',
    description: 'Hyper-focus, peak awareness, transcendent experiences'
  }
];

const getChakraFromFrequency = (freq: number): { name: string; color: string; symbol: string } => {
  if (freq < 200) return { name: 'Root', color: 'red', symbol: '🔴' };
  if (freq < 300) return { name: 'Sacral', color: 'orange', symbol: '🟠' };
  if (freq < 400) return { name: 'Solar Plexus', color: 'yellow', symbol: '🟡' };
  if (freq < 500) return { name: 'Heart', color: 'green', symbol: '💚' };
  if (freq < 700) return { name: 'Throat', color: 'blue', symbol: '🔵' };
  if (freq < 900) return { name: 'Third Eye', color: 'indigo', symbol: '🟣' };
  return { name: 'Crown', color: 'violet', symbol: '👑' };
};

const getConsciousnessLevel = (beatFreq: number, baseFreq: number): {
  level: number;
  description: string;
} => {
  // Calculate consciousness level (0-100) based on frequencies
  let level = 50; // baseline

  // Lower frequencies = deeper states (higher consciousness access)
  if (beatFreq < 1) level += 40;
  else if (beatFreq < 4) level += 30;
  else if (beatFreq < 8) level += 20;
  else if (beatFreq > 30) level += 25; // Gamma also increases consciousness

  // Sacred frequencies boost consciousness level
  if (baseFreq === 432 || baseFreq === 528 || baseFreq === 7.83) level += 10;
  if (baseFreq === 963 || baseFreq === 108) level += 20;

  // Cap at 100
  level = Math.min(100, level);

  let description = 'Ordinary Consciousness';
  if (level > 90) description = 'Unity Consciousness';
  else if (level > 80) description = 'Cosmic Consciousness';
  else if (level > 70) description = 'Expanded Awareness';
  else if (level > 60) description = 'Heightened Perception';

  return { level, description };
};

const ConsciousnessStateTracker: React.FC<ConsciousnessStateTrackerProps> = ({
  beatFrequency,
  baseFrequency,
  isPlaying,
  currentPreset
}) => {
  const [sessionDuration, setSessionDuration] = useState(0);
  const [currentState, setCurrentState] = useState<BrainwaveState | null>(null);
  const [consciousnessLevel, setConsciousnessLevel] = useState({ level: 50, description: 'Normal' });
  const [chakra, setChakra] = useState({ name: '', color: '', symbol: '' });

  useEffect(() => {
    // Find current brainwave state
    const state = brainwaveStates.find(
      s => beatFrequency >= s.range[0] && beatFrequency <= s.range[1]
    );
    setCurrentState(state || null);

    // Calculate consciousness level
    const level = getConsciousnessLevel(beatFrequency, baseFrequency);
    setConsciousnessLevel(level);

    // Get chakra resonance
    const chakraResonance = getChakraFromFrequency(baseFrequency);
    setChakra(chakraResonance);
  }, [beatFrequency, baseFrequency]);

  useEffect(() => {
    let interval: number | null = null;

    if (isPlaying) {
      interval = window.setInterval(() => {
        setSessionDuration(prev => prev + 1);
      }, 1000);
    } else {
      setSessionDuration(0);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isPlaying]);

  const formatDuration = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <Card className="p-6 bg-gradient-to-br from-purple-950/50 to-black border-purple-500/30">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Brain className="w-5 h-5 text-purple-400" />
            <h3 className="text-lg font-semibold text-purple-100">Consciousness State Tracker</h3>
          </div>
          {isPlaying && (
            <Badge variant="outline" className="bg-green-500/20 text-green-400 border-green-500/50">
              <span className="animate-pulse mr-2">●</span>
              Active
            </Badge>
          )}
        </div>

        {/* Session Duration */}
        <div className="text-center">
          <div className="text-3xl font-bold text-purple-200 font-mono">
            {formatDuration(sessionDuration)}
          </div>
          <div className="text-xs text-purple-400 mt-1">Session Duration</div>
        </div>

        {/* Current Brainwave State */}
        {currentState && (
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-purple-300">Brainwave State</span>
              <span className="text-2xl">{currentState.icon}</span>
            </div>

            <div className={`p-4 rounded-lg bg-gradient-to-r ${currentState.color} border border-purple-500/30`}>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xl font-bold text-white">{currentState.name}</span>
                <Badge variant="secondary" className="bg-white/20 text-white">
                  {beatFrequency.toFixed(1)} Hz
                </Badge>
              </div>
              <div className="text-sm text-purple-100 font-medium mb-1">{currentState.state}</div>
              <div className="text-xs text-purple-200/80">{currentState.description}</div>
            </div>
          </div>
        )}

        {/* Consciousness Level */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-yellow-400" />
              <span className="text-sm text-purple-300">Consciousness Level</span>
            </div>
            <span className="text-sm font-bold text-purple-100">
              {consciousnessLevel.description}
            </span>
          </div>

          <div className="space-y-2">
            <Progress
              value={consciousnessLevel.level}
              className="h-3"
            />
            <div className="flex justify-between text-xs text-purple-400">
              <span>Ordinary</span>
              <span>Expanded</span>
              <span>Cosmic</span>
              <span>Unity</span>
            </div>
          </div>
        </div>

        {/* Chakra Resonance */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Eye className="w-4 h-4 text-indigo-400" />
              <span className="text-sm text-purple-300">Chakra Resonance</span>
            </div>
            <span className="text-xl">{chakra.symbol}</span>
          </div>

          <div className="p-3 rounded-lg bg-purple-900/30 border border-purple-500/20">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-purple-100">{chakra.name} Chakra</span>
              <span className="text-xs text-purple-300">{baseFrequency.toFixed(0)} Hz</span>
            </div>
          </div>
        </div>

        {/* Frequency Display */}
        <div className="grid grid-cols-2 gap-4 pt-4 border-t border-purple-500/20">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <Zap className="w-3 h-3 text-cyan-400" />
              <span className="text-xs text-purple-400">Base Frequency</span>
            </div>
            <div className="text-lg font-bold text-purple-100 font-mono">
              {baseFrequency.toFixed(1)} Hz
            </div>
          </div>

          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <Zap className="w-3 h-3 text-purple-400" />
              <span className="text-xs text-purple-400">Beat Frequency</span>
            </div>
            <div className="text-lg font-bold text-purple-100 font-mono">
              {beatFrequency.toFixed(1)} Hz
            </div>
          </div>
        </div>

        {/* Current Preset */}
        {currentPreset && (
          <div className="pt-3 border-t border-purple-500/20">
            <div className="text-xs text-purple-400 mb-1">Active Preset</div>
            <div className="text-sm font-medium text-purple-100">{currentPreset}</div>
          </div>
        )}
      </div>
    </Card>
  );
};

export default ConsciousnessStateTracker;
