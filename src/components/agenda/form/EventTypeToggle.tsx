
import React from "react";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Label } from "@/components/ui/label";
import { Subcategory } from "@/types";

interface EventTypeToggleProps {
  value: string;
  onChange: (value: string) => void;
  getLabel: (key: string) => string;
  subcategories: Subcategory[];
}

const EventTypeToggle: React.FC<EventTypeToggleProps> = ({
  value,
  onChange,
  getLabel,
  subcategories
}) => {
  return (
    <div className="space-y-2">
      <Label>{getLabel("type")}</Label>
      <ToggleGroup type="single" value={value} onValueChange={onChange} className="flex flex-wrap justify-start gap-1">
        {subcategories.map((subcategory) => (
          <ToggleGroupItem 
            key={subcategory.id} 
            value={subcategory.name} 
            className="data-[state=on]:bg-blue-500 data-[state=on]:text-white"
          >
            {subcategory.name}
          </ToggleGroupItem>
        ))}
      </ToggleGroup>
    </div>
  );
};

export default EventTypeToggle;
