
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import RecordForm from "@/components/records/RecordForm";
import { RecordFormData } from "@/hooks/useRecordForm";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { getInvoices, updateInvoice } from "@/utils/invoiceUtils";
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
          description: t.invoiceNotFound || "Invoice not found",
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
      const updatedInvoice: Invoice = {
        ...invoice,
        documentName: formData.documentName,
        invoiceDate: formData.invoiceDate,
        invoiceNumber: formData.invoiceNumber,
        companyName: formData.companyName,
        amount: typeof formData.amount === 'string' ? parseFloat(formData.amount.replace(',', '.')) : formData.amount,
        vat: typeof formData.vat === 'string' ? parseFloat(formData.vat.replace(',', '.')) : formData.vat,
        totalAmount: typeof formData.totalAmount === 'string' ? parseFloat(formData.totalAmount.replace(',', '.')) : formData.totalAmount,
        currencyCode: formData.currencyCode,
        categoryId: formData.categoryId,
        paymentTypeId: formData.paymentTypeId,
        updatedAt: new Date().toISOString(),
      };
      
      updateInvoice(updatedInvoice);
      
      toast({
        title: t.invoiceUpdated || "Invoice updated",
        description: t.invoiceSuccessfullyUpdated || "Invoice has been successfully updated",
      });
      
      navigate("/records");
    } catch (error) {
      toast({
        title: t.errorUpdatingInvoice || "Error updating invoice",
        description: t.couldNotUpdateInvoice || "Could not update the invoice",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const getInitialFormData = (): RecordFormData | undefined => {
    if (!invoice) return undefined;
    
    return {
      documentName: invoice.documentName,
      invoiceDate: invoice.invoiceDate,
      invoiceNumber: invoice.invoiceNumber,
      companyName: invoice.companyName,
      amount: formatNumberWithEuropeanStyle(invoice.amount, { formatNumber: true }),
      vat: formatNumberWithEuropeanStyle(invoice.vat, { formatNumber: true }),
      totalAmount: formatNumberWithEuropeanStyle(invoice.totalAmount, { formatNumber: true }),
      currencyCode: invoice.currencyCode || "EUR",
      categoryId: invoice.categoryId || "",
      paymentTypeId: invoice.paymentTypeId || "",
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
          {t.back || "Back"}
        </Button>
        <div>
          <h1 className="text-3xl font-bold mb-1">{t.editInvoice || "Edit Invoice"}</h1>
          <p className="text-muted-foreground">
            {t.updateInvoiceInfo || "Update invoice information"}
          </p>
        </div>
      </div>

      {invoice && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <Card className="glass-card h-full">
              <CardHeader>
                <CardTitle>{t.documentPreview || "Document Preview"}</CardTitle>
                <CardDescription>
                  {t.viewOriginalDocument || "View the original document"}
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
                    {t.openOriginalDocument || "Open Original Document"}
                  </a>
                </Button>
              </CardContent>
            </Card>
          </div>
          
          <div>
            <Card className="glass-card">
              <CardHeader>
                <CardTitle>{t.editInvoiceDetails || "Edit Invoice Details"}</CardTitle>
                <CardDescription>
                  {t.updateInvoiceInfoNeeded || "Update the invoice information as needed"}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <RecordForm
                  initialData={getInitialFormData()}
                  recordType={invoice.type || "expense"}
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
