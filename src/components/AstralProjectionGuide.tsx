
import React, { useState } from 'react';
import { 
  Accordion, 
  AccordionContent, 
  AccordionItem, 
  AccordionTrigger 
} from '@/components/ui/accordion';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { 
  Rocket, 
  Brain, 
  AlarmClock, 
  HelpCircle, 
  AlertCircle, 
  Microscope,
  ArrowUpFromLine,
  LucideIcon
} from 'lucide-react';

interface AstralProjectionGuideProps {
  selectedPreset: string;
}

interface GuideSection {
  title: string;
  icon: React.ReactNode;
  content: React.ReactNode;
}

const AstralProjectionGuide: React.FC<AstralProjectionGuideProps> = ({ selectedPreset }) => {
  // Only show for astral projection presets
  if (!selectedPreset.startsWith('astral-')) {
    return null;
  }
  
  const sections: GuideSection[] = [
    {
      title: 'What is Astral Projection?',
      icon: <Rocket className="h-4 w-4" />,
      content: (
        <div className="space-y-2 text-sm">
          <p>
            Astral projection (or astral travel) is an out-of-body experience where your consciousness
            temporarily separates from your physical body. During this experience, many report being 
            able to travel beyond physical limitations.
          </p>
          <p>
            The practice has been documented across various cultures throughout history
            and is often associated with spiritual or mystical experiences.
          </p>
        </div>
      )
    },
    {
      title: 'Brainwave States',
      icon: <Brain className="h-4 w-4" />,
      content: (
        <div className="space-y-2 text-sm">
          <p>
            Astral projection typically occurs during specific brainwave states:
          </p>
          <ul className="list-disc pl-5 space-y-1">
            <li>
              <span className="font-medium">Theta waves (4-7 Hz)</span>: Particularly around 6.3 Hz, 
              associated with deep meditation and the hypnagogic state between wakefulness and sleep.
            </li>
            <li>
              <span className="font-medium">Epsilon waves (below 0.5 Hz)</span>: Ultra-slow oscillations 
              linked to transcendental states and spiritual experiences.
            </li>
            <li>
              <span className="font-medium">Lambda waves (above 100 Hz)</span>: High-frequency waves 
              some researchers associate with multidimensional awareness.
            </li>
          </ul>
          <p>
            Our audio frequencies are specifically tuned to help your brain reach and maintain 
            these states, facilitating the astral projection experience.
          </p>
        </div>
      )
    },
    {
      title: 'The Astral Projection Process',
      icon: <AlarmClock className="h-4 w-4" />,
      content: (
        <div className="space-y-2 text-sm">
          <p>
            The full astral projection experience typically follows these phases:
          </p>
          <ol className="list-decimal pl-5 space-y-1">
            <li>
              <span className="font-medium">Deep Relaxation</span>: Your body becomes completely 
              relaxed while your mind remains alert.
            </li>
            <li>
              <span className="font-medium">Body Awareness</span>: You become acutely aware of 
              your physical body and its sensations.
            </li>
            <li>
              <span className="font-medium">Vibrational Stage</span>: Many experience intense 
              vibrations or buzzing throughout their body. This is normal and indicates the beginning 
              of separation.
            </li>
            <li>
              <span className="font-medium">Separation</span>: Your consciousness begins to 
              detach from your physical form.
            </li>
            <li>
              <span className="font-medium">Exploration</span>: Free movement beyond physical 
              limitations.
            </li>
            <li>
              <span className="font-medium">Return</span>: A controlled return to your physical body.
            </li>
          </ol>
          <p>
            The "Full Astral Journey" preset guides you through each of these phases automatically.
          </p>
        </div>
      )
    },
    {
      title: 'Safety Considerations',
      icon: <AlertCircle className="h-4 w-4" />,
      content: (
        <div className="space-y-2 text-sm">
          <p>
            While astral projection is generally considered safe, please note:
          </p>
          <ul className="list-disc pl-5 space-y-1">
            <li>
              Do not use while driving or operating machinery.
            </li>
            <li>
              Those with epilepsy or seizure disorders should consult a doctor before use.
            </li>
            <li>
              The vibrational stage can sometimes cause anxiety in beginners. This is normal 
              and not dangerous. Remaining calm will help you progress.
            </li>
            <li>
              Use the "Return Signal" feature if you feel uncomfortable at any point.
            </li>
            <li>
              Ensure you're in a safe, comfortable environment before beginning.
            </li>
          </ul>
        </div>
      )
    },
    {
      title: 'Complementary Techniques',
      icon: <Microscope className="h-4 w-4" />,
      content: (
        <div className="space-y-2 text-sm">
          <p>
            Enhance your experience with these complementary practices:
          </p>
          <ul className="list-disc pl-5 space-y-1">
            <li>
              <span className="font-medium">Visualization</span>: Imagine floating or rising while 
              listening to the frequencies.
            </li>
            <li>
              <span className="font-medium">Focus Point</span>: Concentrate on the space between 
              your eyebrows (third eye) during the process.
            </li>
            <li>
              <span className="font-medium">Breathing</span>: Practice deep, rhythmic breathing 
              especially during the initial relaxation phase.
            </li>
            <li>
              <span className="font-medium">No Expectations</span>: Approach with curiosity rather 
              than specific expectations.
            </li>
          </ul>
        </div>
      )
    },
    {
      title: 'Troubleshooting',
      icon: <HelpCircle className="h-4 w-4" />,
      content: (
        <div className="space-y-2 text-sm">
          <p>Common challenges and solutions:</p>
          <ul className="list-disc pl-5 space-y-1">
            <li>
              <span className="font-medium">Falling asleep</span>: Try a more upright position or 
              practice earlier in the day.
            </li>
            <li>
              <span className="font-medium">Not feeling anything</span>: Patience is key. It may 
              take several attempts to experience results.
            </li>
            <li>
              <span className="font-medium">Fear during vibrations</span>: This is normal. Focus 
              on your breathing and remind yourself it's a natural part of the process.
            </li>
            <li>
              <span className="font-medium">Difficulty separating</span>: Try the "roll-out" method - 
              imagine rolling out of your body like a log.
            </li>
          </ul>
        </div>
      )
    }
  ];
  
  return (
    <Card className="border-indigo-500/20 bg-gradient-to-br from-indigo-950/10 to-purple-950/20">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg flex items-center gap-1">
          <ArrowUpFromLine className="h-5 w-5 text-indigo-400" /> Astral Projection Guide
        </CardTitle>
        <CardDescription>
          Educational information and best practices
        </CardDescription>
      </CardHeader>
      
      <CardContent>
        <Accordion type="single" collapsible className="w-full">
          {sections.map((section, index) => (
            <AccordionItem key={index} value={`item-${index}`}>
              <AccordionTrigger className="text-sm flex items-center">
                <div className="flex items-center gap-2">
                  {section.icon}
                  {section.title}
                </div>
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                {section.content}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </CardContent>
    </Card>
  );
};

export default AstralProjectionGuide;
