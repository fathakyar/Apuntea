
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RecordType } from "@/types";
import { formatText, formatNumberWithEuropeanStyle, parseEuropeanNumber } from "@/utils/formatUtils";
import CompanyAutocomplete from "@/components/CompanyAutocomplete";
import { Save } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import { v4 as uuidv4 } from "uuid";

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
      amount: parseEuropeanNumber(formData.amount),
      vat: parseEuropeanNumber(formData.vat),
      totalAmount: parseEuropeanNumber(formData.totalAmount),
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
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="documentName">Document Name</Label>
          <Input
            id="documentName"
            name="documentName"
            value={formData.documentName}
            onChange={handleChange}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="invoiceDate">Invoice Date</Label>
          <Input
            id="invoiceDate"
            name="invoiceDate"
            type="date"
            value={formData.invoiceDate}
            onChange={handleChange}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="invoiceNumber">Invoice Number</Label>
          <Input
            id="invoiceNumber"
            name="invoiceNumber"
            value={formData.invoiceNumber}
            onChange={handleChange}
            required
          />
        </div>

        <div className="space-y-2">
          <CompanyAutocomplete
            value={formData.companyName}
            onChange={(value) => setFormData(prev => ({ ...prev, companyName: value }))}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="amount">Amount</Label>
          <Input
            id="amount"
            name="amount"
            value={formData.amount}
            onChange={handleChange}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="vat">VAT</Label>
          <Input
            id="vat"
            name="vat"
            value={formData.vat}
            onChange={handleChange}
            required
          />
        </div>

        <div className="space-y-2 md:col-span-2">
          <Label htmlFor="totalAmount">Total Amount</Label>
          <Input
            id="totalAmount"
            name="totalAmount"
            value={formData.totalAmount}
            readOnly
            className="font-medium"
          />
        </div>
      </div>

      <div className="flex justify-end pt-4">
        <Button type="submit" className="w-full md:w-auto">
          <Save className="w-4 h-4 mr-2" />
          Save Record
        </Button>
      </div>
    </form>
  );
};

export default RecordForm;
