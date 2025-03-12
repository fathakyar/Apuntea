
import React from "react";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Label } from "@/components/ui/label";

interface EventTypeToggleProps {
  value: string;
  onChange: (value: string) => void;
  getLabel: (key: string) => string;
}

const EventTypeToggle: React.FC<EventTypeToggleProps> = ({
  value,
  onChange,
  getLabel,
}) => {
  return (
    <div className="space-y-2">
      <Label>{getLabel("type")}</Label>
      <ToggleGroup type="single" value={value} onValueChange={onChange} className="justify-start">
        <ToggleGroupItem value="NOT" className="data-[state=on]:bg-blue-500 data-[state=on]:text-white">
          {getLabel("note")}
        </ToggleGroupItem>
        <ToggleGroupItem value="GÖREV" className="data-[state=on]:bg-green-500 data-[state=on]:text-white">
          {getLabel("task")}
        </ToggleGroupItem>
      </ToggleGroup>
    </div>
  );
};

export default EventTypeToggle;
