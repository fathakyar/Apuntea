
import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface DateFieldProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const DateField: React.FC<DateFieldProps> = ({ value, onChange }) => {
  return (
    <div className="space-y-2">
      <Label htmlFor="invoiceDate">Invoice Date</Label>
      <Input
        id="invoiceDate"
        name="invoiceDate"
        type="date"
        value={value}
        onChange={onChange}
        required
      />
    </div>
  );
};

export default DateField;
