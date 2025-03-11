
import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import CompanyAutocomplete from "@/components/CompanyAutocomplete";
import { formatText, formatNumberWithEuropeanStyle, parseEuropeanNumber } from "@/utils/formatUtils";
import DocumentField from "./form-fields/DocumentField";
import DateField from "./form-fields/DateField";
import InvoiceNumberField from "./form-fields/InvoiceNumberField";
import AmountFields from "./form-fields/AmountFields";

interface RecordFormFieldsProps {
  formData: {
    documentName: string;
    invoiceDate: string;
    invoiceNumber: string;
    companyName: string;
    amount: string;
    vat: string;
    totalAmount: string;
  };
  setFormData: React.Dispatch<React.SetStateAction<{
    documentName: string;
    invoiceDate: string;
    invoiceNumber: string;
    companyName: string;
    amount: string;
    vat: string;
    totalAmount: string;
  }>>;
}

const RecordFormFields: React.FC<RecordFormFieldsProps> = ({ formData, setFormData }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    
    if (name === "amount" || name === "vat") {
      let numericValue = 0;
      try {
        numericValue = parseEuropeanNumber(value);
      } catch (error) {
        // If parsing fails, use 0
        numericValue = 0;
      }
      
      const formattedValue = formatNumberWithEuropeanStyle(numericValue, { formatNumber: true });
      
      setFormData(prev => {
        const amount = name === "amount" ? numericValue : parseEuropeanNumber(prev.amount);
        const vat = name === "vat" ? numericValue : parseEuropeanNumber(prev.vat);
        const total = amount + vat;
        
        return {
          ...prev,
          [name]: formattedValue,
          totalAmount: formatNumberWithEuropeanStyle(total, { formatNumber: true })
        };
      });
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: name === "documentName" || name === "invoiceNumber" 
          ? formatText(value, { toUpperCase: true })
          : value
      }));
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <DocumentField 
        value={formData.documentName} 
        onChange={handleChange} 
      />

      <DateField 
        value={formData.invoiceDate} 
        onChange={handleChange} 
      />

      <InvoiceNumberField 
        value={formData.invoiceNumber} 
        onChange={handleChange} 
      />

      <div className="space-y-2">
        <CompanyAutocomplete
          value={formData.companyName}
          onChange={(value) => setFormData(prev => ({ ...prev, companyName: value }))}
          required
        />
      </div>

      <AmountFields 
        amount={formData.amount}
        vat={formData.vat}
        totalAmount={formData.totalAmount}
        onChange={handleChange}
      />
    </div>
  );
};

export default RecordFormFields;
