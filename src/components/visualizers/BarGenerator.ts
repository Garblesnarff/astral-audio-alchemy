export type BarType = {
  height: number;
  delay: number;
  color?: string;
};

export function generateDefaultBars(): BarType[] {
  return Array.from({ length: 60 }).map((_, i) => {
    return {
      height: Math.random() * 50 + 5,
      delay: i % 5
    };
  });
}

export function generateAlienBars(): BarType[] {
  return Array.from({ length: 60 }).map((_, i) => {
    let height, delay, color;
    
    if (i % 17 === 0) {
      height = Math.random() * 90 + 30;
      delay = i % 2;
      color = 'bg-purple-500';
    } else if (i % 5 === 0) {
      height = Math.random() * 65 + 20;
      delay = i % 3;
      color = 'bg-green-400';
    } else if (i % 7 === 0) {
      height = Math.random() * 75 + 15;
      delay = i % 4;
      color = 'bg-blue-400';
    } else if (i % 3 === 0) {
      height = Math.random() * 45 + 10;
      delay = i % 5;
      color = 'bg-amber-300';
    } else if (i % 10 === 0) {
      height = Math.random() * 70 + 20;
      delay = i % 2;
      color = 'bg-red-400';
    } else {
      height = Math.random() * 35 + 5;
      delay = i % 6;
      color = 'bg-primary';
    }
    
    return { height, delay, color };
  });
}

export function generateLucidDreamingBars(preset: string): BarType[] {
  return Array.from({ length: 60 }).map((_, i) => {
    let height = Math.random() * 60 + 10;
    let delay = i % 5;
    let color = 'bg-indigo-400';
    
    if (i % 7 === 0) {
      height = Math.random() * 70 + 20;
      color = 'bg-indigo-500';
    } else if (i % 3 === 0) {
      height = Math.random() * 50 + 15;
      color = 'bg-indigo-400';
    }
    
    return { height, delay, color };
  });
}

export function generateAstralBars(preset: string): BarType[] {
  return Array.from({ length: 60 }).map((_, i) => {
    let height, delay, color;
    
    if (preset === 'astral-deep-theta') {
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
      if (i % 11 === 0) {
        height = Math.random() * 90 + 30;
        delay = i % 2;
        color = 'bg-fuchsia-500';
      } else if (i % 12 === 0) {
        height = Math.random() * 75 + 40;
        delay = i % 3;
        color = 'bg-violet-500';
      } else {
        height = Math.random() * 20 + 5;
        delay = i % 7;
        color = 'bg-indigo-400';
      }
    } else if (preset === 'astral-777hz') {
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
      const phase = Math.sin(i * 0.1) * 0.5 + 0.5;
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
      height = Math.random() * 60 + 10;
      delay = i % 5;
      color = 'bg-fuchsia-400';
    }
    
    return { height, delay, color };
  });
}

export function generateRemoteViewingBars(preset: string): BarType[] {
  return Array.from({ length: 60 }).map((_, i) => {
    let height, delay, color;
    
    if (preset === 'remote-theta-delta') {
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
      if (i % 11 === 0) {
        height = Math.random() * 85 + 30;
        delay = i % 2;
        color = 'bg-blue-500';
      } else if (i % 12 === 0) {
        height = Math.random() * 70 + 40;
        delay = i % 3;
        color = 'bg-indigo-500';
      } else {
        height = Math.random() * 40 + 10;
        delay = i % 7;
        color = 'bg-indigo-400';
      }
    } else if (preset === 'remote-focused') {
      if (i % 15 === 0) {
        height = Math.random() * 90 + 30;
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
      const phase = Math.sin(i * 0.2) * 0.5 + 0.5;
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
      if (i % 10 === 0) {
        height = Math.random() * 70 + 30;
        delay = i % 3;
        color = 'bg-indigo-600';
      } else if (i % 6 === 0) {
        height = Math.random() * 45 + 20;
        delay = i % 4;
        color = 'bg-indigo-500';
      } else {
        height = Math.random() * 25 + 10;
        delay = i % 7;
        color = 'bg-indigo-400';
      }
    } else if (preset.startsWith('remote-arv') || preset === 'remote-arv') {
      if (i % 12 === 0) {
        height = Math.random() * 80 + 35;
        delay = i % 2;
        color = 'bg-blue-500';
      } else if (i % 7 === 0) {
        height = Math.random() * 70 + 30;
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
      height = Math.random() * 60 + 10;
      delay = i % 5;
      color = 'bg-indigo-400';
    }
    
    return { height, delay, color };
  });
}

export function generateGatewayProcessBars(preset: string): BarType[] {
  const bars: BarType[] = [];
  let maxHeight: number;
  let baseColor: string;
  let accentColor: string;
  
  if (preset.includes('focus10')) {
    maxHeight = 50;
    baseColor = 'bg-cyan-500/60';
    accentColor = 'bg-blue-400/70';
  } else if (preset.includes('focus12')) {
    maxHeight = 60;
    baseColor = 'bg-blue-500/60';
    accentColor = 'bg-indigo-400/70';
  } else if (preset.includes('focus15')) {
    maxHeight = 70;
    baseColor = 'bg-indigo-500/60';
    accentColor = 'bg-violet-400/70';
  } else if (preset.includes('focus21')) {
    maxHeight = 80;
    baseColor = 'bg-violet-500/60';
    accentColor = 'bg-purple-400/70';
  } else {
    maxHeight = 50;
    baseColor = 'bg-cyan-500/60';
    accentColor = 'bg-blue-400/70';
  }
  
  const numBars = 30;
  for (let i = 0; i < numBars; i++) {
    let height: number;
    const position = i / numBars;
    
    if (position <= 0.5) {
      height = maxHeight * Math.sin(position * Math.PI);
    } else {
      height = maxHeight * Math.sin((1 - position) * Math.PI);
    }
    
    if (i % 6 === 0 || i % 6 === 5) {
      height = height * 0.7;
    } else if (i % 6 === 2 || i % 6 === 3) {
      height = height * 1.2;
    }
    
    const color = i % 2 === 0 ? baseColor : accentColor;
    
    const centerDistance = Math.abs(i - numBars / 2);
    const delay = centerDistance * 0.05;
    
    bars.push({
      height: Math.round(height),
      delay,
      color
    });
  }
  
  return bars;
}
