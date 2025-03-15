
import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useLanguage } from "@/contexts/LanguageContext";
import { translations } from "@/utils/translations";

interface InvoiceNumberFieldProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
}

const InvoiceNumberField: React.FC<InvoiceNumberFieldProps> = ({ value, onChange, required }) => {
  const { language } = useLanguage();
  const t = translations[language];

  return (
    <div className="space-y-2">
      <Label htmlFor="invoiceNumber" className="flex items-center">
        Document Number {required && <span className="text-red-500 ml-1">*</span>}
      </Label>
      <Input
        id="invoiceNumber"
        name="invoiceNumber"
        value={value}
        onChange={onChange}
        placeholder="DOCUMENT NUMBER"
        required={required}
      />
    </div>
  );
};

export default InvoiceNumberField;
