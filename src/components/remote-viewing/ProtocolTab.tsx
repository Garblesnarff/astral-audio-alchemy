
import React from 'react';
import { Card } from '@/components/ui/card';
import { TabsContent } from '@/components/ui/tabs';
import ProtocolInfo from './ProtocolInfo';

interface ProtocolTabProps {
  selectedProtocol: string;
  setSelectedProtocol?: (protocol: string) => void;
  isPlaybackActive?: boolean;
  isRemoteViewingPreset?: boolean;
  currentProtocol?: string;
}

const ProtocolTab: React.FC<ProtocolTabProps> = ({ 
  selectedProtocol,
  currentProtocol = selectedProtocol 
}) => {
  return (
    <TabsContent value="protocol" className="space-y-4 pt-2">
      <Card className="p-4">
        <div className="space-y-4">
          <h3 className="text-sm font-medium">Protocol Information</h3>
          <ProtocolInfo protocol={currentProtocol || selectedProtocol} />
        </div>
      </Card>
    </TabsContent>
  );
};

export default ProtocolTab;
