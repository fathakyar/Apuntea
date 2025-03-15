
import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useLanguage } from "@/contexts/LanguageContext";
import { translations } from "@/utils/translations";

interface DateFieldProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
}

const DateField: React.FC<DateFieldProps> = ({ value, onChange, required }) => {
  const { language } = useLanguage();
  const t = translations[language];

  return (
    <div className="space-y-2">
      <Label htmlFor="invoiceDate" className="flex items-center">
        Document Date {required && <span className="text-red-500 ml-1">*</span>}
      </Label>
      <Input
        id="invoiceDate"
        name="invoiceDate"
        type="date"
        value={value}
        onChange={onChange}
        required={required}
      />
    </div>
  );
};

export default DateField;
