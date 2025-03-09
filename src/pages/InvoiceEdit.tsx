import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import InvoiceForm from "@/components/InvoiceForm";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { getInvoices, updateInvoice } from "@/utils/invoiceUtils";
import { Invoice, InvoiceFormData } from "@/types";
import { ArrowLeft, ExternalLink } from "lucide-react";

const InvoiceEdit = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { id } = useParams<{ id: string }>();
  const [invoice, setInvoice] = useState<Invoice | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    if (id) {
      const invoices = getInvoices();
      const foundInvoice = invoices.find(inv => inv.id === id);
      
      if (foundInvoice) {
        setInvoice(foundInvoice);
      } else {
        toast({
          title: "Error",
          description: "Invoice not found",
          variant: "destructive",
        });
        navigate("/records");
      }
    }
  }, [id, navigate, toast]);

  const handleFormSubmit = (formData: InvoiceFormData) => {
    if (!invoice) return;
    
    setIsLoading(true);
    
    try {
      const updatedInvoice: Invoice = {
        ...invoice,
        documentName: formData.documentName,
        invoiceDate: formData.invoiceDate,
        invoiceNumber: formData.invoiceNumber,
        companyName: formData.companyName,
        amount: typeof formData.amount === 'string' ? parseFloat(formData.amount) : formData.amount,
        vat: typeof formData.vat === 'string' ? parseFloat(formData.vat) : formData.vat,
        totalAmount: typeof formData.totalAmount === 'string' ? parseFloat(formData.totalAmount) : formData.totalAmount,
      };
      
      updateInvoice(updatedInvoice);
      
      toast({
        title: "Invoice updated",
        description: "Invoice has been successfully updated",
      });
      
      navigate("/records");
    } catch (error) {
      toast({
        title: "Error updating invoice",
        description: "Could not update the invoice",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const getInitialFormData = (): InvoiceFormData | undefined => {
    if (!invoice) return undefined;
    
    return {
      documentName: invoice.documentName,
      invoiceDate: invoice.invoiceDate,
      invoiceNumber: invoice.invoiceNumber,
      companyName: invoice.companyName,
      amount: invoice.amount,
      vat: invoice.vat,
      totalAmount: invoice.totalAmount,
    };
  };

  return (
    <div className="grid grid-cols-1 gap-6 animate-slide-in">
      <div className="flex items-center">
        <Button 
          variant="ghost" 
          onClick={() => navigate("/records")}
          className="mr-4"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back
        </Button>
        <div>
          <h1 className="text-3xl font-bold mb-1">Edit Invoice</h1>
          <p className="text-muted-foreground">
            Update invoice information
          </p>
        </div>
      </div>

      {invoice && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <Card className="glass-card h-full">
              <CardHeader>
                <CardTitle>Document Preview</CardTitle>
                <CardDescription>
                  View the original document
                </CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col h-full">
                <div className="border rounded-lg overflow-hidden bg-background mb-4 flex-grow flex items-center justify-center">
                  {invoice.documentLink.endsWith(".pdf") ? (
                    <div className="text-center p-8">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-16 w-16 mx-auto mb-4 text-muted-foreground"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={1.5}
                          d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                        />
                      </svg>
                      <p className="font-medium">{invoice.documentName}</p>
                    </div>
                  ) : (
                    <img 
                      src={invoice.documentLink} 
                      alt="Invoice preview" 
                      className="max-w-full max-h-full object-contain"
                    />
                  )}
                </div>
                
                <Button asChild variant="outline">
                  <a 
                    href={invoice.documentLink} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="w-full"
                  >
                    <ExternalLink className="h-4 w-4 mr-2" />
                    Open Original Document
                  </a>
                </Button>
              </CardContent>
            </Card>
          </div>
          
          <div>
            <Card className="glass-card">
              <CardHeader>
                <CardTitle>Edit Invoice Details</CardTitle>
                <CardDescription>
                  Update the invoice information as needed
                </CardDescription>
              </CardHeader>
              <CardContent>
                <InvoiceForm
                  initialData={getInitialFormData()}
                  onSubmit={handleFormSubmit}
                  isLoading={isLoading}
                  submitLabel="Update Invoice"
                />
              </CardContent>
            </Card>
          </div>
        </div>
      )}
    </div>
  );
};

export default InvoiceEdit;
