import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Brain } from 'lucide-react';
import audioEngine from '@/utils/audioEngine';

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
  
  const getFocusLevelIndicator = () => {
    switch (focusLevel) {
      case 'focus10':
        return (
          <div className="text-cyan-300/70">
            <motion.div
              animate={{ scale: [1, 1.1, 1], opacity: [0.7, 1, 0.7] }}
              transition={{ duration: pulsateSpeed, repeat: Infinity, ease: "easeInOut" }}
              className="text-center"
            >
              <div className="font-medium text-sm">Focus 10</div>
              <div className="text-xs opacity-70">Mind Awake, Body Asleep</div>
            </motion.div>
          </div>
        );
      case 'focus12':
        return (
          <div className="text-blue-300/70">
            <motion.div
              animate={{ scale: [1, 1.15, 1], opacity: [0.7, 1, 0.7] }}
              transition={{ duration: pulsateSpeed, repeat: Infinity, ease: "easeInOut" }}
              className="text-center"
            >
              <div className="font-medium text-sm">Focus 12</div>
              <div className="text-xs opacity-70">Expanded Awareness</div>
            </motion.div>
          </div>
        );
      case 'focus15':
        return (
          <div className="text-indigo-300/70">
            <motion.div
              animate={{ scale: [1, 1.2, 1], opacity: [0.7, 1, 0.7], rotate: [0, 5, 0, -5, 0] }}
              transition={{ duration: pulsateSpeed, repeat: Infinity, ease: "easeInOut" }}
              className="text-center"
            >
              <div className="font-medium text-sm">Focus 15</div>
              <div className="text-xs opacity-70">No Time</div>
            </motion.div>
          </div>
        );
      case 'focus21':
        return (
          <div className="text-purple-300/70">
            <motion.div
              animate={{ 
                scale: [1, 1.3, 1], 
                opacity: [0.7, 1, 0.7], 
                rotate: [0, 10, 0, -10, 0],
                filter: ['blur(0px)', 'blur(2px)', 'blur(0px)']
              }}
              transition={{ duration: pulsateSpeed, repeat: Infinity, ease: "easeInOut" }}
              className="text-center"
            >
              <div className="font-medium text-sm">Focus 21</div>
              <div className="text-xs opacity-70">Other Energy Systems</div>
            </motion.div>
          </div>
        );
      default:
        return null;
    }
  };
  
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
          {isPlaying && (
            <div className="flex items-center justify-center">
              <motion.div
                className="relative w-32 h-32"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1 }}
              >
                {/* Left hemisphere */}
                <motion.div
                  className="absolute w-16 h-32 left-0 top-0 rounded-l-full border-l border-y border-cyan-500/30 bg-gradient-to-r from-cyan-800/20 to-cyan-600/5"
                  animate={{ 
                    boxShadow: ['0 0 5px rgba(6, 182, 212, 0.3)', '0 0 20px rgba(6, 182, 212, 0.5)', '0 0 5px rgba(6, 182, 212, 0.3)'] 
                  }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                />
                
                {/* Right hemisphere */}
                <motion.div
                  className="absolute w-16 h-32 left-16 top-0 rounded-r-full border-r border-y border-indigo-500/30 bg-gradient-to-l from-indigo-800/20 to-indigo-600/5"
                  animate={{ 
                    boxShadow: ['0 0 5px rgba(99, 102, 241, 0.3)', '0 0 20px rgba(99, 102, 241, 0.5)', '0 0 5px rgba(99, 102, 241, 0.3)'] 
                  }}
                  transition={{ duration: 2, repeatDelay: 0.2, repeat: Infinity, ease: "easeInOut" }}
                />
                
                {/* Connection visualization */}
                <motion.div
                  className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-1 h-24 bg-white/40"
                  animate={{ 
                    height: [24, 32, 24],
                    opacity: [0.4, 0.7, 0.4],
                    boxShadow: ['0 0 3px rgba(255, 255, 255, 0.3)', '0 0 10px rgba(255, 255, 255, 0.6)', '0 0 3px rgba(255, 255, 255, 0.3)'] 
                  }}
                  transition={{ duration: pulsateSpeed, repeat: Infinity, ease: "easeInOut" }}
                />
              </motion.div>
            </div>
          )}
        </div>

        {/* Focus level indicator on the right */}
        <div className="w-48 flex items-center justify-center">
          {isPlaying && getFocusLevelIndicator()}
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
