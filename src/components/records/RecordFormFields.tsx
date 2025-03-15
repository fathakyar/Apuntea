
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
import { useLanguage } from "@/contexts/LanguageContext";
import { translations } from "@/utils/translations";

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
  const { language } = useLanguage();
  const t = translations[language];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    
    if (name === "amount" || name === "vat") {
      // For number fields, accept any input but validate for calculations
      setFormData(prev => {
        // Store the raw input value
        const newData = {
          ...prev,
          [name]: value
        };
        
        // Try to calculate totals if the input is valid
        try {
          const amountValue = name === "amount" ? value : prev.amount;
          const vatValue = name === "vat" ? value : prev.vat;
          
          // Only proceed with calculation if both values are sensible
          if (amountValue && vatValue) {
            // Try to parse both values
            const amountNumber = parseEuropeanNumber(amountValue);
            const vatNumber = parseEuropeanNumber(vatValue);
            
            // Calculate total
            const total = amountNumber + vatNumber;
            
            // Format the total with European style
            const formattedTotal = formatNumberWithEuropeanStyle(total, { formatNumber: true });
            
            // Update total amount only if calculation was successful
            newData.totalAmount = formattedTotal;
          }
        } catch (error) {
          // If parsing fails, just keep the existing total
          console.error("Error calculating total:", error);
        }
        
        return newData;
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
        required={true}
      />

      <DateField 
        value={formData.invoiceDate} 
        onChange={handleChange} 
        required={true}
      />

      <InvoiceNumberField 
        value={formData.invoiceNumber} 
        onChange={handleChange} 
        required={true}
      />

      <div className="space-y-2">
        <CompanyAutocomplete
          value={formData.companyName}
          onChange={(value) => setFormData(prev => ({ ...prev, companyName: value }))}
          required={true}
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
        required={true}
      />

      <CategoryField
        value={formData.categoryId}
        onChange={handleCategoryChange}
        recordType={recordType}
        required={true}
      />

      <PaymentTypeField
        value={formData.paymentTypeId}
        onChange={handlePaymentTypeChange}
        required={true}
      />
    </div>
  );
};

export default RecordFormFields;
