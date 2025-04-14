
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { presets, Preset, getPresetById } from '@/utils/presets';
import PresetCard from '@/components/PresetCard';

interface PresetSelectionProps {
  selectedPreset: string | null;
  onSelectPreset: (presetId: string) => void;
  currentTab: string;
  onTabChange: (value: string) => void;
}

const PresetSelection: React.FC<PresetSelectionProps> = ({ 
  selectedPreset, 
  onSelectPreset,
  currentTab,
  onTabChange
}) => {
  const presetsByCategory: Record<string, Preset[]> = presets.reduce((acc, preset) => {
    const category = preset.category;
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(preset);
    return acc;
  }, {} as Record<string, Preset[]>);
  
  const categories = Object.keys(presetsByCategory);
  
  return (
    <Tabs defaultValue={currentTab} onValueChange={onTabChange}>
      <TabsList className="grid grid-cols-7 gap-1">
        {categories.map((category) => (
          <TabsTrigger key={category} value={category} className="capitalize">
            {category === 'special' ? '👽' : 
             category === 'lucid' ? '💤' : 
             category === 'astral' ? '🚀' : 
             category}
          </TabsTrigger>
        ))}
      </TabsList>
      
      {categories.map((category) => (
        <TabsContent key={category} value={category} className="p-0 mt-4">
          <div className={`grid ${
            category === 'lucid' || category === 'astral'
              ? 'grid-cols-2 gap-4' 
              : 'grid-cols-1 sm:grid-cols-2 gap-4'
          }`}>
            {presetsByCategory[category].map((preset) => (
              <PresetCard
                key={preset.id}
                preset={preset}
                isActive={selectedPreset === preset.id}
                onSelect={onSelectPreset}
              />
            ))}
          </div>
        </TabsContent>
      ))}
    </Tabs>
  );
};

export default PresetSelection;
