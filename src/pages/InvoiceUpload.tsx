
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "@/components/Layout";
import FileUpload from "@/components/FileUpload";
import CameraCapture from "@/components/CameraCapture";
import InvoiceForm from "@/components/InvoiceForm";
import { useToast } from "@/components/ui/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { extractInvoiceData, saveInvoice } from "@/utils/invoiceUtils";
import { InvoiceFormData } from "@/types";
import { Loader2, Upload, Camera, Check } from "lucide-react";

const InvoiceUpload = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [file, setFile] = useState<File | null>(null);
  const [fileUrl, setFileUrl] = useState<string>("");
  const [invoiceData, setInvoiceData] = useState<InvoiceFormData | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isExtracting, setIsExtracting] = useState<boolean>(false);
  const [uploadStep, setUploadStep] = useState<1 | 2>(1);

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
      toast({
        title: "Extraction failed",
        description: "Could not extract data from the document",
        variant: "destructive",
      });
      
      // Create empty form data with just the document name
      setInvoiceData({
        documentName: selectedFile.name,
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
    
    try {
      // In a real app, this would upload the file to Google Drive
      // For this demo, we'll just use the local blob URL
      const invoice = saveInvoice(formData, fileUrl);
      
      toast({
        title: "Invoice saved",
        description: "Invoice has been successfully saved",
      });
      
      navigate("/records");
    } catch (error) {
      toast({
        title: "Error saving invoice",
        description: "Could not save the invoice",
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
            Upload or capture your invoice for automatic data extraction
          </p>
        </div>

        {uploadStep === 1 ? (
          <Tabs defaultValue="upload" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger value="upload" className="flex items-center">
                <Upload className="mr-2 h-4 w-4" />
                File Upload
              </TabsTrigger>
              <TabsTrigger value="camera" className="flex items-center">
                <Camera className="mr-2 h-4 w-4" />
                Camera Capture
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="upload" className="animate-fade-in">
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
            </TabsContent>
            
            <TabsContent value="camera" className="animate-fade-in">
              <Card className="glass-card">
                <CardHeader>
                  <CardTitle>Capture Invoice</CardTitle>
                  <CardDescription>
                    Use your camera to capture the invoice
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col items-center">
                  {isExtracting ? (
                    <div className="text-center py-8">
                      <Loader2 className="h-12 w-12 mx-auto mb-3 animate-spin text-primary" />
                      <p className="text-lg font-medium">Extracting data...</p>
                      <p className="text-muted-foreground">
                        Please wait while we process your invoice
                      </p>
                    </div>
                  ) : (
                    <CameraCapture onCapture={handleFileSelect} />
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
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
                          <p className="font-medium">{file.name}</p>
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
