
import React from "react";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useDefinitions } from "@/contexts/DefinitionsContext";

interface PaymentTypeFieldProps {
  value: string;
  onChange: (value: string) => void;
  required?: boolean;
}

const PaymentTypeField: React.FC<PaymentTypeFieldProps> = ({ value, onChange, required }) => {
  const { categories } = useDefinitions();
  
  // Get payment type subcategories from definitions
  const paymentTypeCategory = categories.find(cat => cat.id === "paymentType");
  const paymentTypes = paymentTypeCategory?.subcategories || [];
  
  return (
    <div className="space-y-2 col-span-2">
      <Label htmlFor="paymentType" className="flex items-center">
        Payment Type {required && <span className="text-red-500 ml-1">*</span>}
      </Label>
      <Select 
        value={value} 
        onValueChange={onChange}
        required={required}
      >
        <SelectTrigger id="paymentType">
          <SelectValue placeholder="Select payment type" />
        </SelectTrigger>
        <SelectContent>
          {paymentTypes.map((type) => (
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
