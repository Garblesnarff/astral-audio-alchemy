
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { Brain, Target, LightbulbIcon, AlertTriangle, BookOpen, Gauge } from 'lucide-react';

interface RemoteViewingGuideProps {
  selectedPreset: string | null;
}

const RemoteViewingGuide: React.FC<RemoteViewingGuideProps> = ({ selectedPreset }) => {
  // Only show the guide for remote viewing presets
  if (!selectedPreset || !selectedPreset.startsWith('remote-')) {
    return null;
  }
  
  return (
    <Card className="border-indigo-400/30 bg-gradient-to-br from-indigo-950/10 to-purple-950/10">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center text-lg">
          <BookOpen className="w-5 h-5 mr-2 text-indigo-400" />
          Remote Viewing Guide
        </CardTitle>
        <CardDescription>
          Understanding and optimizing your remote viewing practice
        </CardDescription>
      </CardHeader>
      
      <Tabs defaultValue="basics">
        <TabsList className="w-full grid grid-cols-4">
          <TabsTrigger value="basics">Basics</TabsTrigger>
          <TabsTrigger value="brainwaves">Brainwaves</TabsTrigger>
          <TabsTrigger value="techniques">Techniques</TabsTrigger>
          <TabsTrigger value="ethics">Ethics</TabsTrigger>
        </TabsList>
        
        <TabsContent value="basics" className="mt-4">
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <h3 className="text-base font-medium flex items-center">
                <Target className="w-4 h-4 mr-2 text-indigo-400" />
                What is Remote Viewing?
              </h3>
              <p className="text-sm text-muted-foreground">
                Remote viewing is a practiced mental ability that allows a person to describe details about a target that is hidden from physical senses by distance, shielding, or time.
              </p>
              
              <h4 className="text-sm font-medium mt-3">Key Principles:</h4>
              <ul className="text-sm text-muted-foreground list-disc pl-4 space-y-1">
                <li>Anyone can learn to remote view with practice</li>
                <li>It works independently of distance or physical barriers</li>
                <li>It relies on specific mental states that allow information reception</li>
                <li>Information comes as fragments that must be assembled</li>
                <li>Results improve with proper protocols and practice</li>
              </ul>
            </div>
            
            <Separator />
            
            <div className="space-y-2">
              <h3 className="text-base font-medium flex items-center">
                <LightbulbIcon className="w-4 h-4 mr-2 text-indigo-400" />
                Getting Started
              </h3>
              <p className="text-sm text-muted-foreground">
                To begin a remote viewing session:
              </p>
              <ol className="text-sm text-muted-foreground list-decimal pl-4 space-y-1">
                <li>Create a quiet, distraction-free environment</li>
                <li>Select an appropriate frequency preset (Theta-Delta Mix recommended for beginners)</li>
                <li>Use the Target Focus Timer to structure your session</li>
                <li>Have paper and pen ready to record impressions</li>
                <li>Start with simple, distinctive targets</li>
                <li>Record your session using the Voice Notes feature</li>
              </ol>
            </div>
          </CardContent>
        </TabsContent>
        
        <TabsContent value="brainwaves" className="mt-4">
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <h3 className="text-base font-medium flex items-center">
                <Brain className="w-4 h-4 mr-2 text-indigo-400" />
                Optimal Brainwave States
              </h3>
              <p className="text-sm text-muted-foreground">
                Remote viewing effectiveness is linked to specific brainwave states:
              </p>
              
              <div className="grid grid-cols-1 gap-3 mt-3">
                <div className="p-2 rounded-md bg-indigo-950/30">
                  <h4 className="text-sm font-medium">Theta-Delta Mix (4 Hz)</h4>
                  <p className="text-xs text-muted-foreground">The borderline between theta and delta (around 4 Hz) is considered optimal for information reception during remote viewing. This state creates a balance between awareness and subconscious access.</p>
                </div>
                
                <div className="p-2 rounded-md bg-indigo-950/30">
                  <h4 className="text-sm font-medium">Alpha State (8-12 Hz)</h4>
                  <p className="text-xs text-muted-foreground">Used for data analysis and conscious processing of received information. Alpha states help with translating perceptions into coherent descriptions.</p>
                </div>
                
                <div className="p-2 rounded-md bg-indigo-950/30">
                  <h4 className="text-sm font-medium">Beta-Theta Cycling</h4>
                  <p className="text-xs text-muted-foreground">Alternating between focused beta (13-30 Hz) and receptive theta (4-7 Hz) states can improve information acquisition and analysis, particularly for complex targets.</p>
                </div>
              </div>
            </div>
            
            <Separator />
            
            <div className="space-y-2">
              <h3 className="text-base font-medium flex items-center">
                <Gauge className="w-4 h-4 mr-2 text-indigo-400" />
                Research Background
              </h3>
              <p className="text-sm text-muted-foreground">
                Scientific studies have shown correlations between successful remote viewing and specific EEG patterns, particularly increased theta activity. The 4 Hz frequency appears in multiple studies as particularly conducive to psi functioning.
              </p>
            </div>
          </CardContent>
        </TabsContent>
        
        <TabsContent value="techniques" className="mt-4">
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <h3 className="text-base font-medium">Remote Viewing Protocols</h3>
              
              <div className="grid grid-cols-1 gap-3 mt-2">
                <div className="p-2 rounded-md bg-indigo-950/30">
                  <h4 className="text-sm font-medium">CRV (Coordinate Remote Viewing)</h4>
                  <p className="text-xs text-muted-foreground">A structured method developed by Ingo Swann and used by military programs. Uses a six-stage process to systematically gather different types of information about a target.</p>
                  <p className="text-xs font-medium mt-1">Best with: Theta-Delta Mix or CRV Protocol preset</p>
                </div>
                
                <div className="p-2 rounded-md bg-indigo-950/30">
                  <h4 className="text-sm font-medium">ERV (Extended Remote Viewing)</h4>
                  <p className="text-xs text-muted-foreground">Uses a deeper, more meditative state closer to sleep. Typically conducted lying down with longer sessions. Produces more immersive, detailed information but can be harder to recall.</p>
                  <p className="text-xs font-medium mt-1">Best with: ERV Protocol preset</p>
                </div>
                
                <div className="p-2 rounded-md bg-indigo-950/30">
                  <h4 className="text-sm font-medium">ARV (Associative Remote Viewing)</h4>
                  <p className="text-xs text-muted-foreground">Used primarily for predicting binary outcomes by associating each possible outcome with a distinct target. The viewer attempts to describe a target that will be shown only if a particular outcome occurs.</p>
                  <p className="text-xs font-medium mt-1">Best with: Beta-Theta Cycling or ARV Protocol preset</p>
                </div>
              </div>
            </div>
            
            <Separator />
            
            <div className="space-y-2">
              <h3 className="text-base font-medium">Advanced Techniques</h3>
              <ul className="text-sm text-muted-foreground list-disc pl-4 space-y-1">
                <li><span className="font-medium">Energy Clearing:</span> Use the Clear Energy button between targets to reset perceptions</li>
                <li><span className="font-medium">Analytical Overlay Reduction:</span> Note but set aside analytical conclusions during the reception phase</li>
                <li><span className="font-medium">Target Focus Timer:</span> Use structured time phases to optimize different mental processes</li>
                <li><span className="font-medium">Feedback Loop:</span> Always review results with feedback to improve future sessions</li>
              </ul>
            </div>
          </CardContent>
        </TabsContent>
        
        <TabsContent value="ethics" className="mt-4">
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <h3 className="text-base font-medium flex items-center">
                <AlertTriangle className="w-4 h-4 mr-2 text-amber-400" />
                Ethical Considerations
              </h3>
              <p className="text-sm text-muted-foreground">
                Remote viewing raises important ethical questions that practitioners should consider:
              </p>
              
              <ul className="text-sm text-muted-foreground list-disc pl-4 space-y-1 mt-2">
                <li><span className="font-medium">Privacy:</span> Respect others' privacy and personal boundaries</li>
                <li><span className="font-medium">Consent:</span> Consider the ethics of viewing targets involving others without their knowledge</li>
                <li><span className="font-medium">Verification:</span> Always verify information through conventional means before acting on it</li>
                <li><span className="font-medium">Responsibility:</span> Use these abilities responsibly and for constructive purposes</li>
                <li><span className="font-medium">Scientific Integrity:</span> Maintain proper protocols to ensure reliability of results</li>
              </ul>
            </div>
            
            <Separator />
            
            <div className="p-3 rounded-md bg-amber-950/20 border border-amber-900/30">
              <h4 className="text-sm font-medium text-amber-300">Important Disclaimer</h4>
              <p className="text-xs text-muted-foreground mt-1">
                Remote viewing is considered an experimental technique. Results vary greatly between individuals and sessions. Information obtained should never be the sole basis for important decisions, especially regarding health, financial, or legal matters. Always verify information through conventional means.
              </p>
            </div>
          </CardContent>
        </TabsContent>
      </Tabs>
    </Card>
  );
};

export default RemoteViewingGuide;
