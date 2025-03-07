
import React, { useState, useEffect } from "react";
import { InvoiceFormData } from "@/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Loader2, Save } from "lucide-react";

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

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    }
  }, [initialData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    // Handle number fields - recalculate total when amount or vat changes
    if (name === "amount" || name === "vat") {
      const amount = name === "amount" ? parseFloat(value) || 0 : parseFloat(formData.amount as string) || 0;
      const vat = name === "vat" ? parseFloat(value) || 0 : parseFloat(formData.vat as string) || 0;
      const totalAmount = amount + vat;

      setFormData({
        ...formData,
        [name]: value,
        totalAmount: totalAmount.toFixed(2),
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
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
              <Label htmlFor="companyName" className="form-label">Company Name</Label>
              <Input
                id="companyName"
                name="companyName"
                value={formData.companyName}
                onChange={handleChange}
                placeholder="Company name"
                className="form-input"
                required
              />
            </div>
            
            <div className="form-group">
              <Label htmlFor="amount" className="form-label">Amount</Label>
              <Input
                id="amount"
                name="amount"
                type="number"
                step="0.01"
                value={formData.amount}
                onChange={handleChange}
                placeholder="0.00"
                className="form-input"
                required
              />
            </div>
            
            <div className="form-group">
              <Label htmlFor="vat" className="form-label">VAT</Label>
              <Input
                id="vat"
                name="vat"
                type="number"
                step="0.01"
                value={formData.vat}
                onChange={handleChange}
                placeholder="0.00"
                className="form-input"
                required
              />
            </div>
            
            <div className="form-group col-span-1 md:col-span-2">
              <Label htmlFor="totalAmount" className="form-label">Total Amount</Label>
              <Input
                id="totalAmount"
                name="totalAmount"
                type="number"
                step="0.01"
                value={formData.totalAmount}
                onChange={handleChange}
                placeholder="0.00"
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
