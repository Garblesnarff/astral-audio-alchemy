import React, { useEffect, useState, useRef } from 'react';
import { cn } from '@/lib/utils';
import { Sparkles } from 'lucide-react';

interface WaveformVisualizerProps {
  isPlaying: boolean;
  preset: string;
}

const WaveformVisualizer: React.FC<WaveformVisualizerProps> = ({ isPlaying, preset }) => {
  const [bars, setBars] = useState<Array<{ height: number; delay: number; color?: string }>>([]);
  const [particles, setParticles] = useState<Array<{ x: number; y: number; size: number; speed: number; color: string }>>([]);
  const particleRef = useRef<HTMLDivElement>(null);
  
  // Generate initial bars based on preset
  useEffect(() => {
    // Create random bar heights
    const totalBars = 60;
    
    if (preset === 'alien') {
      // Enhanced visualization for the alien preset matching the complex sound profile
      const newBars = Array.from({ length: totalBars }).map((_, i) => {
        let height, delay, color;
        
        // Assign different patterns for different frequency components
        if (i % 17 === 0) {
          // 17kHz ultrasonic ping
          height = Math.random() * 90 + 30;
          delay = i % 2;
          color = 'bg-purple-500';
        } else if (i % 5 === 0) {
          // 528 Hz harmonic (spiritual frequency)
          height = Math.random() * 65 + 20;
          delay = i % 3;
          color = 'bg-green-400';
        } else if (i % 7 === 0) {
          // Schumann resonance (7.83 Hz via 100 Hz carrier)
          height = Math.random() * 75 + 15;
          delay = i % 4;
          color = 'bg-blue-400';
        } else if (i % 3 === 0) {
          // 432 Hz ambient pad
          height = Math.random() * 45 + 10;
          delay = i % 5;
          color = 'bg-amber-300';
        } else if (i % 10 === 0) {
          // 2.5kHz chirps
          height = Math.random() * 70 + 20;
          delay = i % 2;
          color = 'bg-red-400';
        } else {
          // Breath layer
          height = Math.random() * 35 + 5;
          delay = i % 6;
          color = 'bg-primary';
        }
        
        return { height, delay, color };
      });
      setBars(newBars);
      
      // Initialize particles for alien preset
      if (isPlaying) {
        initializeParticles();
      }
    } else if (preset.startsWith('astral-')) {
      // Enhanced visualization for astral projection presets
      const newBars = Array.from({ length: totalBars }).map((_, i) => {
        let height, delay, color;
        
        // Assign different patterns for different astral projection patterns
        if (preset === 'astral-deep-theta') {
          // Deep theta pattern (6.3 Hz)
          if (i % 7 === 0) {
            height = Math.random() * 80 + 35;
            delay = i % 3;
            color = 'bg-fuchsia-500';
          } else if (i % 3 === 0) {
            height = Math.random() * 60 + 20;
            delay = i % 5;
            color = 'bg-indigo-400';
          } else {
            height = Math.random() * 40 + 10;
            delay = i % 6;
            color = 'bg-purple-400';
          }
        } else if (preset === 'astral-epsilon-lambda') {
          // Epsilon-Lambda mix pattern
          if (i % 11 === 0) {
            height = Math.random() * 90 + 30; // Lambda spikes
            delay = i % 2;
            color = 'bg-fuchsia-500';
          } else if (i % 12 === 0) {
            height = Math.random() * 75 + 40; // Secondary lambda
            delay = i % 3;
            color = 'bg-violet-500';
          } else {
            // Epsilon ultra-low baseline
            height = Math.random() * 20 + 5;
            delay = i % 7;
            color = 'bg-indigo-400';
          }
        } else if (preset === 'astral-777hz') {
          // 777 Hz special frequency pattern
          if (i % 7 === 0) {
            height = Math.random() * 85 + 40;
            delay = i % 2;
            color = 'bg-amber-400';
          } else if (i % 3 === 0) {
            height = Math.random() * 60 + 30;
            delay = i % 4;
            color = 'bg-fuchsia-500';
          } else if (i % 5 === 0) {
            height = Math.random() * 70 + 25;
            delay = i % 3;
            color = 'bg-violet-400';
          } else {
            height = Math.random() * 35 + 10;
            delay = i % 5;
            color = 'bg-indigo-400';
          }
        } else if (preset === 'astral-vibrational') {
          // Vibrational stage pattern - more chaotic
          const phase = Math.sin(i * 0.1) * 0.5 + 0.5; // Value between 0-1
          height = Math.random() * 40 + 20 + phase * 60;
          delay = i % 4;
          
          if (height > 70) {
            color = 'bg-fuchsia-500';
          } else if (height > 50) {
            color = 'bg-violet-500';
          } else if (height > 30) {
            color = 'bg-indigo-400';
          } else {
            color = 'bg-purple-400';
          }
        } else if (preset === 'astral-progressive') {
          // Progressive sequence - combination of patterns
          if (i % 8 === 0) {
            height = Math.random() * 85 + 40;
            delay = i % 3;
            color = 'bg-fuchsia-500';
          } else if (i % 7 === 0) {
            height = Math.random() * 70 + 30;
            delay = i % 2;
            color = 'bg-violet-500';
          } else if (i % 5 === 0) {
            height = Math.random() * 60 + 20;
            delay = i % 4;
            color = 'bg-indigo-400';
          } else if (i % 3 === 0) {
            height = Math.random() * 50 + 15;
            delay = i % 5;
            color = 'bg-purple-400';
          } else {
            height = Math.random() * 30 + 10;
            delay = i % 6;
            color = 'bg-blue-400';
          }
        } else {
          // Default astral pattern
          height = Math.random() * 60 + 10;
          delay = i % 5;
          color = 'bg-fuchsia-400';
        }
        
        return { height, delay, color };
      });
      setBars(newBars);
      
      // Initialize particles for astral preset
      if (isPlaying) {
        initializeAstralParticles();
      }
    } else if (preset.startsWith('remote-')) {
      // Enhanced visualization for remote viewing presets
      const newBars = Array.from({ length: totalBars }).map((_, i) => {
        let height, delay, color;
        
        // Assign different patterns for different remote viewing patterns
        if (preset === 'remote-theta-delta') {
          // Theta-Delta mix pattern (4 Hz)
          if (i % 8 === 0) {
            height = Math.random() * 75 + 30;
            delay = i % 3;
            color = 'bg-indigo-500';
          } else if (i % 4 === 0) {
            height = Math.random() * 55 + 20;
            delay = i % 5;
            color = 'bg-purple-400';
          } else {
            height = Math.random() * 35 + 10;
            delay = i % 6;
            color = 'bg-indigo-400';
          }
        } else if (preset === 'remote-alpha') {
          // Alpha enhancement pattern
          if (i % 7 === 0) {
            height = Math.random() * 65 + 35;
            delay = i % 2;
            color = 'bg-indigo-500';
          } else if (i % 3 === 0) {
            height = Math.random() * 80 + 25;
            delay = i % 4;
            color = 'bg-blue-400';
          } else {
            height = Math.random() * 50 + 15;
            delay = i % 5;
            color = 'bg-indigo-400';
          }
        } else if (preset === 'remote-beta-theta') {
          // Beta-Theta cycling pattern
          if (i % 11 === 0) {
            height = Math.random() * 85 + 30; // Beta spikes
            delay = i % 2;
            color = 'bg-blue-500';
          } else if (i % 12 === 0) {
            height = Math.random() * 70 + 40; // Secondary beta
            delay = i % 3;
            color = 'bg-indigo-500';
          } else {
            // Theta baseline
            height = Math.random() * 40 + 10;
            delay = i % 7;
            color = 'bg-indigo-400';
          }
        } else if (preset === 'remote-focused') {
          // Focused viewing pattern with marker pulses
          if (i % 15 === 0) {
            height = Math.random() * 90 + 30; // Focus markers
            delay = i % 2;
            color = 'bg-indigo-600';
          } else if (i % 5 === 0) {
            height = Math.random() * 60 + 25;
            delay = i % 3;
            color = 'bg-indigo-500';
          } else if (i % 3 === 0) {
            height = Math.random() * 45 + 20;
            delay = i % 4;
            color = 'bg-purple-400';
          } else {
            height = Math.random() * 30 + 10;
            delay = i % 6;
            color = 'bg-indigo-400';
          }
        } else if (preset.startsWith('remote-crv') || preset === 'remote-crv') {
          // CRV protocol pattern - structured waves
          const phase = Math.sin(i * 0.2) * 0.5 + 0.5; // Value between 0-1
          height = Math.random() * 30 + 20 + phase * 50;
          delay = i % 4;
          
          if (height > 70) {
            color = 'bg-indigo-500';
          } else if (height > 50) {
            color = 'bg-purple-400';
          } else if (height > 30) {
            color = 'bg-blue-400';
          } else {
            color = 'bg-indigo-300';
          }
        } else if (preset.startsWith('remote-erv') || preset === 'remote-erv') {
          // ERV protocol pattern - deeper, slower waves
          if (i % 10 === 0) {
            height = Math.random() * 70 + 30;
            delay = i % 3;
            color = 'bg-indigo-600';
          } else if (i % 6 === 0) {
            height = Math.random() * 45 + 20;
            delay = i % 4;
            color = 'bg-indigo-500';
          } else {
            height = Math.random() * 25 + 10; // Lower baseline for deeper state
            delay = i % 7;
            color = 'bg-indigo-400';
          }
        } else if (preset.startsWith('remote-arv') || preset === 'remote-arv') {
          // ARV protocol pattern - alternating patterns
          if (i % 12 === 0) {
            height = Math.random() * 80 + 35; // Association markers
            delay = i % 2;
            color = 'bg-blue-500';
          } else if (i % 7 === 0) {
            height = Math.random() * 70 + 30; // Secondary markers
            delay = i % 3;
            color = 'bg-indigo-500';
          } else if (i % 4 === 0) {
            height = Math.random() * 50 + 20;
            delay = i % 4;
            color = 'bg-purple-400';
          } else {
            height = Math.random() * 30 + 10;
            delay = i % 5;
            color = 'bg-indigo-300';
          }
        } else {
          // Default remote viewing pattern
          height = Math.random() * 60 + 10;
          delay = i % 5;
          color = 'bg-indigo-400';
        }
        
        return { height, delay, color };
      });
      setBars(newBars);
      
      // Initialize particles for remote viewing preset
      if (isPlaying) {
        initializeRemoteViewingParticles();
      }
    } else {
      // Default visualization for other presets
      const newBars = Array.from({ length: totalBars }).map((_, i) => {
        return {
          height: Math.random() * 50 + 5,
          delay: i % 5
        };
      });
      setBars(newBars);
      setParticles([]);
    }
  }, [preset, isPlaying]);
  
  // Initialize particles for the alien effect
  const initializeParticles = () => {
    const particleCount = 30;
    const newParticles = Array.from({ length: particleCount }).map(() => {
      return {
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 3 + 1,
        speed: Math.random() * 1 + 0.2,
        color: getRandomAlienColor()
      };
    });
    setParticles(newParticles);
  };
  
  // Get random color for particles
  const getRandomAlienColor = () => {
    const colors = [
      'rgba(168, 85, 247, 0.8)',  // purple
      'rgba(74, 222, 128, 0.8)',  // green
      'rgba(96, 165, 250, 0.8)',  // blue
      'rgba(252, 211, 77, 0.8)',  // amber
      'rgba(248, 113, 113, 0.8)'  // red
    ];
    return colors[Math.floor(Math.random() * colors.length)];
  };
  
  // Initialize particles for the astral effect
  const initializeAstralParticles = () => {
    const particleCount = 40;
    const newParticles = Array.from({ length: particleCount }).map(() => {
      return {
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 3 + 1,
        speed: Math.random() * 0.8 + 0.2,
        color: getRandomAstralColor()
      };
    });
    setParticles(newParticles);
  };
  
  // Get random color for astral particles
  const getRandomAstralColor = () => {
    const colors = [
      'rgba(217, 70, 239, 0.6)',  // fuchsia
      'rgba(147, 51, 234, 0.6)',  // purple
      'rgba(124, 58, 237, 0.6)',  // violet
      'rgba(99, 102, 241, 0.6)',  // indigo
      'rgba(255, 186, 144, 0.5)'  // amber/subtle orange
    ];
    return colors[Math.floor(Math.random() * colors.length)];
  };
  
  // Initialize particles for the remote viewing effect
  const initializeRemoteViewingParticles = () => {
    const particleCount = 35;
    const newParticles = Array.from({ length: particleCount }).map(() => {
      return {
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 2.5 + 0.5,
        speed: Math.random() * 0.6 + 0.2,
        color: getRandomRemoteViewingColor()
      };
    });
    setParticles(newParticles);
  };
  
  // Get random color for remote viewing particles
  const getRandomRemoteViewingColor = () => {
    const colors = [
      'rgba(99, 102, 241, 0.5)',  // indigo
      'rgba(129, 140, 248, 0.5)',  // lighter indigo
      'rgba(139, 92, 246, 0.5)',  // purple
      'rgba(147, 51, 234, 0.5)',  // violet
      'rgba(67, 56, 202, 0.5)'  // darker indigo
    ];
    return colors[Math.floor(Math.random() * colors.length)];
  };
  
  // Update particle positions for animation
  useEffect(() => {
    if (!isPlaying || preset !== 'alien' || particles.length === 0) return;
    
    const interval = setInterval(() => {
      setParticles(prevParticles => 
        prevParticles.map(particle => {
          // Move particles upward
          let newY = particle.y - particle.speed;
          
          // Reset position if particle goes off the top
          if (newY < 0) {
            newY = 100;
            return {
              ...particle,
              x: Math.random() * 100,
              y: newY,
              size: Math.random() * 3 + 1,
              speed: Math.random() * 1 + 0.2
            };
          }
          
          return { ...particle, y: newY };
        })
      );
    }, 50);
    
    return () => clearInterval(interval);
  }, [isPlaying, preset, particles]);
  
  return (
    <div className="relative h-20 my-6">
      {/* Alien-specific background effect */}
      {preset === 'alien' && isPlaying && (
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-purple-900/20 overflow-hidden rounded-lg">
          {/* Floating particles */}
          {particles.map((particle, index) => (
            <div 
              key={index} 
              className="absolute rounded-full animate-pulse"
              style={{
                left: `${particle.x}%`,
                top: `${particle.y}%`,
                width: `${particle.size}px`,
                height: `${particle.size}px`,
                backgroundColor: particle.color,
                boxShadow: `0 0 ${particle.size * 2}px ${particle.color}`,
                opacity: isPlaying ? 0.8 : 0,
                transition: 'opacity 0.5s ease'
              }}
            />
          ))}
          
          {/* Subtle sparkle effect */}
          <div className="absolute right-3 top-3 text-purple-300/50 animate-pulse">
            <Sparkles size={20} />
          </div>
        </div>
      )}
      
      {/* Astral projection specific background effect */}
      {preset.startsWith('astral-') && isPlaying && (
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-fuchsia-900/10 overflow-hidden rounded-lg">
          {/* Floating particles */}
          {particles.map((particle, index) => (
            <div 
              key={index} 
              className="absolute rounded-full animate-pulse"
              style={{
                left: `${particle.x}%`,
                top: `${particle.y}%`,
                width: `${particle.size}px`,
                height: `${particle.size}px`,
                backgroundColor: particle.color,
                boxShadow: `0 0 ${particle.size * 3}px ${particle.color}`,
                opacity: isPlaying ? 0.8 : 0,
                transition: 'opacity 0.5s ease'
              }}
            />
          ))}
          
          {/* Subtle sparkle effect */}
          <div className="absolute right-3 top-3 text-fuchsia-300/50 animate-pulse">
            <Sparkles size={20} />
          </div>
        </div>
      )}
      
      {/* Remote viewing specific background effect */}
      {preset.startsWith('remote-') && isPlaying && (
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-indigo-900/10 overflow-hidden rounded-lg">
          {/* Floating particles */}
          {particles.map((particle, index) => (
            <div 
              key={index} 
              className="absolute rounded-full animate-pulse"
              style={{
                left: `${particle.x}%`,
                top: `${particle.y}%`,
                width: `${particle.size}px`,
                height: `${particle.size}px`,
                backgroundColor: particle.color,
                boxShadow: `0 0 ${particle.size * 2}px ${particle.color}`,
                opacity: isPlaying ? 0.7 : 0,
                transition: 'opacity 0.5s ease'
              }}
            />
          ))}
          
          {/* Target visualization for remote viewing */}
          {preset === 'remote-focused' && (
            <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-6 h-6 border border-indigo-400/30 rounded-full opacity-50" />
          )}
        </div>
      )}
      
      {/* Waveform bars */}
      <div className="waveform h-full px-4 relative">
        {bars.map((bar, index) => (
          <div
            key={index}
            className={cn(
              "waveform-bar transition-all duration-300",
              isPlaying ? "animate-wave" : "h-1",
              bar.color || "",
              preset === 'alien' && isPlaying ? "alien-bar" : "",
              preset.startsWith('lucid-') && isPlaying ? "lucid-bar" : "",
              preset.startsWith('astral-') && isPlaying ? "astral-bar" : "",
              preset.startsWith('remote-') && isPlaying ? "remote-bar" : ""
            )}
            style={{ 
              height: isPlaying ? `${bar.height}px` : '4px',
              animationDelay: `${bar.delay * 0.1}s`
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default WaveformVisualizer;
