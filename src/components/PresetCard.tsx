
import React from 'react';
import { Preset } from '@/utils/presets';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle, Clock } from 'lucide-react';

interface PresetCardProps {
  preset: Preset;
  isActive: boolean;
  onSelect: (presetId: string) => void;
}

const PresetCard: React.FC<PresetCardProps> = ({ preset, isActive, onSelect }) => {
  // Map categories to emoji icons
  const categoryIcons: Record<string, string> = {
    relaxation: '😌',
    sleep: '😴',
    concentration: '🧠',
    meditation: '🧘',
    special: '👽'
  };
  
  const icon = categoryIcons[preset.category] || '🔊';
  
  const handleCardClick = () => {
    onSelect(preset.id);
  };
  
  return (
    <Card 
      className={`relative transition-all duration-300 hover:shadow-lg ${
        isActive ? 'border-primary shadow-primary/20 shadow-lg' : 'hover:scale-[1.02]'
      } cursor-pointer`}
      onClick={handleCardClick}
    >
      {isActive && (
        <div className="absolute -top-2 -right-2 bg-primary rounded-full p-0.5">
          <CheckCircle className="h-4 w-4 text-primary-foreground" />
        </div>
      )}
      
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-lg">
              {icon} {preset.name}
            </CardTitle>
            <CardDescription>{preset.description}</CardDescription>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="pb-2">
        <div className="grid grid-cols-2 gap-1 text-xs text-muted-foreground">
          <div>Base: {preset.baseFrequency} Hz</div>
          <div>Beat: {preset.beatFrequency} Hz</div>
        </div>
        
        <div className="mt-3 flex flex-wrap gap-1">
          {preset.benefits.map((benefit, index) => (
            <span 
              key={index} 
              className="inline-flex text-xs py-1 px-2 bg-secondary rounded-full"
            >
              {benefit}
            </span>
          ))}
        </div>
      </CardContent>
      
      <CardFooter className="pt-1 justify-between items-center">
        <div className="flex items-center text-xs text-muted-foreground">
          <Clock className="h-3 w-3 mr-1" />
          {preset.recommendedDuration} mins
        </div>
        
        <Button 
          size="sm" 
          variant={isActive ? "default" : "secondary"}
          onClick={(e) => {
            // Prevent the card's onClick from firing
            e.stopPropagation();
            onSelect(preset.id);
          }}
        >
          {isActive ? 'Selected' : 'Select'}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default PresetCard;
