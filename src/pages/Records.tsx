
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import InvoiceTable from "@/components/InvoiceTable";
import { Button } from "@/components/ui/button";
import { getInvoices, deleteInvoice } from "@/utils/invoiceUtils";
import { Invoice } from "@/types";
import { Upload, Download } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useLanguage } from "@/contexts/LanguageContext";
import { translations } from "@/utils/translations";

const Records = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const { language } = useLanguage();
  const t = translations[language];

  useEffect(() => {
    loadInvoices();
  }, []);

  const loadInvoices = () => {
    const fetchedInvoices = getInvoices();
    setInvoices(fetchedInvoices);
  };

  const handleEdit = (invoice: Invoice) => {
    navigate(`/edit/${invoice.id}`);
  };

  const handleDelete = (id: string) => {
    try {
      deleteInvoice(id);
      loadInvoices();
      
      toast({
        title: t.invoiceDeleted || "Invoice deleted",
        description: t.invoiceSuccessfullyDeleted || "Invoice has been successfully deleted",
      });
    } catch (error) {
      toast({
        title: t.error || "Error",
        description: t.couldNotDeleteInvoice || "Could not delete the invoice",
        variant: "destructive",
      });
    }
  };

  const handleExport = () => {
    try {
      const dataStr = JSON.stringify(invoices, null, 2);
      const dataUri = `data:application/json;charset=utf-8,${encodeURIComponent(dataStr)}`;
      
      const exportFileDefaultName = `apuntea-invoices-${new Date().toISOString().slice(0, 10)}.json`;
      
      const linkElement = document.createElement("a");
      linkElement.setAttribute("href", dataUri);
      linkElement.setAttribute("download", exportFileDefaultName);
      linkElement.click();
      
      toast({
        title: t.exportSuccessful || "Export successful",
        description: t.invoiceDataExported || "Invoice data has been exported successfully",
      });
    } catch (error) {
      toast({
        title: t.exportFailed || "Export failed",
        description: t.couldNotExportData || "Could not export invoice data",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="grid grid-cols-1 gap-6 animate-slide-in">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold mb-1">{t.invoiceRecords || "Invoice Records"}</h1>
          <p className="text-muted-foreground">
            {t.manageAllInvoices || "Manage all your invoice records in one place"}
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-2">
          <Button
            onClick={() => navigate("/upload")}
            className="btn-primary"
          >
            <Upload className="h-4 w-4 mr-2" />
            {t.uploadNew || "Upload New"}
          </Button>
          {invoices.length > 0 && (
            <Button 
              variant="outline" 
              onClick={handleExport}
            >
              <Download className="h-4 w-4 mr-2" />
              {t.exportData || "Export Data"}
            </Button>
          )}
        </div>
      </div>

      <InvoiceTable
        invoices={invoices}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </div>
  );
};

export default Records;
