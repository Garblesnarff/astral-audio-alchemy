
import React from 'react';
import { AlertTriangle, Info, BrainCircuit, Moon } from 'lucide-react';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { Button } from '@/components/ui/button';

const InfoBanners: React.FC = () => {
  const [isLucidDreamingInfoOpen, setLucidDreamingInfoOpen] = React.useState(false);
  
  return (
    <>
      <div className="rounded-lg border bg-card p-4 mb-6 text-card-foreground shadow-sm">
        <div className="flex items-start space-x-4">
          <AlertTriangle className="h-5 w-5 text-amber-500 mt-0.5" />
          <div>
            <h3 className="font-medium">Important Safety Information</h3>
            <p className="text-sm text-muted-foreground mt-1">
              Use headphones for the best binaural beat experience. If you have epilepsy, a pacemaker, or are pregnant, consult a doctor before use. Stop immediately if you experience discomfort.
            </p>
          </div>
        </div>
      </div>
      
      <Collapsible
        open={isLucidDreamingInfoOpen}
        onOpenChange={setLucidDreamingInfoOpen}
        className="rounded-lg border border-purple-700/50 bg-gradient-to-br from-purple-900/30 to-purple-800/20 p-4 mb-6 shadow-sm"
      >
        <div className="flex items-start space-x-4">
          <div className="flex-shrink-0">
            <Moon className="h-5 w-5 text-purple-400" />
          </div>
          <div className="flex-1">
            <div className="flex items-center justify-between">
              <h3 className="font-medium text-purple-200">Lucid Dreaming Guide</h3>
              <CollapsibleTrigger asChild>
                <Button variant="ghost" size="sm" className="p-0 h-auto">
                  <span className="text-xs text-purple-400 underline">
                    {isLucidDreamingInfoOpen ? "Show Less" : "Learn More"}
                  </span>
                </Button>
              </CollapsibleTrigger>
            </div>
            <p className="text-sm text-purple-300/80 mt-1">
              Our lucid dreaming presets use specific frequency patterns to help induce and maintain lucid dreams.
            </p>
            
            <CollapsibleContent className="mt-4 space-y-4">
              <div>
                <h4 className="text-sm font-medium text-purple-200 flex items-center gap-2">
                  <BrainCircuit className="h-4 w-4" />
                  The Science of Lucid Dreaming
                </h4>
                <p className="text-xs text-purple-300/80 mt-1">
                  Lucid dreaming occurs when you become aware that you're dreaming while still in the dream state. Research shows that theta waves (4-8 Hz) are associated with REM sleep, while gamma activity (~40 Hz) is heightened during lucid dreams, indicating increased conscious awareness within the dream state.
                </p>
              </div>
              
              <div>
                <h4 className="text-sm font-medium text-purple-200">How Binaural Beats Help</h4>
                <p className="text-xs text-purple-300/80 mt-1">
                  Binaural beats can help entrain your brain to the optimal frequencies for lucid dreaming:
                </p>
                <ul className="list-disc list-inside text-xs text-purple-300/80 mt-1 space-y-1">
                  <li>Theta waves (4-8 Hz) for dream states</li>
                  <li>Alpha-theta mixes (6-10 Hz) for the hypnagogic state</li>
                  <li>Gamma waves (~40 Hz) to stimulate the frequencies associated with lucidity</li>
                </ul>
              </div>
              
              <div>
                <h4 className="text-sm font-medium text-purple-200">Best Practices</h4>
                <ul className="list-disc list-inside text-xs text-purple-300/80 mt-1 space-y-1">
                  <li>Use before sleep or during a Wake-Back-To-Bed (WBTB) practice</li>
                  <li>Combine with reality checks during the day</li>
                  <li>Keep a dream journal to improve recall</li>
                  <li>Stay consistent with your practice</li>
                  <li>Use the reality check sounds to trigger awareness during dreams</li>
                </ul>
              </div>
              
              <div>
                <h4 className="text-sm font-medium text-purple-200">Safety Considerations</h4>
                <p className="text-xs text-purple-300/80 mt-1">
                  Lucid dreaming is generally safe, but some people may experience:
                </p>
                <ul className="list-disc list-inside text-xs text-purple-300/80 mt-1 space-y-1">
                  <li>Sleep disruption if practiced too intensely</li>
                  <li>Confusion between dreams and reality (rare)</li>
                  <li>Sleep paralysis (temporary and harmless but can be frightening)</li>
                </ul>
                <p className="text-xs text-purple-300/80 mt-2">
                  If you experience any distress, discontinue use and consult a sleep specialist.
                </p>
              </div>
            </CollapsibleContent>
          </div>
        </div>
      </Collapsible>
    </>
  );
};

export default InfoBanners;
