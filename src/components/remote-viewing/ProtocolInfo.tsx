
import React from 'react';

interface ProtocolInfoProps {
  protocol: string;
}

const ProtocolInfo: React.FC<ProtocolInfoProps> = ({ protocol }) => {
  switch (protocol) {
    case 'crv':
      return (
        <div className="space-y-2">
          <h4 className="text-sm font-medium">CRV Protocol</h4>
          <p className="text-xs text-muted-foreground">A structured 6-stage approach:</p>
          <ul className="text-xs text-muted-foreground list-disc pl-4 space-y-1">
            <li>Stage 1: Ideogram - Initial impressions</li>
            <li>Stage 2: Sensory data - Tastes, smells, etc.</li>
            <li>Stage 3: Dimensional data - Sizes, shapes</li>
            <li>Stage 4: Emotional/aesthetic data</li>
            <li>Stage 5: Analytical data</li>
            <li>Stage 6: Summary and debriefing</li>
          </ul>
        </div>
      );
    case 'erv':
      return (
        <div className="space-y-2">
          <h4 className="text-sm font-medium">ERV Protocol</h4>
          <p className="text-xs text-muted-foreground">Uses deeper delta states:</p>
          <ul className="text-xs text-muted-foreground list-disc pl-4 space-y-1">
            <li>Longer sessions (typically 60+ minutes)</li>
            <li>Deeper delta wave entrainment</li>
            <li>Semi-dream state approach</li>
            <li>Less structured than CRV</li>
            <li>Enhanced for spatial details</li>
          </ul>
        </div>
      );
    case 'arv':
      return (
        <div className="space-y-2">
          <h4 className="text-sm font-medium">ARV Protocol</h4>
          <p className="text-xs text-muted-foreground">Optimized for binary predictions:</p>
          <ul className="text-xs text-muted-foreground list-disc pl-4 space-y-1">
            <li>Associating targets with outcomes</li>
            <li>Useful for future event prediction</li>
            <li>Alternating beta-theta frequencies</li>
            <li>Specialized for binary choices</li>
            <li>Enhanced pattern recognition</li>
          </ul>
        </div>
      );
    default:
      return null;
  }
};

export default ProtocolInfo;
