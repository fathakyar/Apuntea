
import React, { useState } from "react";
import { RecordType } from "@/types";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import { v4 as uuidv4 } from "uuid";
import RecordFormFields from "./RecordFormFields";
import RecordFormActions from "./RecordFormActions";

interface RecordFormProps {
  initialData?: {
    documentName: string;
    invoiceDate: string;
    invoiceNumber: string;
    companyName: string;
    amount: string;
    vat: string;
    totalAmount: string;
  };
  recordType: RecordType;
}

const RecordForm: React.FC<RecordFormProps> = ({ initialData, recordType }) => {
  // Get today's date in yyyy-mm-dd format
  const today = new Date().toISOString().split('T')[0];
  
  const [formData, setFormData] = useState({
    documentName: initialData?.documentName || "",
    invoiceDate: initialData?.invoiceDate || today,
    invoiceNumber: initialData?.invoiceNumber || "",
    companyName: initialData?.companyName || "",
    amount: initialData?.amount || "",
    vat: initialData?.vat || "",
    totalAmount: initialData?.totalAmount || "",
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

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <RecordFormFields 
        formData={formData} 
        setFormData={setFormData} 
      />
      <RecordFormActions />
    </form>
  );
};

export default RecordForm;
