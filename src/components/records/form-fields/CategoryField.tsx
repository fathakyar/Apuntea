
import React from "react";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useDefinitions } from "@/contexts/DefinitionsContext";
import { Subcategory } from "@/types";
import { RecordType } from "@/types";

interface CategoryFieldProps {
  value: string;
  onChange: (value: string) => void;
  recordType: RecordType;
}

const CategoryField: React.FC<CategoryFieldProps> = ({ value, onChange, recordType }) => {
  const { categories } = useDefinitions();
  
  // Get the appropriate category based on record type
  const category = categories.find(cat => cat.id === recordType.toLowerCase());
  const subcategories = category?.subcategories || [];

  return (
    <div className="space-y-2 col-span-2">
      <Label htmlFor="category">Category</Label>
      <Select 
        value={value} 
        onValueChange={onChange}
      >
        <SelectTrigger id="category">
          <SelectValue placeholder="Select a category" />
        </SelectTrigger>
        <SelectContent>
          {subcategories.map((subcategory: Subcategory) => (
            <SelectItem key={subcategory.id} value={subcategory.id}>
              {subcategory.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default CategoryField;
