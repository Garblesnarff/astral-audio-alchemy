
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Lightbulb, Moon, Braces, EyeIcon } from 'lucide-react';

interface LucidDreamingGuideProps {
  selectedPreset: string | null;
}

const LucidDreamingGuide: React.FC<LucidDreamingGuideProps> = ({ selectedPreset }) => {
  let guideContent;

  switch (selectedPreset) {
    case 'lucid-basic':
      guideContent = {
        title: 'Basic Lucid Dreaming',
        description: 'A gentle introduction to becoming aware within your dreams',
        steps: [
          'Find a quiet, comfortable place to rest',
          'Focus on your intention to become aware in your dreams',
          'As you fall asleep, repeat: "I will know I'm dreaming"',
          'When in a dream, look for dream signs - things that seem unusual'
        ],
        tips: [
          'Keep a dream journal beside your bed',
          'Practice reality checks during the day',
          'The best time for lucid dreams is during morning sleep cycles'
        ]
      };
      break;
    case 'lucid-advanced':
      guideContent = {
        title: 'Advanced Lucid Dreaming',
        description: 'Deepen your dream awareness with theta-alpha wave entrainment',
        steps: [
          'Use the MILD technique (Mnemonic Induction of Lucid Dreams)',
          'Visualize becoming lucid as you fall asleep',
          'Practice dream stabilization techniques',
          'Set intentions for specific dream experiences'
        ],
        tips: [
          'Stabilize dreams by rubbing your hands or spinning',
          'Look at your hands to maintain lucidity',
          'Speak affirmations out loud in the dream'
        ]
      };
      break;
    case 'lucid-gamma':
      guideContent = {
        title: 'Gamma-Enhanced Dreams',
        description: 'Heightened consciousness in the dream state with gamma wave stimulation',
        steps: [
          'Meditate for 10-15 minutes before sleep',
          'Focus on increasing mental clarity',
          'Visualize your brain becoming more active during sleep',
          'Set intentions for highly vivid dream experiences'
        ],
        tips: [
          'This frequency helps create more vivid and memorable dreams',
          'Excellent for creative problem solving in dreams',
          'Can enhance dream recall significantly'
        ]
      };
      break;
    case 'lucid-wbtb':
      guideContent = {
        title: 'Wake-Back-To-Bed (WBTB)',
        description: 'A powerful technique that takes advantage of your natural sleep cycles',
        steps: [
          'Set an alarm for 5-6 hours after falling asleep',
          'Stay awake for 20-30 minutes (read about lucid dreaming)',
          'Return to bed while focusing on becoming lucid',
          'Use this frequency as you fall back asleep'
        ],
        tips: [
          'WBTB has one of the highest success rates for lucid dreaming',
          'Don't check your phone during the wake period (blue light)',
          'Keep a dim light on while awake to not fully wake up'
        ]
      };
      break;
    default:
      guideContent = {
        title: 'Lucid Dreaming Basics',
        description: 'General information about lucid dreaming',
        steps: [
          'Practice reality checks throughout the day',
          'Keep a dream journal',
          'Develop a lucid dreaming mindset',
          'Use binaural beats before sleep'
        ],
        tips: [
          'Consistency is key to developing lucid dreams',
          'Most people need several attempts before success',
          'Be patient with your progress'
        ]
      };
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Moon className="h-5 w-5 text-indigo-500" />
          {guideContent.title}
        </CardTitle>
        <CardDescription>{guideContent.description}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <h4 className="font-medium flex items-center gap-1 mb-2">
            <Braces className="h-4 w-4 text-indigo-400" /> Steps to Follow
          </h4>
          <ul className="space-y-1 ml-5 list-disc text-sm">
            {guideContent.steps.map((step, index) => (
              <li key={index}>{step}</li>
            ))}
          </ul>
        </div>
        
        <div>
          <h4 className="font-medium flex items-center gap-1 mb-2">
            <Lightbulb className="h-4 w-4 text-amber-500" /> Helpful Tips
          </h4>
          <ul className="space-y-1 ml-5 list-disc text-sm">
            {guideContent.tips.map((tip, index) => (
              <li key={index}>{tip}</li>
            ))}
          </ul>
        </div>
        
        <div className="mt-4 pt-2 border-t text-xs text-muted-foreground flex items-center gap-1">
          <EyeIcon className="h-3 w-3" /> 
          Remember: With practice, anyone can learn to lucid dream.
        </div>
      </CardContent>
    </Card>
  );
};

export default LucidDreamingGuide;
