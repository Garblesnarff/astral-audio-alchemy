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
  return <div className="space-y-4">
      <Tabs defaultValue={currentTab} onValueChange={onTabChange}>
        <div className="bg-card rounded-lg p-1 overflow-hidden">
          <TabsList className="grid grid-cols-4 sm:grid-cols-4 gap-2 w-full mx-0 py-2 px-0 h-37">
            {categories.map(category => <TabsTrigger key={category} value={category} className="capitalize py-3.5 px-1 text-xs sm:text-sm whitespace-nowrap overflow-hidden text-ellipsis">
                {category === 'special' ? '👽' : category === 'lucid' ? '💤' : category === 'astral' ? '🚀' : category === 'remote' ? '🔭' : category}
              </TabsTrigger>)}
          </TabsList>
        </div>
        
        {categories.map(category => <TabsContent key={category} value={category} className="p-0 mt-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {presetsByCategory[category].map(preset => <PresetCard key={preset.id} preset={preset} isActive={selectedPreset === preset.id} onSelect={onSelectPreset} />)}
            </div>
          </TabsContent>)}
      </Tabs>
    </div>;
};
export default PresetSelection;