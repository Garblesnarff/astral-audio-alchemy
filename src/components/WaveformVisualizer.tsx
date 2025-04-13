
import React, { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

interface WaveformVisualizerProps {
  isPlaying: boolean;
  preset: string;
}

const WaveformVisualizer: React.FC<WaveformVisualizerProps> = ({ isPlaying, preset }) => {
  const [bars, setBars] = useState<Array<{ height: number; delay: number; color?: string }>>([]);
  
  useEffect(() => {
    // Create random bar heights
    const totalBars = 60;
    
    if (preset === 'alien') {
      // Special visualization for the alien preset
      // Representing multiple frequencies with different colors
      const newBars = Array.from({ length: totalBars }).map((_, i) => {
        let height, delay, color;
        
        // Assign different patterns for different frequency components
        if (i % 10 === 0) {
          // Ultrasonic ping (17kHz)
          height = Math.random() * 80 + 20;
          delay = 0;
          color = 'bg-purple-500';
        } else if (i % 7 === 0) {
          // 528 Hz harmonic
          height = Math.random() * 60 + 15;
          delay = i % 3;
          color = 'bg-green-400';
        } else if (i % 5 === 0) {
          // Schumann resonance (7.83 Hz)
          height = Math.random() * 70 + 10;
          delay = i % 4;
          color = 'bg-blue-400';
        } else if (i % 3 === 0) {
          // 432 Hz ambient pad
          height = Math.random() * 40 + 5;
          delay = i % 5;
          color = 'bg-amber-300';
        } else {
          // Chirps and breath layer
          height = Math.random() * 30 + 5;
          delay = i % 6;
          color = 'bg-primary';
        }
        
        return { height, delay, color };
      });
      setBars(newBars);
    } else {
      // Default visualization for other presets
      const newBars = Array.from({ length: totalBars }).map((_, i) => {
        return {
          height: Math.random() * 50 + 5,
          delay: i % 5
        };
      });
      setBars(newBars);
    }
  }, [preset]);
  
  return (
    <div className="waveform h-20 my-6 px-4">
      {bars.map((bar, index) => (
        <div
          key={index}
          className={cn(
            "waveform-bar transition-all duration-300",
            isPlaying ? "animate-wave" : "h-1",
            bar.color
          )}
          style={{ 
            height: isPlaying ? `${bar.height}px` : '4px',
            animationDelay: `${bar.delay * 0.1}s`
          }}
        />
      ))}
    </div>
  );
};

export default WaveformVisualizer;
