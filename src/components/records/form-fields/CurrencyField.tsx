
import React from "react";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useDefinitions } from "@/contexts/DefinitionsContext";

interface CurrencyFieldProps {
  value: string;
  onChange: (value: string) => void;
  required?: boolean;
}

const CurrencyField: React.FC<CurrencyFieldProps> = ({ value, onChange, required }) => {
  const { currencies } = useDefinitions();
  
  // Get only selected currencies from definitions
  const selectedCurrencies = currencies.filter(currency => currency.selected);
  
  return (
    <div className="space-y-2">
      <Label htmlFor="currency" className="flex items-center">
        Currency {required && <span className="text-red-500 ml-1">*</span>}
      </Label>
      <Select 
        value={value} 
        onValueChange={onChange}
        defaultValue="EUR"
        required={required}
      >
        <SelectTrigger id="currency" className="w-full">
          <SelectValue placeholder="Select currency" />
        </SelectTrigger>
        <SelectContent>
          {selectedCurrencies.map((currency) => (
            <SelectItem key={currency.code} value={currency.code}>
              {currency.code}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default CurrencyField;
