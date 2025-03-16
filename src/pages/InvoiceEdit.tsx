
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import RecordForm from "@/components/records/RecordForm";
import { RecordFormData } from "@/hooks/useRecordForm";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { getInvoices, updateInvoice, deleteInvoice } from "@/utils/invoiceUtils";
import { Invoice } from "@/types";
import { ArrowLeft, ExternalLink } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { translations } from "@/utils/translations";
import { formatNumberWithEuropeanStyle } from "@/utils/formatUtils";

const InvoiceEdit = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { id } = useParams<{ id: string }>();
  const [invoice, setInvoice] = useState<Invoice | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { language } = useLanguage();
  const t = translations[language];

  useEffect(() => {
    if (id) {
      const invoices = getInvoices();
      const foundInvoice = invoices.find(inv => inv.id === id);
      
      if (foundInvoice) {
        setInvoice(foundInvoice);
      } else {
        toast({
          title: t.error || "Error",
          description: t.invoiceNotFound || "Record not found",
          variant: "destructive",
        });
        navigate("/records");
      }
    }
  }, [id, navigate, toast, t]);

  const handleFormSubmit = (formData: RecordFormData) => {
    if (!invoice) return;
    
    setIsLoading(true);
    
    try {
      // Parse the numeric values from European format
      const parsedAmount = typeof formData.amount === 'string' ? 
        parseFloat(formData.amount.replace(/\./g, '').replace(',', '.')) : 
        formData.amount;
      
      const parsedVat = typeof formData.vat === 'string' ? 
        parseFloat(formData.vat.replace(/\./g, '').replace(',', '.')) : 
        formData.vat;
      
      const parsedTotalAmount = typeof formData.totalAmount === 'string' ? 
        parseFloat(formData.totalAmount.replace(/\./g, '').replace(',', '.')) : 
        formData.totalAmount;
      
      const updatedInvoice: Invoice = {
        ...invoice,
        documentName: formData.documentName,
        invoiceDate: formData.invoiceDate,
        invoiceNumber: formData.invoiceNumber,
        companyName: formData.companyName,
        amount: parsedAmount,
        vat: parsedVat,
        totalAmount: parsedTotalAmount,
        currencyCode: formData.currencyCode,
        categoryId: formData.categoryId,
        paymentTypeId: formData.paymentTypeId,
        updatedAt: new Date().toISOString(),
      };
      
      updateInvoice(updatedInvoice);
      
      toast({
        title: t.invoiceUpdated || "Record updated",
        description: t.invoiceSuccessfullyUpdated || "Record has been successfully updated",
      });
      
      navigate("/records");
    } catch (error) {
      console.error("Error updating record:", error);
      toast({
        title: t.errorUpdatingInvoice || "Error updating record",
        description: t.couldNotUpdateInvoice || "Could not update the record",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!invoice || !id) return;
    
    try {
      await deleteInvoice(id);
      
      toast({
        title: "Record deleted",
        description: "Record has been successfully deleted",
      });
      
      navigate("/records");
    } catch (error) {
      console.error("Error deleting record:", error);
      toast({
        title: "Error deleting record",
        description: "Could not delete the record",
        variant: "destructive",
      });
    }
  };

  const getInitialFormData = (): RecordFormData | undefined => {
    if (!invoice) return undefined;
    
    return {
      documentName: invoice.documentName || "",
      invoiceDate: invoice.invoiceDate || "",
      invoiceNumber: invoice.invoiceNumber || "",
      companyName: invoice.companyName || "",
      amount: formatNumberWithEuropeanStyle(invoice.amount, { formatNumber: true }),
      vat: formatNumberWithEuropeanStyle(invoice.vat, { formatNumber: true }),
      totalAmount: formatNumberWithEuropeanStyle(invoice.totalAmount, { formatNumber: true }),
      currencyCode: invoice.currencyCode || "EUR",
      categoryId: invoice.categoryId || "",
      paymentTypeId: invoice.paymentTypeId || "",
    };
  };

  return (
    <div className="grid grid-cols-1 gap-6 animate-slide-in pb-28">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <Button 
            variant="ghost" 
            onClick={() => navigate("/records")}
            className="mr-4 uppercase"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            BACK
          </Button>
          <div>
            <h1 className="text-3xl font-bold mb-1">EDIT RECORD</h1>
            <p className="text-muted-foreground">
              UPDATE RECORD INFO
            </p>
          </div>
        </div>
      </div>

      {invoice && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <Card className="glass-card h-full">
              <CardHeader>
                <CardTitle>DOCUMENT PREVIEW</CardTitle>
                <CardDescription>
                  View the original document
                </CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col h-full">
                <div className="border rounded-lg overflow-hidden bg-background mb-4 flex-grow flex items-center justify-center">
                  {invoice.documentLink === '#' || !invoice.documentLink ? (
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
                      <p className="font-medium">{invoice.documentName || "No document available"}</p>
                    </div>
                  ) : invoice.documentLink.endsWith(".pdf") ? (
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
                      <Button asChild variant="outline" className="mt-4 uppercase">
                        <a 
                          href={invoice.documentLink} 
                          target="_blank" 
                          rel="noopener noreferrer"
                        >
                          OPEN PDF
                        </a>
                      </Button>
                    </div>
                  ) : (
                    <img 
                      src={invoice.documentLink} 
                      alt="Document preview" 
                      className="max-w-full max-h-[300px] object-contain"
                    />
                  )}
                </div>
                
                {invoice.documentLink && invoice.documentLink !== '#' && (
                  <Button asChild variant="outline" className="uppercase">
                    <a 
                      href={invoice.documentLink} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="w-full"
                    >
                      <ExternalLink className="h-4 w-4 mr-2" />
                      OPEN ORIGINAL DOCUMENT
                    </a>
                  </Button>
                )}
              </CardContent>
            </Card>
          </div>
          
          <div>
            <Card className="glass-card">
              <CardHeader>
                <CardTitle>EDIT RECORD DETAILS</CardTitle>
                <CardDescription>
                  UPDATE RECORD INFO NEEDED
                </CardDescription>
              </CardHeader>
              <CardContent>
                <RecordForm
                  initialData={getInitialFormData()}
                  recordType={invoice.type || "expense"}
                  onSubmit={handleFormSubmit}
                  onDelete={handleDelete}
                  isEditing={true}
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
