
import React from "react";
import { RecordType } from "@/types";
import { formatText, formatNumberWithEuropeanStyle, parseEuropeanNumber } from "@/utils/formatUtils";
import CompanyAutocomplete from "@/components/CompanyAutocomplete";
import DocumentField from "./form-fields/DocumentField";
import DateField from "./form-fields/DateField";
import InvoiceNumberField from "./form-fields/InvoiceNumberField";
import AmountFields from "./form-fields/AmountFields";
import CategoryField from "./form-fields/CategoryField";

interface RecordFormFieldsProps {
  formData: {
    documentName: string;
    invoiceDate: string;
    invoiceNumber: string;
    companyName: string;
    amount: string;
    vat: string;
    totalAmount: string;
    categoryId: string;
  };
  setFormData: React.Dispatch<React.SetStateAction<{
    documentName: string;
    invoiceDate: string;
    invoiceNumber: string;
    companyName: string;
    amount: string;
    vat: string;
    totalAmount: string;
    categoryId: string;
  }>>;
  recordType: RecordType;
}

const RecordFormFields: React.FC<RecordFormFieldsProps> = ({ formData, setFormData, recordType }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    
    if (name === "amount" || name === "vat") {
      // Allow direct input of numbers without immediately formatting
      // This will let users type values like "1500" without interference
      setFormData(prev => {
        let numericInput = value.replace(/[^\d,]/g, ''); // Keep only digits and comma
        
        // Calculate the total
        const otherField = name === "amount" ? "vat" : "amount";
        const otherValue = prev[otherField] || "0";
        
        // Parse values safely
        let currentValue = 0;
        let otherFieldValue = 0;
        
        try {
          // Handle comma as decimal separator
          currentValue = numericInput ? parseFloat(numericInput.replace(",", ".")) : 0;
          otherFieldValue = parseEuropeanNumber(otherValue);
        } catch (error) {
          console.error("Error parsing number:", error);
        }
        
        const total = currentValue + otherFieldValue;
        
        // Format total amount with European style
        const formattedTotal = formatNumberWithEuropeanStyle(total, { formatNumber: true });
        
        return {
          ...prev,
          [name]: numericInput,
          totalAmount: formattedTotal
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

  const handleCategoryChange = (value: string) => {
    setFormData(prev => ({
      ...prev,
      categoryId: value
    }));
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

      <CategoryField
        value={formData.categoryId}
        onChange={handleCategoryChange}
        recordType={recordType}
      />
    </div>
  );
};

export default RecordFormFields;
