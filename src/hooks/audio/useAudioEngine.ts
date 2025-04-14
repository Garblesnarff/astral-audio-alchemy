
import { useState, useEffect } from 'react';
import audioEngine from '@/utils/audioEngine';
import { useToast } from '@/components/ui/use-toast';

export function useAudioEngine() {
  const { toast } = useToast();
  
  useEffect(() => {
    // Ensure audio context is initialized
    const initSuccess = audioEngine.initialize();
    
    if (!initSuccess) {
      toast({
        title: "Audio Error",
        description: "Could not initialize audio system. Please check browser compatibility.",
        variant: "destructive",
      });
    }
    
    return () => {
      audioEngine.cleanup();
    };
  }, [toast]);

  return {
    audioEngine
  };
}
