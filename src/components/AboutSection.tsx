
import { Info } from 'lucide-react';

const AboutSection = () => (
  <div className="bg-card/80 border border-border rounded-lg p-4 mt-6">
    <div className="flex items-start space-x-3">
      <Info className="h-5 w-5 text-primary mt-0.5" />
      <div className="text-sm">
        <p className="font-medium">About Binaural Beats</p>
        <p className="text-muted-foreground mt-1">
          Binaural beats occur when two slightly different frequencies are played separately in each ear, 
          creating a perceived third beat. They may help with relaxation, focus, and sleep. 
          Individual results may vary. Consult a doctor if you have neurological conditions or seizure disorders.
        </p>
      </div>
    </div>
  </div>
);

export default AboutSection;
