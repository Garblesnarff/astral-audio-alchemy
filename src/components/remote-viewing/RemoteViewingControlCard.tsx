
import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Target } from 'lucide-react';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface RemoteViewingControlCardProps {
  children: React.ReactNode;
  selectedTab: string;
  onTabChange: (value: string) => void;
}

const RemoteViewingControlCard: React.FC<RemoteViewingControlCardProps> = ({
  children,
  selectedTab,
  onTabChange
}) => {
  return (
    <Card className="border-indigo-400/30 bg-gradient-to-br from-indigo-950/10 to-purple-950/10">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center text-lg">
          <Target className="w-5 h-5 mr-2 text-indigo-400" />
          Remote Viewing Controls
        </CardTitle>
        <CardDescription>
          Tools for enhancing your remote viewing sessions
        </CardDescription>
      </CardHeader>
      
      <Tabs value={selectedTab} onValueChange={onTabChange}>
        <TabsList className="w-full grid grid-cols-3">
          <TabsTrigger value="controls">Controls</TabsTrigger>
          <TabsTrigger value="timer">Target Timer</TabsTrigger>
          <TabsTrigger value="protocol">Protocol</TabsTrigger>
        </TabsList>
        
        {children}
      </Tabs>
    </Card>
  );
};

export default RemoteViewingControlCard;
