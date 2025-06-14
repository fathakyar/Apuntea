
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import InvoiceTable from "@/components/invoice/InvoiceTable";
import { Button } from "@/components/ui/button";
import { getInvoices, deleteInvoice } from "@/utils/invoiceUtils";
import { Invoice } from "@/types";
import { Download, Plus } from "lucide-react";
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
        title: t.invoiceDeleted || "Record deleted",
        description: t.invoiceSuccessfullyDeleted || "Record has been successfully deleted",
      });
    } catch (error) {
      toast({
        title: t.error || "Error",
        description: t.couldNotDeleteInvoice || "Could not delete the record",
        variant: "destructive",
      });
    }
  };

  const handleExport = () => {
    try {
      const dataStr = JSON.stringify(invoices, null, 2);
      const dataUri = `data:application/json;charset=utf-8,${encodeURIComponent(dataStr)}`;
      
      const exportFileDefaultName = `apuntea-records-${new Date().toISOString().slice(0, 10)}.json`;
      
      const linkElement = document.createElement("a");
      linkElement.setAttribute("href", dataUri);
      linkElement.setAttribute("download", exportFileDefaultName);
      linkElement.click();
      
      toast({
        title: t.exportSuccessful || "Export successful",
        description: t.invoiceDataExported || "Record data has been exported successfully",
      });
    } catch (error) {
      toast({
        title: t.exportFailed || "Export failed",
        description: t.couldNotExportData || "Could not export record data",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="grid grid-cols-1 gap-6 animate-slide-in max-w-screen-xl px-4 sm:px-8 mx-auto w-full mt-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold mb-1">ALL RECORDS</h1>
          <p className="text-muted-foreground">
            MANAGE ALL YOUR RECORDS
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-2">
          <Button
            onClick={() => navigate("/new-record")}
            className="btn-primary"
          >
            <Plus className="h-4 w-4 mr-2" />
            RECORD
          </Button>
          {invoices.length > 0 && (
            <Button 
              variant="outline" 
              onClick={handleExport}
            >
              <Download className="h-4 w-4 mr-2" />
              EXPORT DATA
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
