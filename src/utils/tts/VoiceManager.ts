
import { VoiceSettings } from '@/types/meditation';

export class VoiceManager {
  private audioContext: AudioContext | null = null;
  private voiceGain: GainNode | null = null;
  private currentAudio: HTMLAudioElement | null = null;
  private isPlaying: boolean = false;

  constructor(audioContext: AudioContext) {
    this.audioContext = audioContext;
    this.setupAudioNodes();
  }

  private setupAudioNodes() {
    if (!this.audioContext) return;
    
    this.voiceGain = this.audioContext.createGain();
    this.voiceGain.connect(this.audioContext.destination);
    this.voiceGain.gain.value = 0.7; // Default voice volume
  }

  async speak(text: string, settings: VoiceSettings): Promise<void> {
    // Stop any current speech
    this.stop();

    try {
      // Try browser TTS first (for now, until ElevenLabs API is integrated)
      await this.speakWithBrowserTTS(text, settings);
    } catch (error) {
      console.error('Voice synthesis failed:', error);
      throw error;
    }
  }

  private async speakWithBrowserTTS(text: string, settings: VoiceSettings): Promise<void> {
    return new Promise((resolve, reject) => {
      if (!('speechSynthesis' in window)) {
        reject(new Error('Speech synthesis not supported'));
        return;
      }

      const utterance = new SpeechSynthesisUtterance(text);
      
      // Configure voice settings
      utterance.rate = settings.speed;
      utterance.volume = settings.volume;
      utterance.pitch = settings.pitch || 1;

      // Try to find a suitable voice
      const voices = speechSynthesis.getVoices();
      const preferredVoice = voices.find(voice => 
        voice.name.toLowerCase().includes('female') || 
        voice.name.toLowerCase().includes('sarah') ||
        voice.name.toLowerCase().includes('samantha')
      ) || voices.find(voice => voice.lang.startsWith('en')) || voices[0];

      if (preferredVoice) {
        utterance.voice = preferredVoice;
      }

      utterance.onend = () => {
        this.isPlaying = false;
        resolve();
      };

      utterance.onerror = (event) => {
        this.isPlaying = false;
        reject(new Error(`Speech synthesis error: ${event.error}`));
      };

      this.isPlaying = true;
      speechSynthesis.speak(utterance);
    });
  }

  stop() {
    if (this.isPlaying) {
      speechSynthesis.cancel();
      this.isPlaying = false;
    }

    if (this.currentAudio) {
      this.currentAudio.pause();
      this.currentAudio = null;
    }
  }

  setVolume(volume: number) {
    if (this.voiceGain) {
      this.voiceGain.gain.value = Math.max(0, Math.min(1, volume));
    }
  }

  getIsPlaying(): boolean {
    return this.isPlaying;
  }

  cleanup() {
    this.stop();
    if (this.voiceGain) {
      this.voiceGain.disconnect();
      this.voiceGain = null;
    }
  }
}
