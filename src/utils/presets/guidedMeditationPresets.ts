
import { Preset } from './types';

export const guidedMeditationPresets: Preset[] = [
  {
    id: 'guided-basic-breathing',
    name: 'Guided Breathing Meditation',
    description: 'Simple breathing meditation with voice guidance for beginners',
    baseFrequency: 200,
    beatFrequency: 8, // Alpha waves for relaxation
    category: 'guided',
    benefits: ['Stress relief', 'Mindfulness', 'Breathing awareness', 'Beginner-friendly'],
    recommendedDuration: 10,
    hasVoiceGuide: true,
    voiceSettings: {
      voiceId: 'Sarah', // Calm female voice
      speed: 0.9,
      volume: 0.7
    },
    meditationScript: {
      id: 'basic-breathing',
      title: 'Basic Breathing Meditation',
      introduction: 'Welcome to this guided breathing meditation. Find a comfortable position and allow yourself to relax.',
      totalDuration: 600, // 10 minutes
      segments: [
        {
          text: 'Close your eyes gently and take a moment to settle into your position.',
          duration: 10,
          timing: 'start'
        },
        {
          text: 'Begin by taking three deep breaths. Breathe in slowly through your nose.',
          duration: 15,
          timing: 'start',
          pauseAfter: 5
        },
        {
          text: 'And breathe out slowly through your mouth. Let go of any tension.',
          duration: 15,
          timing: 'start',
          pauseAfter: 5
        },
        {
          text: 'Now allow your breathing to return to its natural rhythm. Simply observe each breath.',
          duration: 20,
          timing: 'during'
        },
        {
          text: 'Notice the sensation of air entering your nostrils and filling your lungs.',
          duration: 30,
          timing: 'during'
        },
        {
          text: 'If your mind wanders, gently bring your attention back to your breath. This is normal.',
          duration: 30,
          timing: 'during'
        },
        {
          text: 'Continue to breathe naturally, staying present with each inhale and exhale.',
          duration: 450, // Rest of the meditation in silence
          timing: 'during'
        },
        {
          text: 'Begin to bring your awareness back to your surroundings.',
          duration: 15,
          timing: 'end'
        },
        {
          text: 'Wiggle your fingers and toes, and when you\'re ready, gently open your eyes.',
          duration: 10,
          timing: 'end'
        }
      ],
      conclusion: 'Thank you for taking this time for yourself. Notice how you feel and carry this sense of calm with you.'
    }
  },
  {
    id: 'guided-body-scan',
    name: 'Guided Body Scan',
    description: 'Progressive body awareness meditation with detailed voice guidance',
    baseFrequency: 180,
    beatFrequency: 6, // Theta waves for deep relaxation
    category: 'guided',
    benefits: ['Body awareness', 'Deep relaxation', 'Tension release', 'Mind-body connection'],
    recommendedDuration: 15,
    hasVoiceGuide: true,
    voiceSettings: {
      voiceId: 'Sarah',
      speed: 0.8,
      volume: 0.7
    },
    meditationScript: {
      id: 'body-scan',
      title: 'Progressive Body Scan',
      introduction: 'This body scan meditation will help you release tension and develop body awareness.',
      totalDuration: 900, // 15 minutes
      segments: [
        {
          text: 'Lie down or sit comfortably with your spine straight. Close your eyes.',
          duration: 10,
          timing: 'start'
        },
        {
          text: 'Take three deep breaths, allowing your body to sink deeper with each exhale.',
          duration: 20,
          timing: 'start',
          pauseAfter: 10
        },
        {
          text: 'Begin by focusing on the top of your head. Notice any sensations there.',
          duration: 30,
          timing: 'during'
        },
        {
          text: 'Move your attention to your forehead, releasing any tension around your eyes.',
          duration: 30,
          timing: 'during'
        },
        {
          text: 'Notice your jaw and let it soften. Allow your tongue to rest gently.',
          duration: 30,
          timing: 'during'
        },
        {
          text: 'Bring awareness to your neck and shoulders. Let them drop and relax.',
          duration: 40,
          timing: 'during'
        },
        {
          text: 'Continue down to your arms, feeling each part from shoulders to fingertips.',
          duration: 60,
          timing: 'during'
        },
        {
          text: 'Focus on your chest and heart area. Notice the gentle rise and fall of breathing.',
          duration: 60,
          timing: 'during'
        },
        {
          text: 'Move to your abdomen and lower back, releasing any tightness.',
          duration: 60,
          timing: 'during'
        },
        {
          text: 'Bring attention to your hips and pelvis, letting them feel heavy and relaxed.',
          duration: 50,
          timing: 'during'
        },
        {
          text: 'Notice your thighs, knees, and calves, releasing any held tension.',
          duration: 80,
          timing: 'during'
        },
        {
          text: 'Feel your feet and toes, letting them completely relax.',
          duration: 40,
          timing: 'during'
        },
        {
          text: 'Now sense your whole body as one, feeling completely relaxed and at peace.',
          duration: 350,
          timing: 'during'
        },
        {
          text: 'Begin to gently wiggle your fingers and toes.',
          duration: 10,
          timing: 'end'
        },
        {
          text: 'Take a deeper breath and slowly open your eyes when ready.',
          duration: 15,
          timing: 'end'
        }
      ],
      conclusion: 'Take a moment to appreciate this feeling of relaxation and carry it with you.'
    }
  },
  {
    id: 'guided-mindfulness',
    name: 'Mindfulness Meditation',
    description: 'Present moment awareness with gentle voice guidance',
    baseFrequency: 220,
    beatFrequency: 10, // Alpha waves for alert relaxation
    category: 'guided',
    benefits: ['Present moment awareness', 'Mental clarity', 'Reduced anxiety', 'Enhanced focus'],
    recommendedDuration: 12,
    hasVoiceGuide: true,
    voiceSettings: {
      voiceId: 'Sarah',
      speed: 0.9,
      volume: 0.7
    },
    meditationScript: {
      id: 'mindfulness',
      title: 'Mindfulness Meditation',
      introduction: 'This practice will help you cultivate present moment awareness and mental clarity.',
      totalDuration: 720, // 12 minutes
      segments: [
        {
          text: 'Find a comfortable seated position and close your eyes softly.',
          duration: 10,
          timing: 'start'
        },
        {
          text: 'Begin by simply noticing that you are here, in this moment.',
          duration: 15,
          timing: 'start'
        },
        {
          text: 'Observe your breath without trying to change it. Just watch.',
          duration: 30,
          timing: 'during'
        },
        {
          text: 'Now expand your awareness to include sounds around you.',
          duration: 45,
          timing: 'during'
        },
        {
          text: 'Notice any thoughts that arise. Acknowledge them without judgment and let them pass.',
          duration: 60,
          timing: 'during'
        },
        {
          text: 'Bring attention to any emotions present. Simply observe them with kindness.',
          duration: 60,
          timing: 'during'
        },
        {
          text: 'Rest in this awareness of the present moment, just being here now.',
          duration: 450,
          timing: 'during'
        },
        {
          text: 'Gently return your attention to your breath.',
          duration: 15,
          timing: 'end'
        },
        {
          text: 'Take a moment to appreciate this practice and slowly open your eyes.',
          duration: 15,
          timing: 'end'
        }
      ],
      conclusion: 'Remember that you can return to this present moment awareness throughout your day.'
    }
  }
];
