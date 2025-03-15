
import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { formatNumberWithEuropeanStyle, parseEuropeanNumber } from "@/utils/formatUtils";
import { translations } from "@/utils/translations";
import { useLanguage } from "@/contexts/LanguageContext";

interface AmountFieldsProps {
  amount: string;
  vat: string;
  totalAmount: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const AmountFields: React.FC<AmountFieldsProps> = ({ amount, vat, totalAmount, onChange }) => {
  const { language } = useLanguage();
  const t = translations[language];

  // Handle input change with proper validation
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    
    // Only allow numbers, commas and dots
    if (!/^[\d.,]*$/.test(value) && value !== '') {
      return; // Don't process invalid inputs
    }
    
    // Pass the validated input value to parent component
    onChange(e);
  };

  return (
    <>
      <div className="space-y-2">
        <Label htmlFor="amount" className="flex items-center">
          Amount <span className="text-red-500 ml-1">*</span>
        </Label>
        <Input
          id="amount"
          name="amount"
          value={amount}
          onChange={handleInputChange}
          required
          type="text"
          inputMode="decimal"
          placeholder="0,00"
          className="number-input"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="vat" className="flex items-center">
          VAT <span className="text-red-500 ml-1">*</span>
        </Label>
        <Input
          id="vat"
          name="vat"
          value={vat}
          onChange={handleInputChange}
          required
          type="text"
          inputMode="decimal"
          placeholder="0,00"
          className="number-input"
        />
      </div>

      <div className="space-y-2 col-span-1">
        <Label htmlFor="totalAmount" className="flex items-center">
          Total Amount <span className="text-red-500 ml-1">*</span>
        </Label>
        <Input
          id="totalAmount"
          name="totalAmount"
          value={totalAmount}
          readOnly
          className="font-medium"
        />
      </div>
    </>
  );
};

export default AmountFields;
