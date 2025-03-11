
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import FileUpload from "@/components/FileUpload";
import InvoiceForm from "@/components/InvoiceForm";
import { useToast } from "@/components/ui/use-toast";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { extractInvoiceData, saveInvoice } from "@/utils/invoiceUtils";
import { InvoiceFormData } from "@/types";
import { Loader2, Check } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { translations } from "@/utils/translations";

const InvoiceUpload = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [file, setFile] = useState<File | null>(null);
  const [fileUrl, setFileUrl] = useState<string>("");
  const [invoiceData, setInvoiceData] = useState<InvoiceFormData | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isExtracting, setIsExtracting] = useState<boolean>(false);
  const [uploadStep, setUploadStep] = useState<1 | 2>(1);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const { language } = useLanguage();
  const t = translations[language];

  const handleFileSelect = async (selectedFile: File) => {
    setFile(selectedFile);
    setFileUrl(URL.createObjectURL(selectedFile));
    setIsExtracting(true);
    
    try {
      const extractedData = await extractInvoiceData(selectedFile);
      setInvoiceData(extractedData);
      setUploadStep(2);
      
      toast({
        title: t.dataExtracted || "Data extracted",
        description: t.verifyExtractedInfo || "Please verify the extracted information",
      });
    } catch (error) {
      console.error("Extraction error:", error);
      toast({
        title: t.extractionFailed || "Extraction failed",
        description: t.couldNotExtractData || "Could not extract data from the document",
        variant: "destructive",
      });
      
      setInvoiceData({
        documentName: selectedFile.name.toUpperCase(),
        invoiceDate: "",
        invoiceNumber: "",
        companyName: "",
        amount: "",
        vat: "",
        totalAmount: "",
      });
      setUploadStep(2);
    } finally {
      setIsExtracting(false);
    }
  };

  const handleFormSubmit = async (formData: InvoiceFormData) => {
    if (!file || !fileUrl) {
      toast({
        title: t.error || "Error",
        description: t.noFileSelected || "No file selected",
        variant: "destructive",
      });
      return;
    }
    
    setIsLoading(true);
    setUploadError(null);
    
    try {
      console.log("Starting form submission process...");
      console.log("Storing file locally...");
      console.log("Saving invoice to local storage...");
      const invoice = saveInvoice(formData, fileUrl);
      console.log("Invoice saved successfully:", invoice);
      
      toast({
        title: t.invoiceSaved || "Invoice saved",
        description: t.invoiceSuccessfullySaved || "Invoice has been successfully saved",
      });
      
      navigate("/records");
    } catch (error: any) {
      console.error("Error in form submission:", error);
      const errorMessage = error?.message || t.couldNotSaveInvoice || "Could not save the invoice";
      setUploadError(errorMessage);
      toast({
        title: t.errorSavingInvoice || "Error saving invoice",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="grid grid-cols-1 gap-6 animate-slide-in">
      <div>
        <h1 className="text-3xl font-bold mb-1">{t.uploadInvoice || "Upload Invoice"}</h1>
        <p className="text-muted-foreground">
          {t.uploadInvoiceForExtraction || "Upload your invoice for automatic data extraction"}
        </p>
      </div>

      {uploadError && (
        <div className="bg-destructive/15 border border-destructive text-destructive px-4 py-3 rounded-md">
          <h4 className="font-medium mb-1">{t.uploadError || "Upload Error"}</h4>
          <p className="text-sm">{uploadError}</p>
        </div>
      )}

      {uploadStep === 1 ? (
        <Card className="glass-card">
          <CardHeader>
            <CardTitle>{t.uploadInvoice || "Upload Invoice"}</CardTitle>
            <CardDescription>
              {t.uploadInvoiceFormatInfo || "Upload your invoice as PDF, JPG, or PNG"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {isExtracting ? (
              <div className="text-center py-8">
                <Loader2 className="h-12 w-12 mx-auto mb-3 animate-spin text-primary" />
                <p className="text-lg font-medium">{t.extractingData || "Extracting data..."}</p>
                <p className="text-muted-foreground">
                  {t.pleaseWaitProcessing || "Please wait while we process your invoice"}
                </p>
              </div>
            ) : (
              <FileUpload onFileSelect={handleFileSelect} />
            )}
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <Card className="glass-card">
              <CardHeader>
                <CardTitle>{t.documentPreview || "Document Preview"}</CardTitle>
                <CardDescription>
                  {t.reviewUploadedDocument || "Review your uploaded document"}
                </CardDescription>
              </CardHeader>
              <CardContent>
                {file && fileUrl && (
                  <div className="border rounded-lg overflow-hidden bg-background">
                    {file.type.includes("image") ? (
                      <img 
                        src={fileUrl} 
                        alt="Invoice preview" 
                        className="w-full h-auto object-contain max-h-96"
                      />
                    ) : (
                      <div className="flex flex-col items-center justify-center p-8">
                        <Check className="h-12 w-12 text-green-500 mb-3" />
                        <p className="font-medium">{file.name.toUpperCase()}</p>
                        <p className="text-sm text-muted-foreground mt-1">
                          {t.pdfDocumentUploaded || "PDF document uploaded"}
                        </p>
                      </div>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
          
          <div>
            <Card className="glass-card">
              <CardHeader>
                <CardTitle>{t.invoiceDetails || "Invoice Details"}</CardTitle>
                <CardDescription>
                  {t.verifyExtractedInfo || "Verify and complete the extracted information"}
                </CardDescription>
              </CardHeader>
              <CardContent>
                {invoiceData && (
                  <InvoiceForm
                    initialData={invoiceData}
                    onSubmit={handleFormSubmit}
                    isLoading={isLoading}
                    submitLabel={t.saveInvoice || "Save Invoice"}
                  />
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      )}
    </div>
  );
};

export default InvoiceUpload;
