export const getRandomAlienColor = (): string => {
  const colors = [
    'rgba(168, 85, 247, 0.8)',  // purple
    'rgba(74, 222, 128, 0.8)',  // green
    'rgba(96, 165, 250, 0.8)',  // blue
    'rgba(252, 211, 77, 0.8)',  // amber
    'rgba(248, 113, 113, 0.8)'  // red
  ];
  return colors[Math.floor(Math.random() * colors.length)];
};

export const getRandomAstralColor = (): string => {
  const colors = [
    'rgba(217, 70, 239, 0.6)',  // fuchsia
    'rgba(147, 51, 234, 0.6)',  // purple
    'rgba(124, 58, 237, 0.6)',  // violet
    'rgba(99, 102, 241, 0.6)',  // indigo
    'rgba(255, 186, 144, 0.5)'  // amber/subtle orange
  ];
  return colors[Math.floor(Math.random() * colors.length)];
};

export const getRandomRemoteViewingColor = (): string => {
  const colors = [
    'rgba(99, 102, 241, 0.5)',  // indigo
    'rgba(129, 140, 248, 0.5)',  // lighter indigo
    'rgba(139, 92, 246, 0.5)',  // purple
    'rgba(147, 51, 234, 0.5)',  // violet
    'rgba(67, 56, 202, 0.5)'  // darker indigo
  ];
  return colors[Math.floor(Math.random() * colors.length)];
};

export const initializeParticles = (count: number, colorGetter: () => string): Array<{ x: number; y: number; size: number; speed: number; color: string }> => {
  return Array.from({ length: count }).map(() => {
    return {
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 3 + 1,
      speed: Math.random() * 1 + 0.2,
      color: colorGetter()
    };
  });
};

export const initializeAlienParticles = (): Array<{ x: number; y: number; size: number; speed: number; color: string }> => {
  return initializeParticles(30, getRandomAlienColor);
};

export const initializeAstralParticles = (): Array<{ x: number; y: number; size: number; speed: number; color: string }> => {
  return initializeParticles(40, getRandomAstralColor);
};

export const initializeRemoteViewingParticles = (): Array<{ x: number; y: number; size: number; speed: number; color: string }> => {
  return initializeParticles(35, getRandomRemoteViewingColor);
};

export function initializeGatewayParticles() {
  const particles = [];
  const numParticles = 20;
  
  // Create particles for Gateway Process visualization
  for (let i = 0; i < numParticles; i++) {
    // Generate random position, size, and speed
    const x = Math.random() * 100;
    const y = Math.random() * 100;
    const size = Math.random() * 4 + 1;
    const speed = Math.random() * 0.5 + 0.1;
    
    // Use a color scheme for Gateway Process
    const colors = [
      'rgba(6, 182, 212, 0.6)',   // cyan
      'rgba(59, 130, 246, 0.6)',  // blue
      'rgba(99, 102, 241, 0.6)',  // indigo
      'rgba(139, 92, 246, 0.6)',  // violet
      'rgba(255, 255, 255, 0.4)'  // white (subtle)
    ];
    
    const color = colors[Math.floor(Math.random() * colors.length)];
    
    particles.push({
      x,
      y,
      size,
      speed,
      color
    });
  }
  
  return particles;
}
