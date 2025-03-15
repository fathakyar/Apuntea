
import React from "react";
import { RecordType } from "@/types";
import { formatText, formatNumberWithEuropeanStyle, parseEuropeanNumber } from "@/utils/formatUtils";
import CompanyAutocomplete from "@/components/CompanyAutocomplete";
import DocumentField from "./form-fields/DocumentField";
import DateField from "./form-fields/DateField";
import InvoiceNumberField from "./form-fields/InvoiceNumberField";
import AmountFields from "./form-fields/AmountFields";
import CategoryField from "./form-fields/CategoryField";
import CurrencyField from "./form-fields/CurrencyField";
import PaymentTypeField from "./form-fields/PaymentTypeField";

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
    currencyCode: string;
    paymentTypeId: string;
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
    currencyCode: string;
    paymentTypeId: string;
  }>>;
  recordType: RecordType;
}

const RecordFormFields: React.FC<RecordFormFieldsProps> = ({ formData, setFormData, recordType }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    
    if (name === "amount" || name === "vat") {
      // Process number inputs
      setFormData(prev => {
        // Sanitize numeric input but allow correct format for European numbers
        let updatedValue = value;
        
        // Calculate the total
        const otherField = name === "amount" ? "vat" : "amount";
        const otherValue = prev[otherField] || "0";
        
        // Parse values safely
        let currentAmount = 0;
        let otherAmount = 0;
        
        try {
          // Handle comma as decimal separator
          if (updatedValue) {
            currentAmount = parseEuropeanNumber(updatedValue);
          }
          
          if (otherValue) {
            otherAmount = parseEuropeanNumber(otherValue);
          }
        } catch (error) {
          console.error("Error parsing number:", error);
        }
        
        // Calculate total only if both inputs are valid numbers
        const total = currentAmount + otherAmount;
        
        // Format total amount with European style
        const formattedTotal = formatNumberWithEuropeanStyle(total, { formatNumber: true });
        
        return {
          ...prev,
          [name]: updatedValue,
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

  const handleCurrencyChange = (value: string) => {
    setFormData(prev => ({
      ...prev,
      currencyCode: value
    }));
  };

  const handlePaymentTypeChange = (value: string) => {
    setFormData(prev => ({
      ...prev,
      paymentTypeId: value
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

      <CurrencyField
        value={formData.currencyCode}
        onChange={handleCurrencyChange}
      />

      <CategoryField
        value={formData.categoryId}
        onChange={handleCategoryChange}
        recordType={recordType}
      />

      <PaymentTypeField
        value={formData.paymentTypeId}
        onChange={handlePaymentTypeChange}
      />
    </div>
  );
};

export default RecordFormFields;
