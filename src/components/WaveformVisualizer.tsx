
import React, { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

interface WaveformVisualizerProps {
  isPlaying: boolean;
  preset: string;
}

const WaveformVisualizer: React.FC<WaveformVisualizerProps> = ({ isPlaying, preset }) => {
  const [bars, setBars] = useState<Array<{ height: number; delay: number }>>([]);
  
  useEffect(() => {
    // Create random bar heights
    const totalBars = 60;
    const newBars = Array.from({ length: totalBars }).map((_, i) => {
      return {
        height: Math.random() * 50 + 5,
        delay: i % 5
      };
    });
    setBars(newBars);
  }, [preset]);
  
  return (
    <div className="waveform h-20 my-6 px-4">
      {bars.map((bar, index) => (
        <div
          key={index}
          className={cn(
            "waveform-bar transition-all duration-300",
            isPlaying ? "animate-wave" : "h-1"
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
