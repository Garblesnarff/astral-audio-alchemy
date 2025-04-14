
import React from 'react';
import { TabsContent, TabsContentProps } from '@/components/ui/tabs';
import { CardContent } from '@/components/ui/card';
import { Brain } from 'lucide-react';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/components/ui/use-toast';
import audioEngine from '@/utils/audioEngine';
import ProtocolInfo from './ProtocolInfo';

interface ProtocolTabProps extends TabsContentProps {
  selectedProtocol: string;
  setSelectedProtocol: (protocol: string) => void;
  isPlaybackActive: boolean;
  isRemoteViewingPreset: boolean;
}

const ProtocolTab: React.FC<ProtocolTabProps> = ({
  selectedProtocol,
  setSelectedProtocol,
  isPlaybackActive,
  isRemoteViewingPreset,
  ...props
}) => {
  const { toast } = useToast();
  
  const changeProtocol = (protocol: string) => {
    setSelectedProtocol(protocol);
    
    if (isPlaybackActive && isRemoteViewingPreset) {
      audioEngine.setRemoteViewingProtocol(protocol as 'crv' | 'erv' | 'arv');
      
      const protocolNames = {
        crv: "Coordinate Remote Viewing",
        erv: "Extended Remote Viewing",
        arv: "Associative Remote Viewing"
      };
      
      const protocolDescriptions = {
        crv: "structured 6-stage protocol",
        erv: "deeper states for extended sessions",
        arv: "specialized for prediction tasks"
      };
      
      toast({
        title: `${protocol.toUpperCase()} Protocol Selected`,
        description: `${protocolNames[protocol as keyof typeof protocolNames]}: ${protocolDescriptions[protocol as keyof typeof protocolDescriptions]}`,
      });
    }
  };
  
  return (
    <TabsContent value="protocol" className="mt-4" {...props}>
      <CardContent className="space-y-4 pb-3">
        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <Brain className="h-5 w-5 text-indigo-400" />
            <Label htmlFor="protocol">Select Protocol</Label>
          </div>
          
          <Select 
            value={selectedProtocol} 
            onValueChange={changeProtocol}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select protocol" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="crv">CRV - Coordinate Remote Viewing</SelectItem>
              <SelectItem value="erv">ERV - Extended Remote Viewing</SelectItem>
              <SelectItem value="arv">ARV - Associative Remote Viewing</SelectItem>
            </SelectContent>
          </Select>
          
          <div className="p-3 bg-indigo-950/20 rounded-md">
            <ProtocolInfo protocol={selectedProtocol} />
          </div>
        </div>
      </CardContent>
    </TabsContent>
  );
};

export default ProtocolTab;
