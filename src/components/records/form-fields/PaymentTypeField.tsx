
import React from "react";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useDefinitions } from "@/contexts/DefinitionsContext";

interface PaymentTypeFieldProps {
  value: string;
  onChange: (value: string) => void;
}

const PaymentTypeField: React.FC<PaymentTypeFieldProps> = ({ value, onChange }) => {
  const { categories } = useDefinitions();
  
  // Get payment type subcategories from definitions
  const paymentTypeCategory = categories.find(cat => cat.id === "paymentType");
  const paymentTypes = paymentTypeCategory?.subcategories || [];
  
  // Add "BEKLEMEDE" as a default option if it doesn't exist
  const hasWaitingOption = paymentTypes.some(type => type.name === "BEKLEMEDE");
  const allPaymentTypes = hasWaitingOption 
    ? paymentTypes 
    : [{ id: "waiting", name: "BEKLEMEDE" }, ...paymentTypes];
  
  return (
    <div className="space-y-2 col-span-2">
      <Label htmlFor="paymentType">Payment Type</Label>
      <Select 
        value={value} 
        onValueChange={onChange}
        defaultValue={hasWaitingOption ? undefined : "waiting"}
      >
        <SelectTrigger id="paymentType">
          <SelectValue placeholder="Select payment type" />
        </SelectTrigger>
        <SelectContent>
          {allPaymentTypes.map((type) => (
            <SelectItem key={type.id} value={type.id}>
              {type.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default PaymentTypeField;
