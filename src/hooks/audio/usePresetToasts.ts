import { useCallback } from 'react';
import { useToast } from '@/components/ui/use-toast';

export function usePresetToasts() {
  const { toast } = useToast();
  
  const handleLucidPresetToast = useCallback((presetId: string) => {
    if (presetId === 'lucid-basic') {
      toast({
        title: "Lucid Dreaming Mode",
        description: "Basic theta entrainment for dream awareness. Use headphones for best results.",
        duration: 5000,
      });
    } else if (presetId === 'lucid-advanced') {
      toast({
        title: "Advanced Lucid Dreaming",
        description: "Theta-alpha mix for deeper dream control. Check reality check options below.",
        duration: 5000,
      });
    } else if (presetId === 'lucid-gamma') {
      toast({
        title: "Gamma-Enhanced Dreams",
        description: "Added gamma components to mimic lucid dream brain activity.",
        duration: 5000,
      });
    } else if (presetId === 'lucid-wbtb') {
      toast({
        title: "WBTB Mode Activated",
        description: "Use the WBTB timer below for optimal timing.",
        duration: 5000,
      });
    }
  }, [toast]);
  
  const handleAstralPresetToast = useCallback((presetId: string) => {
    if (presetId === 'astral-deep-theta') {
      toast({
        title: "Deep Theta Astral Mode",
        description: "Focused 6.3 Hz frequency for astral travel. Use headphones for best results.",
        duration: 5000,
      });
    } else if (presetId === 'astral-epsilon-lambda') {
      toast({
        title: "Epsilon-Lambda Mix",
        description: "Combined ultra-low and high frequencies for enhanced separation experience.",
        duration: 5000,
      });
    } else if (presetId === 'astral-777hz') {
      toast({
        title: "777 Hz Cosmic Frequency",
        description: "Special frequency associated with spiritual and astral connections.",
        duration: 5000,
      });
    } else if (presetId === 'astral-vibrational') {
      toast({
        title: "Vibrational Stage Support",
        description: "Progressive frequencies to help navigate through the vibrational phase.",
        duration: 5000,
      });
    } else if (presetId === 'astral-progressive') {
      toast({
        title: "Full Astral Journey Activated",
        description: "This guided sequence will take you through all phases of astral projection.",
        duration: 5000,
      });
    }
  }, [toast]);
  
  const handleRemoteViewingPresetToast = useCallback((presetId: string) => {
    if (presetId === 'remote-theta-delta') {
      toast({
        title: "Theta-Delta Mix Mode",
        description: "Optimal 4 Hz frequency for remote viewing information reception. Use headphones for best results.",
        duration: 5000,
      });
    } else if (presetId === 'remote-alpha') {
      toast({
        title: "Alpha Enhancement Mode",
        description: "Alert but relaxed state for data analysis and processing. Ideal for the analysis phase.",
        duration: 5000,
      });
    } else if (presetId === 'remote-beta-theta') {
      toast({
        title: "Beta-Theta Cycling",
        description: "Alternates between focus and receptivity for optimal information flow.",
        duration: 5000,
      });
    } else if (presetId === 'remote-focused') {
      toast({
        title: "Focused Viewing Mode",
        description: "Targeted frequency set with interval markers for guided sessions. Use the Target Focus Timer for best results.",
        duration: 5000,
      });
    } else if (presetId === 'remote-crv') {
      toast({
        title: "CRV Protocol Activated",
        description: "6-stage Coordinate Remote Viewing protocol with progressive frequency shifts.",
        duration: 5000,
      });
    } else if (presetId === 'remote-erv') {
      toast({
        title: "ERV Protocol Activated",
        description: "Extended Remote Viewing with deeper delta wave entrainment for longer sessions.",
        duration: 5000,
      });
    } else if (presetId === 'remote-arv') {
      toast({
        title: "ARV Protocol Activated",
        description: "Associative Remote Viewing with specialized frequency patterns for prediction tasks.",
        duration: 5000,
      });
    }
  }, [toast]);
  
  const handleGatewayPresetToast = useCallback((presetId: string) => {
    if (presetId.startsWith('gateway-focus10')) {
      toast({
        title: 'Focus 10: Mind Awake, Body Asleep',
        description: 'This state allows your body to enter deep relaxation while maintaining mental alertness.',
        duration: 5000,
      });
    } else if (presetId.startsWith('gateway-focus12')) {
      toast({
        title: 'Focus 12: Expanded Awareness',
        description: 'Your consciousness expands beyond physical sensory input in this state.',
        duration: 5000,
      });
    } else if (presetId.startsWith('gateway-focus15')) {
      toast({
        title: 'Focus 15: No Time',
        description: 'A state beyond time where you can access past, present, and future potentials.',
        duration: 5000,
      });
    } else if (presetId.startsWith('gateway-focus21')) {
      toast({
        title: 'Focus 21: Other Energy Systems',
        description: 'This advanced state bridges to other dimensions and energy systems.',
        duration: 5000,
      });
    }
  }, [toast]);
  
  return {
    handleLucidPresetToast,
    handleAstralPresetToast,
    handleRemoteViewingPresetToast,
    handleGatewayPresetToast
  };
}
