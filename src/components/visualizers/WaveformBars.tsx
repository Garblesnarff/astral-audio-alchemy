
import React from 'react';
import { cn } from '@/lib/utils';

interface WaveformBarsProps {
  bars: Array<{ height: number; delay: number; color?: string }>;
  isPlaying: boolean;
  preset: string;
}

const WaveformBars: React.FC<WaveformBarsProps> = ({ bars, isPlaying, preset }) => {
  return (
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
  );
};

export default WaveformBars;
