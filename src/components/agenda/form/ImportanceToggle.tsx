
import React from "react";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Label } from "@/components/ui/label";
import { AlertTriangle } from "lucide-react";

interface ImportanceToggleProps {
  value: string;
  onChange: (value: string) => void;
  getLabel: (key: string) => string;
}

const ImportanceToggle: React.FC<ImportanceToggleProps> = ({
  value,
  onChange,
  getLabel,
}) => {
  return (
    <div className="space-y-2">
      <Label>{getLabel("importance")}</Label>
      <ToggleGroup type="single" value={value} onValueChange={onChange} className="justify-start">
        <ToggleGroupItem value="!" className="data-[state=on]:bg-yellow-500 data-[state=on]:text-black">
          <AlertTriangle className="h-4 w-4 mr-1" />
          !
        </ToggleGroupItem>
        <ToggleGroupItem value="!!" className="data-[state=on]:bg-orange-500 data-[state=on]:text-white">
          <AlertTriangle className="h-4 w-4 mr-1" />
          !!
        </ToggleGroupItem>
        <ToggleGroupItem value="!!!" className="data-[state=on]:bg-red-500 data-[state=on]:text-white">
          <AlertTriangle className="h-4 w-4 mr-1" />
          !!!
        </ToggleGroupItem>
      </ToggleGroup>
    </div>
  );
};

export default ImportanceToggle;
