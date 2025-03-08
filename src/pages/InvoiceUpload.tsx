
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "@/components/Layout";
import FileUpload from "@/components/FileUpload";
import InvoiceForm from "@/components/InvoiceForm";
import { useToast } from "@/components/ui/use-toast";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { extractInvoiceData, saveInvoice } from "@/utils/invoiceUtils";
import { InvoiceFormData } from "@/types";
import { Loader2, Upload, Check } from "lucide-react";

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

  const handleFileSelect = async (selectedFile: File) => {
    setFile(selectedFile);
    setFileUrl(URL.createObjectURL(selectedFile));
    setIsExtracting(true);
    
    try {
      const extractedData = await extractInvoiceData(selectedFile);
      setInvoiceData(extractedData);
      setUploadStep(2);
      
      toast({
        title: "Data extracted",
        description: "Please verify the extracted information",
      });
    } catch (error) {
      console.error("Extraction error:", error);
      toast({
        title: "Extraction failed",
        description: "Could not extract data from the document",
        variant: "destructive",
      });
      
      // Create empty form data with just the document name
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
        title: "Error",
        description: "No file selected",
        variant: "destructive",
      });
      return;
    }
    
    setIsLoading(true);
    setUploadError(null);
    
    try {
      console.log("Starting form submission process...");
      
      // Store the file URL locally instead of uploading to Google Drive
      console.log("Storing file locally...");
      
      // Save invoice with local file URL
      console.log("Saving invoice to local storage...");
      const invoice = saveInvoice(formData, fileUrl);
      console.log("Invoice saved successfully:", invoice);
      
      toast({
        title: "Invoice saved",
        description: "Invoice has been successfully saved",
      });
      
      navigate("/records");
    } catch (error: any) {
      console.error("Error in form submission:", error);
      const errorMessage = error?.message || "Could not save the invoice";
      setUploadError(errorMessage);
      toast({
        title: "Error saving invoice",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Layout>
      <div className="grid grid-cols-1 gap-6 animate-slide-in">
        <div>
          <h1 className="text-3xl font-bold mb-1">Upload Invoice</h1>
          <p className="text-muted-foreground">
            Upload your invoice for automatic data extraction
          </p>
        </div>

        {uploadError && (
          <div className="bg-destructive/15 border border-destructive text-destructive px-4 py-3 rounded-md">
            <h4 className="font-medium mb-1">Upload Error</h4>
            <p className="text-sm">{uploadError}</p>
          </div>
        )}

        {uploadStep === 1 ? (
          <Card className="glass-card">
            <CardHeader>
              <CardTitle>Upload Invoice</CardTitle>
              <CardDescription>
                Upload your invoice as PDF, JPG, or PNG
              </CardDescription>
            </CardHeader>
            <CardContent>
              {isExtracting ? (
                <div className="text-center py-8">
                  <Loader2 className="h-12 w-12 mx-auto mb-3 animate-spin text-primary" />
                  <p className="text-lg font-medium">Extracting data...</p>
                  <p className="text-muted-foreground">
                    Please wait while we process your invoice
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
                  <CardTitle>Document Preview</CardTitle>
                  <CardDescription>
                    Review your uploaded document
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
                            PDF document uploaded
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
                  <CardTitle>Invoice Details</CardTitle>
                  <CardDescription>
                    Verify and complete the extracted information
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {invoiceData && (
                    <InvoiceForm
                      initialData={invoiceData}
                      onSubmit={handleFormSubmit}
                      isLoading={isLoading}
                      submitLabel="Save Invoice"
                    />
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default InvoiceUpload;
