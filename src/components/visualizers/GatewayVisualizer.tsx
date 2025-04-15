
import React, { useEffect, useState } from 'react';
import { Brain } from 'lucide-react';
import audioEngine from '@/utils/audioEngine';
import HemisphereVisualization from './gateway/HemisphereVisualization';
import FocusLevelIndicator from './gateway/FocusLevelIndicator';

interface GatewayVisualizerProps {
  isPlaying: boolean;
  bars: Array<{ height: number; delay: number; color?: string }>;
  particles: Array<{ x: number; y: number; size: number; speed: number; color: string }>;
  preset: string;
}

const GatewayVisualizer: React.FC<GatewayVisualizerProps> = ({ 
  isPlaying, 
  bars, 
  particles,
  preset
}) => {
  const [focusLevel, setFocusLevel] = useState<string>('focus10');
  const [pulsateSpeed, setPulsateSpeed] = useState<number>(1.5);
  
  useEffect(() => {
    if (isPlaying) {
      // Determine focus level from preset ID
      if (preset.includes('focus10')) {
        setFocusLevel('focus10');
        setPulsateSpeed(1.5);
      } else if (preset.includes('focus12')) {
        setFocusLevel('focus12');
        setPulsateSpeed(1.2);
      } else if (preset.includes('focus15')) {
        setFocusLevel('focus15');
        setPulsateSpeed(1.0);
      } else if (preset.includes('focus21')) {
        setFocusLevel('focus21');
        setPulsateSpeed(0.7);
      }
      
      // Poll for focus level changes
      const interval = setInterval(() => {
        const currentLevel = audioEngine.getCurrentFocusLevel();
        if (currentLevel && currentLevel !== focusLevel) {
          setFocusLevel(currentLevel);
          
          // Adjust pulsation based on focus level
          switch (currentLevel) {
            case 'focus10': setPulsateSpeed(1.5); break;
            case 'focus12': setPulsateSpeed(1.2); break;
            case 'focus15': setPulsateSpeed(1.0); break;
            case 'focus21': setPulsateSpeed(0.7); break;
          }
        }
      }, 2000);
      
      return () => clearInterval(interval);
    }
  }, [isPlaying, preset, focusLevel]);
  
  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Particle effect */}
      <div className="absolute inset-0 pointer-events-none">
        {particles.map((particle, index) => (
          <motion.div
            key={index}
            className="absolute rounded-full"
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              width: `${particle.size}px`,
              height: `${particle.size}px`,
              backgroundColor: particle.color,
              opacity: 0.6
            }}
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0.3, 0.7, 0.3]
            }}
            transition={{
              duration: 2 + (index % 3),
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>
      
      <div className="relative h-full flex items-center justify-between px-4">
        {/* Hemisphere visualization on the left */}
        <div className="flex-1">
          {isPlaying && <HemisphereVisualization pulsateSpeed={pulsateSpeed} />}
        </div>

        {/* Focus level indicator on the right */}
        <div className="w-48 flex items-center justify-center">
          {isPlaying && <FocusLevelIndicator focusLevel={focusLevel} pulsateSpeed={pulsateSpeed} />}
        </div>
      </div>
      
      {/* Icon when not playing */}
      {!isPlaying && (
        <div className="absolute inset-0 flex items-center justify-center text-cyan-500/70">
          <Brain className="w-12 h-12" />
        </div>
      )}
    </div>
  );
};

export default GatewayVisualizer;
