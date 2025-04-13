
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { presets, Preset } from '@/utils/presets';
import PresetCard from '@/components/PresetCard';

interface PresetSelectorProps {
  selectedPreset: string | null;
  currentTab: string;
  setCurrentTab: (value: string) => void;
  handleSelectPreset: (presetId: string) => void;
}

const PresetSelector: React.FC<PresetSelectorProps> = ({
  selectedPreset,
  currentTab,
  setCurrentTab,
  handleSelectPreset,
}) => {
  // Group presets by category
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
    <Tabs defaultValue={currentTab} onValueChange={setCurrentTab}>
      <TabsList className="grid grid-cols-5">
        {categories.map((category) => (
          <TabsTrigger key={category} value={category} className="capitalize">
            {category === 'special' ? '👽' : category}
          </TabsTrigger>
        ))}
      </TabsList>
      
      {categories.map((category) => (
        <TabsContent key={category} value={category} className="p-0 mt-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {presetsByCategory[category].map((preset) => (
              <PresetCard
                key={preset.id}
                preset={preset}
                isActive={selectedPreset === preset.id}
                onSelect={handleSelectPreset}
              />
            ))}
          </div>
        </TabsContent>
      ))}
    </Tabs>
  );
};

export default PresetSelector;
