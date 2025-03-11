
import { useState } from "react";
import { RecordType } from "@/types";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import { v4 as uuidv4 } from "uuid";

export interface RecordFormData {
  documentName: string;
  invoiceDate: string;
  invoiceNumber: string;
  companyName: string;
  amount: string;
  vat: string;
  totalAmount: string;
  categoryId: string;
}

export function useRecordForm(initialData?: RecordFormData, recordType: RecordType = "expense") {
  // Get today's date in yyyy-mm-dd format
  const today = new Date().toISOString().split('T')[0];
  
  const [formData, setFormData] = useState<RecordFormData>({
    documentName: initialData?.documentName || "",
    invoiceDate: initialData?.invoiceDate || today,
    invoiceNumber: initialData?.invoiceNumber || "",
    companyName: initialData?.companyName || "",
    amount: initialData?.amount || "",
    vat: initialData?.vat || "",
    totalAmount: initialData?.totalAmount || "",
    categoryId: initialData?.categoryId || "",
  });

  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Get existing invoices from local storage
    const existingInvoices = JSON.parse(localStorage.getItem("apuntea_invoices") || "[]");
    
    // Create new invoice with the form data
    const newInvoice = {
      id: uuidv4(),
      documentName: formData.documentName,
      invoiceDate: formData.invoiceDate,
      invoiceNumber: formData.invoiceNumber,
      companyName: formData.companyName,
      amount: parseFloat(formData.amount.replace(/\./g, "").replace(",", ".")) || 0,
      vat: parseFloat(formData.vat.replace(/\./g, "").replace(",", ".")) || 0,
      totalAmount: parseFloat(formData.totalAmount.replace(/\./g, "").replace(",", ".")) || 0,
      type: recordType, // Save the record type
      categoryId: formData.categoryId, // Save the selected category ID
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
