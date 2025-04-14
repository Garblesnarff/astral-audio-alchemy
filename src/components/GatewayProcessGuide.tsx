
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { 
  Brain, 
  Waves, 
  Clock, 
  History,
  FileText,
  Globe,
  AlertTriangle
} from 'lucide-react';

const GatewayProcessGuide: React.FC = () => {
  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-3">
        <Brain className="h-6 w-6 text-cyan-500" />
        <h3 className="text-lg font-medium">The Gateway Process Guide</h3>
      </div>
      
      <Tabs defaultValue="overview">
        <TabsList className="grid grid-cols-4 w-full">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="waves">Waves</TabsTrigger>
          <TabsTrigger value="research">Research</TabsTrigger>
          <TabsTrigger value="safety">Safety</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="space-y-4 pt-4">
          <p className="text-sm text-muted-foreground">
            The Gateway Process is a meditation system developed by the Monroe Institute, designed to facilitate
            the exploration of expanded states of consciousness. It uses specialized audio technology called Hemi-Sync to 
            synchronize the brain's hemispheres through binaural beats.
          </p>
          
          <div className="bg-muted/30 p-3 rounded-md space-y-2">
            <h4 className="font-medium flex items-center">
              <Waves className="h-4 w-4 mr-2 text-cyan-500" />
              Hemi-Sync Technology
            </h4>
            <p className="text-sm text-muted-foreground">
              Hemi-Sync uses precisely engineered audio signals to create a state of hemispheric synchronization, 
              where both hemispheres of the brain work together in a coherent, balanced state. This creates an optimal 
              condition for expanded awareness and altered states of consciousness.
            </p>
          </div>
          
          <div className="bg-muted/30 p-3 rounded-md space-y-2">
            <h4 className="font-medium flex items-center">
              <Brain className="h-4 w-4 mr-2 text-cyan-500" />
              Focus Levels
            </h4>
            <p className="text-sm text-muted-foreground">
              Gateway Process practitioners navigate through progressive "Focus Levels," each representing a deeper 
              state of consciousness:
            </p>
            <ul className="text-sm text-muted-foreground space-y-1 list-disc pl-5">
              <li><strong>Focus 10:</strong> Mind Awake, Body Asleep</li>
              <li><strong>Focus 12:</strong> Expanded Awareness</li>
              <li><strong>Focus 15:</strong> No Time</li>
              <li><strong>Focus 21:</strong> Other Energy Systems</li>
            </ul>
          </div>
        </TabsContent>
        
        <TabsContent value="waves" className="space-y-4 pt-4">
          <div className="space-y-3">
            <div className="p-3 rounded-md bg-cyan-950/20 border border-cyan-800/20">
              <h4 className="font-medium text-cyan-500 flex items-center">
                <Clock className="h-4 w-4 mr-2" />
                Wave I: Focus 10 Development
              </h4>
              <p className="text-sm text-muted-foreground mt-2">
                The initial gateway where you learn to maintain a mentally alert, awake state while your body sleeps.
              </p>
              <ul className="text-sm text-muted-foreground mt-2 list-disc pl-5 space-y-1">
                <li>Orientation: Introduction to the process</li>
                <li>Resonant Tuning: Preparation exercises</li>
                <li>Focus 10 Introduction: First experience</li>
                <li>Advanced Focus 10: Deepening the experience</li>
                <li>Problem Solving: Using the state for solutions</li>
              </ul>
            </div>
            
            <div className="p-3 rounded-md bg-blue-950/20 border border-blue-800/20">
              <h4 className="font-medium text-blue-500 flex items-center">
                <Clock className="h-4 w-4 mr-2" />
                Wave II: Focus 12 Development
              </h4>
              <p className="text-sm text-muted-foreground mt-2">
                Expands awareness beyond physical reality, opening perception to non-physical energy.
              </p>
              <ul className="text-sm text-muted-foreground mt-2 list-disc pl-5 space-y-1">
                <li>Introduction to Focus 12: First exposure</li>
                <li>Problem Detection: Identifying issues</li>
                <li>One-Way Communication: Receiving information</li>
                <li>Energy Bar Tool: Manipulation technique</li>
                <li>Color Breathing: Energy enhancement</li>
              </ul>
            </div>
            
            <div className="p-3 rounded-md bg-indigo-950/20 border border-indigo-800/20">
              <h4 className="font-medium text-indigo-500 flex items-center">
                <Clock className="h-4 w-4 mr-2" />
                Wave III: Focus 15 Development
              </h4>
              <p className="text-sm text-muted-foreground mt-2">
                State beyond time where consciousness exists independent of physical reality.
              </p>
              <ul className="text-sm text-muted-foreground mt-2 list-disc pl-5 space-y-1">
                <li>Introduction to Focus 15: No Time</li>
                <li>Future Exploration: Accessing potential timelines</li>
                <li>Past Exploration: Accessing historical information</li>
                <li>Out-of-Body Introduction: Separation techniques</li>
                <li>Remote Perception: Sensing distant locations</li>
              </ul>
            </div>
            
            <div className="p-3 rounded-md bg-violet-950/20 border border-violet-800/20">
              <h4 className="font-medium text-violet-500 flex items-center">
                <Clock className="h-4 w-4 mr-2" />
                Wave IV-VI: Focus 21 and Beyond
              </h4>
              <p className="text-sm text-muted-foreground mt-2">
                Advanced states that bridge to other dimensions and energy systems.
              </p>
              <p className="text-sm text-muted-foreground mt-2">
                These waves include contact with non-physical entities, exploration of interdimensional realities, and 
                highly advanced states of consciousness requiring previous mastery of earlier waves.
              </p>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="research" className="space-y-4 pt-4">
          <div className="space-y-3">
            <div className="p-3 rounded-md bg-muted/30">
              <h4 className="font-medium flex items-center">
                <History className="h-4 w-4 mr-2 text-cyan-500" />
                Historical Background
              </h4>
              <p className="text-sm text-muted-foreground mt-2">
                The Gateway Process was developed by Robert Monroe and the Monroe Institute in the 1970s. Monroe, who had 
                spontaneous out-of-body experiences, developed audio technology to help others achieve similar states 
                of expanded consciousness.
              </p>
            </div>
            
            <div className="p-3 rounded-md bg-muted/30">
              <h4 className="font-medium flex items-center">
                <FileText className="h-4 w-4 mr-2 text-cyan-500" />
                CIA Declassified Documents
              </h4>
              <p className="text-sm text-muted-foreground mt-2">
                In 2003, the CIA declassified documents regarding their investigation of the Gateway Process. US Army 
                Lieutenant Colonel Wayne M. McDonnell's analysis concluded that the technique had a solid theoretical and 
                scientific basis for altering consciousness.
              </p>
            </div>
            
            <div className="p-3 rounded-md bg-muted/30">
              <h4 className="font-medium flex items-center">
                <Globe className="h-4 w-4 mr-2 text-cyan-500" />
                Scientific Basis
              </h4>
              <p className="text-sm text-muted-foreground mt-2">
                The Gateway Process works on principles of:
              </p>
              <ul className="text-sm text-muted-foreground mt-2 list-disc pl-5 space-y-1">
                <li><strong>Frequency Following Response:</strong> The brain's tendency to synchronize with external audio frequencies</li>
                <li><strong>Binaural Beats:</strong> When slightly different frequencies are played in each ear, the brain perceives a third "beat" frequency</li>
                <li><strong>Hemispheric Synchronization:</strong> Getting both brain hemispheres to work in coherence</li>
                <li><strong>Resonance:</strong> Matching frequencies to create amplified effects</li>
              </ul>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="safety" className="space-y-4 pt-4">
          <div className="bg-amber-100/10 border border-amber-200/10 p-4 rounded-lg space-y-3">
            <h4 className="font-medium text-amber-600 flex items-center">
              <AlertTriangle className="h-5 w-5 mr-2" />
              Important Safety Guidelines
            </h4>
            
            <ul className="text-sm text-muted-foreground space-y-3 list-disc pl-5">
              <li>
                <strong>Medical Considerations:</strong> Consult with a healthcare professional before 
                using if you have epilepsy, seizure disorders, or serious mental health conditions.
              </li>
              <li>
                <strong>Environment:</strong> Always use in a safe, quiet environment where you won't be 
                disturbed and where it would be safe if you were to fall asleep.
              </li>
              <li>
                <strong>Integration Time:</strong> Allow adequate time to return to normal consciousness 
                before driving or operating machinery.
              </li>
              <li>
                <strong>Emotional Responses:</strong> Be prepared for potentially strong emotional reactions 
                or memory resurgence during sessions.
              </li>
              <li>
                <strong>Progressive Approach:</strong> Work through the levels sequentially; do not attempt 
                advanced states without proper preparation.
              </li>
              <li>
                <strong>Session Duration:</strong> Begin with shorter sessions (15-30 minutes) and gradually 
                increase as you become more experienced.
              </li>
            </ul>
            
            <p className="text-sm text-amber-700/80 font-medium mt-3">
              This application is provided for experimental and educational purposes only.
            </p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default GatewayProcessGuide;
