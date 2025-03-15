
import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { formatText } from "@/utils/formatUtils";
import { useLanguage } from "@/contexts/LanguageContext";
import { translations } from "@/utils/translations";

interface DocumentFieldProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
}

const DocumentField: React.FC<DocumentFieldProps> = ({ value, onChange, required }) => {
  const { language } = useLanguage();
  const t = translations[language];

  return (
    <div className="space-y-2">
      <Label htmlFor="documentName" className="flex items-center">
        Document Name {required && <span className="text-red-500 ml-1">*</span>}
      </Label>
      <Input
        id="documentName"
        name="documentName"
        value={value}
        onChange={onChange}
        placeholder="DOCUMENT NAME"
        required={required}
      />
    </div>
  );
};

export default DocumentField;
