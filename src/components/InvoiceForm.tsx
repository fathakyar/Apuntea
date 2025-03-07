
import React, { useState, useEffect } from "react";
import { InvoiceFormData } from "@/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Loader2, Save } from "lucide-react";
import CompanyAutocomplete from "@/components/CompanyAutocomplete";
import { formatText, formatNumberWithEuropeanStyle, parseEuropeanNumber } from "@/utils/formatUtils";

interface InvoiceFormProps {
  initialData?: InvoiceFormData;
  isLoading?: boolean;
  onSubmit: (data: InvoiceFormData) => void;
  submitLabel?: string;
}

const InvoiceForm: React.FC<InvoiceFormProps> = ({
  initialData,
  isLoading = false,
  onSubmit,
  submitLabel = "Save Invoice",
}) => {
  const [formData, setFormData] = useState<InvoiceFormData>({
    documentName: "",
    invoiceDate: "",
    invoiceNumber: "",
    companyName: "",
    amount: "",
    vat: "",
    totalAmount: "",
  });
  
  const [formattedAmount, setFormattedAmount] = useState("");
  const [formattedVat, setFormattedVat] = useState("");
  const [formattedTotal, setFormattedTotal] = useState("");

  useEffect(() => {
    if (initialData) {
      // Format initial data
      const formatted = {
        ...initialData,
        documentName: formatText(initialData.documentName, { toUpperCase: true }),
        invoiceNumber: formatText(initialData.invoiceNumber, { toUpperCase: true }),
        companyName: formatText(initialData.companyName, { toUpperCase: true }),
      };
      
      setFormData(formatted);
      
      // Set formatted display values
      setFormattedAmount(formatNumberWithEuropeanStyle(initialData.amount, { formatNumber: true }));
      setFormattedVat(formatNumberWithEuropeanStyle(initialData.vat, { formatNumber: true }));
      setFormattedTotal(formatNumberWithEuropeanStyle(initialData.totalAmount, { formatNumber: true }));
    }
  }, [initialData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    
    if (name === "documentName" || name === "invoiceNumber") {
      // Convert text inputs to uppercase
      setFormData({
        ...formData,
        [name]: formatText(value, { toUpperCase: true }),
      });
    } else if (name === "amount") {
      handleAmountChange(value);
    } else if (name === "vat") {
      handleVatChange(value);
    } else if (name === "totalAmount") {
      handleTotalAmountChange(value);
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };
  
  const handleCompanyChange = (value: string) => {
    setFormData({
      ...formData,
      companyName: value,
    });
  };
  
  const handleAmountChange = (value: string) => {
    setFormattedAmount(value);
    
    const amount = parseEuropeanNumber(value);
    const vat = parseEuropeanNumber(formattedVat);
    const total = amount + vat;
    
    setFormData({
      ...formData,
      amount: amount,
      totalAmount: total,
    });
    
    setFormattedTotal(formatNumberWithEuropeanStyle(total, { formatNumber: true }));
  };
  
  const handleVatChange = (value: string) => {
    setFormattedVat(value);
    
    const amount = parseEuropeanNumber(formattedAmount);
    const vat = parseEuropeanNumber(value);
    const total = amount + vat;
    
    setFormData({
      ...formData,
      vat: vat,
      totalAmount: total,
    });
    
    setFormattedTotal(formatNumberWithEuropeanStyle(total, { formatNumber: true }));
  };
  
  const handleTotalAmountChange = (value: string) => {
    setFormattedTotal(value);
    
    const total = parseEuropeanNumber(value);
    
    setFormData({
      ...formData,
      totalAmount: total,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Convert all formatted values to numbers for submission
    const submissionData = {
      ...formData,
      amount: parseEuropeanNumber(formattedAmount),
      vat: parseEuropeanNumber(formattedVat),
      totalAmount: parseEuropeanNumber(formattedTotal),
    };
    
    onSubmit(submissionData);
  };

  return (
    <Card className="glass-card">
      <CardContent className="pt-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="form-group col-span-1 md:col-span-2">
              <Label htmlFor="documentName" className="form-label">Document Name</Label>
              <Input
                id="documentName"
                name="documentName"
                value={formData.documentName}
                onChange={handleChange}
                placeholder="Invoice document name"
                className="form-input"
                required
              />
            </div>
            
            <div className="form-group">
              <Label htmlFor="invoiceDate" className="form-label">Invoice Date</Label>
              <Input
                id="invoiceDate"
                name="invoiceDate"
                type="date"
                value={formData.invoiceDate}
                onChange={handleChange}
                className="form-input"
                required
              />
            </div>
            
            <div className="form-group">
              <Label htmlFor="invoiceNumber" className="form-label">Invoice Number</Label>
              <Input
                id="invoiceNumber"
                name="invoiceNumber"
                value={formData.invoiceNumber}
                onChange={handleChange}
                placeholder="INV-0001"
                className="form-input"
                required
              />
            </div>
            
            <div className="form-group col-span-1 md:col-span-2">
              <CompanyAutocomplete
                value={formData.companyName}
                onChange={handleCompanyChange}
                className="form-input"
                required
              />
            </div>
            
            <div className="form-group">
              <Label htmlFor="amount" className="form-label">Amount</Label>
              <Input
                id="amount"
                name="amount"
                value={formattedAmount}
                onChange={handleChange}
                placeholder="0,00"
                className="form-input"
                required
              />
            </div>
            
            <div className="form-group">
              <Label htmlFor="vat" className="form-label">VAT</Label>
              <Input
                id="vat"
                name="vat"
                value={formattedVat}
                onChange={handleChange}
                placeholder="0,00"
                className="form-input"
                required
              />
            </div>
            
            <div className="form-group col-span-1 md:col-span-2">
              <Label htmlFor="totalAmount" className="form-label">Total Amount</Label>
              <Input
                id="totalAmount"
                name="totalAmount"
                value={formattedTotal}
                onChange={handleChange}
                placeholder="0,00"
                className="form-input font-medium"
                required
              />
            </div>
          </div>
          
          <div className="flex justify-end pt-4">
            <Button
              type="submit"
              className="btn-primary w-full md:w-auto"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Processing...
                </>
              ) : (
                <>
                  <Save className="mr-2 h-4 w-4" />
                  {submitLabel}
                </>
              )}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default InvoiceForm;
