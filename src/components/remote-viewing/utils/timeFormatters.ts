
/**
 * Format seconds to MM:SS display
 */
export const formatMinutesSeconds = (seconds: number): string => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
};

/**
 * Format seconds to MM:00 display (for full minutes)
 */
export const formatFullMinutes = (seconds: number): string => {
  const minutes = Math.floor(seconds / 60);
  return `${minutes}:00`;
};
