
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RecordType } from "@/types";
import FileUpload from "@/components/FileUpload";
import RecordForm from "@/components/records/RecordForm";
import { useToast } from "@/components/ui/use-toast";
import { Loader2 } from "lucide-react";

interface ScanRecordProps {
  recordType: RecordType;
}

const ScanRecord: React.FC<ScanRecordProps> = ({ recordType }) => {
  const [isScanning, setIsScanning] = useState(false);
  const [scannedData, setScannedData] = useState<any>(null);
  const { toast } = useToast();

  const handleFileSelect = async (file: File) => {
    setIsScanning(true);
    try {
      // Here we'll integrate with OCR service
      // For now, just simulating a delay
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      setScannedData({
        documentName: file.name,
        invoiceDate: new Date().toISOString().split('T')[0],
        invoiceNumber: "INV-" + Math.random().toString(36).substr(2, 9),
        companyName: "",
        amount: "",
        vat: "",
        totalAmount: "",
      });

      toast({
        title: "Document scanned successfully",
        description: "Please verify the extracted information",
      });
    } catch (error) {
      toast({
        title: "Scanning failed",
        description: "Could not scan the document. Please try again or use manual entry.",
        variant: "destructive",
      });
    } finally {
      setIsScanning(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Scan Document</CardTitle>
      </CardHeader>
      <CardContent>
        {!scannedData ? (
          <div className="space-y-4">
            {isScanning ? (
              <div className="flex flex-col items-center justify-center py-8">
                <Loader2 className="h-8 w-8 animate-spin mb-4" />
                <p className="text-lg font-medium">Scanning document...</p>
                <p className="text-sm text-muted-foreground">Please wait while we process your document</p>
              </div>
            ) : (
              <FileUpload onFileSelect={handleFileSelect} />
            )}
          </div>
        ) : (
          <RecordForm initialData={scannedData} recordType={recordType} />
        )}
      </CardContent>
    </Card>
  );
};

export default ScanRecord;
