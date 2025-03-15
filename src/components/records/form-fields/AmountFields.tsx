
import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { formatNumberWithEuropeanStyle, parseEuropeanNumber } from "@/utils/formatUtils";

interface AmountFieldsProps {
  amount: string;
  vat: string;
  totalAmount: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const AmountFields: React.FC<AmountFieldsProps> = ({ amount, vat, totalAmount, onChange }) => {
  // Format the amount for display
  const formatInputValue = (value: string) => {
    if (!value) return "";
    
    try {
      const numericValue = parseEuropeanNumber(value);
      return formatNumberWithEuropeanStyle(numericValue, { formatNumber: true });
    } catch (e) {
      return value;
    }
  };

  // Handle input change with proper formatting
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    
    // Allow input of numbers, comma, and dot
    if (!/^[0-9]*[,.]?[0-9]*$/.test(value) && value !== '') {
      return; // Don't process invalid inputs
    }
    
    // Create a synthetic event with the sanitized value
    const syntheticEvent = {
      ...e,
      target: {
        ...e.target,
        value: value
      }
    } as React.ChangeEvent<HTMLInputElement>;
    
    onChange(syntheticEvent);
  };

  return (
    <>
      <div className="space-y-2">
        <Label htmlFor="amount">Amount</Label>
        <Input
          id="amount"
          name="amount"
          value={amount}
          onChange={handleInputChange}
          required
          type="text"
          inputMode="decimal"
          placeholder="0,00"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="vat">VAT</Label>
        <Input
          id="vat"
          name="vat"
          value={vat}
          onChange={handleInputChange}
          required
          type="text"
          inputMode="decimal"
          placeholder="0,00"
        />
      </div>

      <div className="space-y-2 col-span-1">
        <Label htmlFor="totalAmount">Total Amount</Label>
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
