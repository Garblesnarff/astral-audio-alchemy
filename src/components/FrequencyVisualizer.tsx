import React, { useEffect, useRef } from 'react';
import audioEngine from '@/utils/audio/BinauralBeatGenerator';

interface FrequencyVisualizerProps {
  isPlaying: boolean;
}

const FrequencyVisualizer: React.FC<FrequencyVisualizerProps> = ({ isPlaying }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const analyser = audioEngine.getAnalyser();
    if (!analyser) return;

    const dataArray = new Uint8Array(analyser.frequencyBinCount);
    
    const draw = () => {
      if (!isPlaying) {
        // Create idle animation when not playing
        createIdleAnimation(ctx, canvas);
        animationRef.current = requestAnimationFrame(draw);
        return;
      }
      
      analyser.getByteFrequencyData(dataArray);
      
      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Set dimensions
      const width = canvas.width;
      const height = canvas.height;
      
      // Draw background
      ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
      ctx.fillRect(0, 0, width, height);
      
      // Calculate bar width
      const barWidth = (width / dataArray.length) * 2.5;
      let barHeight;
      let x = 0;
      
      // Create gradient for bars
      const gradient = ctx.createLinearGradient(0, 0, 0, height);
      gradient.addColorStop(0, 'rgba(159, 122, 234, 1)'); // purple
      gradient.addColorStop(0.5, 'rgba(136, 87, 229, 0.7)'); // lighter purple
      gradient.addColorStop(1, 'rgba(99, 102, 241, 0.5)'); // indigo
      
      // Draw bars
      for (let i = 0; i < dataArray.length; i++) {
        barHeight = dataArray[i] / 2;
        
        ctx.fillStyle = gradient;
        ctx.fillRect(x, height - barHeight, barWidth, barHeight);
        
        x += barWidth + 1;
      }
      
      animationRef.current = requestAnimationFrame(draw);
    };
    
    if (isPlaying) {
      draw();
    } else {
      createIdleAnimation(ctx, canvas);
      animationRef.current = requestAnimationFrame(draw);
    }
    
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isPlaying]);
  
  const createIdleAnimation = (ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement) => {
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Set dimensions
    const width = canvas.width;
    const height = canvas.height;
    
    // Draw background
    ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
    ctx.fillRect(0, 0, width, height);
    
    // Create oscillating wave
    const time = Date.now() / 1000;
    const amplitude = height / 4;
    const frequency = 5;
    const numPoints = 100;
    
    // Create gradient
    const gradient = ctx.createLinearGradient(0, 0, 0, height);
    gradient.addColorStop(0, 'rgba(159, 122, 234, 0.7)'); // purple
    gradient.addColorStop(0.5, 'rgba(136, 87, 229, 0.5)'); // lighter purple
    gradient.addColorStop(1, 'rgba(99, 102, 241, 0.3)'); // indigo
    
    ctx.strokeStyle = gradient;
    ctx.lineWidth = 3;
    ctx.beginPath();
    
    for (let i = 0; i < numPoints; i++) {
      const x = width * (i / (numPoints - 1));
      const y = height / 2 + amplitude * Math.sin(frequency * (i / numPoints) + time);
      
      if (i === 0) {
        ctx.moveTo(x, y);
      } else {
        ctx.lineTo(x, y);
      }
    }
    
    ctx.stroke();
  };
  
  return (
    <canvas 
      ref={canvasRef} 
      width={560} 
      height={200} 
      className="w-full h-full rounded-lg bg-card/50 backdrop-blur-sm border border-border shadow-lg"
    />
  );
};

export default FrequencyVisualizer;
