
import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface InvoiceNumberFieldProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const InvoiceNumberField: React.FC<InvoiceNumberFieldProps> = ({ value, onChange }) => {
  return (
    <div className="space-y-2">
      <Label htmlFor="invoiceNumber">Document Number</Label>
      <Input
        id="invoiceNumber"
        name="invoiceNumber"
        value={value}
        onChange={onChange}
        required
      />
    </div>
  );
};

export default InvoiceNumberField;
