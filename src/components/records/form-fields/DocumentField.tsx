
import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface DocumentFieldProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const DocumentField: React.FC<DocumentFieldProps> = ({ value, onChange }) => {
  return (
    <div className="space-y-2">
      <Label htmlFor="documentName">Document Name</Label>
      <Input
        id="documentName"
        name="documentName"
        value={value}
        onChange={onChange}
        required
      />
    </div>
  );
};

export default DocumentField;
