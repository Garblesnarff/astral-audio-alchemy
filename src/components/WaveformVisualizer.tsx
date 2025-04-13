
import React, { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

interface WaveformVisualizerProps {
  isPlaying: boolean;
  preset: string;
}

const WaveformVisualizer: React.FC<WaveformVisualizerProps> = ({ isPlaying, preset }) => {
  const [bars, setBars] = useState<Array<{ height: number; delay: number; color: string }>>([]);
  
  // Reset and recreate bars when preset changes or playback changes
  useEffect(() => {
    // Create bars for visualization
    const totalBars = 60;
    const newBars = Array.from({ length: totalBars }).map((_, i) => {
      let height = Math.random() * 50 + 5;
      let delay = i % 5;
      let color = 'rgba(99, 102, 241, 0.8)'; // Default color
      
      // Special effects for alien preset
      if (preset === 'alien') {
        // Create a pattern - taller bars for ultrasonic/harmonic frequencies 
        if (i % 12 === 0) {
          height = 70 + Math.random() * 20; // Taller bars for 17kHz
          color = 'rgba(128, 255, 212, 0.8)'; // Cyan for ultrasonic
        } else if (i % 7 === 0) {
          height = 50 + Math.random() * 15; // Medium tall for 528Hz
          color = 'rgba(191, 128, 255, 0.8)'; // Purple for spiritual frequency
        } else if (i % 5 === 0) {
          height = 40 + Math.random() * 10; // Slightly taller for 432Hz
          color = 'rgba(255, 215, 128, 0.8)'; // Yellow/gold for ambient
        } else {
          color = 'rgba(99, 102, 241, 0.8)'; // Base color for other frequencies
        }
        
        // Every 10th bar gets a special delay for the chirps
        if (i % 10 === 0) {
          delay = 0; // No delay for chirp bars
        }
      }
      
      return {
        height,
        delay,
        color
      };
    });
    
    setBars(newBars);
  }, [preset, isPlaying]);
  
  // Effect to create the chirping visualization for the alien preset
  useEffect(() => {
    if (!isPlaying || preset !== 'alien') return;
    
    // Clean up function in case component unmounts
    let chirpIntervalId: number | null = null;
    
    // Create a chirp effect every 10 seconds
    chirpIntervalId = window.setInterval(() => {
      if (!isPlaying) return;
      
      setBars(prevBars => {
        return prevBars.map((bar, index) => {
          // For every 6th bar, create a momentary height increase
          if (index % 6 === 0) {
            return { 
              ...bar, 
              height: 80 + Math.random() * 30, // Temporarily very tall
              color: 'rgba(255, 128, 212, 0.9)' // Bright pink for chirps
            };
          }
          return bar;
        });
      });
      
      // Reset the bars to normal after 300ms (duration of chirp)
      const resetTimeout = setTimeout(() => {
        if (!isPlaying) return;
        
        setBars(prevBars => {
          return prevBars.map((bar, index) => {
            if (index % 6 === 0) {
              return { 
                ...bar, 
                height: 40 + Math.random() * 15,
                color: 'rgba(99, 102, 241, 0.8)'
              };
            }
            return bar;
          });
        });
      }, 300);
      
      return () => {
        if (resetTimeout) clearTimeout(resetTimeout);
      };
    }, 10000);
    
    return () => {
      if (chirpIntervalId !== null) {
        clearInterval(chirpIntervalId);
      }
    };
  }, [isPlaying, preset]);
  
  return (
    <div className="waveform h-20 my-6 px-4 flex items-end justify-center">
      {bars.map((bar, index) => (
        <div
          key={index}
          className={cn(
            "waveform-bar transition-all duration-300 mx-[1px] rounded-t-sm",
            isPlaying ? "animate-wave" : "h-1",
            preset === 'alien' && "alien-waveform-bar"
          )}
          style={{ 
            height: isPlaying ? `${bar.height}px` : '4px',
            animationDelay: `${bar.delay * 0.1}s`,
            backgroundColor: bar.color || 'rgba(99, 102, 241, 0.8)',
            transform: preset === 'alien' && isPlaying ? `scaleY(${1 + Math.sin(Date.now() / 1000 + index) * 0.1})` : 'none'
          }}
        />
      ))}
      
      <style>
        {`
        @keyframes wave {
          0%, 100% {
            transform: scaleY(1);
          }
          50% {
            transform: scaleY(0.5);
          }
        }
        
        .animate-wave {
          animation: wave 2s infinite ease-in-out;
        }
        
        .alien-waveform-bar.animate-wave {
          animation: alien-wave 3s infinite ease-in-out;
        }
        
        @keyframes alien-wave {
          0%, 100% {
            transform: scaleY(1);
          }
          25% {
            transform: scaleY(1.1);
          }
          75% {
            transform: scaleY(0.6);
          }
        }
        
        .waveform-bar {
          flex: 1;
          max-width: 4px;
        }
        `}
      </style>
    </div>
  );
};

export default WaveformVisualizer;
