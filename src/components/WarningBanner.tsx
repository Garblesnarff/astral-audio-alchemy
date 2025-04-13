
import { AlertTriangle } from 'lucide-react';

const WarningBanner = () => (
  <div className="bg-card/80 border border-border rounded-lg p-4 flex items-start space-x-3">
    <AlertTriangle className="h-5 w-5 text-yellow-500 mt-0.5" />
    <div className="text-sm">
      <p className="font-medium">Important: Use headphones for binaural beats</p>
      <p className="text-muted-foreground mt-1">
        Binaural beats require stereo headphones to be effective. Keep volume at a comfortable level.
        When using the Alien Summoning tone, always switch to a different preset by clicking "Play" after selecting.
      </p>
    </div>
  </div>
);

export default WarningBanner;
