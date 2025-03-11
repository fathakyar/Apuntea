
import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface AmountFieldsProps {
  amount: string;
  vat: string;
  totalAmount: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const AmountFields: React.FC<AmountFieldsProps> = ({ amount, vat, totalAmount, onChange }) => {
  return (
    <>
      <div className="space-y-2">
        <Label htmlFor="amount">Amount</Label>
        <Input
          id="amount"
          name="amount"
          value={amount}
          onChange={onChange}
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
          onChange={onChange}
          required
          type="text"
          inputMode="decimal"
          placeholder="0,00"
        />
      </div>

      <div className="space-y-2 md:col-span-2">
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
