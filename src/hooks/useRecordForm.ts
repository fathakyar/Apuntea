
import { useState } from "react";
import { RecordType } from "@/types";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { v4 as uuidv4 } from "uuid";
import { useDefinitions } from "@/contexts/DefinitionsContext";
import { parseEuropeanNumber } from "@/utils/formatUtils";

export interface RecordFormData {
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
}

export function useRecordForm(initialData?: RecordFormData, recordType: RecordType = "expense", onSubmit?: (data: RecordFormData) => void) {
  // Get today's date in yyyy-mm-dd format
  const today = new Date().toISOString().split('T')[0];
  
  const { currencies, categories } = useDefinitions();
  
  // Get default currency (EUR or first selected currency)
  const defaultCurrency = currencies.find(c => c.code === "EUR" && c.selected) || 
                        currencies.find(c => c.selected) || 
                        { code: "EUR" };
  
  // Get default payment type (BEKLEMEDE or first payment type)
  const paymentTypeCategory = categories.find(cat => cat.id === "paymentType");
  const waitingPaymentType = paymentTypeCategory?.subcategories.find(sub => sub.name === "BEKLEMEDE");
  const defaultPaymentType = waitingPaymentType || 
                           (paymentTypeCategory?.subcategories[0] || { id: "waiting" });
  
  const [formData, setFormData] = useState<RecordFormData>({
    documentName: initialData?.documentName || "",
    invoiceDate: initialData?.invoiceDate || today,
    invoiceNumber: initialData?.invoiceNumber || "",
    companyName: initialData?.companyName || "",
    amount: initialData?.amount || "",
    vat: initialData?.vat || "",
    totalAmount: initialData?.totalAmount || "",
    categoryId: initialData?.categoryId || "",
    currencyCode: initialData?.currencyCode || defaultCurrency.code,
    paymentTypeId: initialData?.paymentTypeId || defaultPaymentType.id,
  });

  const navigate = useNavigate();
  const { toast } = useToast();

  const validateForm = (): boolean => {
    // Check required fields
    if (!formData.documentName || 
        !formData.invoiceDate || 
        !formData.invoiceNumber || 
        !formData.companyName || 
        !formData.amount || 
        !formData.vat || 
        !formData.totalAmount || 
        !formData.categoryId || 
        !formData.currencyCode || 
        !formData.paymentTypeId) {
      
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      
      return false;
    }
    
    return true;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate the form
    if (!validateForm()) {
      return;
    }
    
    // If custom onSubmit was provided, use that instead
    if (onSubmit) {
      onSubmit(formData);
      return;
    }
    
    // Get existing invoices from local storage
    const existingInvoices = JSON.parse(localStorage.getItem("apuntea_invoices") || "[]");
    
    // Create new invoice with the form data, properly parsing the numbers
    const newInvoice = {
      id: uuidv4(),
      documentName: formData.documentName,
      invoiceDate: formData.invoiceDate,
      invoiceNumber: formData.invoiceNumber,
      companyName: formData.companyName,
      amount: parseEuropeanNumber(formData.amount),
      vat: parseEuropeanNumber(formData.vat),
      totalAmount: parseEuropeanNumber(formData.totalAmount),
      type: recordType, // Save the record type
      categoryId: formData.categoryId, // Save the selected category ID
      currencyCode: formData.currencyCode, // Save the currency code
      paymentTypeId: formData.paymentTypeId, // Save the payment type ID
      documentLink: "#", // Placeholder for document link
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    
    // Add the new invoice to the existing ones
    existingInvoices.push(newInvoice);
    
    // Save back to localStorage
    localStorage.setItem("apuntea_invoices", JSON.stringify(existingInvoices));
    
    // Show success message
    toast({
      title: "Record saved successfully",
      description: `The ${recordType} record has been saved.`,
    });
    
    // Navigate to records page
    navigate("/records");
  };

  return {
    formData,
    setFormData,
    handleSubmit
  };
}
